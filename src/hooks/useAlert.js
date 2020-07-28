import React, { useState } from 'react';

import './styles_alert.scss';

const useAlert = (mensajeInicial) => {

    const [mostrar, setMostrar] = useState(false);
    const [mensaje, setMensaje] = useState(mensajeInicial);

    const mostrarAlerta = mensajeAlerta => {
        setMostrar(true);
        setMensaje(mensajeAlerta);

        setTimeout(() => {
            setMostrar(false);
            setMensaje({});
        }, 4000);
    }

    const Alerta = () => (
        mostrar ?
            <div className={`alerta ${mensaje.categoria}`}>
                {mensaje.msg}
            </div>
            : null
    );

    return [mostrarAlerta, Alerta];

}

export default useAlert;
