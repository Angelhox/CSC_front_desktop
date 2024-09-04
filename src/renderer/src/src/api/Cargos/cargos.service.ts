import { isAxiosError } from "axios";
import axiosInstance from "../../libs/axios";
import { dataCargos } from "../../Interfaces/Cargos/cargos.interface";

export async function getCargos(): Promise<dataCargos[]> {
  try {
    const response = await axiosInstance.get<dataCargos[]>("/cargos");
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch cargos"
      );
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
}
