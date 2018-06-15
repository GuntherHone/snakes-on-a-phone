import React from 'react';
import './StartScreen.css';

const StartScreen = ({ startGame }) => (
  <div className="StartScreen">
    <h1>Snakes on a Phone</h1>
    <button onClick={startGame}>Start</button>
  </div>
)

export default StartScreen;