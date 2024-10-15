import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/api';

function ListandoProblemasIdentificados() {
  const [problemas, setProblemas] = useState([]);

  useEffect(() => {
    const fetchProblemas = async () => {
      const response = await api.get('/problemas-identificados');
      setProblemas(response.data);
    };
    fetchProblemas();
  }, []);

  return (
    <div className="container">
      <h1>Problemas Identificados</h1>
      <Link to="/problemas-identificados" className="btn btn-primary mb-3">Criar Novo Problema</Link>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Descrição</th>
            <th>Data</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {problemas.map(problema => (
            <tr key={problema.id}>
              <td>{problema.id}</td>
              <td>{problema.descricao}</td>
              <td>{new Date(problema.data).toLocaleDateString()}</td>
              <td>
                <Link to={`/problemas-identificados/${problema.id}`} className="btn btn-warning btn-sm">Editar</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListandoProblemasIdentificados;
