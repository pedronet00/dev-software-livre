// Configuração do React
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';

// Componentes
import Home from './components/home/home';
import Navbar from './components/layout/navbar';
import { SidebarMenu } from './components/layout/sidebar';
import Login from './components/login/login';

import CadastroPaciente from './components/adm/pacientes/create';
import { ListandoPacientes } from './components/adm/pacientes/list';



import CadastroAvaliacao from './components/adm/avaliacoes_psicologicas/create';
import CadastroSessoes from './components/adm/sessoes/create';

// Estilização
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/home.css';
import { ListandoAvaliacoes } from './components/adm/avaliacoes_psicologicas/list';



const Layout = () => (
  <>
    {/* <SidebarMenu/> */}
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
        path: '/cadastroPaciente',
        element: <CadastroPaciente />  
      },
      {
        path: '/pacientes',
        element: <ListandoPacientes />  
      },
      {
        path: '/cadastroAvaliacao',
        element: <CadastroAvaliacao />  
      },
      {
        path: '/avaliacoes',
        element: <ListandoAvaliacoes />  
      },
      {
        path: '/cadastroSessoes',
        element: <CadastroSessoes />  
      },
      {
        path: '/login',
        element: <Login />  
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
