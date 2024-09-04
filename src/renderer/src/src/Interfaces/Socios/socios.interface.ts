export interface ISocio {
  id?: string | number;
  primerNombre: string;
  segundoNombre?: string;
  primerApellido: string;
  segundoApellido?: string;
  cedulaPasaporte: string;
  fechaNacimiento: string;
  telefonoMovil?: string;
  telefonoFijo?: string;
  correo: string;
  provincia: string;
  canton: string;
  parroquia: string;
  barrio: string;
  callePrincipal?: string;
  calleSecundaria?: string;
  numeroCasa?: string;
  referencia: string;
}
