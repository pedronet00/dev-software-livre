import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/api';

function ListandoDiagnosticos() {
  const [diagnosticos, setDiagnosticos] = useState([]);

  useEffect(() => {
    const fetchDiagnosticos = async () => {
      const response = await api.get('/diagnosticos');
      setDiagnosticos(response.data);
    };
    fetchDiagnosticos();
  }, []);

  return (
    <div className="container">
      <h1>Diagnósticos</h1>
      <Link to="/diagnosticos" className="btn btn-primary mb-3">Criar Novo Diagnóstico</Link>
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
          {diagnosticos.map(diagnostico => (
            <tr key={diagnostico.id}>
              <td>{diagnostico.id}</td>
              <td>{diagnostico.descricao}</td>
              <td>{new Date(diagnostico.data).toLocaleDateString()}</td>
              <td>
                <Link to={`/diagnosticos/${diagnostico.id}`} className="btn btn-warning btn-sm">Editar</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListandoDiagnosticos;
