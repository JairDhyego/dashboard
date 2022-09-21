import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

interface IcontainerProps {
  menuIsOpen: boolean;
}

export const Container = styled.div<IcontainerProps>`
  grid-area: AS;
  padding-left: 20px;
  border-right: 1px solid ${({ theme }) => theme.colors.gray};
  background: ${({ theme }) => theme.colors.secondary};

  position: relative;

  @media (max-width: 600px) {
    padding-left: 7px;
    position: fixed;
    z-index: 2;
    width: 170px;

    height: ${(props) => (props.menuIsOpen ? "100vh" : "70px")};
    overflow: hidden;

    ${(props) =>
      !props.menuIsOpen &&
      css`
        border: none;
        border-bottom: 1px solid ${(props) => props.theme.colors.gray};
      `};
  }
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  height: 70px;
`;

export const Title = styled.h3`
  color: ${({ theme }) => theme.colors.white};
  margin-left: 10px;

  @media (max-width: 600px) {
    width: 110px;
    font-size: 14px;
    margin-left: 5px;

    display: none;
  }
`;

export const LogImg = styled.img`
  height: 40px;
  width: 40px;

  @media (max-width: 600px) {
    display: none;
  }
`;

export const MenuContainer = styled.nav`
  margin-top: 50px;

  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const MenuItemLink = styled(Link)`
  color: ${({ theme }) => theme.colors.info};
  text-decoration: none;
  transition: 0.4s;
  margin: 7px 0px;

  display: flex;
  align-items: center;

  &:hover {
    opacity: 0.7;
  }
  > svg {
    font: 18px;
    margin-right: 5px;
  }
`;

export const MenuItemButton = styled.button`
  font-size: 16px;
  border: none;
  background: none;
  color: ${({ theme }) => theme.colors.info};
  transition: 0.4s;
  margin: 7px 0px;

  display: flex;
  align-items: center;

  &:hover {
    opacity: 0.7;
  }

  > svg {
    font: 18px;
    margin-right: 5px;
  }
`;

export const ToggleMenu = styled.button`
  width: 40px;
  height: 40px;
  display: none;

  border-radius: 5px;
  font-size: 22px;
  background-color: ${(props) => props.theme.colors.warning};
  color: ${(props) => props.theme.colors.white};

  transition: 0.3s;

  &:hover {
    opacity: 0.7;
  }

  @media (max-width: 600px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

interface IThemeFooter {
  menuIsOpen: boolean;
}

export const ThemeToggleFooter = styled.footer<IThemeFooter>`
  display: none;
  position: absolute;
  bottom: 30px;

  @media (max-width: 470px) {
    display: ${(props) => (props.menuIsOpen ? "flex" : "none")};
  }
`;
