import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
// 글로벌 CSS 파일이 있다면 여기에 import 합니다.
// import './index.css';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);