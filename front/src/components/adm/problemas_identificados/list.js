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
  const idUser = localStorage.getItem('idUser');

  useEffect(() => {
    const fetchProblemas = async () => {
      const response = await api.get(`/problemas-identificados?idUser=${idUser}`);
      setProblemas(response.data);
    };
    fetchProblemas();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza de que deseja excluir este problema?')) {
      try {
        await api.delete(`/problema-identificado/${id}`);
        setProblemas(problemas.filter(problema => problema.id !== id));
        alert('Problema excluído com sucesso!');
      } catch (error) {
        console.error('Erro ao excluir problema:', error);
        alert('Erro ao excluir o problema.');
      }
    }
  };

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
              <TableCell>Problema</TableCell>
              <TableCell>Data</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {problemas.map((problema) => (
              <TableRow key={problema.id}>
                <TableCell>{problema.id}</TableCell>
                <TableCell>{problema.problema}</TableCell>
                <TableCell>{new Date(problema.dataIdentificacao).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Link to={`/problemas-identificados/create/${problema.id}`} style={{ textDecoration: 'none' }}>
                    <Button variant="outlined" color="warning" size="small" style={{ marginRight: '8px' }}>
                      Editar
                    </Button>
                  </Link>
                  <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    onClick={() => handleDelete(problema.id)}
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

export default ListandoProblemasIdentificados;
