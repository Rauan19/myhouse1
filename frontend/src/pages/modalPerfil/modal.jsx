import { useNavigate } from "react-router-dom";
import { api } from "../../services/api";
import { ContenerModal, Perfil, IMGPERFIL, MinhasPublis, CardPerfil } from "./style";
import { useEffect, useState } from "react";
import { BarLoader } from 'react-spinners'; // Componente de loading

export const ModalPerfil = () => {
  const [Publi, setPubli] = useState([]);
  const [loading, setLoading] = useState(false); // Estado de loading
  const session = JSON.parse(localStorage.getItem("house"));
  const userId = session?.subject;
  const NameUser = session?.name;
  const ImgUser = session?.image;

  const navigate = useNavigate();

  const mostrar = async () => {
    setLoading(true); // Inicia o estado de carregamento
    try {
      const response = await api.get(`/house/${userId}`, {
        headers: {
          Authorization: `Bearer ${session.token}`,
        },
      });
      setPubli(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // Finaliza o estado de carregamento
    }
  };

  const deletarPublicacao = async (id) => {
    setLoading(true); // Inicia o estado de carregamento
    try {
      await api.delete(`/delete/house/${id}`, {
        headers: {
          Authorization: `Bearer ${session.token}`,
        },
      });
      mostrar(); // Atualiza as publicações
    } catch (error) {
      console.log("Erro ao deletar publicação:", error);
      alert("Erro ao deletar");
    } finally {
      setLoading(false); // Finaliza o estado de carregamento
    }
  };

  const DeslogarUser = () => {
    localStorage.removeItem("house");
    navigate("/login");
  };

  const handleImageChange = async (e) => {
    const selectImage = e.target.files[0];

    if (!selectImage) {
      return;
    }

    const formData = new FormData();
    formData.append("imgPerfil", selectImage); // Adiciona a imagem ao FormData

    setLoading(true); // Inicia o estado de carregamento
    try {
      const response = await api.post(`/user/${userId}/upload-perfil`, formData, {
        headers: {
          Authorization: `Bearer ${session.token}`,
        },
      });

      // Atualiza o localStorage com a nova imagem de perfil
      const updatedUser = {
        ...session, // Mantém as informações atuais
        image: response.data.imgPerfil, // Atualiza o campo de imagem no localStorage
      };
      localStorage.setItem("house", JSON.stringify(updatedUser));
      alert("Imagem de perfil atualizada");
      window.location.reload();
    } catch (error) {
      alert("Erro ao fazer upload da imagem", error);
    } finally {
      setLoading(false); // Finaliza o estado de carregamento
    }
  };

  useEffect(() => {
    mostrar();
  }, []);

  return (
    <ContenerModal>
      <h2>Meu Perfil</h2>
      <Perfil>
        <IMGPERFIL>
          <img
            src={ImgUser ? `http://localhost:4001${ImgUser}` : '/uploads/default-profile.png'}
            alt="Perfil"
          />
        </IMGPERFIL>
        <p>Olá {NameUser}</p>
        <label htmlFor="imagem" style={{ cursor: "pointer", color: "#321eb1" }}>
          Adicionar imagem de perfil
        </label>
        <input
          type="file"
          name="imagem"
          id="imagem"
          onChange={handleImageChange} // Envia o upload assim que a imagem é selecionada
          style={{ display: "none" }}
        />
        <button onClick={DeslogarUser}>Sair da conta</button>
      </Perfil>

      <h2>Minhas Publicações</h2>

      {/* Componente de carregamento enquanto o estado de loading for verdadeiro */}
      {loading ? (
        <BarLoader />
      ) : (
        <MinhasPublis>
          {Publi && Publi.length > 0 ? (
            Publi.map((item) => (
              <CardPerfil key={item._id}>
                <img
                  src={item.images.length > 0 ? `http://localhost:4001${item.images[0]}` : 'URL_DE_IMAGEM_PADRAO'}
                  alt="Imagem da casa"
                />
                <div className="details">
                  <h4>{item.title}</h4>
                  <p>{item.description}</p>
                  <p>Preço: R$ {item.price}</p>
                  <p>Localização: {item.location}</p>
                </div>
                <button onClick={() => deletarPublicacao(item._id)}>Excluir</button>
              </CardPerfil>
            ))
          ) : (
            <p>Você não tem publicações ainda.</p>
          )}
        </MinhasPublis>
      )}
    </ContenerModal>
  );
};
