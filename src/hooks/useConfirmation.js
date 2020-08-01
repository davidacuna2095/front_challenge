import React, { useState } from 'react';

import { useTranslation } from 'react-i18next';

import '../styles/styles_modal.scss';

const useConfirmation = (mensajeInicial) => {

    const [mostrar, setMostrar] = useState(false);
    const [mensaje, setMensaje] = useState(mensajeInicial);
    const [respuesta, setRespuesta] = useState(null);

    // translator
    const { t } = useTranslation();

    // Setea mensaje de alerta, y setea timeput para quitar alerta despues de 4 segundos
    const askConfirmation = mensajeAlerta => {
        setMostrar(true);
        setMensaje(mensajeAlerta);
    }

    const confirm = () => {
        setRespuesta(true);
    }

    // Elemento de alerta que muestra en el dom
    const Confirmation = () => (
        mostrar ?
            <div className="modalContainer">
                <div className="modalContent confirmation">
                    <div className="modalDetail confirmation">
                        <div className="row">
                            <div className="col-12">
                                <p>{t(`ALERTS.${mensaje}`)}</p>
                            </div>
                        </div>

                        <div className="row mt-4">
                            <div className="col-6">
                                <button
                                    type="button"
                                    className="btn btn-primary btn-block"
                                    onClick={() => confirm()}
                                >{t('GENERAL.si')}</button>
                            </div>
                            <div className="col-6">
                                <button
                                    type="button"
                                    className="btn btn-primary btn-block"
                                    onClick={() => setMostrar(false)}
                                >{t('GENERAL.no')}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            : null
    );

    return [respuesta, askConfirmation, Confirmation];

}

export default useConfirmation;
