import { z } from 'zod'
export const empleadoSchema = z.object({
  // Tabla empleados !!
  primerNombre: z
    .string()
    .min(3, { message: 'Debes ingresar mínimo 3 caracteres' })
    .max(20, { message: 'Debes ingresar un máximo de 20 caracteres' }),
  segundoNombre: z.optional(
    z.string().max(20, { message: 'Debes ingresar un máximo de 20 caracteres' })
  ),
  primerApellido: z
    .string()
    .min(3, { message: 'Debes ingresar mínimo 3 caracteres' })
    .max(20, { message: 'Debes ingresar un máximo de 20 caracteres' }),
  segundoApellido: z.optional(
    z.string().max(20, { message: 'Debes ingresar un máximo de 20 caracteres' })
  ),
  cedula: z
    .string()
    .min(10, { message: 'Debes ingresar un minímo de 10 numeros' })
    .max(13, { message: 'Debes ingresar un máximo de 13 números' }),
  telefono: z
    .string()
    .min(10, { message: 'Debes ingresar un mínimo de 10 digitos' })
    .max(10, { message: 'Debes ingresar un máximo de 10 digitos' }),

  correo: z.string().email({ message: 'Debes ingresar un correo válido' }),
  cargoId: z.preprocess(
    (val) => {
      if (typeof val === 'string') {
        return parseFloat(val)
      }
      return val
    },
    z
      .number({ invalid_type_error: 'Ingresa un número válido' })
      .positive({ message: 'Ingresa un número válido' })
      .min(1, { message: 'Ingresa un número válido' })
      .int('Ingresa un número entero')
  )
})
// Tabla usuarios !!
export const usuarioSchema = z
  // Cambiar validacion de usuario a email !!
  .object({
    usuario: z
      .string()
      .min(10, { message: 'Ingresa 10 caracteres como mínimo' })
      .max(255, { message: 'Ingresa 255 caracteres como máximo' }),
    clave: z
      .string()
      .min(12, { message: 'Ingresa 12 caracteres como mínimo' })
      .max(45, { message: 'Ingresa 45 caracteres como máximo' }),
    confirmClave: z
      .string()
      .min(12, { message: 'Ingresa 10 caracteres como mínimo' })
      .max(45, { message: 'Ingresa 45 caracteres como máximo' }),
    fechaModificacion: z.string().refine((dob) => new Date(dob).toString() !== 'Invalid Date', {
      message: 'Debes ingresar una fecha válida'
    }),
    rolId: z.preprocess(
      (val) => {
        if (typeof val === 'string') {
          return parseFloat(val)
        }
        return val
      },
      z
        .number({ invalid_type_error: 'Ingresa un número válido' })
        .positive({ message: 'Ingresa un número válido' })
        .min(1, { message: 'Ingresa un número válido' })
        .int('Ingresa un número entero')
    )
  })
  .refine((data) => data.clave === data.confirmClave, {
    message: 'Las contraseñas deben coincidir',
    path: ['confirmClave']
  })

export const EmpleadoUsuarioSchema = z.object({
  usuario: usuarioSchema,
  empleado: empleadoSchema
})
