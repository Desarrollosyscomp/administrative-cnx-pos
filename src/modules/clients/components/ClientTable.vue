<template>
  <div >
    <v-table>
      <thead>
        <tr>
          <th class="text-left font-weight-black">NOMBRE</th>
          <th class="text-center font-weight-black">DESCRIPCIÓN</th>
          <th class="text-center font-weight-black">NÚMERO DE DOCUMENTO</th>
          <th class="text-right font-weight-black">ESTADO</th>
          <th class="text-right font-weight-black">ACCIONES</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in clientsStore.list" :key="index">
          <td class="text-left text-truncate" style="max-width: 20px">
            {{  item.name  }}
          </td>
          <td class="text-center" style="max-width: 20px">
            <v-badge :color="item.clientable_type == 'company' ? '#841811ff' : 'success'" class="mr-14 mb-1">
              <template v-slot:badge>
                <span class="pa-2">{{
                  item.clientable_type == 'company' ? "Empresa" : "Persona"
                }}</span>
              </template>
            </v-badge>
          </td>
          <td class="text-center text-truncate" style="max-width: 20px">
            {{  setIdetification(item)  }}
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
            <v-menu location="start">
              <template v-slot:activator="{ props }">
                <v-btn size="small" color="#841811ff" variant="outlined" v-bind="props" @click="openClientDetails(item)">
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
import { onMounted } from 'vue';
import router from '../../../router';
import { useClientsStore } from '../store/useClientsStore';
import { TThirdParty } from '../interfaces/third-party.interface';
import { useAppStore } from '../../../stores/app-store';
const clientsStore = useClientsStore()
const appStore = useAppStore()

const emit = defineEmits(['onEdit', 'onDesactivate', "on-set-database", "on-set-eip"])

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

const setIdetification = (client: TThirdParty) =>{
  if (client.clientable_type == 'person'){
    return client.person?.identification?.document_number ?? 'N/A'
  } else if (client.clientable_type == 'company'){
    return client.company?.identification?.document_number ?? 'N/A'
  }
}

const openClientDetails = (item: TThirdParty) => {
  router.push("/client/" + item.id + "/details");
};


onMounted(async() => {
  clientsStore.selectedItem = {}
  clientsStore.selectedItemTaxxaInfo = {}
  appStore.afterLoading(clientsStore.loadPaginatedList);
  // clientsStore.loadPaginatedList()
})

</script>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
