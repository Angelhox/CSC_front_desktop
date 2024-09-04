import { z } from "zod";

export const socioSchema = z.object({
  primerNombre: z
    .string()
    .min(3, { message: "Debes ingresar mínimo 3 caracteres" })
    .max(20, { message: "Debes ingresar un máximo de 20 caracteres" }),
  segundoNombre: z.optional(
    z.string().max(20, { message: "Debes ingresar un máximo de 20 caracteres" })
  ),
  primerApellido: z
    .string()
    .min(3, { message: "Debes ingresar mínimo 3 caracteres" })
    .max(20, { message: "Debes ingresar un máximo de 20 caracteres" }),
  segundoApellido: z.optional(
    z.string().max(20, { message: "Debes ingresar un máximo de 20 caracteres" })
  ),
  cedulaPasaporte: z
    .string()
    .min(10, { message: "Debes ingresar un minímo de 10 numeros" })
    .max(13, { message: "Debes ingresar un máximo de 13 números" }),
  fechaNacimiento: z
    .string()
    .refine((dob) => new Date(dob).toString() !== "Invalid Date", {
      message: "Debes ingresar una fecha válida",
    }),
  telefonoMovil: z.optional(
    z.string().max(10, { message: "Debes ingresar un máximo de 10 digitos" })
  ),
  telefonoFijo: z.optional(
    z.string().max(10, { message: "Debes ingresar un máximo de 10 digitos" })
  ),
  correo: z.preprocess((val) => {
    if (val === "") {
      return "jaapsemail@gmail.com";
    }
    return val;
  }, z.string().email("Ingresa un correo válido")),
  provincia: z
    .string()
    .min(3, { message: "Debes ingresar un mínimo de 3 caracteres" })
    .max(45, { message: "Debes ingresar un máximo de 45 caracteres" }),
  canton: z
    .string()
    .min(3, { message: "Debes ingresar un mínimo de 3 caracteres" })
    .max(45, { message: "Debes ingresar un máximo de 45 caracteres" }),
  parroquia: z
    .string()
    .min(3, { message: "Debes ingresar un mínimo de 3 caracteres" })
    .max(45, { message: "Debes ingresar un máximo de 45 caracteres" }),
  barrio: z
    .string()
    .min(3, { message: "Debes ingresar un mínimo de 3 caracteres" })
    .max(45, { message: "Ingresa un m+aximo de 45 caracteres" }),
  callePrincipal: z.optional(
    z.string().max(45, { message: "Debes ingresar un máximo de 45 caracteres" })
  ),
  calleSecundaria: z.optional(
    z.string().max(45, { message: "Debes ingresar un máximo de 45 caracteres" })
  ),
  numeroCasa: z.optional(
    z.string().max(8, { message: "Ingresa un máximo de 8 caracteres" })
  ),
  referencia: z
    .string()
    .min(2, { message: "Ingresa un mínimo de 2 caracteres" })
    .max(45, { message: "Ingresa un máximo de 45 caracteres" }),
});
