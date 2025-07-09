<!-- ******************** HTML ******************** -->
<template>
  <Layout>
    <!-- <h2 class="ma-2">Almacenes/Listar</h2>  -->
    <v-breadcrumbs :items="['Usuarios', 'Listar']"></v-breadcrumbs>
    <v-card class="ma-2 px-4" elevation="5">
      <v-card-title class="mr-1 mt-4 mb-n7">
        <div class="d-flex flex-column flex-sm-row">
          <v-text-field class="ma-2 w-100 " color="#841811ff" density="compact" variant="outlined" label="Buscar"
            append-inner-icon="mdi-magnify" v-model="usersStore.search" @keyup.enter="simpleSearch">
          </v-text-field>
          <v-btn class="mt-2 ml-2" variant="outlined" color="success" @click="openModalCreateUser">
            <span> AÑADIR</span>
          </v-btn>
        </div>
      </v-card-title>
      <v-card-text>
        <div class="ml-2 mb-n9 mt-3">
          <v-switch 
          v-model="usersStore.is_active" 
          color="#841811ff" 
          :label="usersStore.is_active ?
            'Activos' : 'Inactivos'
            "></v-switch>
        </div>
        <UsersList @onEdit="onEdit" @onDeactivate="unableItem" @onManagePermissions="onPermissions" />
      </v-card-text>
    </v-card>
    <!-- <v-dialog v-model="dialog" @update:modelValue="changeValue" width="500">
      <v-card>
        <v-card-text>
          <UsersForm 
          @onClose="onClose"
          @onAddSuccess="onAddSuccess" v-if="
          usersStore.moduleMode === 'add' ||
          usersStore.moduleMode === 'edit' "
          />

        </v-card-text>
      </v-card>
    </v-dialog> -->
    <v-dialog width="540" v-model="usersStore.openDialog" @update:modelValue="changeValue">
      <div>
        <v-card>
          <v-card-text>
            <UsersForm v-if="usersStore.moduleMode === 'add'" />
            <UsersEdit v-if="usersStore.moduleMode === 'edit'" />
            <UsersPermissions v-if="usersStore.moduleMode === 'permissions'" />
          </v-card-text>
        </v-card>
      </div>
    </v-dialog>
  </Layout>
</template>

<!-- ******************** JavaScript ******************** -->
<script setup lang="ts">
import { ref, onMounted, inject, watch } from "vue-demi";
// Components
// import UsersDetails from "../components/";
import UsersForm from "../components/UsersForm.vue";
import UsersList from "../components/UsersList.vue";

// import EmptyLottie from "@/assets/lottie-files/search.json";

// import { EmitInterface } from "../../../interfaces/Emit.interface";

import { useUsersStore } from "../stores/users.store";
import { EmitInterface } from "../../../interfaces/Emit.interface";
import UsersEdit from "../components/UsersEdit.vue";
// import { useAppStore } from "../../../stores/app-store";
import UsersPermissions from "../components/UsersPermissions.vue";
// import { useAppStore } from "@/stores/app-store";
// import { useAppStore } from "../../../stores/app-store";

const usersStore = useUsersStore();
// const appStore = useAppStore();

const swal: any = inject("swal");

let switchValue = ref(true);

const openModalCreateUser = () => {
  usersStore.toogleDialog()
  usersStore.moduleMode = "add"
}

const onEdit = (emitted: EmitInterface) => {
  usersStore.moduleMode = "edit";
  console.log("onEdit", emitted);
  usersStore.selectedItem = emitted.data.users;
  usersStore.toogleDialog();
};

const onPermissions = (emitted: EmitInterface) => {
  usersStore.moduleMode = "permissions";
  console.log("onEdit", emitted);
  usersStore.selectedItem = emitted.data.users;
  usersStore.toogleDialog();
};

const changeValue = (value: boolean) => {
  if (value) return;
  usersStore.moduleMode = "";
  usersStore.selectedItem = {};
};


const unableItem = (emitted: EmitInterface) => {
  const action = !emitted.data.item.is_active ? "Restaurar" : "Desactivar";
  const successMessage = !emitted.data.item.is_active
    ? "Restaurado con éxito"
    : "Desactivado con éxito";
  swal.fire({
    title: `${action}`,
    text: `¿Está seguro que desea ${action.toLowerCase()} este usuario?`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#4CAF50",
    cancelButtonColor: "#d33",
    confirmButtonText: '<span style="color: white;">Sí</span>',
    cancelButtonText: '<span style="color: white;">Cancelar</span>',
  })
    .then(async (result: any) => {
      if (result.isConfirmed) {
        usersStore.selectedItem = emitted.data.item;
        const response = await usersStore.delete();
        usersStore.selectedItem = {};
        if (response.status == 200) {
          await swal.fire({
            icon: "success",
            text: successMessage,
            showConfirmButton: false,
            timer: 1000,
          });
        } else {
          await swal.fire({
            icon: "warning",
            text: "Ocurrio un error ",
            showConfirmButton: false,
            timer: 1000,
          });
        }
      }
    });
};

const simpleSearch = async() => {
    usersStore.page = 1;
    usersStore.is_active = switchValue.value;
    usersStore.advancedSearchActive = false;
    usersStore.search = usersStore.search.trim();
    await usersStore.loadPaginatedList();

};

watch(
  () => usersStore.is_active,
  () => {
    console.log(usersStore.is_Active);
    usersStore.loadPaginatedList();
  }
);

onMounted(() => {

});

</script>

<!-- ******************** CSS ******************** -->
<style scoped>
h4 {
  color: #841811ff;
}
</style>
