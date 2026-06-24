import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

/** * fetch global admin stats */
export const fetchAdminDashboard = async () => {
  const response = await axios.get(`${API_URL}/api/admin/dashboard`);
  return response.data;
};

/** * approve specific leave */
export const approveLeave = async (id) => {
  await axios.post(`${API_URL}/api/admin/leaves/${id}/approve`);
};

/** * reject specific leave */
export const rejectLeave = async (id) => {
  await axios.post(`${API_URL}/api/admin/leaves/${id}/reject`);
};