<!-- ******************** HTML ******************** -->
<template>

  <div class="show d-none d-sm-block">
    <v-row>
      <v-col cols="12" md="4" v-for="(permission, i) in arrayTest" :key="i">
        <v-card elevation="3" link>
          <v-card-text>
            <p>
              <b>
                {{ permission.moduleName }}
              </b>
            </p>
            <v-divider></v-divider>
            <div class="mt-2">
              <li v-for="(action, i) in permission.actions" :key="i">
                {{ action }}
              </li>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
<!-- ******************** JavaScript ******************** -->
<script setup lang="ts">
const arrayTest = [
  { moduleName: 'Usuarios', actions: ['Crear', 'Eliminar', 'Paginar', 'Editar'] },
  { moduleName: 'Clientes', actions: ['Crear', 'Eliminar', 'Paginar', 'Editar'] },
  { moduleName: 'Permisos', actions: ['Crear', 'Eliminar', 'Paginar', 'Editar'] },
  { moduleName: 'Inventario', actions: ['Agregar producto', 'Editar stock', 'Eliminar producto'] },
  { moduleName: 'Configuración', actions: ['Actualizar perfil', 'Cambiar contraseña', 'Gestionar roles'] },
  { moduleName: 'Facturación', actions: ['Crear factura', 'Anular factura', 'Ver historial'] },
]
</script>
<!-- ******************** CSS ******************** -->
<style scoped></style>
