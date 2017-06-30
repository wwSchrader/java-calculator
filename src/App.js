import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mathOperation: ['9', '+', '4']
    }
    this.handleMathInput = this.handleMathInput.bind(this);
  }

  handleMathInput(mathInput) {
    var mathArray;
    switch(mathInput) {
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
        mathArray = this.numeralInput(mathInput);
        break;
      case '/':
      case '*':
      case '-':
      case '+':
        mathArray = this.operationInput(mathInput);
        break;
      case '=':
      case 'AC':
      case 'CE':
        mathArray = this.finalizeInput(mathInput);
    }
    this.setState({
      mathOperation: mathArray
    });
  }

  finalizeInput(mathInput) {
    var mathArray = this.state.mathOperation;

    if (mathInput === 'AC') {
      return [];
    } else if (mathInput === 'CE') {
      mathArray.pop();
      return mathArray;
    }
  }

  operationInput(mathInput) {
    var mathArray = this.state.mathOperation;
    var lastEntry = mathArray[mathArray.length - 1];
    //if the lastEntry is an operator, replace operator with new operator
    if (lastEntry === '/' || lastEntry === '*' || lastEntry === '-' || lastEntry === '+') {
      mathArray[mathArray.length - 1] = mathInput;
    } else {
      //add operator to end of mathArray
      mathArray.push(mathInput);
    }
    return mathArray;
  }

  numeralInput(mathInput) {
    var mathArray = this.state.mathOperation;
    var lastEntry = mathArray[mathArray.length - 1];
    //if last input is an operator, push mathInput onto array
    if (mathArray.length === 0 || lastEntry === '/' || lastEntry === '*' || lastEntry === '-' || lastEntry === '+') {
      mathArray.push(mathInput);
    } else {
      //add mathInput to last entry of mathArray
      mathArray[mathArray.length - 1] = lastEntry.concat(mathInput);
    }
    return mathArray;
  }

  render() {
    return (
      <div>
        <InputDisplay mathOperation={this.state.mathOperation} />
        <ChainedDisplay mathOperation={this.state.mathOperation} />
        <Buttons onMathInput={this.handleMathInput} />
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
  constructor(props) {
    super(props);
    this.handleMathInput = this.handleMathInput.bind(this);
  }

  handleMathInput(e) {
    this.props.onMathInput(e.target.value);
  }

  render() {
    return (
      <div>
        <div>
          <button value="AC" onClick={this.handleMathInput}>AC</button>
          <button value="CE" onClick={this.handleMathInput}>CE</button>
          <button value="/" onClick={this.handleMathInput}>/</button>
          <button value="*" onClick={this.handleMathInput}>*</button>
        </div>
        <div>
          <button value="7" onClick={this.handleMathInput}>7</button>
          <button value="8" onClick={this.handleMathInput}>8</button>
          <button value="9" onClick={this.handleMathInput}>9</button>
          <button value="-" onClick={this.handleMathInput}>-</button>
        </div>
        <div>
          <button value="4" onClick={this.handleMathInput}>4</button>
          <button value="5" onClick={this.handleMathInput}>5</button>
          <button value="6" onClick={this.handleMathInput}>6</button>
          <button value="+" onClick={this.handleMathInput}>+</button>
        </div>
        <div>
          <button value="1" onClick={this.handleMathInput}>1</button>
          <button value="2" onClick={this.handleMathInput}>2</button>
          <button value="3" onClick={this.handleMathInput}>3</button>
          <button value="=" onClick={this.handleMathInput}>=</button>
        </div>
        <div>
          <button value="0" onClick={this.handleMathInput}>0</button>
          <button value="." onClick={this.handleMathInput}>.</button>
        </div>
      </div>
    )
  }
}

export default App;
