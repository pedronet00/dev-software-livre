import React, { useState, useEffect } from 'react';
import { Container, Button, TextField, Grid, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import api from '../../api/api';
import { useNavigate, useParams } from 'react-router-dom';

export function CadastroPaciente() {
  const { id } = useParams(); // Obtém o ID do paciente da URL
  const idUser = localStorage.getItem('idUser');
  const [paciente, setPaciente] = useState({
    nomePaciente: '',
    idadePaciente: '',
    sexoPaciente: '',
    dataNascimentoPaciente: '',
    telefonePaciente: '',
    emailPaciente: '',
    enderecoPaciente: '',
    userId: idUser 
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      // Carrega dados do paciente para edição
      const fetchPaciente = async () => {
        try {
          const response = await api.get(`/paciente/${id}`);
          setPaciente(response.data.paciente);
        } catch (error) {
          console.error('Erro ao carregar paciente:', error);
        }
      };
      fetchPaciente();
    }
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPaciente((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const calcularIdade = (dataNascimento) => {
    const nascimento = new Date(dataNascimento);
    const hoje = new Date();
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const mes = hoje.getMonth() - nascimento.getMonth();

    // Verifica se o mês e o dia ainda não passaram no ano atual
    if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
      idade--;
    }

    return idade;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Calcula a idade com base na data de nascimento preenchida
    const idadeCalculada = calcularIdade(paciente.dataNascimentoPaciente);

    try {
      const pacienteComIdade = { ...paciente, idadePaciente: idadeCalculada };

      if (id) {
        // Atualiza paciente
        await api.put(`/paciente/${id}`, pacienteComIdade);
        alert('Paciente atualizado com sucesso!');
      } else {
        // Cria novo paciente
        await api.post('/paciente', pacienteComIdade);
        alert('Paciente criado com sucesso!');
      }
      navigate('/pacientes');
    } catch (error) {
      console.error('Erro ao salvar paciente:', error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h2" gutterBottom className="mt-5">
        Cadastro de Paciente
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              label="Nome Completo"
              variant="outlined"
              fullWidth
              name="nomePaciente"
              value={paciente.nomePaciente}
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Data de Nascimento"
              type="date"
              variant="outlined"
              fullWidth
              name="dataNascimentoPaciente"
              value={paciente.dataNascimentoPaciente}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Endereço Completo"
              variant="outlined"
              fullWidth
              name="enderecoPaciente"
              value={paciente.enderecoPaciente}
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Número de Telefone"
              variant="outlined"
              fullWidth
              name="telefonePaciente"
              value={paciente.telefonePaciente}
              onChange={handleChange}
              placeholder="(99) 99999-9999"
              required
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Endereço de Email"
              type="email"
              variant="outlined"
              fullWidth
              name="emailPaciente"
              value={paciente.emailPaciente}
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <FormControl variant="outlined" fullWidth required>
              <InputLabel id="sexo-label">Sexo</InputLabel>
              <Select
                labelId="sexo-label"
                name="sexoPaciente"
                value={paciente.sexoPaciente}
                onChange={handleChange}
                label="Sexo"
              >
                <MenuItem value={1}>Masculino</MenuItem>
                <MenuItem value={2}>Feminino</MenuItem>
                <MenuItem value={3}>Outro</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            {/* Adicione outros campos conforme necessário */}
            <Button type="submit" variant="contained" color="primary">
              {id ? 'Atualizar' : 'Cadastrar'}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default CadastroPaciente;
