import React from 'react';
import {Threejs} from './Components/3D';
import './App.css';



function App() {

  return (
    <div>
      <div className="title-box">
        <h1>Grogu</h1> <span>By Chris</span>
      </div>
      <Threejs />
    </div>
  );
}

export default App;
