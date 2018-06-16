import React, { Component } from 'react';
import './Game.css';
import Swiper from './Swiper';

const WIDTH = 9 * 4;
const HEIGHT = 16 * 4;

class Game extends Component {
    state = {
        snake: [{
            x: Math.floor(Math.random() * WIDTH),
            y: Math.floor(Math.random() * HEIGHT)
        }],
        direction: 'up',
        foodX: Math.floor(Math.random() * WIDTH),
        foodY: Math.floor(Math.random() * HEIGHT),
        score: 0
    }

    swipe = swipeDirection => {
        switch (swipeDirection) {
            case 'up':
                if (this.state.direction !== 'down') {
                    this.setState({ direction: swipeDirection })
                }
                break;
            case 'down':
                if (this.state.direction !== 'up') {
                    this.setState({ direction: swipeDirection })
                }
                break;
            case 'left':
                if (this.state.direction !== 'right') {
                    this.setState({ direction: swipeDirection })
                }
                break;
            case 'right':
                if (this.state.direction !== 'left') {
                    this.setState({ direction: swipeDirection })
                }
                break;
            default:
                break;
        }
    }

    componentDidMount() {
        setInterval(() => {
            let newState = { ...this.state }
            let head = Object.assign({}, this.state.snake[0])

            switch (this.state.direction) {
                case "up":
                    head.y = ((head.y - 1) + HEIGHT) % HEIGHT;
                    break;
                case "right":
                    head.x = (head.x + 1) % WIDTH;
                    break;
                case "down":
                    head.y = (head.y + 1) % HEIGHT;
                    break;
                case "left":
                    head.x = ((head.x - 1) + WIDTH) % WIDTH
                    break;
                default:
                    break;
            }

            let newFood = false
            if ((head.x === newState.foodX) && (head.y === newState.foodY)) {
                newFood = true
                newState.snake = [head, ...newState.snake]
            } else {
                newState.snake = [head, ...newState.snake.slice(0, newState.snake.length - 1)]
            }

            if (newFood) {
                do {
                    newState.foodX = Math.floor(Math.random() * WIDTH)
                    newState.foodY = Math.floor(Math.random() * HEIGHT)
                } while (this.isSnake(newState.foodX, newState.foodY))
                newState.score++
            }

            this.setState(newState)

        }, this.props.interval)
    }

    isSnake = (x, y) => this.state.snake.find(point => (point.x === x) && (point.y === y))

    getBlockColor = (x, y) => {
        if (this.isSnake(x, y)) {
            return " snake";
        } else if ((x === this.state.foodX) && (y === this.state.foodY)) {
            return " food";
        } else {
            return "";
        }
    }

    render() {
        let rows = Array(HEIGHT).fill(Array(WIDTH).fill(0))

        return (
            <Swiper className="Game" swipe={this.swipe}>
                <h2>{`Score: ${this.state.score}`}</h2>
                {rows.map((row, y) => <div className="row">{row.map((cell, x) => <div className={"block" + this.getBlockColor(x, y)} />)}</div>)}
                {this.props.debug && <pre>{JSON.stringify(this.state, null, 2)}</pre>}
            </Swiper>
        )
    }
}

export default Game;