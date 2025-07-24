package com.portfolio.jjyoon.service.user;

import com.portfolio.jjyoon.domain.User;
import com.portfolio.jjyoon.domain.PasswordResetToken;
import com.portfolio.jjyoon.dto.auth.SignupRequest;
import com.portfolio.jjyoon.repository.user.UserRepository;
import com.portfolio.jjyoon.repository.auth.PasswordResetTokenRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordResetTokenRepository tokenRepository;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    // --- 회원가입 ---
    public String signup(SignupRequest signupRequest) {
        if (userRepository.existsByUserId(signupRequest.getUserId())) {
            throw new IllegalArgumentException("이미 존재하는 아이디입니다.");
        }
        if (userRepository.existsByEmail(signupRequest.getEmail())) {
            throw new IllegalArgumentException("이미 등록된 이메일입니다.");
        }

        User user = new User();
        user.setUserId(signupRequest.getUserId());
        user.setEmail(signupRequest.getEmail());
        user.setUserName(signupRequest.getUserName());
        user.setPasswordHash(passwordEncoder.encode(signupRequest.getPassword()));

        userRepository.save(user);
        return "회원가입 성공";
    }

    // --- 로그인 인증 ---
    public User authenticate(String userId, String password) {
        Optional<User> userOpt = userRepository.findByUserId(userId);
        if (userOpt.isEmpty()) {
            throw new IllegalArgumentException("존재하지 않는 아이디입니다.");
        }

        User user = userOpt.get();
        if (!passwordEncoder.matches(password, user.getPasswordHash())) {
            throw new IllegalArgumentException("비밀번호가 틀렸습니다.");
        }

        return user;
    }

    // --- 비밀번호 재설정 토큰 생성 (userId + email 검증) ---
    public String createPasswordResetToken(String userId, String email) {
        Optional<User> userOpt = userRepository.findByUserId(userId);

        if (userOpt.isEmpty() || !userOpt.get().getEmail().equals(email)) {
            throw new IllegalArgumentException("아이디 또는 이메일이 일치하지 않습니다.");
        }

        String token = UUID.randomUUID().toString();
        PasswordResetToken resetToken = PasswordResetToken.builder()
                .token(token)
                .userId(userId)
                .expiresAt(LocalDateTime.now().plusMinutes(30))
                .build();

        tokenRepository.save(resetToken);

        // 실제 배포 시 이메일로 발송, 현재는 테스트용 링크 반환
        return "https://jjyoon.dev/reset-password?token=" + token;
    }

    // --- 토큰으로 비밀번호 재설정 ---
    public void resetPasswordByToken(String token, String newPassword) {
        PasswordResetToken resetToken = tokenRepository.findByToken(token)
                .orElseThrow(() -> new IllegalArgumentException("유효하지 않은 토큰입니다."));

        if (resetToken.getExpiresAt().isBefore(LocalDateTime.now())) {
            throw new IllegalArgumentException("토큰이 만료되었습니다.");
        }

        User user = userRepository.findByUserId(resetToken.getUserId())
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));

        user.setPasswordHash(passwordEncoder.encode(newPassword));
        userRepository.save(user);

        tokenRepository.delete(resetToken); // 사용된 토큰 제거
    }
}
