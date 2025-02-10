import axios from "axios";
import { LOGIN_PATH } from "../routes/paths";
import useAuthStore from "../../entities/auth/stores/useAuthStore";

const API_BASE_URL = import.meta.env.VITE_BASE_URL;
const instance = axios.create({ baseURL: import.meta.env.VITE_BASE_URL });

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response) {
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          const refreshToken = useAuthStore.getState().refreshToken;
          if (!refreshToken) {
            throw new Error("No refresh token available");
          }

          const { data } = await axios.post(`${API_BASE_URL}/refresh-token`, {
            refreshToken,
          });

          useAuthStore.setState({
            accessToken: data.accessToken,
          });

          instance.defaults.headers.Authorization = `Bearer ${data.accessToken}`;
          originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
          return instance(originalRequest);
        } catch (refreshError) {
          console.error("Token refresh failed:", refreshError);
          useAuthStore.setState({
            accessToken: null,
            refreshToken: null,
          });
          window.location.href = LOGIN_PATH;
          return Promise.reject(refreshError);
        }
      }
    }
    return Promise.reject(error);
  }
);

export default instance;
