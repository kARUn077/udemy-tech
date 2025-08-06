// src/utils/axios.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/api/v1", // ✅ matches backend port
  withCredentials: true, // allows cookies for auth
});

export default axiosInstance;
