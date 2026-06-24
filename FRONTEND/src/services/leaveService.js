import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

/** * get user specific leaves */
export const fetchMyLeaves = async (userId) => {
  const response = await axios.get(`${API_URL}/api/leave/my-leaves/${userId}`);
  return response.data;
};

/** * submit new leave request */
export const applyForLeave = async (leaveData) => {
  const response = await axios.post(`${API_URL}/api/leave/apply`, leaveData);
  return response.data;
};