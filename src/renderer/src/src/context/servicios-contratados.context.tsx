import { ReactNode, createContext, useCallback, useContext } from "react";
import { IServiciosContratados } from "../Interfaces/Servicios/servicios.interface";
import useApi from "../api/commons/useApi";
import { getServiciosContratados } from "../api/ServiciosContratados/servicios.contratados.service";

interface serviciosContratadosContextType {
  reloadRecords: (param?: string | number) => void;
  serviciosContratados: IServiciosContratados[] | null;
  loading: boolean;
  error: string | null;
}
const ServiciosContratadosContext = createContext<
  serviciosContratadosContextType | undefined
>(undefined);
interface serviciosContratadosProviderProps {
  children: ReactNode;
}
export function ServiciosContratadosProvider({
  children,
}: serviciosContratadosProviderProps) {
  const {
    data: serviciosContratados,
    loading,
    error,
    refetch,
  } = useApi<IServiciosContratados[]>(getServiciosContratados);
  const reloadRecords = useCallback(
    (param?: string | number) => {
      refetch(param);
    },
    [refetch]
  );
  return (
    <ServiciosContratadosContext.Provider
      value={{ serviciosContratados, reloadRecords, loading, error }}
    >
      {children}
    </ServiciosContratadosContext.Provider>
  );
}
export const UseServiciosContratadosContext =
  (): serviciosContratadosContextType => {
    const context = useContext(ServiciosContratadosContext);
    if (!context) {
      throw new Error(
        "UseServiciosContratadosContext debe usarse dentro de un ServiciosContratadosProvider"
      );
    }
    return context;
  };
