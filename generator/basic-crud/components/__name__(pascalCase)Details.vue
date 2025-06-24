<!-- ******************** HTML ******************** -->
<template>
  <v-card variant="outlined">
    <v-card-title> __name__(noCase) </v-card-title>
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
import { use__name__(pascalCase)Store } from "../stores/index";

const __name__(camelCase)Store = use__name__(pascalCase)Store();
const data = __name__(camelCase)Store.selectedItem;
</script>

<!-- ******************** CSS ******************** -->
<style></style>
