<template>
  <v-card>
    <v-app>
      <v-app-bar color="#4d4d4dff">
        <template v-slot:prepend>
          <v-app-bar-nav-icon @click.stop="drawer = !drawer" color="white">
          </v-app-bar-nav-icon>
        </template>

        <v-spacer></v-spacer>
        <v-btn icon="mdi-cog" color="white">
        </v-btn>
      </v-app-bar>

      <v-main>
        <v-container fluid>
          <slot></slot>
        </v-container>
      </v-main>
      <v-navigation-drawer v-model="drawer" temporary>
        <div>
          <v-list-item style="padding: 4%" prepend-avatar="https://randomuser.me/api/portraits/men/78.jpg"
            title="John Leider"></v-list-item>
        </div>

        <v-divider></v-divider>

        <v-list density="compact" nav>
          <v-list-item
            @click="goTo('users-list')"
            prepend-icon="mdi-account"
            title="Usuarios"
            value="users-list"
          ></v-list-item>
          <v-list-item
            @click="goTo('client-list')"
            prepend-icon="mdi-account-group"
            title="Clientes"
            value="client-list"
          ></v-list-item>
          <v-list-item
            @click="goTo('permissions-list')"
            prepend-icon="mdi-fingerprint"
            title="Permisos usuarios"
            value="permissions-list"
          ></v-list-item>
          <v-list-item
            @click="logOut"
            prepend-icon="mdi-logout"
            title="Cerrar sesión"
            value="logout"
          ></v-list-item>

        </v-list>
      </v-navigation-drawer>
    </v-app>
  </v-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import router from '../router';
import { useAuthStore } from '../modules/auth/store/useStoreAuth';
const drawer = ref(false);
const authStore = useAuthStore();

const goTo = (routeName: string) => {
  router.push({ name: routeName });
};

const showOption = (module: string): boolean => {
  let hasAccess = false;

  for (let i = 0; i < authStore.permissions.moduleAccesses.length; i++) {
    const moduleAccess = authStore.permissions.moduleAccesses[i];
    if (moduleAccess.module.name === module) {
      hasAccess = true;
      break;
    }
  }

  return hasAccess;
};

const logOut = () => {
  authStore.logout();
};
</script>

<style scoped></style>