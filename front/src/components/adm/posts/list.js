import { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import api from '../../api/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenToSquare, faEye } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2'


export default function ListarPosts() {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        api
          .get("/posts")
          .then((response) => setPosts(response.data))
          .catch((err) => {
            console.error("ops! ocorreu um erro" + err);
          });
    }, []);

    const handleDelete = (postId) => {
        Swal.fire({
            title: "Você quer excluir esse post?",
            showDenyButton: false,
            showCancelButton: true,
            confirmButtonText: "Excluir",
            denyButtonText: `Cancelar`
        }).then((result) => {
            if (result.isConfirmed) {
                api.delete(`/post/${postId}`)
                    .then(() => {
                        Swal.fire("Excluído!", "O post foi excluído com sucesso.", "success");
                        // Aqui você pode adicionar lógica para remover o post da lista de posts exibida na tela
                    })
                    .catch((error) => {
                        Swal.fire("Erro!", "Não foi possível excluir o post.", "error");
                    });
            } else if (result.isDenied) {
                Swal.fire("Cancelado", "O post não foi excluído.", "info");
            }
        });
    };

    return (
        <Table striped bordered hover>
        <thead>
            <tr>
            <th>#</th>
            <th>Título</th>
            <th>Data de publicação</th>
            <th>Ações</th>
            </tr>
        </thead>
        <tbody>
            {posts.map((post) => 
                <tr key={post.id}>
                    <td>{post.id}</td>
                    <td>{post.tituloPost}</td>
                    <td>{post.created_at}</td>
                    <td>
                        <FontAwesomeIcon icon={faEye} />
                        <FontAwesomeIcon icon={faPenToSquare} />
                        <FontAwesomeIcon icon={faTrash} onClick={() => handleDelete(post.id)} style={{ cursor: 'pointer' }} />
                    </td>            
                </tr>
            )};
            
        </tbody>
        </Table>
    );
}
