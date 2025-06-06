import { defineStore } from "pinia";

export const useClientsStore: any = defineStore({
  id: "clients",
  state: () => ({
    ModuleMode: "",
    openDialog: false,
    mode: "",
    form: {} as any,
    financialActivitiesListTest: [
      {
        name: "Actividad 1",
        code: "123456",
      },
      {
        name: "Actividad 2",
        code: "45678",
      },
      {
        name: "Actividad 3",
        code: "444445",
      },
      {
        name: "Actividad 4",
        code: "744411",
      },
    ],
    selectedFinancialActivities: [] as any
  }),

  actions: {
    async toogleDialog() {
      this.openDialog = !this.openDialog;
    },
    initialiceForm() {
      this.form = {
        user_warehouse: "0",
        use_points: false,
        has_coupons: false,
        has_price_list: false,
        price_list_id: 0,
        tradename: "",
        barcode: "",
        third_party_classification_ids: [],
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
        third_party_type_ids: [],
        amount: 0,
        init_date: "2025-02-05T19:55:23.008Z",
        end_date: "2025-02-05T19:55:23.008Z",
        grace_days: 0,
      };
    },
  },
});
