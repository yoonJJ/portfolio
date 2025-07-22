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
