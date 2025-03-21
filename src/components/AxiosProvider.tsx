import {ReactNode, useEffect} from "react";
import {prepareAxiosInstance} from "../helpers/prepareAxiosInstance.tsx";
import axios from "axios";
import {AxiosContext} from "./AxiosContext.tsx";
import {AxiosContextType} from "../types/AxiosContextType.tsx";

export const AxiosProvider = (
  {
    children,
    ...props
  }: {
    children: ReactNode
  } & Omit<AxiosContextType, 'axiosInstance' | 'signal'>
) => {
  useEffect(() => {
    if (props.useGlobalAxios) {
      prepareAxiosInstance(axios, props)
    }
  }, [props.useGlobalAxios]);
  return <AxiosContext.Provider value={props} children={children}/>
}
