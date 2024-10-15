import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../api/api';

function DiagnosticoForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    paciente_id: '',
    data: '',
    descricao: ''
  });

  useEffect(() => {
    if (id) {
      api.get(`/diagnostico/${id}`)
        .then((response) => {
          setFormData(response.data);
        });
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      api.put(`/diagnostico/${id}`, formData)
        .then(() => navigate('/diagnosticos'));
    } else {
      api.post('/diagnostico', formData)
        .then(() => navigate('/diagnosticos'));
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
      <textarea 
        placeholder="Descrição" 
        value={formData.descricao} 
        onChange={(e) => setFormData({ ...formData, descricao: e.target.value })} 
        required 
      />
      <button type="submit">{id ? 'Atualizar' : 'Criar'} Diagnóstico</button>
    </form>
  );
}

export default DiagnosticoForm;
