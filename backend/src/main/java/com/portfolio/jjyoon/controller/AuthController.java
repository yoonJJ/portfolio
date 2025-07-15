package com.portfolio.jjyoon.controller;

import com.portfolio.jjyoon.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000") // React 서버 주소 허용
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService){
        this.userService = userService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> userMap){
        String username = userMap.get("username");
        String password = userMap.get("password");
        if(userService.authenticate(username, password)){
            return ResponseEntity.ok(Map.of("message", "로그인 성공"));
        }
        return ResponseEntity.status(401).body(Map.of("message", "로그인 실패"));
    }
}
