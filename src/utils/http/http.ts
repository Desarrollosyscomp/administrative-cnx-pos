// ==================== CLIENTE HTTP (envoltorio de axios) ====================
// Métodos post, patch, put, delete y get. Agregan el query string y, ante un error,
// muestran la notificación y devuelven { status, data } en lugar de lanzar la excepción.
// Cada servicio de módulo arma la URL con getApiUrl() y el encabezado Authorization.
import axios, { AxiosRequestConfig } from "axios";
import { showNotification } from "./http-notifications";
import { HttpErrors, HttpErrorsAndExceptions } from "./interfaces";
import { buildQueryString } from "./helpers"; 
export const Http = {
  // -------------------- POST --------------------
  async post(
    params: {
      url: string;
      data: any;
      queries?: any;
      config?: AxiosRequestConfig<any>;
      showHttpError?: boolean;
      httpErrors?: Array<HttpErrors> | HttpErrorsAndExceptions;
    } = {
      url: "",
      data: {},
      config: undefined,
      showHttpError: true,
      queries: {},
      httpErrors: undefined,
    }
  ) {
    try {
      const queries = buildQueryString(params.queries);
      return await axios.post(params.url + queries, params.data, params.config ?? {});
    } catch (e: any) {
      if (params.showHttpError === undefined || params.showHttpError)
        showNotification({
          status: e.response.status,
          httpErrors: params.httpErrors,
        });

      return {
        status: e.response.status,
        data: e.response.data,
      };
    }
  },
  // -------------------- PATCH --------------------
  async patch(
    params: {
      url: string;
      data: any;
      config?: AxiosRequestConfig<any>;
      queries?: any;
      showHttpError?: boolean;
      httpErrors?: Array<HttpErrors> | HttpErrorsAndExceptions;
    } = {
      url: "",
      data: {},
      config: undefined,
      showHttpError: true,
      queries: {},
      httpErrors: undefined,
    }
  ) {
    try {
      const queries = buildQueryString(params.queries);
      return await axios.patch(params.url + queries, params.data, params.config ?? {});
    } catch (e: any) {
      if (params.showHttpError === undefined || params.showHttpError)
        showNotification({
          status: e.response.status,
          httpErrors: params.httpErrors,
        });
      return {
        status: e.response.status,
        data: e.response.data,
      };
    }
  },
  // -------------------- PUT --------------------
  async put(
    params: {
      url: string;
      data: any;
      config?: AxiosRequestConfig<any>;
      queries?: any;
      showHttpError?: boolean;
      httpErrors?: Array<HttpErrors> | HttpErrorsAndExceptions;
    } = {
      url: "",
      data: {},
      config: undefined,
      showHttpError: true,
      queries: {},
      httpErrors: undefined,
    }
  ) {
    try {
      const queries = buildQueryString(params.queries);
      return await axios.put(params.url + queries, params.data, params.config ?? {});
    } catch (e: any) {
      if (params.showHttpError === undefined || params.showHttpError)
        showNotification({
          status: e.response.status,
          httpErrors: params.httpErrors,
        });
      return {
        status: e.response.status,
        data: e.response.data,
      };
    }
  },
  // -------------------- DELETE --------------------
  async delete(
    params: {
      url: string;
      config?: AxiosRequestConfig<any>;
      showHttpError?: boolean;
      queries?: any;
      httpErrors?: Array<HttpErrors> | HttpErrorsAndExceptions;
    } = {
      url: "",
      config: undefined,
      queries: {},
      showHttpError: true,
      httpErrors: undefined,
    }
  ) {
    try {
      const queries = buildQueryString(params.queries);
      return await axios.delete(params.url + queries, params.config ?? {});
    } catch (e: any) {
      if (params.showHttpError === undefined || params.showHttpError)
        showNotification({
          status: e.response.status,
          httpErrors: params.httpErrors,
        });
      return {
        status: e.response.status,
        data: e.response.data,
      };
    }
  },
  // -------------------- GET --------------------
  async get(
    params: {
      url: string;
      config?: AxiosRequestConfig<any>;
      queries?: any;
      showHttpError?: boolean;
      httpErrors?: Array<HttpErrors> | HttpErrorsAndExceptions;
    } = {
      url: "",
      config: undefined,
      showHttpError: true,
      queries: {},
      httpErrors: undefined,
    }
  ) {
    try {
      const queries = buildQueryString(params.queries);
      return await axios.get(params.url + queries, params.config);
    } catch (e: any) {
      if (params.showHttpError === undefined || params.showHttpError)
        showNotification({
          status: e.response.status,
          httpErrors: params.httpErrors,
        });
      return {
        status: e.response.status,
        data: e.response.data,
      };
    }
  },
};
