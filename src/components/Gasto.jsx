import { formatearFecha } from '../helpers'
import IconoAhorro from '../img/icono_ahorro.svg'

const Gasto = ({ gasto }) => {

  const {gasto: nombreGasto, cantidad, categoria, fecha} = gasto

  return (
    <div className="gasto sombra">
      <div className="contenido-gasto">
        <img src={IconoAhorro} alt="icono del gasto" />
        <div className="descripcion-gasto">
          <p className="categoria">{categoria}</p>
          <p className="nombre-gasto">{nombreGasto}</p>
          <p className="fecha-gasto">
            Agregado el: {""}
            <span>{formatearFecha(fecha)}</span></p>
        </div>
      </div>
      <div className="cantidad-gasto">${cantidad}</div>
    </div>
  )
}

export default Gasto