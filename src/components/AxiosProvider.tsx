import {ReactNode, useEffect} from "react";
import {prepareAxiosInstance} from "../helpers/prepareAxiosInstance";
import axios from "axios";
import {AxiosContext} from "./AxiosContext";
import {AxiosContextType} from "../types/AxiosContextType";

export const AxiosProvider = (
  {
    children,
    ...props
  }: {
    children: ReactNode
  } & Omit<AxiosContextType, 'axiosInstance'>
) => {
  useEffect(() => {
    if (props.useGlobalAxios !== false) {
      prepareAxiosInstance(axios, props)
    }
  }, [props]);
  return <AxiosContext.Provider value={props} children={children}/>
}
