import React, { useEffect, useState } from "react";
import api from "../api/api";
import {
  Container,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  TextField,
} from "@mui/material";
import dayjs from "dayjs";
import PacientesPorCategoria from './pacientesPorCategoria';

function Home() {
  const [stats, setStats] = useState({
    totalPacientes: 120,
    consultasHoje: 5,
    profissionaisAtivos: 8,
  });

  const idUser = localStorage.getItem('idUser');
  const [qtdePacientes, setQtdePacientes] = useState(0);
  const [agendamentosHoje, setAgendamentosHoje] = useState([]);
  

  // Campo de anotações
  const [anotacoes, setAnotacoes] = useState(localStorage.getItem('anotacoes') || '');

  useEffect(() => {
    api
      .get(`/qtdePacientes?idUser=${idUser}`)
      .then((response) => setQtdePacientes(response.data))
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      });

    api
      .get(`/agendamentos?idUser=${idUser}`)
      .then((response) => {
        const today = dayjs().format("YYYY-MM-DD");
        const agendamentosHoje = response.data.filter((agendamento) =>
          dayjs(agendamento.data).isSame(today, "day")
        );
        setAgendamentosHoje(agendamentosHoje);
      })
      .catch((err) => {
        console.error("Erro ao buscar agendamentos: " + err);
      });
  }, []);

  // Atualiza e salva as anotações no localStorage automaticamente
  const handleAnotacoesChange = (e) => {
    const newAnotacoes = e.target.value;
    setAnotacoes(newAnotacoes);
    localStorage.setItem('anotacoes', newAnotacoes);
  };

  return (
    <Container maxWidth="lg" className="bg-light">
      <Typography variant="h4" align="center" gutterBottom>
        Bem-vindo ao Painel Administrativo
      </Typography>
      <Typography variant="subtitle1" align="center" gutterBottom>
        Administre consultas, pacientes e profissionais da Clínica Psicológica
      </Typography>

      <Grid container spacing={4} sx={{ marginTop: 4 }}>
        {/* Estatísticas rápidas */}
        <Grid item xs={12} md={12}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <Card sx={{ backgroundColor: "#333333", color: "white" }}>
                <CardContent>
                  <Typography variant="h5">{qtdePacientes}</Typography>
                  <Typography>Total de Pacientes</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Card sx={{ backgroundColor: "#333333", color: "white" }}>
                <CardContent>
                  <Typography variant="h5">{stats.consultasHoje}</Typography>
                  <Typography>Consultas Hoje</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Card sx={{ backgroundColor: "#333333", color: "white" }}>
                <CardContent>
                  <Typography variant="h5">{stats.profissionaisAtivos}</Typography>
                  <Typography>Profissionais Ativos</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Agendamentos de Hoje */}
          <Paper elevation={2} sx={{ marginTop: 4 }}>
            <Typography variant="h6" sx={{ padding: 2, backgroundColor: "#333333", color: "white" }}>
              Agendamentos de Hoje
            </Typography>
            <CardContent>
              {agendamentosHoje.length > 0 ? (
                agendamentosHoje.map((agendamento) => (
                  <div key={agendamento.id} className="mb-3">
                    <Typography><strong>Paciente:</strong> {agendamento.paciente.nomePaciente}</Typography>
                    <Typography><strong>Data:</strong> {agendamento.dataAgendamento}</Typography>
                    <Typography><strong>Hora:</strong> {agendamento.horaAgendamento}</Typography>
                    <hr />
                  </div>
                ))
              ) : (
                <Typography>Nenhum agendamento para hoje</Typography>
              )}
            </CardContent>
          </Paper>
        </Grid>
        
        {/* Campo de Anotações */}
        <Grid item xs={12} md={6} sx={{ marginTop: 2 }}>
            <Typography variant="h6" sx={{ padding: 2, backgroundColor: "#333333", color: "white" }}>
              Anotações pessoais
            </Typography>
            <TextField
              variant="outlined"
              fullWidth
              multiline
              rows={12}
              value={anotacoes}
              onChange={handleAnotacoesChange}
            />
        </Grid>
        <Grid item xs={12} md={6} >
            
            <Grid item xs={12} md={12}>
              <PacientesPorCategoria />
            </Grid>
        </Grid>
      </Grid>

        

      <footer style={{ marginTop: 70, padding: '20px 0', backgroundColor: '#333', color: '#fff' }}>
        <Container>
          <Typography variant="body2" align="center">
            Clínica Psicológica © 2023. Todos os direitos reservados.
          </Typography>
        </Container>
      </footer>
    </Container>
  );
}

export default Home;
