import axios from "axios";

const API_BASE = "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE,
});

api.interceptors.request.use((config) => {
  const stored = localStorage.getItem("skillcircle_user");
  if (stored) {
    const user = JSON.parse(stored);
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
});

export const authService = {
  login: (email: string, password: string) =>
    api.post("/auth/login", { email, password }),
  register: (name: string, email: string, password: string) =>
    api.post("/auth/register", { name, email, password }),
};

export const videoService = {
  getTechVideos: () => api.get("/videos/tech"),
  getNonTechVideos: () => api.get("/videos/nontech"),
};

export const resourceService = {
  getResources: () => api.get("/resources"),
};

export default api;
