import { useAuthStore } from "../../../modules/auth/store/useStoreAuth";
import { Http as axios } from "../../../utils/http/http";
//import axios from "axios";
//import { URL_API } from "@/main";

// const URL_API = import.meta.env.VITE_EXPRESS_API_URL;
import { getApiUrl } from "../../../utils/http/get-api-url";
const URL_API = getApiUrl();
const { user } = useAuthStore();

export const ClientsService = {

  getInitialData: async (client_id: number) => {
    return axios.get({
      url: `${URL_API}/clients/form/initial-data?${client_id? `client_id=${client_id}`:''}`,
      config: {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      },
    });
  },
  addClient: async (data: object) => {
    return axios.post({
      url: `${URL_API}/clients`,
      data,
      config: {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      },
    });
  },
};
