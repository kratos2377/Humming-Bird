import init from './pkg/lib_simulation_wasm_bg.wasm?init'
import { useState , useEffect } from 'react'
import './App.css'
import './index.js'

function App() {


  useEffect(() =>  {
    init().then((exports) => {

    })
  } , [])

  return (
    <>
    <div id="container">
    <div id="terminal-panel" className="panel">
      <textarea id="terminal-stdout" ></textarea>
      <input id="terminal-stdin"/>
    </div>
    <div id="viewport-panel" className="panel">
      <canvas id="viewport"></canvas>
    </div>
  </div>
    </>
  )
}

export default App
