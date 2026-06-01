import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from "react-router-dom";
import { applyMiddleware, compose, createStore } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import thunk from 'redux-thunk';
import App from './App';
import { AuthContext } from "./context/AuthContext";
import './index.scss';
import rootReducer from './redux/reducers/rootReducer.js';

const persistConfig = {
  key: 'root',
  storage,
  stateReconciler: autoMergeLevel2
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

// uncomment this for testing in a browser without dev tools
// const initialState = createStore(
//  persistedReducer,
//  composeWithDevTools(applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__
//  ? window.__REDUX_DEVTOOLS_EXTENSION__()
//  : f => f)
// );

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

 const initialState = createStore(
   persistedReducer,
   composeEnhancers(applyMiddleware(thunk))
 );

let persistor = persistStore(initialState)
ReactDOM.render(
  <AuthContext>
    <Provider store={initialState}>
      <PersistGate loading={<div>loading</div>} persistor={persistor}>
      <React.StrictMode>
      <Router>
        <App />
      </Router>
      </React.StrictMode>
      </PersistGate>
    </Provider>
  </AuthContext>
    ,
  document.getElementById('root')
);
