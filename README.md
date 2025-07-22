## 🙋‍♂️ 개발자

- **이름**: 윤정재 (Yoon Jeongjae)  
- **GitHub**: [yoonJJ](https://github.com/yoonJJ)
- **Web**: https://jjyoon.dev/

## 프로젝트 개요
- Spring Boot 3.5.3, Java 21 기반 백엔드 프로젝트
- H2 인메모리 데이터베이스 사용 (테스트용)
- PostgreSQL 사용 (배포용)
- Spring Security로 로그인 기능 구현
- React 프론트엔드와 연동하여 로그인 및 인증 처리
- 사용자 도메인 및 JPA 엔티티 매핑
- CORS 설정 및 H2 콘솔 활성화
- GCP VM인스턴스 3개월 이용 후 개인 서버 이전

---

## 개발 환경
- Java 21
- Spring Boot 3.5.3
- H2 Database (in-memory)
- Spring Security
- Lombok
- React (프론트엔드 별도 관리)
- IDE: IntelliJ IDEA

---

## 주요 기능
- 사용자 로그인 / 로그아웃 기능 (Spring Security + BCrypt 암호화)
- 사용자 정보 DB 저장 (username, password)
- H2 웹 콘솔 사용 가능 (`/h2-console`)
- CORS 설정으로 React 개발 서버(`localhost:3000`)와 연동 지원
- 기본적인 Spring Security 설정 및 권한 관리
- 테이블 자동 생성 및 데이터 초기화 (`data.sql` 사용)

---

## 🔧 기술 스택

### Frontend
- React

### Backend
- Java 21
- Spring Boot 3.5
- Gradle

