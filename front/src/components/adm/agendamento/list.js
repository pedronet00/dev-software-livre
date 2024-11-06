import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import api from '../../api/api';

function ListandoAgendamentos() {
  const [agendamentos, setAgendamentos] = useState([]);
  const idUser = localStorage.getItem('idUser');
  
  useEffect(() => {
    const fetchAgendamentos = async () => {
      const response = await api.get(`/agendamentos?idUser=${idUser}`);
      setAgendamentos(response.data);
    };
    fetchAgendamentos();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza de que deseja excluir este agendamento?')) {
      try {
        await api.delete(`/agendamento/${id}`);
        setAgendamentos((prevAgendamentos) =>
          prevAgendamentos.filter((agendamento) => agendamento.id !== id)
        );
      } catch (error) {
        console.error('Erro ao excluir o agendamento:', error);
      }
    }
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Agendamentos de Sessões
      </Typography>
      <Button
        component={Link}
        to="/agendamentos/create"
        variant="contained"
        color="primary"
        sx={{ mb: 2 }}
      >
        Criar Novo Agendamento
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Data</TableCell>
              <TableCell>Hora</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {agendamentos.map((agendamento) => (
              <TableRow key={agendamento.id}>
                <TableCell>{new Date(agendamento.dataAgendamento).toLocaleDateString()}</TableCell>
                <TableCell>{agendamento.horaAgendamento}</TableCell>
                <TableCell>
                  <Button
                    component={Link}
                    to={`/agendamentos/${agendamento.id}`}
                    variant="outlined"
                    color="warning"
                    size="small"
                  >
                    Editar
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    onClick={() => handleDelete(agendamento.id)}
                    sx={{ ml: 1 }}
                  >
                    Excluir
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default ListandoAgendamentos;
