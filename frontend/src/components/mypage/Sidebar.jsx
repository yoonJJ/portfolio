import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";

function Sidebar({ isOpen, toggleSidebar, onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
    navigate("/login");
  };

  return (
    <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
      {/* PC 전용 토글 버튼 */}
      <button className="toggle-btn desktop-only" onClick={toggleSidebar}>
        {isOpen ? "×" : "☰"}
      </button>

      {isOpen && (
        <>
          <nav className="sidebar-links">
            <Link to="/">홈</Link>
            <Link to="/mypage">대시보드</Link>
            <Link to="/group">그룹 관리</Link>
            <Link to="/todo">투두리스트</Link>
            <Link to="/budget">예산 관리</Link>
          </nav>

          <div className="sidebar-footer">
            <button className="logout-button" onClick={handleLogout}>
              <FiLogOut style={{ verticalAlign: "middle", marginRight: 8 }} />
              로그아웃
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Sidebar;
