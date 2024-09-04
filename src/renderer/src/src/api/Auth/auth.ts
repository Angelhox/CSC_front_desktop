/* eslint-disable no-useless-catch */
import { isAxiosError } from "axios";
import axios from "../../libs/axios";
import { IEmpleadoUsuario } from "../../Interfaces/Usuarios/usuarios.interface";
export interface IUserCredentials {
  usuario: string;
  clave: string;
}
export interface IUserLoged {
  token: string;
  usuario?: string;
  rol?: string;
}
export class Auth {
  async login(credentials: IUserCredentials): Promise<IUserLoged> {
    try {
      const response = await axios.post<IUserLoged>("/auth/login", credentials);
      return response.data;
    } catch (error) {
      console.log("Error: ", error);
      if (isAxiosError(error)) {
        throw new Error(error.response?.data.message || "Failed to login");
      } else {
        throw new Error("An unexpected error occurred");
      }
    }
  }
  async profile(): Promise<IEmpleadoUsuario> {
    try {
      const response = await axios.post("usuarios/profile");
      console.log("Profile: ", response);
      return response.data;
    } catch (error) {
      if (isAxiosError(error)) {
        throw new Error(
          error.response?.data.message || "Failed to get profile"
        );
      } else {
        throw new Error("An unexpected error occurred");
      }
    }
  }
  async checkAuth() {
    try {
      await axios.get("/auth/check");
    } catch (error) {
      if (isAxiosError(error)) {
        throw new Error(error.response?.data.message || "Failed to check auth");
      } else {
        throw new Error("An unexpected error occurred");
      }
    }
  }
}
