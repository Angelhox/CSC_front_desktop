import { create } from 'zustand'
type State = {
  idServicioBase: number | string | null
  nombreServicioBase: string | null
}
type Actions = {
  setIdServicioBase: (id: number | string) => void
  setNombreServicioBase: (nombre: string) => void
  clearServicioBase: () => void
}
export const useConfigStore = create<State & Actions>((set) => ({
  idServicioBase: null,
  nombreServicioBase: null,
  setIdServicioBase: (id: number | string): void => set({ idServicioBase: id }),
  setNombreServicioBase: (nombre: string): void => set({ nombreServicioBase: nombre }),
  clearServicioBase: (): void => set({ idServicioBase: null, nombreServicioBase: null })
}))
