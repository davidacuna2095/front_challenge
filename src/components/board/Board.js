import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Sidebar from './Sidebar';
import Navbar from './Navbar';
import routes from '../../routes';

const Board = () => {
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
        </div>
    )
};

export default Board;