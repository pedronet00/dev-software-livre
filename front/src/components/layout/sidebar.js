import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Box, List, ListItem, ListItemText, Typography, Divider } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import AssessmentIcon from '@mui/icons-material/Assessment';
import TreatmentIcon from '@mui/icons-material/Healing'; // Exemplo de ícone
import DiagnosisIcon from '@mui/icons-material/MedicalServices'; // Exemplo de ícone
import ProblemIcon from '@mui/icons-material/Warning'; // Exemplo de ícone
import PrescriptionIcon from '@mui/icons-material/Description'; // Exemplo de ícone
import ForwardIcon from '@mui/icons-material/Forward'; // Exemplo de ícone
import ScheduleIcon from '@mui/icons-material/Schedule'; // Exemplo de ícone
import ChairIcon from '@mui/icons-material/Chair'; // Exemplo de ícone
import LoginIcon from '@mui/icons-material/Login';

const SidebarMenu = () => {
    const [userName, setUserName] = useState('');

    useEffect(() => {
        const name = localStorage.getItem('name');
        if (name) {
            setUserName(name);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('name');
        window.location.href = '/login'; // Mude para a rota desejada
    };

    return (
        <Box
            sx={{
                width: 250,
                height: '100vh',
                bgcolor: '#25262d',
                position: 'fixed',
                color: 'white',
                display: 'flex',
                flexDirection: 'column',
                paddingTop: '16px',
                overflowY: 'auto', // Permite rolagem,
            }}
        >
            <Typography variant="h6" sx={{ padding: '16px', textAlign: 'center' }}>Clínica</Typography>
            <List>
                <ListItem>
                    <ListItemText primary={`Olá, ${userName}`} />
                </ListItem>
                <Divider />
                <ListItem component={Link} to="/agendamentos">
                    <ScheduleIcon sx={{ marginRight: 1 }} />
                    <ListItemText sx={{color: 'white'}} primary="Agendamentos" />
                </ListItem>
                <ListItem component={Link} to="/avaliacoes">
                    <AssessmentIcon sx={{ marginRight: 1 }} />
                    <ListItemText sx={{color: 'white'}} primary="Avaliações" />
                </ListItem>
                <ListItem component={Link} to="/">
                    <DashboardIcon sx={{ marginRight: 1 }} />
                    <ListItemText sx={{color: 'white'}} primary="Dashboard" />
                </ListItem>
                <ListItem component={Link} to="/diagnosticos">
                    <DiagnosisIcon sx={{ marginRight: 1 }} />
                    <ListItemText sx={{color: 'white'}} primary="Diagnósticos" />
                </ListItem>
                <ListItem component={Link} to="/encaminhamentos">
                    <ForwardIcon sx={{ marginRight: 1 }} />
                    <ListItemText sx={{color: 'white'}} primary="Encaminhamentos" />
                </ListItem>
                <ListItem component={Link} to="/pacientes">
                    <PeopleIcon sx={{ marginRight: 1 }} />
                    <ListItemText sx={{color: 'white'}} primary="Pacientes" />
                </ListItem>
                <ListItem component={Link} to="/planos-tratamento">
                    <TreatmentIcon sx={{ marginRight: 1 }} />
                    <ListItemText sx={{color: 'white'}} primary="Planos de Tratamento" />
                </ListItem>
                <ListItem component={Link} to="/prescricoes">
                    <PrescriptionIcon sx={{ marginRight: 1 }} />
                    <ListItemText sx={{color: 'white'}} primary="Prescrições" />
                </ListItem>
                <ListItem component={Link} to="/problemas-identificados">
                    <ProblemIcon sx={{ marginRight: 1 }} />
                    <ListItemText sx={{color: 'white'}} primary="Problemas Identificados" />
                </ListItem>
                <ListItem component={Link} to="/sessoes">
                    <ChairIcon sx={{ marginRight: 1 }} />
                    <ListItemText sx={{color: 'white'}} primary="Sessões" />
                </ListItem>
                <ListItem button onClick={handleLogout}>
                    <LoginIcon sx={{ marginRight: 1 }} />
                    <ListItemText primary="Sair" />
                </ListItem>
            </List>
        </Box>
    );
};

export default SidebarMenu;
