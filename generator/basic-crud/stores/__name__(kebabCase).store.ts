import { defineStore } from "pinia";
import { __name__(pascalCase)Service } from "../services/__name__(kebabCase).services";
import { __name__(pascalCase)Interface } from "../interfaces/__name__(kebabCase).interface";
export const use__name__(pascalCase)Store: any = defineStore({
  id: "__name__(kebabCase)-store",
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
    list: [] as Array<__name__(pascalCase)Interface>,
    selectedItem: {} as __name__(pascalCase)Interface,
  }),
  actions: {
    // async getAll__name__(pascalCase)() {
    //   try {
    //     let response = await __name__(pascalCase)Service.getAll();
    //     if (response.status == 200) {
    //       return response.data;
    //     }
    //   } catch (e: any) {
    //     console.log(e.response);
    //     throw "Stop";
    //   }
    // },
    async getPaginated__name__(pascalCase)() {
      try {
        let response = await __name__(pascalCase)Service.getPaginated(
          this.limit,
          this.page,
          this.search,
          this.isActive == null ? undefined : this.isActive,
          this.initDate,
          this.endDate
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
    async add(data: any) {
      try {
        let response = await __name__(pascalCase)Service.add({
          //company_id: data.companyId,
          __name__(snakeCase)_type_id: data.__name__(camelCase)TypeId,
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
        let response: any = await this.getPaginated__name__(pascalCase)();
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
        let response = await __name__(pascalCase)Service.edit(id, {
          //company_id: data.companyId,
          __name__(snakeCase)_type_id: data.__name__(camelCase)TypeId,
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
        let response = await __name__(pascalCase)Service.delete(
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
        let response = await __name__(pascalCase)Service.getCompanies();
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
