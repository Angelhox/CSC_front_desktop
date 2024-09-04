import { HiUserCircle } from 'react-icons/hi2'
import './BeneficiariesCards.scss'
import { IServiciosDetalles } from '@renderer/src/Interfaces/Servicios/servicios.interface'
import { IDetallesServicio } from '@renderer/src/Interfaces/DetallesServicios/detallesServicios.interface'
const colors = ['#c0392b', '#e74c3c', '#31476e', '#4071b3 ', '#28a8e1'] // Lista de colores
interface Props {
  detalles: IServiciosDetalles[]
}
export const BeneficiariesCards = ({ detalles }: Props): JSX.Element => {
  // const [bgColor, setBgColor] = useState('')
  const getRandomColor = (): string => {
    return colors[Math.floor(Math.random() * colors.length)]
  }
  interface ItemCuotas {
    total: number
    abonado: number
    index: number
    abonadoIndex: number
  }
  const getCuotas = (detalles: IDetallesServicio[] | null): JSX.Element => {
    let resultado: ItemCuotas = { total: 0, abonado: 0, index: 0, abonadoIndex: 0 }
    if (detalles) {
      resultado = detalles.reduce(
        (acc: ItemCuotas, detalle: IDetallesServicio, index) => {
          acc.index = index
          acc.total += detalle.total
          if (detalle.estado === 'completado') {
            acc.abonado += detalle.total
            acc.abonadoIndex += 1
          }
          return acc
        },
        { total: 0, abonado: 0, index: 0, abonadoIndex: 0 }
      )
    }

    return (
      <div className="card-values">
        <div>
          <p className="title">Cuotas</p>
          <p>{resultado.index}</p>
          <p>${resultado.total}</p>
        </div>
        <div>
          <p className="title">Abonado</p>
          <p>{resultado.abonadoIndex}</p>
          <p>${resultado.abonado}</p>
        </div>
        <div>
          <p className="title">Pendiente</p>
          <p>{resultado.index - resultado.abonadoIndex}</p>
          <p>${resultado.total - resultado.abonado}</p>
        </div>
      </div>
    )
  }
  return (
    <div className="BeneficiariesCards">
      {detalles.map((detalle, index) => (
        <div className="card" key={index}>
          <div className="card-content">
            <div className="card-img" style={{ backgroundColor: `${getRandomColor()}` }}>
              <p>{detalle.contrato.socio?.primerNombre.substring(0, 1)}</p>
            </div>
            <div className="card-beneficiarie">
              <div className="beneficiario">
                <h1>{` ${detalle.contrato.socio?.primerApellido} ${detalle.contrato.socio?.segundoApellido} ${detalle.contrato.socio?.primerNombre}`}</h1>
                <HiUserCircle />
              </div>
              <p>{detalle.contrato.socio?.cedulaPasaporte}</p>
              <p>{`Barrio ${detalle.contrato.barrio}`}</p>
              <p>{detalle.contrato.codigo}</p>
            </div>
            {getCuotas(detalle.detallesServicios)}
          </div>
        </div>
      ))}
    </div>
  )
}
