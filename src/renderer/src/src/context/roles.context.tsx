import useApi from "../api/commons/useApi";
import { ReactNode, createContext, useCallback, useContext } from "react";
import { IRoles } from "../Interfaces/Roles/roles.interface";
import { getRoles } from "../api/Roles/roles.service";
interface rolesContextType {
  reloadRecords: () => void;
  roles: IRoles[] | null;
  loading: boolean;
  error: string | null;
}
const RolesContext = createContext<rolesContextType | undefined>(undefined);
interface rolesProviderProps {
  children: ReactNode;
}
export function RolesProvider({ children }: rolesProviderProps) {
  const { data: roles, loading, error, refetch } = useApi<IRoles[]>(getRoles);
  const reloadRecords = useCallback(async () => {
    console.log("Reloading...");
    await refetch();
  }, [refetch]);
  return (
    <RolesContext.Provider value={{ roles, reloadRecords, loading, error }}>
      {children}
    </RolesContext.Provider>
  );
}
export const UseRolesContext = (): rolesContextType => {
  const context = useContext(RolesContext);
  if (!context) {
    throw new Error("UseRolesContext debe usarse dentro de un RolesProvider");
  }
  return context;
};
