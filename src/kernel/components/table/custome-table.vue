<template>
  <v-card>
    <v-card-text>
      <v-row>
        <v-col cols="auto">
          <p class="text-h5">Analistas</p>
        </v-col>
        <v-col cols="auto">
          <v-chip color="#99CAD7" variant="flat" style="color: #006e80;"> 11 Analistas </v-chip>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-table>
            <thead>
              <tr>
                <th class="text-left">Name</th>
                <th class="text-left">icon</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in items" :key="item.title">
                <td>{{ item.title }}</td>
                <td>{{ item.icon }}</td>
              </tr>
            </tbody>
          </v-table>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { defineProps } from "vue";

//const drawer = ref(true);

const props = defineProps({
  /* title: {
    type: String,
    required: true,
  },*/
});

const items = [
  { title: "Dashboard", icon: "mdi-view-dashboard-outline" },
  { title: "Siniestros", icon: "mdi-car-outline" },
  { title: "Analistas", icon: "mdi-account-multiple-outline" },
  { title: "Proveedores", icon: "mdi-handshake-outline" },
  { title: "Notificaciones", icon: "mdi-checkbox-blank-badge-outline" },
];
</script>
