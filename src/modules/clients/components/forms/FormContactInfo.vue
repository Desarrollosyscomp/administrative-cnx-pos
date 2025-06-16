<template>
  <v-form @submit.prevent="onsubmit" >
    <v-row>
      <v-col cols="12" class="mt-n6">
        <SyncThirdPartiesContact @onUpdatePhones="onUpdatePhones" @onUpdateEmails="onUpdateEmails"
          :emails="clientsStore.form.emails" :phones="clientsStore.form.phones"  />
      </v-col>
    </v-row>
    <v-row>
      <v-col md="12">
        <v-btn rounded="xs" size="large" block color="#841811ff" variant="outlined" class="mt-n3" density="compact"
          type="submit">Modificar</v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import SyncThirdPartiesContact from '../SyncThirdPartiesContact.vue';
import { EmitInterface } from '../../../../interfaces/Emit.interface';
import { useClientsStore } from '../../store/useClientsStore';

const clientsStore = useClientsStore()

const contact = reactive({
  phones: [],
  emails: []
})
const onUpdatePhones = (emitted: EmitInterface) => {
  contact.phones = emitted.data.phones;
  console.log(contact.phones);
};

const onUpdateEmails = (emitted: EmitInterface) => {
  contact.emails = emitted.data.emails;
  console.log(contact.emails);
};


const onsubmit = () => {
  clientsStore.form.phones = contact.phones;
  clientsStore.form.emails = contact.emails;
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
