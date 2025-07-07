<!-- ******************** HTML ******************** -->
<template>
  <v-container>
    <v-row>
      <v-col>
        <h3>Proveedores de facturación electrónica</h3>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-table>
      <thead>
        <tr>
          <th class="text-left font-weight-black">Proveedor</th>
          <th class="text-right font-weight-black">Seleccionar</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(provider, index) in clientsStore.electronic_invoice_providers" :key="index">
          <td class="text-left text-truncate" style="max-width: 20px">
            {{ provider.name }}
          </td>
          <td class="text-right">
            <v-btn
              color="#841811ff"
              size="small"
              variant="outlined"
              @click="selectElectronicInvoiceProvider"
            >
              <span> Seleccionar</span>
            </v-btn>
          </td>
        </tr>
      </tbody>
    </v-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<!-- ******************** JavaScript ******************** -->
<script setup lang="ts">
// import { computed, inject, onMounted, reactive, ref } from "vue-demi";
import { useClientsStore } from "../../store/useClientsStore";
import { onMounted } from "vue";
const clientsStore = useClientsStore()

const loadElectronicInvoiceProviders = async () => {
  await clientsStore.loadElectronicInvoiceProviders()
}
onMounted(() => {
  loadElectronicInvoiceProviders()
})
const selectElectronicInvoiceProvider = () => {
  clientsStore.moduleMode = "set-taxxa-info"
}
</script>
<!-- ******************** CSS ******************** -->
<style scoped></style>
