<!-- ******************** HTML ******************** -->
<template>
  <v-row class="mt-4">
    <v-col cols="12" md="6">
      <v-text-field
        color="#841811ff"
        density="compact"
        variant="outlined"
        label="Teléfonos"
        id="phoneInput"
        type="text"
        minlength="7"
        maxlength="19"
        v-model="phone"
        append-inner-icon="mdi-plus"
        @click:append-inner="sendPhone"
        @keyup.enter="sendPhone"
        :rules="phoneRules"
      >
      </v-text-field>
      <p
        v-if="validationNoRepeatPhone"
        class="font-size"
        style="color: #b00020"
      >
        El telefono ya se encuentra registrado
      </p>
      <v-table v-if="phones.length > 0">
        <tbody>
          <tr class="rowTable">
            <td class="font-size">{{ phones[0].number }}</td>
            <v-spacer></v-spacer>
            <td class="text-right">
              <v-btn
                v-if="phones.length < 2"
                color="#841811ff"
                size="x-small"
                variant="text"
                icon="mdi-delete"
                @click="deletePhone(0)"
              >
              </v-btn>
              <div v-else="phones.length > 2">
                <v-menu
                  v-model="menuPhones"
                  :close-on-content-click="false"
                  location="end"
                >
                  <template v-slot:activator="{ props }">
                    <p style="color: #841811ff" v-bind="props">Ver mas</p>
                  </template>
                  <div>
                    <v-card min-width="300">
                      <v-card-text class="mb-n4">
                        <p style="font-size: 15px">
                          <b>Telefonos registrados</b>
                        </p>
                      </v-card-text>
                      <v-list>
                        <v-list-item v-for="(phone, i) in phones" :key="i">
                          <span class="font-size align-components">
                            {{ phone.number }}
                          </span>
                          <div align="end" class="align-components">
                            <v-btn
                              color="#841811ff"
                              size="x-small"
                              variant="text"
                              icon="mdi-delete"
                              @click="deletePhone(i)"
                            >
                            </v-btn>
                          </div>

                          <v-divider></v-divider>
                        </v-list-item>
                      </v-list>
                    </v-card>
                  </div>
                </v-menu>
              </div>
            </td>
          </tr>
          <v-divider></v-divider>
        </tbody>
      </v-table>
    </v-col>
    <v-col cols="12" md="6">
      <v-text-field
        :rules="emailRules"
        color="#841811ff"
        density="compact"
        variant="outlined"
        label="Emails"
        id="emailInput"
        type="text"
        minlength="5"
        maxlength="254"
        v-model="email"
        append-inner-icon="mdi-plus"
        @click:append-inner="sendEmail"
        @keyup.enter="sendEmail"
      >
      </v-text-field>
      <p
        v-if="validationNoRepeatEmail"
        class="font-size"
        style="color: #b00020"
      >
        El email ya se encuentra registrado
      </p>

      <v-table v-if="emails.length > 0">
        <tbody>
          <tr class="rowTable">
            <td class="font-size">{{ emails[0].email }}</td>
            <v-spacer></v-spacer>
            <td class="text-right">
              <v-btn
                v-if="emails.length < 2"
                color="#841811ff"
                size="x-small"
                variant="text"
                icon="mdi-delete"
                @click="deleteEmail(0)"
              >
              </v-btn>
              <div v-else="phones.length > 2">
                <v-menu
                  v-model="menuEmails"
                  :close-on-content-click="false"
                  location="end"
                >
                  <template v-slot:activator="{ props }">
                    <p style="color: #841811ff" v-bind="props">Ver mas</p>
                  </template>
                  <div>
                    <v-card min-width="300">
                      <v-card-text class="mb-n4">
                        <p style="font-size: 15px">
                          <b>Correos registrados</b>
                        </p>
                      </v-card-text>
                      <v-list>
                        <v-list-item v-for="(email, i) in emails" :key="i">
                          <span class="font-size align-components">
                            {{ email.email }}
                          </span>
                          <div align="end" class="align-components">
                            <v-btn
                              color="#841811ff"
                              size="x-small"
                              variant="text"
                              icon="mdi-delete"
                              @click="deleteEmail(i)"
                            >
                            </v-btn>
                          </div>

                          <v-divider></v-divider>
                        </v-list-item>
                      </v-list>
                    </v-card>
                  </div>
                </v-menu>
              </div>
            </td>
          </tr>
          <v-divider></v-divider>
        </tbody>
      </v-table>
    </v-col>
  </v-row>
