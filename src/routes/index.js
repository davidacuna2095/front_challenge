import React from 'react';
import { Redirect } from 'react-router-dom';
import Board from '../components/board/Board';
import ListadoAlbum from '../components/album/ListadoAlbum';

const BoardRedirect = () => <Redirect to="/board" />

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
        path: "/album",
        exact: true,
        component: ListadoAlbum
    }
];

export default routes;