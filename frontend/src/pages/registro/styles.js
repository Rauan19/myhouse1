import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  font-family: Arial, Helvetica, sans-serif;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(135deg,#0d6efd , white);
  overflow: hidden;
  position: relative;
  @media (max-width: 768px) {
    background: linear-gradient(135deg, #0d6efd, white);
  }
`;

export const Content = styled.div`
  background: rgba(255, 255, 255, 0.9);
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
  width: 80%;
  max-width: 400px;
  position: relative;
  animation: fadeIn 1s ease-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const Greeting = styled.h1`
  font-size: 24px;
  color:  #0d6efd;
  text-align: center;
  margin-bottom: 20px;
  animation: bounceIn 1s ease-out;
  
  @keyframes bounceIn {
    0% {
      opacity: 0;
      transform: translateY(-30px);
    }
    60% {
      opacity: 1;
      transform: translateY(10px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const Label = styled.label`
  font-size: 14px;
  color:  #0d6efd;
`;

export const Input = styled.input`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
  width: 93%;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #1a2a6c;
    outline: none;
  }
`;

export const Button = styled.button`
  padding: 10px;
  background-color:  #0d6efd;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #142a5d;
  }
`;

export const ForgotPassword = styled.a`
  color: #1a2a6c;
  text-align: center;
  font-size: 14px;
  display: block;
  margin-top: 10px;
  text-decoration: none;
  transition: color 0.3s ease;

  &:hover {
    color: #0f1b3d;
  }
`;

export const SignUpLink = styled.a`
  color: #1a2a6c;
  text-align: center;
  font-size: 14px;
  display: block;
  margin-top: 10px;
  text-decoration: none;
  font-weight: bold;
  transition: color 0.3s ease;

  &:hover {
    color: #0f1b3d;
  }
`;