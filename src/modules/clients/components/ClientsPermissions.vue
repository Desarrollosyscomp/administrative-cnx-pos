<!-- ******************** HTML ******************** -->
<template>
  <v-container>
    <v-row>
      <v-col>
        <div class="mb-5">
          <p class="text-h6 text-left">
            <b>
              Asignación de permisos
            </b>
          </p>
        </div>
      </v-col>
      <v-col>
        <div class="d-flex justify-end">
          <v-icon color="#841811ff" @click="clientsStore.toogleDialog">
            mdi-close
          </v-icon>
        </div>
      </v-col>
    </v-row>
    <div class="checkboxes">
      <span class="clickable" @click="check = !check">
        <input type="checkbox" v-model="check" class="clickable"> Clientes  
      </span>
      <span class="clickable" @click="check = !check">
        <input type="checkbox" v-model="check" class="clickable"> Usuarios
      </span>
      <span class="clickable" @click="check = !check">
        <input type="checkbox" v-model="check" class="clickable"> Permisos
      </span>
    
    </div>
  </v-container>
</template>

<!-- ******************** JavaScript ******************** -->
<script setup lang="ts">
import { ref } from "vue";
import { useClientsStore } from "../store/useClientsStore"; 

const clientsStore = useClientsStore()
let check = ref(true)
</script>
<!-- ******************** CSS ******************** -->
<style scoped>
.checkboxes{
display: flex;
flex-direction: column;
gap: 8px;
}
.clickable {
  cursor: pointer;
}
</style>
