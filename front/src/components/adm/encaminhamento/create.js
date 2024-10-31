import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  TextField,
  Button,
  Container,
  Grid,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl
} from '@mui/material';
import api from '../../api/api';

function EncaminhamentoForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const idUser = localStorage.getItem('idUser');
  const [formData, setFormData] = useState({
    pacienteId: '',
    dataEncaminhamento: '',
    descricaoEncaminhamento: '',
    profissionalEncaminhado: '',
    userId: idUser // Adiciona o userId fixo como 1
  });
  const [pacientes, setPacientes] = useState([]);

  useEffect(() => {
    const fetchPacientes = async () => {
      const response = await api.get(`/pacientes?idUser=${idUser}`);
      setPacientes(response.data);
    };
    fetchPacientes();
  }, []);

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
            <FormControl variant="outlined" fullWidth required>
              <InputLabel>Paciente</InputLabel>
              <Select
                value={formData.pacienteId}
                onChange={(e) => setFormData({ ...formData, pacienteId: e.target.value })}
                label="Paciente"
              >
                {pacientes.map((paciente) => (
                  <MenuItem key={paciente.id} value={paciente.id}>
                    {paciente.nomePaciente} {/* Ajuste a propriedade conforme sua API */}
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
              value={formData.dataEncaminhamento}
              onChange={(e) => setFormData({ ...formData, dataEncaminhamento: e.target.value })}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Motivo"
              variant="outlined"
              fullWidth
              value={formData.descricaoEncaminhamento}
              onChange={(e) => setFormData({ ...formData, descricaoEncaminhamento: e.target.value })}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Profissional"
              variant="outlined"
              fullWidth
              value={formData.profissionalEncaminhado}
              onChange={(e) => setFormData({ ...formData, profissionalEncaminhado: e.target.value })}
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
