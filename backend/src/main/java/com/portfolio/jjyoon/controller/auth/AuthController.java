package com.portfolio.jjyoon.controller.auth;

import com.portfolio.jjyoon.domain.User;
import com.portfolio.jjyoon.dto.auth.SignupRequest;
import com.portfolio.jjyoon.service.user.UserService;
import com.portfolio.jjyoon.repository.user.UserRepository;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;
    private final UserRepository userRepository;

    // --- 회원가입 ---
    @PostMapping("/signup")
    public ResponseEntity<?> signup(@Valid @RequestBody SignupRequest signupRequest) {
        try {
            String msg = userService.signup(signupRequest);
            return ResponseEntity.ok(new MessageResponse(msg));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(new MessageResponse(e.getMessage()));
        }
    }

    // --- 로그인 ---
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

    // --- 로그아웃 ---
    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpSession session) {
        session.invalidate();
        return ResponseEntity.ok(new MessageResponse("로그아웃 성공"));
    }

    // --- 세션 상태 확인 ---
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

    // --- 아이디 찾기 ---
    @GetMapping("/find-id")
    public ResponseEntity<?> findUserId(@RequestParam String email, @RequestParam String userName) {
        Optional<User> userOpt = userRepository.findByEmailAndUserName(email, userName);
        if (userOpt.isPresent()) {
            String userId = userOpt.get().getUserId();
            String maskedUserId = maskUserId(userId);
            return ResponseEntity.ok(Map.of("userId", maskedUserId));
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(new MessageResponse("일치하는 사용자를 찾을 수 없습니다."));
    }

    private String maskUserId(String userId) {
        if (userId.length() <= 2) return userId;
        int show = 2;
        return userId.substring(0, show) + "*".repeat(userId.length() - show);
    }

    // --- 비밀번호 초기화 요청 (토큰 생성 및 메일 발송) ---
    @PostMapping("/reset-password-request")
    public ResponseEntity<?> requestPasswordReset(@RequestBody ResetPasswordRequest request) {
        try {
            userService.createPasswordResetToken(request.userId(), request.email());
            return ResponseEntity.ok(new MessageResponse("비밀번호 재설정 링크가 이메일로 발송되었습니다."));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new MessageResponse(e.getMessage()));
        }
    }

    // --- 실제 비밀번호 재설정 ---
    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody ResetPasswordConfirm request) {
        try {
            userService.resetPasswordByToken(request.token(), request.newPassword());
            return ResponseEntity.ok(new MessageResponse("비밀번호가 성공적으로 변경되었습니다."));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(new MessageResponse(e.getMessage()));
        }
    }

    // --- DTOs ---
    public record MessageResponse(String message) {}

    public record LoginRequest(String userId, String password) {}

    public record LoginResponse(String message, String userName) {}

    public record SessionResponse(String userId, String userName) {}

    public record ResetPasswordRequest(String userId, String email) {}

    public record ResetPasswordConfirm(String token, String newPassword) {}
}
