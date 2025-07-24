import React from 'react';

function GroupMemberList({ members }) {
  if (!members.length) return <div>그룹 멤버가 없습니다.</div>;

  return (
    <ul>
      {members.map(({ userId, role, joinedAt }) => (
        <li key={userId}>
          {userId} ({role}) - 가입일: {new Date(joinedAt).toLocaleDateString()}
        </li>
      ))}
    </ul>
  );
}

export default GroupMemberList;
