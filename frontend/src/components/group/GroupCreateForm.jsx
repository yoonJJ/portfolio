import React, { useState } from 'react';

function GroupCreateForm({ onCreate }) {
  const [groupName, setGroupName] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!groupName.trim()) {
      setError('그룹명을 입력하세요.');
      return;
    }
    setError(null);
    try {
      await onCreate({ groupName });
      setGroupName('');
    } catch (err) {
      setError(err.message || '그룹 생성 실패');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="그룹명 입력"
        value={groupName}
        onChange={(e) => setGroupName(e.target.value)}
      />
      <button type="submit">그룹 생성</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
}

export default GroupCreateForm;
