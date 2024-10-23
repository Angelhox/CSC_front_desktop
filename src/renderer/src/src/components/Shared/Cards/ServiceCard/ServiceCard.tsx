/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { CSSProperties, MouseEventHandler, useState } from 'react'
import {
  contratadoActivoEstado,
  IServicios,
  IServiciosContratados
} from '../../../../Interfaces/Servicios/servicios.interface'
import { services } from '../../../../assets'
import './ServiceCard.scss'
import { TfiSearch } from 'react-icons/tfi'
import { IMenuActions } from '../../../../commons/interfaces/menu-actions'
import { HeaderForm } from '../../Headers/HeaderForm'
import { IconType } from 'react-icons'
export interface Service {
  id: number
  name: string
  description: string
  type: string
  price: number
}
export interface ButtonsServiceCard {
  label: string
  icon?: IconType
  // onClick?: MouseEventHandler<HTMLButtonElement> | any;
  handleOnClick: (valuesServicio?: any, valuesServicioContratado?: any) => void
  class: string
}
type Props = {
  dataServices: IServicios[]
  selectData?: (data: IServicios) => void
  style?: CSSProperties
  menuActions: IMenuActions[]
  title?: string
  serviciosContratadosSelected?: IServiciosContratados[]
  buttons?: ButtonsServiceCard[]
  showHeader?: boolean
}
const validateSelected = (
  serviciosContratados: IServiciosContratados[],
  servicio: IServicios
): { selected: boolean; status?: contratadoActivoEstado } => {
  const selected = serviciosContratados.find((s) => s.servicio?.id === servicio.id)
  if (selected) {
    const status = selected.estado
    return { selected: true, status: status }
  }
  return { selected: false }
}
export function ServiceCard({
  style,
  dataServices,
  menuActions,
  title,
  serviciosContratadosSelected,
  buttons,
  showHeader
}: Props) {
  const [searchTerm, setSearchTerm] = useState<string>('')
  let filteredServices: IServicios[] | null
  if (!dataServices) {
    return null
  } else {
    if (serviciosContratadosSelected) {
      for (const servicio of dataServices) {
        const { selected, status } = validateSelected(serviciosContratadosSelected, servicio)
        servicio.selected = selected
        servicio.statusForContract = status
      }
    }
    filteredServices = dataServices.filter((item) => {
      const searchTermLower = searchTerm.toLowerCase()
      return (
        item.nombre.toLowerCase().includes(searchTermLower) ||
        item.descripcion.toLowerCase().includes(searchTermLower) ||
        item.tipo.toLowerCase().includes(searchTermLower) ||
        item.valor.toString().toLowerCase().includes(searchTermLower)
      )
    })
  }
  return (
    <>
      <HeaderForm
        show={showHeader ? showHeader : false}
        menuActions={menuActions}
        title={title ? title : 'Servicios'}
        showMenuActions={true}
      />
      <section className="body">
        <div className="search-slider-cards ">
          <TfiSearch />
          <div className="input-group type-google">
            <input
              type="text"
              id="searchInput"
              className=""
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              required
              placeholder=""
            />
            <label htmlFor="searchInput">Buscar</label>
          </div>
        </div>
        <div className="slider-cards">
          {filteredServices.map((data) => (
            <div className={`card ${data.selected ? ' selected' : ''}`} key={data.id} style={style}>
              <div className="card-content">
                <img src={services} alt="" className="card-img" />
                <h1 className="card-title">{data.nombre}</h1>
                <p className={`card-indicator ${data.selected ? ' valid' : ''}`}>
                  {data.selected ? data.statusForContract : ''}
                </p>
                <div className="card-body">
                  <div className="card-description">{data.descripcion}</div>
                  <div className="card-star">
                    <span className="star">&#9733;</span>
                    <span className="rating-value">{data.tipo}</span>
                  </div>
                  <p className="card-price">${data.valor}</p>
                </div>
                <div className="card-footer">
                  {buttons?.map((button, index) => (
                    <button
                      key={index}
                      className={button.class}
                      // onClick={
                      //   button.label === "Actualizar"
                      //     ? selectData
                      //       ? () => selectData(data)
                      //       : () => {
                      //           console.log("No action");
                      //         }
                      //     : button.onClick
                      //     ? button.onClick()
                      //     : () => {
                      //         console.log("No action");
                      //       }
                      // }
                      onClick={() => {
                        if (data.selected) {
                          const dataContratado: IServiciosContratados | undefined =
                            serviciosContratadosSelected?.find((s) => s.servicio?.id === data.id)
                          console.log('Selected founded')
                          button.handleOnClick(data, dataContratado)
                        } else {
                          console.log('Selected no founded')
                          button.handleOnClick(data)
                        }
                      }}
                    >
                      {data.selected ? 'Actualizar' : button.label}
                    </button>
                  ))}
                  {/* <button
                    className="btn btn-success"
                    onClick={() => {
                      // console.log("select data");
                      selectData ? selectData(data) : "";
                    }}
                  >
                    Actualizar
                  </button>
                  <button className="btn btn-border">Estadisticas</button> */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
