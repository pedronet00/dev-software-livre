import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../api/api';

function EncaminhamentoForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    paciente_id: '',
    data: '',
    motivo: '',
    profissional: ''
  });

  useEffect(() => {
    if (id) {
      api.get(`/encaminhamento/${id}`)
        .then((response) => {
          setFormData(response.data);
        });
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      api.put(`/encaminhamento/${id}`, formData)
        .then(() => navigate('/encaminhamentos'));
    } else {
      api.post('/encaminhamento', formData)
        .then(() => navigate('/encaminhamentos'));
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
        placeholder="Data" 
        value={formData.data} 
        onChange={(e) => setFormData({ ...formData, data: e.target.value })} 
        required 
      />
      <input 
        type="text" 
        placeholder="Motivo" 
        value={formData.motivo} 
        onChange={(e) => setFormData({ ...formData, motivo: e.target.value })} 
        required 
      />
      <input 
        type="text" 
        placeholder="Profissional" 
        value={formData.profissional} 
        onChange={(e) => setFormData({ ...formData, profissional: e.target.value })} 
        required 
      />
      <button type="submit">{id ? 'Atualizar' : 'Criar'} Encaminhamento</button>
    </form>
  );
}

export default EncaminhamentoForm;
