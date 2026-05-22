import axios from "axios";

export const API_BASE_URL =
  import.meta.env.VITE_API_URL || "https://my-app1111.bonto.run";

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

export default api;
