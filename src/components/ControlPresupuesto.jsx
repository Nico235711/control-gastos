import { useEffect, useState } from "react";

import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const ControlPresupuesto = ({ presupuesto, gastos }) => {

  const [disponible, setDisponible] = useState(presupuesto)
  const [gastado, setGastado] = useState(0)

  useEffect(() => {
    
    const totalGastado = gastos.reduce( 
      (acum, gasto) => acum + gasto.cantidad, 0
    )
    setDisponible(disponible - totalGastado)
    setGastado(totalGastado)
  }, [gastos]);

  const formatearDinero = cantidad => {
    return cantidad.toLocaleString("es-AR", {
      style: "currency",
      currency: "ARS"
    })  
  }

  return (
    <div className="contenedor-presupuesto contenedor sombra dos-columnas">
      
      <CircularProgressbar 
        value={gastado} 
        text={`${gastado}% Gastado`}
        styles={buildStyles({
          pathColor: `rgb(62, 152, 199)`,
          textColor: '#f88',
          trailColor: '',
        })}
      />

      <div className="contenido-presupuesto">
        <p>Presupuesto: <span>{formatearDinero(presupuesto)}</span></p>
        <p>Disponible: <span>{formatearDinero(disponible)}</span></p>
        <p>Gastado: <span>{formatearDinero(gastado)}</span></p>
      </div>
    </div>
  )
}

export default ControlPresupuesto