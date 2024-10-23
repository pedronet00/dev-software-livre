import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Grid, Typography } from '@mui/material';
import api from '../../api/api';

function PrescricaoForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    paciente_id: '',
    data: '',
    descricao: ''
  });

  useEffect(() => {
    if (id) {
      api.get(`/prescricao/${id}`)
        .then((response) => {
          setFormData(response.data);
        });
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      api.put(`/prescricao/${id}`, formData)
        .then(() => navigate('/prescricoes'));
    } else {
      api.post('/prescricao', formData)
        .then(() => navigate('/prescricoes'));
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h2" gutterBottom>
        {id ? 'Editar Prescrição' : 'Criar Prescrição'}
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
              label="Descrição"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              value={formData.descricao}
              onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <Button variant="contained" color="primary" type="submit" fullWidth>
              {id ? 'Atualizar' : 'Criar'} Prescrição
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}

export default PrescricaoForm;
