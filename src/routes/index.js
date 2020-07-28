import Board from '../components/board/Board';
import ListadoAlbum from '../components/album/ListadoAlbum';

const routes = [
    {
        path: "/",
        exact: true,
        component: Board
    },
    {
        path: "/album",
        exact: true,
        component: ListadoAlbum
    }
]

export default routes;