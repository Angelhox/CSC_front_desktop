import { ISocio } from '../../Interfaces/Socios/socios.interface'
import axiosInstance from '../../libs/axios'
import { isAxiosError } from 'axios'

export async function getSocios(): Promise<ISocio[]> {
  try {
    const response = await axiosInstance.get<ISocio[]>('/socios')
    console.log('Data: ', response.data)
    return response.data
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to fetch usuarios')
    } else {
      throw new Error('An unexpected error occurred')
    }
  }
}
export async function createSocio(socio: ISocio): Promise<ISocio> {
  try {
    console.log('Trying to create socio: ', socio)
    const response = await axiosInstance.post<ISocio>('/socios', socio)
    return response.data
  } catch (error) {
    console.log('Error: ', error)
    if (isAxiosError(error)) {
      throw new Error(error.response?.data.message || 'Failed to create socio')
    } else {
      throw new Error('An unexpected error occurred')
    }
  }
}
export async function updateSocio(socio: ISocio, socioId: string | number): Promise<ISocio> {
  try {
    console.log('Trying to update socio: ' + socio)
    const response = await axiosInstance.patch(`/socios/${socioId}`, socio)
    return response.data
  } catch (error) {
    console.log('Error updating socio: ', error)
    if (isAxiosError(error)) {
      throw new Error(error.response?.data.message || 'Failed to update an socio')
    } else {
      throw new Error('An unexpected error occurred')
    }
  }
}
export async function deleteSocio(socioId: string | number): Promise<ISocio> {
  try {
    console.log('Trying to delete socio: ' + socioId)
    const response = await axiosInstance.delete(`/socios/${socioId}`)
    return response.data
  } catch (error) {
    console.log('Error deleting socio: ', error)
    if (isAxiosError(error)) {
      throw new Error(error.response?.data.message || 'Failed to delete socio')
    } else {
      throw new Error('An unexpected error occurred')
    }
  }
}
