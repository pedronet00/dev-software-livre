import React, { useState, useEffect } from 'react';
import {
  Container,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import api from '../../api/api';

export function ListandoAvaliacoes() {
  const [avaliacoes, setAvaliacoes] = useState([]);
  const idUser = localStorage.getItem('idUser');
  const navigate = useNavigate(); // Hook para redirecionamento

  useEffect(() => {
    const fetchAvaliacoes = async () => {
      try {
        const response = await api.get(`/avaliacoes?idUser=${idUser}`);
        setAvaliacoes(response.data);
      } catch (error) {
        console.error('Erro ao buscar avaliações:', error);
      }
    };

    fetchAvaliacoes();
  }, [idUser]);

  const handleCadastrarAvaliacao = () => {
    navigate('/cadastroAvaliacao');
  };

  const handleEditarAvaliacao = (id) => {
    navigate(`/cadastroAvaliacao/${id}`); // Redireciona para a página de edição com o ID
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component="h2" gutterBottom align="center">
        Listagem de Avaliações
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleCadastrarAvaliacao}
        style={{ marginBottom: '20px' }}
      >
        Cadastrar Avaliação
      </Button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Paciente</TableCell>
              <TableCell>Data da Avaliação</TableCell>
              <TableCell>Observações</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {avaliacoes.length > 0 ? (
              avaliacoes.map((avaliacao) => (
                <TableRow key={avaliacao.id}>
                  <TableCell>{avaliacao.id}</TableCell>
                  <TableCell>{avaliacao.paciente.nomePaciente || 'Paciente não encontrado'}</TableCell>
                  <TableCell>{avaliacao.dataAvaliacao}</TableCell>
                  <TableCell>{avaliacao.observacoes}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => handleEditarAvaliacao(avaliacao.id)}
                      style={{ marginRight: '8px' }}
                    >
                      EDITAR
                    </Button>
                    <Button variant="outlined" color="error">
                      EXCLUIR
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  Carregando...
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
