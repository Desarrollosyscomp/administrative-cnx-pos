<!-- ******************** HTML ******************** -->
<template>
  <LayoutOne>
    <v-breadcrumbs :items="['Permisos', 'Listar']"></v-breadcrumbs>
    <v-container>
      <div class="d-flex flex-column flex-sm-row">
        <v-row>
          <v-col cols="12" md="9">
            <v-text-field class="w-50 " color="#841811ff" density="compact" variant="outlined" label="Buscar"
              append-inner-icon="mdi-magnify">
            </v-text-field>
          </v-col>
          <v-col cols="12" md="3">
            <div align="end">

              <v-btn class="mt-2 ml-2" variant="outlined" color="success" @click="openAddForm">
                <span> AÑADIR</span>
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </div>
      <PermissionsList />

    </v-container>
  </LayoutOne>
</template>

<!-- ******************** JavaScript ******************** -->
<script setup lang="ts">
// import { ref, } from "vue-demi";
// Components

import LayoutOne from "../../../Layouts/LayoutOne.vue";
import PermissionsList from "../components/PermissionsList.vue";



// const swal: any = inject("$swal");


// let menu = ref(false);
const openAddForm = () => {
  return
}
// const simpleSearch = () => {
//   appStore.afterLoading(async () => {
//     permissionsStore.page = 1;
//     permissionsStore.is_active = switchValue.value;
//     permissionsStore.advancedSearchActive = false;
//     permissionsStore.search = permissionsStore.search.trim();
//     await permissionsStore.loadPaginatedList();
//   });
//   //console.log(search.value.trim());
// };




</script>

<!-- ******************** CSS ******************** -->
<style scoped>
h4 {
  color: #841811ff;
}
</style>
