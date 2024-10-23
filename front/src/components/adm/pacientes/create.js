import React, { useState } from 'react';
import { Container, Button, TextField, Grid, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import api from '../../api/api';

const CadastroPaciente = () => {
  const [paciente, setPaciente] = useState({
    nomePaciente: '',
    idadePaciente: 0,
    sexoPaciente: 1,
    dataNascimentoPaciente: '',
    telefonePaciente: '',
    emailPaciente: '',
    enderecoPaciente: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaciente({ ...paciente, [name]: value });
  };

  const calcularIdade = (dataNascimento) => {
    const hoje = new Date();
    const nascimento = new Date(dataNascimento);
    const idade = hoje.getFullYear() - nascimento.getFullYear();
    const mes = hoje.getMonth() - nascimento.getMonth();
    if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
      return idade - 1;
    }
    return idade;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Calcula a idade do paciente
    const idade = calcularIdade(paciente.dataNascimentoPaciente);
    const dadosPaciente = {
      ...paciente,
      idadePaciente: idade,
      userId: 1 // Adiciona a idade calculada
    };

    try {
      const response = await api.post('/paciente', dadosPaciente);
      console.log(response.data);
      alert('Cadastro realizado com sucesso!');
      // Limpa os campos do formulário após o cadastro
      setPaciente({
        nomePaciente: '',
        idadePaciente: 0,
        sexoPaciente: 1,
        dataNascimentoPaciente: '',
        telefonePaciente: '',
        emailPaciente: '',
        enderecoPaciente: ''
      });
    } catch (error) {
      console.error('Erro ao cadastrar paciente:', error);
      alert('Erro ao realizar cadastro. Tente novamente.');
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
            <Button variant="contained" color="primary" type="submit" fullWidth>
              Cadastrar Paciente
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default CadastroPaciente;
