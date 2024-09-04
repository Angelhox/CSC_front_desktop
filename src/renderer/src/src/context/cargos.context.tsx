import { ReactNode, createContext, useCallback, useContext } from "react";
import { dataCargos } from "../Interfaces/Cargos/cargos.interface";
import useApi from "../api/commons/useApi";
import { getCargos } from "../api/Cargos/cargos.service";

interface cargosContextType {
  reloadRecords: () => void;
  cargos: dataCargos[] | null;
  loading: boolean;
  error: string | null;
}
const CargosContext = createContext<cargosContextType | undefined>(undefined);
interface cargosProviderProps {
  children: ReactNode;
}
export function CargosProvider({ children }: cargosProviderProps) {
  const {
    data: cargos,
    loading,
    error,
    refetch,
  } = useApi<dataCargos[]>(getCargos);
  const reloadRecords = useCallback(async () => {
    console.log("Loading...");
    await refetch();
  }, [refetch]);
  return (
    <CargosContext.Provider value={{ cargos, reloadRecords, loading, error }}>
      {children}
    </CargosContext.Provider>
  );
}
export const UseCargosContext = (): cargosContextType => {
  const context = useContext(CargosContext);
  if (!context) {
    throw new Error("UseCargos debe usarse dentro de un CargosProvider");
  }
  return context;
};
