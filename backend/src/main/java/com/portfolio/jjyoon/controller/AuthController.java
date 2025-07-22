package com.portfolio.jjyoon.controller;

import com.portfolio.jjyoon.domain.User;
import com.portfolio.jjyoon.dto.SignupRequest;
import com.portfolio.jjyoon.service.UserService;
import com.portfolio.jjyoon.repository.UserRepository;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;
    private final UserRepository userRepository;

    // 회원가입
    @PostMapping("/signup")
    public ResponseEntity<?> signup(@Valid @RequestBody SignupRequest signupRequest) {
        try {
            String msg = userService.signup(signupRequest);
            return ResponseEntity.ok(new MessageResponse(msg));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(new MessageResponse(e.getMessage()));
        }
    }

    // 로그인
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest, HttpSession session) {
        try {
            User user = userService.authenticate(loginRequest.userId(), loginRequest.password());
            session.setAttribute("userId", user.getUserId());
            return ResponseEntity.ok(new LoginResponse("로그인 성공", user.getUserName()));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(new MessageResponse(e.getMessage()));
        }
    }

    // 로그아웃
    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpSession session) {
        session.invalidate();
        return ResponseEntity.ok(new MessageResponse("로그아웃 성공"));
    }

    // 세션 상태 확인 API
    @GetMapping("/session")
    public ResponseEntity<?> checkSession(HttpSession session) {
        String userId = (String) session.getAttribute("userId");
        if (userId == null) {
            return ResponseEntity.status(401).body(new MessageResponse("로그인되어 있지 않습니다."));
        }
        Optional<User> userOpt = userRepository.findByUserId(userId);
        if (userOpt.isEmpty()) {
            return ResponseEntity.status(401).body(new MessageResponse("유효하지 않은 세션입니다."));
        }
        User user = userOpt.get();
        return ResponseEntity.ok(new SessionResponse(user.getUserId(), user.getUserName()));
    }

    // DTOs
    public record MessageResponse(String message) {}

    public record LoginRequest(String userId, String password) {}

    public record LoginResponse(String message, String userName) {}

    public record SessionResponse(String userId, String userName) {}
}
