import React , {useEffect} from 'react';

const Simulation = () => {


    useEffect(() =>  {
        const load = async () => {
          await import('./index.js')
        }
      load()
    } , [])

    return (
        <div id="container">
        <div id="terminal-panel" className="panel">
          <textarea id="terminal-stdout" ></textarea>
          <input id="terminal-stdin"/>
        </div>
        <div id="viewport-panel" className="panel">
          <canvas id="viewport"></canvas>
        </div>
      </div>
    );
}

export default Simulation;
