import {useAxios} from "./hooks/useAxios";
import {useEffect} from "react";

function App() {
  const axios = useAxios()
  const handle = () => {
    axios.get('/asd').then(e => {
      console.log(e)
    })
  }
  useEffect(() => {
    handle()
  }, []);
  return (
    <div>
      <button onClick={handle}>Test</button>
    </div>
  )
}

export default App
