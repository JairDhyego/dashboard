import React from "react";

import { Container } from "./styles";

interface Props {
  children: React.ReactNode;
}

const Content: React.FC<Props> = ({ children }) => {
  return (
    <Container>
      <h1>{children}</h1>
    </Container>
  );
};

export default Content;
