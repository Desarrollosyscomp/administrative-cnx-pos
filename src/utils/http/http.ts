import axios, { AxiosRequestConfig } from "axios";
import { showNotification } from "./http-notifications";
import { HttpErrors, HttpErrorsAndExceptions } from "./interfaces";
export const Http = {
  async post(
    params: {
      url: string;
      data: any;
      config?: AxiosRequestConfig<any>;
      showHttpError?: boolean;
      httpErrors?: Array<HttpErrors> | HttpErrorsAndExceptions;
    } = {
      url: "",
      data: {},
      config: undefined,
      showHttpError: true,
      httpErrors: undefined,
    }
  ) {
    try {
      return await axios.post(params.url, params.data, params.config ?? {});
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
  async patch(
    params: {
      url: string;
      data: any;
      config?: AxiosRequestConfig<any>;
      showHttpError?: boolean;
      httpErrors?: Array<HttpErrors> | HttpErrorsAndExceptions;
    } = {
      url: "",
      data: {},
      config: undefined,
      showHttpError: true,
      httpErrors: undefined,
    }
  ) {
    try {
      return await axios.patch(params.url, params.data, params.config ?? {});
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
  async put(
    params: {
      url: string;
      data: any;
      config?: AxiosRequestConfig<any>;
      showHttpError?: boolean;
      httpErrors?: Array<HttpErrors> | HttpErrorsAndExceptions;
    } = {
      url: "",
      data: {},
      config: undefined,
      showHttpError: true,
      httpErrors: undefined,
    }
  ) {
    try {
      return await axios.put(params.url, params.data, params.config ?? {});
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
  async delete(
    params: {
      url: string;
      config?: AxiosRequestConfig<any>;
      showHttpError?: boolean;
      httpErrors?: Array<HttpErrors> | HttpErrorsAndExceptions;
    } = {
      url: "",
      config: undefined,
      showHttpError: true,
      httpErrors: undefined,
    }
  ) {
    try {
      return await axios.delete(params.url, params.config ?? {});
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
  async get(
    params: {
      url: string;
      config?: AxiosRequestConfig<any>;
      showHttpError?: boolean;
      httpErrors?: Array<HttpErrors> | HttpErrorsAndExceptions;
    } = {
      url: "",
      config: undefined,
      showHttpError: true,
      httpErrors: undefined,
    }
  ) {
    try {
      return await axios.get(params.url, params.config);
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
