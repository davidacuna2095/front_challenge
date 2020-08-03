import React, { Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import RutaPrivada from './routes/RutaPrivada';

// COMPONENTS
import Login from './components/auth/Login';
import Board from './components/board/Board';

// -- CONTEXTS
import AlbumProvider from './context/albumes/AlbumProvider';
import AuthProvider from './context/autenticacion/AuthProvider';
import FotoProvider from './context/fotos/FotoProvider';
import ManagementProvider from './context/management/ManagementProvider';

import './App.css';
import Alert from './utils/alert/Alert';

function App() {
  return (
    // Uso de AuthProvider y AlbumProvider
    // RutaPrivada para acceso a routes solo de usuarios autenticados
    <Router>
      <Suspense fallback={null}>
        <ManagementProvider>
          <Switch>
            <AuthProvider>
              <Route path="/login" component={Login} />
              <AlbumProvider>
                <FotoProvider>
                  <RutaPrivada path="/" component={Board} />
                </FotoProvider>
              </AlbumProvider>
            </AuthProvider>
          </Switch>
          <Alert />
        </ManagementProvider>
      </Suspense>
    </Router>
  );
}

export default App;
