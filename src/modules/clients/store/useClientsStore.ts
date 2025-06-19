import { defineStore } from "pinia";
import { TTaxSchema } from "../interfaces/tax-schema.type";
import { TFiscalObligation } from "../interfaces/fiscal-obligation.type";
import { IdentificationTypeInterface } from "../../../interfaces/identification-types.interface";
import { TRegime } from "../interfaces/regime.type";
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

export const useClientsStore: any = defineStore({
  id: "clients",
  state: () => ({
    moduleMode: "add",
    page: 1,
    limit: 4,
    search: "",
    is_active: true,
    openDialog: false,
    mode: "",
    itemsCount: 0,
    totalPages: 0,
    list: [] as Array<TThirdParty>, //revisar en el pos

    form: {} as any,
    selectedItem: {} as any,
    isValidFormMainInfo: false,
    isValidFormFiscalInfo: false,
    isValidFormLocationInfo: false,
    isValidFormContactInfo: false,
    taxSchemas: [] as Array<TTaxSchema>,

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
      let response = await ClientsService.getInitialData(clientId);
      if (response.status == 200) {
        return response.data.response;
      }
      {
        return {
          thirdPartyFinancialActivities: [],
          taxSchemas: [],
          fiscalObligations: [],
          documentTypes: [],
          regimes: [],
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
      console.log(this.fiscalObligations);
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
        financial_activities: data.financial_activities,
      });
      if (response.status == 201) {
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

    async getPaginatedSyncFinancialActivities(
      financial_activities_list: Array<TFinancialActivities>
    ) {
      try {
        const aux = financial_activities_list.map(
          (financialActivity: TFinancialActivities) => {
            return financialActivity.dian_id;
          }
        );
        let response = await ClientsService.getPaginateFinancialActivities(
          this.page,
          this.limit,
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
        let response: any = await this.getPaginatedSyncFinancialActivities(
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
          console.log(_response);
          return {
            list: _response.list,
            itemsCount: _response.count,
            totalPages: Math.ceil(_response.totalPages),
          };
        }
      } catch (e: any) {
        console.log(e.response);
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
      console.log(id);
      let response = await ClientsService.getClientById(id);
      console.log(response.data.response)
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

    async delete() {
      let is_active = !this.selectedItem.is_active;
      let response = await ClientsService.deleteClient(
        this.selectedItem.id,
        is_active
      );
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
  },
});
