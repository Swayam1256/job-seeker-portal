import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://job-seeker-portal-ef92.onrender.com",
  withCredentials: true,
});

export default api;