import React from 'react';
import { Redirect } from 'react-router-dom';
import Board from '../components/board/Board';
import ListadoFotos from '../components/fotos/ListadoFotos';

// Redirect a board cuando ingrese /
const BoardRedirect = () => <Redirect to="/board" />

// Routes disponibles 
const routes = [
    {
        path: "/",
        exact: true,
        component: BoardRedirect
    },
    {
        path: "/board",
        exact: true,
        component: Board
    },
    {
        path: "/album/:id",
        exact: true,
        component: ListadoFotos
    }
];

export default routes;