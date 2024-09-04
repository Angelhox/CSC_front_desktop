/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from "react";
type ApiFunction<T> = () => Promise<T>;
const useApi = <T>(apiFunc: ApiFunction<T>) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await apiFunc();
        setData(result);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message || "Something went wrong");
        } else {
          setError("An unexpected error occurred");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [apiFunc]);
  return { data, loading, error };
};
export default useApi;