</template>

<!-- ******************** JavaScript ******************** -->
<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import {
  emailRegex,
  extraValidationEmail,
  extraValidationPhone,
  isValidPhoneNumber,
} from "../validations/extraValidations";
import { contactValidations } from "../validations/validations";

const emit = defineEmits(["onUpdateEmails", "onUpdatePhones"]);

type email = {
  email: string;
};
type phone = {
  number: string;
};
const props = defineProps({
  phones: {
    type: Array<{
      number: string;
    }>,
    default: [] as Array<phone>,
  },
  emails: {
    type: Array<{
      email: string;
    }>,
    default: [] as Array<email>,
  },
});

let phone = ref("");
let email = ref("");
let validationNoRepeatPhone = ref(false);
let validationNoRepeatEmail = ref(false);
let menuPhones = ref(false);
let menuEmails = ref(false);

let phones = ref(props.phones as Array<phone>);
let emails = ref(props.emails as Array<email>);

// const validations = {
//   phone: Yup.string().required("Este campo es requerido"),
//   email: Yup.string()
//     .email(
//       "La dirección de correo electrónico debe tener al menos un @ y un punto"
//     )
//     .required("Este campo es requerido")
//     .trim()
//     .min(1, "La dirección de correo electrónico no debe estar vacía"),
// };

const phoneRules = ref([
  async (value: any) => {
    try {
      await contactValidations.phone.validate(value);
      if (!isValidPhoneNumber(value)) {
        return "El telefono no tiene un formato válido";
      }
      return true;
    } catch (e: any) {
      return "El telefono ingresado no es válido";
    }
  },
]);

const emailRules = ref([
  async (value: any) => {
    try {
      if (!emailRegex(value)) {
        return "El email debe contener un '@' y un dominio válido (por ejemplo, .com)";
      }
      await contactValidations.email.validate(value);
      return true;
    } catch (e: any) {
      return "El email ingresado no es válido";
    }
  },
]);

const sendPhone = () => {
  validationNoRepeatPhone.value = phones.value.some(
    (p: phone) => p.number === phone.value
  );
  if (!extraValidationPhone(phone.value)) return;
  if (phone.value == "" || validationNoRepeatPhone.value) return;
  phones.value.push({ number: phone.value });
  phone.value = "";
  validationNoRepeatPhone.value = false;
};
const sendEmail = () => {
  validationNoRepeatEmail.value = emails.value.some(
    (e: email) => e.email === email.value
  );
  if (!extraValidationEmail(email.value)) return;
  if (email.value == "" || validationNoRepeatEmail.value) return;
  emails.value.push({ email: email.value });
  email.value = "";
};
const deletePhone = (index: number) => {
  phones.value.splice(index, 1);
};
const deleteEmail = (index: number) => {
  emails.value.splice(index, 1);
};

let inputEmail = null;
let inputPhone = null;
const setFocus = () => {
  inputEmail = document.getElementById("emailInput");
  inputPhone = document.getElementById("phoneInput");
  if (inputEmail) {
    inputEmail.addEventListener("blur", () => {
      sendEmail();
    });
  }
  if (inputPhone) {
    inputPhone.addEventListener("blur", () => {
      sendPhone();
    });
  }
};

watch(phones.value, () => {
  emit("onUpdatePhones", {
    name: "ThirdPartiesContact.onUpdatePhones",
    data: {
      phones: phones.value,
    },
  });
});
watch(emails.value, () => {
  emit("onUpdateEmails", {
    name: "ThirdPartiesContact.onUpdateEmails",
    data: {
      emails: emails.value,
    },
  });
});

onMounted(() => {
  setFocus();
});
</script>
<!-- ******************** CSS ******************** -->
<style scoped>
.font-size {
  font-size: 12px;
}

.align-components {
  width: 50%;
  display: inline-block;
}
</style>
