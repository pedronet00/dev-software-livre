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
  Paper
} from '@mui/material';
import api from '../../api/api';

function ListandoProblemasIdentificados() {
  const [problemas, setProblemas] = useState([]);

  useEffect(() => {
    const fetchProblemas = async () => {
      const response = await api.get('/problemas-identificados');
      setProblemas(response.data);
    };
    fetchProblemas();
  }, []);

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Problemas Identificados
      </Typography>
      <Link to="/problemas-identificados/create" style={{ textDecoration: 'none' }}>
        <Button variant="contained" color="primary" className="mb-3">
          Criar Novo Problema
        </Button>
      </Link>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Descrição</TableCell>
              <TableCell>Data</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {problemas.map(problema => (
              <TableRow key={problema.id}>
                <TableCell>{problema.id}</TableCell>
                <TableCell>{problema.descricao}</TableCell>
                <TableCell>{new Date(problema.data).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Link to={`/problemas-identificados/${problema.id}`} style={{ textDecoration: 'none' }}>
                    <Button variant="outlined" color="warning">
                      Editar
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default ListandoProblemasIdentificados;
