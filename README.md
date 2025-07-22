# 🛠 Portfolio Backend - Spring Boot + React 로그인 시스템

React + Spring Boot 기반의 사용자 인증 시스템을 구축한 포트폴리오 프로젝트입니다.  
로그인/회원가입/로그아웃, 세션 기반 인증 유지, 프론트와의 통신, 배포까지 모두 직접 구현하였습니다.

---

## 🙋‍♂️ 개발자

- **이름**: 윤정재 (Yoon Jeongjae)  
- **GitHub**: [yoonJJ](https://github.com/yoonJJ)
- **Web**: https://jjyoon.dev/

---

## 프로젝트 개요

- Java 21, Spring Boot 3.5.3 기반 백엔드 프로젝트
- 프론트엔드는 React로 개발하고 별도 디렉토리에서 관리
- Spring Security를 활용한 세션 기반 로그인 및 인증 처리
- PostgreSQL로 사용자 정보 영구 저장
- H2 Database로 테스트 수행 (개발 중)
- 프론트엔드와 CORS 연동, 세션 쿠키 인증 방식 사용
- GCP H2 VM 인스턴스에 직접 배포 완료 (향후 개인 서버로 이전 예정)

---

## 개발 환경

| 항목          | 사용 기술                       |
|---------------|-------------------------------|
| 언어          | Java 21                       |
| 백엔드 프레임워크 | Spring Boot 3.5.3             |
| 빌드 도구     | Gradle                        |
| 보안         | Spring Security, BCrypt       |
| 데이터베이스  | PostgreSQL (운영), H2 (개발)   |
| ORM           | Spring Data JPA               |
| 프론트엔드    | React + Vite (별도 관리)       |
| IDE           | IntelliJ IDEA / VS Code       |
| 서버          | GCP VM (Nginx + HTTPS 배포)    |

---

## 주요 기능

### 인증 관련
- 사용자 **회원가입 / 로그인 / 로그아웃**
- 비밀번호 **BCrypt** 해시 처리
- **세션 기반 인증 유지** (JSESSIONID)
- 로그인 상태 **로컬스토리지 + 세션**으로 유지
- React 앱 새로고침 시 **백엔드에서 세션 유효성 검사**

### 도메인 및 저장소
- `User` 엔티티:
  - `user_id`, `user_name`, `password_hash`, `email`
- DB에 유저 정보 저장 및 중복 체크
- `UserRepository` 인터페이스로 JPA 사용

### 프론트엔드 통신
- React 앱에서 axios 사용
- `/api/auth/signup` - 회원가입
- `/api/auth/login` - 로그인 + 세션 설정
- `/api/auth/logout` - 세션 무효화
- `/api/auth/session` - 세션 유효성 확인 API (프론트 새로고침 시 사용)

### 보안 설정
- Spring Security로 인증/인가 처리
- 로그인 관련 API는 모두 허용 (`/api/auth/**`)
- CORS 및 CSRF 설정 조정
- 쿠키의 `Secure`, `HttpOnly` 설정

---

## 세션 인증 유지 흐름

1. 로그인 시 `JSESSIONID` 쿠키 발급
2. React 앱은 쿠키 자동 포함 (`withCredentials: true`)
3. 새로고침 시 `/api/auth/session` 호출 → 백엔드 세션에서 유저 확인
4. 세션이 유효하면 프론트에서 로그인 상태 유지됨

---

## 향후 추가 예정

- 아이디 / 비밀번호 찾기 기능
- 이메일 인증 기반 회원가입
- 마이페이지 / 사용자 정보 수정
- Todo List 기능 구현
- 토큰 기반 인증(JWT) 옵션도 실험적으로 도입 고려
- 개인 미니PC 서버 구축 및 이전 예정 (10월)

---

## 배포 및 운영

- HTTPS 적용 (Let's Encrypt + Nginx)
- 배포 도메인: [https://jjyoon.dev](https://jjyoon.dev)
- GCP VM (Rocky Linux + Nginx + Spring Boot)

---

## 기타

- `.jar` 파일은 `.gitignore`에 등록
- 환경변수는 `.env` 또는 외부 config로 관리 예정
- GitHub Actions CI/CD는 추후 도입 예정

---