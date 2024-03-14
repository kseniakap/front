'use client'

import { useIsAdminPanel } from "@/hooks/useIsAdminPanel";
import Header from "@/ui/header/Header";
import MenuPanelAdmin from "@/ui/menuPanelAdmin/MenuPanelAdmin";
import {FC,  ReactNode } from "react";
import Container from "react-bootstrap/Container";
import 'bootstrap/dist/css/bootstrap.min.css';

type ContainerProps = {
  children: ReactNode;
};

const MainContainer: FC<ContainerProps> = ({ children }) => {
  const {isAdminPanel} = useIsAdminPanel()
  return (
    <Container>
      <div className="container-md" style={{ position: "relative" }}>
       
          {isAdminPanel ?  (
            <div style={{display:'flex', gap:"50px"}}>
              <MenuPanelAdmin/>
              <>{children} </>  
            </div>
          ) : children}
              
      </div>
    </Container>
  );
};

export default MainContainer;