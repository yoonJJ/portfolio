package com.portfolio.jjyoon.repository;

import com.portfolio.jjyoon.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, String> {
    User findByUsername(String username);
}
