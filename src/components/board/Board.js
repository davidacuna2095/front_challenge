import React, { useContext } from 'react';
import { Switch, Route } from 'react-router-dom';

import AlbumContext from '../../context/albumes/AlbumContext';

import Sidebar from './Sidebar';
import Navbar from './Navbar';
import routes from '../../routes';

const Board = () => {

    // AlbumContext para obtener variables de album y validar si se esta visualizando un album
    const albumContext = useContext(AlbumContext);
    const { currentAlbum } = albumContext;

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
                        {!currentAlbum ? <h3>Bienvenido al centro de tus memorias</h3> : null}
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