import axios from "axios";

const API_URL = "https://jjyoon.dev/api/auth";

// 로그인 요청
export async function login(credentials) {
  try {
    const response = await axios.post(`${API_URL}/login`, credentials, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
    return response.data; // { message, userName }
  } catch (error) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error("로그인 중 오류가 발생했습니다.");
  }
}

// 로그아웃 요청
export async function logout() {
  try {
    const response = await axios.post(`${API_URL}/logout`, {}, { withCredentials: true });
    return response.data.message;
  } catch {
    throw new Error("로그아웃 중 오류가 발생했습니다.");
  }
}

// 회원가입 요청
export async function signup(userData) {
  try {
    const response = await axios.post(`${API_URL}/signup`, userData, {
      withCredentials: true,
    });
    return response.data.message;
  } catch (error) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error("회원가입 중 오류가 발생했습니다.");
  }
}

// 세션 상태 체크
export async function checkSession() {
  try {
    const response = await axios.get(`${API_URL}/session`, { withCredentials: true });
    return response.data; // { userId, userName }
  } catch {
    throw new Error("세션이 유효하지 않습니다.");
  }
}

// 아이디 찾기 (이메일 + 이름)
export async function findUserId({ email, userName }) {
  try {
    const response = await axios.get(`${API_URL}/find-id`, {
      params: { email, userName },
      withCredentials: true,
    });
    return response.data; // { userId: "jj****" }
  } catch (error) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error("아이디 찾기 중 오류가 발생했습니다.");
  }
}

// 비밀번호 초기화 링크 요청 (토큰 이메일 전송)
export async function requestPasswordReset({ userId, email }) {
  try {
    const response = await axios.post(
      `${API_URL}/reset-password-request`,
      { userId, email },
      { withCredentials: true }
    );
    return response.data; // { message }
  } catch (error) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error("비밀번호 초기화 요청 중 오류가 발생했습니다.");
  }
}

// 비밀번호 실제 재설정 (토큰으로 비밀번호 재설정)
export async function resetPassword({ token, newPassword }) {
  try {
    const response = await axios.post(
      `${API_URL}/reset-password`,
      { token, newPassword },
      { withCredentials: true }
    );
    return response.data.message; // "비밀번호가 성공적으로 변경되었습니다."
  } catch (error) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error("비밀번호 재설정 중 오류가 발생했습니다.");
  }
}
