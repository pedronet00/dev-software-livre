import React, { useEffect, useState } from 'react';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import api from '../../api/api'; // Assumindo que o api.js está na pasta api

const ListandoSessoes = () => {
  const [sessoes, setSessoes] = useState([]);
  const idUser = localStorage.getItem('idUser');
  useEffect(() => {
    const fetchSessoes = async () => {
      try {
        const response = await api.get(`/sessoes?idUser=${idUser}`); // Endpoint para buscar sessões
        setSessoes(response.data); // Atualiza o estado com a lista de sessões
      } catch (error) {
        console.error('Erro ao buscar sessões:', error);
      }
    };

    fetchSessoes();
  }, []);

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component="h2" gutterBottom className="mt-5">
        Listagem de Sessões
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Paciente</TableCell>
              <TableCell>Data da Sessão</TableCell>
              <TableCell>Notas</TableCell>
              <TableCell>Técnicas Utilizadas</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sessoes.map((sessao) => (
              <TableRow key={sessao.id}>
                <TableCell>{sessao.id}</TableCell>
                <TableCell>{sessao.pacienteNome}</TableCell> {/* Supondo que pacienteNome esteja disponível na resposta */}
                <TableCell>{new Date(sessao.dataSessao).toLocaleDateString()}</TableCell> {/* Formatação da data */}
                <TableCell>{sessao.notas}</TableCell>
                <TableCell>{sessao.tecnicasUtilizadas}</TableCell>
                <TableCell>
                  <Button variant="outlined" color="primary" onClick={() => alert(`Editando a sessão ${sessao.id}`)}>
                    Editar
                  </Button>
                  <Button variant="outlined" color="secondary" onClick={() => alert(`Excluindo a sessão ${sessao.id}`)} style={{ marginLeft: '8px' }}>
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
};

export default ListandoSessoes;
