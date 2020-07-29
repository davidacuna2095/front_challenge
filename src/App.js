import React, { Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import RutaPrivada from './routes/RutaPrivada';

// COMPONENTS
import Login from './components/auth/Login';
import Board from './components/board/Board';

// -- CONTEXTS
import AlbumProvider from './context/albumes/AlbumProvider';
import AuthProvider from './context/autenticacion/AuthProvider';

import './App.css';

function App() {
  return (
    // Uso de AuthProvider y AlbumProvider
    // RutaPrivada para acceso a routes solo de usuarios autenticados
    <Router>
      <Suspense fallback={null}>
        <Switch>
          <AuthProvider>
            <Route path="/login" component={Login} />
            <AlbumProvider>
              <RutaPrivada path="/" component={Board} />
            </AlbumProvider>
          </AuthProvider>
        </Switch>
      </Suspense>
    </Router>
  );
}

export default App;
