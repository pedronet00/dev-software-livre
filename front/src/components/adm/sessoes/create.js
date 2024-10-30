import React, { useState, useEffect } from 'react';
import { Container, Button, TextField, Grid, Typography, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import api from '../../api/api'; // Assumindo que o api.js está na pasta api

const CadastroSessoes = () => {
  const [sessao, setSessao] = useState({
    paciente: '',
    dataSessao: '',
    notas: '',
    tecnicasUtilizadas: '',
    userId: 1 // ID do usuário logado, pode ser dinâmico dependendo da aplicação
  });

  const [pacientes, setPacientes] = useState([]); // Estado para armazenar a lista de pacientes

  useEffect(() => {
    // Faz a requisição para o endpoint /pacientes
    const fetchPacientes = async () => {
      try {
        const response = await api.get('/pacientes');
        setPacientes(response.data); // Atualiza o estado com a lista de pacientes
      } catch (error) {
        console.error('Erro ao buscar pacientes:', error);
      }
    };

    fetchPacientes();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSessao({ ...sessao, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Faz a requisição POST para o endpoint /sessoes
      const response = await api.post('/sessoes', {
        pacienteId: sessao.paciente,
        dataSessao: sessao.dataSessao,
        notasSessao: sessao.notas,
        tecnicasUtilizadasSessao: sessao.tecnicasUtilizadas,
        userId: sessao.userId,
      });
      console.log('Sessão cadastrada com sucesso:', response.data);
      alert('Sessão cadastrada com sucesso!');
      // Limpar os campos após a inserção bem-sucedida
      setSessao({
        paciente: '',
        dataSessao: '',
        notas: '',
        tecnicasUtilizadas: '',
        userId: 1
      });
    } catch (error) {
      console.error('Erro ao cadastrar sessão:', error);
      alert('Erro ao cadastrar a sessão. Tente novamente.');
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h2" gutterBottom className="mt-5">
        Cadastro de Sessão
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          {/* Select de Pacientes */}
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="paciente-label">Selecione o Paciente</InputLabel>
              <Select
                labelId="paciente-label"
                id="paciente"
                name="paciente"
                value={sessao.paciente}
                onChange={handleChange}
                required
                label="Selecione o Paciente"
              >
                <MenuItem value="">
                  <em>Selecione um paciente</em>
                </MenuItem>
                {pacientes.map((paciente) => (
                  <MenuItem key={paciente.id} value={paciente.id}>
                    {paciente.nomePaciente}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Data da Sessão */}
          <Grid item xs={12}>
            <TextField
              label="Data da Sessão"
              type="date"
              variant="outlined"
              fullWidth
              name="dataSessao"
              value={sessao.dataSessao}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
              required
            />
          </Grid>

          {/* Notas */}
          <Grid item xs={12}>
            <TextField
              label="Notas"
              variant="outlined"
              fullWidth
              multiline
              rows={3}
              name="notas"
              value={sessao.notas}
              onChange={handleChange}
              placeholder="Digite as notas sobre a sessão"
            />
          </Grid>

          {/* Técnicas Utilizadas */}
          <Grid item xs={12}>
            <TextField
              label="Técnicas Utilizadas"
              variant="outlined"
              fullWidth
              multiline
              rows={3}
              name="tecnicasUtilizadas"
              value={sessao.tecnicasUtilizadas}
              onChange={handleChange}
              placeholder="Digite as técnicas utilizadas na sessão"
            />
          </Grid>

          <Grid item xs={12}>
            <Button variant="contained" color="primary" type="submit" fullWidth>
              Cadastrar Sessão
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default CadastroSessoes;
