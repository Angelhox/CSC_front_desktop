/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { IEmpleadoUsuario } from "../Interfaces/Usuarios/usuarios.interface";
type State = {
  token: string;
  profile: IEmpleadoUsuario | any;
  isAuth: boolean;
};
type Actions = {
  setToken: (token: string) => void;
  setProfile: (profile: any) => void;
  logOut: () => void;
};
export const useAuthStore = create(
  persist<State & Actions>(
    (set) => ({
      token: "",
      profile: null,
      isAuth: false,
      setToken: (token: string) => set((state) => ({ token, isAuth: true })),
      setProfile: (profile: any) =>
        set((state) => ({
          profile,
        })),
      logOut: () =>
        set((state) => ({
          token: "",
          isAuth: false,
          profile: null,
        })),
    }),
    { name: "auth" }
  )
);
