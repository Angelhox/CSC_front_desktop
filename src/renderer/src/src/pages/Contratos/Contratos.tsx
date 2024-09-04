/* eslint-disable @typescript-eslint/no-unused-vars */
import { IMenuActions } from '../../commons/interfaces/menu-actions'
import './Contratos.scss'
import data from './MOCK_DATA.json'
import { Form } from './Form'
import { TbDatabaseHeart, TbEdit } from 'react-icons/tb'
import { useState } from 'react'
import { ReportOptions } from '../../components/ReportOptions/ReportOptions'
import { Table } from '../../components/Table/Table'
import { createColumnHelper } from '@tanstack/react-table'
import { UseContratosContext } from '../../context/contratos.context'
import {
  IContrato,
  IContratoMedidor,
  IContratoSocioContrato
} from '../../Interfaces/Contratos/contratos.interface'
import { IoPersonAddOutline } from 'react-icons/io5'
import {
  ButtonsServiceCard,
  ServiceCard
} from '../../components/Shared/Cards/ServiceCard/ServiceCard'
import { IServicios, IServiciosContratados } from '../../Interfaces/Servicios/servicios.interface'
import { UseServiciosContext } from '../../context/servicios.context'
import { getServiciosContratados } from '../../api/ServiciosContratados/servicios.contratados.service'

import { ServiceContractForm } from '../../components/ServiceContractForm/ServiceContractForm'
import { HeaderForm } from '../../components/Shared/Headers/HeaderForm'
import { useContratoStore } from '../../store/contratos'
import { getConfigServicioBase } from './functions'
import { IMedidor } from '@renderer/src/Interfaces/Medidores/medidores.interface'
export function Contratos(): JSX.Element | null {
  // Context
  const { contratos: contratos, loading, error } = UseContratosContext()
  const { servicios } = UseServiciosContext()
  const clearContratoData = useContratoStore((state) => state.clearContratoData)
  const setContratoId = useContratoStore((state) => state.setContratoId)
  const setContratoCodigo = useContratoStore((state) => state.setContratoCodigo)
  const setContratoMedidor = useContratoStore((state) => state.setContratoMedidor)
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
    columnHelper.accessor('contrato.codigo', {
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id
    }),
    columnHelper.accessor((row) => `${row.socio?.primerApellido} ${row.socio?.segundoApellido}`, {
      id: 'apellidos',
      cell: (info) => <i>{info.getValue()}</i>,
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
      header: () => <span>Cedula|Pasaporte</span>,
      footer: (info) => info.column.id
    }),
    columnHelper.accessor('contrato.barrio', {
      header: () => <span>Barrio</span>,
      footer: (info) => info.column.id
    }),
    columnHelper.accessor('contrato.medidorSn', {
      header: 'Medidor',
      footer: (info) => info.column.id
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
            // setServiciosOfSelected(
            //   getServiciosOfContratados(
            //     await getServiciosContratados(row.original.id)
            //   )
            // );
            setServiciosOfSelected(await getServiciosContratados(row.original.contrato.id))
            if (row.original.contrato.id) {
              setContratoId(row.original.contrato.id)
              setContratoCodigo(row.original.contrato.codigo)
              const dataMedidor: IMedidor | undefined = row.original.contrato.medidor.find(
                (medidor) => medidor.estado === 'Activo'
              )
              if (dataMedidor) {
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
      footer: 'Actualizar'
    })
  ]
  // Functions
  const openForm = (): void => {
    clearContratoData()
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
    if (selectedData) {
      setServiciosOfSelected(await getServiciosContratados(selectedData.contrato.id))
    }
    setTypeList('ServicesList')
  }
  const setSorteableAttribute = (sorteableAttribute: string): void => {
    console.log('Atributo: ', sorteableAttribute)
    setSorteable(sorteableAttribute)
  }
  const renderActions = (): JSX.Element | null => {
    switch (typeActions) {
      case 'Report':
        return <ReportOptions data={Object.keys(data[0])} />
      case 'Edit':
        return <Form data={selectedData} returnForm={openForm} />
      case 'Form':
        return <Form data={null} setFilterAttribute={setSorteableAttribute} />
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
            showMenuActions={true}
            listTitle={titleList}
            loading={loading}
            error={error}
          />
        )
      case 'ServicesList':
        return (
          <ServiceCard
            dataServices={servicios ? servicios : []}
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
          <section className="body">
            {/* <Form /> */}
            {renderActions()}
          </section>
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
