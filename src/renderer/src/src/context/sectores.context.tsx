import { ReactNode, createContext, useCallback, useContext } from "react";
import useApi from "../api/commons/useApi";
import { getSectores } from "../api/Sectores/sectores.service";
import { dataSectores } from "../Interfaces/Sectores/sectores.interface";

interface sectoresContextType {
  reloadRecords: () => void;
  sectores: dataSectores[] | null;
  loading: boolean;
  error: string | null;
}
const SectoresContext = createContext<sectoresContextType | undefined>(
  undefined
);
interface sectoresProviderProps {
  children: ReactNode;
}
export function SectoresProvider({ children }: sectoresProviderProps) {
  const {
    data: sectores,
    loading,
    error,
    refetch,
  } = useApi<dataSectores[]>(getSectores);
  const reloadRecords = useCallback(async () => {
    await refetch();
  }, [refetch]);
  return (
    <SectoresContext.Provider
      value={{ sectores, reloadRecords, loading, error }}
    >
      {children}
    </SectoresContext.Provider>
  );
}
export const UseSectoresContext = (): sectoresContextType => {
  const context = useContext(SectoresContext);
  if (!context) {
    throw new Error(
      "UseSectoresContext debe usarse dentro de un SectoresProvider"
    );
  }
  return context;
};