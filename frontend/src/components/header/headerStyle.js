import styled from "styled-components";

export const ContenerHeader = styled.header`
  width: 100%;
  height: 60px;
  background-color: #0d6efd;
  font-family: Arial, Helvetica, sans-serif;
  align-items: center;
  gap: 20px;
  display: flex;

  div {
    width: 80%;
  }
`;

export const MTitle = styled.h2`
  color: #ffffff;
  font-size: 22px;

  font-weight: bold;
  letter-spacing: 2px;
  margin-left: 14px;
 
`;

export const Butao = styled.button`
  padding: 3px 8px;
  border-radius: 4px;
  background-color: white;
  cursor: pointer;
`;

export const RTitle = styled.h2`
  font-size: 20px;
  color: #ffffff;
  font-weight: 700;
  text-transform: capitalize;
  letter-spacing: 1.5px;
  position: relative;

  &::after {
    content: '';
    width: 100%;
    height: 2px;
    background-color: #ff69b4; /* Linha decorativa abaixo do texto */
    transform: scaleX(0);
    transform-origin: bottom right;
    transition: transform 0.25s ease-out;
  }

  &:hover::after {
    transform: scaleX(1);
    
  }
`;

export const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;
  
`;

export const INPUT = styled.input`
  padding: 1px 20px;
  height: 28px;
  width: 70%;
  border-radius: 5px;
`;
