import z from 'zod'
const estadoActivo = ['Activo', 'Inactivo'] as const
export const medidorSchema = z.object({
  codigo: z
    .string()
    .min(6, { message: 'Debes ingresar mínimo 6 caracteres' })
    .max(6, { message: 'Debes ingresar un máximo de 6 caracteres' }),
  marca: z.string().min(2, { message: 'La marca es requerida' }),
  fechaInstalacion: z.string().refine((dob) => new Date(dob).toString() !== 'Invalid Date', {
    message: 'Ingresa una fecha válida'
  }),
  observacion: z.optional(
    z
      .string()
      .min(2, { message: 'Ingresa dos caracteres como mínimo' })
      .max(100, 'Ingresa 100 caracteres como máximo')
  ),
  estado: z.enum(estadoActivo, {
    errorMap: () => ({ message: 'Ingresa un estado válido' })
  }),
  contratosId: z.preprocess(
    (val) => {
      if (typeof val === 'string') {
        return parseInt(val)
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
export const servicioContratadoSchema = z.object({
  fechaEmision: z.string().refine((dob) => new Date(dob).toString() !== 'Invalid Date', {
    message: 'Ingresa una fecha válida'
  }),
  estado: z.enum(estadoActivo, {
    errorMap: () => ({ message: 'Ingresa un estado activo válido' })
  }),
  valorIndividual: z.preprocess(
    (val) => {
      if (typeof val === 'string') {
        return parseFloat(val)
      }
      return val
    },
    z
      .number({ invalid_type_error: 'Ingresa un valor válido' })
      .positive({ message: 'Ingresa un valor válido' })
      .min(0.0, { message: 'Ingresa un valor válido' })
      .multipleOf(0.01, { message: 'Ingresa un valor con dos decimales' })
  ),
  numeroPagosIndividual: z.preprocess(
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
  valorPagosIndividual: z.preprocess(
    (val) => {
      if (typeof val === 'string') {
        return parseFloat(val)
      }
      return val
    },
    z
      .number({ invalid_type_error: 'Ingresa un valor válido' })
      .positive({ message: 'Ingresa un valor válido' })
      .min(0.0, { message: 'Ingresa un valor válido' })
      .multipleOf(0.01, { message: 'Ingresa un valor con dos decimales' })
  ),
  base: z.preprocess(
    (val) => {
      if (typeof val === 'string') {
        return parseInt(val)
      }
      return val
    },
    z
      .number({ invalid_type_error: 'Ingresa un número válido' })
      .min(0, { message: 'Ingresa un número válido' })
      .max(1, { message: 'Ingresa un número válido' })
      .int('Ingresa un número entero')
  ),
  contratosId: z.preprocess(
    (val) => {
      if (typeof val === 'string') {
        return parseInt(val)
      }
      return val
    },
    z
      .number({ invalid_type_error: 'Ingresa un número válido' })
      .positive({ message: 'Ingresa un número válido' })
      .min(1, { message: 'Ingresa un número válido' })
      .int('Ingresa un número entero')
  ),
  descuentosId: z.preprocess(
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
  serviciosId: z.preprocess(
    (val) => {
      if (typeof val === 'string') {
        return parseInt(val)
      }
      return val
    },
    z
      .number({ invalid_type_error: 'Ingresa un número válido' })
      .positive({ message: 'Ingresa un número válido' })
      .min(1, { message: 'Ingresa un número válido' })
      .int('Ingresa un número entero')
  ),
  descuentoValor: z.preprocess(
    (val) => {
      if (typeof val === 'string') {
        return parseFloat(val)
      }
      return val
    },
    z
      .number({ invalid_type_error: 'Ingresa un valor válido 1' })
      .min(0.0, { message: 'Ingresa un valor válido 2' })
      .multipleOf(0.01, { message: 'Ingresa un valor con dos decimales' })
  ),
  marca: z.optional(z.string()),
  fechaInstalacion: z.optional(z.string())
})
export const servicioContratadoMedidorSchema = z.object({
  fechaEmision: z.string().refine((dob) => new Date(dob).toString() !== 'Invalid Date', {
    message: 'Ingresa una fecha válida'
  }),
  estado: z.enum(estadoActivo, {
    errorMap: () => ({ message: 'Ingresa un estado activo válido' })
  }),
  valorIndividual: z.preprocess(
    (val) => {
      if (typeof val === 'string') {
        return parseFloat(val)
      }
      return val
    },
    z
      .number({ invalid_type_error: 'Ingresa un valor válido' })
      .positive({ message: 'Ingresa un valor válido' })
      .min(0.0, { message: 'Ingresa un valor válido' })
      .multipleOf(0.01, { message: 'Ingresa un valor con dos decimales' })
  ),
  numeroPagosIndividual: z.preprocess(
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
  valorPagosIndividual: z.preprocess(
    (val) => {
      if (typeof val === 'string') {
        return parseFloat(val)
      }
      return val
    },
    z
      .number({ invalid_type_error: 'Ingresa un valor válido' })
      .positive({ message: 'Ingresa un valor válido' })
      .min(0.0, { message: 'Ingresa un valor válido' })
      .multipleOf(0.01, { message: 'Ingresa un valor con dos decimales' })
  ),
  base: z.preprocess(
    (val) => {
      if (typeof val === 'string') {
        return parseInt(val)
      }
      return val
    },
    z
      .number({ invalid_type_error: 'Ingresa un número válido' })
      .min(0, { message: 'Ingresa un número válido' })
      .max(1, { message: 'Ingresa un número válido' })
      .int('Ingresa un número entero')
  ),
  contratosId: z.preprocess(
    (val) => {
      if (typeof val === 'string') {
        return parseInt(val)
      }
      return val
    },
    z
      .number({ invalid_type_error: 'Ingresa un número válido' })
      .positive({ message: 'Ingresa un número válido' })
      .min(1, { message: 'Ingresa un número válido' })
      .int('Ingresa un número entero')
  ),
  descuentosId: z.preprocess(
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
  serviciosId: z.preprocess(
    (val) => {
      if (typeof val === 'string') {
        return parseInt(val)
      }
      return val
    },
    z
      .number({ invalid_type_error: 'Ingresa un número válido' })
      .positive({ message: 'Ingresa un número válido' })
      .min(1, { message: 'Ingresa un número válido' })
      .int('Ingresa un número entero')
  ),
  descuentoValor: z.preprocess(
    (val) => {
      if (typeof val === 'string') {
        return parseFloat(val)
      }
      return val
    },
    z
      .number({ invalid_type_error: 'Ingresa un valor válido 1' })
      .min(0.0, { message: 'Ingresa un valor válido 2' })
      .multipleOf(0.01, { message: 'Ingresa un valor con dos decimales' })
  ),
  medidor: medidorSchema
})
