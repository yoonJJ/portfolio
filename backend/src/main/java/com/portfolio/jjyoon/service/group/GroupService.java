package com.portfolio.jjyoon.service.group;

import com.portfolio.jjyoon.domain.Group;
import com.portfolio.jjyoon.dto.group.GroupCreateRequest;
import com.portfolio.jjyoon.repository.group.GroupRepository;
import com.portfolio.jjyoon.util.SecurityUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class GroupService {

    private final GroupRepository groupRepository;

    public Group createGroup(GroupCreateRequest request) {
        String currentUserId = SecurityUtil.getCurrentUserId();
        if (currentUserId == null) {
            throw new IllegalStateException("로그인이 필요합니다.");
        }

        Group group = Group.builder()
                .groupName(request.getGroupName())
                .createdBy(currentUserId)
                .createdAt(LocalDateTime.now())
                .build();

        return groupRepository.save(group);
    }
}
