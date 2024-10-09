import React, { useState, useEffect } from 'react';
import api from '../../api/api'; // Assumindo que o api.js está na pasta api

export function ListandoPacientes() {
  const [pacientes, setPacientes] = useState([]); // Estado para armazenar a lista de pacientes

  useEffect(() => {
    // Faz a requisição para o endpoint /pacientes
    const fetchPacientes = async () => {
      try {
        const response = await api.get('/pacientes');
        setPacientes(response.data); // Atualiza o estado com a lista de pacientes
      } catch (error) {
        console.error('Erro ao buscar pacientes:', error);
      }
    };

    fetchPacientes();
  }, []);

  const handleCadastrarPaciente = () => {
    window.location.href = '/cadastroPaciente'; // Redireciona para /cadastrarPaciente
  };

  return (
    <>

        <button className='btn btn-primary' onClick={handleCadastrarPaciente}>Cadastrar paciente</button>
        <table className="table align-middle" style={{width: '80%', margin: 'auto'}}>
            <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">Nome</th>
                <th scope="col">Email</th>
                <th scope="col">Idade</th>
                <th scope="col">Ações</th>
                </tr>
            </thead>
            <tbody>
                {pacientes.length > 0 ? (
                pacientes.map((paciente) => (
                    <tr key={paciente.id}>
                    <th scope="row">{paciente.id}</th>
                    <td>{paciente.nomePaciente}</td>
                    <td>{paciente.emailPaciente}</td>
                    <td>{paciente.idadePaciente}</td>
                    <td>
                        <button
                        type="button"
                        className="btn btn-link btn-sm px-3"
                        data-mdb-ripple-init
                        data-ripple-color="primary"
                        >
                        <i className="fas fa-times"></i>
                        </button>
                    </td>
                    </tr>
                ))
                ) : (
                <tr>
                    <td colSpan="4" className="text-center">
                    Carregando...
                    </td>
                </tr>
                )}
            </tbody>
        </table>
    
    </>
  );
}
