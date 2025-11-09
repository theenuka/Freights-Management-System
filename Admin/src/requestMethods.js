import axios from "axios";

// Environment variable (docker build arg) or localhost fallback.
// In Docker compose we set VITE_API_URL to http://backend:8000/api/v1/
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api/v1/"; // api server address

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});