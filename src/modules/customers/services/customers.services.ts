import { useAuthStore } from "../../../modules/auth/store/useStoreAuth";
import { Http as axios } from "../../../utils/http/http";

const URL_API = import.meta.env.VITE_NEST_API_URL;
const { user } = useAuthStore();

export const CustomersService = {
  add: async (data: object) => {
    return axios.post({
      url:`${URL_API}/customers`,
      data
    });
  },
  edit: async (id: string, data: object) => {
    return axios.put({
      url:`${URL_API}/customers/${id}`,
      data,
      config:{
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    });
  },
  delete: async (id: number, is_active: boolean) => {
    return axios.delete({
      url:`${URL_API}/customers/${id}`,
      config:{
        data: {
          is_active: is_active,
        },
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    });
  },
  getOne: async (id: string) => {
    return axios.get({
      url:`${URL_API}/customers/${id}`,
      config:{
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    });
  },
  getAll: async () => {
    return axios.get({
      url:`${URL_API}/customers`,
      config:{
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    });
  },
  getPaginated: async (
    limit: number,
    page: number,
    search: string,
    is_active: boolean | undefined,
    initDate: string,
    endDate: string
  ) => {
    return axios.get({
      url:`${URL_API}/customers/find/pagination`,
      config:{
        params: {
          page: page,
          limit: limit,
          search: search,
          is_active: is_active,
          initDate: initDate,
          endDate: endDate,
        },
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      },
    });
  },
  // Company methods 
  getCompanies: async () => {
    return axios.get({
      url:`${URL_API}/companys`,
      config:{
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    }});
  },
  addCompany: async (data: object) => {    
    return axios.post({
      url: `${URL_API}/companies`,
      data: data,
      config:{
        headers: {
          Authorization: `Bearer ${user.token}`
        },
      },
    });
  }
};
