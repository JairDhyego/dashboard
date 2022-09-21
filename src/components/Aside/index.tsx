import React, { useState } from "react";
import logoImg from "../../assets/logo.svg";

import Toggle from "../Toggle";

import { useAuth } from "../../hooks/auth";
import { useTheme } from "../../hooks/themes";

import {
  MdDashboard,
  MdArrowDownward,
  MdArrowUpward,
  MdExitToApp,
  MdClose,
  MdMenu,
} from "react-icons/md";

import {
  Container,
  Header,
  LogImg,
  MenuContainer,
  MenuItemLink,
  MenuItemButton,
  Title,
  ToggleMenu,
  ThemeToggleFooter,
} from "./styles";

const Aside: React.FC = () => {
  const { signOut } = useAuth();
  const { toggleTheme, theme } = useTheme();

  const [toggleMenuOpen, setToggleMenuOpen] = useState<boolean>(false);
  const [darkTheme, setDarkTheme] = useState(() =>
    theme.title === "dark" ? true : false
  );

  const handleToggleMenu = () => {
    setToggleMenuOpen(!toggleMenuOpen);
  };

  const handleChangeTheme = () => {
    setDarkTheme(!darkTheme);
    toggleTheme();
  };

  return (
    <Container menuIsOpen={toggleMenuOpen}>
      <Header>
        <ToggleMenu onClick={handleToggleMenu}>
          {toggleMenuOpen ? <MdClose /> : <MdMenu />}
        </ToggleMenu>

        <LogImg src={logoImg} alt="Logo minha carteira" />
        <Title>Minha carteira</Title>
      </Header>

      <MenuContainer>
        <MenuItemLink to="/">
          <MdDashboard /> DashBoard
        </MenuItemLink>

        <MenuItemLink to="/list/entry-balance">
          <MdArrowUpward /> Entradas
        </MenuItemLink>

        <MenuItemLink to="/list/exit-balance">
          <MdArrowDownward /> Saidas
        </MenuItemLink>

        <MenuItemButton onClick={signOut}>
          <MdExitToApp /> Sair
        </MenuItemButton>
      </MenuContainer>

      <ThemeToggleFooter menuIsOpen={toggleMenuOpen}>
        <Toggle
          labelLeft="Light"
          labelRight="Dark"
          checked={darkTheme}
          onChange={handleChangeTheme}
        />
      </ThemeToggleFooter>
    </Container>
  );
};

export default Aside;
