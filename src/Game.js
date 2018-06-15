import React, { Component } from 'react';
import './Game.css';

const WIDTH = 9 * 4;
const HEIGHT = 16 * 4;

class Game extends Component {
    state = {
        x: Math.floor(Math.random() * WIDTH),
        y: Math.floor(Math.random() * HEIGHT),
        direction: 'up',
        foodX: Math.floor(Math.random() * WIDTH),
        foodY: Math.floor(Math.random() * HEIGHT),
        score: 0
    }

    touchStartX = 0
    touchStartY = 0
    touchCurrX = 0
    touchCurrY = 0

    touchStart = event => {
        let { clientX, clientY } = event.touches[0];
        this.touchStartX = clientX;
        this.touchStartY = clientY;
    }

    touchMove = event => {
        let { clientX, clientY } = event.touches[0];
        this.touchCurrX = clientX;
        this.touchCurrY = clientY;
    }

    touchEnd = event => {
        let deltaX = this.touchCurrX - this.touchStartX
        let deltaY = this.touchCurrY - this.touchStartY

        let newState = 'none'

        if (Math.abs(deltaX) > Math.abs(deltaY)) {
            newState = deltaX < 0 ? 'left' : 'right'
        } else {
            newState = deltaY < 0 ? 'up' : 'down'
        }

        switch (newState) {
            case 'up':
                if (this.state.direction !== 'down') {
                    this.setState({ direction: newState })
                }
                break;
            case 'down':
                if (this.state.direction !== 'up') {
                    this.setState({ direction: newState })
                }
                break;
            case 'left':
                if (this.state.direction !== 'right') {
                    this.setState({ direction: newState })
                }
                break;
            case 'right':
                if (this.state.direction !== 'left') {
                    this.setState({ direction: newState })
                }
                break;
            default:
                break;
        }

    }

    componentDidMount() {
        setInterval(() => {
            let newState = { ...this.state }

            switch (this.state.direction) {
                case "up":
                    if (this.state.y === 0) {
                        newState.y = HEIGHT - 1
                    } else {
                        newState.y = this.state.y - 1
                    }
                    break;
                case "right":
                    if (this.state.x === WIDTH - 1) {
                        newState.x = 0
                    } else {
                        newState.x = this.state.x + 1
                    }
                    break;
                case "down":
                    if (this.state.y === HEIGHT - 1) {
                        newState.y = 0
                    } else {
                        newState.y = this.state.y + 1
                    }
                    break;
                case "left":
                    if (this.state.x === 0) {
                        newState.x = WIDTH - 1
                    } else {
                        newState.x = this.state.x - 1
                    }
                    break;
                default:
                    break;
            }

            if ((newState.x === newState.foodX) && (newState.y === newState.foodY)) {
                newState.foodX = Math.floor(Math.random() * WIDTH)
                newState.foodY = Math.floor(Math.random() * HEIGHT)
                newState.score++
            }

            this.setState(newState)

        }, this.props.interval)
    }

    getBlockColor = (x, y) => {
        if ((x === this.state.x) && (y === this.state.y)) {
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
            <div className="Game" onTouchStart={this.touchStart}
                onTouchMove={this.touchMove} onTouchEnd={this.touchEnd}>
                <h2>{`Score: ${this.state.score}`}</h2>
                {rows.map((row, y) => <div className="row">{row.map((cell, x) => <div className={"block" + this.getBlockColor(x, y)} />)}</div>)}
                {this.props.debug && <pre>{JSON.stringify(this.state, null, 2)}</pre>}
            </div>
        )
    }
}

export default Game;