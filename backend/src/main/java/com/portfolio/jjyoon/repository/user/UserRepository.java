package com.portfolio.jjyoon.repository.user;

import com.portfolio.jjyoon.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUserId(String userId);
    boolean existsByUserId(String userId);
    boolean existsByEmail(String email);

    Optional<User> findByEmail(String email);

    // 이메일 + 이름으로 User 조회 (아이디 찾기)
    Optional<User> findByEmailAndUserName(String email, String userName);

    // 아이디 + 이메일로 User 조회 (비밀번호 초기화)
    Optional<User> findByUserIdAndEmail(String userId, String email);
}
