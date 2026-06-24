import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

/** * login api call */
export const loginUser = async (username, password) => {
  const response = await axios.post(`${API_URL}/api/auth/login`, { username, password });
  return response.data;
};