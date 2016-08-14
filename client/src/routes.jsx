import React from 'react';
import { Route} from 'react-router';
import { App } from './components/App';
import { HomeContainer } from './components/Home';
import { Photo } from './components/Photo';

module.exports = <Route component={App}>
  <Route path="/" component={HomeContainer}/>
</Route>;
