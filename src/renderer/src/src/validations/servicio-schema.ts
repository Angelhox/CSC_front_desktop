import { z } from 'zod'
const tipoServicio = ['Servicio fijo', 'Cuota'] as const
const estadoAplazable = ['Si', 'No'] as const
const estadoValoresDistintos = ['Si', 'No'] as const
const estadoIndividual = ['Si', 'No'] as const
export const servicioSchema = z.object({
  nombre: z
    .string()
    .min(3, { message: 'Ingresa mínimo 3 caracteres' })
    .max(45, { message: 'Ingresa máximo 45 caracteres' }),
  descripcion: z
    .string()
    .min(3, { message: 'Ingresa mínimo 3 caracteres' })
    .max(100, { message: 'Ingresa máximo 100 caracteres' }),
  tipo: z.enum(tipoServicio, {
    errorMap: () => ({ message: 'Ingresa un tipo válido' })
  }),
  valor: z.preprocess(
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
  aplazableSn: z.enum(estadoAplazable, {
    errorMap: () => ({ message: 'Ingresa un estado aplazable válido' })
  }),
  fechaCreacion: z.string().refine((dob) => new Date(dob).toString() !== 'Invalid Date', {
    message: 'Ingresa una fecha válida'
  }),
  numeroPagos: z.preprocess(
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
  valorPagos: z.preprocess(
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
  valoresDistintosSn: z.enum(estadoValoresDistintos, {
    errorMap: () => ({
      message: 'Ingresa un estado válido'
    })
  }),
  individualSn: z.enum(estadoIndividual, {
    errorMap: () => ({ message: 'Ingresa un estado individual válido' })
  })
})
