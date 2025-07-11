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
                        ? "Formulario de creacion de un cliente"
                        : "Formulario de edicion de un cliente"
                    }}
                  </p>
                </b>
              </v-card-text>
            </div>
            <div align="end" style="width: 50%; display: inline-block" class="ma-n2">
              <v-btn color="success" variant="outlined" size="small" type="submit">
                {{
                  clientsStore.moduleMode === "add"
                    ? "Crear"
                    : "Editar"
                }}
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

    <v-dialog max-width="700" v-model="clientsStore.openDialog" @afterLeave="onCloseDialog">
      <v-card>
        <v-card-title>
          <div v-if="clientsStore.mode == 'main-info'">
            <p><b> Informacion principal </b></p>
          </div>
          <div v-if="clientsStore.mode == 'fiscal-info'">
            <p><b>Informacion fiscal</b></p>
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
import { inject, onBeforeMount, onMounted } from "vue";
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
const clientsStore = useClientsStore()
// let validationSchema = Yup.object(validations);

const loadThirdParty = async () => {
  let id = route.params.id;
  console.log(id)
  if (!id) return;
  clientsStore.moduleMode = "edit";
  const response = await clientsStore.getOneClient(id);
  console.log(response.data);
  const thirdParty = response.data.client;

  clientsStore.selectedItem = thirdParty;
  const location = parseLocation(thirdParty);
  clientsStore.selectedCountry = location?.country;
  clientsStore.selectedMunicipality = location?.municipality;
  clientsStore.selectedDepartment = location?.department;
  clientsStore.selectedNeighborhood = location?.neighborhood;
  const form = parseClientsToForm(thirdParty);
  clientsStore.form = parseClientsToForm(thirdParty);
  console.log(clientsStore.form)
  console.log(thirdParty)
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
    await validationLocationInfoExport(
      clientsStore.getLocationInfoForm()
    );
    clientsStore.isValidFormLocationInfo = false;
    clientsStore.isValidFormContactInfo = true;
    await validationContactInfoExport(
      clientsStore.getContactInfoForm()
    )
    clientsStore.isValidFormContactInfo = false;
    clientsStore.isValidFormComercialActivities = true;
    await validationComercialActivitiesInfoExport(
      clientsStore.getFinancialActivitiesForm()
    )
    clientsStore.isValidFormComercialActivities = false;
    let response;
    let addMode = clientsStore.moduleMode == "add";
    if (clientsStore.moduleMode == "add") {
      response = await clientsStore.addClient(clientsStore.form);
      console.log(response);
    } else if (clientsStore.moduleMode == "edit") {
      const id = clientsStore.selectedItem.id;
      response = await clientsStore.edit(
        id,
        clientsStore.form
      );
    }
    console.log(response);
    if (!response.error) {
      swal.fire({
        icon: "success",
        text: addMode ? "Agregado con éxito" : "Actualizado con éxito",
        showConfirmButton: false,
        timer: 1500,
      });
      router.push("/client/" + route.params.id as string + "/details");
    } else {
      swal.fire({
        icon: "warning",
        text: 'Ocurrio un error',
        showConfirmButton: false,
        timer: 1500,
      });
    }
  } catch (error) {
    console.log(error);
    swal.fire({
      icon: "warning",
      text: "El formulario no se lleno correctamente",
      showConfirmButton: false,
      timer: 1500,
    });
  }
};

const onCloseDialog = () => {
  clientsStore.mode = "";
};
onBeforeMount(() => {
  clientsStore.initialiceForm();
});
const loadInitialData = async () => {
  console.log(clientsStore.moduleMode)
  await loadThirdParty();
  await clientsStore.loadInitialData();
};

onMounted(async () => {
  await appStore.afterLoading(loadInitialData);
  await loadInitialData()
});
</script>
<style>
.full-height-card {
  height: 100%;
}
</style>
