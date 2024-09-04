import { isAxiosError } from "axios";
import { IRoles } from "../../Interfaces/Roles/roles.interface";
import axiosInstance from "../../libs/axios";

export async function getRoles(): Promise<IRoles[]> {
  try {
    const response = await axiosInstance.get<IRoles[]>("/rol");
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
