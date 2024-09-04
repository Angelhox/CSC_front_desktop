import { ReactNode, createContext, useCallback, useContext } from "react";
import { ITiposDescuento } from "../Interfaces/Descuentos/descuentos.interface";
import useApi from "../api/commons/useApi";
import { getDescuentos } from "../api/Descuentos/descuentos.service";

interface descuentosContextType {
  reloadRecords: () => void;
  descuentos: ITiposDescuento[] | null;
  loading: boolean;
  error: string | null;
}
const DescuentosContext = createContext<descuentosContextType | undefined>(
  undefined
);
interface descuentoProviderProps {
  children: ReactNode;
}
export function DescuentosProvider({ children }: descuentoProviderProps) {
  const {
    data: descuentos,
    loading,
    error,
    refetch,
  } = useApi<ITiposDescuento[]>(getDescuentos);
  const reloadRecords = useCallback(async () => {
    await refetch();
  }, [refetch]);
  return (
    <DescuentosContext.Provider
      value={{ descuentos, reloadRecords, loading, error }}
    >
      {children}
    </DescuentosContext.Provider>
  );
}
export const UseDescuentosContext = (): descuentosContextType => {
  const context = useContext(DescuentosContext);
  if (!context) {
    throw new Error(
      "UseDescuentosContext debe usarse dentro de un DescuentosProvider"
    );
  }
  return context;
};
