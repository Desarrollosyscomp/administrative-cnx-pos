<template>
  <LayoutOne>
    <v-form @submit.prevent="submitTotalForm">
      <v-row>
        <v-col>
          <v-card>
            <div style="width: 50%; display: inline-block">
              <v-card-text>
                <b
                  ><p style="font-size: medium">
                    {{
                      clientsStore.moduleMode === "add"
                        ? "Formulario de creacion de un cliente"
                        : "Formulario de edicion de un cliente"
                    }}
                  </p></b
                >
              </v-card-text>
            </div>
            <div
              align="end"
              style="width: 50%; display: inline-block"
              class="ma-n2"
            >
              <v-btn
                color="success"
                variant="outlined"
                size="small"
                type="submit"
              >
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
            <CompanyInfo />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <FiscalInfo />
          </v-col>
          <v-col cols="12" md="6">
            <AddressContactInfo />
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
            <p><b> Informacion principal </b></p>
          </div>
          <div v-if="clientsStore.mode == 'fiscal-info'">
            <p><b>Informacion fiscal</b></p>
          </div>
          <div v-if="clientsStore.mode == 'addressContact-info'">
            <p><b>Direccion y contacto</b></p>
          </div>
          <div v-if="clientsStore.mode == 'company-info'">
            <p><b>Informacion compañia</b></p>
          </div>

        </v-card-title>
        <v-card-text>
          <div v-if="clientsStore.mode == 'main-info'">
            <FormMainInfo />
          </div>
          <div v-if="clientsStore.mode == 'fiscal-info'">
            <FormFiscalInfo />
          </div>
          <div v-if="clientsStore.mode == 'addressContact-info'">
            <FormAddressInfo
              v-if="clientsStore.mode == 'addressContact-info'"
            />
          </div>
          <div v-if="clientsStore.mode == 'company-info'">
            <FormCompanyInfo />
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
import AddressContactInfo from "./forms/AddressContactInfo.vue";
import FormMainInfo from "./forms/FormMainInfo.vue";
import FormFiscalInfo from "./forms/FormFiscalInfo.vue";
import FormAddressInfo from "./forms/FormAddressInfo.vue";
import { inject, onBeforeMount } from "vue";
import { useRouter } from "vue-router";
// import validations from "../validations/validations";
// import * as Yup from "yup";
// import { useAppStore } from "../../../stores/app-store";
import { useClientsStore } from "../store/useClientsStore";
import CompanyInfo from "./forms/CompanyInfo.vue";
import ClientCommercialActivities from "./ClientCommercialActivities.vue";
import FormCompanyInfo from "./forms/FormCompanyInfo.vue";
// import {
//   validationFiscalInfoExport,
//   validationMainInfoExport,
//   validationFinancialInfoExport,
//   validationLocationContactInfoExport,
//   validationComercialActivitiesInfoExport,
//} from "../validations/extraValidations";

// const appStore = useAppStore();
const swal: any = inject("$swal");
const emit = defineEmits(["onClose"]);
// const route = useRoute();
const router = useRouter();
const clientsStore = useClientsStore()
// let validationSchema = Yup.object(validations);

// const loadThirdParty = async () => {
//   let id = route.params.id;
//   if (!id) return;
//   clientsStore.moduleMode = "edit";
//   const response = await clientsStore.getOne(id);
//   console.log(response.data);
//   const thirdParty = response.data;

//   clientsStore.selectedItem = thirdParty;
//   const location = parseLocation(thirdParty);
//   clientsStore.selectedCountry = location?.country;
//   clientsStore.selectedMunicipality = location?.municipality;
//   clientsStore.selectedDepartment = location?.department;
//   clientsStore.selectedNeighborhood = location?.neighborhood;
//   const form = parseThirdPartyToForm(thirdParty);
//   clientsStore.form = parseThirdPartyToForm(thirdParty);
//   // clientsStore.selectedFinancialActivities = form.financial_activities;
//   // console.log(clientsStore.selectedFinancialActivities)
//   setTimeout(() => {
//     clientsStore.form.use_points = form.use_points;
//     clientsStore.form.has_coupons = form.has_coupons;
//     clientsStore.form.apply_promotions = form.apply_promotions;
//     clientsStore.form.has_price_list = form.has_price_list;
//     clientsStore.form.price_list_id = form.price_list_id;
//     clientsStore.form.neighborhood_id = form.neighborhood_id;
//   }, 50);
// };

const submitTotalForm = async () => {
  try {
    // clientsStore.isSubmitTotalForm = true;
    // clientsStore.isValidFormMainInfo = true;
    // await validationMainInfoExport(clientsStore.getMainInfoForm()),
    //   (clientsStore.isValidFormMainInfo = false);
    // clientsStore.isValidFormFiscalInfo = true;
    // await validationFiscalInfoExport(clientsStore.getFiscalInfoForm()),
    //   (clientsStore.isValidFormFiscalInfo = false);
    // clientsStore.isValidFormAddressContactInfo = true;
    // await validationLocationContactInfoExport(
    //   clientsStore.getLocationContactInfoForm()
    // ),
    //   (clientsStore.isValidFormAddressContactInfo = false);

    // clientsStore.isValidFormFinancialInfo = true;
    // await validationFinancialInfoExport(
    //   clientsStore.getFinancialInfoForm()
    // ),
    //   (clientsStore.isValidFormFinancialInfo = false);
    // clientsStore.isValidFormComercialActivities = true;
    // await validationComercialActivitiesInfoExport(
    //   clientsStore.getFinancialActivitiesForm()
    // ),
    //   (clientsStore.isValidFormComercialActivities = false);

    let response;
    let addMode = clientsStore.moduleMode == "add";
    if (clientsStore.moduleMode == "add") {
      response = await clientsStore.add(clientsStore.form);
      console.log(response);
    } else if (clientsStore.moduleMode == "edit") {
      const id = clientsStore.selectedItem.id;
      response = await clientsStore.edit(
        id,
        clientsStore.form
      );
      console.log(response);
    }
    if (response.status === 200) {
      await swal.fire({
        icon: "success",
        text: "Agregado con éxito",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      swal.fire({
        icon: "success",
        text: addMode ? "Agregado con éxito" : "Actualizado con éxito",
        showConfirmButton: false,
        timer: 1500,
      });
      router.push({
        name: "sync-third-parties-list",
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
// const loadInitialData = async () => {
//   await loadThirdParty();
//   await clientsStore.loadInitialData();
// };
// onMounted(async () => {
//   await appStore.afterLoading(loadInitialData);
//   // loadThirdParty();
// });
</script>
<style>
.full-height-card {
  height: 100%;
}
</style>
