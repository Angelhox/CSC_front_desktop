import { isAxiosError } from "axios";
import { dataSectores } from "../../Interfaces/Sectores/sectores.interface";
import axiosInstance from "../../libs/axios";
export async function getSectores(): Promise<dataSectores[]> {
  try {
    const response = await axiosInstance.get<dataSectores[]>("/sector");
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch sectores"
      );
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
}
