import React, { useState, useEffect } from 'react';
import api from '../../api/api'; // Assumindo que o api.js está na pasta api

export function ListandoAvaliacoes() {
  const [avaliacoes, setAvaliacoes] = useState([]); // Estado para armazenar a lista de avaliações
  const [currentPage, setCurrentPage] = useState(1); // Estado para a página atual
  const [totalPages, setTotalPages] = useState(1); // Estado para o número total de páginas
  const resultsPerPage = 10; // Resultados por página
  const maxPagesVisible = 5; // Número máximo de páginas clicáveis

  useEffect(() => {
    // Faz a requisição para o endpoint /avaliacoes
    const fetchAvaliacoes = async () => {
      try {
        const response = await api.get('/avaliacoes');
        setAvaliacoes(response.data); // Atualiza o estado com a lista de avaliações
        setTotalPages(Math.ceil(response.data.length / resultsPerPage)); // Calcula o número total de páginas
      } catch (error) {
        console.error('Erro ao buscar avaliações:', error);
      }
    };

    fetchAvaliacoes();
  }, []);

  // Função para calcular os índices de início e fim dos resultados na página atual
  const indexOfLastAvaliacao = currentPage * resultsPerPage;
  const indexOfFirstAvaliacao = indexOfLastAvaliacao - resultsPerPage;
  const currentAvaliacoes = avaliacoes.slice(indexOfFirstAvaliacao, indexOfLastAvaliacao);

  // Função para renderizar os botões de paginação
  const renderPaginationButtons = () => {
    const buttons = [];
    const startPage = Math.max(1, currentPage - Math.floor(maxPagesVisible / 2));
    const endPage = Math.min(totalPages, startPage + maxPagesVisible - 1);

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          className={`btn ${i === currentPage ? 'btn-primary' : 'btn-light'}`}
          onClick={() => setCurrentPage(i)}
        >
          {i}
        </button>
      );
    }
    return buttons;
  };

  const handleCadastrarPaciente = () => {
    window.location.href = '/cadastroAvaliacao'; // Redireciona para /cadastroAvaliacao
  };

  return (
    <>
      <button className='btn btn-primary' onClick={handleCadastrarPaciente}>
        Cadastrar avaliação
      </button>
      
      <table className="table align-middle" style={{ width: "80%", margin: "auto" }}>
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Paciente</th>
            <th scope="col">Data da Avaliação</th>
            <th scope="col">Observações</th>
            <th scope="col">Ações</th>
          </tr>
        </thead>
        <tbody>
          {currentAvaliacoes.length > 0 ? (
            currentAvaliacoes.map((avaliacao) => (
              <tr key={avaliacao.id}>
                <th scope="row">{avaliacao.id}</th>
                <th scope="row">{avaliacao.paciente?.nomePaciente || 'Paciente não encontrado'}</th>
                <td>{avaliacao.dataAvaliacao}</td>
                <td>{avaliacao.observacoes}</td>
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
              <td colSpan="5" className="text-center">
                Carregando...
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Renderiza a paginação */}
      <div className="pagination" style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <button 
          className="btn btn-light" 
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} 
          disabled={currentPage === 1}
        >
          Anterior
        </button>
        {renderPaginationButtons()}
        <button 
          className="btn btn-light" 
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} 
          disabled={currentPage === totalPages}
        >
          Próximo
        </button>
      </div>
    </>
  );
}
