import { IContrato } from '../Contratos/contratos.interface'
import { ITiposDescuento } from '../Descuentos/descuentos.interface'
import { IDetallesServicio } from '../DetallesServicios/detallesServicios.interface'
import { IMedidor } from '../Medidores/medidores.interface'
export enum contratadoActivoEstado {
  Activo = 'Activo',
  Inactivo = 'Inactivo'
}
export enum enumTipoServicio {
  ServicioFijo = 'Servicio fijo',
  Cuota = 'Cuota'
}
export interface IServicios {
  id?: string | number
  nombre: string
  descripcion: string
  tipo: enumTipoServicio
  aplazableSn: string | boolean
  valoresDistintosSn: string
  individualSn: string
  fechaCreacion: string
  valor: number
  numeroPagos: number
  valorPagos: number
  base?: number
  selected?: boolean
  statusForContract?: contratadoActivoEstado
}
export interface IServiciosContratados {
  id?: number | string
  fechaEmision: string
  estado: contratadoActivoEstado
  valorIndividual: number
  numeroPagosIndividual: number
  valorPagosIndividual: number
  descuentoValor: number
  serviciosId: number | string
  contratosId: number | string
  descuentosId: number | string
  // Verificar si es necesario el atributo servicio
  servicio?: IServicios
  tipoDescuento?: ITiposDescuento
  base?: number
  medidor?: IMedidor
}
export interface IServiciosDetalles extends IServiciosContratados {
  detallesServicios: IDetallesServicio[]
  contrato: IContrato
  servicio: IServicios
  tipoDescuento: ITiposDescuento
}
