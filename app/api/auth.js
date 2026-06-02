import { BASE_URL } from './config';
import axiosInstance from './axiosInstance';
import axios from 'axios';

export class AuthService {

  static async logout() {
    try {
      await axios.post(`${BASE_URL}/o/logout`, {}, { withCredentials: true });
      return true;
    } catch (error) {
      return false;
    }
  }
  
  static async login(username, password) {
    try {
      const response = await axios.post(`${BASE_URL}/o/token`, {
        username,
        password,
      }, { withCredentials: true });
      
      const { token, refresh_token } = response.data;

      return {
        success: true,
        token,
        refresh_token,
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Login failed',
      }
    }
  }

  static async refreshToken() {
    try {
      const response = await axiosInstance.post(`${BASE_URL}/o/refresh-token`, {
        refresh_token: '',
      });

      const { token, refresh_token } = response.data;

      return {
        success: true,
        token,
        refresh_token,
      };
    } catch (error) {
      return null;
    }
  }

  static logout00() {
    // localStorage.removeItem('token')
    // localStorage.removeItem('refreshToken')
  }

  // static getToken(): string {
  //   return localStorage.getItem('token') || ''
  // }

  // static getRefreshToken(): string {
  //   return localStorage.getItem('refreshToken') || ''
  // }

  // static hasValidToken(): boolean {
  //   return !!this.getToken()
  // }

  // static hasValidRefreshToken(): boolean {
  //   return !!this.getRefreshToken()
  // }

  static async changePassword(password, confirm_password) {
    try {
      await axiosInstance.post(`${BASE_URL}/api/change-password`, {
        password,
        confirm_password,
      })
      return true;
    } catch (error) {
      return false;
    }
  }

  static async currentUser() {
    try {
      const response = await axiosInstance.get(`${BASE_URL}/api/current-user`);
      return response.data;
    } catch (error) {
      return null;
    }
  }
}

export default AuthService;
