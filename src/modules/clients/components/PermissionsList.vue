<!-- ******************** HTML ******************** -->
<template>
  <LayoutOne>
    <div class="show d-none d-sm-block ml-5 mr-4">
      <v-row>
        <v-col>
          
        </v-col>
        <v-col>
          <!-- <v-text-field class="ma-2 w-80 " color="#841811ff" density="compact" variant="outlined" label="Buscar"
            append-inner-icon="mdi-magnify">
          </v-text-field> -->
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-card class="page-margins mt-n4">
            <v-card-text>
              <p class="text-h6">
            <b>
              Asignacion de permisos
            </b>
          </p>
              <div class="align-items">
                <p class="mt-1 text-grey">
                  <b>
                    Username:
                  </b>
                  Fernanda
                </p>
                <v-btn :disabled="selectedPermission.length == 0" variant="outlined" class="mt-n6" color="indigo">
                  Guardar
                </v-btn>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="page-margins">
          <v-text-field class="input-styles" color="#841811ff" density="compact"
            variant="outlined" label="Buscar" append-inner-icon="mdi-magnify">
          </v-text-field>
        </v-col>
      </v-row>
      <v-row class="mt-n4">
        <v-col cols="12" md="4" v-for="(permission, i) in arrayTest" :key="i">
          <v-card elevation="2" link class="border-color full-height-card page-margins" @click="toggleSelection(i)">
            <v-card-text>
              <div class="align-items">
                <p class="font-size">
                  <b>
                    {{ permission.moduleName }}
                  </b>
                </p>
                <span class="mt-n2">
                  <v-icon v-if="selectedPermission.includes(i)" color="green" size="33">
                    mdi-check-circle-outline
                  </v-icon>
                </span>
              </div>
              <div class="mt-6">
                <li v-for="(action, i) in permission.actions" :key="i" class="list-style">
                  <span class="icon-style">★</span>
                  {{ action }}
                </li>
              </div>
            </v-card-text>
            <v-card-action>
              <div class="mt-3 mb-n3">
                <v-btn variant="outlined" size="small" block color="indigo">
                  Ver permiso
                </v-btn>
              </div>
            </v-card-action>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </LayoutOne>
</template>
<!-- ******************** JavaScript ******************** -->
<script setup lang="ts">
import { ref } from 'vue';
import LayoutOne from '../../../Layouts/LayoutOne.vue';

const arrayTest = [
  { moduleName: 'Usuarios', actions: ['Crear', 'Eliminar', 'Paginar', 'Editar'] },
  { moduleName: 'Clientes', actions: ['Crear', 'Eliminar', 'Paginar', 'Editar'] },
  { moduleName: 'Permisos', actions: ['Crear', 'Eliminar', 'Paginar', 'Editar'] },
  { moduleName: 'Inventario', actions: ['Agregar producto', 'Editar stock', 'Eliminar producto'] },
  { moduleName: 'Configuración', actions: ['Actualizar perfil', 'Cambiar contraseña', 'Gestionar roles'] },
  { moduleName: 'Facturación', actions: ['Crear factura', 'Anular factura', 'Ver historial'] },
]

// let selectPermission = ref(true)

let selectedPermission = ref<number[]>([])
const toggleSelection = (index: number) => {
  const i = selectedPermission.value.indexOf(index);
  if (i > -1) {
    selectedPermission.value.splice(i, 1); // deselecciona si ya está
  } else {
    selectedPermission.value.push(index); // selecciona si no está
  }
}
</script>
<!-- ******************** CSS ******************** -->
<style scoped>
.full-height-card {
  height: 100%;
}

.page-margins {
  padding: 10px;
  margin: 10px;
}

.input-styles{
  margin-top: -20px;
  margin-bottom: -12px;
}
.font-size {
  font-size: 18px;
  color: rgb(65, 63, 63);
}

.icon-style {
  font-size: 11px;
  color: #3d4eafff;
}

.list-style {
  margin-top: 6%;
  color: rgb(130, 130, 130);
  list-style: none
}

.align-items {
  display: flex;
  justify-content: space-between;
}
</style>
