// ==================== SERVICIO DE CLIENTES ====================
// Todas las llamadas del módulo a la API administrativa con el Bearer token del store de auth:
// /clients (datos, catálogos, servicios, esquema, Taxxa), /licenses (licencia POS)
// y /conxpos-utilities (acceso al web reporter y su licencia).
import { useAuthStore } from "../../../modules/auth/store/useStoreAuth";
import { Http as axios } from "../../../utils/http/http";
//import axios from "axios";
//import { URL_API } from "@/main";

// const URL_API = import.meta.env.VITE_EXPRESS_API_URL;
import { getApiUrl } from "../../../utils/http/get-api-url";
const URL_API = getApiUrl();
const { user } = useAuthStore();

export const ClientsService = {
  // -------------------- Catálogos del formulario (regímenes, obligaciones, esquemas, tipos de documento) --------------------
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
  // -------------------- POST /clients --------------------
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

  // -------------------- PUT /clients/:id --------------------
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

  // -------------------- GET /clients/:id --------------------
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

  // -------------------- DELETE /clients/:id (activar/desactivar) --------------------
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

  // -------------------- GET /clients/find/pagination (con filtro client_status) --------------------
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

  // -------------------- GET /clients/financial-activities/pagination --------------------
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

  // -------------------- GET /clients/paginate/services --------------------
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
  // -------------------- POST /clients/:id/attach-system-services --------------------
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
  // -------------------- GET /clients/:id/system-services --------------------
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
  // -------------------- POST /clients/:id/taxxa-credentials --------------------
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

  // -------------------- POST /clients/:id/create-schema (aprovisiona el tenant) --------------------
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
  // -------------------- GET /clients/find-all/electronic-invoice-providers --------------------
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
  
  // -------------------- GET /clients/:id/tenant-info --------------------
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

    // -------------------- PUT /clients/:id/taxxa-credentials --------------------
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

    // -------------------- POST /licenses (licencia del POS) --------------------
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

    // -------------------- GET /licenses/find-last/:tenant_id --------------------
    getLicense: async (database_id: number) => {
    return axios.get({
      url: `${URL_API}/licenses/find-last/${database_id}`,
      config: {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      },
    });
  },
  // -------------------- POST /conxpos-utilities/auth (usuario del web reporter) --------------------
  createAuthWebUtilities: async (data: object) => {
    return axios.post({
      url: `${URL_API}/conxpos-utilities/auth`,
      data,
      config: {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      },
    });
  },
  // -------------------- POST /conxpos-utilities/database (base MySQL de reportes) --------------------
  sendDatabaseName: async (data: object) => {
    return axios.post({
      url: `${URL_API}/conxpos-utilities/database`,
      data,
      config: {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      },
    });
  },

  // -------------------- GET /conxpos-utilities/auth/:client_id --------------------
  getAuthWebUtilities: async (client_id: number) => {
    return axios.get({
      url: `${URL_API}/conxpos-utilities/auth/${client_id}`,
      config: {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      },
    });
  },

  // -------------------- GET /conxpos-utilities/database/:client_id --------------------
  getDatabaseWebUtilities: async (client_id: number) => {
    return axios.get({
      url: `${URL_API}/conxpos-utilities/database/${client_id}`,
      config: {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      },
    });
  },

  // -------------------- PUT /conxpos-utilities/database/:client_id/update-name --------------------
  editDatabaseName: async (client_id: number, data: object) => {
    return axios.put({
      url: `${URL_API}/conxpos-utilities/database/${client_id}/update-name`,
      data,
      config: {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      },
    });
  },

  // -------------------- PUT /conxpos-utilities/auth/:client_id/update-data --------------------
  editAuthWebUtilities: async (client_id: number, data: object) => {
    return axios.put({
      url: `${URL_API}/conxpos-utilities/auth/${client_id}/update-data`,
      data,
      config: {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      },
    });
  },
  // -------------------- PATCH /conxpos-utilities/auth/:client_id/reset-password --------------------
  resetPasswordWebUtilities: async (client_id: number, data: object) => {
    return axios.patch({
      url: `${URL_API}/conxpos-utilities/auth/${client_id}/reset-password`,
      data,
      config: {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      },
    });
  },
  // -------------------- DELETE /conxpos-utilities/auth/:client_id (activar/desactivar usuario web) --------------------
  inactiveWebUtilities: async (client_id: number, is_active: boolean) => {
    return axios.delete({
      url: `${URL_API}/conxpos-utilities/auth/${client_id}`,
      config: {
        data: {
          status: is_active,
        },
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      },
    });
  },

  // -------------------- DELETE /conxpos-utilities/database/:client_id (activar/desactivar base web) --------------------
  inactiveWebUtilitiesDatabase: async (client_id: number, is_active: boolean) => {
    return axios.delete({
      url: `${URL_API}/conxpos-utilities/database/${client_id}`,
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

  // -------------------- POST /conxpos-utilities/clients/license (licencia web) --------------------
  createLicenseWebUtilities: async (data: object) => {
    return axios.post({
      url: `${URL_API}/conxpos-utilities/clients/license`,
      data,
      config: {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      },
    });
  },

  // -------------------- GET /conxpos-utilities/find-last/:database_id --------------------
  getLicenseWebUtilities: async (database_id: number) => {
    return axios.get({
      url: `${URL_API}/conxpos-utilities/find-last/${database_id}`,
      config: {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      },
    });
  },
    

};
