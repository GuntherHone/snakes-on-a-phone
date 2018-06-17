import React, { Component } from "react";

class Swiper extends Component {
  touchStartX = 0;
  touchStartY = 0;
  touchCurrX = 0;
  touchCurrY = 0;

  touchStart = event => {
    let { clientX, clientY } = event.touches[0];
    this.touchStartX = clientX;
    this.touchStartY = clientY;
  };

  touchMove = event => {
    let { clientX, clientY } = event.touches[0];
    this.touchCurrX = clientX;
    this.touchCurrY = clientY;
  };

  touchEnd = event => {
    let deltaX = this.touchCurrX - this.touchStartX;
    let deltaY = this.touchCurrY - this.touchStartY;

    let swipe = "none";

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      swipe = deltaX < 0 ? "left" : "right";
    } else {
      swipe = deltaY < 0 ? "up" : "down";
    }

    this.props.swipe(swipe);
  };

  render() {
    return (
      <div
        className={this.props.className}
        onTouchStart={this.touchStart}
        onTouchMove={this.touchMove}
        onTouchEnd={this.touchEnd}
      >
        {this.props.children}
      </div>
    );
  }
}

export default Swiper;
