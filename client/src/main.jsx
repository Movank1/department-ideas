import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom/dist';
import './index.css';

import App from './App.jsx';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import SingleThought from './pages/SingleThought';
import Profile from './pages/Profile';
import Error from './pages/Error';
import Feed from './pages/Feed';

// Define routes
const routes = [
  {
    path: '/',
    element: <App />,
    error: <Error />,
    children: [
      { index: true, element: <Home /> },
      { path: '/login', element: <Login /> },
      { path: '/signup', element: <Signup /> },
      { path: '/me', element: <Profile /> },
      { path: '/profiles/:profileId', element: <Profile /> },
      { path: '/thoughts/:thoughtId', element: <SingleThought /> },
      { path: '/feed', element: <Feed /> },
    ],
  },
];

// Create a browser router with routes
const router = createBrowserRouter(routes);

// Render the application
ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
