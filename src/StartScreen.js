import React from "react";
import "./StartScreen.css";

const StartScreen = ({ startGame, highScore }) => (
  <div className="StartScreen">
    <h1>Snakes on a Phone</h1>
    <p>High Score: {highScore}</p>
    <button onClick={startGame}>Start</button>
  </div>
);

export default StartScreen;
