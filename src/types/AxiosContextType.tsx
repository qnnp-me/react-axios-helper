import {
  AxiosError,
  AxiosInstance,
  AxiosInterceptorOptions,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig
} from "axios";

export type AxiosContextType = AxiosRequestConfig
  & {
  axiosInstance?: AxiosInstance
  /**
   * 是否将配置设置到全局的axios实例
   * 设置之后可以直接使用导入的axios实例发送请求
   * 但是没有组件卸载自动取消请求能力
   */
  useGlobalAxios?: boolean
  requestInterceptors?: {
    onFulfilled?: (value: InternalAxiosRequestConfig<any>) =>
      (InternalAxiosRequestConfig<any> | Promise<InternalAxiosRequestConfig<any>>)
    onRejected?: (error: AxiosError) => any
    options?: AxiosInterceptorOptions
  }
  responseInterceptors?: {
    onFulfilled?: (value: AxiosResponse<any, any>) =>
      AxiosResponse<any, any> | Promise<AxiosResponse<any, any>>
    onRejected?: (error: AxiosError, cancelReason?: any) => any
  }
}