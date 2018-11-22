import React, { Component } from "react";
import "./Game.css";
import Swiper from "./Swiper";

const WIDTH = 9 * 4;
const HEIGHT = 16 * 4;

const Heading = ({ score }) => (
  <div className="heading">
    <p>Score: {score}</p>
  </div>
);

class Game extends Component {
  state = {
    snake: [
      {
        x: Math.floor(Math.random() * WIDTH),
        y: Math.floor(Math.random() * HEIGHT)
      }
    ],
    direction: "up",
    food: {
      x: Math.floor(Math.random() * WIDTH),
      y: Math.floor(Math.random() * HEIGHT)
    },
    score: 0,
    gameState: "running"
  };
  timer = null;

  swipe = swipeDirection => {
    switch (swipeDirection) {
      case "up":
        if (this.state.direction !== "down") {
          this.setState({ direction: swipeDirection });
        }
        break;
      case "down":
        if (this.state.direction !== "up") {
          this.setState({ direction: swipeDirection });
        }
        break;
      case "left":
        if (this.state.direction !== "right") {
          this.setState({ direction: swipeDirection });
        }
        break;
      case "right":
        if (this.state.direction !== "left") {
          this.setState({ direction: swipeDirection });
        }
        break;
      default:
        break;
    }
  };

  componentDidMount() {
    this.timer = setInterval(() => {
      let newState = { ...this.state };
      let head = Object.assign({}, this.state.snake[0]);

      switch (this.state.direction) {
        case "up":
          head.y = (head.y - 1 + HEIGHT) % HEIGHT;
          break;
        case "right":
          head.x = (head.x + 1) % WIDTH;
          break;
        case "down":
          head.y = (head.y + 1) % HEIGHT;
          break;
        case "left":
          head.x = (head.x - 1 + WIDTH) % WIDTH;
          break;
        default:
          break;
      }

      if (this.isSnake(head.x, head.y)) {
        clearInterval(this.timer);
        this.setState({ gameState: "gameover" });
        return;
      }

      let newFood = false;
      if (head.x === newState.food.x && head.y === newState.food.y) {
        newFood = true;
        newState.snake = [head, ...newState.snake];
      } else {
        newState.snake = [
          head,
          ...newState.snake.slice(0, newState.snake.length - 1)
        ];
      }

      if (newFood) {
        do {
          newState.food.x = Math.floor(Math.random() * WIDTH);
          newState.food.y = Math.floor(Math.random() * HEIGHT);
        } while (this.isSnake(newState.food.x, newState.food.y));
        newState.score++;
      }

      this.setState(newState);
    }, this.props.interval);
  }

  isSnake = (x, y) =>
    this.state.snake.find(point => point.x === x && point.y === y);

  getBlockColor = (x, y) => {
    if (this.isSnake(x, y)) {
      return " snake";
    } else if (x === this.state.food.x && y === this.state.food.y) {
      return " food";
    } else {
      return "";
    }
  };

  returnToStart = () => {
    this.props.gameover(this.state.score);
  };

  render() {
    let rows = Array(HEIGHT).fill(Array(WIDTH).fill(0));

    return (
      <Swiper className="Game" swipe={this.swipe}>
        <Heading score={this.state.score} />
        {rows.map((row, y) => (
          <div className="row">
            {row.map((cell, x) => (
              <div className={"block" + this.getBlockColor(x, y)} />
            ))}
          </div>
        ))}
        {this.props.debug && <pre>{JSON.stringify(this.state, null, 2)}</pre>}
        {this.state.gameState === "gameover" && (
          <h1 className="overlay" onClick={this.returnToStart}>
            Game over
          </h1>
        )}
      </Swiper>
    );
  }
}

export default Game;
