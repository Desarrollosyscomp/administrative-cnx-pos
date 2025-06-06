<template>
  <v-form >
    <v-row>
      <v-col>
        <v-select
          label="Tipo de documento"
          variant="outlined"
          density="compact"
          item-title="name"
          item-value="code"
        ></v-select>
      </v-col>

      <v-col>
        <v-text-field
          label="Numero de documento"
          variant="outlined"
          density="compact"
          type="text"
          minlength="6"
          maxlength="18"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="6">
        <v-text-field
          label="Primer nombre"
          variant="outlined"
          density="compact"
          type="text"
          minlength="1"
          maxlength="15"
        ></v-text-field>
      </v-col>

      <v-col>
        <v-text-field
          label="Segundo nombre"
          variant="outlined"
          density="compact"
          type="text"
          minlength="1"
          maxlength="15"
        >
        </v-text-field>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="6">
        <v-text-field
          label="Primer apellido"
          variant="outlined"
          density="compact"
          type="text"
          minlength="2"
          maxlength="15"
        >
        </v-text-field>
      </v-col>
      <v-col>
        <v-text-field
          label="Segundo apellido"
          variant="outlined"
          density="compact"
          type="text"
          minlength="2"
          maxlength="15"
        ></v-text-field>
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
  </v-form>
</template>

<script setup lang="ts">

</script>

<style scoped></style>
