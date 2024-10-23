/* eslint-disable @typescript-eslint/no-explicit-any */
import { isAxiosError } from 'axios'
import { IServiciosContratados } from '../../Interfaces/Servicios/servicios.interface'
import axiosInstance from '../../libs/axios'
export async function getServiciosContratados(
  contratoId: number | string | undefined
): Promise<IServiciosContratados[]> {
  try {
    console.log('Fetching Servicios Contratados')
    if (!contratoId) {
      const response = await axiosInstance.get<IServiciosContratados[]>(`/servicio.contratado`)
      console.log('Todos los contratados: ', response.data)
      return response.data
    }
    const response = await axiosInstance.get<IServiciosContratados[]>(
      `/servicio.contratado/${contratoId}`
    )
    console.log('Contratados: ', response.data)
    return response.data
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data.message || 'Failed to fetch serviciosContratados')
    } else {
      throw new Error('An unexpected error occurred')
    }
  }
}
export async function createServicioContratado(
  servicioContratado: IServiciosContratados
): Promise<IServiciosContratados> {
  try {
    if (servicioContratado.base === 1) {
      validateDataForMedidor(servicioContratado)
      const response = await axiosInstance.post('/servicio.contratado/medidor', servicioContratado)
      return response.data
    } else {
      const response = await axiosInstance.post('/servicio.contratado', servicioContratado)
      return response.data
    }
  } catch (error) {
    console.log('Error: ', error)
    if (isAxiosError(error)) {
      throw new Error(error.response?.data.message || 'Failed to create an servicioContratado')
    } else {
      throw new Error('An unexpected error occurred')
    }
  }
}
export async function descontratarServicio(
  contratadoId: number | string
  // contratoId: number | string,
  // servicioBase: number
): Promise<IServiciosContratados> {
  try {
    // if (servicioBase === 1) {
    //   const response = await axiosInstance.delete(
    //     `/servicio.contratado/medidor/${contratadoId}/${contratoId}`
    //   )
    //   return response.data
    // } else {
    const response = await axiosInstance.delete(`/servicio.contratado/${contratadoId}`)
    return response.data
    // }
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data.message || 'Failed to descontract servicioContratado')
    } else {
      throw new Error('An unexpected error occurred')
    }
  }
}
export async function updateServicioContratado(
  servicioContratado: IServiciosContratados,
  contratadoId: number | string
): Promise<IServiciosContratados> {
  try {
    const response = await axiosInstance.patch(
      `/servicio.contratado/${contratadoId}`,
      servicioContratado
    )
    return response.data
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data.message || 'Failed to update a servicioContratado')
    } else {
      throw new Error('An unexpected error occurred')
    }
  }
}

function validateDataForMedidor(servicioContratado: IServiciosContratados): void {
  if (
    !servicioContratado.medidor?.fechaInstalacion ||
    servicioContratado.medidor.fechaInstalacion === null
  ) {
    throw new Error('Necesitas proporcionar datos del medidor')
  }
}
