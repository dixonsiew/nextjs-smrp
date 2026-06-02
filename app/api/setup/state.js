import { BASE_URL } from '../config';
import axiosInstance from '../axiosInstance';

export class StateService {

  static async list(page, limit, sort, dir) {
    const params = {
      _page: page,
      _limit: limit,
    }
    if (sort !== '') {
      if (dir === '') {
        dir = 'asc';
      }
      params['sort'] = `${sort}:${dir}`;
    }
    try {
      const response = await axiosInstance.get(`${BASE_URL}/api/states`, { params });
      return {
        data: response.data,
        headers: response.headers,
      }
    } catch (error) {
      return null;
    }
  }

  static async search(page, limit, sort, dir, keyword) {
    const params = {
      _page: page,
      _limit: limit,
    }
    if (sort !== '') {
      if (dir === '') {
        dir = 'asc';
      }
      params['sort'] = `${sort}:${dir}`;
    }
    try {
      const response = await axiosInstance.post(`${BASE_URL}/api/states`, { keyword }, { params });
      return {
        data: response.data,
        headers: response.headers,
      }
    } catch (error) {
      return null;
    }
  }

  static async create(data) {
    try {
      await axiosInstance.post(`${BASE_URL}/api/state`, data);
      return true;
    } catch (error) {
      return false;
    }
  }

  static async edit(id) {
    try {
      const response = await axiosInstance.get(`${BASE_URL}/api/state/${id}`);
      return response.data;
    } catch (error) {
      return null;
    }
  }

  static async update(id, data) {
    try {
      await axiosInstance.put(`${BASE_URL}/api/state/${id}`, data);
      return true;
    } catch (error) {
      return false;
    }
  }

  static async remove(id) {
    try {
      await axiosInstance.delete(`${BASE_URL}/api/state/${id}`);
      return true;
    } catch (error) {
      return false;
    }
  }
}

export default StateService;
