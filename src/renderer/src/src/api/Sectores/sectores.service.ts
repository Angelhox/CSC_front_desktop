import { isAxiosError } from 'axios'
import { ISector } from '../../Interfaces/Sectores/sectores.interface'
import axiosInstance from '../../libs/axios'
export async function getSectores(): Promise<ISector[]> {
  try {
    const response = await axiosInstance.get<ISector[]>('/sector')
    return response.data
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to fetch sectores')
    } else {
      throw new Error('An unexpected error occurred')
    }
  }
}
