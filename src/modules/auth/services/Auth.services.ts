import { Http as axios } from "@/utils/http/http";
const URL_API = import.meta.env.VITE_NEST_API_URL;

export const loginService = {
  logIn: async (data: any) => {
    return axios.post({ url: `${URL_API}/auth/login`, data });
  },
  loadPermissions: async (token: string) => {
    return axios.get({
      url: `${URL_API}/permissions`,
      config: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    });
  },
};
