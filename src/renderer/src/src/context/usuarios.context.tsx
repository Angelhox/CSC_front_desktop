import { IEmpleadoUsuario } from "../Interfaces/Usuarios/usuarios.interface";
import useApi from "../api/commons/useApi";
import { getUsuarios } from "../api/Usuarios/usuario.service";
import { ReactNode, createContext, useCallback, useContext } from "react";
interface usuariosContextType {
  reloadRecords: () => void;
  usuarios: IEmpleadoUsuario[] | null;
  loading: boolean;
  error: string | null;
}
const UsuariosContext = createContext<usuariosContextType | undefined>(
  undefined
);
interface usuariosProviderProps {
  children: ReactNode;
}
export function UsuariosProvider({ children }: usuariosProviderProps) {
  const {
    data: usuarios,
    loading,
    error,
    refetch,
  } = useApi<IEmpleadoUsuario[]>(getUsuarios);
  const reloadRecords = useCallback(async () => {
    console.log("Reloading...");
    await refetch();
  }, [refetch]);
  return (
    <UsuariosContext.Provider
      value={{ usuarios, reloadRecords, loading, error }}
    >
      {children}
    </UsuariosContext.Provider>
  );
}
export const UseUsuariosContext = (): usuariosContextType => {
  const context = useContext(UsuariosContext);
  if (!context) {
    throw new Error(
      "UseUsuariosContext debe usarse dentro de un UsuariosProvider"
    );
  }
  return context;
};
