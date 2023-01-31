import { useState  } from 'react'
import './App.css'
import Home from './components/Home'
import Simulation from './components/Simulation'
import { Button } from '@mui/material';
// import init from './lib_simulation_wasm_bg.wasm?init'
//  import './index.js'

function App() {

const [loadSim , setLoadSim] = useState(false)

 const setSim = () => {
  setLoadSim(true)
 }
  return (
    <>
    {!loadSim ? <Home/> : <Simulation/>}
    {!loadSim ? <Button onClick={setSim} variant="outlined">Start Simulation</Button> : <></>}
    </>
  )
}

export default App
