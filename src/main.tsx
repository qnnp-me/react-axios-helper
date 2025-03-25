import {createRoot} from 'react-dom/client'
import App from './App.tsx'
import {abortReason, AxiosProvider } from './index.ts'

createRoot(document.getElementById('root')!).render(
  <AxiosProvider
    baseURL={'/'}
    responseInterceptors={{
      onFulfilled: (response) => {
        console.log('response', response)
        return response.data
      },
      onRejected: (error, cancelReason) => {
        if (cancelReason === abortReason) {
          return
        }
        console.log('error', error)
        return Promise.reject(error)
      }
    }}
  >
    <App/>
  </AxiosProvider>
)
