// import { useAuthStore } from "@/modules/auth/store/useStoreAuth";
import { useAuthStore } from "../../../modules/auth/store/useStoreAuth";
// import { Http as axios } from "@/utils/http/http";
import { Http as axios } from "../../../utils/http/http";
//import axios from "axios";
//import { URL_API } from "@/main";

// const URL_API = import.meta.env.VITE_EXPRESS_API_URL;
// const URL_API = import.meta.env.VITE_NEST_API_URL;
const URL_API = 'http://localhost:3000';
const { user } = useAuthStore();

export const UsersService = {
  add: async (data: object) => {
    return axios.post({
      url:`${URL_API}/users`,
      data
    });
  },
  edit: async (id: string, data: object) => {
    return axios.put({
      url:`${URL_API}/users/${id}`,
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
    initDate: string,
    endDate: string
  ) => {
    return axios.get({
      url:`${URL_API}/users/find/pagination`,
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
  addEnterprisesToUser: async (data: object) => {
    return axios.post({
      url:`${URL_API}/companys`,
      data,
      config:{
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    }});
  }
};
