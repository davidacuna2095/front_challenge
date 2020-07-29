import React, { useContext, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthContext from '../context/autenticacion/AuthContext';

const RutaPrivada = ({ component: Component, ...props }) => {

    const authContext = useContext(AuthContext);
    const { token, returnAuthUser } = authContext;

    // Para manejar el f5 y mantener sesion
    useEffect(() => {
        returnAuthUser();
        // eslint-disable-next-line
    }, []);

    return (
        <Route {...props} render={props => !token ?
            <Redirect to='/login' />
            :
            <Component {...props} />
        }
        />
    )
}

export default RutaPrivada;