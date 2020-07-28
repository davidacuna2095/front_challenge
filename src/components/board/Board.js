import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Sidebar from './Sidebar';
import Navbar from './Navbar';
import routes from '../../routes';

const Board = () => {
    return (
        <div className="app-container">
            <Sidebar />
            <div className="app-mainl">
                <main>
                    <Navbar />
                    <div className="main-container">
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