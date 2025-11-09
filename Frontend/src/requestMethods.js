import axios from "axios";

// Use environment variable injected at build time (docker) or fallback to localhost for dev.
// In Docker compose we set VITE_API_URL to http://backend:8000/api/v1/
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api/v1/";

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});