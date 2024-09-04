export interface IDetallesServicio {
  id?: number | string
  subtotal: number
  descuento: number
  total: number
  saldo: number
  abono: number
  fechaEmision: string
  estado: string
  encabezadosId: number
  serviciosContratadosId: number
}
