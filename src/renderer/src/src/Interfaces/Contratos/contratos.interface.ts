import { IMedidor } from '../Medidores/medidores.interface'
import { IServiciosContratados } from '../Servicios/servicios.interface'
import { ISocio } from '../Socios/socios.interface'
// import { ISocio } from '../Socios/socios.interface'
export interface IContrato {
  // Cambio 2
  // sociosId: string | number
  id?: number | string
  codigo: string
  fecha: string
  estado: string
  medidorSn: string
  barrio: string
  callePrincipal?: string
  calleSecundaria?: string
  numeroCasa?: string
  referencia: string
  principalSn: string
  serviciosCompartidos?: number
  servicioContratado?: IServiciosContratados[]
  medidor: IMedidor[]
  // socio?: ISocio
}
export interface ISocioContrato {
  id?: number
  fechaContratacion: string
  fechaBaja: string
  estado: string
  sociosId: number | string
  socio?: ISocio
}
// export interface IContratoSocio {
//   contrato: IContrato
//   socio: ISocio
// }
export interface IContratoSocioContrato extends ISocioContrato {
  contrato: IContrato
}
export interface IContratoMedidor extends IContrato {
  medidor: IMedidor[]
}
