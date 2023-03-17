import axios, { AxiosResponse } from "axios";
import * as React from "react";
import { useErrorHandler } from "react-error-boundary";

const useAxios = <T = AxiosResponse>(url: string) => {
  const handleError = useErrorHandler();
  const [response, setResponse] = React.useState<T | undefined>(undefined);
  const [loading, setLoading] = React.useState<boolean>(true);

  const fetchData = React.useCallback(async () => {
    try {
      setLoading(true);
      const result = await axios.get<T>(url);
      setResponse(result.data);
    } catch (err: any) {
      // trigger error boundary fallback
      handleError(err);
    } finally {
      setLoading(false);
    }
  }, [handleError, url]);

  const handleFetchData = React.useCallback(() => {
    fetchData();
  }, [fetchData]);

  React.useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { response, loading, handleFetchData };
};

export default useAxios;
