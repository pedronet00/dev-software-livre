import React, { useState, useEffect } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import api from '../../api/api'; // Assumindo que o api.js está na pasta api

const CadastroAvaliacao = () => {
  const [avaliacao, setAvaliacao] = useState({
    paciente: '',
    dataAvaliacao: '',
    observacoes: ''
  });

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAvaliacao({ ...avaliacao, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aqui você pode enviar os dados da avaliação para uma API ou backend
    console.log(avaliacao);
    alert('Avaliação cadastrada com sucesso!');
  };

  return (
    <Container>
      <h2 className="mt-5">Cadastro de Avaliação</h2>
      <Form onSubmit={handleSubmit}>
        {/* Select de Pacientes */}
        <Form.Group controlId="paciente" className="mb-3">
          <Form.Label>Selecione o Paciente</Form.Label>
          <Form.Control 
            as="select" 
            name="paciente" 
            value={avaliacao.paciente} 
            onChange={handleChange} 
            required
          >
            <option value="">Selecione um paciente</option>
            {/* Populando o select com os pacientes vindos da API */}
            {pacientes.map((paciente) => (
              <option key={paciente.id} value={paciente.id}>
                {paciente.nomePaciente}
              </option>
            ))}
          </Form.Control>
        </Form.Group>

        {/* Data da Avaliação */}
        <Form.Group controlId="dataAvaliacao" className="mb-3">
          <Form.Label>Data da Avaliação</Form.Label>
          <Form.Control
            type="date"
            name="dataAvaliacao"
            value={avaliacao.dataAvaliacao}
            onChange={handleChange}
            required
          />
        </Form.Group>

        {/* Observações */}
        <Form.Group controlId="observacoes" className="mb-3">
          <Form.Label>Observações</Form.Label>
          <Form.Control
            as="textarea"
            name="observacoes"
            rows={3}
            placeholder="Digite as observações sobre a avaliação"
            value={avaliacao.observacoes}
            onChange={handleChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Cadastrar Avaliação
        </Button>
      </Form>
    </Container>
  );
};

export default CadastroAvaliacao;
