<template>
  <LayoutOne>
    <v-form @submit.prevent="submitTotalForm">
      <v-row>
        <v-col>
          <v-card>
            <div style="width: 50%; display: inline-block">
              <v-card-text>
                <b>
                  <p style="font-size: medium">
                    {{
                      clientsStore.moduleMode === "add"
                        ? "Formulario de creación de un cliente"
                        : "Formulario de edición de un cliente"
                    }}
                  </p>
                </b>
                <p style="font-size: small; color: gray" v-if="!draftMessage">
                  ⚠️ Este formulario está en borrador, complete todos los campos para guardar
                </p>
              </v-card-text>
            </div>
            <div
              align="end"
              style="width: 50%; display: inline-block"
              class="ma-n2"
            >
              <v-btn
                color="#841811ff"
                variant="outlined"
                size="small"
                class="mr-2"
                @click="attemptResetForm"
              >
                Resetear
              </v-btn>
              <v-btn
                color="success"
                variant="outlined"
                size="small"
                type="submit"
                :disabled="draftMode"
              >
                {{ clientsStore.moduleMode === "add" ? "Crear" : "Editar" }}
              </v-btn>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-form>

    <v-row>
      <v-col cols="12" md="6">
        <v-row>
          <v-col cols="12" md="6">
            <MainInfo />
          </v-col>
          <v-col cols="12" md="6">
            <AddressInfo />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <FiscalInfo />
          </v-col>
          <v-col cols="12" md="6">
            <ContactInfo />
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" md="6">
        <ClientCommercialActivities />
      </v-col>
    </v-row>

    <v-dialog
      max-width="700"
      v-model="clientsStore.openDialog"
      @afterLeave="onCloseDialog"
    >
      <v-card>
        <v-card-title>
          <div v-if="clientsStore.mode == 'main-info'">
            <p><b> Información principal </b></p>
          </div>
          <div v-if="clientsStore.mode == 'fiscal-info'">
            <p><b>Información fiscal</b></p>
          </div>
          <div v-if="clientsStore.mode == 'address-info'">
            <p><b>Información residencial</b></p>
          </div>
          <div v-if="clientsStore.mode == 'contact-info'">
            <p><b>Información de contacto</b></p>
          </div>
        </v-card-title>
        <v-card-text>
          <div v-if="clientsStore.mode == 'main-info'">
            <FormMainInfo />
          </div>
          <div v-if="clientsStore.mode == 'fiscal-info'">
            <FormFiscalInfo />
          </div>
          <div v-if="clientsStore.mode == 'address-info'">
            <FormAddressInfo />
          </div>
          <div v-if="clientsStore.mode == 'contact-info'">
            <FormContactInfo />
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
  </LayoutOne>
