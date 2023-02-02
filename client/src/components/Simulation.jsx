import React , {useEffect , useState} from 'react';
import {Modal,IconButton ,Box , Typography} from "@mui/material"
import InfoTwoToneIcon from '@mui/icons-material/InfoTwoTone';
import './css/sim.css'
const Simulation = () => {

  const [terminal , setTerminal] = useState(false)

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const openTerminal = () => {setTerminal(true)}
  const closeTerminal = () => {setTerminal(false)}

    useEffect(() =>  {
        const load = async () => {
          await import('./index.js')
        }
      load()
    } , [])

    return (
      <div id="container">

  <div id="ter-panel">
    <div id="generation-box">
    <Box sx={{ alignContent:'center', border: 1 , borderColor: "common.white" , marginTop: "20px"}}>
        <Typography sx={{textAlign: 'center' , margin: '5px'}}color="common.white">
          Generation: 213
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
        </div>


        <Modal
  open={terminal}
  onClose={closeTerminal}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box sx={style}>
    <Typography id="modal-modal-title" variant="h6" component="h2">
      Text in a modal
    </Typography>
    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
   
    </Typography>
  </Box>
</Modal>
      </div>
    );
}

export default Simulation;
