<template>
  <v-card class="full-height-card" :class="[clientsStore.isValidFormContactInfo && 'style-card-error']">
    <v-card-text>
      <p><b>Información de contacto</b></p>
      <br />
      <span class="custom-font-size align-components"
        ><b>Teléfonos:</b> {{ firstPhone }}</span
      >
      <div
        v-if="(clientsStore.form.phones?.length ?? 0) > 1 "
        class="align-components custom-font-size w-50"
        align="end"
        >
        <v-menu
          v-model="menuPhones"
          :close-on-content-click="false"
          location="end"
        >
          <template v-slot:activator="{ props }">
            <p style="color: #841811ff; ;" v-bind="props">Ver mas</p>
          </template>
          <div>
            <v-card min-width="200">
              <v-list>
                <v-list-item
                  title="Teléfonos registrados"
                  style="font-size: 14"
                >
                </v-list-item>
                <v-list-item
                  v-for="(phones, i) in clientsStore.form.phones"
                  :key="i"
                >
                  <v-list class="custom-font-size mt-n2">
                    {{ phones.number }}
                  </v-list>
                  <v-divider></v-divider>
                </v-list-item>
              </v-list>
            </v-card>
          </div>
        </v-menu>
      </div>

      <v-divider></v-divider>

      <div class="custom-font-size align-components">
        <span><b>Correos:</b> {{ firstEmail }} </span>
      </div>

      <div
        v-if="(clientsStore.form.emails?.length ?? 0) > 1"
        class="align-components custom-font-size"
        align="end"
      >
        <v-menu
          v-model="menuEmails"
          :close-on-content-click="false"
          location="end"
        >
          <template v-slot:activator="{ props }">
            <p style="color: #841811ff" v-bind="props">Ver mas</p>
          </template>
          <div>
            <v-card min-width="200">
              <v-list>
                <v-list-item title="Correos registrados" style="font-size: 14">
                </v-list-item>
                <v-list-item
                  v-for="(emails, i) in clientsStore.form.emails"
                  :key="i"
                >
                  <v-list class="custom-font-size mt-n2">
                    {{ emails.email }}
                  </v-list>
                  <v-divider></v-divider>
                </v-list-item>
              </v-list>
            </v-card>
          </div>
        </v-menu>
      </div>
      <v-divider></v-divider>
    </v-card-text>
    <br>
    <v-card-actions>
      <v-btn
        block
        text="Abrir formulario"
        variant="outlined"
        color="#841911"
        size="small"
        class="mt-3"
        @click="openMainInfoForm"
      ></v-btn>
    </v-card-actions>
  </v-card>
</template>
<script setup lang="ts">
import { computed, ref } from "vue";
import { useClientsStore } from "../../store/useClientsStore";

const clientsStore = useClientsStore();

const openMainInfoForm = () => {
  clientsStore.toogleDialog();
  clientsStore.mode = "contact-info";
};

const firstEmail = computed(() => {
  if (!clientsStore.form.emails) return "";
  if (clientsStore.form.emails.length > 0) {
    return clientsStore.form.emails[0].email;
  } else {
    return "";
  }
});

const firstPhone = computed(() => {
  if (!clientsStore.form.phones) return "";
  if (clientsStore.form.phones.length > 0) {
    return clientsStore.form.phones[0].number;
  } else {
    return "";
  }
});

const menuEmails = ref(false);
const menuPhones = ref(false);
</script>

<style scoped>
.custom-font-size {
  font-size: 12px;
}

.align-components {
  width: 50%;
  display: inline-block;
}

.style-card-error {
  border-radius: 5px;
  border-width: 1px;
  border-color: red;
}
.full-height-card {
    height: 100%;
}
</style>
