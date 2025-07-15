package com.portfolio.jjyoon.service;

import com.portfolio.jjyoon.domain.User;
import com.portfolio.jjyoon.repository.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public boolean authenticate(String username, String rawPassword) {
        User user = userRepository.findByUsername(username);
        if (user == null) {
            return false;
        }
        // rawPassword(입력값)와 DB에 저장된 암호화된 비밀번호 비교
        return passwordEncoder.matches(rawPassword, user.getPassword());
    }
}
