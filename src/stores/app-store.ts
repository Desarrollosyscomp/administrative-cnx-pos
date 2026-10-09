// ==================== STORE GLOBAL: app-store ====================
// Estado de la pantalla de carga; afterLoading la muestra mientras se ejecuta una función.
import { defineStore } from "pinia";
// import { PermissionsService } from "../services/permissions.service";

export const useAppStore: any = defineStore({
  id: "app-store",
  state: () => ({
    showLoadingScreen: false,
    showSplashScreen: false,
  }),
  actions: {
    // -------------------- Muestra la pantalla de carga mientras se ejecuta f --------------------
    async afterLoading(f: Function) {
      this.showLoadingScreen = true;
      await f()
      this.showLoadingScreen = false;
    },
    async getAllPermissions() {
      // const response = await PermissionsService.getAllPermissions();
      // return response.data.response;
    },
    async getPermissionsByUserId(userId: number) {
      userId;
      // const response = await PermissionsService.getPermissionsByUserId(userId);
      // return response.data.response;
    },
  },
});
