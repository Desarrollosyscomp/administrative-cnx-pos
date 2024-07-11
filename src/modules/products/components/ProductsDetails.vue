<!-- ******************** HTML ******************** -->
<template>
  <v-card variant="outlined">
    <v-card-title> Products </v-card-title>
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
import { useProductsStore } from "../stores/index";

const productsStore = useProductsStore();
const data = productsStore.selectedItem;
</script>

<!-- ******************** CSS ******************** -->
<style></style>
