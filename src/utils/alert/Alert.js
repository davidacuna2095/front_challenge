import React, { useContext } from 'react';

import ManagementContext from '../../context/management/ManagementContext';

import { useTranslation } from 'react-i18next';

import '../../styles/styles_alert.scss';

const Loader = () => {

    // Mngmt context. Handler de alertas
    const managementContext = useContext(ManagementContext);
    const { alerta } = managementContext;

    // translator
    const { t } = useTranslation();

    return (
        alerta ?
            <div className={`alerta ${alerta.categoria}`}>
                {alerta.t ? t(`ALERTS.${alerta.msg}`) : alerta.msg}
            </div>
            : null
    )
};

export default Loader;