import { useState } from "react"
import Mensaje from "./Mensaje"

const NuevoPresupuesto = ({ 
  presupuesto,
  setPresupuesto,
  isValidPresupuesto,
  setIsValidPresupuesto
}) => {

  const [mensaje, setMensaje] = useState("")

  const handleSubmit = e => {
    e.preventDefault()

    if (!presupuesto || presupuesto < 0) {
      setMensaje("No es un presupuesto válido")

      setTimeout(() => {
        setMensaje("")
      }, 2000);
      return
    }

    
    setIsValidPresupuesto(true)
  }

  return (
    <div className="contenedor-presupuesto contenedor sombra">
      <form className="formulario" onSubmit={handleSubmit}>
        <div className="campo">
          <label htmlFor="presupuesto">Definir Presupuesto</label>
          <input 
            type="number" 
            id="presupuesto" 
            className="nuevo-presupuesto"
            value={presupuesto}
            onChange={e => setPresupuesto(Number(e.target.value))}
          />
        </div>

        <input type="submit" value="Añadir"/>

        {
          mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>
        }
      </form>
    </div>
  )
}

export default NuevoPresupuesto

