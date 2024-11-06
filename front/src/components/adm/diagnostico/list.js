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
  }, [idUser]);

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza de que deseja excluir este diagnóstico?')) {
      try {
        await api.delete(`/diagnostico/${id}`);
        setDiagnosticos(diagnosticos.filter(diagnostico => diagnostico.id !== id));
        alert('Diagnóstico excluído com sucesso!');
      } catch (error) {
        console.error('Erro ao excluir o diagnóstico:', error);
        alert('Erro ao excluir o diagnóstico.');
      }
    }
  };

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
              <TableCell>Diagnóstico</TableCell>
              <TableCell>Data</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {diagnosticos.map(diagnostico => (
              <TableRow key={diagnostico.id}>
                <TableCell>{diagnostico.diagnostico}</TableCell>
                <TableCell>{new Date(diagnostico.dataDiagnostico).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Link to={`/diagnosticos/create/${diagnostico.id}`} style={{ textDecoration: 'none' }}>
                    <Button variant="outlined" color="warning" style={{ marginRight: '8px' }}>
                      Editar
                    </Button>
                  </Link>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleDelete(diagnostico.id)}
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

export default ListandoDiagnosticos;
