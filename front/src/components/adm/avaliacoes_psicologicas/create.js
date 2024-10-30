import React, { useState, useEffect } from 'react';
import {
  Container,
  Button,
  TextField,
  Grid,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from '@mui/material';
import api from '../../api/api'; // Assumindo que o api.js está na pasta api

const CadastroAvaliacao = () => {
  const idUser = localStorage.getItem('idUser');
  const [avaliacao, setAvaliacao] = useState({
    pacienteId: '',
    dataAvaliacao: '',
    observacoes: '',
    userId: idUser, // Assumindo que você está usando um ID de usuário fixo. Isso pode ser dinâmico conforme sua aplicação.
  });

  const [pacientes, setPacientes] = useState([]); // Estado para armazenar a lista de pacientes

  useEffect(() => {
    // Faz a requisição para o endpoint /pacientes
    const fetchPacientes = async () => {
      try {
        const response = await api.get(`/pacientes?idUser=${idUser}`);
        setPacientes(response.data); // Atualiza o estado com a lista de pacientes
      } catch (error) {
        console.error('Erro ao buscar pacientes:', error);
      }
    };

    fetchPacientes();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAvaliacao({ ...avaliacao, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Envia os dados da avaliação para a API
      const response = await api.post('/avaliacoes', avaliacao);
      console.log(response.data);
      alert('Avaliação cadastrada com sucesso!');
      
      // Limpa os campos após o envio
      setAvaliacao({
        pacienteId: '',
        dataAvaliacao: '',
        observacoes: '',
        userId: idUser,
      });
    } catch (error) {
      console.error('Erro ao cadastrar avaliação:', error);
      alert('Erro ao cadastrar avaliação. Tente novamente.');
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h2" gutterBottom className="mt-5">
        Cadastro de Avaliação
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
                name="pacienteId"
                value={avaliacao.pacienteId}
                onChange={handleChange}
                required
                label="Selecione o Paciente"
              >
                <MenuItem value="">
                  <em>Selecione um paciente</em>
                </MenuItem>
                {/* Populando o select com os pacientes vindos da API */}
                {pacientes.map((paciente) => (
                  <MenuItem key={paciente.id} value={paciente.id}>
                    {paciente.nomePaciente}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Data da Avaliação */}
          <Grid item xs={12}>
            <TextField
              label="Data da Avaliação"
              type="date"
              variant="outlined"
              fullWidth
              name="dataAvaliacao"
              value={avaliacao.dataAvaliacao}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
              required
            />
          </Grid>

          {/* Observações */}
          <Grid item xs={12}>
            <TextField
              label="Observações"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              name="observacoes"
              value={avaliacao.observacoes}
              onChange={handleChange}
              placeholder="Digite as observações sobre a avaliação"
            />
          </Grid>

          <Grid item xs={12}>
            <Button variant="contained" color="primary" type="submit" fullWidth>
              Cadastrar Avaliação
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default CadastroAvaliacao;
