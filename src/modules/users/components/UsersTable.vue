<!-- ******************** HTML ******************** -->
<template>
  <div class="show d-none d-sm-block">
    <v-table>
      <thead>
        <tr>
          <th class="text-left font-weight-black">NOMBRE</th>
          <th class="text-right font-weight-black">ESTADO</th>
          <th class="text-right font-weight-black">ACCIONES</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in usersStore.list" :key="index">
          <td class="text-left text-truncate" style="max-width: 20px">
            {{ item.username }}
          </td>
          <td class="text-right">
            <v-badge :color="item.is_active ? 'success' : '#841811ff'" class="mr-12 mb-1">
              <template v-slot:badge>
                <span class="pa-2">{{
                  item.is_active ? "Activo" : "Inactivo"
                }}</span>
              </template>
            </v-badge>
          </td>
          <td class="text-right">
            <!-- <v-tooltip text="Deatlles" location="bottom">
              <template v-slot:activator="{ props }">
                <v-btn
                  v-bind="props"
                  class="ma-2"
                  variant="text"
                  icon="mdi-eye"
                  color="blue-lighten-2"
                  @click="showRecord(item)"
                >
                </v-btn>
              </template>
            </v-tooltip> -->
            <v-menu location="start">
              <template v-slot:activator="{ props }">
                <v-btn size="small" color="#841811ff" variant="outlined" v-bind="props" >
                  Opciones
                </v-btn>
              </template>
              <v-list>
                <v-list-item value="1">
                  <v-list-item-title @click="goToEdit(item)">
                   <v-icon color="blue-lighten-2" size="small">mdi-pencil</v-icon> Editar usuario
                  </v-list-item-title>
                </v-list-item>
                <v-list-item value="2">
                  <v-list-item-title @click="unableItem(item)">
                    <v-icon size="small" :color="item.is_active ? 'red-lighten-2' : 'blue-lighten-2'">
                      {{ item.is_active ? 'mdi-delete' : 'mdi-restore' }}
                    </v-icon>
                    {{
                      item.is_active ? "Inactivar" : "Restaurar"
                    }}
                    usuario
                  </v-list-item-title>
                </v-list-item>
                <v-list-item value="3" @click="managePermissions(item)">
                  <v-list-item-title>
                   <v-icon size="small" >mdi-fingerprint</v-icon> Permisos
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
           <!-- <v-tooltip v-if="item.is_active" text="Editar" location="top">
              <template v-slot:activator="{ props }">
                <v-btn
                  v-bind="props"
                  class=""
                  variant="text"
                  icon="mdi-pencil"
                  size="small"
                  color="blue-lighten-2"
                  @click="goToEdit(item)"
                >
                </v-btn>
              </template>
            </v-tooltip>
            <v-tooltip
              :text="item.is_active ? 'Desactivar' : 'Restaurar'"
              location="top"
            >
              <template v-slot:activator="{ props }">
                <v-btn
                  v-bind="props"
                  class=""
                  size="small"
                  variant="text"
                  :icon="item.is_active ? 'mdi-delete' : 'mdi-restore'"
                  :color="item.is_active ? 'red-lighten-2' : 'blue-lighten-2'"
                  @click="unableItem(item)"
                >
                </v-btn>
              </template>
            </v-tooltip> -->
          </td>
        </tr>
      </tbody>
    </v-table>
  </div>
</template>
<!-- ******************** JavaScript ******************** -->
<script setup lang="ts">
import { useUsersStore } from "../stores/users.store";
import { UsersInterface } from "../interfaces/users.interface";

const usersStore = useUsersStore();
const emit = defineEmits(["onEdit", "onDeactivate", "onManagePermissions"]);
const goToEdit = (users: UsersInterface) => {
  console.log("users", usersStore.list);
  emit("onEdit", {
    name: "UsersTable.goToEdit",
    data: { users },
  });
};
const unableItem = async (item: UsersInterface) => {
  emit("onDeactivate", {
    name: "UsersTable.deactivate",
    data: { item },
  });
};
const managePermissions = async (item: UsersInterface) => {
  emit("onManagePermissions", {
    name: "UsersTable.onManagePermissions",
    data: { item },
  });
};
</script>
<!-- ******************** CSS ******************** -->
<style scoped></style>
