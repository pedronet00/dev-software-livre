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
  FormControl,
  InputLabel,
} from '@mui/material';
import api from '../../api/api';

function AgendamentoForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    paciente_id: '', // Atualizado para refletir o formato esperado
    data: '',
    hora: '',
    userId: 1, // userId fixo como 1
  });
  const [pacientes, setPacientes] = useState([]);

  useEffect(() => {
    const fetchPacientes = async () => {
      const response = await api.get('/pacientes');
      setPacientes(response.data);
    };
    fetchPacientes();
  }, []);

  useEffect(() => {
    if (id) {
      api.get(`/agendamento/${id}`)
        .then((response) => {
          // Separar data e hora se já estiver no formato correto
          const [data, hora] = response.data.data_hora.split('T');
          setFormData({ 
            paciente_id: response.data.paciente_id, // Atualizado para refletir o formato esperado
            data, 
            hora,
            userId: 1 // Manter userId fixo
          });
        });
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar se os campos estão preenchidos
    if (!formData.data || !formData.hora || !formData.paciente_id) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    const { paciente_id, data, hora, userId } = formData;

    const dataToSend = { paciente_id, data, hora, userId }; // Enviando dados no formato correto

    if (id) {
      api.put(`/agendamento/${id}`, dataToSend)
        .then(() => navigate('/agendamentos'))
        .catch((error) => console.error(error));
    } else {
      api.post('/agendamento', dataToSend)
        .then(() => navigate('/agendamentos'))
        .catch((error) => console.error(error));
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
            <FormControl fullWidth variant="outlined" required>
              <InputLabel>Paciente</InputLabel>
              <Select
                label="Paciente"
                value={formData.paciente_id} // Atualizado para refletir o formato esperado
                onChange={(e) => setFormData({ ...formData, paciente_id: e.target.value })}
                required
              >
                {pacientes.map((paciente) => (
                  <MenuItem key={paciente.id} value={paciente.id}>
                    {paciente.nomePaciente} {/* Assumindo que cada paciente tem um campo nome */}
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
              value={formData.data}
              onChange={(e) => setFormData({ ...formData, data: e.target.value })}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Hora"
              type="time"
              variant="outlined"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              value={formData.hora}
              onChange={(e) => setFormData({ ...formData, hora: e.target.value })}
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
