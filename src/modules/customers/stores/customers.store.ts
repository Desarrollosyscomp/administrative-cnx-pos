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
    //   try {
    //     let response = await CustomersService.getAll();
    //     if (response.status == 200) {
    //       return response.data;
    //     }
    //   } catch (e: any) {
    //     console.log(e.response);
    //     throw "Stop";
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
      // try {
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
      try {
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
      } catch (e: any) {
        console.log(e.response);
        throw "Stop";
      }
    },
    async loadPaginatedList() {
      try {
        let response: any = await this.getPaginatedCustomers();
        this.list = response.list;
        this.itemsCount = response.itemsCount;
        this.totalPages = response.totalPages;
        return response;
      } catch (e: any) {
        console.log(e.response);
        throw "Stop";
      }
    },
    async edit(id: string, data: any) {
      try {
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
      } catch (e: any) {
        console.log(e.response);
        throw "Stop";
      }
    },
    async delete() {
      let is_active = !this.selectedItem.is_active;
      try {
        let response = await CustomersService.delete(
          this.selectedItem.id,
          is_active
        );
        if (response.status == 200) {
          this.loadPaginatedList();
          return response.data;
        }
      } catch (e: any) {
        console.log(e.response);
        throw "Stop";
      }
    },
    // Temporal method
    async getCompanies() {
      try {
        let response = await CustomersService.getCompanies();
        if (response.status == 200) {
          return response.data.response.companies;
        } else {
          return [];
        }
      } catch (e: any) {
        console.log(e.response);
        throw "Stop";
      }
    },
  },
});
