import { useEffect, useState } from "react";

import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const ControlPresupuesto = ({ 
  presupuesto, 
  setPresupuesto,
  setIsValidPresupuesto,
  gastos,
  setGastos 
}) => {

  const [disponible, setDisponible] = useState(0)
  const [gastado, setGastado] = useState(0)
  const [porcentaje, setPorcentaje] = useState(0)

  useEffect(() => {
    
    const totalGastado = gastos.reduce( 
      (acum, gasto) => acum + gasto.cantidad, 0
    )

    const totalDisponible = presupuesto - totalGastado
    const nuevoPorcentaje = 
    (((presupuesto - totalDisponible) / presupuesto) * 100).toFixed(2)

    setTimeout(() => {

      setPorcentaje(nuevoPorcentaje)
    }, 1000);

    setDisponible(totalDisponible)
    setGastado(totalGastado)
  }, [gastos]);

  const formatearDinero = cantidad => {
    return cantidad.toLocaleString("es-AR", {
      style: "currency",
      currency: "ARS"
    })  
  }

  const handleResetApp = () => {
    const respuesta = confirm("¿Estas seguro de resetear la app?")

    if (respuesta) {
      setPresupuesto(0)
      setGastos([])
      setIsValidPresupuesto(false)
    }
  }

  return (
    <div className="contenedor-presupuesto contenedor sombra dos-columnas">
      
      <CircularProgressbar 
        value={porcentaje} 
        text={`${porcentaje}% Gastado`}
        styles={buildStyles({
          pathColor: porcentaje > 100 ? "#f00" : "#3b82f6",
          textColor: porcentaje > 100 ? "#f00" : "#3b82f6",
          trailColor: '#f5f6f7',
        })}
      />

      <div className="contenido-presupuesto">
        <button
          className="reset-app"
          type="button"
          onClick={handleResetApp}
        >
          Resetear App
        </button>
        <p>Presupuesto: <span>{formatearDinero(presupuesto)}</span></p>
        <p className={`${disponible < 0 ? "negativo" : ""}`}>
          Disponible: <span>{formatearDinero(disponible)}</span>
        </p>
        <p>Gastado: <span>{formatearDinero(gastado)}</span></p>
      </div>
    </div>
  )
}

export default ControlPresupuesto