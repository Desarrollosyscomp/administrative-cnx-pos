// ==================== STORE: users-store ====================
// Estado del listado (paginación, búsqueda, filtro), del diálogo y del usuario seleccionado.
// Los errores de validación de la API se devuelven como { error: true, data: mensaje }.
import { defineStore } from "pinia";
import { UsersService } from "../services/users.services";
import { UsersInterface } from "../interfaces/users.interface";
export const useUsersStore: any = defineStore({
  id: "users-store",
  state: () => ({
    moduleMode: "",
    page: 1,
    limit: 10,
    search: "",
    is_active: true,
    itemsCount: 0,
    totalPages: 0,
    advancedSearchActive: false,
    list: [] as Array<UsersInterface>,
    selectedItem: {} as UsersInterface,
    openDialog: false,
  }),
  actions: {
    // -------------------- Abre o cierra el diálogo de usuario --------------------
    async toogleDialog() {
      this.openDialog = !this.openDialog;
    },

    async getOneUser(id: string) {
      let response = await UsersService.getOne(id);
      if (response.status == 200) {
        this.selectedItem = response.data;
      }
    },

    // -------------------- Crea un usuario y recarga la lista --------------------
    async add(data: any) {
      let response = await UsersService.add({
        username: data.username,
        password: data.password,
        confirm_password: data.confirmPassword,
      });
      if (response.status == 201) {
        this.loadPaginatedList();
        return {
          error: false,
          data: response.data,
        };
      } else if (response.data.response.validationError) {
        return {
          error: true,
          data: response.data.response.validationError.message,
        };
      }
    },

    // -------------------- Consulta una página de usuarios --------------------
    async getPaginatedUsers() {
      try {
        let response = await UsersService.getPaginated(
          this.limit,
          this.page,
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

    // -------------------- Actualiza la lista con la página actual --------------------
    async loadPaginatedList() {
      let response: any = await this.getPaginatedUsers();
      this.list = response.list;
      this.itemsCount = response.itemsCount;
      this.totalPages = response.totalPages;
      return {
        error: false,
        data: response,
      };
    },

    // -------------------- Alterna el estado activo del usuario seleccionado --------------------
    async delete() {
      let is_active = !this.selectedItem.is_active;
      try {
        let response = await UsersService.delete(
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

    // -------------------- Cambia el nombre de usuario --------------------
    async updateUsername(id: string, data: any) {
      let response = await UsersService.editUsername(id, {
        username: data.username,
      });
      if (response.status == 200) {
        this.loadPaginatedList();
        return {
          error: false,
          data: response.data,
        };
      } else if (response.data.response.validationError) {
        return {
          error: true,
          data: response.data.response.validationError.message,
        };
      }
    },

    // -------------------- Cambia la contraseña --------------------
    async updatePassword(id: string, data: any) {
      let response = await UsersService.editPassword(id, {
        current_password: data.currentPassword,
        new_password: data.newPassword,
        confirm_password: data.confirmPassword,
      });
      if (response.status == 200) {
        this.loadPaginatedList();
        return {
          error: false,
          data: response.data,
        };
      } else if (response.data.response.validationError) {
        return {
          error: true,
          data: response.data.response.validationError.message,
        };
      }
    },


  },
});
