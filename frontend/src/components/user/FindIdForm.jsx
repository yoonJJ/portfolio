import React, { useState } from "react";
import { findUserId } from "../../api/authApi";
import { useNavigate } from "react-router-dom";

function FindIdForm() {
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setResult(null);

    if (!email || !userName) {
      setError("이메일과 이름을 모두 입력하세요.");
      return;
    }

    try {
      const data = await findUserId({ email, userName });
      setResult(data.userId);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h2 style={styles.title}>아이디 찾기</h2>

      <input
        type="email"
        placeholder="이메일"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={styles.input}
      />
      <input
        type="text"
        placeholder="이름"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        style={styles.input}
      />

      {error && <div style={styles.error}>{error}</div>}

      {result ? (
        <>
          <div style={styles.result}>찾은 아이디: {result}</div>
          <div style={styles.buttonGroup}>
            <button
              type="button"
              style={styles.loginButton}
              onClick={() => navigate("/reset-password")}
            >
              비밀번호 찾기
            </button>
            <button
              type="button"
              style={styles.loginButton}
              onClick={() => navigate("/login")}
            >
              로그인하러 가기
            </button>
          </div>
        </>
      ) : (
        <button type="submit" style={styles.button}>
          아이디 찾기
        </button>
      )}
    </form>
  );
}

const styles = {
  form: {
    maxWidth: "360px",
    margin: "3rem auto",
    padding: "2rem",
    background: "#fff",
    borderRadius: "12px",
    boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
    fontFamily: "'Inter', 'Segoe UI', sans-serif",
    color: "#333",
    display: "flex",
    flexDirection: "column",
  },
  title: {
    fontSize: "1.8rem",
    fontWeight: "600",
    marginBottom: "1.5rem",
    textAlign: "center",
  },
  input: {
    marginBottom: "1rem",
    padding: "0.75rem",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "1rem",
    outline: "none",
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
    marginTop: "0.5rem",
  },
  loginButton: {
    padding: "0.6rem 1rem",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#4f46e5",
    color: "#fff",
    fontWeight: "600",
    fontSize: "1rem",
    cursor: "pointer",
    margin: "0 0.5rem",
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "center",
    marginTop: "1rem",
  },
  error: {
    color: "#dc2626",
    marginBottom: "1rem",
    textAlign: "center",
    fontWeight: "500",
  },
  result: {
    color: "#2563eb",
    marginBottom: "0.5rem",
    textAlign: "center",
    fontWeight: "600",
  },
};

export default FindIdForm;
