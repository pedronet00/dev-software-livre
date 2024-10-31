import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Grid, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import api from '../../api/api';

function ProblemaIdentificadoForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const idUser = localStorage.getItem('idUser');
  const [formData, setFormData] = useState({
    pacienteId: '',
    dataIdentificacao: '',
    problema: '',
    evolucao: '',
    userId: idUser
  });
  const [pacientes, setPacientes] = useState([]); // Estado para armazenar a lista de pacientes

  useEffect(() => {
    // Função para buscar a lista de pacientes
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
      api.get(`/problema-identificado/${id}`)
        .then((response) => {
          setFormData(response.data);
        });
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      api.put(`/problema-identificado/${id}`, formData)
        .then(() => navigate('/problemas-identificados'));
    } else {
      api.post('/problema-identificado', formData)
        .then(() => navigate('/problemas-identificados'));
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h2" gutterBottom>
        {id ? 'Editar Problema Identificado' : 'Criar Problema Identificado'}
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <FormControl fullWidth required>
              <InputLabel id="paciente-label">Selecione o Paciente</InputLabel>
              <Select
                labelId="paciente-label"
                value={formData.pacienteId}
                onChange={(e) => setFormData({ ...formData, pacienteId: e.target.value })}
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
              label="Data"
              type="date"
              variant="outlined"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              value={formData.dataIdentificacao}
              onChange={(e) => setFormData({ ...formData, dataIdentificacao: e.target.value })}
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
              value={formData.problema}
              onChange={(e) => setFormData({ ...formData, problema: e.target.value })}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Evolução"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              value={formData.evolucao}
              onChange={(e) => setFormData({ ...formData, evolucao: e.target.value })}
            />
          </Grid>

          <Grid item xs={12}>
            <Button variant="contained" color="primary" type="submit" fullWidth>
              {id ? 'Atualizar' : 'Criar'} Problema Identificado
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}

export default ProblemaIdentificadoForm;
