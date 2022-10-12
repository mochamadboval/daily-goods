import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./store/auth-context";
import { ProductsContextProvider } from "./store/products-context";

import App from "./App";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <AuthContextProvider>
    <ProductsContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ProductsContextProvider>
  </AuthContextProvider>
  // </React.StrictMode>
);
