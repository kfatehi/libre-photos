import io from 'socket.io-client';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyRouterMiddleware, browserHistory, Router , Route} from 'react-router';
import { useScroll } from 'react-router-scroll';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import * as reducers from './reducers';
import routes from './routes';
import remoteActionMiddleware from './remote-action-middleware';

const socket = io();

const reducer = combineReducers(reducers);

const createStoreWithMiddleware = applyMiddleware(
  remoteActionMiddleware(socket)
)(createStore);

const store = createStoreWithMiddleware(reducer);

socket.on('action', action => store.dispatch(action));

ReactDOM.render(
  <Provider store={store}>
    <Router
      history={browserHistory}
      render={applyRouterMiddleware(useScroll())}
      routes={routes}
    />
  </Provider>,
  document.getElementById('root')
);
