import { IServicios } from '@renderer/src/Interfaces/Servicios/servicios.interface'
import './ServiceInfoCard.scss'
import { services } from '@renderer/src/assets'
import { ChartDataItem, PieChart } from '../../Charts/PieChart/PieChart'
interface Props {
  service?: IServicios
}
export function ServiceInfoCard({ service }: Props): JSX.Element {
  if (!service) {
    return <div>Servicio no seleccionado</div>
  }
  const tempData: ChartDataItem[] = [
    { label: 'Cancelados', value: 75 },
    { label: 'Pendientes', value: 25 }
  ]
  return (
    <div className="ServiceInfoCard">
      <div className="card-content">
        <img src={services} alt="no file" className="card-img" />
        <h1 className="card-title">{service.nombre}</h1>
        <div className="card-subtitle">
          <h3>{service.tipo}</h3>
          <h3>{service.aplazableSn === 'Si' ? 'Aplazable' : 'No aplazable'}</h3>
        </div>
        <hr className="divider" />
        <div className="card-values">
          <div>
            <p className="title">Valor</p> <p>${service.valor}</p>
          </div>
          <div>
            <p className="title">Pagos</p> <p>{service.numeroPagos}</p>
          </div>
          <div>
            <p className="title">Cuota</p> <p>${service.valorPagos}</p>
          </div>
        </div>
        <div className="card-xtra">
          <p> {service.individualSn === 'Si' ? 'Por socio' : 'Por contrato'}</p>
          <p> {service.valoresDistintosSn === 'Si' ? 'Valores distintos' : 'Valores generales'}</p>
        </div>
        <div className="card-chart">
          {' '}
          <PieChart chartData={tempData} label="Contratos" />
        </div>
      </div>
    </div>
  )
}
