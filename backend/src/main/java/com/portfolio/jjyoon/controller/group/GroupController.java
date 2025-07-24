package com.portfolio.jjyoon.controller.group;

import com.portfolio.jjyoon.domain.Group;
import com.portfolio.jjyoon.dto.group.GroupCreateRequest;
import com.portfolio.jjyoon.service.group.GroupService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/groups")
@RequiredArgsConstructor
public class GroupController {

    private final GroupService groupService;

    @PostMapping
    public ResponseEntity<Group> createGroup(@RequestBody GroupCreateRequest request) {
        Group group = groupService.createGroup(request);
        return ResponseEntity.ok(group);
    }

    // 추가 API 구현 예정
}
