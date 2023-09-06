import { useEffect, useState } from "react";
import axios from "../utils/axios";

interface Props {
  baseUrl: string;
  actualizador?: boolean;
}

const useGetData = (props: Props) => {
  const [data, setData] = useState(null);
  const [request, setRequest] = useState(null);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    setIsPending(true);
    axios
      .get(props.baseUrl, { signal: controller.signal })
      .then((res) => {
        setData(res.data);
        setRequest(res.data);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => setIsPending(false));
    return () => {
      controller.abort();
      setData(null);
      setError(null);
      setIsPending(true);
    };
  }, [props.baseUrl, props.actualizador]);

  return {
    data,
    error,
    isPending,
    request,
  };
};

export default useGetData;
