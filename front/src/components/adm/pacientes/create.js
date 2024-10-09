import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

const CadastroPaciente = () => {
  const [paciente, setPaciente] = useState({
    nomeCompleto: '',
    dataNascimento: '',
    endereco: '',
    telefone: '',
    email: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaciente({ ...paciente, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aqui você pode enviar os dados do paciente para uma API ou backend
    console.log(paciente);
    alert('Cadastro realizado com sucesso!');
  };

  return (
    <Container>
      <h2 className="mt-5">Cadastro de Paciente</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="nomeCompleto" className="mb-3">
          <Form.Label>Nome Completo</Form.Label>
          <Form.Control
            type="text"
            name="nomeCompleto"
            placeholder="Digite o nome completo"
            value={paciente.nomeCompleto}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="dataNascimento" className="mb-3">
          <Form.Label>Data de Nascimento</Form.Label>
          <Form.Control
            type="date"
            name="dataNascimento"
            value={paciente.dataNascimento}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="endereco" className="mb-3">
          <Form.Label>Endereço Completo</Form.Label>
          <Form.Control
            type="text"
            name="endereco"
            placeholder="Digite o endereço completo"
            value={paciente.endereco}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="telefone" className="mb-3">
          <Form.Label>Número de Telefone</Form.Label>
          <Form.Control
            type="tel"
            name="telefone"
            placeholder="(99) 99999-9999"
            value={paciente.telefone}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="email" className="mb-3">
          <Form.Label>Endereço de Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Digite o email"
            value={paciente.email}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Cadastrar Paciente
        </Button>
      </Form>
    </Container>
  );
};

export default CadastroPaciente;
