import React, { Component } from 'react';

export default class Stats extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   fps: 0,
    //   mem: 0
    // };
    this.state = {
      fps: 0
    };

    this.style = {
      color: '#ffffff',
      position: 'absolute',
      padding: '10px',
      right: '0px',
      bottom: '0px'
    };
  }

  componentDidMount() {
    this.beginTime = this.prevTime = (performance || Date).now();
    this.frames = 0;
    //this.loop();
    this.startLoop();
    // setTimeout(() => {
    //   this.loop();
    // }, 500);
  }

  componentWillUnmount() {
    this.stopLoop();
  }

  startLoop() {
    if (!this._frameId) {
      //this._frameId = window.requestAnimationFrame(this.loop);
      this.loop();
    }
  }

  stopLoop() {
    window.cancelAnimationFrame(this._frameId);
  }

  loop() {
    this.update();
    this._frameId = window.requestAnimationFrame(() => {
      this.loop();
    });
    //this.req = window.requestAnimationFrame(this.loop);
  }

  begin() {
    this.beginTime = (performance || Date).now();
  }

  end() {
    this.frames++;
    let time = (performance || Date).now();
    if (time >= this.prevTime + 1000) {
      let fps = this.frames * 1000 / (time - this.prevTime);
      this.prevTime = time;
      this.frames = 0;
      //let mem = performance.memory.usedJSHeapSize / 1048576;

      //this.setState({ fps: fps, mem: mem });
      this.setState({ fps: fps.toFixed(0) });
    }
    return time;
  }

  update() {
    this.beginTime = this.end();
  }

  render() {
    return <div style={this.style}>{this.state.fps} fps</div>;
  }
}
