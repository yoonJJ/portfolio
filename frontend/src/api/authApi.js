import axios from "axios";

const API_URL = "http://localhost:8080/api/auth";

export async function login(credentials) {
  const response = await axios.post(`${API_URL}/login`, credentials);
  return response.data.message; // "로그인 성공"
}
