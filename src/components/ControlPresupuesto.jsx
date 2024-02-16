
const ControlPresupuesto = ({ presupuesto }) => {
  const formatearDinero = cantidad => {
    return cantidad.toLocaleString("es-AR", {
      style: "currency",
      currency: "ARS"
    })  
  }

  return (
    <div className="contenedor-presupuesto contenedor sombra dos-columnas">
      
      <p>Grafica aquí</p>

      <div className="contenido-presupuesto">
        <p>Presupuesto: <span>{formatearDinero(presupuesto)}</span></p>
        <p>Disponible: <span>{formatearDinero(0)}</span></p>
        <p>Gastado: <span>{formatearDinero(0)}</span></p>
      </div>
    </div>
  )
}

export default ControlPresupuesto