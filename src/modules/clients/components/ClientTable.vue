<template>
  <div >
    <v-table>
      <thead>
        <tr>
          <th class="text-left font-weight-black">NOMBRE</th>
          <th class="text-center font-weight-black">DESCRIPCION</th>
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
                <v-btn size="small" color="#841811ff" variant="outlined" v-bind="props">
                  Opciones
                </v-btn>
              </template>
              <v-list>
                <v-list-item value="1">
                  <v-list-item-title @click="goToEdit(item)">
                    <v-icon color="blue-lighten-2" size="small">mdi-pencil</v-icon> Editar cliente
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
                    cliente
                  </v-list-item-title>
                </v-list-item>
                <v-list-item value="3">
                  <v-list-item-title @click="onPermissions">
                    <v-icon size="small">mdi-fingerprint</v-icon> Permisos
                  </v-list-item-title>
                </v-list-item>
              </v-list>
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
const clientsStore = useClientsStore()

const emit = defineEmits(['onEdit', 'onDesactivate'])
// const openEditForm = () => {
//   clientsStore.moduleMode = "edit";
//   router.push("/client/form");
// };
const onPermissions = () => {
  router.push("/client/permissions");
};

const goToEdit = (item: TThirdParty) => {
  clientsStore.moduleMode = "edit"
  router.push("/client/form/" + item.id);
};

const unableItem = async (item: TThirdParty) => {
  emit("onDesactivate", {
    name: "ThirdPartiesTable.deactivate",
    data: { item },
  });
};

onMounted(() => {
  clientsStore.loadPaginatedList()
})

</script>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
