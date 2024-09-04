/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect, useCallback } from 'react'
type ApiFunction<T> = (param?: string | number) => Promise<T>
const useApi = <T>(apiFunc: ApiFunction<T>) => {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const fetchData = useCallback(
    async (param?: string | number) => {
      setLoading(true)
      try {
        const result = await apiFunc(param)
        setData(result)
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message || 'Something went wrong')
        } else {
          setError('An unexpected error occurred')
        }
      } finally {
        setLoading(false)
      }
    },
    [apiFunc]
  )
  useEffect(() => {
    fetchData()
  }, [fetchData])
  return { data, loading, error, refetch: fetchData }
}
export default useApi
