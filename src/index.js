import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import { Provider } from 'react-redux'
import {createStore, applyMiddleware, compose} from 'redux';
import rootReducer from './redux/reducers/rootReducer.js';
import thunk from 'redux-thunk';
import { BrowserRouter as Router } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import { persistStore, persistReducer } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

const persistConfig = {
  key: 'root',
  storage,
  stateReconciler: autoMergeLevel2
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const initialState = createStore(
  persistedReducer,
  compose(applyMiddleware(thunk),window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
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
