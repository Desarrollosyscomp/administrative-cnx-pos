<template>
      <v-row>
        <v-col>
          <v-text-field label="Razón social" variant="outlined" density="compact" type="text" minlength="2"
            maxlength="70"></v-text-field>
        </v-col>
        <v-col>
          <v-text-field label="Nombre comercial" variant="outlined" density="compact" type="text" minlength="2"
            maxlength="35"></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-select label="Régimen" variant="outlined" density="compact" item-title="name"
            item-value="dian_id"></v-select>
        </v-col>
      </v-row>
      <v-row>
      <v-col md="12">
        <v-btn
          rounded="xs"
          size="large"
          block
          color="#841811ff"
          variant="outlined"
          class="mt-n3"
          density="compact"
          type="submit"
          >Modificar</v-btn
        >
      </v-col>
    </v-row>
</template>
<script setup lang="ts">


</script>

<style scoped>
.custom-font-size {
  font-size: 12px;
}

.align-components {
  width: 50%;
  display: inline-block;
}

.enable-font-color {
  color: #841811ff;
}

.style-card-error {
  border-radius: 5px;
  border-width: 1px;
  border-color: red;
}
</style>