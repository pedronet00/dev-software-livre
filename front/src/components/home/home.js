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
  Button,
} from "@mui/material";
import dayjs from "dayjs";

function Home() {
  const [stats, setStats] = useState({
    totalPacientes: 120,
    consultasHoje: 5,
    profissionaisAtivos: 8,
  });

  const [qtdePacientes, setQtdePacientes] = useState(0);
  const [agendamentosHoje, setAgendamentosHoje] = useState([]);
  const [consultas, setConsultas] = useState([
    { id: 1, paciente: "João Silva", horario: "10:00 AM", profissional: "Dra. Maria" },
    { id: 2, paciente: "Ana Souza", horario: "11:30 AM", profissional: "Dr. Carlos" },
  ]);
  const [categorias, setCategorias] = useState([
    { id: 1, nomeCategoria: "Ansiedade" },
    { id: 2, nomeCategoria: "Depressão" },
  ]);

  useEffect(() => {
    api
      .get("/qtdePacientes")
      .then((response) => setQtdePacientes(response.data))
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      });

    // Consulta para buscar agendamentos do dia atual
    api
      .get("http://127.0.0.1:8000/api/agendamentos")
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
        <Grid item xs={12} md={8}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <Card sx={{ backgroundColor: "info.main", color: "white" }}>
                <CardContent>
                  <Typography variant="h5">{qtdePacientes}</Typography>
                  <Typography>Total de Pacientes</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Card sx={{ backgroundColor: "warning.main", color: "white" }}>
                <CardContent>
                  <Typography variant="h5">{stats.consultasHoje}</Typography>
                  <Typography>Consultas Hoje</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Card sx={{ backgroundColor: "success.main", color: "white" }}>
                <CardContent>
                  <Typography variant="h5">{stats.profissionaisAtivos}</Typography>
                  <Typography>Profissionais Ativos</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Agendamentos de Hoje */}
          <Paper elevation={2} sx={{ marginTop: 4 }}>
            <Typography variant="h6" sx={{ padding: 2, backgroundColor: "primary.main", color: "white" }}>
              Agendamentos de Hoje
            </Typography>
            <CardContent>
              {agendamentosHoje.length > 0 ? (
                agendamentosHoje.map((agendamento) => (
                  <div key={agendamento.id} className="mb-3">
                    <Typography><strong>Paciente:</strong> {agendamento.paciente.nomePaciente}</Typography>
                    <Typography><strong>Data:</strong> {agendamento.data}</Typography>
                    <Typography><strong>Hora:</strong> {agendamento.hora}</Typography>
                    <hr />
                  </div>
                ))
              ) : (
                <Typography>Nenhum agendamento para hoje</Typography>
              )}
            </CardContent>
          </Paper>
        </Grid>

        {/* Sidebar */}
        <Grid item xs={12} md={4}>
          {/* Busca */}
          <Paper elevation={2} sx={{ marginBottom: 2 }}>
            <Typography variant="h6" sx={{ padding: 2 }}>
              Buscar Paciente
            </Typography>
            <CardContent>
              <TextField
                fullWidth
                label="Digite o nome do paciente..."
                variant="outlined"
                sx={{ marginBottom: 2 }}
              />
              <Button variant="contained" color="primary">Buscar</Button>
            </CardContent>
          </Paper>

          {/* Categorias */}
          <Paper elevation={2} sx={{ marginBottom: 2 }}>
            <Typography variant="h6" sx={{ padding: 2 }}>
              Categorias de Tratamento
            </Typography>
            <CardContent>
              {categorias.map((categoria) => (
                <Typography key={categoria.id} variant="body2">
                  <a href="#!">{categoria.nomeCategoria}</a>
                </Typography>
              ))}
            </CardContent>
          </Paper>

          {/* Widget de Informações */}
          <Paper elevation={2}>
            <Typography variant="h6" sx={{ padding: 2 }}>
              Informações da Clínica
            </Typography>
            <CardContent>
              <Typography>
                Bem-vindo ao sistema administrativo da nossa clínica psicológica. Aqui você pode acompanhar suas consultas e gerenciar pacientes.
              </Typography>
            </CardContent>
          </Paper>
        </Grid>
      </Grid>

      <footer style={{ marginTop: 'auto', padding: '20px 0', backgroundColor: '#333', color: '#fff' }}>
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
