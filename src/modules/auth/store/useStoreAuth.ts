import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";
import { loginService } from "../services/Auth.services";
import { jwtDecode } from "jwt-decode";
export interface Item {
  token: String;
  isLogged: boolean;
  typeUser: String;
}

export const useAuthStore: any = defineStore({
  id: "auth",
  state: () => ({
    user: useStorage("auth", {
      token: "",
      isLogged: false,
      typeUser: "",
      exp: "",
    }),
    permissions: useStorage("permissions", {
      moduleAccesses: [],
      actions: [],
    }),
  }),

  actions: {
    logout() {
      this.user = {
        token: "",
        isLogged: false,
        typeUser: "",
        exp: "",
      };
      window.location.assign("/login");
    },
    async login(user: string, password: string) {
      try {
        const response = await loginService.logIn({
          username: user,
          password: password,
        });
        let decoded: any = jwtDecode(response.data);
        console.log(decoded);
        this.user = {
          token: response.data,
          isLogged: true,
          typeUser: "",
          exp: decoded.exp,
        };
        return { isLogged: true };
        // this.authCheck();
      } catch (error) {
        console.error(error);
        return { isLogged: false };
      }
    },
    authCheck() {
      if (this.user.token.length > 1) {
        var current_time = new Date().getTime() / 1000;
        if (current_time > parseInt(this.user.exp)) {
          this.user = {
            token: "",
            isLogged: false,
            typeUser: "",
            exp: "",
          };
          window.location.assign("/login");
        } else {
          window.location.assign("/home");
        }
      } else {
        this.user = {
          token: "",
          isLogged: false,
          typeUser: "",
          exp: "",
        };
      }
    },
    async loadPermissions() {
      const response = await loginService.loadPermissions(this.user.token);
      this.permissions.actions = response.data.response.permissions;
      this.permissions.moduleAccesses = response.data.response.moduleAccesses;
    },
  },
});
