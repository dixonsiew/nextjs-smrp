import { AuthService } from "./auth";
import { BASE_URL } from "./config";
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const response = await AuthService.refreshToken();
        const { token, refresh_token } = response;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

// axiosInstance.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// axiosInstance.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;
    
//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
      
//       try {
//         const refreshToken  = localStorage.getItem('refreshToken');
//         const response = await axios.post(`${BASE_URL}/o/refresh-token`, {
//           refresh_token: refreshToken,
//         });
//         const { token, refresh_token } = response.data;
//         localStorage.setItem('token', token);
//         localStorage.setItem('refreshToken', refresh_token);
        
//         originalRequest.headers.Authorization = `Bearer ${token}`;
//         return axiosInstance(originalRequest);
//       } catch (refreshError) {
//         window.location.href = '/login';
//         return Promise.reject(refreshError);
//       }
//     }
    
//     return Promise.reject(error);
//   }
// );

export default axiosInstance;
