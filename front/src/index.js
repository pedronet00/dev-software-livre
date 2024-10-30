// Configuração do React
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
// Componentes
import Home from './components/home/home';
import Navbar from './components/layout/navbar';
import SidebarMenu from './components/layout/sidebar';
import Login from './components/login/login';
import PrivateRoute from '../src/components/login/privateRoute';

import CadastroPaciente from './components/adm/pacientes/create';
import { ListandoPacientes } from './components/adm/pacientes/list';

import PlanoTratamentoForm from './components/adm/plano_tratamento/create';
import DiagnosticoForm from './components/adm/diagnostico/create';
import ProblemaIdentificadoForm from './components/adm/problemas_identificados/create';
import PrescricaoForm from './components/adm/prescricao/create';
import EncaminhamentoForm from './components/adm/encaminhamento/create';
import AgendamentoForm from './components/adm/agendamento/create';

import ListandoPlanosTratamento from './components/adm/plano_tratamento/list';
import ListandoPrescricoes from './components/adm/prescricao/list';
import ListandoProblemasIdentificados from './components/adm/problemas_identificados/list';
import ListandoEncaminhamentos from './components/adm/encaminhamento/list';
import ListandoDiagnosticos from './components/adm/diagnostico/list';
import ListandoAgendamentos from './components/adm/agendamento/list';
import ListandoSessoes from './components/adm/sessoes/list';

import CadastroAvaliacao from './components/adm/avaliacoes_psicologicas/create';
import CadastroSessoes from './components/adm/sessoes/create';

// Estilização
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/home.css';
import { ListandoAvaliacoes } from './components/adm/avaliacoes_psicologicas/list';



const Layout = () => (
  <>
    <Box sx={{ display: 'flex' }}>
      <SidebarMenu />
        <Box sx={{ marginLeft: 30, flexGrow: 1, padding: '16px' }}>
          <Outlet />
        </Box>
    </Box>
  </>
);

const router = createBrowserRouter([
{
  path: '/',
  element: <PrivateRoute/>,
  children: [
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
        
        
        // Novas rotas que você pediu
        
        {
          path: '/sessoes',  // Formulário de criação e edição
          element: <ListandoSessoes />  
        },
        {
          path: '/sessoes/create/:id?',  // Formulário de criação e edição
          element: <CadastroSessoes />  
        },
        {
          path: '/planos-tratamento/create/:id?',  // Formulário de criação e edição
          element: <PlanoTratamentoForm />  
        },
        
        {
          path: '/diagnosticos/create/:id?',  // Formulário de criação e edição
          element: <DiagnosticoForm />  
        },
        
        {
          path: '/problemas-identificados/create/:id?',  // Formulário de criação e edição
          element: <ProblemaIdentificadoForm />  
        },
        
        {
          path: '/prescricoes/create/:id?',  // Formulário de criação e edição
          element: <PrescricaoForm />  
        },
        
        {
          path: '/encaminhamentos/create/:id?',  // Formulário de criação e edição
          element: <EncaminhamentoForm />  
        },
        {
          path: '/agendamentos/create/:id?',  // Formulário de criação e edição
          element: <AgendamentoForm />  
        },
        // Rotas de listagem para cada módulo
      {
        path: '/planos-tratamento',
        element: <ListandoPlanosTratamento />  
      },
      {
        path: '/prescricoes',
        element: <ListandoPrescricoes />  
      },
      {
        path: '/problemas-identificados',
        element: <ListandoProblemasIdentificados />  
      },
      {
        path: '/encaminhamentos',
        element: <ListandoEncaminhamentos />  
      },
      {
        path: '/diagnosticos',
        element: <ListandoDiagnosticos />  
      },
      {
        path: '/agendamentos',
        element: <ListandoAgendamentos />  
      },
      {
        path: '/agendamentos/:id?',  // Formulário de criação e edição
        element: <AgendamentoForm />  
      },
      ]
    }
  ]
},
  {
    path: '/login',
    element: <Login/>
  }

]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>
);
