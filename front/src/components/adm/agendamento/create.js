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
  const idUser = localStorage.getItem('idUser');
  const [formData, setFormData] = useState({
    pacienteId: '', // Atualizado para refletir o formato esperado
    dataAgendamento: '',
    horaAgendamento: '',
    userId: idUser, // userId fixo como 1
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
      api.get(`/agendamento/${id}`)
        .then((response) => {
          // Separar data e hora se já estiver no formato correto
          setFormData({ 
            pacienteId: response.data.pacienteId, // Atualizado para refletir o formato esperado
            dataAgendamento: response.data.dataAgendamento, 
            horaAgendamento: response.data.horaAgendamento,
            userId: idUser // Manter userId fixo
          });
        });
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar se os campos estão preenchidos
    if (!formData.dataAgendamento || !formData.horaAgendamento || !formData.pacienteId) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    const { pacienteId, dataAgendamento, horaAgendamento, userId } = formData;

    const dataToSend = { pacienteId, dataAgendamento, horaAgendamento, userId }; // Enviando dados no formato correto

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
                value={formData.pacienteId} // Atualizado para refletir o formato esperado
                onChange={(e) => setFormData({ ...formData, pacienteId: e.target.value })}
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
              value={formData.dataAgendamento}
              onChange={(e) => setFormData({ ...formData, dataAgendamento: e.target.value })}
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
              value={formData.horaAgendamento}
              onChange={(e) => setFormData({ ...formData, horaAgendamento: e.target.value })}
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
