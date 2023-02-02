import { Typography , Box } from '@mui/material';
import React , {useState} from 'react';
import './css/home.css'
import nn from '../assets/nn.svg'
const Home = () => {
    return (
        <div className="content">
    <Box sx={{width: "100%" , maxWidth: 1000}}>
    <div >
      <img src={nn} sizes={900} alt="Your SVG" />
    </div>
    </Box>

          <Box sx={{width: "100%" , maxWidth: 500}}>
          <Typography color="common.white">
       The follo
      </Typography>

          </Box>
        </div>
    );
}

export default Home;
