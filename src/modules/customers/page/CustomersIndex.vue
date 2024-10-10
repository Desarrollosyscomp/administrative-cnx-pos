<!-- ******************** HTML ******************** -->
<template>
  <Layout>
    <!-- <h2 class="ma-2">Almacenes/Listar</h2>  -->
    <v-breadcrumbs
      :items="['Customers', 'Listar']"
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
            v-model="customersStore.search"
            @keyup.enter="simpleSearch"
          >
          </v-text-field>

          <div class="d-flex">
            <!-- <div class="text-center">
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

            <v-spacer></v-spacer> -->

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
          <!--<v-switch
            @click="switchActiveList"
            v-model="customersStore.is_active"
            :indeterminate="customersStore.is_active == null"
            color="#841811ff"
            :label="
              customersStore.is_active == null
                ? 'Todos'
                : customersStore.is_active
                ? 'Activos'
                : 'Inactivos'
            "
          ></v-switch>

           pop-over 
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
                  <div v-if="customersStore.advancedSearchActive">
                    <v-divider></v-divider>

                    <v-list>
                      <v-list-item
                        v-if="customersStore.search !== ''"
                        title="Busqueda"
                        :subtitle="customersStore.search"
                      />
                      <v-list-item
                        title="Estado"
                        :subtitle="
                          customersStore.is_active !== null
                            ? customersStore.is_active
                              ? 'Activo'
                              : 'Inactivo'
                            : 'Todos'
                        "
                      />
                      <v-list-item
                        v-if="customersStore.initDate !== ''"
                        title="Fecha inicial"
                        :subtitle="customersStore.initDate"
                      />
                      <v-list-item
                        v-if="customersStore.endDate !== ''"
                        title="Fecha final"
                        :subtitle="customersStore.endDate"
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
          pop-over -->
        </div>

        <CustomersList @onEdit="onEdit" @onDeactivate="unableItem" />
        <!--
          @onShowRecord="onShowRecord" 
        -->
      </v-card-text>
      <v-dialog v-model="dialog" @update:modelValue="changeValue" width="768">
        <v-sheet>
          <CustomersForm @onClose="onClose"
          @onAddSuccess="onAddSuccess" v-if="
          customersStore.moduleMode === 'add' ||
          customersStore.moduleMode === 'edit' " />
          <!-- <CustomersDetails v-if="customersStore.moduleMode === 'details'" /> -->
          <CustomersSearcher
          v-if="customersStore.moduleMode === 'advancedSearch'"
          @onSearch="performSearch" @onClose="onClose" />
        </v-sheet>
      </v-dialog>
    </v-card>
  </Layout>
</template>

<!-- ******************** JavaScript ******************** -->
<script setup lang="ts">
import { inject, ref, onMounted, onUnmounted, computed, watch } from "vue-demi";
// Components
// import CustomersDetails from "../components/";
import CustomersForm from "../components/CustomersForm.vue";
import CustomersList from "../components/CustomersList.vue";
import CustomersSearcher from "../components/CustomersSearcher.vue";

import EmptyLottie from "../../../assets/lottie-files/search.json";

import { EmitInterface } from "../../../interfaces/Emit.interface";

import { useCustomersStore } from "../stores/customers.store";
import { useAppStore } from "../../../stores/app-store";

const customersStore = useCustomersStore();
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
    await customersStore.loadPaginatedList();
  } catch (error) {
    console.error(error);
  }
};
const simpleSearch = () => {
  appStore.afterLoading(async () => {
    customersStore.page = 1;
    customersStore.is_active = switchValue.value;
    customersStore.advancedSearchActive = false;
    customersStore.search = customersStore.search.trim();
    await customersStore.loadPaginatedList();
  });
  //console.log(search.value.trim());
};
const cleanerSearch = () => {
  appStore.afterLoading(async () => {
    customersStore.page = 1;
    customersStore.advancedSearchActive = false;
    customersStore.search = "";
    await customersStore.loadPaginatedList();
    menu.value = false;
  });
};
// const onShowRecord = (emitted: EmitInterface) => {
//   customersStore.selectedItem = emitted.data.customers;
//   dialog.value = true;
// };
const addModal = () => {
  customersStore.moduleMode = "add";
  dialog.value = true;
};
const onAddSuccess = () => {
  customersStore.moduleMode = "";
  dialog.value = false;
};
const onEdit = (emitted: EmitInterface) => {
  customersStore.moduleMode = "edit";
  customersStore.selectedItem = emitted.data.customers;
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
      text: `¿Está seguro que desea ${action.toLowerCase()} este [[CUSTOMERS]]?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#4CAF50",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si",
      cancelButtonText: "Cancelar",
    })
    .then(async (result: any) => {
      if (result.isConfirmed) {
        customersStore.selectedItem = emitted.data.item;
        const response = await customersStore.delete();
        customersStore.selectedItem = {};
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
  customersStore.search = "";
  customersStore.moduleMode = "advancedSearch";
  dialog.value = true;
};
const performSearch = async (searchValue: object) => {
  console.log(searchValue);
  await customersStore.loadPaginatedList();
  dialog.value = false;
};
const onClose = () => {
  customersStore.moduleMode = "";
  dialog.value = false;
};
const changeValue = (value: boolean) => {
  if (value) return;
  customersStore.moduleMode = "";
  customersStore.selectedItem = {};
};

//////CRUD SECTIONS////
// const showRecord = ( customers: CustomersInterface) => {
//   customersStore.moduleMode = 'details';
//   emit('onShowRecord', {
//     name: 'CustomersTable.showRecord',
//     data: { customers }
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
  customersStore.advancedSearchActive = false;
  customersStore.is_active = !customersStore.is_active;

  pagination();
};
// watch (switchValue, () => {
//   customersStore.advancedSearchActive = false
//   pagination()
//   // if (switchValue.value) {
//   //   customersStore.is_active = true;
//   //   pagination();
//   // } else {
//   //   customersStore.is_active = false;
//   //   pagination();
//   // }
// });

watch(
  () => customersStore.advancedSearchActive,
  () => {
    if (customersStore.advancedSearchActive) {
      if (customersStore.is_active !== null) {
        switchValue.value = customersStore.is_active;

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
