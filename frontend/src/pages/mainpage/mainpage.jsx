import { Outlet } from "react-router-dom";

import { StyleMainPage , Suport} from "./mainStyle";
import { Sidebar } from "../../components/sidebar/sidebar";

export const MainPages = () => {
  return (
    <StyleMainPage>
      <Suport>.</Suport>
      <Sidebar />
      <div className="main-content">
        
        <Outlet />
      </div>
    </StyleMainPage>
  );
};
