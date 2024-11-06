import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, Button, Table, TableHead, TableBody, TableRow, TableCell, TableContainer, Paper } from '@mui/material';
import api from '../../api/api';

function ListandoPlanosTratamento() {
  const [planos, setPlanos] = useState([]);
  const idUser = localStorage.getItem('idUser');

  useEffect(() => {
    const fetchPlanos = async () => {
      try {
        const response = await api.get(`/planos-tratamento?idUser=${idUser}`);
        setPlanos(response.data);
      } catch (error) {
        console.error('Erro ao buscar planos de tratamento:', error);
      }
    };
    fetchPlanos();
  }, [idUser]);

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza de que deseja excluir este plano de tratamento?')) {
      try {
        await api.delete(`/plano-tratamento/${id}`);
        setPlanos(planos.filter(plano => plano.id !== id));
        alert('Plano de tratamento excluído com sucesso!');
      } catch (error) {
        console.error('Erro ao excluir plano de tratamento:', error);
        alert('Erro ao excluir o plano de tratamento.');
      }
    }
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component="h1" gutterBottom>
        Planos de Tratamento
      </Typography>
      <Link to="/planos-tratamento/create" style={{ textDecoration: 'none' }}>
        <Button variant="contained" color="primary" style={{ marginBottom: '20px' }}>
          Criar Novo Plano de Tratamento
        </Button>
      </Link>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Objetivos</TableCell>
              <TableCell>Data de Início</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {planos.map((plano) => (
              <TableRow key={plano.id}>
                <TableCell>{plano.objetivos}</TableCell>
                <TableCell>{new Date(plano.dataInicio).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Link to={`/planos-tratamento/create/${plano.id}`} style={{ textDecoration: 'none' }}>
                    <Button variant="outlined" color="warning" size="small" style={{ marginRight: '8px' }}>
                      Editar
                    </Button>
                  </Link>
                  <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    onClick={() => handleDelete(plano.id)}
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

export default ListandoPlanosTratamento;
