import React, { useState, useEffect } from 'react';
import api from '../../api/api';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  CircularProgress,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

export function ListandoPacientes() {
  const [pacientes, setPacientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const idUser = localStorage.getItem('idUser');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPacientes = async () => {
      try {
        const response = await api.get(`/pacientes?idUser=${idUser}`);
        setPacientes(response.data);
      } catch (error) {
        console.error('Erro ao buscar pacientes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPacientes();
  }, []);

  const handleCadastrarPaciente = () => {
    navigate('/cadastroPaciente');
  };

  const handleEditarPaciente = (id) => {
    navigate(`/cadastroPaciente/${id}`);
  };

  return (
    <Paper style={{ padding: '16px' }}>
      <Typography variant="h4" component="h2" gutterBottom>
        Lista de Pacientes
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleCadastrarPaciente}
        style={{ marginBottom: '16px' }}
      >
        Cadastrar Paciente
      </Button>

      {loading ? (
        <CircularProgress />
      ) : (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nome</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Idade</TableCell>
                <TableCell>Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pacientes.length > 0 ? (
                pacientes.map((paciente) => (
                  <TableRow key={paciente.id}>
                    <TableCell>{paciente.nomePaciente}</TableCell>
                    <TableCell>{paciente.emailPaciente}</TableCell>
                    <TableCell>{paciente.idadePaciente}</TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        color="primary"
                        size="small"
                        onClick={() => handleEditarPaciente(paciente.id)}
                        style={{ marginRight: '8px' }}
                      >
                        Editar
                      </Button>
                      <Button
                        variant="outlined"
                        color="error"
                        size="small"
                        onClick={() => {
                          // Implementar lógica para excluir um paciente
                          console.log('Excluir paciente:', paciente.id);
                        }}
                      >
                        Excluir
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    Nenhum paciente encontrado.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Paper>
  );
}
