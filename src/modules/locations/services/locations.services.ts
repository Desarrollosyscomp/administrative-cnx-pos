import { useAuthStore } from "../../auth/store/useStoreAuth"; 
import { getApiUrl } from "../../../utils/http/get-api-url"; 
import { Http as axios } from '../../../utils/http/http'
const URL_API = getApiUrl();;
const { user } = useAuthStore();

export const LocationsService = {
  ////////// Countries \\\\\\\\\\
  getCountries: async () => {
    return axios.get({
      url: `${URL_API}/countries`,
      config: {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      },
    });
  },
  ////////// Departments \\\\\\\\\\
  getDepartmentsByCountry: async (country_id: number) => {
    return axios.get({
      url: `${URL_API}/departments/by-country/${country_id}`,
      config: {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      },
    });
  },
  addDepartment: async (data: any) => {
    return await axios.post({
      url: `${URL_API}/departments`,
      data,
      config: {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      },
    });
  },
  updateDepartment: async (id: number, data: any) => {
    return axios.patch({
      url: `${URL_API}/departments/${id}`,
      data,
      config: {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      },
    });
  },
  ////////// Municipalities \\\\\\\\\\
  getMunicipalitiesByDepartment: async (department_id: number) => {
    return axios.get({
      url: `${URL_API}/municipalities/find/by-department/${department_id}`,
      config: {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      },
    });
  },
  addMunicipality: async (data: any) => {
    return axios.post({
      url: `${URL_API}/municipalities`,
      data,
      config: {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      },
    });
  },
  updateMunicipality: async (id: number, data: any) => {
    return axios.patch({
      url: `${URL_API}/municipalities/${id}`,
      data,
      config: {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      },
    });
  },
  ////////// Neighborhoods \\\\\\\\\\
  getNeighborhoodsByMunicipality: async (municipality_id: number) => {
    return axios.get({
      url: `${URL_API}/neighborhood/find/by-municipality/${municipality_id}`,
      config: {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      },
    });
  },
  addNeighborhood: async (data: any) => {
    return axios.post({
      url: `${URL_API}/neighborhood`,
      data,
      config: {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      },
    });
  },
  updateNeighborhood: async (id: number, data: any) => {
    return axios.patch({
      url: `${URL_API}/neighborhood/${id}`,
      data,
      config: {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      },
    });
  },
};
