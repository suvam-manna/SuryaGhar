import { StrictMode} from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import Home from "./pages/Home.jsx";
import Estimate from './pages/Estimate.jsx';
import Map from './pages/Map2.jsx';
import Tutorial from './pages/Tutorial.jsx';
import DataContextProvider from './contexts/DataContextProvider.jsx';
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
                path: "estimate",
                element: ( 
                    <DataContextProvider>
                        <Estimate />
                    </DataContextProvider>
                )
            },

            {
                path: "tutorial",
                element: <Tutorial />
            }
        ]
    },

    {
        path: "/map",
        element: (
            <DataContextProvider>
                <Map />
            </DataContextProvider>
        )
    }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
