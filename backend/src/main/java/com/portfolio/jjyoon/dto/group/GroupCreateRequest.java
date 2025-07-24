package com.portfolio.jjyoon.dto.group;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class GroupCreateRequest {
    private String groupName;
    private String createdBy;  // userId 등 생성자 ID
}
