import { useState } from 'react';
import React from 'react';
import './App.css';
import StartMatch from './startMatch/StartMatch';


function App() {
  const [gameId, setGameId] = useState(1);
  return (
    <div className="App">
      <h1>Star Game</h1>
      <StartMatch key={gameId} startNewGame={()=> setGameId(gameId +1)} />
    </div>
  );
}

export default App;
