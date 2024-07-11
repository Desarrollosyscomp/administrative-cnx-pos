<template>
  <MobileForm class="d-none" />
  <DesktopForm />
</template>
<style></style>
<script setup lang="ts">
//import { useAppOptionStore } from "@/stores/app-option";
//import { useRouter, RouterLink } from "vue-router";
//import { useAuthStore } from "../store/useStoreAuth";
import MobileForm from "../components/MobileForm.vue";
import DesktopForm from "../components/MobileForm.vue";
//import * as Yup from "yup";
import { /*ref, reactive,*/ inject } from "vue-demi";
const swal: any = inject("$swal");
swal;
//const appOption = useAppOptionStore();
// const auth = useAuthStore();

// //let isLoading = ref(false);
// // let userError = reactive({
// //   state: false,
// //   message: "",
// // });
// //let token = ref("");
// let dataForm = reactive({
//   // email: "",
//   // password: "",
//   email: "leonardo27188@gmail.com",
//   password: "Admin@123",
// });
//let status = ref(null);

// //const schema = Yup.object().shape({
// const schema = Yup.object().shape({
//   email: Yup.string().required("Email es requerido").email("Email is invalid"),
//   password: Yup.string()
//     .min(6, "Password debe ser mayor a seis carácteres")
//     .required("Password es requerida"),
// });

// const onSubmit = async () => {
//   isLoading.value = true;
//   await auth.login(dataForm.email, dataForm.password);
//   if (!auth.user.isLogged) {
//     swal({
//       icon: "warning",
//       text: "Credenciales incorrectas",
//       showConfirmButton: false,
//       timer: 1500,
//     });
//   }
//   isLoading.value = false;
// };
</script>
