import React , {useEffect , useState} from 'react';
import {Modal,IconButton ,Box , Typography} from "@mui/material"
import InfoTwoToneIcon from '@mui/icons-material/InfoTwoTone';
import CancelSharpIcon from '@mui/icons-material/CancelSharp';
import './css/sim.css'
import Loading from './Loading';
const Simulation = () => {

  const [terminal , setTerminal] = useState(false)
  const [loading , setLoading] = useState(true)
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '70%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    background: "#282828",
    color: "#00FF66",
    p: 4,
  };

  const openTerminal = () => {setTerminal(true)}
  const closeTerminal = () => {setTerminal(false)}
  const load = async () => {
    await import('./index.js').then(() => {
      setLoading(false)
    })
  }
    useEffect(  () =>  {
   
       load()
    } , [])

    return (

       <div id="container">

      <div id="ter-panel">
        <div id="generation-box">
        <Box sx={{ alignContent:'center', border: 1 , borderColor: "common.white" , marginTop: "20px"}}>
            <Typography sx={{textAlign: 'center' , margin: '5px'}}color="common.white">
              Generation: <span id="generation-num">  </span>
            </Typography>
          </Box>
        </div>
      <div id="terminal-panel" className="panel">
              <textarea id="terminal-stdout" ></textarea>
    
            </div>
    
            <div id="icon-panel">
        
      
      <IconButton aria-label="fingerprint" color="success" onClick={openTerminal}>
    < InfoTwoToneIcon/>
    </IconButton>
    <input id="terminal-stdin"/>
    
            </div>
    
      </div>
         
    
    
    
          <div id="viewport-panel" className="panel">
              <canvas id="viewport"></canvas>
              {loading ? <Loading /> : <></>}
            </div>
    
    
            <Modal
      open={terminal}
      onClose={closeTerminal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
    <div id="modal-content">
    <Typography id="modal-modal-title" variant="h6" component="h2">
        ---- Commands ----
        </Typography>
    
        <IconButton aria-label="fingerprint" color="error" onClick={closeTerminal}>
    < CancelSharpIcon/>
    </IconButton>
    </div>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
       
    
      
    
    <p>
    - p / pause
      Pauses (or resumes) the simulation
    </p>
    
    <p>
    - r / reset [animals=40] [f=60] [...]
      <p>
      Starts simulation from scratch with given optional
      parameters:
      </p>
    </p>
    
    <p>
    * a / animals (default=40)
        number of animals
    </p>
    
    <p>
    * f / foods (default=60)
        number of foods
    
    </p>
    
    <p>
    * n / neurons (default=9)
        number of brain neurons per each animal
    </p>
    
    <p>
    * p / photoreceptors (default=9)
        number of eye cells per each animal
    </p>
    
    <p>
    Examples:
        reset animals=100 foods=100
        r a=100 f=100
        r p=3
    </p>
    
    <p>
    - (t)rain [how-many-generations]
      Fast-forwards one or many generations, allowing to
      observe the learning process faster.
    </p>
    
    <p>
    Examples:
        train
        t 5
    </p>
    
    ----
        </Typography>
      </Box>
    </Modal>
          </div>

    );
}

export default Simulation;
