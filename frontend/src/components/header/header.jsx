import { ContenerHeader, MTitle, RTitle, Nav, INPUT, Butao } from "./headerStyle";
import { FaSearch } from "react-icons/fa";
import { useState } from "react";

export const HeaderComponents = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchClick = () => {
    onSearch(searchTerm); // Chama a função de busca passada por prop
  };

  return (
    <ContenerHeader>
      <Nav>
        <MTitle>Extra</MTitle>
        <RTitle>Public</RTitle>
      </Nav>
      <div>
        <INPUT 
          type="search" 
          placeholder="Buscar" 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)} 
        />
        <Butao onClick={handleSearchClick}>
          <FaSearch />
        </Butao>
      </div>
    </ContenerHeader>
  );
};