</template>
<!-- ******************** JavaScript ******************** -->
<script setup lang="ts">
import LayoutOne from "../../../Layouts/LayoutOne.vue";
import FiscalInfo from "./forms/FiscalInfo.vue";
import MainInfo from "./forms/MainInfo.vue";
import FormMainInfo from "./forms/FormMainInfo.vue";
import FormFiscalInfo from "./forms/FormFiscalInfo.vue";
import FormAddressInfo from "./forms/FormAddressInfo.vue";
import { computed, inject, onBeforeMount, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
// import validations from "../validations/validations";
// import * as Yup from "yup";
import { useAppStore } from "../../../stores/app-store";
import { useClientsStore } from "../store/useClientsStore";
import ClientCommercialActivities from "./ClientCommercialActivities.vue";
import FormContactInfo from "./forms/FormContactInfo.vue";
import AddressInfo from "./forms/AddressInfo.vue";
import ContactInfo from "./forms/ContactInfo.vue";
import { parseClientsToForm } from "../utils/parse-clients-to-form";
import { parseLocation } from "../utils/parse-location";
import {
  validationFiscalInfoExport,
  validationMainInfoExport,
  validationContactInfoExport,
  validationLocationInfoExport,
  validationComercialActivitiesInfoExport,
} from "../validations/extraValidations";
import router from "../../../router";

const appStore = useAppStore();
const swal: any = inject("swal");
const emit = defineEmits(["onClose"]);
const route = useRoute();
const clientsStore = useClientsStore();
// let validationSchema = Yup.object(validations);
const draftMode = ref(false);
const loadThirdParty = async () => {
  let id = route.params.id;
  if (!id) return;
  clientsStore.moduleMode = "edit";
  const response = await clientsStore.getOneClient(id);
  const thirdParty = response.data.client;

  clientsStore.selectedItem = thirdParty;
  const location = parseLocation(thirdParty);
  clientsStore.selectedCountry = location?.country;
  clientsStore.selectedMunicipality = location?.municipality;
  clientsStore.selectedDepartment = location?.department;
  clientsStore.selectedNeighborhood = location?.neighborhood;
  const form = parseClientsToForm(thirdParty);
  clientsStore.form = parseClientsToForm(thirdParty);
  setTimeout(() => {
    clientsStore.selectedFinancialActivities = form.financial_activities;
    clientsStore.form.neighborhood_id = form.neighborhood_id;
  }, 50);
};

const submitTotalForm = async () => {
  try {
    clientsStore.isValidFormMainInfo = true;
    await validationMainInfoExport(clientsStore.getMainInfoForm());
    clientsStore.isValidFormMainInfo = false;
    clientsStore.isValidFormFiscalInfo = true;
    await validationFiscalInfoExport(clientsStore.getFiscalInfoForm());
    clientsStore.isValidFormFiscalInfo = false;
    clientsStore.isValidFormLocationInfo = true;
    await validationLocationInfoExport(clientsStore.getLocationInfoForm());
    clientsStore.isValidFormLocationInfo = false;
    clientsStore.isValidFormContactInfo = true;
    await validationContactInfoExport(clientsStore.getContactInfoForm());
    clientsStore.isValidFormContactInfo = false;
    clientsStore.isValidFormComercialActivities = true;
    await validationComercialActivitiesInfoExport(
      clientsStore.getFinancialActivitiesForm()
    );
    clientsStore.isValidFormComercialActivities = false;
    let response;
    let addMode = clientsStore.moduleMode == "add";
    draftMode.value = true;
    if (clientsStore.moduleMode == "add") {
      response = await clientsStore.addClient(clientsStore.form);
      draftMode.value = false;
    } else if (clientsStore.moduleMode == "edit") {
      const id = clientsStore.selectedItem.id;
      response = await clientsStore.edit(id, clientsStore.form);
      draftMode.value = false;
    }
    if (!response.error) {
      swal.fire({
        icon: "success",
        text: addMode ? "Agregado con éxito" : "Actualizado con éxito",
        showConfirmButton: false,
        timer: 1500,
      });
      await router.push("/client/list");
      resetForm();
    } else {
      swal.fire({
        icon: "warning",
        text: "Ocurrio un error",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  } catch (error) {
    swal.fire({
      icon: "warning",
      text: "El formulario no se lleno correctamente",
      showConfirmButton: false,
      timer: 1500,
    });
  }
};

const resetForm = () => {
  clientsStore.initialiceForm();
  clientsStore.selectedFinancialActivities = [];
  clientsStore.selectedCountry = {};
  clientsStore.selectedDepartment = {};
  clientsStore.selectedMunicipality = {};
  clientsStore.selectedNeighborhood = {};
}

const attemptResetForm = () => {
  swal.fire({
    text: "¿Está seguro que desea resetear el formulario?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#4CAF50",
    cancelButtonColor: "red",
    confirmButtonText: '<span style="color: white;">Sí</span>',
    cancelButtonText: '<span style="color: white;">Cancelar</span>',
  }).then((result: any) => {
    if (result.isConfirmed) {
      resetForm();
    }
  });
}

const onCloseDialog = () => {
  clientsStore.mode = "";
};
onBeforeMount(() => {
//  clientsStore.initialiceForm();
});
const loadInitialData = async () => {
  await loadThirdParty();
  await clientsStore.loadInitialData();
};

const draftMessage = computed((): boolean => {
  return (
    clientsStore.form.first_name == "" &&
    clientsStore.form.name == "" &&
    clientsStore.form.second_name == "" &&
    clientsStore.form.sure_name == "" &&
    clientsStore.form.second_sure_name == "" &&
    clientsStore.form.identification_type_code == null &&
    clientsStore.form.identification_number == "" &&
    clientsStore.form.tradename == "" &&
    clientsStore.form.tax_schema_dian_id == "" &&
    clientsStore.form.fiscal_obligation_dian_id == "" &&
    clientsStore.form.financial_activities.length == 0 &&
    clientsStore.form.address == "" &&
    clientsStore.form.country_id == 0 &&
    clientsStore.form.department_id == 0 &&
    clientsStore.form.municipality_id == 0 &&
    clientsStore.form.neighborhood_id == 0 &&
    clientsStore.form.emails.length == 0 &&
    clientsStore.form.phones.length == 0
  );
});

onMounted(async () => {
  // clientsStore.initialiceForm();
  await appStore.afterLoading(loadInitialData);
});
</script>
<style>
.full-height-card {
  height: 100%;
}
</style>
