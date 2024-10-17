import { useState, useEffect } from "react";
import io from "socket.io-client";
import { api } from "../../services/api";

const socket = io("https://myhouse1-1.onrender.com"); // Substitua pela URL do seu servidor
import {
  ChatContainer,
  UsersSidebar,
  ChatArea,
  ChatHeader,
  MessagesContainer,
  ChatInputContainer,
  Input,
  SendButton,
} from "./styleChat";

export const PageChat = () => {
  const [chatId, setChatId] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [chats, setChats] = useState([]);
  const [otherUserName, setOtherUserName] = useState(""); // Estado para armazenar o nome do outro usuário
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // Estado de loading

  // Função para buscar mensagens
  const fetchMessages = async () => {
    if (chatId) {
      setLoading(true); // Ativar loading
      try {
        const session = JSON.parse(localStorage.getItem("house"));
        const response = await api.get(`/chat/${chatId}`, {
          headers: {
            Authorization: `Bearer ${session.token}`,
            "Content-Type": "multipart/form-data",
          },
        });

        if (response.data && Array.isArray(response.data)) {
          setMessages(response.data);
        } else {
          setError("Nenhuma mensagem encontrada.");
        }
      } catch (error) {
        console.error("Erro ao buscar as mensagens", error);
        setError("Não foi possível carregar as mensagens.");
      } finally {
        setLoading(false); // Desativar loading após a busca
      }
    }
  };

  useEffect(() => {
    const fetchChats = async () => {
      setLoading(true); // Ativar loading
      try {
        const session = JSON.parse(localStorage.getItem("house"));
        const userId = session?.subject;

        const response = await api.get(`/chats/${userId}`, {
          headers: {
            Authorization: `Bearer ${session.token}`,
            "Content-Type": "multipart/form-data",
          },
        });

        if (response.data && Array.isArray(response.data)) {
          setChats(response.data);
        } else {
          setError("Nenhum chat encontrado.");
        }
      } catch (error) {
        console.error("Erro ao buscar os chats", error);
        setError("Não foi possível carregar os chats.");
      } finally {
        setLoading(false); // Desativar loading após a busca
      }
    };
    fetchChats();
  }, []);

  useEffect(() => {
    fetchMessages();
  }, [chatId]);

  useEffect(() => {
    if (chatId) {
      socket.emit("join", chatId);

      const handleMessage = (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      };

      socket.on("message", handleMessage);

      return () => {
        socket.off("message", handleMessage);
        socket.emit("leave", chatId);
      };
    }
  }, [chatId]);

  const handleSelectChat = (chat) => {
    setChatId(chat._id);

    // Atualizar o nome do outro usuário
    const session = JSON.parse(localStorage.getItem("house"));
    const loggedInUserId = session?.subject;

    const otherUser =
      chat.ownerId._id === loggedInUserId
        ? chat.userId.name
        : chat.ownerId.name;

    setOtherUserName(otherUser); // Armazena o nome do outro usuário
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    try {
      if (message.trim() !== "" && chatId) {
        const session = JSON.parse(localStorage.getItem("house"));
        const userId = session?.subject;

        socket.emit("sendMessage", {
          chatId: chatId,
          text: message,
          sender: userId,
        });

        await api.post(
          `/chat/${chatId}/mensagem`,
          {
            text: message,
            senhaId: userId, // Corrigido para senderId
          },
          {
            headers: {
              Authorization: `Bearer ${session.token}`,
              "Content-Type": "application/json", // Aqui troquei para JSON já que não parece ser multipart
            }
          }
        );

        setMessage("");

        // Chamar a função fetchMessages após enviar a mensagem
        fetchMessages();
      }
    } catch (error) {
      alert("Erro ao enviar mensagem");
      console.error("Erro ao enviar a mensagem", error);
    }
  };

  return (
    <ChatContainer>
      <UsersSidebar>
        <h2>Chats</h2>
        {loading && <p>Carregando...</p>} {/* Exibe mensagem de loading */}
        {error && <div className="error">{error}</div>}
        <ul>
          {chats.length > 0 ? (
            chats.map((chat) => {
              const session = JSON.parse(localStorage.getItem("house"));
              const loggedInUserId = session?.subject;

              const otherUserName =
                chat.ownerId._id === loggedInUserId
                  ? chat.userId.name
                  : chat.ownerId.name;

              return (
                <li key={chat._id} onClick={() => handleSelectChat(chat)}>
                  {otherUserName}
                </li>
              );
            })
          ) : (
            <li></li>
          )}
        </ul>
      </UsersSidebar>

      <ChatArea>
        <ChatHeader>
          <h3>{chatId ? `Conversa com ${otherUserName}` : "Selecione um chat"}</h3>
        </ChatHeader>

        <MessagesContainer
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "10px",
            height: "100%",
            overflowY: "auto",
          }}
        >
          {loading ? (
            <p>Carregando mensagens...</p> // Exibe mensagem de loading ao carregar mensagens
          ) : (
            messages.map((msg, index) => {
              const session = JSON.parse(localStorage.getItem("house"));
              const userId = session?.subject; // ID do usuário logado

              const isUserSender = msg.sender._id === userId; // Verifica se o usuário logado é o remetente da mensagem

              return (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    justifyContent: isUserSender ? "flex-end" : "flex-start", // Alinha à direita se for o remetente, à esquerda se for o destinatário
                    marginBottom: "10px",
                  }}
                >
                  <div
                    style={{
                      backgroundColor: isUserSender ? "#DCF8C6" : "#FFFFFF", // Cor diferente para mensagens enviadas e recebidas
                      color: "#000",
                      padding: "10px",
                      marginLeft: isUserSender ? "20px" : "20px",
                      borderRadius: "20px",

                      maxWidth: "60%",
                      wordWrap: "break-word",
                      boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.2)",
                      justifyContent: isUserSender ? "flex-end" : "flex-start",
                      borderBottomRightRadius: isUserSender ? "5px" : "20px", // Borda arredondada de acordo com o lado
                      borderBottomLeftRadius: !isUserSender ? "5px" : "20px",
                    }}
                  >
                    {msg.text}, {msg.name}
                    <br />
                    <small>{new Date(msg.createdAt).toLocaleString()}</small>{" "}
                    {/* Data e hora da mensagem */}
                  </div>
                </div>
              );
            })
          )}
        </MessagesContainer>

        {chatId && (
          <ChatInputContainer onSubmit={handleSendMessage}>
            <Input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Digite sua mensagem..."
            />
            <SendButton type="submit">Enviar</SendButton>
          </ChatInputContainer>
        )}
      </ChatArea>
    </ChatContainer>
  );
};
