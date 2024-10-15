import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/api';

function ListandoPrescricoes() {
  const [prescricoes, setPrescricoes] = useState([]);

  useEffect(() => {
    const fetchPrescricoes = async () => {
      const response = await api.get('/prescricoes');
      setPrescricoes(response.data);
    };
    fetchPrescricoes();
  }, []);

  return (
    <div className="container">
      <h1>Prescrições</h1>
      <Link to="/prescricoes" className="btn btn-primary mb-3">Criar Nova Prescrição</Link>
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
          {prescricoes.map(prescricao => (
            <tr key={prescricao.id}>
              <td>{prescricao.id}</td>
              <td>{prescricao.descricao}</td>
              <td>{new Date(prescricao.data).toLocaleDateString()}</td>
              <td>
                <Link to={`/prescricoes/${prescricao.id}`} className="btn btn-warning btn-sm">Editar</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListandoPrescricoes;
