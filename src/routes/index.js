import Board from '../components/board/Board';
import Album from '../components/album/Album';

const routes = [
    {
        path: "/",
        exact: true,
        component: Board
    },
    {
        path: "/album",
        exact: true,
        component: Album
    }
]

export default routes;