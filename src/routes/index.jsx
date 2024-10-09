import { createBrowserRouter } from 'react-router-dom';
import DefaultLayout from './defaultLayout.jsx';
import Home from '../pages/home/index.jsx';

const router = createBrowserRouter([
    {
        path: '/',
        element: <DefaultLayout />,
        children: [
            {
                path: '/',
                element: <Home />,
            },
            {
                path: '/catalog',
                element: <h1>Catalog</h1>,
            },
            {
                path: '/ideas',
                element: <h1>Ideas</h1>,
            },
            {
                path: '/rooms',
                element: <h1>Rooms</h1>,
            },
            {
                path: '/sofas&armchairs',
                element: <h1>Sofas and armchairs</h1>,
            },
            {
                path: '/beds&mattresses',
                element: <h1>Beds and mattresses</h1>,
            },
            {
                path: '/cabinets&pedestals',
                element: <h1>Cabinets and pedestals</h1>,
            },
            {
                path: '/textiles',
                element: <h1>Textiles</h1>,
            },
            {
                path: '/tables&chairs',
                element: <h1>Tables and chairs</h1>,
            },
            {
                path: '/lighting',
                element: <h1>Lighting</h1>,
            },
            {
                path: '/decor',
                element: <h1>Decor</h1>,
            },
        ],
    },
]);

export default router;