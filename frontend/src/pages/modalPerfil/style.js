import styled from "styled-components";

export const ContenerModal = styled.div`
  width: 100%;
  height: 100vh;
  background: linear-gradient(to bottom right, #e0eafc, #cfdef3);
  font-family: 'Roboto', sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  overflow: hidden;

 

  h2 {
    
    color: #0d6efd;
    font-size: 24px;
  }
`;

export const Perfil = styled.div`
  width: 370px;
  height: 200px;
  background: linear-gradient(to right,   #f0f0f0, #2575fc);
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  justify-content: center;
  border-radius: 15px;
  margin-bottom: 20px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
 top: 10px;
 position: relative;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }

  label {
    background-color: #ffffff;
    padding: 1px;
    border-radius: 8px;
    
    font-weight: bold;
    cursor: pointer;
    
    transition: background-color 0.3s ease, color 0.3s ease;

    &:hover {
      opacity:80% ;
      color: white;
    }
  }
  button{
    background-color: red;
    margin-bottom: 3px;
    cursor: pointer;
    padding: 2px 5px;
    color: white;
    font-weight: 600;
    border: none;
    border-radius: 5px;
  }
`;

export const IMGPERFIL = styled.div`
  width: 100px;
  border-radius: 10px;
  height: 100px;
  display: flex;
  padding: 2px;
  font-size: 30px;
  align-items: center;
  justify-content: center;
  color: #2c3c8e;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.2);

  img{
    width: 100%;
    
    height: 90%;
  }
`;

export const MinhasPublis = styled.div`
  width: 100%;
  height: 80vh;
  font-family: 'Roboto', sans-serif;
  overflow-y: auto;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  padding-top: 10px;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #2c3c8e;
    border-radius: 10px;
  }
`;

export const CardPerfil = styled.div`
  width: 340px;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: auto;
  padding: 15px;
  border: none;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  position: relative;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  }

  img {
    width: 100%;
    height: 200px;
    border-radius: 10px;
    object-fit: cover;
    margin-bottom: 15px;
  }

  .details {
    padding: 15px;
    text-align: center;

    h4 {
      margin-bottom: 10px;
      color:#0d6efd;
    }

    p {
      color: #6c757d;
      margin-bottom: 5px;
    }
  }

  button {
    padding: 10px 15px;
    background-color: #0d6efd;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
      background-color: #1f2a5c;
    }
  }
`;
