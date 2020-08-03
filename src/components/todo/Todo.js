import React from 'react';
import PropTypes from 'prop-types';

import { useTranslation } from 'react-i18next';

import './Todo.scss';

const Todo = ({ todo, onChangeCompletado }) => {

    // Translator
    const { t } = useTranslation();

    // Destructuring
    const { id, title, completed } = todo;

    return (
        <li className="todo">
            <p>{title}</p>

            <div className="completado">
                {completed
                    ?
                    <button
                        type="button"
                        className="completo"
                        onClick={() => onChangeCompletado(id, !completed)}
                    >{t('BOARD.completo')}</button>
                    :
                    <button
                        type="button"
                        className="incompleto"
                        onClick={() => onChangeCompletado(id, !completed)}
                    >{t('BOARD.incompleto')}</button>
                }
            </div>
        </li>
    )
};

Todo.propTypes = {
    todo: PropTypes.object.isRequired,
    onChangeCompletado: PropTypes.func.isRequired
};
export default Todo;