import { defineStore } from "pinia";
import { CustomersService } from "../services/customers.services";
import { CustomersInterface } from "../interfaces/customers.interface";
export const useCustomersStore: any = defineStore({
  id: "customers-store",
  state: () => ({
    moduleMode: "",
    limit: 10,
    page: 1,
    search: "",
    isActive: true,
    initDate: "",
    endDate: "",
    itemsCount: 0,
    totalPages: 0,
    advancedSearchActive: false,
    list: [] as Array<CustomersInterface>,
    selectedItem: {} as CustomersInterface,
  }),
  actions: {
    // async getAllCustomers() {
    //   let response = await CustomersService.getAll();
    //   if (response.status == 200) {
    //     return response.data;
    //   }
    // },
    async getPaginatedCustomers() {
      return {
        list: [
          { id: 1, client: "John Doe", status: "activo"},
          { id: 2, client: "Jane Doe", status: "inactivo"},
          { id: 3, client: "Jaime Doe", status: "inactivo"},
          { id: 4, client: "Jane Doe", status: "inactivo"},
          { id: 5, client: "Jane Doe", status: "inactivo"}
        ],
        itemsCount: 80,
        totalPages: Math.ceil(15),
      };
    
      //   let response = await CustomersService.getPaginated(
      //     this.limit,
      //     this.page,
      //     this.search,
      //     this.isActive == null ? undefined : this.isActive,
      //     this.initDate,
      //     this.endDate
      //   );
      //   if (response.status == 200) {
      //     const _response = response.data.response;
      //     return {
      //       list: _response.list,
      //       itemsCount: _response.count,
      //       totalPages: Math.ceil(_response.totalPages),
      //     };
      //   }
      // } catch (e: any) {
      //   console.log(e.response);
      //   if (e.response.status === 404) {
      //     return {
      //       list: [],
      //       itemsCount: 0,
      //       totalPages: 0,
      //     };
      //   }
      // }
    },
    async add(data: any) {
      let response = await CustomersService.add({
        //company_id: data.companyId,
        customers_type_id: data.customersTypeId,
        //is_active: true,
        name: data.name,
        description: data.description,
      });
      if (response.status == 201) {
        this.loadPaginatedList();
        return response.data;
      }      
    },
    async loadPaginatedList() {
      let response: any = await this.getPaginatedCustomers();
      this.list = response.list;
      this.itemsCount = response.itemsCount;
      this.totalPages = response.totalPages;
      return response;      
    },
    async edit(id: string, data: any) {
      let response = await CustomersService.edit(id, {
        //company_id: data.companyId,
        customers_type_id: data.customersTypeId,
        //is_active: true,
        name: data.name,
        description: data.description,
      });
      if (response.status == 200) {
        this.loadPaginatedList();
        return response.data;
      }
    },
    async delete() {
      let is_active = !this.selectedItem.is_active;
      let response = await CustomersService.delete(
        this.selectedItem.id,
        is_active
      );
      if (response.status == 200) {
        this.loadPaginatedList();
        return response.data;
      }
    },
    // Company method
    async getCompanies() {
      let response = await CustomersService.getCompanies();
      if (response.status == 200) {
        return response.data.response.companies;
      } else {
        return [];
      }
    },
    async getIdentificationsType() {
      let identificationTypes = [
        {
            "id": 1,
            "name": "Registro Civil",
            "code": "11",
            "acronym": "R.C.",
            "type": 1,
            "is_active": true,
            "created_at": "2024-10-09T20:29:55.534Z",
            "updated_at": null
        },
        {
            "id": 2,
            "name": "Tarjeta de Identidad",
            "code": "12",
            "acronym": "T.I.",
            "type": 1,
            "is_active": true,
            "created_at": "2024-10-09T20:29:55.534Z",
            "updated_at": null
        },
        {
            "id": 3,
            "name": "Cédula de Ciudadanía",
            "code": "13",
            "acronym": "C.C",
            "type": 1,
            "is_active": true,
            "created_at": "2024-10-09T20:29:55.534Z",
            "updated_at": null
        },
        {
            "id": 4,
            "name": "Permiso de Protección Temporal",
            "code": "PPT",
            "acronym": "PPT",
            "type": 1,
            "is_active": true,
            "created_at": "2024-10-09T20:29:55.534Z",
            "updated_at": null
        },
        {
            "id": 5,
            "name": "Tarjeta de Extranjería",
            "code": "21",
            "acronym": "T.E.",
            "type": 1,
            "is_active": true,
            "created_at": "2024-10-09T20:29:55.534Z",
            "updated_at": null
        },
        {
            "id": 6,
            "name": "Cédula de Extranjería",
            "code": "22",
            "acronym": "C.E",
            "type": 1,
            "is_active": true,
            "created_at": "2024-10-09T20:29:55.534Z",
            "updated_at": null
        },
        {
            "id": 7,
            "name": "Número de Identificación Tributaria",
            "code": "31",
            "acronym": "N.I.T",
            "type": 2,
            "is_active": true,
            "created_at": "2024-10-09T20:29:55.534Z",
            "updated_at": null
        },
        {
            "id": 8,
            "name": "Pasaporte",
            "code": "41",
            "acronym": "PA",
            "type": 1,
            "is_active": true,
            "created_at": "2024-10-09T20:29:55.534Z",
            "updated_at": null
        },
        {
            "id": 9,
            "name": "Documento de Identificación Extranjero",
            "code": "41",
            "acronym": "D.I.E",
            "type": 1,
            "is_active": true,
            "created_at": "2024-10-09T20:29:55.534Z",
            "updated_at": null
        },
        {
            "id": 10,
            "name": "N.I.T de Otro País",
            "code": "50",
            "acronym": "N.I.T.O.P",
            "type": 2,
            "is_active": true,
            "created_at": "2024-10-09T20:29:55.534Z",
            "updated_at": null
        },
        {
            "id": 11,
            "name": "Número Único de Identificación Personal",
            "code": "50",
            "acronym": "N.U.I.P",
            "type": 1,
            "is_active": true,
            "created_at": "2024-10-09T20:29:55.534Z",
            "updated_at": null
        }
      ]
      return identificationTypes;
    },
    async addCompany(data: object) {
      let response = await CustomersService.addCompany(data);
      console.log(response);
      return response;
    }
  },
});
