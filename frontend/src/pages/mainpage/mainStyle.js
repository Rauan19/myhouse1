import styled from "styled-components";

export const StyleMainPage = styled.main`
background-color:  #f0f0f0;
height: 88vh;
width: 100%;
display: flex;

.main-content {
    flex: 1; /* Isso permite que o conteúdo principal ocupe o espaço restante */
    
    
  }

`
export const Suport = styled.div`
background-color: yellow;
width: 52px;

@media (max-width: 890px) {
    display: none;
  }

`

