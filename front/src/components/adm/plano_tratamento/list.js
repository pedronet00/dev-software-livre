import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/api';

function ListandoPlanosTratamento() {
  const [planos, setPlanos] = useState([]);

  useEffect(() => {
    const fetchPlanos = async () => {
      const response = await api.get('/planos-tratamento');
      setPlanos(response.data);
    };
    fetchPlanos();
  }, []);

  return (
    <div className="container">
      <h1>Planos de Tratamento</h1>
      <Link to="/planos-tratamento" className="btn btn-primary mb-3">Criar Novo Plano de Tratamento</Link>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Objetivos</th>
            <th>Data de Início</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {planos.map(plano => (
            <tr key={plano.id}>
              <td>{plano.id}</td>
              <td>{plano.objetivos}</td>
              <td>{new Date(plano.data_inicio).toLocaleDateString()}</td>
              <td>
                <Link to={`/planos-tratamento/${plano.id}`} className="btn btn-warning btn-sm">Editar</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListandoPlanosTratamento;
