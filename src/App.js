import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Login from './components/auth/Login';
import Board from './components/board/Board';

import './App.css';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route path="/" component={Board} />
      </Switch>
    </Router>
  );
}

export default App;
