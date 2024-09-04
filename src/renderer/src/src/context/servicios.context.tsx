/* eslint-disable @typescript-eslint/no-unused-vars */
import { ReactNode, createContext, useCallback, useContext } from 'react'
import { IServicios } from '../Interfaces/Servicios/servicios.interface'
import { getServicioBase, getServicios } from '../api/Servicios/servicio.service'
import useApi from '../api/commons/useApi'

interface serviciosContexType {
  reloadRecords: () => void
  reloadBase: () => void
  servicios: IServicios[] | null
  servicioBase: IServicios | null
  loading: boolean
  loadingBase: boolean
  error: string | null
  errorBase: string | null
}
const ServiciosContext = createContext<serviciosContexType | undefined>(undefined)
interface serviciosProviderProps {
  children: ReactNode
}
export function ServiciosProvider({ children }: serviciosProviderProps): JSX.Element {
  const { data: servicios, loading, error, refetch } = useApi<IServicios[]>(getServicios)
  const {
    data: servicioBase,
    loading: loadingBase,
    error: errorBase,
    refetch: reloadBase
  } = useApi<IServicios>(getServicioBase)
  const reloadRecords = useCallback(() => {
    refetch()
  }, [refetch])
  return (
    <ServiciosContext.Provider
      value={{
        servicios,
        reloadRecords,
        loading,
        error,
        servicioBase,
        reloadBase,
        loadingBase,
        errorBase
      }}
    >
      {children}
    </ServiciosContext.Provider>
  )
}
export const UseServiciosContext = (): serviciosContexType => {
  const context = useContext(ServiciosContext)
  if (!context) {
    throw new Error('UseServiciosContext debe usarse dentro de un ServiciosProvider')
  }
  return context
}
