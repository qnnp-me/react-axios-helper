import {AxiosDefaults, AxiosError, AxiosInstance} from "axios";
import {AxiosContextType} from "../types/AxiosContextType.tsx";
import {omitObj} from "./omitObj.tsx";

export const prepareAxiosInstance = (instance: AxiosInstance, context: AxiosContextType) => {
  const defaults = {
    ...instance.defaults,
    ...omitObj(context, [
      'axiosInstance',
      'useGlobalAxios',
      'responseInterceptors',
      'requestInterceptors'
    ]),
  }
  for (const key in defaults) {
    instance.defaults[key as keyof AxiosDefaults] = defaults[key as keyof AxiosDefaults]
  }
  instance.interceptors.request.use(
    context.requestInterceptors?.onFulfilled,
    context.requestInterceptors?.onRejected,
    context.requestInterceptors?.options
  )
  instance.interceptors.response.use(
    context.responseInterceptors?.onFulfilled,
    (error: AxiosError) => {
      if (context.responseInterceptors?.onRejected) {
        return context.responseInterceptors?.onRejected(error, (error.config?.signal as AbortSignal)?.reason)
      }
      if ((error.config?.signal as AbortSignal)?.reason !== abortReason) {
        return Promise.reject(error)
      }
    },
  )
  return instance
}
export const abortReason = 'component unmount'
