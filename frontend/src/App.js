import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import MainPage from "./pages/MainPage";

import LoginPage from "./pages/user/LoginPage";
import SignupPage from "./pages/user/SignupPage";
import FindIdPage from "./pages/user/FindIdPage";
import ResetPasswordRequestPage from "./pages/user/ResetPasswordRequestPage";
import ResetPasswordPage from "./pages/user/ResetPasswordPage";
import GroupPage from "./pages/group/GroupPage";
import MyPage from "./pages/user/MyPage";

import { checkSession } from "./api/authApi";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkSession()
      .then((data) => {
        setUser(data);
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

  if (loading) return <div>로딩 중...</div>;

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage user={user} />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/find-id" element={<FindIdPage />} />
        <Route path="/reset-password" element={<ResetPasswordRequestPage />} />
        <Route path="/reset-password/confirm" element={<ResetPasswordPage />} />
        <Route path="/group" element={<GroupPage />} />
        <Route path="/mypage" element={<MyPage />} />
      </Routes>
    </Router>
  );
}

export default App;
