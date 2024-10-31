import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Typography, Table, TableHead, TableBody, TableRow, TableCell, TableContainer, Paper } from '@mui/material';
import api from '../../api/api';

function ListandoDiagnosticos() {
  const [diagnosticos, setDiagnosticos] = useState([]);
  const idUser = localStorage.getItem('idUser');

  useEffect(() => {
    const fetchDiagnosticos = async () => {
      const response = await api.get(`/diagnosticos?idUser=${idUser}`);
      setDiagnosticos(response.data);
    };
    fetchDiagnosticos();
  }, []);

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Diagnósticos
      </Typography>
      <Link to="/diagnosticos/create" style={{ textDecoration: 'none' }}>
        <Button variant="contained" color="primary" className="mb-3">
          Criar Novo Diagnóstico
        </Button>
      </Link>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Diagnóstico</TableCell>
              <TableCell>Data</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {diagnosticos.map(diagnostico => (
              <TableRow key={diagnostico.id}>
                <TableCell>{diagnostico.id}</TableCell>
                <TableCell>{diagnostico.diagnostico}</TableCell>
                <TableCell>{new Date(diagnostico.dataDiagnostico).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Link to={`/diagnosticos/${diagnostico.id}`} style={{ textDecoration: 'none' }}>
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

export default ListandoDiagnosticos;
