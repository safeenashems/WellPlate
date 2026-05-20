import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "@mui/material/styles";
import { BrowserRouter } from "react-router-dom"; // ✅ used for routing
import { Provider } from "react-redux";  // ✅ Import Redux Provider,used for connecting Redux to React
import store from "./store"; // ✅ Import your Redux store,used for connecting Redux to React
import "./index.css";
import App from "./App.jsx";
import theme from "./theme";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>  {/* ✅ Wrap the app with Redux Provider */}
  {/*  <StrictMode> */}
    <ThemeProvider theme={theme}>
      <BrowserRouter>  {/* ✅ Wrap App in BrowserRouter */}
        <App />
      </BrowserRouter>
    </ThemeProvider>
  {/*  </StrictMode> */}
  </Provider>   
);
