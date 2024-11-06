import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Grid, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import api from '../../api/api';

function DiagnosticoForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    pacienteId: '',
    dataDiagnostico: '',
    descricaoDiagnostico: '',
    diagnostico: '',
    userId: 1
  });
  const [pacientes, setPacientes] = useState([]); // Estado para armazenar a lista de pacientes
  const idUser = localStorage.getItem('idUser');

  useEffect(() => {
    // Buscar a lista de pacientes
    const fetchPacientes = async () => {
      try {
        const response = await api.get(`/pacientes?idUser=${idUser}`);
        setPacientes(response.data);
      } catch (error) {
        console.error('Erro ao buscar pacientes:', error);
      }
    };

    fetchPacientes();

    if (id) {
      api.get(`/diagnosticos/${id}`)
        .then((response) => {
          setFormData(response.data);
        });
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      api.put(`/diagnostico/${id}`, formData)
        .then(() => navigate('/diagnosticos'));
    } else {
      api.post('/diagnostico', formData)
        .then(() => navigate('/diagnosticos'));
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h2" gutterBottom>
        {id ? 'Editar Diagnóstico' : 'Criar Diagnóstico'}
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <FormControl fullWidth required variant="outlined">
              <InputLabel id="paciente-label">Selecione o Paciente</InputLabel>
              <Select
                labelId="paciente-label"
                value={formData.pacienteId}
                onChange={(e) => setFormData({ ...formData, pacienteId: e.target.value })}
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

          <Grid item xs={12}>
            <TextField
              label="Data"
              type="date"
              variant="outlined"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              value={formData.dataDiagnostico}
              onChange={(e) => setFormData({ ...formData, dataDiagnostico: e.target.value })}
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
              value={formData.descricaoDiagnostico}
              onChange={(e) => setFormData({ ...formData, descricaoDiagnostico: e.target.value })}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Diagnóstico"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              value={formData.diagnostico}
              onChange={(e) => setFormData({ ...formData, diagnostico: e.target.value })}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <Button variant="contained" color="primary" type="submit" fullWidth>
              {id ? 'Atualizar' : 'Criar'} Diagnóstico
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}

export default DiagnosticoForm;
