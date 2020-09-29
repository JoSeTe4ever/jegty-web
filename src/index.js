import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import { Provider } from 'react-redux'
import {createStore, applyMiddleware} from 'redux';
import rootReducer from './redux/reducers/rootReducer.js';
import thunk from 'redux-thunk';
import * as serviceWorker from './serviceWorker';

const initialState = createStore(
  rootReducer,
  applyMiddleware(thunk),
);

ReactDOM.render(
  <Provider store={initialState}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
