import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import DBContextProvider from "./context/DBContext";
import ModalsContextProvider from "./context/ModalsContext";

import "bootstrap/dist/css/bootstrap.min.css";

ReactDOM.render(
  <React.StrictMode>
    <DBContextProvider>
      <ModalsContextProvider>
        <App />
      </ModalsContextProvider>
    </DBContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
