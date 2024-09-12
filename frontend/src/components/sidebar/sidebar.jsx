import { useState } from "react";
import { ContenerBar, Nav, EspacoCurto, EspacoGrande, IconWrapper, Modal, ModalContent, CloseButton, Form } from "./styleSid";
import { FaHome } from "react-icons/fa";
import { MdAddBox } from "react-icons/md";
import { IoIosChatboxes } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";
import { api } from "../../services/api";

export const Sidebar = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [price, setPrice] = useState('');
    const [description, setDetails] = useState('');
    const [title, setTitle] = useState('');
    const [location, setLocation] = useState('');
    const [images, setImages] = useState([]);
    const [isLoading, setIsLoading] = useState(false); // Estado para controle de loading

    const navigate = useNavigate();
    const session = JSON.parse(localStorage.getItem("house"));
    const userId = session?.subject;

    const handleOpenModal = () => setIsModalOpen(true);

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setPrice('');
        setDetails('');
        setTitle('');
        setLocation('');
        setImages([]);
    };

    const CriarPUbli = async (e) => {
        e.preventDefault();
        setIsLoading(true); // Inicia o estado de loading
        const formData = new FormData();
        formData.append('price', price);
        formData.append('description', description);
        formData.append('title', title);
        formData.append('location', location);
        formData.append('userId', userId);

        images.forEach((image) => {
            formData.append('images', image); // Envia os arquivos diretamente
        });

        try {
            await api.post(`/house/${userId}`, formData, {
                headers: {
                    Authorization: `Bearer ${session.token}`,
                    'Content-Type': 'multipart/form-data',
                }
            });
            alert("Publicado com Sucesso");
            handleCloseModal();
        } catch (error) {
            alert("Erro ao publicar");
            console.error(error);
        } finally {
            setIsLoading(false); // Finaliza o loading após o processo
        }
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files).slice(0, 4);
        setImages(files); // Armazena os arquivos diretamente
    };

    return (
        <ContenerBar>
            <Nav>
                <EspacoCurto />
                <IconWrapper onClick={() => navigate("/perfil")}><FaRegUserCircle />
                    <p>Perfil</p>
                </IconWrapper>
                <EspacoCurto />
                <IconWrapper onClick={() => navigate('/')}><FaHome />
                    <p>Inicio</p>
                </IconWrapper>
                <EspacoCurto />
                <IconWrapper onClick={handleOpenModal}><MdAddBox />
                    <p>Publicar</p>
                </IconWrapper>
                <EspacoCurto />
                <IconWrapper onClick={() => navigate('/chats')}><IoIosChatboxes />
                    <p>Chats</p>
                </IconWrapper>
                <EspacoGrande />
            </Nav>

            {isModalOpen && (
                <Modal>
                    <ModalContent>
                        <CloseButton onClick={handleCloseModal}>X</CloseButton>
                        <h2>Nova Publicação</h2>

                        {isLoading ? (
                            <div>Publicando...</div>
                        ) : (
                            <Form onSubmit={CriarPUbli}>
                                <label>
                                    Imagens:
                                    <input type="file" name="images" multiple accept="image/*" onChange={handleImageChange} />
                                </label>
                                <label>
                                    Preço:
                                    <input type="text" placeholder="R$ 0,00" value={price} onChange={(e) => setPrice(e.target.value)} />
                                </label>
                                <label>
                                    Detalhes:
                                    <textarea placeholder="Descrição da casa" value={description} onChange={(e) => setDetails(e.target.value)} />
                                </label>
                                <label>
                                    Título:
                                    <input type="text" placeholder="Título da casa" value={title} onChange={(e) => setTitle(e.target.value)} />
                                </label>
                                <label>
                                    Localização:
                                    <input type="text" placeholder="Localização" value={location} onChange={(e) => setLocation(e.target.value)} />
                                </label>
                                <button type="submit" disabled={isLoading}>
                                    {isLoading ? "Publicando..." : "Adicionar"}
                                </button>
                            </Form>
                        )}
                    </ModalContent>
                </Modal>
            )}
        </ContenerBar>
    );
};
