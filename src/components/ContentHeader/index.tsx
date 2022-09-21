import React from "react";

import { Container, TitleContainer, Controllers } from "./styles";

interface IContentHeader {
  title: string;
  lineColor: string;
  children: React.ReactNode;
}

const ContentHeader = ({ title, lineColor, children }: IContentHeader) => (
  <Container>
    <TitleContainer lineColor={lineColor}>
      <h3>{title}</h3>
    </TitleContainer>
    <Controllers>{children}</Controllers>
  </Container>
);

export default ContentHeader;
