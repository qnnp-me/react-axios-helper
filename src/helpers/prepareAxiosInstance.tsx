import {AxiosError, AxiosInstance} from "axios";
import {omitObj} from "./omitObj.tsx";
import {AxiosContextType} from "../types/AxiosContextType.tsx";

export const prepareAxiosInstance = (instance: AxiosInstance, context: AxiosContextType) => {
  instance.defaults = {
    ...instance.defaults,
    ...omitObj(context, [
      'axiosInstance',
      'responseInterceptors',
      'requestInterceptors'
    ]),
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
