import React, { useState, useEffect, useContext, Fragment } from 'react';

import AuthContext from '../../context/autenticacion/AuthContext';
import ManagementContext from '../../context/management/ManagementContext';

import useFilter from '../../hooks/useFilter';

import Todo from './Todo';
import axiosClient from '../../config/axios';
import { useTranslation } from 'react-i18next';

import './Todo.scss';
import imgKeeper from '../../assets/keeper.png';

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


    // -- CUSTOM HOOKS
    // Filtrado de contenido
    const [filteredValues, Filtrado] = useFilter(todos, 'todoUseFilter', 'labelTodo');

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
            <div className="row">
                <div className="col-4 imgKeep">
                    <img alt='fototodo' className="card-img-top" src={imgKeeper} />
                </div>
                <div className="col-8">
                    <div style={{ "maxWidth": "600px", "margin": "0 auto" }}>
                        <Filtrado />
                    </div>
                    <div className="todos-container mt-4">
                        <ul className="todos">
                            {filteredValues.length > 0
                                ?
                                filteredValues.map(todo => (
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