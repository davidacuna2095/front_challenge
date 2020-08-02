import React, { useState, useEffect, useContext, Fragment } from 'react';

import AuthContext from '../../context/autenticacion/AuthContext';
import ManagementContext from '../../context/management/ManagementContext';

import Todo from './Todo';
import axiosClient from '../../config/axios';
import { useTranslation } from 'react-i18next';

import './Todo.scss';

const Todos = () => {

    // -- CONTEXTS
    // Context de autenticacion. Destructuring de states/functions que se precisan
    const authContext = useContext(AuthContext);
    const { usuario } = authContext;
    // Mngmt context. Handler de alertas
    const managementContext = useContext(ManagementContext);
    const { mostrarAlerta } = managementContext;

    // Translator
    const { t } = useTranslation();

    // --STATES
    // Almacena todos
    const [todos, setTodos] = useState([]);

    // Usuario logueado
    useEffect(() => {
        if (usuario) getTodos(usuario.id);
        // eslint-disable-next-line
    }, [usuario]);

    //[PATCH] Cambio de completado
    const onChangeCompletado = async (id, estado) => {
        try {
            const response = await axiosClient.patch(`/todos/${id}`, { "completed": estado });
            setTodos(todos.map(todo => todo.id === id ? response.data : todo));
        } catch (error) {
            mostrarAlerta({ msg: t('ALERTS.deletePhotoError'), categoria: 'alerta-error' });
        }
    };

    // Obtiner todos usuario actual
    const getTodos = async userId => {
        try {
            const response = await axiosClient.get(`/todos?userId=${userId}`);
            setTodos(response.data);
        } catch (error) {
            mostrarAlerta({ msg: t('ALERTS.deletePhotoError'), categoria: 'alerta-error' });
        }
    };

    return (
        <Fragment>
            <h3>{t('BOARD.info')}</h3>
            <div className="row">
                <div className="col-4">

                </div>
                <div className="col-8">
                    <div className="todos-container mt-4">

                        <ul className="todos">
                            {todos.length > 0
                                ?
                                todos.map(todo => (
                                    <Todo
                                        key={todo.id}
                                        todo={todo}
                                        onChangeCompletado={onChangeCompletado}
                                    />
                                ))
                                :
                                <li className="todo"><p>{t('BOARD.empty')}</p></li>
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </Fragment>
    )
};

export default Todos;