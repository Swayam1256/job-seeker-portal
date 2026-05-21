import axios from "axios";

const API = axios.create({
  baseURL: "https://job-seeker-portal-ef92.onrender.com", 
  withCredentials: true,
});

export default API;
