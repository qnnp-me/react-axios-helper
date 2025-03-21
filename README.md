# Axios 助手模块

````tsx
// in root
<AxiosProvider
  baseURL={'http://localhost:3000'}
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
  // ...
>
  <App/>
</AxiosProvider>
````

```tsx
// in component
const {get} = useAxios()
useEffect(() => {
  get('/asd')
}, []);
```