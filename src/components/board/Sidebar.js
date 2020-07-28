import React from 'react';
import { useTranslation } from 'react-i18next';

import './Board.scss';

const Sidebar = () => {

    const { t } = useTranslation();

    return (
        <aside>
            <h1 className="title">Memories<span>Keeper</span></h1>

            <div className="form-sidebar">
                <h2>{t('HEADER.subtitle')}</h2>
            </div>
        </aside>
    )
};

export default Sidebar;