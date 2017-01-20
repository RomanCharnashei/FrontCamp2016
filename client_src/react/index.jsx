import ReactDOM from 'react-dom';
import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router'
import App from './app';
import Articles from './app/articles';
import Article from './app/article';


ReactDOM.render((
  <Router history={hashHistory}>
    <Route path='/' component={App}>
      <IndexRoute component={Articles} />
      <Route path='/article/:id' component={Article} />
      <Route path='/articles' component={Articles} />
    </Route>    
  </Router>
  ), document.getElementById('root')); 