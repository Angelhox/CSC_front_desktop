/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react'
import './Home.scss'
import {
  ChartDataItem,
  DoughnutChart
} from '../../components/Shared/Charts/DoughnutChart/DoughnutChart'
import { UseSectoresContext } from '../../context/sectores.context'
import { UseServiciosContratadosContext } from '../../context/servicios-contratados.context'
import { BarChart } from '../../components/Shared/Charts/BarChart/BarChart'
import { contarContratadosByServicioNombre } from './funtions'
import {
  DashboardCard,
  DashboardCardsProps
} from '../../components/Shared/Cards/DashboardCard/DashboardCard'
import { base, media, reportes } from '../../assets'
import { getConfigServicioBase, IConfigServicioBase } from '../Contratos/functions'
import { useConfigStore } from '../../store/config.store'
import { BarsItems, SorteableBars } from '../../components/Shared/Bars/SorteableBars/SorteableBars'
import { FcIdea, FcPrint, FcStart, FcOnlineSupport, FcCalendar, FcOvertime } from 'react-icons/fc'
import { FcAlarmClock } from 'react-icons/fc'
import { PrinterSelect } from '@renderer/src/components/Shared/PrinterSelect/PrinterSelect'
import ReactDOM from 'react-dom/client'
import Swal from 'sweetalert2'
import { PrinterSelectModal } from '@renderer/src/components/Shared/Modals/PrinterSelectModal/PrinterSelectModal'
import { UseServiciosContext } from '@renderer/src/context/servicios.context'
export function Home(): JSX.Element {
  const { sectores } = UseSectoresContext()
  const { serviciosContratados } = UseServiciosContratadosContext()
  const { servicioBase } = UseServiciosContext()
  const setIdServicioBase = useConfigStore((state) => state.setIdServicioBase)
  const setNombreServicioBase = useConfigStore((state) => state.setNombreServicioBase)
  const clearServicioBase = useConfigStore((state) => state.clearServicioBase)
  const storeBase = useConfigStore((state) => state.idServicioBase)
  const storeNombreBase = useConfigStore((state) => state.nombreServicioBase)
  const [dataSectores, setDataSectores] = useState<ChartDataItem[]>()
  const [dataServiciosContratados, setDataServiciosContratados] = useState<ChartDataItem[]>()
  const [configServicioBase, setConfigServicioBase] = useState<IConfigServicioBase>()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [sorteable, setSorteable] = useState<BarsItems[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [successPrinter, setSuccessPrinter] = useState(false)
  const [loadingPrinter, setLoadingPrinter] = useState(true)
  const [errorPrinter, setErrorPrinter] = useState<string | null>(null)
  const [selectedPrinter, setSelectedPrinter] = useState('Impresora no seleccionada')
  const openModal = (): void => setIsModalOpen(true)
  const closeModal = (): void => setIsModalOpen(false)
  useEffect(() => {
    setLoadingPrinter(true)
    setErrorPrinter(null)
    const loadSelectedPrinter = async (): Promise<void> => {
      try {
        const config = await window.api.readConfig()
        setSelectedPrinter(config.defaultPrinter)
        setTimeout(() => {
          setSuccessPrinter(true)
          setLoadingPrinter(false)
        }, 3000)
      } catch (error) {
        setTimeout(() => {
          setErrorPrinter('Failed to load printer')
          setLoadingPrinter(false)
        }, 3000)
      }
    }
    loadSelectedPrinter()
  }, [])
  useEffect(() => {
    setLoading(true)
    setError(null)
    const fetchConfigServicioBase = async (): Promise<void> => {
      try {
        if (servicioBase) {
          console.log('1')
          if (servicioBase.id) {
            console.log('Servicio base: ', servicioBase.id)
            setIdServicioBase(servicioBase?.id)
            setNombreServicioBase(servicioBase?.nombre)
          }
        } else {
          clearServicioBase()
          console.log('Limpiando servicio base')
        }
        setTimeout(() => {
          setSuccess(true)
          setLoading(false)
        }, 3000) // Simula una carga de 5 segundos
      } catch (error) {
        console.log('Failed to fetch config: ', error)
        setTimeout(() => {
          setError('Failed to fetch config')
          setLoading(false)
        }, 3000) // Simula una carga de 5 segundos incluso en caso de error
      }
    }
    fetchConfigServicioBase()
  }, [servicioBase])

  useEffect(() => {
    if (sectores) {
      setDataSectores(
        sectores.map((sector) => {
          return {
            label: sector.barrio,
            value: parseInt(sector.numeroSocios)
          }
        })
      )
    }
    if (serviciosContratados) {
      const contratadosContados = contarContratadosByServicioNombre(serviciosContratados)
      setDataServiciosContratados(
        contratadosContados?.map((contratado) => {
          return {
            label: contratado.nombreServicio || 'Service',
            value: contratado.servicios.length
          }
        })
      )
    }
  }, [sectores, serviciosContratados])
  useEffect(() => {
    const updatedSorteable: BarsItems[] = [
      {
        index: 0,
        title: 'Servicio Base',
        label: servicioBase?.nombre || '',
        icon: FcIdea,
        error: error,
        loading: loading,
        success: success,
        onClick: (): void => {
          console.log('Actions')
        }
      },
      {
        index: 1,
        title: 'Printers',
        label: selectedPrinter,
        icon: FcPrint,
        error: errorPrinter,
        loading: loadingPrinter,
        success: successPrinter,
        onClick: openModal
      },
      {
        index: 2,
        title: 'Tutoriales',
        label: 'https://www.youtube.com/@angelcachupud9119',
        icon: FcStart,
        error: error,
        loading: loading,
        success: success,
        onClick: (): void => {
          console.log('Actions')
        }
      },
      {
        index: 3,
        title: 'Servicio Técnicos',
        label: 'DinoSource Services',
        icon: FcOnlineSupport,
        error: error,
        loading: loading,
        success: success,
        onClick: (): void => {
          console.log('Actions')
        }
      }
    ]
    setSorteable(updatedSorteable)
  }, [
    servicioBase,
    selectedPrinter,
    error,
    loading,
    success,
    errorPrinter,
    loadingPrinter,
    successPrinter
  ])

  const dashboarCards: DashboardCardsProps[] = [
    {
      title: 'Fechas de recaudación',
      // image: base,
      icon: FcCalendar,
      error: error,
      loading: loading,
      success: success
    },
    {
      title: 'Corte de servicio',
      // image: reportes,
      icon: FcOvertime,
      error: error,
      loading: loading,
      success: success
    },
    {
      title: 'Registro de asistencia',
      // image: media,
      icon: FcAlarmClock,
      error: error,
      loading: loading,
      success: success
    }
  ]
  const setPrinterLabel = (printerName: string): void => {
    console.log('Changing label')
    setSelectedPrinter(printerName)
  }
  return (
    <div className="ContainerHome">
      <div className="container-chart">
        <h1>Socios registrados</h1>
        {dataSectores ? (
          <DoughnutChart chartData={dataSectores} label="Socios registrados" />
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <div className="container-chart-principal">
        <h1>Servicios registrados</h1>
        {dataServiciosContratados ? (
          <BarChart chartData={dataServiciosContratados} label="Contratados" />
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <div className="container-cards">
        <PrinterSelectModal
          isOpen={isModalOpen}
          onClose={closeModal}
          onSelect={setPrinterLabel}
          title="Impresora en uso"
        />
        {dashboarCards.map((card, index) => (
          <DashboardCard
            key={index}
            image={card.image}
            title={card.title}
            loading={card.loading}
            error={card.error}
            success={card.success}
            icon={card.icon}
          />
        ))}
      </div>
      <div className="container-bars">
        <SorteableBars dataSorteable={sorteable} />
      </div>
    </div>
  )
}
