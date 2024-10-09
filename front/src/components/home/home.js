import React, { useEffect, useState } from "react";
import api from "../api/api";
import '../../css/home.css';

function Home() {
    // Inicializando `posts` como um array vazio
    const [ultimoPost, setUltimoPost] = useState([]);
    const [posts, setPosts] = useState([]);
    const [categorias, setCategorias] = useState([]);


    useEffect(() => {
        api
          .get("/posts")
          .then((response) => setPosts(response.data))
          .catch((err) => {
            console.error("ops! ocorreu um erro" + err);
          });
    }, []);


    useEffect(() => {
        api
          .get("/ultimoPost")
          .then((response) => setUltimoPost(response.data))
          .catch((err) => {
            console.error("ops! ocorreu um erro" + err);
          });
    }, []);


    useEffect(() => {
        api
          .get("/categorias")
          .then((response) => setCategorias(response.data))
          .catch((err) => {
            console.error("ops! ocorreu um erro" + err);
          });
    }, []);

    return (
        <div className="bg-dark">
            
            <header className="py-5 bg-dark mb-4">
                <div className="container text-light">
                    <div className="text-center my-5">
                        <h1 className="fw-bolder">Bem vindo ao Blogged!</h1>
                        <p className="lead mb-0">O lugar onde notícias do mundo se juntam!</p>
                    </div>
                </div>
            </header>
            <div className="container bg-dark text-light">
                <div className="row bg-dark">
                    <div className="col-lg-8">
                                <div key={ultimoPost.id} className="card mb-4 bg-dark text-light">
                                    <a href="#!"><img className="card-img-top" src="https://dummyimage.com/850x350/dee2e6/6c757d.jpg" alt="..." /></a>
                                    <div className="card-body">
                                        <div className="small text-muted">{new Date(ultimoPost.created_at).toLocaleDateString()}</div>
                                        <h2 className="card-title">{ultimoPost.tituloPost}</h2>
                                        <p className="card-text">{ultimoPost.subtituloPost}</p>
                                        <a className="btn btn-primary" href={`/post/${ultimoPost.id}`}>Leia mais →</a>
                                    </div>
                                </div>
                                <div className="row">
                                    {posts.map((post) => (
                                        <div className="col-lg-6" key={post.id}>
                                            <div className="card mb-4 bg-dark text-light">
                                                <a href="#!"><img className="card-img-top" src="https://dummyimage.com/700x350/dee2e6/6c757d.jpg" alt={post.tituloPost} /></a>
                                                <div className="card-body">
                                                    <div className="small text-muted">{new Date(post.created_at).toLocaleDateString()}</div>
                                                    <h2 className="card-title h4">{post.tituloPost}</h2>
                                                    <p className="card-text">{post.subtituloPost}</p>
                                                    <a className="btn btn-primary" href={`/post/${post.id}`}>Leia mais →</a>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                        <nav aria-label="Pagination">
                            <hr className="my-0" />
                            <ul className="pagination justify-content-center my-4">
                                <li className="page-item disabled"><a className="page-link" href="#" tabIndex="-1" aria-disabled="true">Newer</a></li>
                                <li className="page-item active" aria-current="page"><a className="page-link" href="#!">1</a></li>
                                <li className="page-item"><a className="page-link" href="#!">2</a></li>
                                <li className="page-item"><a className="page-link" href="#!">3</a></li>
                                <li className="page-item disabled"><a className="page-link" href="#!">...</a></li>
                                <li className="page-item"><a className="page-link" href="#!">15</a></li>
                                <li className="page-item"><a className="page-link" href="#!">Older</a></li>
                            </ul>
                        </nav>
                    </div>
                    <div className="col-lg-4">
                        <div className="card mb-4 bg-dark text-light ">
                            <div className="card-header">Search</div>
                            <div className="card-body">
                                <div className="input-group">
                                    <input className="form-control" type="text" placeholder="Enter search term..." aria-label="Enter search term..." aria-describedby="button-search" />
                                    <button className="btn btn-primary" id="button-search" type="button">Go!</button>
                                </div>
                            </div>
                        </div>
                        <div className="card mb-4 bg-dark text-light ">
                            <div className="card-header">Categorias</div>
                            <div className="card-body">
                                <div className="row">
                                {categorias.map((categoria) => (
                                    <div className="col-sm-6">
                                        <ul className="list-unstyled mb-0">
                                                <li><a href="#!">{categoria.nomeCategoria}</a></li>
                                            
                                        </ul>
                                    </div>
                                ))}
                                </div>
                            </div>
                        </div>
                        <div className="card mb-4 bg-dark text-light ">
                            <div className="card-header">Side Widget</div>
                            <div className="card-body">You can put anything you want inside of these side widgets. They are easy to use, and feature the Bootstrap 5 card component!</div>
                        </div>
                    </div>
                </div>
            </div>
            <footer className="py-5 bg-dark">
                <div className="container"><p className="m-0 text-center text-white">Copyright &copy; Your Website 2023</p></div>
            </footer>
        </div>
    );
}

export default Home;
