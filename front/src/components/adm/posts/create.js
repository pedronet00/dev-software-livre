import { useState } from 'react';
import api from '../../api/api';
import { Form, Button } from 'react-bootstrap';
import Swal from 'sweetalert2'

function CriarPost(){

    const token = localStorage.getItem("auth_token");
    if(!token){
        window.location.href = "/login";
    }

    const [tituloPost, setTituloPost] = useState('');
    const [subtituloPost, setSubtituloPost] = useState('');
    const [textoPost, setTextoPost] = useState('');
    const [imgPost, setImgPost] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const postData = {
            tituloPost: tituloPost,
            subtituloPost: subtituloPost,
            textoPost: textoPost,
            imgPost: imgPost
        };

        api
          .post("/post", postData)
          .then((response) => {
            console.log(response.data.message);
            Swal.fire({
                title: "Sucesso!",
                text: "Post inserido com sucesso.",
                icon: "success"
              });
            setTituloPost('');
            setSubtituloPost('');
            setTextoPost('');
            setImgPost('');
          })
          .catch((err) => {
            console.error("Erro ao criar o post: " + err.response.data.message);
          });
    };

    return(
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="tituloPost">
                <Form.Label>Título do post</Form.Label>
                <Form.Control 
                    type="text" 
                    placeholder="Insira aqui o título do post" 
                    value={tituloPost}
                    onChange={(e) => setTituloPost(e.target.value)}
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="subtituloPost">
                <Form.Label>Subtítulo do post</Form.Label>
                <Form.Control 
                    type="text" 
                    placeholder="Insira aqui o subtítulo do post" 
                    value={subtituloPost}
                    onChange={(e) => setSubtituloPost(e.target.value)}
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="textoPost">
                <Form.Label>Conteúdo do post</Form.Label>
                <Form.Control 
                    as="textarea" 
                    rows={3} 
                    value={textoPost}
                    onChange={(e) => setTextoPost(e.target.value)}
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="imgPost">
                <Form.Label>URL da imagem</Form.Label>
                <Form.Control 
                    type="text" 
                    placeholder="Insira aqui a URL da imagem" 
                    value={imgPost}
                    onChange={(e) => setImgPost(e.target.value)}
                />
            </Form.Group>
            <Button variant="primary" type="submit">
                Criar Post
            </Button>
        </Form>
    );
}

export default CriarPost;
