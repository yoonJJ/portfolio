package com.portfolio.jjyoon.repository.group;

import com.portfolio.jjyoon.domain.Group;
import com.portfolio.jjyoon.domain.GroupMember;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GroupMemberRepository extends JpaRepository<GroupMember, Long> {

    List<GroupMember> findByUserId(String userId);

    List<GroupMember> findByGroup(Group group);

    boolean existsByGroupAndUserId(Group group, String userId);
}
