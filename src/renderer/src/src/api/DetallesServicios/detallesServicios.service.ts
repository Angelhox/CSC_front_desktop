
import axiosInstance from '../../libs/axios'
import { isAxiosError } from 'axios'
import { IServiciosDetalles } from '@renderer/src/Interfaces/Servicios/servicios.interface'
export async function getServicioDetalles(
  servicioId: number | string
): Promise<IServiciosDetalles[]> {
  try {
    const response = await axiosInstance.get<IServiciosDetalles[]>(
      `/servicio.contratado/servicio/${servicioId}`
    )
    return response.data
  } catch (error) {
    console.log('Error getting servicio detalles: ', error)
    if (isAxiosError(error)) {
      throw new Error(error.response?.data.message || 'Failed to get servicio detalles')
    } else {
      throw new Error('An unexpected error occurred')
    }
  }
}
