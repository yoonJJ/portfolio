import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { resetPassword } from "../../api/authApi";

function ResetPasswordForm({ token }) {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (newPassword !== confirmPassword) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      const message = await resetPassword({ token, newPassword });
      setMessage(message);
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h2 style={styles.title}>비밀번호 재설정</h2>

      <input
        type="password"
        placeholder="새 비밀번호"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        style={styles.input}
      />
      <input
        type="password"
        placeholder="비밀번호 확인"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        style={styles.input}
      />

      {error && <div style={styles.error}>{error}</div>}
      {message && <div style={styles.message}>{message}</div>}

      <button type="submit" style={styles.button}>비밀번호 변경</button>
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
  },
  error: {
    color: "#dc2626",
    marginBottom: "1rem",
    textAlign: "center",
    fontWeight: "500",
  },
  message: {
    color: "#2563eb",
    marginBottom: "1rem",
    textAlign: "center",
    fontWeight: "600",
  },
};

export default ResetPasswordForm;
