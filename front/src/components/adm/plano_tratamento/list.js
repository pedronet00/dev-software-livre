import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, Button, Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';
import api from '../../api/api';

function ListandoPlanosTratamento() {
  const [planos, setPlanos] = useState([]);
  const idUser = localStorage.getItem('idUser');

  useEffect(() => {
    const fetchPlanos = async () => {
      const response = await api.get(`/planos-tratamento?idUser=${idUser}`);
      setPlanos(response.data);
    };
    fetchPlanos();
  }, []);

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component="h1" gutterBottom>
        Planos de Tratamento
      </Typography>
      <Link to="/planos-tratamento/create" style={{ textDecoration: 'none' }}>
        <Button variant="contained" color="primary" className="mb-3">
          Criar Novo Plano de Tratamento
        </Button>
      </Link>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Objetivos</TableCell>
            <TableCell>Data de Início</TableCell>
            <TableCell>Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {planos.map(plano => (
            <TableRow key={plano.id}>
              <TableCell>{plano.id}</TableCell>
              <TableCell>{plano.objetivos_terapeuticos}</TableCell>
              <TableCell>{new Date(plano.data_inicio).toLocaleDateString()}</TableCell>
              <TableCell>
                <Link to={`/planos-tratamento/${plano.id}`} style={{ textDecoration: 'none' }}>
                  <Button variant="outlined" color="warning" size="small">
                    Editar
                  </Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
}

export default ListandoPlanosTratamento;
