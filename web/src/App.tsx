import { useState } from 'react'
import './App.css'
import * as sim from './js/index'

function App() {
  const [count, setCount] = useState(0)

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
  )
}

export default App
