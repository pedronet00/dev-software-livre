import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Grid, Typography } from '@mui/material';
import api from '../../api/api';

function EncaminhamentoForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    paciente_id: '',
    data: '',
    motivo: '',
    profissional: ''
  });

  useEffect(() => {
    if (id) {
      api.get(`/encaminhamento/${id}`)
        .then((response) => {
          setFormData(response.data);
        });
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      api.put(`/encaminhamento/${id}`, formData)
        .then(() => navigate('/encaminhamentos'));
    } else {
      api.post('/encaminhamento', formData)
        .then(() => navigate('/encaminhamentos'));
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h2" gutterBottom>
        {id ? 'Editar Encaminhamento' : 'Criar Encaminhamento'}
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
              label="Data"
              type="date"
              variant="outlined"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              value={formData.data}
              onChange={(e) => setFormData({ ...formData, data: e.target.value })}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Motivo"
              variant="outlined"
              fullWidth
              value={formData.motivo}
              onChange={(e) => setFormData({ ...formData, motivo: e.target.value })}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Profissional"
              variant="outlined"
              fullWidth
              value={formData.profissional}
              onChange={(e) => setFormData({ ...formData, profissional: e.target.value })}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <Button variant="contained" color="primary" type="submit" fullWidth>
              {id ? 'Atualizar' : 'Criar'} Encaminhamento
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}

export default EncaminhamentoForm;
