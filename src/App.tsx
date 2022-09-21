import React from "react";
import Routess from "./routes";
import { ThemeProvider } from "styled-components";
import { useTheme } from "./hooks/themes";

import { BrowserRouter } from "react-router-dom";
export const App: React.FC = () => {
  const { theme } = useTheme();

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Routess />
      </ThemeProvider>
    </BrowserRouter>
  );
};
