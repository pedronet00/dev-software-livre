import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  Typography,
  Button,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
} from '@mui/material';
import api from '../../api/api';

function ListandoEncaminhamentos() {
  const [encaminhamentos, setEncaminhamentos] = useState([]);
  const idUser = localStorage.getItem('idUser');

  useEffect(() => {
    const fetchEncaminhamentos = async () => {
      try {
        const response = await api.get(`/encaminhamentos?idUser=${idUser}`);
        setEncaminhamentos(response.data);
      } catch (error) {
        console.error('Erro ao buscar encaminhamentos:', error);
      }
    };
    fetchEncaminhamentos();
  }, [idUser]);

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza de que deseja excluir este encaminhamento?')) {
      try {
        await api.delete(`/encaminhamento/${id}`);
        setEncaminhamentos(encaminhamentos.filter(encaminhamento => encaminhamento.id !== id));
        alert('Encaminhamento excluído com sucesso!');
      } catch (error) {
        console.error('Erro ao excluir encaminhamento:', error);
        alert('Erro ao excluir o encaminhamento.');
      }
    }
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Encaminhamentos
      </Typography>
      <Button 
        component={Link} 
        to="/encaminhamentos/create" 
        variant="contained" 
        color="primary" 
        style={{ marginBottom: '20px' }}
      >
        Criar Novo Encaminhamento
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Descrição</TableCell>
              <TableCell>Data</TableCell>
              <TableCell>Profissional</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {encaminhamentos.map((encaminhamento) => (
              <TableRow key={encaminhamento.id}>
                <TableCell>{encaminhamento.descricaoEncaminhamento}</TableCell>
                <TableCell>{new Date(encaminhamento.dataEncaminhamento).toLocaleDateString()}</TableCell>
                <TableCell>{encaminhamento.profissionalEncaminhado}</TableCell>
                <TableCell>
                  <Button 
                    component={Link} 
                    to={`/encaminhamentos/create/${encaminhamento.id}`} 
                    variant="outlined" 
                    color="warning"
                    size="small"
                    style={{ marginRight: '8px' }}
                  >
                    Editar
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    onClick={() => handleDelete(encaminhamento.id)}
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

export default ListandoEncaminhamentos;
