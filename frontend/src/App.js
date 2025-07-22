import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import MainPage from "./pages/MainPage";
import { checkSession } from "./api/authApi";

function App() {
  const [user, setUser] = useState(null); // 로그인 유저 상태
  const [loading, setLoading] = useState(true); // 세션 체크 중 여부

  useEffect(() => {
    checkSession()
      .then((data) => {
        setUser(data); // userId, userName 포함
        localStorage.setItem("userId", data.userId);
        localStorage.setItem("userName", data.userName);
      })
      .catch(() => {
        setUser(null);
        localStorage.removeItem("userId");
        localStorage.removeItem("userName");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>로딩 중...</div>; // 세션 확인 중이면 아무것도 렌더링하지 않음

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/" element={<MainPage user={user} />} />
      </Routes>
    </Router>
  );
}

export default App;
