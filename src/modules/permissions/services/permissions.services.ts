import { useAuthStore } from "@/modules/auth/store/useStoreAuth";
import { Http as axios } from "@/utils/http/http";
//import axios from "axios";
//import { URL_API } from "@/main";

// const URL_API = import.meta.env.VITE_EXPRESS_API_URL;
const URL_API = import.meta.env.VITE_NEST_API_URL;
const { user } = useAuthStore();

export const PermissionsService = {
  add: async (data: object) => {
    return axios.post({
      url:`${URL_API}/permissions`,
      data
    });
  },
  edit: async (id: string, data: object) => {
    return axios.put({
      url:`${URL_API}/permissions/${id}`,
      data,
      config:{
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    }});
  },
  delete: async (id: number, is_active: boolean) => {
    return axios.delete({
      url:`${URL_API}/permissions/${id}`,
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
      url:`${URL_API}/permissions/${id}`,
      config:{
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    });
  },
  getAll: async () => {
    return axios.get({
      url:`${URL_API}/permissions`,
      config:{
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    });
  },
  // With Express 
  // getPaginated: async (
  //   limit: number,
  //   page: number,
  //   search: string,
  //   isActive: boolean,
  //   initDate: string,
  //   endDate: string
  // ) => {
  //   return axios.post(
  //     `${URL_API}/page/permissions`,
  //     {
  //       where: search,
  //       isActive: isActive ? "active" : "inactive",
  //       size: limit,
  //       page: page,
  //       initDate: initDate,
  //       endDate: endDate,
  //     },
  //     {
  //       headers: {
  //         Authorization: `Bearer ${user.token}`,
  //       },
  //     }
  //   );
  // },
  
  // Whit Nest 
  getPaginated: async (
    limit: number,
    page: number,
    search: string,
    is_active: boolean | undefined,
    initDate: string,
    endDate: string
  ) => {
    return axios.get({
      url:`${URL_API}/permissions/find/pagination`,
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
  // Temporal method 
  getCompanies: async () => {
    return axios.get({
      url:`${URL_API}/companys`,
      config:{
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    }});
  }
};
