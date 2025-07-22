import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../api/authApi";


function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");
  if (!username || !password) {
    setError("아이디와 비밀번호를 모두 입력하세요.");
    return;
  }

  try {
    const message = await login({ username, password }); // JSON 객체로 보냄
    if (message === "로그인 성공") {
      localStorage.setItem("username", username);
      navigate("/");
    } else {
      setError("로그인 실패: 다시 시도해주세요.");
    }
  } catch (err) {
    setError(err.message || "로그인 중 오류가 발생했습니다.");
  }
};

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h2 style={styles.title}>로그인</h2>

      <input
        type="text"
        placeholder="아이디"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={styles.input}
      />
      <input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={styles.input}
      />

      {error && <div style={styles.error}>{error}</div>}

      <button type="submit" style={styles.button}>로그인</button>

      <p style={styles.text}>
        계정이 없나요?{" "}
        <Link to="/signup" style={styles.link}>회원가입</Link>
      </p>
    </form>
  );
}

const styles = {
  form: {
    display: "flex",
    flexDirection: "column",
    width: "320px",
    margin: "80px auto",
    padding: "2rem",
    border: "1px solid #ccc",
    borderRadius: "8px",
    background: "#f9f9f9",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  title: { textAlign: "center", marginBottom: "1.5rem", color: "#333" },
  input: {
    marginBottom: "1rem",
    padding: "0.6rem",
    fontSize: "1rem",
    borderRadius: "4px",
    border: "1px solid #bbb",
    outline: "none",
  },
  button: {
    padding: "0.7rem",
    backgroundColor: "#667eea",
    color: "white",
    border: "none",
    borderRadius: "6px",
    fontWeight: "600",
    cursor: "pointer",
    fontSize: "1rem",
  },
  error: {
    color: "#d93025",
    marginBottom: "1rem",
    fontWeight: "600",
    fontSize: "0.9rem",
    textAlign: "center",
  },
  text: {
    marginTop: "1rem",
    fontSize: "0.9rem",
    textAlign: "center",
    color: "#555",
  },
  link: {
    color: "#667eea",
    textDecoration: "none",
    fontWeight: "600",
  },
};

export default LoginForm;
