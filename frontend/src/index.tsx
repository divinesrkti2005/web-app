import React from "react";
import ReactDOM from "react-dom/client";
import { Helmet } from "react-helmet";
import App from "./App";
import "./index.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Helmet>
      <meta charSet="utf-8" />
      <title>Full-stack Todo Application</title>
    </Helmet>
    <App />
  </React.StrictMode>
);
