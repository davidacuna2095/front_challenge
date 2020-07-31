import React, { useState } from 'react';

import { useTranslation } from 'react-i18next';

import '../styles/styles_alert.scss';

const useAlert = (mensajeInicial) => {

    const [mostrar, setMostrar] = useState(false);
    const [mensaje, setMensaje] = useState(mensajeInicial);

    // translator
    const { t } = useTranslation();

    // Setea mensaje de alerta, y setea timeput para quitar alerta despues de 4 segundos
    const mostrarAlerta = mensajeAlerta => {
        setMostrar(true);
        setMensaje(mensajeAlerta);

        setTimeout(() => {
            setMostrar(false);
            setMensaje({});
        }, 4000);
    }

    // Elemento de alerta que muestra en el dom
    const Alerta = () => (
        mostrar ?
            <div className={`alerta ${mensaje.categoria}`}>
                {mensaje.t ? t(`ALERTS.${mensaje.msg}`) : mensaje.msg}
            </div>
            : null
    );

    return [mostrarAlerta, Alerta];

}

export default useAlert;
