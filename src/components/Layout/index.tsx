import React from "react";

import Aside from "../Aside";
import Content from "../Content";
import MainHeader from "../MainHeader";

interface Props {
  children: React.ReactNode;
}

import { Container } from "./styles";
const Layout: React.FC<Props> = ({ children }) => (
  <Container>
    <MainHeader />
    <Aside />
    <Content>{children}</Content>
  </Container>
);

export default Layout;
