<template>
  <div class="show d-none d-sm-block">
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
        <tr v-for="(item, index) in [{ name: 'yulieth', description: 'ABC', is_active: true }]" :key="index">
          <td class="text-left text-truncate" style="max-width: 20px">
            {{ item.name }}
          </td>
          <td class="text-center text-truncate" style="max-width: 20px">
            {{ item.description }}
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
            hola
          </td>
        </tr>
      </tbody>
    </v-table>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
