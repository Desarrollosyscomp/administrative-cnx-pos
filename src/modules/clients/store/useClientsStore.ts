import { defineStore } from "pinia";
import { TTaxSchema } from "../interfaces/tax-schema.type";
import { TFiscalObligation } from "../interfaces/fiscal-obligation.type";
import { IdentificationTypeInterface } from "../../../interfaces/identification-types.interface";
import { TRegime } from "../interfaces/regime.type";
import { useStorage } from "@vueuse/core";
import {
  CountryInterface,
  DepartmentInterface,
  MunicipalityInterface,
  NeighborhoodInterface,
} from "../../locations/interfaces/locations.interface";
import { TInitialData } from "../interfaces/initial-data.type";
import { ClientsService } from "../services/clients.service";
import { TFinancialActivities } from "../interfaces/financial-activity.type";
import { TThirdParty } from "../interfaces/third-party.interface";
import { TSystemService } from "../interfaces/system-service.type";
import { ElectronicInvoiceProvider } from "../interfaces/electronic-invoice-provider.type";
import { TCredentials } from "../interfaces/credentials.type";

export const useClientsStore: any = defineStore({
  id: "clients",
  state: () => ({
    moduleMode: "add",
    page: 1,
    limit: 10,
    limitFinancialActivities: 4,
    search: "",
    is_active: true,
    openDialog: false,
    mode: "",
    itemsCount: 0,
    totalPages: 0,
    list: [] as Array<TThirdParty>,

    form: useStorage("form", {
      user_warehouse: "0",
      tradename: "",
      regime_dian_id: null,
      identification_type_code: null,
      identification_number: "",
      emails: [],
      phones: [],
      name: "",
      first_name: "",
      second_name: "",
      sure_name: "",
      second_sure_name: "",
      tax_schema_dian_id: "",
      fiscal_obligation_dian_id: "",
      financial_activities: [],
      address: "",
      country_id: 0,
      department_id: 0,
      municipality_id: 0,
      neighborhood_id: 0,
    } as any),
    selectedItem: {} as TThirdParty,
    isValidFormMainInfo: false,
    isValidFormFiscalInfo: false,
    isValidFormLocationInfo: false,
    isValidFormContactInfo: false,
    taxSchemas: [] as Array<TTaxSchema>,

    system_services_paginator: {
      page: 1,
      limit: 10,
      search: "",
      list: [] as Array<TSystemService>,
      itemsCount: 0,
      totalPages: 0,
    },

    electronic_invoice_providers: [] as Array<ElectronicInvoiceProvider>,
    selectedItemTaxxaInfo: {} as any,
    client_system_services: [] as Array<TSystemService>,

    fiscalObligations: [] as Array<TFiscalObligation>,
    identificationTypes: [] as Array<IdentificationTypeInterface>,
    regimes: [] as Array<TRegime>,
    selectedCountry: {} as CountryInterface,
    selectedDepartment: {} as DepartmentInterface,
    selectedMunicipality: {} as MunicipalityInterface,
    selectedNeighborhood: {} as NeighborhoodInterface,

    selectedFinancialActivities: [] as Array<TFinancialActivities>,
    financial_activities_list: [] as Array<TFinancialActivities>,
  }),

  actions: {
    async toogleDialog() {
      this.openDialog = !this.openDialog;
    },

    initialiceForm() {
      this.form = {
        user_warehouse: "0",
        tradename: "",
        regime_dian_id: null,
        identification_type_code: null,
        identification_number: "",
        emails: [],
        phones: [],
        name: "",
        first_name: "",
        second_name: "",
        sure_name: "",
        second_sure_name: "",
        tax_schema_dian_id: "",
        fiscal_obligation_dian_id: "",
        financial_activities: [],
        address: "",
        country_id: 0,
        department_id: 0,
        municipality_id: 0,
        neighborhood_id: 0,
      };
    },
    async loadInitialData() {
      const { taxSchemas, fiscalObligations, documentTypes, regimes } =
        await this.getInitialData();

      this.taxSchemas = taxSchemas;
      this.fiscalObligations = fiscalObligations;
      this.identificationTypes = documentTypes;
      this.regimes = regimes;
    },

    async getInitialData(): Promise<TInitialData> {
      const clientId = this.selectedItem?.id;
      let response = await ClientsService.getInitialData(+clientId);
      if (response.status == 200) {
        return response.data.response;
      }
      {
        return {
          thirdPartyFinancialActivities: [] as Array<TFinancialActivities>,
          taxSchemas: [] as Array<TTaxSchema>,
          fiscalObligations: [] as Array<TFiscalObligation>,
          documentTypes: [] as Array<IdentificationTypeInterface>,
          regimes: [] as Array<TRegime>,
        };
      }
    },

    getFullName() {
      return `${this.form.first_name ?? ""} 
      ${this.form.second_name ?? ""} 
      ${this.form.sure_name ?? ""} 
      ${this.form.second_sure_name ?? ""} `;
    },

    getFullIdentification() {
      const identificationIsSetted = this.form.identification_type_code;
      if (!identificationIsSetted) return "";

      const identificationType = this.identificationTypes.find(
        (_identificationType: any) =>
          _identificationType.dian_id === this.form.identification_type_code
      );
      return `${identificationType?.acronym} ${this.form.identification_number}`;
    },

    getRegimenName() {
      if (!this.form.regime_dian_id) {
        return null;
      }
      const res = this.regimes.find(
        (regime: any) => regime.dian_id === this.form.regime_dian_id
      );
      return `${res?.name}`;
    },

    parsedTaxSchema() {
      if (!this.form.tax_schema_dian_id) {
        return " ";
      }
      const res = this.taxSchemas.find(
        (tax: any) => tax.dian_id === this.form.tax_schema_dian_id
      );
      return `${res?.name}`;
    },

    parsedFiscalObligation() {
      if (!this.form.fiscal_obligation_dian_id) {
        return " ";
      }
      const res = this.fiscalObligations.find(
        (fiscal: any) => fiscal.dian_id === this.form.fiscal_obligation_dian_id
      );
      return `${res?.name}`;
    },

    async addClient(data: any) {
      const country_dian_id = this.selectedCountry?.dian_id;
      const department_dian_id = this.selectedDepartment?.dian_id;
      const municipality_dian_id = this.selectedMunicipality?.dian_id;
      const neighborhood_dian_id = this.selectedNeighborhood?.dian_id;
      const financial_activities_dian_ids =
        this.selectedFinancialActivities.map((financialActivity) => {
          return financialActivity.dian_id;
        });

      const response = await ClientsService.addClient({
        name: data.name,
        first_name: data.first_name,
        second_name: data.second_name,
        surename: data.sure_name,
        second_surename: data.second_sure_name,
        document_type: data.identification_type_code,
        identification_number: data.identification_number,
        address: data.address,
        country_id: country_dian_id,
        department_id: department_dian_id,
        municipality_id: municipality_dian_id,
        neighborhood_id:
          neighborhood_dian_id == "" ? undefined : neighborhood_dian_id,
        emails: data.emails,
        phones: data.phones,
        financial_activities: financial_activities_dian_ids,
        regime_dian_id: data.regime_dian_id,
        tax_schema_dian_id: data.tax_schema_dian_id,
        fiscal_obligation_dian_id: data.fiscal_obligation_dian_id,
      });
      if (response.data.status == 201) {
        this.initialiceForm();
        localStorage.removeItem("form");
        return {
          error: false,
          data: response.data.response,
        };
      } else {
        return {
          error: true,
          data: response.data.message,
        };
      }
    },

    getFiscalInfoForm() {
      return {
        tax_schema: this.form.tax_schema_dian_id,
        fiscal_obligation: this.form.fiscal_obligation_dian_id,
      };
    },

    getMainInfoForm() {
      return {
        firstName: this.form.first_name,
        secondName: this.form.second_name,
        surename: this.form.sure_name,
        second_surename: this.form.second_sure_name,
        tradename: this.form.tradename,
        name: this.form.name,
        documentType: this.form.identification_type_code,
        documentNumber: this.form.identification_number,
        regimen: this.form.regime_dian_id,
      };
    },

    getLocationInfoForm() {
      return {
        country_id: this.form.country_id,
        department_id: this.form.department_id,
        municipality_id: this.form.municipality_id,
      };
    },

    getContactInfoForm() {
      return {
        phones: this.form.phones,
        emails: this.form.emails,
      };
    },

    getFinancialActivitiesForm() {
      return {
        financial_activities: this.form.financial_activities,
      };
    },

    async getPaginatedFinancialActivities(
      financial_activities_list: Array<TFinancialActivities>
    ) {
      try {
        const aux = financial_activities_list.map(
          (financialActivity: TFinancialActivities) => {
            return financialActivity.dian_id;
          }
        );
        console.log(aux);
        let response = await ClientsService.getPaginateFinancialActivities(
          this.page,
          this.limitFinancialActivities,
          aux,
          this.search
        );
        if (response.status == 200) {
          const _response = response.data.response;
          return {
            list: _response.list,
            itemsCount: _response.count,
            totalPages: Math.ceil(_response.totalPages),
          };
        }
      } catch (e: any) {
        if (e.response.status === 404) {
          return {
            financialActivities: [],
            itemsCount: 0,
            totalPages: 0,
          };
        }
      }
    },

    async loadPaginatedFinancialActivities(
      financial_activities_list: Array<TFinancialActivities> = []
    ) {
      try {
        console.log(financial_activities_list);
        let response: any = await this.getPaginatedFinancialActivities(
          financial_activities_list
        );
        this.financial_activities_list = response.list;
        this.itemsCount = response.itemsCount;
        this.totalPages = response.totalPages;
        return response;
      } catch (e: any) {
        throw "Stop";
      }
    },

    async getPaginatedClients() {
      try {
        let response = await ClientsService.getPaginateClients(
          this.page,
          this.limit,
          this.search,
          this.is_active == null ? undefined : this.is_active
        );
        if (response.status == 200) {
          const _response = response.data.response;
          return {
            list: _response.list,
            itemsCount: _response.count,
            totalPages: Math.ceil(_response.totalPages),
          };
        }
      } catch (e: any) {
        if (e.response.status === 404) {
          return {
            list: [],
            itemsCount: 0,
            totalPages: 0,
          };
        }
      }
    },

    async loadPaginatedList() {
      let response: any = await this.getPaginatedClients();
      this.list = response.list;
      this.itemsCount = response.itemsCount;
      this.totalPages = response.totalPages;
      return {
        error: false,
        data: response,
      };
    },

    async getOneClient(id: string) {
      let response = await ClientsService.getClientById(id);
      if (response.status == 200) {
        return {
          error: false,
          data: response.data.response,
        };
      } else {
        return {
          error: true,
          data: {},
        };
      }
    },

    async delete(client_id: number) {
      let is_active = !this.selectedItem?.is_active;
      let response = await ClientsService.deleteClient(client_id, is_active);
      if (response.status == 200) {
        this.loadPaginatedList();
        return {
          error: false,
          data: response.data,
        };
      } else {
        return {
          error: true,
          data: {},
        };
      }
    },

    async edit(id: string, data: any) {
      const financial_activities_dian_ids =
        this.selectedFinancialActivities.map((financialActivity) => {
          return financialActivity.dian_id;
        });
      const country_dian_id = this.selectedCountry?.dian_id;
      const department_dian_id = this.selectedDepartment?.dian_id;
      const municipality_dian_id = this.selectedMunicipality?.dian_id;
      const neighborhood_dian_id = this.selectedNeighborhood?.dian_id;
      let response = await ClientsService.editClient(+id, {
        tradename: data.tradename,
        barcode: data.barcode,
        third_party_classification_ids: data.third_party_classification_ids,
        regime_dian_id: data.regime_dian_id,
        document_type: data.identification_type_code,
        identification_number: data.identification_number,
        emails: data.emails.map((email: any) => ({
          email: email.email,
        })),
        phones: data.phones.map((phone: any) => ({
          number: phone.number,
        })),
        name: data.name,
        first_name: data.first_name,
        second_name: data.second_name,
        surename: data.sure_name,
        second_surename: data.second_sure_name,
        tax_schema_dian_id: data.tax_schema_dian_id,
        fiscal_obligation_dian_id: data.fiscal_obligation_dian_id,
        financial_activities: financial_activities_dian_ids,
        address: data.address,
        country_id: country_dian_id ?? null,
        department_id: department_dian_id ?? null,
        municipality_id: municipality_dian_id ?? null,
        neighborhood_id:
          neighborhood_dian_id == "" ? undefined : neighborhood_dian_id,
      });
      if (response.status == 200) {
        return {
          error: false,
          data: response.data.response,
        };
      } else {
        return {
          error: true,
          data: response.data.message,
        };
      }
    },

    async loadSystemServices() {
      let response = await ClientsService.getPaginatedSystemServices(
        this.system_services_paginator.page,
        this.system_services_paginator.limit,
        this.system_services_paginator.search
      );
      if (response.status == 200) {
        this.system_services_paginator.list = response.data.response.list;
        this.system_services_paginator.itemsCount =
          response.data.response.count;
        this.system_services_paginator.totalPages =
          response.data.response.totalPages;
      }
    },
    async syncSystemServices(
      client_id: number,
      system_services_ids: Array<number>
    ) {
      const response = await ClientsService.syncSystemServices(
        client_id,
        system_services_ids
      );
      if (response.status == 200) {
        return { error: false };
      } else {
        return { error: true };
      }
    },
    async loadClientSystemServices(id: string) {
      let response = await ClientsService.getClientSystemServices(id);
      if (response.status == 200) {
        this.client_system_services = response.data.response.system_services;
      }
    },
    async loadClient(id: string) {
      let response = await ClientsService.getClientById(id);
      if (response.status == 200) {
        this.selectedItem = response.data.response.client;
      }
    },

    async loadTenantDetails(id: string) {
      let response = await ClientsService.getTenantInfo(+id);
      if (response.status == 200) {
        this.selectedItemTaxxaInfo = response.data.response;
      }
    },

    async saveTaxxaInfo(data: any) {
      let response = await ClientsService.saveTaxxaInfo(
        this.selectedItem.id,
        data
      );
      if (response.status == 201) {
        return {
          error: false,
          data: response.data.response,
        };
      } else {
        return {
          error: true,
        };
      }
    },

    async createSchema() {
      let response = await ClientsService.createClientSchema(
        this.selectedItem.id
      );
      if (response.status == 201) {
        return {
          error: false,
          data: response.data.response,
        };
      } else {
        return {
          error: true,
        };
      }
    },
    async loadElectronicInvoiceProviders() {
      let response = await ClientsService.getElectronicInvoiceProviders();
      if (response.status == 200) {
        this.electronic_invoice_providers =
          response.data.response.electronicInvoiceProviders;
      }
    },

    async editCredentials(id: string, data: TCredentials) {
      let response = await ClientsService.editCredentials(+id, {
        email: data.email,
        password: data.password,
        url: data.url,
        login_url: data.login_url,
      });
      if (response.status == 200) {
        return {
          error: false,
          data: response.data.response,
        };
      } else {
        return {
          error: true,
          data: response.data.message,
        };
      }
    },

    async createLicense(data: any) {
      let response = await ClientsService.createLicense(data);
      if (response.status == 201) {
        return {
          error: false,
          data: response.data.response,
        };
      } else {
        return {
          error: true,
          data: response.data.response,
        };
      }
    },
    async getLicense(tenant_id: number) {
      let response = await ClientsService.getLicense(tenant_id);
      if (response.status == 201) {
        return {
          error: false,
          data: response.data.response,
        };
      } else {
        return {
          error: true,
          data: response.data.response,
        };
      }
    },
  },
});
