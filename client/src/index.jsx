import io from 'socket.io-client';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyRouterMiddleware, browserHistory, Router , Route} from 'react-router';
import { useScroll } from 'react-router-scroll';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import * as reducers from './reducers';
import routes from './routes';

const socket = io();

const reducer = combineReducers(reducers);

const store = createStore(reducer);

socket.on('action', action => store.dispatch(action));

store.dispatch({ type: "INIT" });

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
