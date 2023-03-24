import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/global.css";

import { createTheme, ThemeProvider } from "@mui/material/styles";

import store from "./store";

import { Provider } from "react-redux";

const theme = createTheme();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Provider>
);
