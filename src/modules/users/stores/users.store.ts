import { defineStore } from "pinia";
import { UsersService } from "../services/users.services";
import { UsersInterface } from "../interfaces/users.interface";
export const useUsersStore: any = defineStore({
  id: "users-store",
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
    list: [] as Array<UsersInterface>,
    selectedItem: {} as UsersInterface,
  }),
  actions: {
    // async getAllUsers() {
    //   try {
    //     let response = await UsersService.getAll();
    //     if (response.status == 200) {
    //       return response.data;
    //     }
    //   } catch (e: any) {
    //     console.log(e.response);
    //     throw "Stop";
    //   }
    // },
    async getPaginatedUsers() {
      try {
        let response = await UsersService.getPaginated(
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
        let response = await UsersService.add({
          //company_id: data.companyId,
          // users_type_id: data.usersTypeId,
          //is_active: true,
          username: data.username,
          password: data.password,
          role_id: data.role_id,
          // description: data.description,
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
        let response: any = await this.getPaginatedUsers();
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
        let response = await UsersService.edit(id, {
          //company_id: data.companyId,
          users_type_id: data.usersTypeId,
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
    // async delete() {
    //   let is_active = !this.selectedItem.is_active;
    //   try {
    //     let response = await UsersService.delete(
    //       this.selectedItem.id,
    //       // is_active
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
    async addEnterprisesToUser(data: object) {
      try {
        let response = await UsersService.addEnterprisesToUser(data);
        if (response.status == 200) {
          return response.data.response;
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
