import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Login from './components/auth/Login';
import Board from './components/board/Board';

import AlbumProvider from './context/albumes/AlbumProvider';

import './App.css';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/login" component={Login} />

        <AlbumProvider>
          <Route path="/" component={Board} />
        </AlbumProvider>

      </Switch>
    </Router>
  );
}

export default App;
