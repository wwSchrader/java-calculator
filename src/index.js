import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

var MATH_OPERATION = ['9', '+', '3'];

ReactDOM.render(<App mathOperation={MATH_OPERATION}/>, document.getElementById('root'));
registerServiceWorker();
