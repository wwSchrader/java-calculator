import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mathOperation: []
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
      case '0':
      case '.':
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
      //clear array
      return [];
    } else if (mathInput === 'CE') {
      mathArray.pop();
      return mathArray;
    } else if (mathInput === '=' && mathArray[mathArray.length - 2] === '=') {
      //if the math equation was already evaluated, repeat last operator on math answer
      var newArray = [];
      //put last answer as first number in new array
      newArray.push(mathArray[mathArray.length - 1]);
      //grab the last operator and number entered from before
      newArray.push(mathArray.slice(-4, -3));
      newArray.push(mathArray.slice(-3, -2));

      var mathNewAnswer = eval(newArray.join(""));
      newArray.push(mathInput);
      newArray.push(mathNewAnswer);
      return newArray;
    } else if (mathInput === '=' && mathArray.length > 2 && mathArray.length % 2 === 1) {
      //check to see if math equation has a proper math statement to evaluate
      //first make sure there are more than two elements to check for number operator number pattern
      //check for remainder is odd to ensure current last input is a number

      var mathArrayTemp = mathArray.slice();
      //take first 3 elements from array to evaluate
      var mathAnswer = eval(mathArrayTemp.splice(0, 3).join(""));
      //take next two elements to evaluate until temp array is empty
      while (mathArrayTemp.length > 0) {
        mathAnswer = eval(mathAnswer + mathArrayTemp.splice(0 , 2).join(""));
      }
      //push the operator and answer onto mathArray to be returned
      mathArray.push(mathInput);
      mathArray.push(mathAnswer);
      return mathArray;
    } else {
      return mathArray;
    }
  }

  operationInput(mathInput) {
    var mathArray = this.state.mathOperation;
    var lastEntry = mathArray[mathArray.length - 1];
    if (mathArray[mathArray.length - 2] === '=') {
      //if the last operation was evaluated, start a new mathArray with the answer as the first input
      var aNewMathArray = [lastEntry];
      aNewMathArray.push(mathInput);
      return aNewMathArray;
    }
    if (lastEntry === '/' || lastEntry === '*' || lastEntry === '-' || lastEntry === '+') {
      //if the lastEntry is an operator, replace operator with new operator
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
    if (mathArray[mathArray.length - 2] === '=') {
      //start new equation if last equation was already evaluated
      var newArray = [mathInput];
      return newArray;
    } else if (mathArray.length === 0 || lastEntry === '/' || lastEntry === '*' || lastEntry === '-' || lastEntry === '+') {
      //if last input is an operator, push mathInput onto array
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
