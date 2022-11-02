import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import GlobalStyle from "./GlobalStyle";

const { worker } = require("./mocks/browser");
worker.start();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <GlobalStyle />
    <App />
  </React.StrictMode>
);
