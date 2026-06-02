import { BASE_URL } from '../config';
import axiosInstance from '../axiosInstance';

export default class ReportService {

  static async list(prm) {
    try {
      const response = await axiosInstance.post(`${BASE_URL}/api/master-pd101/rpt1`, prm);
      return response.data;
    } catch (error) {
      return null;
    }
  }

  static async listPrevious(page, limit, sort, dir, dateFrom, dateTo) {
    const params = {
      _page: page,
      _limit: limit,
      vt: '0',
      datefrom: dateFrom,
      dateto: dateTo,
    }
    if (sort !== '') {
      if (dir === '') {
        dir = 'asc';
      }
      params['sort'] = `${sort}:${dir}`;
    }
    try {
      const response = await axiosInstance.get(`${BASE_URL}/api/master-pd101/rpt1`, { params });
      return response.data;
    } catch (error) {
      return null;
    }
  }

  static async edit(id) {
    const params = {
      vt: '0',
    }
    try {
      const response = await axiosInstance.get(`${BASE_URL}/api/master-pd101/rpt1/${id}`, { params });
      return response.data;
    } catch (error) {
      return null;
    }
  }

  static async update(id, data) {
    const params = {
      vt: '0',
    }
    try {
      await axiosInstance.put(`${BASE_URL}/api/master-pd101/rpt1/${id}`, data, { params });
      return true;
    } catch (error) {
      return false;
    }
  }

  static async exportJSON(dateFrom, dateTo) {
    const params = {
      datefrom: dateFrom,
      dateto: dateTo,
    }
    try {
      const response = await axiosInstance.get(`${BASE_URL}/api/master-pd101/export/rpt1`, { responseType: 'blob', params });
      return {
        data: response.data,
        headers: response.headers,
      }
    } catch (error) {
      return null;
    }
  }

  static async exportXlsx(dateFrom, dateTo) {
    const params = {
      datefrom: dateFrom,
      dateto: dateTo,
    }
    try {
      const response = await axiosInstance.get(`${BASE_URL}/api/master-pd101/export/rpt1/xlsx`, { responseType: 'blob', params });
      return {
        data: response.data,
        headers: response.headers,
      }
    } catch (error) {
      return null;
    }
  }
}
