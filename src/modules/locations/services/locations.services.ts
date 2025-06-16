import { useAuthStore } from "../../auth/store/useStoreAuth"; 
import { getApiUrl } from "../../../utils/http/get-api-url"; 
import { Http as axios } from '../../../utils/http/http'
const URL_API = getApiUrl();;
const { user } = useAuthStore();

export const LocationsService = {
  ////////// Countries \\\\\\\\\\
  getCountries: async () => {
    return axios.get({
      url: `${URL_API}/clients/get/countries`,
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
      url: `${URL_API}/clients/get-departments/${country_id}`,
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
      url: `${URL_API}/clients/get-municipalities/${department_id}`,
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
      url: `${URL_API}/clients/get-neighborhoods/${municipality_id}`,
      config: {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      },
    });
  },
};
