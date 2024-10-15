import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/api';

function ListandoAgendamentos() {
  const [agendamentos, setAgendamentos] = useState([]);

  useEffect(() => {
    const fetchAgendamentos = async () => {
      const response = await api.get('/agendamentos');
      setAgendamentos(response.data);
    };
    fetchAgendamentos();
  }, []);

  return (
    <div className="container">
      <h1>Agendamentos de Sessões</h1>
      <Link to="/agendamentos" className="btn btn-primary mb-3">Criar Novo Agendamento</Link>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Data</th>
            <th>Hora</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {agendamentos.map(agendamento => (
            <tr key={agendamento.id}>
              <td>{agendamento.id}</td>
              <td>{new Date(agendamento.data).toLocaleDateString()}</td>
              <td>{agendamento.hora}</td>
              <td>
                <Link to={`/agendamentos/${agendamento.id}`} className="btn btn-warning btn-sm">Editar</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListandoAgendamentos;
