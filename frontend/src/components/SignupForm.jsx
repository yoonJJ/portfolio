import React, { useState } from "react";
import { signup } from "../api/authApi";
import { useNavigate, Link } from "react-router-dom";

function SignupForm() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setError("");
    setSuccessMsg("");
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");

    if (!form.username || !form.email || !form.password) {
      setError("모든 필드를 입력해주세요.");
      return;
    }

    // 간단 이메일 형식 체크 (정규식)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setError("올바른 이메일 주소를 입력하세요.");
      return;
    }

    try {
      await signup(form);
      setSuccessMsg("회원가입 성공! 로그인 페이지로 이동합니다.");
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      setError(err.message || "회원가입 중 오류가 발생했습니다.");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h2 style={styles.title}>회원가입</h2>

      <input
        name="username"
        value={form.username}
        onChange={handleChange}
        placeholder="아이디"
        style={styles.input}
        autoComplete="username"
      />
      <input
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="이메일"
        style={styles.input}
        autoComplete="email"
        type="email"
      />
      <input
        name="password"
        type="password"
        value={form.password}
        onChange={handleChange}
        placeholder="비밀번호"
        style={styles.input}
        autoComplete="new-password"
      />

      {error && <div style={styles.error}>{error}</div>}
      {successMsg && <div style={styles.success}>{successMsg}</div>}

      <button type="submit" style={styles.button}>
        회원가입
      </button>

      <p style={styles.text}>
        이미 계정이 있나요?{" "}
        <Link to="/login" style={styles.link}>
          로그인
        </Link>
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
  title: {
    textAlign: "center",
    marginBottom: "1.5rem",
    color: "#333",
  },
  input: {
    marginBottom: "1rem",
    padding: "0.6rem",
    fontSize: "1rem",
    borderRadius: "4px",
    border: "1px solid #bbb",
    outline: "none",
    transition: "border-color 0.3s",
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
    marginTop: "0.5rem",
  },
  error: {
    color: "#d93025",
    marginBottom: "1rem",
    fontWeight: "600",
    fontSize: "0.9rem",
    textAlign: "center",
  },
  success: {
    color: "#2e7d32",
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

export default SignupForm;
