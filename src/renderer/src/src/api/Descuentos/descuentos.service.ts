import { isAxiosError } from "axios";
import { ITiposDescuento } from "../../Interfaces/Descuentos/descuentos.interface";
import axiosInstance from "../../libs/axios";
export async function getDescuentos(): Promise<ITiposDescuento[]> {
  try {
    const response = await axiosInstance.get<ITiposDescuento[]>(
      "/tipo.descuento"
    );
    console.log("Descuentos?: ", response.data);
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(
        error.response?.data.message || "Failed to fetch descuentos"
      );
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
}
