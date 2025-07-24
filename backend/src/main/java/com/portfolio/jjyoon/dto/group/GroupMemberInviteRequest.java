package com.portfolio.jjyoon.dto.group;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GroupMemberInviteRequest {
    private Long groupId;
    private String userId;  // 초대할 유저 아이디
    private String role;
}
