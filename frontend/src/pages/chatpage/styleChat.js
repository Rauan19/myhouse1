import styled from "styled-components";

// Container principal do chat
export const ChatContainer = styled.div`
  display: flex;
  height: 92vh;
  width: 100%;
  font-family: Arial, Helvetica, sans-serif;
  background-color: #f1f1f1;
`;

// Sidebar com a lista de usuários
export const UsersSidebar = styled.div`
  width: 25%;
  background-color: black ;
  color: white;
  padding: 10px;
  box-sizing: border-box;
  overflow-y: auto;

  h2 {
    margin-bottom: 20px;
    color:  #0d6efd;
  }

  ul {
    list-style: none;
    padding: 0;
    height: 82vh;
    overflow-y: auto;

    li {
      padding: 9px 3px;
      width: 90%;
      margin-top: 8px ;
      overflow: hidden;
      background-color:  #0d6efd;
      border-radius: 8px;
      cursor: pointer;
      transition: background-color 0.3s;
      &:hover {
        background-color: blue;
      }
    }
  }
`;

// Área da conversa
export const ChatArea = styled.div`
  width: 75%;
  background-color: white;
  display: flex;
  flex-direction: column;
  padding: 20px;
  box-sizing: border-box;
`;

// Cabeçalho da área da conversa
export const ChatHeader = styled.div`
  background-color: #0d6efd ;
  padding: 15px;
  color: white;
  border-bottom: 1px solid #ddd;
  h3 {
    margin: 0;
    overflow: hidden;
  }
`;

// Container para as mensagens
export const MessagesContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  height: 100%;
  overflow-y: auto;
`;

export const MessageContainer = styled.div`
  
`;

export const Message = styled.div`
   background-color: ${({ isSender }) => (isSender ? "#DCF8C6" : "#FFFFFF")}; // Verde para o remetente e branco para o destinatário
  color: #000;
  padding: 10px;
  border-radius: 20px;
  max-width: 60%;
  word-wrap: break-word;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.2);

  ${({ isSender }) => (isSender ? "border-bottom-right-radius: 5px;" : "border-bottom-left-radius: 5px;")}
`;


// Campo de texto e botão de envio
export const ChatInputContainer = styled.form`
  display: flex;
  height: 50px;
  width: 90%;
  padding: 5px;
  border-top: 1px solid #ddd;
  background-color: #f1f1f1;
`;

export const Input = styled.input`
  flex: 1;
  padding: 20px 10px;
  margin-bottom: 30px;
  border-radius: 5px;
  border: 1px solid #ddd;
  margin-right: 10px;
`;

export const SendButton = styled.button`
 height: 50px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;
