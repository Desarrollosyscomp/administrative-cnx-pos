<!-- ******************** HTML ******************** -->
<template>
  <Layout>
    <!-- <h2 class="ma-2">Almacenes/Listar</h2>  -->
    <v-breadcrumbs
      :items="['Usuarios', 'Listar']"
    ></v-breadcrumbs>
    <v-card class="ma-2 px-4" elevation="5">
      <v-card-title class="mr-5 mt-4">
        <div class="d-flex flex-column flex-sm-row">
          <v-text-field
            class="ma-2 w-100"
            color="#841811ff"
            density="compact"
            variant="outlined"
            label="Buscar"
            append-inner-icon="mdi-magnify"
            v-model="usersStore.search"
            @keyup.enter="simpleSearch"
          >
          </v-text-field>

          <div class="d-flex">
            <div class="text-center">
              <v-menu>
                <template v-slot:activator="{ props }">
                  <v-btn
                    v-bind="props"
                    class="mt-2 ml-4"
                    color="#841811ff"
                    variant="outlined"
                    :size="buttonSize"
                  >
                    <span v-if="isMobile">
                      <v-icon> mdi-format-list-bulleted </v-icon>
                    </span>
                    <span v-else> OPCIONES </span>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item v-for="(item, index) in items" :key="index">
                    <v-list-item-title v-if="item.title !== 'Exportar'">
                      <a type="button" @click="openAdvancedSearcher">
                        {{ item.title }}
                      </a>
                    </v-list-item-title>
                    <v-list-item-title v-else>
                      <a type="button">
                        {{ item.title }}
                      </a>
                    </v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </div>

            <v-spacer></v-spacer>

            <v-btn
              class="mt-2 ml-2"
              variant="outlined"
              color="success"
              @click="addModal"
              :size="buttonSize"
            >
              <span v-if="isMobile">
                <v-icon>mdi-plus</v-icon>
              </span>
              <span v-else> AÑADIR </span>
            </v-btn>
          </div>
        </div>
      </v-card-title>
      <v-card-text class="mb-2">
        <div class="d-flex ma-4">
          <v-switch
            @click="switchActiveList"
            v-model="usersStore.is_active"
            :indeterminate="usersStore.is_active == null"
            color="#841811ff"
            :label="
              usersStore.is_active == null
                ? 'Todos'
                : usersStore.is_active
                ? 'Activos'
                : 'Inactivos'
            "
          ></v-switch>

          <!-- pop-over -->
          <div class="text-center">
            <v-menu
              v-model="menu"
              :close-on-content-click="false"
              location="end"
            >
              <template v-slot:activator="{ props }">
                <v-btn
                  class="mt-3"
                  color="grey-darken-3"
                  variant="outlined"
                  v-bind="props"
                  size="small"
                >
                  <span v-if="isMobile">
                    <v-icon>mdi-tune</v-icon>
                  </span>
                  <span v-else>Ver filtros</span>
                </v-btn>
              </template>

              <v-card min-width="230" title="Filtros">
                <div v-if="usersStore.advancedSearchActive">
                  <v-divider></v-divider>

                  <v-list>
                    <v-list-item
                      v-if="usersStore.search !== ''"
                      title="Busqueda"
                      :subtitle="usersStore.search"
                    />
                    <v-list-item
                      title="Estado"
                      :subtitle="
                        usersStore.is_active !== null
                          ? usersStore.is_active
                            ? 'Activo'
                            : 'Inactivo'
                          : 'Todos'
                      "
                    />
                    <v-list-item
                      v-if="usersStore.initDate !== ''"
                      title="Fecha inicial"
                      :subtitle="usersStore.initDate"
                    />
                    <v-list-item
                      v-if="usersStore.endDate !== ''"
                      title="Fecha final"
                      :subtitle="usersStore.endDate"
                    />
                  </v-list>
                  <v-divider></v-divider>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="#841811ff"
                      variant="outlined"
                      size="small"
                      @click="cleanerSearch"
                    >
                      Resetear
                    </v-btn>
                  </v-card-actions>
                </div>
                <div v-else>
                  <Vue3Lottie
                    :animationData="EmptyLottie"
                    :height="180"
                    :width="180"
                  />
                  <h4 class="text-center mb-4">No hay filtros</h4>
                </div>
              </v-card>
            </v-menu>
          </div>
          <!-- pop-over -->
        </div>

        <UsersList @onEdit="onEdit" @onDeactivate="unableItem" @onAddEnterprise="onAddEnterprise" />
        <!--
          @onShowRecord="onShowRecord" 
        -->
      </v-card-text>
      <v-dialog v-model="dialog" @update:modelValue="changeValue" width="568">
        <v-sheet>
          <UsersForm 
            @onClose="onClose"
            @onAddSuccess="onAddSuccess" v-if="
            usersStore.moduleMode === 'add' ||
            usersStore.moduleMode === 'edit' "
            
          />
          <!-- <UsersDetails v-if="usersStore.moduleMode === 'details'" /> -->
          <UsersSearcher
            v-if="usersStore.moduleMode === 'advancedSearch'"
            @onSearch="performSearch" 
            @onClose="onClose" 
          />
          <UserEnterpriseForm 
            v-if="usersStore.moduleMode === 'enterprise'"
          />
        </v-sheet>
      </v-dialog>
    </v-card>
  </Layout>
</template>

<!-- ******************** JavaScript ******************** -->
<script setup lang="ts">
import { inject, ref, onMounted, onUnmounted, computed, watch } from "vue-demi";
// Components
// import UsersDetails from "../components/";
import UserEnterpriseForm from "../../customers/components/CustomersEnterpriseForm.vue";
import UsersForm from "../components/UsersForm.vue";
import UsersList from "../components/UsersList.vue";
import UsersSearcher from "../components/UsersSearcher.vue";

