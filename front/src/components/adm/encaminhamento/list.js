import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/api';

function ListandoEncaminhamentos() {
  const [encaminhamentos, setEncaminhamentos] = useState([]);

  useEffect(() => {
    const fetchEncaminhamentos = async () => {
      const response = await api.get('/encaminhamentos');
      setEncaminhamentos(response.data);
    };
    fetchEncaminhamentos();
  }, []);

  return (
    <div className="container">
      <h1>Encaminhamentos</h1>
      <Link to="/encaminhamentos" className="btn btn-primary mb-3">Criar Novo Encaminhamento</Link>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Motivo</th>
            <th>Data</th>
            <th>Profissional</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {encaminhamentos.map(encaminhamento => (
            <tr key={encaminhamento.id}>
              <td>{encaminhamento.id}</td>
              <td>{encaminhamento.motivo}</td>
              <td>{new Date(encaminhamento.data).toLocaleDateString()}</td>
              <td>{encaminhamento.profissional}</td>
              <td>
                <Link to={`/encaminhamentos/${encaminhamento.id}`} className="btn btn-warning btn-sm">Editar</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListandoEncaminhamentos;
