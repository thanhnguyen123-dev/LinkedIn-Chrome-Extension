import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { fetchConnections } from "./connection.ts";

const root = document.createElement("div");
root.id = "crx-root";
document.body.appendChild(root);

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

fetchConnections()
.then((data) => {
  console.log(data);
})
.catch((error) => {
  console.error(error);
});

