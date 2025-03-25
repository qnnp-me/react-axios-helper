import {useContext, useEffect, useMemo} from "react";
import axios, {AxiosInstance} from "axios";
import {abortReason, prepareAxiosInstance} from "../helpers/prepareAxiosInstance";
import {AxiosContext} from "../components/AxiosContext";

export const useAxios = () => {
  const context = useContext(AxiosContext)
  const cancelController = useMemo(() => new AbortController(), [context])
  const axiosInstance = useMemo<AxiosInstance>((() => {
    const instance = axios.create({
      signal: cancelController.signal,
    })
    prepareAxiosInstance(instance, context)
    return instance
  }), [context, cancelController])
  useEffect(() => {
    return () => {
      cancelController.abort(abortReason)
    }
  }, [cancelController]);
  return axiosInstance
}
