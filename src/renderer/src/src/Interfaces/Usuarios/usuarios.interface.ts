import { IRoles } from '../Roles/roles.interface'

// export interface dataUsuariosTable {
//   usuario: IUsuario;
//   rol: IRoles;
//   empleado: IEmpleado;
// }
export interface IEmpleado {
  id?: number | string
  cedula: string
  primerNombre: string
  segundoNombre?: string
  primerApellido: string
  segundoApellido?: string
  telefono: string
  correo: string
  usuarioSn: string
  cargoId: string
}
export interface IUsuario {
  id?: number | string
  usuario: string
  clave: string
  confirmClave: string
  fechaModificacion: string
  rolId: string
}
export interface IEmpleadoUsuario {
  rol: IRoles
  usuario: IUsuario
  empleado: IEmpleado
}
