import io from 'socket.io-client';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { ViewerContainer } from './components/Viewer';
import * as reducers from './reducers';

const socket = io();

const reducer = combineReducers(reducers);

const store = createStore(reducer);

socket.on('action', action => store.dispatch(action));

store.dispatch({
  type: "INIT"
})

ReactDOM.render(
  <Provider store={store}>
    <ViewerContainer />
  </Provider>,
  document.getElementById('root')
)
