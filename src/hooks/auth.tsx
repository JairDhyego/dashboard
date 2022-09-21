import React, { createContext, useState, useContext } from "react";

interface IAuthProps {
  logged: boolean;
  signIn(email: string, password: string): void;
  signOut(): void;
}

const AuthContext = createContext<IAuthProps>({} as IAuthProps);

const AuthProvider: React.FC = ({ children }: any) => {
  const [logged, setLogged] = useState<boolean>(() => {
    const isLogged = localStorage.getItem("@minha-carteira:logged");

    return !!isLogged;
  });

  const signIn = (email: string, password: string) => {
    if (email === "SouUmBomProgramador@gmail.com" && password === "123456") {
      localStorage.setItem("@minha-carteira:logged", "true");
      setLogged(true);
    } else {
      alert("Senha ou usuário invalidos!");
    }
  };

  const signOut = () => {
    localStorage.removeItem("@minha-carteira:logged");
    setLogged(false);
  };

  return (
    <AuthContext.Provider value={{ logged, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): IAuthProps {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth };
