import {useContext, useEffect, useMemo, useState} from "react";
import axios from "axios";
import {abortReason, prepareAxiosInstance} from "../helpers/prepareAxiosInstance";
import {AxiosContext} from "../components/AxiosContext";

export const useAxios = () => {
  const context = useContext(AxiosContext)
  const [cancelController] = useState(new AbortController())
  const axiosInstance = useMemo(() => {
    const instance = axios.create({
      signal: cancelController.signal,
    })
    prepareAxiosInstance(instance, context)
    return instance
  }, [context])
  useEffect(() => {
    return () => {
      cancelController.abort(abortReason)
    }
  }, []);
  return axiosInstance
}
