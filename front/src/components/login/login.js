import { useState } from "react";
import api from "../api/api";
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        const userData = {
            email: email,
            password: password
        }

        api
            .post("/login", userData)
            .then((response) => {
               
                if (response && response.data) {
                    const token = response.data.token;
                    const name = response.data.name; 
                    const idUser = response.data.idUser; 

                    
                    localStorage.setItem('auth_token', token);
                    localStorage.setItem('name', name);
                    localStorage.setItem('idUser', idUser)
                    
                    
                    Swal.fire({
                        title: "Sucesso!",
                        text: "Logado com sucesso.",
                        icon: "success"
                    });

                    navigate('/');  

                    
                    setEmail('');
                    setPassword('');
                } else {
                    
                    Swal.fire({
                        title: "Erro!",
                        text: "Erro ao logar: Resposta inesperada do servidor.",
                        icon: "error"
                    });
                }
            })
            .catch((err) => {
                Swal.fire({
                    title: "Erro!",
                    text: "Erro ao logar: " + (err.response && err.response.data && err.response.data.message ? err.response.data.message : "Erro desconhecido."),
                    icon: "error"
                });
            });
    }

    return (
        <section className="vh-100 gradient-custom">
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                        <div className="card bg-dark text-white" style={{ borderRadius: '1rem' }}>
                            <div className="card-body p-5 text-center">

                                <div className="mb-md-5 mt-md-4 pb-5">

                                    <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                                    <p className="text-white-50 mb-5">Por favor, insira seu e-mail e senha para logar!</p>

                                    <div data-mdb-input-init className="form-outline form-white mb-4">
                                        <input type="email" id="typeEmailX" className="form-control form-control-lg" value={email} onChange={(e) => setEmail(e.target.value)} />
                                        <label className="form-label" htmlFor="typeEmailX">Email</label>
                                    </div>

                                    <div data-mdb-input-init className="form-outline form-white mb-4">
                                        <input type="password" id="typePasswordX" className="form-control form-control-lg" value={password} onChange={(e) => setPassword(e.target.value)} />
                                        <label className="form-label" htmlFor="typePasswordX">Senha</label>
                                    </div>

                                    <p className="small mb-5 pb-lg-2"><a className="text-white-50" href="#!">Esqueceu a senha?</a></p>

                                    <button data-mdb-button-init data-mdb-ripple-init className="btn btn-outline-light btn-lg px-5" onClick={handleSubmit} type="submit">Login</button>

                                    <div className="d-flex justify-content-center text-center mt-4 pt-1">
                                        <a href="#!" className="text-white"><i className="fab fa-facebook-f fa-lg"></i></a>
                                        <a href="#!" className="text-white"><i className="fab fa-twitter fa-lg mx-4 px-2"></i></a>
                                        <a href="#!" className="text-white"><i className="fab fa-google fa-lg"></i></a>
                                    </div>

                                </div>

                                <div>
                                    <p className="mb-0">Não tem uma conta? <a href="#!" className="text-white-50 fw-bold">Registre-se</a></p>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
