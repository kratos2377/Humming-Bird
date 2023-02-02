import { useState  } from 'react'
import './App.css'
import Home from './components/Home'
import Simulation from './components/Simulation'
import { Button } from '@mui/material';


function App() {

const [loadSim , setLoadSim] = useState(false)

 const setSim = () => {
  setLoadSim(true)
 }
  return (
    <>
    {!loadSim ? <Home/> : <Simulation/>}
    {!loadSim ? <div className="sim-button"><Button  onClick={setSim} variant="outlined">Start Simulation</Button></div> : <></>}
    </>
  )
}

export default App
