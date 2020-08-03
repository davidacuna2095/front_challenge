import React from 'react';
import { Redirect } from 'react-router-dom';
import Board from '../components/board/Board';
import ListadoFotos from '../components/fotos/ListadoFotos';
import Usuario from '../components/usuario/Usuario';

// Redirect a board cuando ingrese /
const BoardRedirect = () => <Redirect to="/board" />

// board route
export const appLayout = "/board";

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
    },
    {
        path: '/usuario',
        exact: true,
        component: Usuario
    }
];

export default routes;