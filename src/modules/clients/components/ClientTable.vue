<template>
  <div>
    <v-table>
      <thead>
        <tr>
          <th class="text-left font-weight-black">NOMBRE</th>
          <th class="text-center font-weight-black">TIPO CLIENTE</th>
          <th class="text-center font-weight-black">NÚMERO DE DOCUMENTO</th>
          <th class="text-center font-weight-black">FECHA DE CREACIÓN</th>
          <th class="text-right font-weight-black">ESTADO</th>
          <th class="text-right font-weight-black">ACCIONES</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in clientsStore.list" :key="index">
          <td class="text-left text-truncate" style="max-width: 20px">
            {{ item.name }}
          </td>
          <td class="text-center" style="max-width: 20px">
            <v-badge
              :color="
                item.clientable_type == 'company' ? '#841811ff' : 'success'
              "
              class="mr-14 mb-1"
            >
              <template v-slot:badge>
                <span class="pa-2">{{
                  item.clientable_type == "company" ? "Empresa" : "Persona"
                }}</span>
              </template>
            </v-badge>
          </td>
          <td class="text-center text-truncate" style="max-width: 20px">
            {{ setIdetification(item) }}
          </td>
          <td class="text-center" style="position: relative">
            {{ DateHelpers.timestamptzToNatural(item.created_at) }}
            <!-- <v-tooltip
              :text="`Licencia expirada`"
              location="top"
              v-if="item.licenses.length > 0 && item.pendingDays < 0"
            >
              <template v-slot:activator="{ props }">
                <v-icon
                  v-bind="props"
                  v-if="licenseExpiredSoon(item.pendingDays)"
                  color="#841811ff"
                  size="small"
                >
                  mdi-cancel
                </v-icon>
              </template>
            </v-tooltip>
            <v-tooltip
              :text="`Licencia próxima a expirar en ${item.pendingDays} días`"
              location="top"
              v-if="item.pendingDays >= 0 && item.licenses.length > 0"
            >
              <template v-slot:activator="{ props }">
                <v-icon
                  class="d-none d-md-block"
                  v-bind="props"
                  v-if="licenseExpiredSoon(item.pendingDays)"
                  color="#841811ff"
                  size="small"
                  style="
                    position: absolute;
                    right: 25px;
                    top: 50%;
                    transform: translateY(-50%);
                  "
                >
                  mdi-alert
                </v-icon>
              </template>
            </v-tooltip> -->
          </td>
          <!-- <td class="text-left" style="max-width: 2px; width: 2px">
            <v-tooltip
                :text="`Licencia próxima a expirar en ${item.pendingDays} días`"
                location="top"
                v-if="item.pendingDays"
              >
                <template v-slot:activator="{ props }">
                  <v-icon
                    v-bind="props"
                    v-if="licenseExpiredSoon(item.pendingDays)"
                    color="#841811ff"
                    size="small"
                    class="ml-n15"
                  >
                    mdi-alert
                  </v-icon>
                </template>
              </v-tooltip>
          </td> -->
          <td class="text-right d-flex align-center">
            <v-tooltip :text="item.licenses.length > 0 ? `Días restantes: ${item.pendingDays +1}` : 'Sin licencia'" location="left">
              <template v-slot:activator="{ props }">
              <v-badge
              :color="getColor(item.pendingDays, item.is_active, item.licenses)"
              class="mb-1 ml-7"
              v-bind="props"
              >
              <template v-slot:badge>
                <span class="text-center" style="min-width: 90px">{{
                  changeState(item.pendingDays, item.is_active, item.licenses)
                }}</span>
              </template>
            </v-badge>
          </template>
          </v-tooltip>
          </td>
          <td class="text-right">
            <v-menu location="start">
              <template v-slot:activator="{ props }">
                <v-btn
                  size="small"
                  color="#841811ff"
                  variant="outlined"
                  v-bind="props"
                  @click="openClientDetails(item)"
                >
                  Detalles
                </v-btn>
              </template>
              <!-- <v-list>
                <v-list-item value="1" v-if="item.is_active == true" @click="goToEdit(item)">
                  <v-list-item-title >
                    <v-icon color="blue-lighten-2" size="small">mdi-pencil</v-icon> Editar cliente
                  </v-list-item-title>
                </v-list-item>
                <v-list-item value="2" @click="unableItem(item)">
                  <v-list-item-title >
                    <v-icon size="small" :color="item.is_active ? 'red-lighten-2' : 'blue-lighten-2'">
                      {{ item.is_active ? 'mdi-delete' : 'mdi-restore' }}
                    </v-icon>
                    {{
                      item.is_active ? "Inactivar" : "Restaurar"
                    }}
                    cliente
                  </v-list-item-title>
                </v-list-item>
                <v-list-item value="3" v-if="item.is_active == true" @click="onPermissions(item)">
                  <v-list-item-title >
                    <v-icon size="small">mdi-fingerprint</v-icon> Permisos
                  </v-list-item-title>
                </v-list-item>
                <v-list-item @click="onSetDatabase(item)" value="4" v-if="item.is_active == true">
                  <v-list-item-title>
                    <v-icon size="small">mdi-database</v-icon> Base de datos
                  </v-list-item-title>
                </v-list-item>
                <v-list-item @click="onSetEIP(item)" value="5" v-if="item.is_active == true">
                  <v-list-item-title>
                    <v-icon size="small">mdi-invoice-text-fast-outline</v-icon> Proveedor de facturacion electrónica
                  </v-list-item-title>
                </v-list-item>
              </v-list> -->
            </v-menu>
          </td>
        </tr>
      </tbody>
    </v-table>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import router from "../../../router";
