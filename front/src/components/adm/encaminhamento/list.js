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

  useEffect(() => {
    const fetchEncaminhamentos = async () => {
      const response = await api.get('/encaminhamentos');
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
            <TableCell>Motivo</TableCell>
            <TableCell>Data</TableCell>
            <TableCell>Profissional</TableCell>
            <TableCell>Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {encaminhamentos.map((encaminhamento) => (
            <TableRow key={encaminhamento.id}>
              <TableCell>{encaminhamento.id}</TableCell>
              <TableCell>{encaminhamento.motivo}</TableCell>
              <TableCell>{new Date(encaminhamento.data).toLocaleDateString()}</TableCell>
              <TableCell>{encaminhamento.profissional}</TableCell>
              <TableCell>
                <Button 
                  component={Link} 
                  to={`/encaminhamentos/${encaminhamento.id}`} 
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
