import axiosInstance from "../../libs/axios";
import { isAxiosError } from "axios";
import { IEmpleadoUsuario } from "../../Interfaces/Usuarios/usuarios.interface";
export interface Usuario {
  id: number;
  // empleadosId: number;
  usuario: string;
  // rolesId: number;
  fechaModificacion: string;
}
export async function getUsuarios(): Promise<IEmpleadoUsuario[]> {
  try {
    const response = await axiosInstance.get<IEmpleadoUsuario[]>("/usuarios");
    console.log("Data: ", response.data);
    return response.data;
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      console.log("Error: ", error);
      throw new Error(
        error.response?.data?.message || "Failed to fetch usuarios"
      );
    } else {
      console.log("Error: ", error);

      throw new Error("An unexpected error occurred");
    }
  }
}
export async function createUsuario(
  usuario: IEmpleadoUsuario
): Promise<IEmpleadoUsuario> {
  try {
    const response = await axiosInstance.post<IEmpleadoUsuario>(
      "/empleado.usuario",
      usuario
    );
    return response.data;
  } catch (error) {
    console.log("Error: ", error);
    if (isAxiosError(error)) {
      throw new Error(
        error.response?.data.message || "Failed to create usuario"
      );
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
}
