/* eslint-disable @typescript-eslint/no-unused-vars */
import { Form } from './Form'
import { Table } from '../../components/Table/Table'
import { createColumnHelper } from '@tanstack/react-table'
import data from './MOCK_DATA.json'
import { TbDatabaseHeart } from 'react-icons/tb'
import { IoPersonAddOutline } from 'react-icons/io5'
import { IMenuActions } from '../../commons/interfaces/menu-actions'
import { TbEdit } from 'react-icons/tb'
import './Socios.scss'
import { useEffect, useState } from 'react'
import { ReportOptions } from '../../components/ReportOptions/ReportOptions'
import { ISocio } from '../../Interfaces/Socios/socios.interface'
import { UseSocios } from '../../context/socios.context'
const lisTitle = 'Socios'
export function Socios() {
  const [selectedData, setSelectedData] = useState<ISocio | null>(null)
  const [typeActions, setTypeActions] = useState<string>('Form')
  const [titleActions, setTitleActions] = useState<string>('+ Agregar un nuevo socio')
  const { socios: socios, loading, error } = UseSocios()
  const columnHelper = createColumnHelper<ISocio>()
  const columns = [
    columnHelper.accessor('id', {
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id
    }),
    // columnHelper.display({
    //   id: '#',
    //   header: () => 'N°',
    //   cell: (info) => info.row.index + 1,
    //   footer: (info) => info.column.id
    // }),
    columnHelper.accessor((row) => `${row.primerApellido} ${row.segundoApellido}`, {
      id: 'apellidos',
      header: () => 'Apellidos',
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id
    }),
    columnHelper.accessor((row) => `${row.primerNombre} ${row.segundoNombre}`, {
      id: 'name',
      cell: (info) => <i>{info.getValue()}</i>,
      header: () => <span>Nombres</span>,
      footer: (info) => info.column.id
    }),

    columnHelper.accessor('cedulaPasaporte', {
      header: () => <span>Cédula|Pasaporte</span>,
      footer: (info) => info.column.id
    }),
    columnHelper.accessor('correo', {
      header: 'Correo',
      footer: (info) => info.column.id
    }),
    columnHelper.accessor('fechaNacimiento', {
      header: 'Nacimiento',
      footer: (info) => info.column.id
    }),
    columnHelper.accessor('barrio', {
      header: 'Barrio',
      footer: (info) => info.column.id
    }),
    columnHelper.display({
      header: 'Actualizar',
      cell: ({ row }) => (
        <button
          onClick={() => {
            setSelectedData(row.original)
            setTypeActions('Edit')
            setTitleActions('Editar socio')
          }}
        >
          <TbEdit />
        </button>
      ),
      footer: 'Actualizar'
    })
  ]

  const openForm = (): void => {
    setTypeActions('Form')
    setTitleActions('+ Agregar un nuevo socio')
  }
  const openReport = () => {
    setTypeActions('Report')
    setTitleActions('Genera un reporte')
  }
  const menuActions: IMenuActions[] = [
    {
      id: 1,
      icon: TbDatabaseHeart,
      title: 'Reportes',
      onClick: openReport
    },
    {
      id: 2,
      icon: IoPersonAddOutline,
      title: 'Agregar',
      onClick: openForm
    }
  ]

  const renderActions = () => {
    console.log('render actions...')
    switch (typeActions) {
      case 'Report':
        console.log('render actions...')
        return <ReportOptions data={socios} />
      case 'Edit':
        console.log('render edit...')
        return <Form data={selectedData} returnForm={openForm} />
      case 'Form':
        console.log('render form...')
        return <Form data={null} />
      default:
        return null
    }
  }

  if (!socios) {
    return null
  }
  return (
    <div className="Container">
      <div className="container-list">
        {/* {JSON.stringify(socios)} */}
        <Table
          columns={columns}
          defaultData={socios}
          menuActions={menuActions}
          showMenuActions={true}
          listTitle={lisTitle}
          loading={loading}
          error={error}
        />
      </div>
      <div className="container-actions">
        <div className="actions">
          <section className="header">
            <h2>{titleActions}</h2>
          </section>
          <section className="body">
            {/* <Form /> */}
            {renderActions()}
          </section>
        </div>
      </div>
    </div>
  )
}
