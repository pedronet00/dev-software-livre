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

  useEffect(() => {
    const fetchAgendamentos = async () => {
      const response = await api.get('/agendamentos');
      setAgendamentos(response.data);
    };
    fetchAgendamentos();
  }, []);

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
              <TableCell>ID</TableCell>
              <TableCell>Data</TableCell>
              <TableCell>Hora</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {agendamentos.map((agendamento) => (
              <TableRow key={agendamento.id}>
                <TableCell>{agendamento.id}</TableCell>
                <TableCell>{new Date(agendamento.data).toLocaleDateString()}</TableCell>
                <TableCell>{agendamento.hora}</TableCell>
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
