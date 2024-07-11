import { defineStore } from "pinia";
import { ProductsService } from "../services/products.services";
import { ProductsInterface } from "../interfaces/products.interface";
export const useProductsStore: any = defineStore({
  id: "products-store",
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
    list: [] as Array<ProductsInterface>,
    selectedItem: {} as ProductsInterface,
  }),
  actions: {
    // async getAllProducts() {
    //   try {
    //     let response = await ProductsService.getAll();
    //     if (response.status == 200) {
    //       return response.data;
    //     }
    //   } catch (e: any) {
    //     console.log(e.response);
    //     throw "Stop";
    //   }
    // },
    async getPaginatedProducts() {
      try {
        let response = await ProductsService.getPaginated(
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
        let response = await ProductsService.add({
          //company_id: data.companyId,
          products_type_id: data.productsTypeId,
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
        let response: any = await this.getPaginatedProducts();
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
        let response = await ProductsService.edit(id, {
          //company_id: data.companyId,
          products_type_id: data.productsTypeId,
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
        let response = await ProductsService.delete(
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
        let response = await ProductsService.getCompanies();
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
