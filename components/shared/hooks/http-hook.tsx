import axios, { Method, AxiosError } from "axios";
import { useCallback, useRef, useState, useEffect } from "react";

export const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  //abortctrl provided by browser can be used
  //tied to ref so open requests held in memory and it isn't reset when component is rerendered
  //and so unlike useState a change doesn't provoke a rerender of attached component
  const activeHttpRequests = useRef<AbortController[]>([]);

  const sendRequest = useCallback(
    async (url: string, method: Method = "GET", body = null, headers = {}) => {
      setIsLoading(true);
      const httpAbortControl = new AbortController();
      activeHttpRequests.current.push(httpAbortControl);
      try {
        const response = await axios({
          url,
          method,
          data: body,
          signal: httpAbortControl.signal,
          headers,
        });
        const data = await response.data;
        //removes current httprequest from stack once completed.
        activeHttpRequests.current = activeHttpRequests.current.filter(
          (reqCtrl) => {
            return reqCtrl !== httpAbortControl;
          }
        );

        setIsLoading(false);
        return data;
      } catch (err) {
        const error = err as AxiosError;
        setError(error.response?.data.message);
        setIsLoading(false);
        throw err;
      }
    },
    []
  );

  const clearError = () => {
    setError("");
  };

  //using the useEffect cleanup function so that, if the component is rerendered, such as a quick page
  //refresh the exisiting http requests will be cancelled before new ones are requested
  useEffect(() => {
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      activeHttpRequests.current.forEach((abortCtrl) => abortCtrl.abort());
    };
  }, []);

  return { isLoading, error, clearError, sendRequest };
};
