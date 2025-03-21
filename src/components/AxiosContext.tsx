import {createContext} from "react";

import {AxiosContextType} from "../types/AxiosContextType.tsx";

export const AxiosContext = createContext<AxiosContextType>({})
