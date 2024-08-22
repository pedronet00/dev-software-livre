import api from "../../api/api";
import { useParams } from 'react-router-dom';
import { useState, useEffect } from "react";
import Swal from 'sweetalert2'


export default function Comments(){

    const [comment, setComment] = useState('');
    const { id } = useParams();
    const [idUsuario, setIdUsuario] = useState('');
    const [commentsList, setCommentsList] = useState([]);

    useEffect(() => {
        const idUsuario = localStorage.getItem('idUser');
        if (idUsuario) {
            setIdUsuario(idUsuario);
        }
    }, []);

    useEffect(() => {
        api
          .get(`/comments/${id}`)
          .then((response) => setCommentsList(response.data))
          .catch((err) => {
            console.error("ops! ocorreu um erro" + err);
          });
          
    }, []);


    const handleSubmit = (e) => {
        e.preventDefault();

        const commentData = {
            idPost: id,
            idUsuario: idUsuario,
            textoComentario: comment
        }

        api
            .post("/comments", commentData)
            .then((response) => {               
                Swal.fire({
                    title: "Sucesso!",
                    text: "Comentário postado com sucesso.",
                    icon: "success"
                  });        
            })
            .catch((err) => {
                console.log(err.response); // Adicione este log
                Swal.fire({
                    title: "Erro!",
                    text: "Comentário não foi postado.",
                    icon: "error"
                  });
            });
    }

    return(
        <section className="mb-5" style={{width: "85%", margin: "auto"}}>
                        <div className="card bg-light">
                            <div className="card-body">
                                <form className="mb-4" onSubmit={handleSubmit}>
                                    <textarea className="form-control" rows="3" placeholder="Entre na discussão e deixe um comentário!" value={comment} onChange={(e) => setComment(e.target.value)}></textarea>                                    
                                    <button data-mdb-button-init data-mdb-ripple-init className="btn btn-primary px-5" type="submit">Enviar</button>

                                </form>
                                {commentsList.map((comment)=>(
                                    <div className="d-flex mb-4">
                                        <div className="flex-shrink-0"><img className="rounded-circle" src="https://dummyimage.com/50x50/ced4da/6c757d.jpg" alt="..." /></div>
                                        <div className="ms-3">
                                            <div className="fw-bold">{comment.userName}</div>
                                            {comment.textoComentario}
                                        </div>
                                    </div>
                                ))}
                                <div className="d-flex">
                                    <div className="flex-shrink-0"><img className="rounded-circle" src="https://dummyimage.com/50x50/ced4da/6c757d.jpg" alt="..." /></div>
                                    <div className="ms-3">
                                        <div className="fw-bold">Commenter Name</div>
                                        When I look at the universe and all the ways the universe wants to kill us, I find it hard to reconcile that with statements of beneficence.
                                        <div className="d-flex mt-4">
                                            <div className="flex-shrink-0"><img className="rounded-circle" src="https://dummyimage.com/50x50/ced4da/6c757d.jpg" alt="..." /></div>
                                            <div className="ms-3">
                                                <div className="fw-bold">Commenter Name</div>
                                                And under those conditions, you cannot establish a capital-market evaluation of that enterprise. You can't get investors.
                                            </div>
                                        </div>
                                        <div className="d-flex mt-4">
                                            <div className="flex-shrink-0"><img className="rounded-circle" src="https://dummyimage.com/50x50/ced4da/6c757d.jpg" alt="..." /></div>
                                            <div className="ms-3">
                                                <div className="fw-bold">Commenter Name</div>
                                                When you put money directly to a problem, it makes a good headline.
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
    );
}