// import EmptyLottie from "@/assets/lottie-files/search.json";
import EmptyLottie from "../../../assets/lottie-files/search.json";

import { EmitInterface } from "../../../interfaces/Emit.interface";

import { useUsersStore } from "../stores/users.store";
// import { useAppStore } from "@/stores/app-store";
import { useAppStore } from "../../../stores/app-store";

const usersStore = useUsersStore();
const appStore = useAppStore();

const swal: any = inject("$swal");

const isMobile = ref(window.innerWidth <= 574);

let dialog = ref(false);
let switchValue = ref(true);
let items = ref([{ title: "Exportar" }, { title: "Busqueda avanzada" }]);
// pop-over
let menu = ref(false);
// pop-over
let elementsForPage = ref(10);
// let amountUsers = ref([10, 25, 50]);
let elementRows = ref(0);
// Methods
const buttonSize = computed(() => (isMobile.value ? "small" : "default"));

const updateIsMobile = () => {
  isMobile.value = window.innerWidth <= 574;
};
const pagination = async () => {
  try {
    await usersStore.loadPaginatedList();
  } catch (error) {
    console.error(error);
  }
};
const simpleSearch = () => {
  appStore.afterLoading(async () => {
    usersStore.page = 1;
    usersStore.is_active = switchValue.value;
    usersStore.advancedSearchActive = false;
    usersStore.search = usersStore.search.trim();
    await usersStore.loadPaginatedList();
  });
  //console.log(search.value.trim());
};
const cleanerSearch = () => {
  appStore.afterLoading(async () => {
    usersStore.page = 1;
    usersStore.advancedSearchActive = false;
    usersStore.search = "";
    await usersStore.loadPaginatedList();
    menu.value = false;
  });
};
// const onShowRecord = (emitted: EmitInterface) => {
//   usersStore.selectedItem = emitted.data.users;
//   dialog.value = true;
// };
const addModal = () => {
  usersStore.moduleMode = "add";
  dialog.value = true;
};
const onAddSuccess = () => {
  usersStore.moduleMode = "";
  dialog.value = false;
};

const onAddEnterprise = (emmited: EmitInterface) => {
  usersStore.moduleMode = "enterprise";
  dialog.value = true;
  console.log(emmited);
};

const onEdit = (emitted: EmitInterface) => {
  usersStore.moduleMode = "edit";
  usersStore.selectedItem = emitted.data.users;
  dialog.value = true;
};
const unableItem = (emitted: EmitInterface) => {
  const action = !emitted.data.item.is_active ? "Restaurar" : "Desactivar";
  const successMessage = !emitted.data.item.is_active
    ? "Restaurado con éxito"
    : "Desactivado con éxito";
  swal
    .fire({
      title: `${action}`,
      text: `¿Está seguro que desea ${action.toLowerCase()} este [[USERS]]?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#4CAF50",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si",
      cancelButtonText: "Cancelar",
    })
    .then(async (result: any) => {
      if (result.isConfirmed) {
        usersStore.selectedItem = emitted.data.item;
        const response = await usersStore.delete();
        usersStore.selectedItem = {};
        pagination();
        //@ts-ignore
        if (response.status == 200) {
          swal.fire("", successMessage, "success");
        } else {
          swal.fire("", "Ocurrió un error", "danger");
        }
      }
    });
};
const openAdvancedSearcher = () => {
  usersStore.search = "";
  usersStore.moduleMode = "advancedSearch";
  dialog.value = true;
};
const performSearch = async (searchValue: object) => {
  console.log(searchValue);
  await usersStore.loadPaginatedList();
  dialog.value = false;
};
const onClose = () => {
  usersStore.moduleMode = "";
  dialog.value = false;
};
const changeValue = (value: boolean) => {
  if (value) return;
  usersStore.moduleMode = "";
  usersStore.selectedItem = {};
};

//////CRUD SECTIONS////
// const showRecord = ( users: UsersInterface) => {
//   usersStore.moduleMode = 'details';
//   emit('onShowRecord', {
//     name: 'UsersTable.showRecord',
//     data: { users }
//   });
// };
watch(
  () => elementRows,
  () => {
    if (elementRows.value === 10) {
      elementsForPage.value = 10;
      pagination();
    } else if (elementRows.value === 25) {
      elementsForPage.value = 25;
      pagination();
    } else if (elementRows.value === 50) {
      elementsForPage.value = 50;
      pagination();
    }
  }
);

const switchActiveList = () => {
  usersStore.advancedSearchActive = false;
  usersStore.is_active = !usersStore.is_active;

  pagination();
};
// watch (switchValue, () => {
//   usersStore.advancedSearchActive = false
//   pagination()
//   // if (switchValue.value) {
//   //   usersStore.is_active = true;
//   //   pagination();
//   // } else {
//   //   usersStore.is_active = false;
//   //   pagination();
//   // }
// });

watch(
  () => usersStore.advancedSearchActive,
  () => {
    if (usersStore.advancedSearchActive) {
      if (usersStore.is_active !== null) {
        switchValue.value = usersStore.is_active;

        pagination();
      }
    }
  }
);

onMounted(() => {
  window.addEventListener("resize", updateIsMobile);
  pagination();
});

onUnmounted(() => {
  window.removeEventListener("resize", updateIsMobile);
});
</script>

<!-- ******************** CSS ******************** -->
<style scoped>
h4 {
  color: #841811ff;
}
</style>
