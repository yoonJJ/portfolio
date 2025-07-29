import React, { useState } from "react";
import Sidebar from "../../components/mypage/Sidebar";
import "../../styles/mypage.css";

function Mypage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // 모바일 화면 여부 체크용 (추가하면 렌더 때마다 window 읽음 주의)
  const isMobile = window.innerWidth <= 768;

  // mypage-content 클릭 시 사이드바 닫기 (모바일 + 사이드바 열렸을 때만)
  const handleContentClick = () => {
    if (isMobile && isSidebarOpen) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <div className={`mypage-container ${isSidebarOpen ? "sidebar-open" : ""}`}>
      {/* 모바일 전용 햄버거 버튼 */}
      <button
        className="mobile-menu-button"
        onClick={() => setIsSidebarOpen(true)}
      >
        ☰
      </button>

      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      {/* 모바일에서만 보이는 오버레이 (아래 영역에 추가해도 되고 없어도 무방) */}
      {isSidebarOpen && isMobile && (
        <div
          className="sidebar-overlay active"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      <div
        className={`mypage-content ${
          isSidebarOpen ? "with-sidebar" : "full-width"
        }`}
        onClick={handleContentClick}
      >
        <h1>My Page 대시보드</h1>
        <p>여기에 그룹 목록이나 활동 내역, 설정 등을 보여줄 수 있어요.</p>

        <div className="group-cards">
          <div className="group-card">
            <h3>정재와 아이들</h3>
          </div>
          <div className="group-card">
            <h3>Princess 인환</h3>
          </div>
          <div className="group-card">
            <h3>에코장인 김민혁</h3>
          </div>
          <div className="group-card">
            <h3>인경이의 메붕이들</h3>
          </div>
          <button className="add-group-btn" aria-label="그룹 추가">
            +
          </button>
        </div>
      </div>
    </div>
  );
}

export default Mypage;
