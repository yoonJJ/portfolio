// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        {/* 다른 페이지들 예: <Route path="/" element={<HomePage />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
