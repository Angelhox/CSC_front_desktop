import * as Yup from "yup";
interface IUserCredentials {
  usuario: string;
  clave: string;
}
export function initialValues(): IUserCredentials {
  return {
    usuario: "",
    clave: "",
  };
}
export function validationSchema() {
  return Yup.object({
    usuario: Yup.string()
      .required("El nombre de usuario es requerido ")
      .min(10, "El nombre de usuario debe tener mas de 10 caracteres")
      .max(20, "El nombre de usuario debe tener menos de 20 caracteres"),
    clave: Yup.string()
      .required("La contraseña es requerida")
      .min(10, "La contraseña debe tener mas de 10 caracteres")
      .max(20, "La contraseña debe tener menos de 20 caracteres"),
  });
}
