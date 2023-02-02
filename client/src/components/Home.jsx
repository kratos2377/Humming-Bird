import { Typography , Box } from '@mui/material';
import React , {useState} from 'react';
import './css/home.css'
import bird from '../assets/bird.svg'
const Home = () => {
    return (
        <div className="content">
    <Box sx={{width: "100%" , maxWidth: 1000}}>
    <div className='bird'>
      <img src={bird} width="300" height="300" alt="Your SVG" />
    </div>
    </Box>

          <Box sx={{width: "100%" , maxWidth: 700 ,borderTop: 1 , borderBottom: 1 , borderColor: 'common.white' , marginBottom: 8}}>
          <Typography sx = {{marginBottom: 2}}color="common.white" >
        <p>  Welcome to our Humming Bird! </p>
         <p> In this project we are simulating the behavior of birds (agents) in a virtual environment using 
          both neural networks and genetic algorithms. The goal of these agents is to discover and gather food.</p>
           Our simulation combines the learning capabilities of neural networks with the evolutionary optimization of genetic algorithms to model 
           the survival and adaptation of these agents in their quest for sustenance. 
           This project provides a unique and exciting demonstration of the interplay between artificial intelligence and
            computational evolution. Get ready to explore the world of our virtual agents and their food-seeking journeys!
      </Typography>

          </Box>
        </div>
    );
}

export default Home;
