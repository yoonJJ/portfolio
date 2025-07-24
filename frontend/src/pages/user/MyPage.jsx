import React, { useEffect, useState } from "react";
import { getMyGroups } from "../../api/groupApi";

function MyPage() {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getMyGroups()
      .then((data) => setGroups(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>에러: {error}</div>;

  return (
    <div style={{ padding: "1rem" }}>
      <h2>내 그룹 목록</h2>
      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        {groups.length === 0 && <p>가입된 그룹이 없습니다.</p>}
        {groups.map((group) => (
          <div
            key={group.id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "1rem",
              width: "200px",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
            }}
          >
            <h3>{group.groupName}</h3>
            <p>생성자: {group.createdBy}</p>
            <p>생성일: {new Date(group.createdAt).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyPage;