import { useClientsStore } from "../store/useClientsStore";
import { TThirdParty } from "../interfaces/third-party.interface";
import DateHelpers from "../../../utils/date/date-helpers";
const clientsStore = useClientsStore();

const emit = defineEmits([
  "onEdit",
  "onDesactivate",
  "on-set-database",
  "on-set-eip",
]);

// const onPermissions = (item: TThirdParty) => {
//   router.push("/client/" + item.id + "/permissions");
// };

// const goToEdit = (item: TThirdParty) => {
//   clientsStore.moduleMode = "edit"
//   router.push("/client/form/" + item.id);
// };

// const unableItem = async (item: TThirdParty) => {
//   emit("onDesactivate", {
//     name: "ThirdPartiesTable.deactivate",
//     data: { item },
//   });
// };

// const onSetDatabase = async (item: TThirdParty) => {
//   emit("on-set-database", {
//     name: "ThirdPartiesTable.setDatabase",
//     data: { item },
//   });
// };

// const onSetEIP = async (item: TThirdParty) => {
//   emit("on-set-eip", {
//     name: "ThirdPartiesTable.setEIP",
//     data: { item },
//   });
// };

const setIdetification = (client: TThirdParty) => {
  if (client.clientable_type == "person") {
    return client.person?.identification?.document_number ?? "N/A";
  } else if (client.clientable_type == "company") {
    return client.company?.identification?.document_number ?? "N/A";
  }
};

const openClientDetails = (item: TThirdParty) => {
  router.push("/client/" + item.id + "/details");
};

const resetForm = () => {
  clientsStore.initialiceForm();
  clientsStore.selectedFinancialActivities = [];
  clientsStore.selectedCountry = {};
  clientsStore.selectedDepartment = {};
  clientsStore.selectedMunicipality = {};
  clientsStore.selectedNeighborhood = {};
};

const changeState = (pendingDays: number, is_active: boolean, license: any) => {
  if (is_active == false) {
    return "Inactivo"
  }
  if (license.length > 0 && pendingDays < 0){
    return "Vencido"
  }
  if (is_active == true && license.length > 0 && pendingDays < 10) {
    return "Por vencer"
  } else {
    return "Activo"
  }
}

const getColor = (pendingDays: number, is_active: boolean, license: any) => {
  const state = changeState(pendingDays, is_active, license);
  if (state === "Inactivo") return "#841811ff";
  if (state === "Por vencer") return "warning";
  if (state === "Vencido") return "error";
  if (state === "Activo") return "success";
};

onMounted(async () => {
  clientsStore.selectedItem = {};
  clientsStore.selectedItemTaxxaInfo = {};
  resetForm();
});
</script>

<style scoped>
.read-the-docs {
  color: #888;
}

.align-items {
  display: inline-flex;
  align-items: center;
  padding: 5px;
}
</style>
