/* eslint-disable @typescript-eslint/no-explicit-any */
import { IContratoMedidor } from '@renderer/src/Interfaces/Contratos/contratos.interface'
import { IServicios, IServiciosContratados } from '../../Interfaces/Servicios/servicios.interface'
export interface IConfigServicioBase {
  idServicioBase: number
  nombreServicioBase: string
}
export function generateCodigo(abrev: string, numero: string) {
  const numeracion = numero?.padStart(4, '0')
  const codigo = `${abrev}${numeracion}`
  return codigo
}
export const getServiciosOfContratados = (serviciosContratados: IServiciosContratados[]) => {
  console.log('Renderizar: ', serviciosContratados)
  const servicios: IServicios[] = []
  if (serviciosContratados !== null) {
    for (const servicioContratado of serviciosContratados) {
      if (servicioContratado.servicio) {
        servicios.push(servicioContratado?.servicio)
      }
    }
  }
  console.log('Servicios?: ', servicios)
  return servicios
}
let config: IConfigServicioBase
export const getConfigServicioBase = async () => {
  try {
    const response = await fetch('/config.json')
    if (!response.ok) {
      throw new Error(`Error fetching configuration: ${response.statusText}`)
    }
    config = await response.json()
    return config
  } catch (error: any) {
    throw new Error(`Failed to load configuration: ${error.message}`)
  }
}
// export const loadFormData = (data: IContratoMedidor) => {
//   Object.keys(data).forEach((key) => {
//     const nestedObject = data[key as keyof IContratoMedidor]

//     if (typeof nestedObject === 'object' && nestedObject !== null) {
//       Object.keys(nestedObject).forEach((nestedKey) => {
//         const formKey = `${key}.${nestedKey}` as keyof IContratoMedidor
//         const value = nestedObject[nestedKey as keyof typeof nestedObject]

//         setValue(formKey, value)
//       })
//     } else {
//       console.log('Else')
//       setValue(key as keyof IContratoMedidor, nestedObject as any)
//     }
//   })
// }
