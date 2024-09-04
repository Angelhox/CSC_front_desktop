import { isAxiosError } from 'axios'
import { IContrato, IContratoSocioContrato } from '../../Interfaces/Contratos/contratos.interface'
import axiosInstance from '../../libs/axios'
export async function getContratos(): Promise<IContratoSocioContrato[]> {
  try {
    console.log('Trying to get Contratos')
    const response = await axiosInstance.get<IContratoSocioContrato[]>('/socio.contrato')
    console.log('Contratos data: ', response.data)
    return response.data
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data.message || 'Failed to fetch contratos')
    } else {
      console.log('Error: ', error)
      throw new Error('An unexpected error occurred')
    }
  }
}
export async function getContratosBySocio(socioId: number): Promise<IContratoSocioContrato[]> {
  try {
    console.log('Trying to get Contratos by socio')
    const response = await axiosInstance.get<IContratoSocioContrato[]>(
      `/socio.contrato/socio/${socioId}`
    )
    console.log('Contratos data: ', response.data)
    return response.data
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data.message || 'Failed to fetch contratos by socio')
    } else {
      console.log('Error: ', error)
      throw new Error('An unexpected error occurred')
    }
  }
}
export async function createContrato(
  contrato: IContratoSocioContrato
): Promise<IContratoSocioContrato> {
  try {
    const response = await axiosInstance.post<IContratoSocioContrato>('/socio.contrato', contrato)
    return response.data
  } catch (error) {
    console.log('Error: ', error)
    if (isAxiosError(error)) {
      throw new Error(error.response?.data.message || 'Failed to create an contrato')
    } else {
      throw new Error('An unexpected error occurred')
    }
  }
}
export async function updateContrato(
  contrato: IContrato,
  contratoId: number | string
): Promise<IContratoSocioContrato> {
  try {
    const response = await axiosInstance.patch<IContratoSocioContrato>(
      `/socio.contrato/${contratoId}`,
      contrato
    )
    return response.data
  } catch (error) {
    console.log('Error: ', error)
    if (isAxiosError(error)) {
      throw new Error(error.response?.data.message || 'Failed to create an contrato')
    } else {
      throw new Error('An unexpected error occurred')
    }
  }
}
