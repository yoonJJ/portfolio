import axios from "axios";

const API_URL = "https://jjyoon.dev/api/groups";

export async function getMyGroups() {
  const response = await axios.get(`${API_URL}/mine`, { withCredentials: true });
  return response.data;
}
