<template>
  <DrawerNavigation title="Inicio">
    <h1>Bienvenido al Dashboard</h1>
    <p class="my-3">Gestiona los siniestros</p>
    <v-row>
      <v-col cols="12" md="3">
        <customeCardDashboard title="Siniestros pendientes de proveedor" icon="mdi-file-check-outline" />
      </v-col>
      <v-col cols="12" md="3">
        <customeCardDashboard title="Siniestros pendientes de proveedor" icon="mdi-file-check-outline" />
      </v-col>
      <v-col cols="12" md="3">
        <customeCardDashboard title="Siniestros pendientes de proveedor" icon="mdi-file-check-outline" />
      </v-col>
      <v-col cols="12" md="3">
        <customeCardDashboard title="Siniestros pendientes de proveedor" icon="mdi-file-check-outline" />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <customeTabs :tabsList="tabsData" />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <!-- <customeTable /> -->
      </v-col>
    </v-row>
  </DrawerNavigation>
</template>

<script setup>
import customeCardDashboard from "~/kernel/components/cards/custome-card-dashboard.vue";
import DrawerNavigation from "~/kernel/components/drawer-navigation.vue";
import customeTabs from "~/kernel/components/tabs/custome-tabs.vue";

const tabsData = [
  { title: "Activos" },
  { title: "Inactivos" },
  { title: "En baja" },
];
</script>
