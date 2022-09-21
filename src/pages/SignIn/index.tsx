import React, { useState } from "react";
import logoImg from "../../assets/logo.svg";
import Input from "../../components/Input";
import { useAuth } from "../../hooks/auth";
import Button from "./../../components/Button/index";

import { Container, Logo, Form, FormTitle } from "./styles";

const SignIn: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { signIn } = useAuth();

  return (
    <Container>
      <Logo>
        <img src={logoImg} alt="Minha carteira" />
        <h2>Minha carteira</h2>
      </Logo>

      <Form onSubmit={() => signIn(email, password)}>
        <FormTitle>Entrar</FormTitle>
        <Input
          required
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          required
          type="password"
          placeholder="Senha"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit">Acessar</Button>
      </Form>
    </Container>
  );
};

export default SignIn;
