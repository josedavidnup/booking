import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import store from "./redux/app/store";
import { Provider } from "react-redux";
import "./index.css";
import axios from "axios";
axios.defaults.baseURL =
  import.meta.env.VITE_APP_API || "http://localhost:8080";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
