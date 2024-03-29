import { useEffect, useState } from "react"
import Header from "./components/Header"
import IconoNuevoGasto from './img/nuevo-gasto.svg'
import Modal from "./components/Modal"
import { generarId } from "./helpers"
import ListadoGastos from "./components/ListadoGastos"
import Filtro from "./components/Filtro"

function App() {

  const presupuestoLS = Number(localStorage.getItem("presupuesto") ?? 0)
  const gastosLS = JSON.parse(localStorage.getItem("gastos")) ?? []

  const [presupuesto, setPresupuesto] = useState(presupuestoLS)
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false)
  const [modal, setModal] = useState(false)
  const [animarModal, setAnimarModal] = useState(false)
  const [gastos, setGastos] = useState(gastosLS)
  const [gastoEditar, setGastoEditar] = useState({})
  const [filtro, setFiltro] = useState("")
  const [gastosFiltrados, setGastosFiltrados] = useState([])

  useEffect(() => {

    if (Object.keys(gastoEditar).length > 0) {
      setModal(true)

      setTimeout(() => {
        setAnimarModal(true)
      }, 500);
    }
  }, [gastoEditar]);

  useEffect(() => {
    localStorage.setItem("presupuesto", presupuesto ?? 0)
  }, [presupuesto]);

  useEffect(() => {
    localStorage.setItem("gastos", JSON.stringify(gastos) ?? [])
  }, [gastos]);

  useEffect(() => {
    if (presupuesto > 0) {
      setIsValidPresupuesto(true)
    }
  }, []);

  useEffect(() => {
    
    if (filtro) {
      // filtrar gastos por categoria
      const gastosFiltrados = gastos.filter(
        gasto => gasto.categoria === filtro
      )
      setGastosFiltrados(gastosFiltrados)
    }
  }, [filtro]);

  const handleNuevoGasto = () => {
    setModal(true)

    setTimeout(() => {
      setAnimarModal(true)
    }, 500);
  }

  const guardarGasto = gasto => {
    if (gasto.id) {
      // actualizar gasto
      const gastosActualizados = gastos.map(gastoState => (
        gastoState.id === gasto.id ? gasto : gastoState
      ))
      setGastos(gastosActualizados)
    } else {
      // nuevo gasto
      gasto.id = generarId()
      gasto.fecha = Date.now()
      setGastos([...gastos, gasto])
    }
  }

  const eliminarGasto = id => {
    // eliminar gasto
    const gastosActualizados = gastos.filter(gasto => (
      gasto.id !== id
    ))
      setGastos(gastosActualizados)
      setFiltro("")
      setGastosFiltrados([])
    }

  return (
    <div className={modal ? "fijar" : ""}>
      <Header 
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        isValidPresupuesto={isValidPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto}
        gastos={gastos}
        setGastos={setGastos}
      />

      {
        isValidPresupuesto && 
        <>
          <main>
            <Filtro 
              filtro={filtro}
              setFiltro={setFiltro}
              gastosFiltrados={gastosFiltrados}
            />
            <ListadoGastos 
              gastos={gastos}
              setGastoEditar={setGastoEditar}
              eliminarGasto={eliminarGasto}
              filtro={filtro}
              gastosFiltrados={gastosFiltrados}
            />
          </main>
          <div className="nuevo-gasto">
            <img 
              src={IconoNuevoGasto} 
              alt="icono de nuevo gasto" 
              onClick={handleNuevoGasto}
            />
          </div>
        </>
      }

      {
        modal && <Modal 
                  setModal={setModal} 
                  animarModal={animarModal}
                  setAnimarModal={setAnimarModal}
                  guardarGasto={guardarGasto}
                  gastoEditar={gastoEditar}
                  setGastoEditar={setGastoEditar}
                />
      }
    </div>
  )
}

export default App
