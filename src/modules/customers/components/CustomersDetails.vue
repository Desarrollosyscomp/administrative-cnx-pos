<!-- ******************** HTML ******************** -->
<template>
  <v-card variant="outlined">
    <v-card-title> Customers </v-card-title>
    <v-card-text>
      <!-- post content -->
      <ul>
        <li>Nombres: {{ data.name }}</li>
        <li>Descripción: {{ data.description }}</li>
      </ul>
      <!-- <p>{{userData}}</p> -->
      <!-- post action -->
    </v-card-text>
  </v-card>
</template>

<!-- ******************** JavaScript ******************** -->
<script setup>
import { useCustomersStore } from "../stores/index";

const customersStore = useCustomersStore();
const data = customersStore.selectedItem;
</script>

<!-- ******************** CSS ******************** -->
<style></style>
