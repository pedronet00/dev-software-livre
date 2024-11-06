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
} from '@mui/material';
import api from '../../api/api';

function ListandoEncaminhamentos() {
  const [encaminhamentos, setEncaminhamentos] = useState([]);
  const idUser = localStorage.getItem('idUser');

  useEffect(() => {
    const fetchEncaminhamentos = async () => {
      const response = await api.get(`/encaminhamentos?idUser=${idUser}`);
      setEncaminhamentos(response.data);
    };
    fetchEncaminhamentos();
  }, []);

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
        className="mb-3"
      >
        Criar Novo Encaminhamento
      </Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Descrição</TableCell>
            <TableCell>Data</TableCell>
            <TableCell>Profissional</TableCell>
            <TableCell>Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {encaminhamentos.map((encaminhamento) => (
            <TableRow key={encaminhamento.id}>
              <TableCell>{encaminhamento.id}</TableCell>
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
                >
                  Editar
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
}

export default ListandoEncaminhamentos;
