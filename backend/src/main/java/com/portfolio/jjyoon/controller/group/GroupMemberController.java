package com.portfolio.jjyoon.controller.group;

import com.portfolio.jjyoon.domain.GroupMember;
import com.portfolio.jjyoon.dto.group.GroupMemberInviteRequest;
import com.portfolio.jjyoon.service.group.GroupMemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/group-members")
@RequiredArgsConstructor
public class GroupMemberController {

    private final GroupMemberService groupMemberService;

    @PostMapping("/invite")
    public ResponseEntity<?> inviteMember(@RequestBody GroupMemberInviteRequest request) {
        try {
            GroupMember member = groupMemberService.inviteMember(request);
            return ResponseEntity.ok(member);
        } catch (IllegalArgumentException | IllegalStateException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("서버 오류가 발생했습니다.");
        }
    }
}
