import React, { useState, useEffect } from 'react';
import api from '../../api/api'; // Assumindo que o api.js está na pasta api
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

export function ListandoPacientes() {
  const [pacientes, setPacientes] = useState([]); // Estado para armazenar a lista de pacientes
  const [loading, setLoading] = useState(true); // Estado para controle de loading
  const idUser = localStorage.getItem('idUser');

  useEffect(() => {
    // Faz a requisição para o endpoint /pacientes
    const fetchPacientes = async () => {
      try {
        const response = await api.get(`/pacientes?idUser=${idUser}`);
        setPacientes(response.data); // Atualiza o estado com a lista de pacientes
      } catch (error) {
        console.error('Erro ao buscar pacientes:', error);
      } finally {
        setLoading(false); // Finaliza o loading independentemente do resultado
      }
    };

    fetchPacientes();
  }, []);

  const handleCadastrarPaciente = () => {
    window.location.href = '/cadastroPaciente'; // Redireciona para /cadastrarPaciente
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
                        color="error"
                        size="small"
                        onClick={() => {
                          // Aqui você pode implementar a lógica para excluir um paciente
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
