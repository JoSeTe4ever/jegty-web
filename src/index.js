import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import { Provider } from 'react-redux'
import {createStore, applyMiddleware, compose} from 'redux';
import rootReducer from './redux/reducers/rootReducer.js';
import thunk from 'redux-thunk';
import { BrowserRouter as Router } from "react-router-dom";

const initialState = createStore(
  rootReducer,
  compose(applyMiddleware(thunk),window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
);

ReactDOM.render(
  <Provider store={initialState}>
    <React.StrictMode>
    <Router>
      <App />
    </Router>
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);
