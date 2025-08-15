import axios from "axios";
import { useStore } from './src/store/store';
// const REACT_APP_BASE_URL = "http://213.232.225.73:9000";
const REACT_APP_BASE_URL = "http://170.64.234.64:6262";


const api = axios.create({
  baseURL: REACT_APP_BASE_URL,
});

// Request interceptor to add the Authorization header
api.interceptors.request.use(
  (config) => {
    const accessToken = JSON.parse(localStorage.getItem("user-store"))?.state?.user?.token;
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
// Response interceptor to handle token refresh on 401 errors
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const { user, setUser, clearUser } = useStore.getState();  
      
      if (user?.refreshToken) {
        try {
          const refreshResponse = await axios.get(`${REACT_APP_BASE_URL}/auth/refresh`, {
            headers: {
              Authorization: `Bearer ${user.refreshToken}`,
            },
          });

          const newAccessToken = refreshResponse?.data?.data?.accessToken?.token;
          const newRefreshToken = refreshResponse?.data?.data?.refreshToken?.token;
          
          if (newAccessToken && newRefreshToken) {
            // Update user state and localStorage with new tokens
            setUser({ ...user, token: newAccessToken, refreshToken: newRefreshToken });
           
            // Update Authorization header with new token
            api.defaults.headers.Authorization = `Bearer ${newAccessToken}`;
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

            return api(originalRequest);  
          }
        } catch (refreshError) {
          console.error("Error refreshing token:", refreshError);
          clearUser()
        }
      } else {
        console.log("No refresh token");
      }
    }
    return Promise.reject(error);
  }
);

export default api;
