import React, { useState, useEffect } from 'react';
import {
  Container,
  Button,
  TextField,
  Grid,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import api from '../../api/api';

const CadastroAvaliacao = () => {
  const { id } = useParams();
  const idUser = localStorage.getItem('idUser');
  const [avaliacao, setAvaliacao] = useState({
    pacienteId: '', // Valor padrão
    dataAvaliacao: '',
    observacoes: '',
    userId: idUser,
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
      const fetchAvaliacao = async () => {
        try {
          const response = await api.get(`/avaliacoes?idUser=${id}`);
          if (response.data) {
            setAvaliacao({
              pacienteId: response.data.pacienteId || '', // Valor padrão
              dataAvaliacao: response.data.dataAvaliacao,
              observacoes: response.data.observacoes,
              userId: idUser,
            });
          }
        } catch (error) {
          console.error('Erro ao buscar avaliação:', error);
        }
      };
      fetchAvaliacao();
    }
  }, [id, idUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAvaliacao({ ...avaliacao, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await api.put(`/avaliacoes/${id}`, avaliacao);
        alert('Avaliação atualizada com sucesso!');
      } else {
        await api.post('/avaliacoes', avaliacao);
        alert('Avaliação cadastrada com sucesso!');
        setAvaliacao({
          pacienteId: '',
          dataAvaliacao: '',
          observacoes: '',
          userId: idUser,
        });
      }
    } catch (error) {
      console.error('Erro ao salvar avaliação:', error);
      alert('Erro ao salvar avaliação. Tente novamente.');
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h2" gutterBottom className="mt-5">
        {id ? 'Editar Avaliação' : 'Cadastro de Avaliação'}
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="paciente-label">Selecione o Paciente</InputLabel>
              <Select
                labelId="paciente-label"
                id="paciente"
                name="pacienteId"
                value={avaliacao.pacienteId || ''} // Controlado com valor padrão
                onChange={handleChange}
                required
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
              label="Data da Avaliação"
              type="date"
              variant="outlined"
              fullWidth
              name="dataAvaliacao"
              value={avaliacao.dataAvaliacao}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Observações"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              name="observacoes"
              value={avaliacao.observacoes}
              onChange={handleChange}
              placeholder="Digite as observações sobre a avaliação"
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" type="submit" fullWidth>
              {id ? 'Atualizar Avaliação' : 'Cadastrar Avaliação'}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default CadastroAvaliacao;
