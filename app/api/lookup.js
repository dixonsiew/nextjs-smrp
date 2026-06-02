import { BASE_URL } from './config';
import axiosInstance from './axiosInstance';

export class LookupService {

  static async listGroup() {
    try {
      const response = await axiosInstance.get(`${BASE_URL}/api/lookup/groups`);
      return response.data;
    } catch (error) {
      return [];
    }
  }

  static async listEthnicGroup() {
    try {
      const response = await axiosInstance.get(`${BASE_URL}/api/lookup/ethnic-groups`);
      return response.data;
    } catch (error) {
      return [];
    }
  }

  static async listPersonCategoryCode() {
    try {
      const response = await axiosInstance.get(`${BASE_URL}/api/lookup/person-category-codes`);
      return response.data;
    } catch (error) {
      return [];
    }
  }

  static async listSpeciality() {
    try {
      const response = await axiosInstance.get(`${BASE_URL}/api/lookup/specialities`);
      return response.data;
    } catch (error) {
      return [];
    }
  }

  static async listWardClass() {
    try {
      const response = await axiosInstance.get(`${BASE_URL}/api/lookup/ward-classes`);
      return response.data;
    } catch (error) {
      return [];
    }
  }

  static async listReferral() {
    try {
      const response = await axiosInstance.get(`${BASE_URL}/api/lookup/referrals`);
      return response.data;
    } catch (error) {
      return [];
    }
  }

  static async listCountry() {
    try {
      const response = await axiosInstance.get(`${BASE_URL}/api/lookup/countries`)
      return response.data
    } catch (error) {
      return []
    }
  }

  static async listGender() {
    try {
      const response = await axiosInstance.get(`${BASE_URL}/api/lookup/genders`);
      return response.data;
    } catch (error) {
      return [];
    }
  }

  static async listReligion() {
    try {
      const response = await axiosInstance.get(`${BASE_URL}/api/lookup/religions`);
      return response.data;
    } catch (error) {
      return [];
    }
  }

  static async listTitle() {
    try {
      const response = await axiosInstance.get(`${BASE_URL}/api/lookup/titles`);
      return response.data;
    } catch (error) {
      return [];
    }
  }

  static async listIDType() {
    try {
      const response = await axiosInstance.get(`${BASE_URL}/api/lookup/id-types`);
      return response.data;
    } catch (error) {
      return [];
    }
  }

  static async listMaritalStatus() {
    try {
      const response = await axiosInstance.get(`${BASE_URL}/api/lookup/marital-statuses`);
      return response.data;
    } catch (error) {
      return [];
    }
  }

  static async listRelationship() {
    try {
      const response = await axiosInstance.get(`${BASE_URL}/api/lookup/relationships`);
      return response.data;
    } catch (error) {
      return [];
    }
  }

  static async listCity() {
    try {
      const response = await axiosInstance.get(`${BASE_URL}/api/lookup/cities`);
      return response.data;
    } catch (error) {
      return [];
    }
  }

  static async listState() {
    try {
      const response = await axiosInstance.get(`${BASE_URL}/api/lookup/states`);
      return response.data;
    } catch (error) {
      return [];
    }
  }

  static async listAdmStatus() {
    try {
      const response = await axiosInstance.get(`${BASE_URL}/api/lookup/adm-statuses`);
      return response.data;
    } catch (error) {
      return [];
    }
  }

  static async listOccupation() {
    try {
      const response = await axiosInstance.get(`${BASE_URL}/api/lookup/occupations`);
      return response.data;
    } catch (error) {
      return [];
    }
  }

  static async listVisitTypes() {
    try {
      const response = await axiosInstance.get(`${BASE_URL}/api/lookup/visit-types`);
      return response.data;
    } catch (error) {
      return [];
    }
  }

  static async listDiagItemTypes() {
    try {
      const response = await axiosInstance.get(`${BASE_URL}/api/lookup/diag-item-types`);
      return response.data;
    } catch (error) {
      return [];
    }
  }

  static async listDeliveryTypes() {
    try {
      const response = await axiosInstance.get(`${BASE_URL}/api/lookup/delivery-types`);
      return response.data;
    } catch (error) {
      return [];
    }
  }
}

export default LookupService;
