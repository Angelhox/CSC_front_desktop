import { z } from 'zod'
const estadoActivo = ['Activo', 'Inactivo'] as const
const estadoSn = ['Si', 'No'] as const
export const sectorContratoSchema = z.object({
  contrato: z.object({
    codigo: z
      .string()
      .min(6, { message: 'Debes ingresar mínimo 6 caracteres' })
      .max(6, { message: 'Debes ingresar un máximo de 6 caracteres' }),
    barrio: z
      .string()
      .min(3, { message: 'Ingresa el barrio' })
      .max(45, { message: 'Ingresa un máximo de 45 caracteres' })
  })
})
export const contratoSchema = z.object({
  codigo: z
    .string()
    .min(6, { message: 'Debes ingresar mínimo 6 caracteres' })
    .max(6, { message: 'Debes ingresar un máximo de 6 caracteres' }),
  fecha: z.string().refine((dob) => new Date(dob).toString() !== 'Invalid Date', {
    message: 'Debes ingresar una fecha válida'
  }),
  estado: z.enum(estadoActivo, {
    errorMap: () => ({ message: 'Debes ingresar un estado válido' })
  }),
  medidorSn: z.enum(estadoSn, {
    errorMap: () => ({ message: 'Ingresa un estado de medidor válido' })
  }),
  principalSn: z.preprocess(
    (val) => {
      if (val === 'Principal') {
        return 'Si'
      } else {
        return 'No'
      }
      return val
    },
    z.enum(estadoSn, {
      errorMap: () => ({ message: 'Ingresa un número de medidor válido' })
    })
  ),
  barrio: z
    .string()
    .min(3, { message: 'Ingresa el barrio' })
    .max(45, { message: 'Ingresa un máximo de 45 caracteres' }),
  callePrincipal: z.optional(
    z.string().max(45, { message: 'Debes ingresar un máximo de 45 caracteres' })
  ),
  calleSecundaria: z.optional(
    z.string().max(45, { message: 'Debes ingresar un máximo de 45 caracteres' })
  ),
  numeroCasa: z.optional(
    z
      .string()

      .max(10, { message: 'Ingresa un máximo de 10 caracteres' })
  ),
  referencia: z
    .string()
    .min(2, { message: 'Ingresa un mínimo de 2 caracteres' })
    .max(45, { message: 'Ingresa un máximo de 45 caracteres' }),
  sectoresId: z.preprocess(
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
export const socioContratoSchema = z.object({
  sociosId: z.preprocess(
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
  ),
  contratosId: z.preprocess(
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
  ),
  fechaContratacion: z.string().refine((dob) => new Date(dob).toString() !== 'Invalid Date', {
    message: 'Debes ingresar una fecha válida'
  }),
  fechaBaja: z.optional(
    z.string().refine((dob) => new Date(dob).toString() !== 'Invalid Date', {
      message: 'Debes ingresar una fecha válida'
    })
  ),
  estado: z.enum(estadoActivo, {
    errorMap: () => ({ message: 'Debes ingresar un estado válido' })
  })
})
const medidorSchema = z.object({
  codigo: z
    .string()
    .min(6, { message: 'Debes ingresar mínimo 6 caracteres' })
    .max(6, { message: 'Debes ingresar un máximo de 6 caracteres' }),
  fechaInstalacion: z.optional(
    z.string().refine((dob) => new Date(dob).toString() !== 'Invalid Date', {
      message: 'Debes ingresar una fecha válida'
    })
  ),
  marca: z.optional(
    z
      .string()
      .min(1, { message: 'Ingresa un mínimo de 1 caracter' })
      .max(35, { message: 'Ingresa un máximo de 35 caracteres' })
  ),
  observacion: z.optional(
    z
      .string()
      .min(1, { message: 'Ingresa un mínimo de 1 caracter' })
      .max(100, { message: 'Ingresa un máximo de 100 caracteres' })
  )
})
export const contratoMedidorSchema = z.object({
  contrato: contratoSchema,
  medidor: medidorSchema
})
export const contratoSocioContratoSchema = z.object({
  sociosId: z.preprocess(
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
  ),
  fechaContratacion: z.string().refine((dob) => new Date(dob).toString() !== 'Invalid Date', {
    message: 'Debes ingresar una fecha válida'
  }),
  // fechaBaja: z.optional(
  //   z.string().refine((dob) => new Date(dob).toString() !== 'Invalid Date', {
  //     message: 'Debes ingresar una fecha válida'
  //   })
  // ),
  estado: z.enum(estadoActivo, {
    errorMap: () => ({ message: 'Debes ingresar un estado válido' })
  }),
  contrato: contratoSchema
})
