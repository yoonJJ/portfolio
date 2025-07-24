import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../api/authApi";
import "../styles/main.css";

function MainPage() {
  const userName = localStorage.getItem("userName");
  const navigate = useNavigate();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [renderMobileMenu, setRenderMobileMenu] = useState(false); // 트랜지션 유지용
  const [isDarkMode, setIsDarkMode] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") {
      document.body.classList.add("dark");
      setIsDarkMode(true);
    }
  }, []);

  // 모바일 메뉴 상태 변경 시 renderMobileMenu 관리
  useEffect(() => {
    if (mobileMenuOpen) {
      setRenderMobileMenu(true);
      document.body.style.overflow = "hidden";
    } else {
      // 300ms 뒤에 DOM 제거 (CSS 트랜지션 duration과 맞춤)
      const timeout = setTimeout(() => setRenderMobileMenu(false), 300);
      document.body.style.overflow = "";
      return () => clearTimeout(timeout);
    }
  }, [mobileMenuOpen]);

  const toggleDarkMode = () => {
    const nextMode = !isDarkMode;
    setIsDarkMode(nextMode);
    if (nextMode) {
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      localStorage.removeItem("userName");
      setDropdownOpen(false);
      setMobileMenuOpen(false);
      navigate("/login");
    } catch (err) {
      alert("로그아웃 실패: " + err.message);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="main-page">
      <nav className="navbar">
        <div className="logo">JJYoon.dev</div>

        {/* 데스크탑 네비게이션 */}
        <ul className="nav-links">
          <li><Link to="/">홈</Link></li>
          <li><Link to="/todo">투두리스트</Link></li>
          <li><Link to="/budget">예산관리</Link></li>

          {userName ? (
            <li className="user-dropdown" ref={dropdownRef}>
              <div
                className="dropdown-toggle"
                onClick={() => setDropdownOpen((prev) => !prev)}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter") setDropdownOpen((prev) => !prev);
                }}
                role="button"
                aria-haspopup="true"
                aria-expanded={dropdownOpen}
              >
                {userName}님 ▼
              </div>

              {dropdownOpen && (
                <ul className="dropdown-menu">
                  <li><Link to="/mypage">My Page</Link></li>
                  <li><button onClick={handleLogout}>로그아웃</button></li>
                </ul>
              )}
            </li>
          ) : (
            <li><Link to="/login">로그인</Link></li>
          )}
        </ul>

        {/* 모바일 햄버거 버튼 */}
        <button
          className="mobile-menu-icon"
          onClick={() => {
            setMobileMenuOpen((prev) => !prev);
            setDropdownOpen(false);
          }}
          aria-label={mobileMenuOpen ? "모바일 메뉴 닫기" : "모바일 메뉴 열기"}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? "✕" : "☰"}
        </button>
      </nav>

      {/* 모바일 메뉴 닫기 버튼을 오버레이 밖에 고정 렌더링 */}
      {renderMobileMenu && (
        <>
          <button
            className={`mobile-nav-close-btn ${mobileMenuOpen ? "visible" : ""}`}
            onClick={() => setMobileMenuOpen(false)}
            aria-label="모바일 메뉴 닫기"
          >
            ✕
          </button>

          <div
            className={`mobile-nav-overlay ${mobileMenuOpen ? "open" : ""}`}
            role="dialog"
            aria-modal="true"
            aria-hidden={!mobileMenuOpen}
          >
            <nav className="mobile-nav-links">
              <Link to="/" onClick={() => setMobileMenuOpen(false)}>홈</Link>
              <Link to="/todo" onClick={() => setMobileMenuOpen(false)}>투두리스트</Link>
              <Link to="/budget" onClick={() => setMobileMenuOpen(false)}>예산관리</Link>

              {userName ? (
                <>
                  <Link to="/mypage" onClick={() => setMobileMenuOpen(false)}>My Page</Link>
                  <button onClick={handleLogout}>로그아웃</button>
                </>
              ) : (
                <Link to="/login" onClick={() => setMobileMenuOpen(false)}>로그인</Link>
              )}
            </nav>
          </div>
        </>
      )}

      {/* 메인 콘텐츠 영역 */}
      <main className="main-content fade-in-up">
        <h1>환영합니다{userName && `, ${userName}`}!</h1>
        <p>React + Spring Boot 연동 프로젝트에 오신 걸 환영합니다.</p>
      </main>

      {/* 다크모드 토글 버튼 */}
      <button className="dark-mode-button" onClick={toggleDarkMode}>
        {isDarkMode ? "Light" : "Dark"}
      </button>
    </div>
  );
}

export default MainPage;
