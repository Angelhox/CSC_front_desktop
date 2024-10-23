import { create } from 'zustand'
import { IMedidor } from '../Interfaces/Medidores/medidores.interface'
import { IContratoSocioContrato } from '../Interfaces/Contratos/contratos.interface'

type State = {
  contratoId: string | number | null
  contratoCodigo: string | null
  contratoMedidor: IMedidor | null
  socioContratoData: IContratoSocioContrato | null
  filterAttribute: string | null
}
type Actions = {
  setContratoId: (id: string | number) => void
  setContratoCodigo: (codigo: string) => void
  setContratoMedidor: (medidor: IMedidor) => void
  setSocioContratoData: (socioContrato: IContratoSocioContrato) => void
  setFilterAttribute: (filterAttribute: string) => void
  clearContratoData: () => void
  clearSocioContratoData: () => void
  clearFilterAttribute: () => void
}
export const useContratoStore = create<State & Actions>((set) => ({
  contratoId: null,
  contratoCodigo: null,
  contratoMedidor: null,
  socioContratoData: null,
  filterAttribute: null,
  setContratoId: (id: string | number): void => set({ contratoId: id }),
  setContratoCodigo: (codigo: string): void => set({ contratoCodigo: codigo }),
  setContratoMedidor: (medidor: IMedidor): void => set({ contratoMedidor: medidor }),
  clearContratoData: (): void => {
    set({ contratoId: null })
    set({ contratoCodigo: null })
    set({ contratoMedidor: null })
  },
  setSocioContratoData: (socioContrato: IContratoSocioContrato): void =>
    set({ socioContratoData: socioContrato }),
  setFilterAttribute: (filter: string): void => set({ filterAttribute: filter }),
  clearSocioContratoData: (): void => {
    console.log('clearing...')
    set({ socioContratoData: null })
  },
  clearFilterAttribute: (): void => {
    set({ filterAttribute: null })
  }
}))
