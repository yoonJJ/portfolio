package com.portfolio.jjyoon.service.group;

import com.portfolio.jjyoon.domain.Group;
import com.portfolio.jjyoon.domain.GroupMember;
import com.portfolio.jjyoon.dto.group.GroupMemberInviteRequest;
import com.portfolio.jjyoon.repository.group.GroupMemberRepository;
import com.portfolio.jjyoon.repository.group.GroupRepository;
import com.portfolio.jjyoon.util.SecurityUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class GroupMemberService {

    private final GroupMemberRepository groupMemberRepository;
    private final GroupRepository groupRepository;

    public GroupMember inviteMember(GroupMemberInviteRequest request) {
        String currentUserId = SecurityUtil.getCurrentUserId();
        if (currentUserId == null) {
            throw new IllegalStateException("로그인이 필요합니다.");
        }

        Group group = groupRepository.findById(request.getGroupId())
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 그룹입니다."));

        // admin 권한 확인
        List<GroupMember> members = groupMemberRepository.findByGroup(group);
        boolean isAdmin = members.stream()
                .anyMatch(m -> m.getUserId().equals(currentUserId) && "admin".equals(m.getRole()));

        if (!isAdmin) {
            throw new IllegalStateException("초대 권한이 없습니다.");
        }

        // 이미 그룹에 속했는지 확인
        boolean exists = groupMemberRepository.existsByGroupAndUserId(group, request.getUserId());
        if (exists) {
            throw new IllegalStateException("이미 그룹에 속한 멤버입니다.");
        }

        GroupMember member = GroupMember.builder()
                .group(group)
                .userId(request.getUserId())
                .role(request.getRole() == null ? "member" : request.getRole())
                .joinedAt(LocalDateTime.now())
                .build();

        return groupMemberRepository.save(member);
    }
}
