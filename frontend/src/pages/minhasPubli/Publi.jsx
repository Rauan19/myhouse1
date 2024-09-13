import { useEffect, useState } from "react";
import { ContainerHome, Select, Flex, Cards, Card1, Modal } from "./stylePubli";
import { api } from "../../services/api";
import { HeaderComponents } from "../../components/header/header";
import { useNavigate } from "react-router-dom";
import { BarLoader } from 'react-spinners';

export const Publicacoes = () => {
  const [selectedHouse, setSelectedHouse] = useState(null);
  const [house, setHouse] = useState([]);
  const [order, setOrder] = useState(""); // Estado para o filtro de ordenação
  const [loading, setLoading] = useState(false); // Estado de loading

  const navigate = useNavigate();
  const session = JSON.parse(localStorage.getItem("house"));

  const handleViewDetails = (house) => {
    setSelectedHouse(house);
  };

  const handleCloseModal = () => {
    setSelectedHouse(null);
  };

  const handleOrderChange = (event) => {
    setOrder(event.target.value);
  };

  const handleSearch = async (searchTerm) => {
    setLoading(true); // Ativa o loading ao buscar
    try {
      const response = await api.get(`/search?term=${searchTerm}`, {
        headers: {
          Authorization: `Bearer ${session.token}`,
        },
      });
      setHouse(response.data); // Atualiza a lista de casas com os resultados da busca
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // Desativa o loading após a requisição
    }
  };

  const todashouse = async () => {
    setLoading(true); // Ativa o loading ao carregar todas as casas
    try {
      const response = await api.get("/allhouse", {
        headers: {
          Authorization: `Bearer ${session.token}`,
        },
      });

      let sortedHouses = response.data;

      // Ordenar as casas com base na seleção do usuário
      if (order === "menorPreco") {
        sortedHouses = sortedHouses.sort((a, b) => a.price - b.price);
      } else if (order === "maiorPreco") {
        sortedHouses = sortedHouses.sort((a, b) => b.price - a.price);
      }

      setHouse(sortedHouses);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // Desativa o loading após a requisição
    }
  };

  const CriarChat = async (houseId) => {
    setLoading(true); // Ativa o loading ao criar o chat
    try {
      await api.post(`/chat/${houseId}`, { userId: session.subject }, {
        headers: {
          Authorization: `Bearer ${session.token}`,
        },
      });
      navigate("/chats");
    } catch (error) {
      alert("Erro ao entrar em contato", error);
    } finally {
      setLoading(false); // Desativa o loading após a requisição
    }
  };

  useEffect(() => {
    todashouse();
  }, [order]); // Atualiza a lista de casas quando o filtro é alterado

  return (
    <>
      <HeaderComponents onSearch={handleSearch} />

      <ContainerHome>
        {loading ? (
          // Exibe o loader enquanto está carregando
          <BarLoader color="#36d7b7" width="100%" />
        ) : (
          <>
            <Flex>
              <h3>Ordenar por:</h3>
              <Select onChange={handleOrderChange}>
                <option value="">Selecione</option>
                <option value="relevante">Mais relevante</option>
                <option value="menorPreco">Menor preço</option>
                <option value="maiorPreco">Maior preço</option>
              </Select>
            </Flex>

            <Cards>
              {house && house.length > 0 ? (
                house.map((house) => (
                  <Card1 key={house._id}>
                    <img
                      src={house.images.length > 0 ? `https://myhouse1-1.onrender.com${house.images[0]}` : 'URL_DE_IMAGEM_PADRAO'}
                      alt="Imagem da casa"
                    />
                    <div className="details">
                      <h4>{house.title}</h4>
                      <p>{house.description}</p>
                      <p>Preço: {house.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                      <p>Localização: {house.location}</p>
                    </div>
                    <div className="buttons">
                      <button onClick={() => handleViewDetails(house)}>Ver Detalhes</button>
                      <button onClick={() => CriarChat(house._id)}>Entrar em Contato</button>
                    </div>
                  </Card1>
                ))
              ) : (
                <p>Não há publicações disponíveis no momento.</p>
              )}
            </Cards>

            {selectedHouse && (
              <Modal>
                <div className="modal-content">
                  <button className="close" onClick={handleCloseModal}>X</button>
                  <h2>{selectedHouse.title}</h2>
                  <div className="images">
                    {selectedHouse.images.map((image, index) => (
                      <img key={index} src={`https://myhouse1-1.onrender.com${image}`} alt={`Imagem ${index}`} />
                    ))}
                  </div>
                  <p>{selectedHouse.description}</p>
                  <p>Preço: R$ {selectedHouse.price}</p>
                </div>
              </Modal>
            )}
          </>
        )}
      </ContainerHome>
    </>
  );
};
