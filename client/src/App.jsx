import { useState , useEffect } from 'react'
import './App.css'
// import init from './lib_simulation_wasm_bg.wasm?init'
//  import './index.js'

function App() {


  useEffect(() =>  {
      const load = async () => {
        await import('./index.js')
      }
    load()
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
