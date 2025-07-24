import React from 'react';

function GroupList({ groups, onSelect }) {
  if (!groups.length) return <div>가입된 그룹이 없습니다.</div>;

  return (
    <ul>
      {groups.map(({ id, groupName, createdBy }) => (
        <li key={id} onClick={() => onSelect(id)} style={{ cursor: 'pointer' }}>
          <strong>{groupName}</strong> - 생성자: {createdBy}
        </li>
      ))}
    </ul>
  );
}

export default GroupList;
