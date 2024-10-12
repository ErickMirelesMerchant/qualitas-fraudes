<template>
  <DrawerNavigation title="Proveedores">
    <v-row>
      <v-col cols="auto">
        <h1 class="mb-5">Proveedores</h1>
      </v-col>
      <v-spacer></v-spacer>
      <v-col cols="auto">
        <v-btn
          append-icon="mdi-export-variant"
          @click="exportToExcel"
          color="primary"
          rounded="x-large"
        >
          Exportar tabla
          <template v-slot:append>
            <v-icon color="white"></v-icon>
          </template>
        </v-btn>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="4">
        <customeCardDashboard
          title="Proveedores activos"
          icon="mdi-account-multiple-check-outline"
          :quantity="42"
        />
      </v-col>
      <v-col cols="12" md="4">
        <customeCardDashboard
          title="Proveedores inactivos"
          icon="mdi-account-multiple-remove-outline"
          :quantity="8"
        />
      </v-col>
      <v-col cols="12" md="4">
        <customeCardDashboard
          title="Proveedores conectados"
          icon="mdi-hand-heart-outline"
          :quantity="32"
        />
      </v-col>
    </v-row>

    <v-row justify="end">
      <v-col cols="12" md="4">
        <v-text-field
          density="comfortable"
          v-model="search"
          variant="solo"
          prepend-inner-icon="mdi-magnify"
          placeholder="Buscar"
          outlined
          hide-details="auto"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <customeTabs :tabsList="tabsData" />
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <customeTable :items="filteredItems" :heads="heads" type="Proveedores" />
      </v-col>
    </v-row>
  </DrawerNavigation>
</template>

<script setup>
import DrawerNavigation from "~/kernel/components/drawer-navigation.vue";
import customeCardDashboard from "~/kernel/components/cards/custome-card-dashboard.vue";
import customeTable from "~/kernel/components/table/custome-table.vue";
import customeTabs from "~/kernel/components/tabs/custome-tabs.vue";
import { ref, computed } from "vue";
import * as XLSX from "xlsx";

const search = ref("");

const tabsData = [
  { title: "Activos" },
  { title: "Inactivos" },
  { title: "En baja" },
];

const items = ref([
  {
    score: "23",
    siniestro: "04241245475",
    reporte: "04241456664",
    analista: "qsci0jks",
    reglas: "[Reglas]",
    idProveedor: "[ID Proveedor]",
    fechaAsignacionAnalista: "28/05/24 8:30:24",
    fechaAsignacionProveedor: "28/05/24 8:30:24",
    oficinaEmision: "Nombre de oficina",
    gerenteCuenta: "Nombre de gerente de cuenta",
    etiqueta: "Etiqueta",
    etiquetaSSE: "Etiqueta",
    estatusPlataforma: "Estatus",
    marca: "Toyota",
    fechaReporte: "30/09/2024",
    fechaOcurrido: "30/09/2024",
    claveAgente: "AGT-123456",
    nombreAgente: "Juan Carlos Pérez González",
    tiempoRevision: "5 días",
    tiempoAsignacion: "5 días",
    causa: "Robo de automóvil",
  },
  {
    score: "23",
    siniestro: "04241245475",
    reporte: "04241456664",
    analista: "qsci0jks",
    reglas: "[Reglas]",
    idProveedor: "[ID Proveedor]",
    fechaAsignacionAnalista: "28/05/24 8:30:24",
    fechaAsignacionProveedor: "28/05/24 8:30:24",
    oficinaEmision: "Nombre de oficina",
    gerenteCuenta: "Nombre de gerente de cuenta",
    etiqueta: "Etiqueta",
    etiquetaSSE: "Etiqueta",
    estatusPlataforma: "Estatus",
    marca: "Toyota",
    fechaReporte: "30/09/2024",
    fechaOcurrido: "30/09/2024",
    claveAgente: "AGT-123456",
    nombreAgente: "Alan Carlos Pérez González",
    tiempoRevision: "5 días",
    tiempoAsignacion: "5 días",
    causa: "Robo de automóvil",
  },
  {
    score: "23",
    siniestro: "04241245475",
    reporte: "04241456664",
    analista: "qsci0jks",
    reglas: "[Reglas]",
    idProveedor: "[ID Proveedor]",
    fechaAsignacionAnalista: "28/05/24 8:30:24",
    fechaAsignacionProveedor: "28/05/24 8:30:24",
    oficinaEmision: "Nombre de oficina",
    gerenteCuenta: "Nombre de gerente de cuenta",
    etiqueta: "Etiqueta",
    etiquetaSSE: "Etiqueta",
    estatusPlataforma: "Estatus",
    marca: "Toyota",
    fechaReporte: "30/09/2024",
    fechaOcurrido: "30/09/2024",
    claveAgente: "AGT-123456",
    nombreAgente: "Alfredo Carlos Pérez González",
    tiempoRevision: "5 días",
    tiempoAsignacion: "5 días",
    causa: "Robo de automóvil",
  },
]);

const heads = ref([
  { title: "Score" },
  { title: "Siniestro" },
  { title: "Reporte" },
  { title: "Analista" },
  { title: "Reglas" },
  { title: "ID Proveedor" },
  { title: "Fecha asignación analista" },
  { title: "Fecha asignación proveedor" },
  { title: "Oficina de emisión" },
  { title: "Gerente de cuenta" },
  { title: "Etiqueta" },
  { title: "Etiqueta SSE" },
  { title: "Estatus plataforma" },
  { title: "Marca" },
  { title: "Fecha de reporte" },
  { title: "Fecha ocurrido" },
  { title: "Clave agente" },
  { title: "Nombre agente" },
  { title: "Tiempo de revisión" },
  { title: "Tiempo de asignación" },
  { title: "Causa" },
]);

const exportToExcel = () => {
  const worksheet = XLSX.utils.json_to_sheet(items.value);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
  XLSX.writeFile(workbook, "tabla_exportada.xlsx");
};

const filteredItems = computed(() => {
  if (!search.value) {
    return items.value;
  }

  const searchTerm = search.value.toLowerCase();
  return items.value.filter((item) => {
    return (
      item.siniestro.toLowerCase().includes(searchTerm) ||
      item.reporte.toLowerCase().includes(searchTerm) ||
      item.analista.toLowerCase().includes(searchTerm) ||
      item.nombreAgente.toLowerCase().includes(searchTerm) ||
      item.marca.toLowerCase().includes(searchTerm)
    );
  });
});
</script>
