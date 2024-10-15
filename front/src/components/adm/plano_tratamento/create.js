import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../api/api';

function PlanoTratamentoForm() {
  const { id } = useParams(); // Para o modo de edição
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    paciente_id: '',
    data_inicio: '',
    objetivos: '',
    progresso: ''
  });

  useEffect(() => {
    if (id) {
      // Se o id estiver presente, estamos no modo de edição
      api.get(`/plano-tratamento/${id}`)
        .then((response) => {
          setFormData(response.data);
        });
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      // Atualizar plano de tratamento existente
      api.put(`/plano-tratamento/${id}`, formData)
        .then(() => navigate('/planos-tratamento'));
    } else {
      // Criar um novo plano de tratamento
      api.post('/plano-tratamento', formData)
        .then(() => navigate('/planos-tratamento'));
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
        type="date" 
        placeholder="Data de Início" 
        value={formData.data_inicio} 
        onChange={(e) => setFormData({ ...formData, data_inicio: e.target.value })} 
        required 
      />
      <textarea 
        placeholder="Objetivos Terapêuticos" 
        value={formData.objetivos} 
        onChange={(e) => setFormData({ ...formData, objetivos: e.target.value })} 
        required 
      />
      <textarea 
        placeholder="Progresso" 
        value={formData.progresso} 
        onChange={(e) => setFormData({ ...formData, progresso: e.target.value })} 
      />
      <button type="submit">{id ? 'Atualizar' : 'Criar'} Plano de Tratamento</button>
    </form>
  );
}

export default PlanoTratamentoForm;
