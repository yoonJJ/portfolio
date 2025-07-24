package com.portfolio.jjyoon.repository.group;

import com.portfolio.jjyoon.domain.Group;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GroupRepository extends JpaRepository<Group, Long> {
    // 필요시 사용자 생성한 그룹 목록 조회 등 메서드 추가 가능
}
