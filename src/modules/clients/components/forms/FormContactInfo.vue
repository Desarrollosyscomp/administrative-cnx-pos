<template>
    <v-row>
      <v-col cols="12" class="mt-n6">
        <SyncThirdPartiesContact @onUpdatePhones="onUpdatePhones" @onUpdateEmails="onUpdateEmails"
          :emails="clientsStore.form.emails" :phones="clientsStore.form.phones"  />
      </v-col>
    </v-row>
    <v-row>
      <v-col md="12">
        <v-btn @click="onSubmit" rounded="xs" size="large" block color="#841811ff" variant="outlined" class="mt-n3" density="compact"
          type="submit">Cerrar</v-btn>
      </v-col>
    </v-row>
</template>

<script setup lang="ts">
import SyncThirdPartiesContact from '../SyncThirdPartiesContact.vue';
import { EmitInterface } from '../../../../interfaces/Emit.interface';
import { useClientsStore } from '../../store/useClientsStore';

const clientsStore = useClientsStore()

const onUpdatePhones = (emitted: EmitInterface) => {
  clientsStore.form.phones = emitted.data.phones;
};

const onUpdateEmails = (emitted: EmitInterface) => {
  clientsStore.form.emails = emitted.data.emails;
};

const onSubmit = () => {
  clientsStore.toogleDialog()
};
</script>

<style scoped>
.custom-font-size {
  font-size: 12px;
}

.align-components {
  width: 50%;
  display: inline-block;
}
</style>
