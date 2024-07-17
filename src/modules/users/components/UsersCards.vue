<!-- ******************** HTML ******************** -->
<template>
  <div
    class="mobile-cards d-block d-sm-none mt-3"
    v-for="(item, index) in usersStore.list"
    :key="index"
  >
    <v-card class="mb-6" variant="outlined" color="#c9c9c9">
      <v-card-title>
        <v-row class="row">
          <v-col class="mt-3">
            <span class="text-black">
              <strong>
                {{ item.name }}
              </strong>
            </span>
          </v-col>
          <v-spacer></v-spacer>
          <v-col class="d-flex flex-row-reverse">
            <v-sheet class="mt-1 mr-1">
              <v-badge :color="item.is_active ? 'success' : '#841811ff'">
                <template v-slot:badge>
                  <!-- <span class="pa-2">Activo</span> -->
                  <v-icon>{{
                    item.is_active ? "mdi-check" : "mdi-delete"
                  }}</v-icon>
                </template>
              </v-badge>
            </v-sheet>
          </v-col>
        </v-row>
      </v-card-title>
      <v-card-text class="mb-1 text-black">{{ item.description }}</v-card-text>
      <v-divider color="#000"></v-divider>
      <v-card-actions class="pa-0">
        <div align="right" style="width: 100%">
          <v-btn
            v-if="item.is_active"
            class="ma-0"
            variant="text"
            icon="mdi-pencil"
            color="blue-lighten-2"
            @click="goToEdit(item)"
          >
          </v-btn>
          <v-btn
            class="ma-0"
            variant="text"
            :icon="item.is_active ? 'mdi-delete' : 'mdi-restore'"
            :color="item.is_active ? 'red-lighten-2' : 'blue-lighten-2'"
            @click="unableItem(item)"
          >
          </v-btn>
        </div>
      </v-card-actions>
    </v-card>
  </div>
</template>
<!-- ******************** JavaScript ******************** -->
<script setup lang="ts">
import { useUsersStore } from "../stores/users.store";
import { UsersInterface } from "../interfaces/users.interface";

const usersStore = useUsersStore();
const emit = defineEmits(["onEdit", "onDeactivate"]);

const goToEdit = (users: UsersInterface) => {
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
</script>
<!-- ******************** CSS ******************** -->
<style scoped></style>
