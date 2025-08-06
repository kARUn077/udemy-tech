// // src/utils/axios.js
// import axios from "axios";

// const axiosInstance = axios.create({
//   baseURL: "http://localhost:8000/api/v1", // ✅ matches backend port
//   withCredentials: true, // allows cookies for auth
// });

// export default axiosInstance;

// src/utils/axios.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api/v1",
  withCredentials: true, // allows cookies for auth
});

export default axiosInstance;
