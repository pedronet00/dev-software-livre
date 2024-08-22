// Configuração do React
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';

// Componentes
import CriarPost from './components/adm/posts/create';
import Home from './components/home/home';
import ListarPosts from './components/adm/posts/list';
import Navbar from './components/layout/navbar';
import Post from './components/adm/posts/show';
import QuemSomos from './components/quem-somos/quem-somos';
import Login from './components/login/login';
import Dashboard from './components/adm/dashboard/dashboard';
import Comments from './components/adm/posts/comments';

// Estilização
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/home.css';



const Layout = () => (
  <>
    <Navbar />
    <Outlet />
  </>
);

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,  
    children: [
      {
        path: '/',
        element: <Home/>  
      },
      {
        path: '/criarPost',
        element: <CriarPost />  
      },
      {
        path: '/listarPosts',
        element: <ListarPosts />  
      },
      {
        path: '/post/:id',
        element: (
          <>
            <Post />
            <Comments/>
          </>
        ),  
      },
      {
        path: '/quem-somos',
        element: <QuemSomos />  
      },
      {
        path: '/login',
        element: <Login />  
      },
      {
        path: '/dashboard',
        element: <Dashboard />  
      },
    ]
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>
);
