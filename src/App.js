import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <InputDisplay mathOperation={this.props.mathOperation} />
        <ChainedDisplay mathOperation={this.props.mathOperation} />
        <Buttons />
      </div>
    );
  }
}

class InputDisplay extends Component {
  render() {
    return (
        <h2>{this.props.mathOperation[this.props.mathOperation.length - 1]}</h2>
    );
  }
}

class ChainedDisplay extends Component {
  render() {
    return (
      <p>{this.props.mathOperation.join("")}</p>
    );
  }
}

class Buttons extends Component {
  render() {
    return (
      <div>
        <div>
          <button>AC</button>
          <button>CE</button>
          <button>/</button>
          <button>*</button>
        </div>
        <div>
          <button>7</button>
          <button>8</button>
          <button>9</button>
          <button>-</button>
        </div>
        <div>
          <button>4</button>
          <button>5</button>
          <button>6</button>
          <button>+</button>
        </div>
        <div>
          <button>1</button>
          <button>2</button>
          <button>3</button>
          <button>=</button>
        </div>
        <div>
          <button>0</button>
          <button>.</button>
        </div>
      </div>
    )
  }
}

export default App;
