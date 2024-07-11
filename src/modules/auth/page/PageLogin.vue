<template>
  <DesktopForm class="d-none d-sm-block" />
  <MobileForm class="d-block d-sm-none" />
</template>

<script setup lang="ts">
import MobileForm from "../components/MobileForm.vue";
import DesktopForm from "../components/DesktopForm.vue";
</script>
