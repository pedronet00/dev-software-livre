import React, { useEffect, useState } from "react";
import api from "../api/api";
import '../../css/home.css';

function Home() {
    // Exemplo de estatísticas que podem vir da API
    const [stats, setStats] = useState({
        totalPacientes: 120,
        consultasHoje: 5,
        profissionaisAtivos: 8,
    });

    const [qtdePacientes, setQtdePacientes] = useState(0);

    useEffect(() => {
        api
          .get("/qtdePacientes")
          .then((response) => setQtdePacientes(response.data))
          .catch((err) => {
            console.error("ops! ocorreu um erro" + err);
          });
    }, []);

    const [consultas, setConsultas] = useState([
        { id: 1, paciente: "João Silva", horario: "10:00 AM", profissional: "Dra. Maria" },
        { id: 2, paciente: "Ana Souza", horario: "11:30 AM", profissional: "Dr. Carlos" },
    ]);

    const [categorias, setCategorias] = useState([
        { id: 1, nomeCategoria: "Ansiedade" },
        { id: 2, nomeCategoria: "Depressão" },
    ]);

    return (
        <div className="bg-light">
            <header className="py-5 bg-primary text-white mb-4">
                <div className="container">
                    <div className="text-center my-5">
                        <h1 className="fw-bolder">Bem-vindo ao Painel Administrativo</h1>
                        <p className="lead mb-0">Administre consultas, pacientes e profissionais da Clínica Psicológica</p>
                    </div>
                </div>
            </header>

            <div className="container">
                <div className="row">
                    <div className="col-lg-8">
                        {/* Estatísticas rápidas */}
                        <div className="row mb-4">
                            <div className="col-md-4">
                                <div className="card bg-info text-white text-center py-4">
                                    <h2>{qtdePacientes}</h2>
                                    <p>Total de Pacientes</p>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="card bg-warning text-white text-center py-4">
                                    <h2>{stats.consultasHoje}</h2>
                                    <p>Consultas Hoje</p>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="card bg-success text-white text-center py-4">
                                    <h2>{stats.profissionaisAtivos}</h2>
                                    <p>Profissionais Ativos</p>
                                </div>
                            </div>
                        </div>

                        {/* Próximas Consultas */}
                        <div className="card mb-4">
                            <div className="card-header bg-primary text-white">Próximas Consultas</div>
                            <div className="card-body">
                                {consultas.map((consulta) => (
                                    <div key={consulta.id} className="mb-3">
                                        <p><strong>Paciente:</strong> {consulta.paciente}</p>
                                        <p><strong>Horário:</strong> {consulta.horario}</p>
                                        <p><strong>Profissional:</strong> {consulta.profissional}</p>
                                        <hr />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="col-lg-4">
                        {/* Busca */}
                        <div className="card mb-4">
                            <div className="card-header">Buscar Paciente</div>
                            <div className="card-body">
                                <div className="input-group">
                                    <input className="form-control" type="text" placeholder="Digite o nome do paciente..." aria-label="Enter search term..." />
                                    <button className="btn btn-primary" type="button">Buscar</button>
                                </div>
                            </div>
                        </div>

                        {/* Categorias */}
                        <div className="card mb-4">
                            <div className="card-header">Categorias de Tratamento</div>
                            <div className="card-body">
                                <div className="row">
                                    {categorias.map((categoria) => (
                                        <div className="col-sm-6" key={categoria.id}>
                                            <ul className="list-unstyled mb-0">
                                                <li><a href="#!">{categoria.nomeCategoria}</a></li>
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Widget de Informações */}
                        <div className="card mb-4">
                            <div className="card-header">Informações da Clínica</div>
                            <div className="card-body">
                                Bem-vindo ao sistema administrativo da nossa clínica psicológica. Aqui você pode acompanhar suas consultas e gerenciar pacientes.
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <footer className="py-4 bg-dark text-white">
                <div className="container text-center">
                    <p className="m-0">Clínica Psicológica © 2023. Todos os direitos reservados.</p>
                </div>
            </footer>
        </div>
    );
}

export default Home;
