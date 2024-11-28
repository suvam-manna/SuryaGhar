import { StrictMode} from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import Home from "./pages/Home.jsx";
import Map from './pages/Map.jsx';
import Estimate from './pages/Estimate.jsx';
import Tutorial from './pages/Tutorial.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "",
                element: <Home />
            },

            {
                path: "home",
                element: <Home />
            },

            {
                path: "tutorial",
                element: <Tutorial />
            },

            {
                path: "estimate",
                element: <Estimate />
            }
        ]
    },

    {
        path: "/map",
        element: <Map />
    },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
