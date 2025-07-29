import React from "react";
import "../../styles/mypage.css";

function GroupCard({ group }) {
  return (
    <div className="group-card">
      <h3>{group.groupName}</h3>
      <p>그룹 ID: {group.id}</p>
      <p>생성자: {group.createdBy}</p>
      <p>생성일: {new Date(group.createdAt).toLocaleDateString()}</p>
    </div>
  );
}

export default GroupCard;
