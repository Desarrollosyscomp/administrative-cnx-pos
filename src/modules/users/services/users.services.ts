import { Http as axios } from "../../../utils/http/http";
import { getApiUrl } from "../../../utils/http/get-api-url";
import { useAuthStore } from "../../auth/store/useStoreAuth";
const URL_API = getApiUrl();
const { user } = useAuthStore();

export const UsersService = {
  add: async (data: object) => {
    return axios.post({
      url: `${URL_API}/users`,
      data,
      config: {
        headers: {
          Authorization: `Bearer ${user.token}`,
        }
      }
    });
  },
  
  editUsername: async (id: string, data: object) => {
    return axios.patch({
      url:`${URL_API}/users/update-username/${id}`,
      data,
      config:{
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    }});
  },

  editPassword: async (id: string, data: object) => {
    return axios.patch({
      url:`${URL_API}/users/update-password/${id}`,
      data,
      config:{
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    }});
  },

  delete: async (id: number, is_active: boolean) => {
    return axios.delete({
      url:`${URL_API}/users/${id}`,
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
      url:`${URL_API}/users/${id}`,
      config:{
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    });
  },
  getAll: async () => {
    return axios.get({
      url:`${URL_API}/users`,
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
  ) => {
    return axios.get({
      url:`${URL_API}/users/find/pagination`,
      config:{
        params: {
          page: page,
          limit: limit,
          search: search,
          is_active: is_active,
        },
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      },
    });
  },

};
