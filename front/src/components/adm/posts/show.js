import api from "../../api/api";
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';

export default function Post() {
    const { id } = useParams(); // Captura o parâmetro id da URL
    const [post, setPost] = useState(null);

    useEffect(() => {
        api
          .get(`/post/${id}`) // Usa o id capturado na URL
          .then((response) => setPost(response.data))
          .catch((err) => {
            console.error("Ops! Ocorreu um erro: " + err);
          });
    }, [id]);

    if (!post) {
        return <div>Carregando...</div>; // Mostra um indicador de carregamento enquanto o post é carregado
    }


    return(
        <div className="container mt-5">
            <div className="row">
                <div className="col-lg-8">
                    <article>
                        <header className="mb-4">
                            <h1 className="fw-bolder mb-1">{post.tituloPost}</h1>
                            <div className="text-muted fst-italic mb-2">Posted on January 1, 2023 by Start Bootstrap</div>
                            <a className="badge bg-secondary text-decoration-none link-light" href="#!">Web Design</a>
                            <a className="badge bg-secondary text-decoration-none link-light" href="#!">Freebies</a>
                        </header>
                        <figure className="mb-4"><img className="img-fluid rounded" src="https://dummyimage.com/900x400/ced4da/6c757d.jpg" alt="..." /></figure>
                        <section className="mb-5">
                            <p className="fs-5 mb-4">{post.textoPost}</p>
                        </section>
                    </article>
                
                    
                </div>
                <div className="col-lg-4">
                    <div className="card mb-4">
                        <div className="card-header">Search</div>
                        <div className="card-body">
                            <div className="input-group">
                                <input className="form-control" type="text" placeholder="Enter search term..." aria-label="Enter search term..." aria-describedby="button-search" />
                                <button className="btn btn-primary" id="button-search" type="button">Go!</button>
                            </div>
                        </div>
                    </div>
                    <div className="card mb-4">
                        <div className="card-header">Categories</div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-sm-6">
                                    <ul className="list-unstyled mb-0">
                                        <li><a href="#!">Web Design</a></li>
                                        <li><a href="#!">HTML</a></li>
                                        <li><a href="#!">Freebies</a></li>
                                    </ul>
                                </div>
                                <div className="col-sm-6">
                                    <ul className="list-unstyled mb-0">
                                        <li><a href="#!">JavaScript</a></li>
                                        <li><a href="#!">CSS</a></li>
                                        <li><a href="#!">Tutorials</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card mb-4">
                        <div className="card-header">Side Widget</div>
                        <div className="card-body">You can put anything you want inside of these side widgets. They are easy to use, and feature the Bootstrap 5 card component!</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
