import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";

function App() {
  const [message , setMessage]  = useState("Default")


  async function startSimulation() {
      setMessage("Simulation started")
  }

  return (
    <div className="container">
    
    Work here
    </div>
  );
}

export default App;
