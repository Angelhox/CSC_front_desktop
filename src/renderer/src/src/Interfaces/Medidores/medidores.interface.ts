export enum medidorEstado {
  Activo = 'Activo',
  Innactivo = 'Innactivo'
}
export interface IMedidor {
  id?: string | number
  codigo: string
  fechaInstalacion?: string
  marca: string
  observacion: string
  contratosId: number | string
  estado: medidorEstado
  fechaBaja: string
  ultimaLectura: number
}
