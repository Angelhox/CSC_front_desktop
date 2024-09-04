import { ReactNode, createContext, useCallback, useContext } from 'react'
import { IContratoSocioContrato } from '../Interfaces/Contratos/contratos.interface'
import useApi from '../api/commons/useApi'
import { getContratos } from '../api/Contratos/contratos.service'

interface contratosContextType {
  reloadRecords: () => void
  contratos: IContratoSocioContrato[] | null
  loading: boolean
  error: string | null
}
const ContratosContext = createContext<contratosContextType | undefined>(undefined)
interface contratosProviderProps {
  children: ReactNode
}
export function ContratosProvider({ children }: contratosProviderProps): JSX.Element {
  const {
    data: contratos,
    loading,
    error,
    refetch
  } = useApi<IContratoSocioContrato[]>(getContratos)
  const reloadRecords = useCallback(() => {
    refetch()
  }, [refetch])
  return (
    <ContratosContext.Provider value={{ contratos, reloadRecords, loading, error }}>
      {children}
    </ContratosContext.Provider>
  )
}
export const UseContratosContext = (): contratosContextType => {
  const context = useContext(ContratosContext)
  if (!context) {
    throw new Error('UseContratosContext debe usarse dentro de un ContextProvider')
  }
  return context
}
