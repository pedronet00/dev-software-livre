import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Grid, Typography } from '@mui/material';
import api from '../../api/api';

function AgendamentoForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    paciente_id: '',
    data_hora: ''
  });

  useEffect(() => {
    if (id) {
      api.get(`/agendamento/${id}`)
        .then((response) => {
          setFormData(response.data);
        });
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      api.put(`/agendamento/${id}`, formData)
        .then(() => navigate('/agendamentos'));
    } else {
      api.post('/agendamento', formData)
        .then(() => navigate('/agendamentos'));
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h2" gutterBottom>
        {id ? 'Editar Agendamento' : 'Criar Agendamento'}
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              label="Paciente ID"
              variant="outlined"
              fullWidth
              value={formData.paciente_id}
              onChange={(e) => setFormData({ ...formData, paciente_id: e.target.value })}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Data e Hora"
              type="datetime-local"
              variant="outlined"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              value={formData.data_hora}
              onChange={(e) => setFormData({ ...formData, data_hora: e.target.value })}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <Button variant="contained" color="primary" type="submit" fullWidth>
              {id ? 'Atualizar' : 'Criar'} Agendamento
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}

export default AgendamentoForm;
