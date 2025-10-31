import { defineStore } from "pinia";
import { PermissionsService } from "../services/permissions.services";
import { PermissionsInterface } from "../interfaces/permissions.interface";
export const usePermissionsStore: any = defineStore({
  id: "permissions-store",
  state: () => ({
    moduleMode: "",
    limit: 10,
    page: 1,
    search: "",
    is_active: true,
    initDate: "",
    endDate: "",
    itemsCount: 0,
    totalPages: 0,
    advancedSearchActive: false,
    list: [] as Array<PermissionsInterface>,
    selectedItem: {} as PermissionsInterface,
  }),
  actions: {
    // async getAllPermissions() {
    //   try {
    //     let response = await PermissionsService.getAll();
    //     if (response.status == 200) {
    //       return response.data;
    //     }
    //   } catch (e: any) {
    //     console.log(e.response);
    //     throw "Stop";
    //   }
    // },
    async getPaginatedPermissions() {
      try {
        let response = await PermissionsService.getPaginated(
          this.limit,
          this.page,
          this.search,
          this.is_active == null ? undefined : this.is_active,
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
        let response = await PermissionsService.add({
          //company_id: data.companyId,
          permissions_type_id: data.permissionsTypeId,
          //is_active: true,
          name: data.name,
          description: data.description,
        });
        if (response.status == 201) {
          this.loadPaginatedList();
          return response.data;
        }
      } catch (e: any) {
        throw "Stop";
      }
    },
    async loadPaginatedList() {
      try {
        let response: any = await this.getPaginatedPermissions();
        this.list = response.list;
        this.itemsCount = response.itemsCount;
        this.totalPages = response.totalPages;
        return response;
      } catch (e: any) {
        throw "Stop";
      }
    },
    async edit(id: string, data: any) {
      try {
        let response = await PermissionsService.edit(id, {
          //company_id: data.companyId,
          permissions_type_id: data.permissionsTypeId,
          //is_active: true,
          name: data.name,
          description: data.description,
        });
        if (response.status == 200) {
          this.loadPaginatedList();
          return response.data;
        }
      } catch (e: any) {
        throw "Stop";
      }
    },
    // async delete() {
    //   let is_active = !this.selectedItem.is_active;
    //   try {
    //     let response = await PermissionsService.delete(
    //       this.selectedItem.id,
    //       is_active
    //     );
    //     if (response.status == 200) {
    //       this.loadPaginatedList();
    //       return response.data;
    //     }
    //   } catch (e: any) {
    //     console.log(e.response);
    //     throw "Stop";
    //   }
    // },
    // Temporal method
    async getCompanies() {
      try {
        let response = await PermissionsService.getCompanies();
        if (response.status == 200) {
          return response.data.response.companies;
        } else {
          return [];
        }
      } catch (e: any) {
        throw "Stop";
      }
    },
  },
});
