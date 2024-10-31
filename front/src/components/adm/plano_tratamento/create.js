import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Grid, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import api from '../../api/api';

function PlanoTratamentoForm() {
  const { id } = useParams(); // Para o modo de edição
  const navigate = useNavigate();
  const idUser = localStorage.getItem('idUser');
  const [formData, setFormData] = useState({
    pacienteId: '', // Atualizado para refletir o modelo
    dataInicio: '',
    objetivos: '',
    progresso: '',
    userId: idUser // Incluindo userId aqui
  });
  const [pacientes, setPacientes] = useState([]);

  useEffect(() => {
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
      api.get(`/plano-tratamento/${id}`)
        .then((response) => {
          // Ajusta o formData com os dados do plano de tratamento
          setFormData({
            pacienteId: response.data.pacienteId,
            dataInicio: response.data.dataInicio,
            objetivos: response.data.objetivos,
            progresso: response.data.progresso,
            userId: idUser // Certifica-se de que userId esteja presente
          });
        });
    }
  }, [id, idUser]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Verifica se pacienteId está preenchido
    if (!formData.pacienteId) {
      alert('Por favor, selecione um paciente.');
      return; // Impede o envio se pacienteId não estiver definido
    }

    // Envia todos os dados, incluindo userId
    const { userId, ...dataToSubmit } = formData; // Exclui userId apenas para controle

    if (id) {
      // Atualizar plano de tratamento existente
      api.put(`/plano-tratamento/${id}`, { ...dataToSubmit, userId }) // Adiciona userId de volta
        .then(() => navigate('/planos-tratamento'))
        .catch((error) => {
          console.error('Erro ao atualizar plano de tratamento:', error);
          alert('Erro ao atualizar plano de tratamento. Verifique os dados e tente novamente.');
        });
    } else {
      // Criar um novo plano de tratamento
      api.post('/plano-tratamento', { ...dataToSubmit, userId }) // Adiciona userId de volta
        .then(() => navigate('/planos-tratamento'))
        .catch((error) => {
          console.error('Erro ao criar plano de tratamento:', error);
          alert('Erro ao criar plano de tratamento. Verifique os dados e tente novamente.');
        });
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
              label="Data de Início"
              type="date"
              variant="outlined"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={formData.dataInicio}
              onChange={(e) => setFormData({ ...formData, dataInicio: e.target.value })}
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
              value={formData.objetivos}
              onChange={(e) => setFormData({ ...formData, objetivos: e.target.value })}
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
