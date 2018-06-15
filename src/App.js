import React, { Component } from 'react';
import Game from './Game';
import StartScreen from './StartScreen';

class App extends Component {
  state = { screen: "start" }

  startGame = () =>
    this.setState({ screen: "game" })

  render() {
    switch (this.state.screen) {
      default:
      case "start":
        return <StartScreen startGame={this.startGame} />
      case "game":
        return <Game interval={200} debug={true}/>
    }
  }
}

export default App;