package com.portfolio.jjyoon.controller;

import com.portfolio.jjyoon.domain.User;
import com.portfolio.jjyoon.dto.SignupRequest;
import com.portfolio.jjyoon.service.UserService;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;

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

    // 메시지 응답 DTO
    public record MessageResponse(String message) {}

    // 로그인 요청 DTO
    public record LoginRequest(String userId, String password) {}

    // 로그인 응답 DTO (✅ 사용자 이름 포함)
    public record LoginResponse(String message, String userName) {}
}
