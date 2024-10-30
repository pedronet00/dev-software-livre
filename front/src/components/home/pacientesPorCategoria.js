import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Legend } from "recharts";
import { Card, CardContent, Typography } from "@mui/material";

const data = [
  { nomeCategoria: "Ansiedade", pacientes: 25 },
  { nomeCategoria: "Depressão", pacientes: 18 },
  { nomeCategoria: "TDAH", pacientes: 12 },
  { nomeCategoria: "Estresse", pacientes: 20 },
  { nomeCategoria: "Fobias", pacientes: 8 },
];

function PacientesPorCategoria() {
  return (
    <Card sx={{ backgroundColor: "#333333", color: "white", marginTop: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Pacientes por Categoria de Tratamento
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="nomeCategoria" stroke="#fff" />
            <YAxis stroke="#fff" />
            <Tooltip cursor={{ fill: 'transparent' }} />
            <Legend />
            <Bar dataKey="pacientes" fill="#82ca9d" barSize={50} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export default PacientesPorCategoria;
