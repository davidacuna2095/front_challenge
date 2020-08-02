
import React, { useReducer } from 'react';
import {
    MOSTRAR_ALERTA,
    OCULTAR_ALERTA
} from '../../types';

import ManagementContext from './ManagementContext';
import managementReducer from './managementReducer.js';

// State inicial
const initialState = {
    alerta: null
};

const ManagementProvider = (props) => {

    // Usar Reducer
    const [state, dispatch] = useReducer(managementReducer, initialState);

    // Funciones que modifican action

    const mostrarAlerta = mensaje => {
        dispatch({
            type: MOSTRAR_ALERTA,
            payload: mensaje
        });

        setTimeout(() => {
            ocultarAlerta();
        }, 3000);
    };

    const ocultarAlerta = () => {
        dispatch({
            type: OCULTAR_ALERTA
        });
    };

    return (
        <ManagementContext.Provider
            value={{
                alerta: state.alerta,
                mostrarAlerta
            }}
        >
            {props.children}
        </ManagementContext.Provider>
    )

}

export default ManagementProvider;