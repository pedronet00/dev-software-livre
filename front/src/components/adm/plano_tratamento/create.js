import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Grid, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import api from '../../api/api';

function PlanoTratamentoForm() {
  const { id } = useParams(); // Para o modo de edição
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    paciente_id: '',
    data_inicio: '',
    objetivos_terapeuticos: '',
    progresso: '',
    userId: 1 // Você pode substituir 1 pelo ID real do usuário logado, se disponível
  });
  const [pacientes, setPacientes] = useState([]); // Estado para armazenar a lista de pacientes

  useEffect(() => {
    // Buscar a lista de pacientes
    const fetchPacientes = async () => {
      try {
        const response = await api.get('/pacientes');
        setPacientes(response.data);
      } catch (error) {
        console.error('Erro ao buscar pacientes:', error);
      }
    };

    fetchPacientes();

    if (id) {
      // Se o id estiver presente, estamos no modo de edição
      api.get(`/plano-tratamento/${id}`)
        .then((response) => {
          // Aqui, você deve garantir que o userId esteja incluído no formData ao editar
          setFormData({ ...response.data, userId: response.data.userId || 1 });
        });
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      // Atualizar plano de tratamento existente
      api.put(`/plano-tratamento/${id}`, formData)
        .then(() => navigate('/planos-tratamento'));
    } else {
      // Criar um novo plano de tratamento
      api.post('/plano-tratamento', formData)
        .then(() => navigate('/planos-tratamento'));
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h2" gutterBottom>
        {id ? 'Editar Plano de Tratamento' : 'Criar Plano de Tratamento'}
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <FormControl fullWidth required>
              <InputLabel id="paciente-label">Selecione o Paciente</InputLabel>
              <Select
                labelId="paciente-label"
                value={formData.paciente_id}
                onChange={(e) => setFormData({ ...formData, paciente_id: e.target.value })}
                variant="outlined"
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

          <Grid item xs={12}>
            <TextField
              label="Data de Início"
              type="date"
              variant="outlined"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              value={formData.data_inicio}
              onChange={(e) => setFormData({ ...formData, data_inicio: e.target.value })}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Objetivos Terapêuticos"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              value={formData.objetivos_terapeuticos}
              onChange={(e) => setFormData({ ...formData, objetivos_terapeuticos: e.target.value })}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Progresso"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              value={formData.progresso}
              onChange={(e) => setFormData({ ...formData, progresso: e.target.value })}
            />
          </Grid>

          <Grid item xs={12}>
            <Button variant="contained" color="primary" type="submit" fullWidth>
              {id ? 'Atualizar' : 'Criar'} Plano de Tratamento
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}

export default PlanoTratamentoForm;
