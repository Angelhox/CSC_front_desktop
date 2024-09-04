import { create } from 'zustand'
import { IMedidor } from '../Interfaces/Medidores/medidores.interface'

type State = {
  contratoId: string | number | null
  contratoCodigo: string | null
  contratoMedidor: IMedidor | null
}
type Actions = {
  setContratoId: (id: string | number) => void
  setContratoCodigo: (codigo: string) => void
  setContratoMedidor: (medidor: IMedidor) => void
  clearContratoData: () => void
}
export const useContratoStore = create<State & Actions>((set) => ({
  contratoId: null,
  contratoCodigo: null,
  contratoMedidor: null,
  setContratoId: (id: string | number): void => set({ contratoId: id }),
  setContratoCodigo: (codigo: string): void => set({ contratoCodigo: codigo }),
  setContratoMedidor: (medidor: IMedidor): void => set({ contratoMedidor: medidor }),
  clearContratoData: (): void => {
    set({ contratoId: null })
    set({ contratoCodigo: null })
    set({ contratoMedidor: null })
  }
}))
