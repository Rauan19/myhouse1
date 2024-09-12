import { Route, Routes } from "react-router-dom";
import { MainPages } from "../pages/mainpage/mainpage";
import { Publicacoes } from "../pages/minhasPubli/Publi";
import LoginPage from "../pages/login/login";
import RegistroPage from "../pages/registro/registro";
import { ModalPerfil } from "../pages/modalPerfil/modal";
import { PageChat } from "../pages/chatpage/chat";

export const RoutesPages = () => {
  return (
    <Routes>
        <Route path="/login" element={<LoginPage/>} />
        <Route  path="/registro" element={<RegistroPage/>}   />
        <Route path="/" element={<MainPages />}>
        <Route path="/" element={<Publicacoes />} />
        <Route  path="/perfil" element={<ModalPerfil/>} />
        <Route  path="/chats" element={<PageChat/>}  />
      </Route>
    </Routes>
  );
};
