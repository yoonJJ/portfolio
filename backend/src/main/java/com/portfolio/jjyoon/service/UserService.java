package com.portfolio.jjyoon.service;

import com.portfolio.jjyoon.domain.User;
import com.portfolio.jjyoon.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public boolean authenticate(String username, String rawPassword) {
        User user = userRepository.findByUsername(username);
        return user != null && passwordEncoder.matches(rawPassword, user.getPasswordHash());
    }

    public User registerUser(String username, String rawPassword, String email) {
        if(userRepository.findByUsername(username) != null) {
            throw new IllegalArgumentException("이미 존재하는 사용자명입니다.");
        }
        if(userRepository.findByEmail(email) != null) {
            throw new IllegalArgumentException("이미 존재하는 이메일입니다.");
        }
        String encodedPassword = passwordEncoder.encode(rawPassword);
        User user = new User(null, username, encodedPassword, email);
        return userRepository.save(user);
    }
}
