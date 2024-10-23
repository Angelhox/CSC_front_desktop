import { z } from 'zod'
interface IUserCredentials {
  usuario: string
  clave: string
}
export function initialValues(): IUserCredentials {
  return {
    usuario: '',
    clave: ''
  }
}
export function loginSchema() {
  return z.object({
    usuario: z
      .string()
      .min(10, {
        message: 'El nombre de usuario debe tener mas de 10 caracteres'
      })
      .max(20, {
        message: 'El nombre de usuario debe tener menos de 20 caracteres'
      }),
    clave: z
      .string()
      .min(10, {
        message: 'La contraseña del usuario debe tener mas de 10 caracteres'
      })
      .max(20, {
        message: 'La contraseña del usuario debe tener menos de 20 caracteres'
      }),
    test: z.string().min(3, { message: 'Mas de tres caracteres' })
  })
}
