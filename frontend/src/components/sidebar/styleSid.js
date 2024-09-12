import styled from 'styled-components';

// Estilo para a barra lateral
export const ContenerBar = styled.aside`
  width: 60px;
  height: 100vh;
  background-color: #0d6efd;
  display: flex;
  z-index: 12;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed; /* Sidebar fixo na lateral no desktop */

  @media (max-width: 700px) {
    width: 100%; 
    height: 60px; 
    bottom: 0; 
    top: auto; /* Sidebar no rodapé no mobile */
    z-index: 13;
    flex-direction: row; /* Organiza os ícones horizontalmente no mobile */
  }
`;

export const Nav = styled.nav`
  height: 80vh;
  width: 58px;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 700px) {
    height: 100%; /* Garante que os ícones fiquem centralizados verticalmente no mobile */
    width: auto;
    flex-direction: row;
    gap: 12px;
    margin-right:10px;
  }
`;

export const IconWrapper = styled.div`
  color: white;
  cursor: pointer;
  transition: color 0.3s ease;
  font-size: 28px;
  display: flex;
  flex-direction: column;
  align-items: center;
  p{
    font-size: 17px;
    font-family: Arial, Helvetica, sans-serif;
  }
  
  &:hover {
    color: #00ffff; /* Mudar cor ao passar o mouse */
  }

  @media (max-width: 700px) {
    font-size: 30px;
  }
`;

export const Espaco = styled.div`
  margin-top: 50px;

  @media (max-width: 700px) {
    margin-top: 0;
  }
`;

export const EspacoCurto = styled.div`
  margin-top: 20px;

  @media (max-width: 700px) {
    margin-top: 0;
  }
`;

export const EspacoGrande = styled.div`
  margin-top: 50vh;

  @media (max-width: 700px) {
    margin-top: 0;
  }
`;

// Estilo para o modal
export const Modal = styled.div`
  position: fixed;
  font-family: Arial, Helvetica, sans-serif;
  top: 0;
  left: 0;
  z-index: 12;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  color: #0d6efd;
`;

export const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 90%;
  max-width: 600px;
  position: relative;
  overflow: auto;
  max-height: 80vh; /* Garante que o modal não ultrapasse a altura da tela */
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background:    #0d6efd;
  color: white;
  border: none;
  border-radius: 30%;
  cursor: pointer;
  padding: 5px 10px;
  font-size: 16px;

  &:hover {
    background: #007777;
  }
`;

// Estilo para o formulário dentro do modal
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;

  label {
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
  }

  input, textarea {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
  }

  textarea {
    resize: vertical; /* Permite redimensionar verticalmente */
    min-height: 100px; /* Altura mínima para textarea */
  }

  button {
    padding: 10px;
    background-color: #0d6efd ;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
      background-color: #007777;
    }
  }
`;
