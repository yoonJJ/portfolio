import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../../api/authApi";

function LoginForm() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!userId || !password) {
      setError("아이디와 비밀번호를 모두 입력하세요.");
      return;
    }

    try {
      const { message, userName } = await login({ userId, password });
      if (message === "로그인 성공") {
        localStorage.setItem("userId", userId);
        localStorage.setItem("userName", userName);
        navigate("/");
      } else {
        setError("로그인 실패: 다시 시도해주세요.");
      }
    } catch (err) {
      setError(err.message || "로그인 중 오류가 발생했습니다.");
    }
  };

  return (
    <div style={styles.wrapper}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.title}>로그인</h2>

        <input
          type="text"
          placeholder="아이디"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
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

        <p style={styles.findText}>
          <Link to="/find-id" style={styles.link}>아이디 찾기</Link> |{" "}
          <Link to="/reset-password" style={styles.link}>비밀번호 찾기</Link>
        </p>

        <p style={styles.text}>
          계정이 없나요?{" "}
          <Link to="/signup" style={styles.link}>회원가입</Link>
        </p>
      </form>
    </div>
  );
}

const styles = {
  wrapper: {
    minHeight: "90vh",
    background: "#f9fafb",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "1rem",
  },
  form: {
    width: "100%",
    maxWidth: "360px",
    background: "#ffffff",
    padding: "2rem",
    borderRadius: "12px",
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)",
    display: "flex",
    flexDirection: "column",
    fontFamily: "'Inter', 'Segoe UI', sans-serif",
    color: "#333333",
  },
  title: {
    textAlign: "center",
    marginBottom: "1.5rem",
    fontSize: "1.8rem",
    fontWeight: "600",
  },
  input: {
    marginBottom: "1.25rem",
    padding: "0.75rem",
    borderRadius: "8px",
    border: "1px solid #ccc",
    background: "#fff",
    color: "#333",
    fontSize: "1rem",
    outline: "none",
    transition: "border-color 0.2s",
  },
  button: {
    padding: "0.75rem",
    borderRadius: "8px",
    border: "none",
    background: "linear-gradient(90deg, #6366f1, #4f46e5)",
    color: "#fff",
    fontWeight: "600",
    fontSize: "1rem",
    cursor: "pointer",
    transition: "opacity 0.2s, background-color 0.3s",
    marginBottom: "1rem",
  },
  error: {
    color: "#dc2626",
    backgroundColor: "#fee2e2",
    padding: "0.6rem",
    borderRadius: "6px",
    marginBottom: "1rem",
    fontWeight: "500",
    textAlign: "center",
    fontSize: "0.95rem",
  },
  findText: {
    fontSize: "0.85rem",
    textAlign: "center",
    color: "#555",
  },
  text: {
    marginTop: "0.25rem",
    marginBottom: "0.1rem",
    fontSize: "0.9rem",
    textAlign: "center",
    color: "#555555",
  },
  link: {
    color: "#6366f1",
    textDecoration: "none",
    fontWeight: "600",
  },
};

export default LoginForm;
