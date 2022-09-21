import React from "react";

import { Container } from "./styles";

interface Imessage {
  title: string;
  desc: string;
  footerText: string;
  icon: string; 
}

const MessageBox = ({ title, desc, footerText, icon }: Imessage) => {
  return (
    <Container>
      <header>
        <h3>
          {title}
          <img src={icon} alt={icon} />
        </h3>
        <p>{desc}</p>
      </header>

      <footer>
        <span>{footerText}</span>
      </footer>
    </Container>
  );
};

export default MessageBox;
