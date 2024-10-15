import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../api/api';

function ProblemaIdentificadoForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    paciente_id: '',
    data: '',
    descricao: '',
    evolucao: ''
  });

  useEffect(() => {
    if (id) {
      api.get(`/problema-identificado/${id}`)
        .then((response) => {
          setFormData(response.data);
        });
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      api.put(`/problema-identificado/${id}`, formData)
        .then(() => navigate('/problemas-identificados'));
    } else {
      api.post('/problema-identificado', formData)
        .then(() => navigate('/problemas-identificados'));
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
      <textarea 
        placeholder="Evolução" 
        value={formData.evolucao} 
        onChange={(e) => setFormData({ ...formData, evolucao: e.target.value })} 
      />
      <button type="submit">{id ? 'Atualizar' : 'Criar'} Problema Identificado</button>
    </form>
  );
}

export default ProblemaIdentificadoForm;
