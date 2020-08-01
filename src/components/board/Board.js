import React from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';

import Sidebar from './Sidebar';
import Navbar from './Navbar';
import routes, { appLayout } from '../../routes';

import './Board.scss';

const Board = () => {

    // hook conocer current location
    let location = useLocation();

    return (
        <div className="app-container">
            {/* Sidebar con info de albumes de usuario logueado */}
            <Sidebar />
            <div className="app-mainl">
                <main>
                    {/* Navbar con panel de usuario para cambiar idioma y cerrar sesion */}
                    <Navbar />
                    <div className="main-container">
                        {/* Routing paginas core */}
                        {location.pathname === appLayout ? <h3>Bienvenido al centro de tus memorias</h3> : null}
                        <Switch>
                            {routes.map((route, index) => (
                                <Route
                                    key={index}
                                    path={route.path}
                                    exact={route.exact}
                                    component={route.component}
                                />
                            ))}
                        </Switch>
                    </div>
                </main>
            </div>
            <footer></footer>
        </div>
    )
};

export default Board;