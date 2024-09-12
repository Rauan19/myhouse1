import styled from "styled-components";

export const ContainerHome = styled.main`
  width: 100%;
  padding-top: 20px;
  height: 90vh;
  font-family: "Poppins", Arial, Helvetica, sans-serif;
  overflow: hidden;
  background-color: #e9ecef;
`;

export const Select = styled.select`
  padding: 8px 12px;
  margin-left: 10px;
  border: 2px solid #0d6efd;
  border-radius: 5px;
  font-family: "Poppins", Arial, Helvetica, sans-serif;
  cursor: pointer;
  background-color: #fff;
  color: #0d6efd;
  transition: all 0.3s ease;

  &:hover {
    background-color: #0d6efd;
    color: #fff;
  }
`;

export const Flex = styled.div`
  display: flex;
  margin-left: 65px;
  width: 260px;
  align-items: center;

  h3 {
    color: #0d6efd;
    font-weight: 600;
    margin-right: 10px;
  }
`;

export const Cards = styled.div`
  width: 100%;
  height: 85vh;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
  padding: 20px;
  box-sizing: border-box;
  overflow-y: auto;
`;

export const Card1 = styled.div`
  width: 350px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  }

  img {
    width: 100%;
    height: 220px;
    border-radius: 8px;
    object-fit: cover;
  }

  .details {
    padding: 10px 0;
    text-align: center;
    font-family: "Poppins", Arial, Helvetica, sans-serif;
    color: #333;

    h4 {
      font-size: 1.2rem;
      color: #0d6efd;
    }

    p {
      margin: 5px 0;
      color: #555;
    }
  }

  .buttons {
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 10px 0;
  }

  button {
    padding: 8px 16px;
    background-color: #0d6efd;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
      background-color: #0a58ca;
    }
  }
`;

export const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  overflow-x: auto;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;

  .modal-content {
    background: white;
    padding: 30px;
    border-radius: 12px;
    width: 90%;
    max-width: 600px;
    position: relative;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);

    h2 {
      margin-bottom: 20px;
      color: #0d6efd;
    }
  }

  .images {
    display: flex;
    overflow-x: auto;
    gap: 10px;
    margin-bottom: 20px;

   

    img {
      width: 120px;
      height: 120px;
      border-radius: 10px;
      object-fit: cover;

      &:hover {
        width: 50%;
        height: 130px;
      }
      
    }
  }

  .close {
    position: absolute;
    top: 15px;
    right: 15px;
    background: #dc3545;
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    padding: 8px 12px;
    font-size: 18px;
    transition: background-color 0.3s;

    &:hover {
      background-color: #c82333;
    }
  }
`;
