import React from "react";
import ReactDOM from "react-dom/client";
import { Global } from "./styles/Global";
import { App } from "./App";

import { ThemeProvider } from "./hooks/themes";
import { AuthProvider } from "./hooks/auth";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <Global />
        <App />
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);
