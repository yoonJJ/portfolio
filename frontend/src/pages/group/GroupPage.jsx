import React, { useEffect, useState } from "react";
import GroupCreateForm from "../../components/group/GroupCreateForm";
import GroupList from "../../components/group/GroupList";
import GroupMemberList from "../../components/group/GroupMemberList";

function GroupPage() {
  const [groups, setGroups] = useState([]);
  const [selectedGroupId, setSelectedGroupId] = useState(null);
  const [members, setMembers] = useState([]);
  const [error, setError] = useState(null);

  const fetchGroups = async () => {
    try {
      const res = await fetch("/api/groups", { credentials: "include" });
      if (!res.ok) throw new Error("그룹 목록을 불러오지 못했습니다.");
      const data = await res.json();
      setGroups(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleCreateGroup = async ({ groupName }) => {
    try {
      const res = await fetch("/api/groups", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          groupName,
          createdBy: localStorage.getItem("userId"),
        }),
      });
      if (!res.ok) throw new Error("그룹 생성 실패");
      const newGroup = await res.json();
      setGroups((prev) => [...prev, newGroup]);
    } catch (err) {
      throw err;
    }
  };

  const fetchGroupMembers = async (groupId) => {
    try {
      const res = await fetch(`/api/groups/${groupId}/members`, {
        credentials: "include",
      });
      if (!res.ok) throw new Error("멤버 목록을 불러오지 못했습니다.");
      const data = await res.json();
      setMembers(data);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  useEffect(() => {
    if (selectedGroupId) {
      fetchGroupMembers(selectedGroupId);
    } else {
      setMembers([]);
    }
  }, [selectedGroupId]);

  return (
    <div>
      <h1>그룹 관리</h1>
      <GroupCreateForm onCreate={handleCreateGroup} />
      {error && <p style={{ color: "red" }}>{error}</p>}
      <GroupList groups={groups} onSelect={setSelectedGroupId} />
      {selectedGroupId && (
        <>
          <h2>선택된 그룹 멤버</h2>
          <GroupMemberList members={members} />
        </>
      )}
    </div>
  );
}

export default GroupPage;
