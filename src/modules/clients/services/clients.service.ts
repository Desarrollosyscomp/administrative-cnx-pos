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
      url: `${URL_API}/clients/form/initial-data?${
        client_id ? `client_id=${client_id}` : ""
      }`,
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

  editClient: async (id: number, data: object) => {
    return axios.put({
      url: `${URL_API}/clients/${id}`,
      data,
      config: {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      },
    });
  },

  getClientById: async (id: string) => {
    return axios.get({
      url: `${URL_API}/clients/${id}`,
      config: {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      },
    });
  },

  deleteClient: async (id: number, is_active: boolean) => {
    return axios.delete({
      url: `${URL_API}/clients/${id}`,
      config: {
        data: {
          is_active: is_active,
        },
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      },
    });
  },

  getPaginateClients: async (
    page: number,
    limit: number,
    search: string,
    is_active: boolean | undefined,
    client_status: number| undefined
  ) => {
    return axios.get({
      url: `${URL_API}/clients/find/pagination`,
      config: {
        params: {
          page: page,
          limit: limit,
          search: search,
          is_active: is_active,
          client_status: client_status,
        },
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      },
    });
  },

  getPaginateFinancialActivities: async (
    page: number,
    limit: number,
    financial_activities_dian_ids: Array<string>,
    search: string
  ) => {
    return axios.get({
      url: `${URL_API}/clients/financial-activities/pagination`,
      queries: { financial_activities_dian_ids },
      config: {
        params: {
          page: page,
          limit: limit,
          search: search,
        },
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      },
    });
  },

  getPaginatedSystemServices: async (
    page: number,
    limit: number,
    search: string
  ) => {
    return axios.get({
      url: `${URL_API}/clients/paginate/services`,
      config: {
        params: {
          page: page,
          limit: limit,
          search: search,
        },
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      },
    });
  },
  syncSystemServices: async (
    client_id: number,
    system_service_ids: Array<number>
  ) => {
    return axios.post({
      url: `${URL_API}/clients/${client_id}/attach-system-services`,
      data: {
        system_service_ids,
      },
      config: {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      },
    });
  },
  getClientSystemServices: async (client_id: string) => {
    return axios.get({
      url: `${URL_API}/clients/${client_id}/system-services`,
      config: {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      },
    });
  },
  saveTaxxaInfo: async (client_id: number, data: object) => {
    return axios.post({
      url: `${URL_API}/clients/${client_id}/taxxa-credentials`,
      data,
      config: {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      },
    });
  },

  createClientSchema: async (client_id: number) => {
    return axios.post({
      url: `${URL_API}/clients/${client_id}/create-schema`,
      data: client_id,
      config: {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      },
    });
  },
  getElectronicInvoiceProviders: async () => {
    return axios.get({
      url: `${URL_API}/clients/find-all/electronic-invoice-providers`,
      config: {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      },
    });
  },
  
  getTenantInfo: async (client_id: number ) => {
    return axios.get({
      url: `${URL_API}/clients/${client_id}/tenant-info`,
      config: {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      },
    });
  },

    editCredentials: async (client_id: number, data: object) => {
    return axios.put({
      url: `${URL_API}/clients/${client_id}/taxxa-credentials`,
      data,
      config: {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      },
    });
  },

    createLicense: async (data: object) => {
    return axios.post({
      url: `${URL_API}/licenses`,
      data,
      config: {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      },
    });
  },

    getLicense: async (tenant_id: number) => {
    return axios.get({
      url: `${URL_API}/licenses/find-last/${tenant_id}`,
      config: {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      },
    });
  },

};
