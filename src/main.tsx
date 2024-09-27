import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { BrowserRouter } from "react-router-dom";

import "./index.css";

dayjs.extend(localizedFormat);

const mdTheme = createTheme();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={mdTheme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>{" "}
  </StrictMode>
);
