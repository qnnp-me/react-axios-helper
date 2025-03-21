import {useAxios} from "./hooks/useAxios.ts";
import {useEffect} from "react";

function App() {
  const {get} = useAxios()
  useEffect(() => {
    get('/asd')
  }, []);
  return (
    <div>

    </div>
  )
}

export default App
