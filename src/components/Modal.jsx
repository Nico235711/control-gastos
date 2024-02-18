import { useEffect, useState } from 'react'
import IconoCerrarModal from '../img/cerrar.svg'
import Mensaje from './Mensaje'

const Modal = ({ 
  setModal, 
  animarModal, 
  setAnimarModal, 
  guardarGasto,
  gastoEditar,
  setGastoEditar
}) => {

  const [gasto, setGasto] = useState("")
  const [cantidad, setCantidad] = useState("")
  const [categoria, setCategoria] = useState("")
  const [mensaje, setMensaje] = useState("")
  const [id, setId] = useState("")
  const [fecha, setFecha] = useState("")

  useEffect(() => {
    if (Object.keys(gastoEditar).length > 0) {
      setGasto(gastoEditar.gasto)
      setCantidad(gastoEditar.cantidad)
      setCategoria(gastoEditar.categoria)
      setId(gastoEditar.id)
      setFecha(gastoEditar.fecha)
    }
  }, []);

  const handleCerrarModal = () => {
    setAnimarModal(false)
    setGastoEditar({})
    
    setTimeout(() => {
      setModal(false)
    }, 500);
  }

  const handleSubmit = e => {
    e.preventDefault()

    if ([gasto, cantidad, categoria].includes("")) {
      setMensaje("Todos los campos son obligatorios")

      setTimeout(() => {
        setMensaje("")
      }, 2000);
      return
    }
    handleCerrarModal()

    const objGasto = {
      gasto,
      cantidad,
      categoria,
      id,
      fecha 
    }
    guardarGasto(objGasto)
  }

  return (
    <div className="modal">
      <div className="cerrar-modal">
        <img 
          src={IconoCerrarModal} 
          alt="icono de cerrar modal" 
          onClick={handleCerrarModal}
        />
      </div>

      <form 
        className={`formulario ${animarModal ? "animar" : "cerrar"}`} 
        onSubmit={handleSubmit}
      >

        <legend>
          {
            gastoEditar.gasto ? "Editar Gasto" : "Nuevo Gasto"
          }
        </legend>
        {
          mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>
        }

        <div className='campo'>
          <label htmlFor="gasto">Nombre del Gasto:</label>
          <input 
            type="text" 
            id="gasto" 
            placeholder='Añade tu gasto' 
            value={gasto}
            onChange={e => setGasto(e.target.value)}
          />
        </div>

        <div className='campo'>
          <label htmlFor="cantidad">Cantidad:</label>
          <input 
            type="number" 
            id="cantidad" 
            placeholder='Añada la cantidad gastada. Ej: $300' 
            value={cantidad}
            onChange={e => setCantidad(Number(e.target.value))}
          />
        </div>

        <div className='campo'>
          <label htmlFor="categoria">Categoría:</label>
          <select 
            id="categoria" 
            value={categoria}
            onChange={e => setCategoria(e.target.value)}
          >
            <option value="">-- Seleccione una categoría --</option>
            <option value="ahorro">Ahorro</option>
            <option value="comida">Comida</option>
            <option value="casa">Casa</option>
            <option value="gastos">Gastos Varios</option>
            <option value="ocio">Ocio</option>
            <option value="salud">Salud</option>
            <option value="subscripciones">Subscripciones</option>
          </select>
        </div>

        <input 
          type="submit" 
          value={gastoEditar.gasto ? "Guardar Cambios" : "Añadir Gasto"}
        />
      </form>
    </div>
  )
}

export default Modal