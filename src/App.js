import React, { Component } from 'react';
import Game from './Game';
import StartScreen from './StartScreen';

class App extends Component {
  state = { screen: "start", highscore: 0 }

  componentDidMount() {
    this.setState({ highscore: localStorage.getItem("highscore") || 0 })
  }

  startGame = () =>
    this.setState({ screen: "game" })

  gameOver = score => {
    let highscore = Math.max(score, this.state.highscore)
    this.setState({ screen: "start", highscore })
    localStorage.setItem("highscore", highscore)
  }

  render() {
    switch (this.state.screen) {
      default:
      case "start":
        return <StartScreen startGame={this.startGame} highScore={this.state.highscore} />
      case "game":
        return <Game interval={100} debug={false} gameover={this.gameOver} />
    }
  }
}

export default App;