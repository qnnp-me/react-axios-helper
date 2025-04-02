import {AxiosDefaults, AxiosError, AxiosInstance} from "axios";
import {AxiosContextType} from "../types/AxiosContextType";
import {omitObj} from "./omitObj";

export const prepareAxiosInstance = (instance: AxiosInstance, context: AxiosContextType) => {
  console.log('-----------')
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
  instance.interceptors.request.clear()
  instance.interceptors.request.use(
    value => context.requestInterceptors?.onFulfilled ? context.requestInterceptors.onFulfilled(value) : value,
    error => context.requestInterceptors?.onRejected ? context.requestInterceptors.onRejected(error) : Promise.reject(error),
    context.requestInterceptors?.options,
  )
  instance.interceptors.response.clear()
  instance.interceptors.response.use(
    value => context.responseInterceptors?.onFulfilled ? context.responseInterceptors.onFulfilled(value) : value,
    (error: AxiosError) => {
      if (context.responseInterceptors?.onRejected) {
        return context.responseInterceptors.onRejected(error, (error.config?.signal as AbortSignal)?.reason)
      }
      if ((error.config?.signal as AbortSignal)?.reason !== abortReason) {
        return Promise.reject(error)
      }
    },
  )
  return instance
}
export const abortReason = 'component unmount'
