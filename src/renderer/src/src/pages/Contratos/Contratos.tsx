import { IMenuActions } from '../../commons/interfaces/menu-actions'
import './Contratos.scss'
import data from './MOCK_DATA.json'
import { Form } from './Form'
import { TbDatabaseHeart, TbEdit } from 'react-icons/tb'
import { useEffect, useState } from 'react'
import { ReportOptions } from '../../components/ReportOptions/ReportOptions'
import { Table } from '../../components/Table/Table'
import { createColumnHelper } from '@tanstack/react-table'
import { UseContratosContext } from '../../context/contratos.context'
import { IContratoSocioContrato } from '../../Interfaces/Contratos/contratos.interface'
import { IoPersonAddOutline } from 'react-icons/io5'
import {
  ButtonsServiceCard,
  ServiceCard
} from '../../components/Shared/Cards/ServiceCard/ServiceCard'
import {
  IServicios,
  IServiciosContratados,
  enumTipoServicio
} from '../../Interfaces/Servicios/servicios.interface'
import { UseServiciosContext } from '../../context/servicios.context'
import { getServiciosContratados } from '../../api/ServiciosContratados/servicios.contratados.service'

import { ServiceContractForm } from '../../components/ServiceContractForm/ServiceContractForm'
import { HeaderForm } from '../../components/Shared/Headers/HeaderForm'
import { useContratoStore } from '../../store/contratos'
import { IMedidor } from '@renderer/src/Interfaces/Medidores/medidores.interface'
import { useConfigStore } from '@renderer/src/store/config.store'
export function Contratos(): JSX.Element | null {
  // Context
  const { contratos: contratos, loading, error } = UseContratosContext()
  const { servicios } = UseServiciosContext()
  const { setIdServicioBase, setNombreServicioBase } = useConfigStore((state) => state)
  const [serviciosFijos, setServiciosFijos] = useState<IServicios[]>()
  const {
    setContratoId,
    setContratoCodigo,
    setContratoMedidor,
    clearContratoData,
    setSocioContratoData,
    clearSocioContratoData
  } = useContratoStore((state) => state)
  // State
  const [selectedData, setSelectedData] = useState<IContratoSocioContrato | null>(null)
  const [selectService, setSelectedService] = useState<IServicios | null>(null)
  const [selectedServicioContratado, setSelectedServicioContratado] =
    useState<IServiciosContratados | null>(null)
  const [serviciosOfSelected, setServiciosOfSelected] = useState<IServiciosContratados[]>()
  const [titleList, setTitleList] = useState<string>('Contratos')
  const [showFormActions, setShowFormActions] = useState<boolean>(false)
  const [containerStyle, setContainerStyle] = useState<string>('')
  const [emptyContainer, setEmptyContainer] = useState<string>('')
  const [typeActions, setTypeActions] = useState<string>('Form')
  const [typeList, setTypeList] = useState<string>('Table')
  const [titleActions, setTitleActions] = useState<string>('+ Agregar un nuevo contrato')
  const [sorteable, setSorteable] = useState<string>()
  // Data
  const defaultData: IContratoSocioContrato[] | null = contratos
  const columnHelper = createColumnHelper<IContratoSocioContrato>()
  const columns = [
    columnHelper.accessor('id', {
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id
    }),
    columnHelper.accessor((row) => `${row.contrato.codigo}`, {
      header: 'Código',
      cell: (info) => info.getValue(),
      // footer: (info) => info.column.id
      footer: 'código'
    }),
    columnHelper.accessor((row) => `${row.socio?.primerApellido} ${row.socio?.segundoApellido}`, {
      id: 'apellidos',
      cell: (info) => info.renderValue(),
      header: () => <span>Apellidos</span>,
      footer: (info) => info.column.id
    }),
    columnHelper.accessor((row) => `${row.socio?.primerNombre} ${row.socio?.segundoNombre}`, {
      id: 'nombres',
      header: () => 'Nombres',
      cell: (info) => info.renderValue(),
      footer: (info) => info.column.id
    }),
    columnHelper.accessor('socio.cedulaPasaporte', {
      header: () => <span>Identificación</span>,
      footer: 'identificación'
    }),
    columnHelper.accessor((row) => `${row.contrato.sector.barrio}`, {
      id: 'barrio',
      header: () => <span>Barrio</span>,
      footer: 'barrio'
    }),
    columnHelper.accessor('contrato.medidorSn', {
      header: 'Medidor',
      footer: 'medidor'
    }),
    columnHelper.accessor('estado', {
      header: 'Estado',
      footer: (info) => info.column.id
    }),
    columnHelper.display({
      header: 'Actualizar',
      cell: ({ row }) => (
        <button
          onClick={async () => {
            setSelectedData(row.original)
            setSocioContratoData(row.original)
            setServiciosOfSelected(await getServiciosContratados(row.original.contrato.id))
            if (row.original.contrato.id) {
              setContratoId(row.original.contrato.id)
              setContratoCodigo(row.original.contrato.codigo)
              const dataMedidor: IMedidor | undefined = row.original.contrato.medidor.find(
                (medidor) => medidor.estado === 'Activo'
              )
              if (dataMedidor) {
                console.log('Setting data medidor')
                setContratoMedidor(dataMedidor)
              }
            }
            setTypeActions('Edit')
            setTitleActions('Editar contrato')
            setTypeList('ServicesList')
            setTitleList('Servicios disponibles')
            setContainerStyle(' reverse')
            setShowFormActions(true)
            setEmptyContainer(' empty-container')
          }}
        >
          <TbEdit />
        </button>
      ),
      footer: 'actualizar'
    })
  ]
  // Functions
  useEffect(() => {
    const servicioBaseData = servicios?.find((servicio) => servicio.base === 1)
    if (servicioBaseData) {
      servicioBaseData.id && setIdServicioBase(servicioBaseData.id)
      setNombreServicioBase(servicioBaseData.nombre)
    }
    setServiciosFijos(
      servicios?.filter((servicio) => servicio.tipo === enumTipoServicio.ServicioFijo)
    )
  }, [servicios])
  const openForm = (): void => {
    clearContratoData()
    clearSocioContratoData()
    setTypeActions('Form')
    setTypeList('Table')
    setTitleList('Contratos')
    setContainerStyle('')
    setEmptyContainer('')
    setTitleActions('+ Agregar un nuevo contrato')
    setShowFormActions(false)
  }
  const openReport = (): void => {
    clearContratoData()
    setTypeActions('Report')
    setTitleActions('Genera un reporte')
  }
  const backToServicesList = async (): Promise<void> => {
    setSelectedServicioContratado(null)
    // usando selected data
    if (selectedData) {
      setServiciosOfSelected(await getServiciosContratados(selectedData.contrato.id))
    }
    setTypeList('ServicesList')
  }
  const setSorteableAttribute = (sorteableAttribute: string): void => {
    console.log('Atributo: ', sorteableAttribute)
    setSorteable(sorteableAttribute)
  }
  const clearSorteableAttribute = (): void => {
    setSorteable('')
  }
  const renderActions = (): JSX.Element | null => {
    switch (typeActions) {
      case 'Report':
        return <ReportOptions data={Object.keys(data[0])} />
      case 'Edit':
        return <Form dataSocioContrato={selectedData} returnForm={openForm} />
      case 'Form':
        return <Form dataSocioContrato={null} setFilterAttribute={setSorteableAttribute} />
      default:
        return null
    }
  }
  const renderList = (): JSX.Element | null => {
    switch (typeList) {
      case 'Table':
        return (
          <Table
            columns={columns}
            defaultData={defaultData}
            menuActions={menuActions}
            filterAttribute={sorteable}
            clearFilterAttribute={clearSorteableAttribute}
            showMenuActions={true}
            listTitle={titleList}
            loading={loading}
            error={error}
          />
        )
      case 'ServicesList':
        return (
          <ServiceCard
            dataServices={serviciosFijos ? serviciosFijos : []}
            serviciosContratadosSelected={serviciosOfSelected}
            menuActions={menuActions}
            title="Servicios disponibles"
            buttons={buttonsServiceCard}
          />
        )
      case 'ServiceContractForm':
        return (
          <ServiceContractForm
            dataServicio={selectService}
            dataServicioContratado={selectedServicioContratado}
            back={backToServicesList}
          />
        )
      default:
        return null
    }
  }
  const handleContractForm = async (
    servicio: IServicios,
    servicioContratado?: IServiciosContratados
  ): Promise<void> => {
    setTypeList('ServiceContractForm')
    setTitleList('Contratar servicio')
    setSelectedService(servicio)
    console.log('Contratado no existe')
    if (servicioContratado) {
      console.log('Contratado existe')
      setSelectedServicioContratado(servicioContratado)
    }
  }
  const buttonsServiceCard: ButtonsServiceCard[] = [
    {
      label: 'Contratar',
      class: 'btn btn-success',
      handleOnClick: handleContractForm
    }
  ]

  const menuActions: IMenuActions[] = [
    {
      id: 1,
      icon: IoPersonAddOutline,
      title: 'Agregar',
      onClick: openForm,
      show: true
    },
    {
      id: 2,
      icon: TbDatabaseHeart,
      title: 'Reportes',
      onClick: openReport,
      show: true
    }
  ]
  if (!contratos) {
    return null
  }

  return (
    <div className={'Container-contratos' + containerStyle}>
      <div className="container-actions">
        <div className="actions-contratos">
          <HeaderForm
            show={true}
            menuActions={menuActions}
            title={titleActions}
            showMenuActions={showFormActions}
          />
          <section className="body">{renderActions()}</section>
        </div>
      </div>
      <div className={'container-list' + emptyContainer}>
        <HeaderForm
          show={showFormActions}
          menuActions={menuActions}
          title={titleList}
          showMenuActions={false}
        />
        {renderList()}
      </div>
    </div>
  )
}
