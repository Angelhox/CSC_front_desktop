/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import './Servicios.scss'
import data from './MOCK_DATA.json'
import { TbDatabaseHeart } from 'react-icons/tb'
import { TbLayoutGridAdd } from 'react-icons/tb'
import { RiArrowGoBackLine } from 'react-icons/ri'
import {
  ButtonsServiceCard,
  ServiceCard
} from '../../components/Shared/Cards/ServiceCard/ServiceCard'
import { useEffect, useState } from 'react'
import { Form } from './Form'
import { IMenuActions } from '../../commons/interfaces/menu-actions'
import { ReportOptions } from '../../components/ReportOptions/ReportOptions'
import { IServicios, IServiciosDetalles } from '../../Interfaces/Servicios/servicios.interface'
import { UseServiciosContext } from '../../context/servicios.context'
import { ServiceInfoCard } from '@renderer/src/components/Shared/Cards/ServiceInfoCard/ServiceInfoCard'
import { BeneficiariesCards } from '@renderer/src/components/Shared/Cards/BeneficiariesCards/BeneficiariesCards'
import { getServicioDetalles } from '@renderer/src/api/DetallesServicios/detallesServicios.service'
import { HeaderForm } from '@renderer/src/components/Shared/Headers/HeaderForm'
import { useConfigStore } from '@renderer/src/store/config.store'
export function Servicios(): JSX.Element {
  const [detallesServicio, setDetallesServicio] = useState<IServiciosDetalles[] | null>(null)
  const { servicios: servicios, loading, error } = UseServiciosContext()
  const setIdServicioBase = useConfigStore((state) => state.setIdServicioBase)
  const setNombreServicioBase = useConfigStore((state) => state.setNombreServicioBase)
  const [typeActions, setTypeActions] = useState<string>('Form')
  const [typeList, setTypeList] = useState<string>('ServicesList')
  const [titleActions, setTitleActions] = useState<string>('+ Agregar un nuevo servicio')
  const [showHeaderActions, setShowHeaderActions] = useState<boolean>(false)
  const [selectedData, setSelectedData] = useState<IServicios | null>(null)
  useEffect(() => {
    servicios?.forEach((servicio) => {
      if (servicio.base === 1) {
        if (servicio.id) {
          setIdServicioBase(servicio.id)
        }
        setNombreServicioBase(servicio.nombre)
      }
    })
  }, [servicios])

  const openForm = (): void => {
    setTypeActions('Form')
    setSelectedData(null)
    setTitleActions('+ Agregar un nuevo servicio')
  }
  const openReport = (): void => {
    setTypeActions('Report')
    setTitleActions('Genera un reporte')
  }
  const renderActions = (): JSX.Element | null => {
    switch (typeActions) {
      case 'Report':
        return <ReportOptions data={servicios} />
      case 'Edit':
        return <Form data={selectedData} returnForm={openForm} />
      case 'Form':
        return <Form data={null} />
      case 'Beneficiaries':
        if (!detallesServicio) {
          return <div>Fail :|</div>
        }
        return <BeneficiariesCards detalles={detallesServicio} />
      default:
        return null
    }
  }
  const renderList = (): JSX.Element | null => {
    switch (typeList) {
      case 'ServicesList':
        if (!servicios) {
          return <div>No hay servicios para mostrar</div>
        }
        return (
          <ServiceCard
            dataServices={servicios}
            selectData={handleSelect}
            menuActions={menuActions}
            buttons={buttonsServiceCard}
            showHeader={true}
          />
        )
      case 'ServiceInfoCard':
        if (selectedData) {
          return <ServiceInfoCard service={selectedData} />
        }
        return <div>No se ha seleccionado un servicio</div>
      default:
        return null
    }
  }
  const handleSelect = (data: IServicios): void => {
    setSelectedData(data)
    setTypeActions('Edit')
    setTitleActions('Editar servicio')
  }
  const handleSelectToInfo = async (data: IServicios): Promise<void> => {
    setSelectedData(data)
    if (data.id) {
      setDetallesServicio(await getServicioDetalles(data.id))
    }
    setShowHeaderActions(true)
    setTitleActions('Beneficiarios')
    setTypeList('ServiceInfoCard')
    setTypeActions('Beneficiaries')
  }
  const handleCloseEstadistics = (): void => {
    setShowHeaderActions(false)
    setTitleActions('+ Agregar un nuevo servicio')
    setTypeList('ServicesList')
    setTypeActions('Form')
  }
  const menuActions: IMenuActions[] = [
    {
      id: 1,
      icon: TbDatabaseHeart,
      title: 'Reportes',
      onClick: openReport,
      show: !showHeaderActions
    },
    {
      id: 2,
      icon: TbLayoutGridAdd,
      title: 'Agregar',
      onClick: openForm,
      show: !showHeaderActions
    },
    {
      id: 3,
      icon: RiArrowGoBackLine,
      title: 'Volver',
      onClick: handleCloseEstadistics,
      show: showHeaderActions
    }
  ]
  const buttonsServiceCard: ButtonsServiceCard[] = [
    {
      class: 'btn btn-success',
      label: 'Actualizar',
      handleOnClick: handleSelect
    },
    {
      class: 'btn btn-border',
      label: 'Estadisticas',
      handleOnClick: handleSelectToInfo
    }
  ]
  // if (!servicios) {
  //   return null
  // }

  return (
    <div
      className={typeList === 'ServiceInfoCard' ? 'Container-servicios dos' : 'Container-servicios'}
    >
      <div className="container-list">{renderList()}</div>
      <div className="container-actions">
        <div className="actions-servicios">
          <HeaderForm
            show={true}
            title={titleActions}
            showMenuActions={showHeaderActions}
            menuActions={menuActions}
          />
          <section className="body">{renderActions()}</section>
        </div>
      </div>
    </div>
  )
}
