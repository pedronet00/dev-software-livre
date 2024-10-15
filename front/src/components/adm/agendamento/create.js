import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../api/api';

function AgendamentoForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    paciente_id: '',
    data_hora: ''
  });

  useEffect(() => {
    if (id) {
      api.get(`/agendamento/${id}`)
        .then((response) => {
          setFormData(response.data);
        });
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      api.put(`/agendamento/${id}`, formData)
        .then(() => navigate('/agendamentos'));
    } else {
      api.post('/agendamento', formData)
        .then(() => navigate('/agendamentos'));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        placeholder="Paciente ID" 
        value={formData.paciente_id} 
        onChange={(e) => setFormData({ ...formData, paciente_id: e.target.value })} 
        required 
      />
      <input 
        type="datetime-local" 
        placeholder="Data e Hora" 
        value={formData.data_hora} 
        onChange={(e) => setFormData({ ...formData, data_hora: e.target.value })} 
        required 
      />
      <button type="submit">{id ? 'Atualizar' : 'Criar'} Agendamento</button>
    </form>
  );
}

export default AgendamentoForm;
