import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Container,
  Typography,
  Paper
} from '@mui/material';
import api from '../../api/api';

function ListandoPrescricoes() {
  const [prescricoes, setPrescricoes] = useState([]);
  const idUser = localStorage.getItem('idUser');
  useEffect(() => {
    const fetchPrescricoes = async () => {
      const response = await api.get(`/prescricoes?idUser=${idUser}`);
      setPrescricoes(response.data);
    };
    fetchPrescricoes();
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Prescrições
      </Typography>
      <Link to="/prescricoes/create" style={{ textDecoration: 'none' }}>
        <Button variant="contained" color="primary" className="mb-3">
          Criar Nova Prescrição
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
            {prescricoes.map((prescricao) => (
              <TableRow key={prescricao.id}>
                <TableCell>{prescricao.id}</TableCell>
                <TableCell>{prescricao.descricao}</TableCell>
                <TableCell>{new Date(prescricao.data).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Link to={`/prescricoes/create/${prescricao.id}`} style={{ textDecoration: 'none' }}>
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

export default ListandoPrescricoes;
