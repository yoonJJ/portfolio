import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../api/authApi"; // 로그아웃 함수 (직접 구현한 거)

function MainPage() {
  const username = localStorage.getItem("username"); // 로그인 시 저장한 사용자명
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout(); // 백엔드에 로그아웃 요청
      localStorage.removeItem("username"); // 로컬스토리지에서 사용자명 삭제
      navigate("/login"); // 로그인 페이지로 이동
    } catch (err) {
      alert("로그아웃 실패: " + err.message);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card} className="fade-in-up">
        {username ? (
          <>
            <h1 style={styles.title}>{username}님, 환영합니다!</h1>
            <p style={styles.text}>React + Spring Boot 연동 프로젝트에 오신 것을 환영합니다.</p>
            <button onClick={handleLogout} style={styles.logoutButton}>
              로그아웃
            </button>
          </>
        ) : (
          <>
            <h1 style={styles.title}>환영합니다!</h1>
            <p style={styles.text}>React + Spring Boot 연동 프로젝트에 오신 것을 환영합니다.</p>
            <p style={styles.text}>
              <Link to="/login" style={styles.loginButton}>
                로그인
              </Link>{" "}
              후 다양한 기능을 이용해보세요.
            </p>
          </>
        )}
      </div>

      <style>{`
        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .fade-in-up {
          animation: fadeInUp 0.8s ease forwards;
        }
        @media (max-width: 480px) {
          div[class^="fade-in-up"] {
            padding: 20px 30px !important;
            max-width: 90% !important;
          }
          h1 {
            font-size: 1.8rem !important;
          }
          p {
            font-size: 1rem !important;
          }
          a, button {
            padding: 8px 20px !important;
            font-size: 0.9rem !important;
          }
        }
      `}</style>
    </div>
  );
}

const styles = {
  page: {
    height: "100vh",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    padding: "20px",
  },
  card: {
    backgroundColor: "white",
    padding: "40px 60px",
    borderRadius: "15px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
    maxWidth: "400px",
    textAlign: "center",
  },
  title: {
    fontSize: "2.5rem",
    marginBottom: "20px",
    color: "#333",
  },
  text: {
    fontSize: "1.1rem",
    marginBottom: "15px",
    color: "#555",
  },
  loginButton: {
    display: "inline-block",
    backgroundColor: "#667eea",
    color: "white",
    padding: "10px 25px",
    borderRadius: "25px",
    textDecoration: "none",
    fontWeight: "600",
    boxShadow: "0 4px 12px rgba(102,126,234,0.4)",
    transition: "background-color 0.3s ease",
    border: "none",
    cursor: "pointer",
  },
  logoutButton: {
    padding: "10px 25px",
    backgroundColor: "#e53e3e",
    color: "white",
    border: "none",
    borderRadius: "25px",
    fontWeight: "600",
    cursor: "pointer",
    fontSize: "1rem",
    boxShadow: "0 4px 12px rgba(229, 62, 62, 0.4)",
    transition: "background-color 0.3s ease",
  },
};

export default MainPage;
