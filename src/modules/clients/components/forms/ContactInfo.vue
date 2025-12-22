<template>
  <v-card
    class="full-height-card card-flex"
    :class="[clientsStore.isValidFormContactInfo && 'style-card-error']"
  >
    <v-card-text class="card-content">
      <p><b>Información de contacto</b></p>
      <br />

      <!-- Teléfonos -->
      <div class="row-align custom-font-size">
        <span class="text-truncate"> <b>Teléfonos:</b> {{ firstPhone }} </span>

        <v-menu
          v-if="(clientsStore.form.phones?.length ?? 0) > 1"
          v-model="menuPhones"
          :close-on-content-click="false"
          location="end"
        >
          <template v-slot:activator="{ props }">
            <span class="ver-mas" v-bind="props">Ver más</span>
          </template>

          <v-card min-width="200">
            <v-list>
              <v-list-item title="Teléfonos registrados" />
              <v-list-item
                v-for="(phones, i) in clientsStore.form.phones"
                :key="i"
              >
                {{ phones.number }}
                <v-divider />
              </v-list-item>
            </v-list>
          </v-card>
        </v-menu>
      </div>

      <v-divider />

      <!-- Correos -->
      <div class="row-align custom-font-size mt-1">
        <span class="text-truncate"> <b>Correos:</b> {{ firstEmail }} </span>

        <v-menu
          v-if="(clientsStore.form.emails?.length ?? 0) > 1"
          v-model="menuEmails"
          :close-on-content-click="false"
          location="end"
        >
          <template v-slot:activator="{ props }">
            <span class="ver-mas" v-bind="props">Ver más</span>
          </template>

          <v-card min-width="200">
            <v-list>
              <v-list-item title="Correos registrados" style="font-size: 14"/>
              <v-list-item
                v-for="(emails, i) in clientsStore.form.emails"
                :key="i"
              >
                <v-list class="custom-font-size mt-n2">
                {{ emails.email }}
                <v-divider />
                </v-list>
              </v-list-item>
            </v-list>
          </v-card>
        </v-menu>
      </div>

      <v-divider />
    </v-card-text>

    <v-card-actions class="card-actions-bottom">
      <v-btn
        block
        text="Abrir formulario"
        variant="outlined"
        color="#841911"
        size="small"
        @click="openMainInfoForm"
      />
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

.style-card-error {
  border-radius: 5px;
  border-width: 1px;
  border-color: red;
}
.full-height-card {
  height: 100%;
}

.card-flex {
  display: flex;
  flex-direction: column;
}

.card-content {
  flex: 1;
}

.card-actions-bottom {
  margin-top: auto;
}

.row-align {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.ver-mas {
  color: #841811ff;
  cursor: pointer;
  white-space: nowrap;
}

.custom-font-size {
  font-size: 12px;
}

.style-card-error {
  border-radius: 5px;
  border-width: 1px;
  border-color: red;
}

</style>
