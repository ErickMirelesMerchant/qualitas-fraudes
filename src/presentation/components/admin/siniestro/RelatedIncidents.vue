<template>
  <v-row>
    <v-col cols="12">
      <CustomCardShowHide title="Siniestros relacionados" :button-show="false">
        <v-row class="mt-2">
          <v-col cols="12">
            <customTable
              title=""
              :columns="columnsContent"
              :data="dataContent"
              :has-checkbox="false"
              :first="first"
              :rows="rows"
              :showButton="false"
              :showTitle="false"
            />
          </v-col>
        </v-row>
      </CustomCardShowHide>
    </v-col>
  </v-row>
</template>

<script setup>
import { ref } from "vue";
import CustomCardShowHide from "~/kernel/components/cards/CustomCardShowHide.vue";
import customTable from "~/kernel/components/custom-table/CustomTable.vue";

const first = ref(0);
const rows = ref(10);

const columnsContent = [
  { title: "No. de siniestro", key: "noSiniestro" },
  { title: "No. de reporte", key: "noReporte" },
  { title: "Vehículo", key: "vehiculo" },
  { title: "Serie", key: "serie" },
  { title: "Reserva inicial", key: "reservaInicial" },
  { title: "Acciones", key: "verSiniestro" },
];

const dataContent = [
  {
    noSiniestro: "04241245475",
    noReporte: "01",
    vehiculo: "Volkswagen Jetta 2016",
    serie: "ABC12345678901234",
    reservaInicial: "[Reserva inicial]",
    acciones: "",
    url: "",
  },
  {
    noSiniestro: "04241245475",
    noReporte: "01",
    vehiculo: "Volkswagen Jetta 2016",
    serie: "ABC12345678901234",
    reservaInicial: "[Reserva inicial]",
    acciones: "",
    url: "",
  },
  {
    noSiniestro: "04241245475",
    noReporte: "01",
    vehiculo: "Volkswagen Jetta 2016",
    serie: "ABC12345678901234",
    reservaInicial: "[Reserva inicial]",
    acciones: "",
    url: "",
  },
  {
    noSiniestro: "04241245475",
    noReporte: "01",
    vehiculo: "Volkswagen Jetta 2016",
    serie: "ABC12345678901234",
    reservaInicial: "[Reserva inicial]",
    acciones: "",
    url: "",
  },
];
</script>
