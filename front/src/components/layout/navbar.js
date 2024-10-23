import React, { useState, useEffect } from 'react';

export default function Navbar() {
    const [userName, setUserName] = useState('');

    useEffect(() => {
        // Obtendo o nome do usuário armazenado no localStorage
        const name = localStorage.getItem('name');
        if (name) {
            setUserName(name);
        }
    }, []);

    const handleLogout = () => {
        // Remove os dados do localStorage
        localStorage.removeItem('auth_token');
        localStorage.removeItem('name');
        
        // Redireciona para a página de login ou outra página
        window.location.href = '/login'; // Mude para a rota desejada
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <a className="navbar-brand" href="/">Clínica</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item"><a className="nav-link" href="/">Dashboard</a></li>
                        <li className="nav-item"><a className="nav-link" href="/pacientes">Pacientes</a></li>
                        <li className="nav-item"><a className="nav-link" href="/avaliacoes">Avaliações</a></li>
                        <li className="nav-item"><a className="nav-link" href="#!">Sessões</a></li>
                        <li className="nav-item"><a className="nav-link" href="/planos-tratamento">Planos de Tratamento</a></li>
                        <li className="nav-item"><a className="nav-link" href="/diagnosticos">Diagnósticos</a></li>
                        <li className="nav-item"><a className="nav-link" href="/problemas-identificados">Problemas identificados</a></li>
                        <li className="nav-item"><a className="nav-link" href="/prescricoes">Prescrições</a></li>
                        <li className="nav-item"><a className="nav-link" href="/encaminhamentos">Encaminhamentos</a></li>
                        <li className="nav-item"><a className="nav-link" href="/agendamentos">Agendamentos</a></li>
                        {userName ? (
                            <>
                                <li className="nav-item"><a className="nav-link" href="#!">|</a></li>
                                <li className="nav-item"><a className="nav-link" href="#!">Olá, {userName}</a></li>
                                <li className="nav-item"><a className="nav-link" href="#!" onClick={handleLogout}>Sair</a></li>
                            </>
                        ) : (
                            <li className="nav-item"><a className="nav-link" href="/login">Login</a></li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}
