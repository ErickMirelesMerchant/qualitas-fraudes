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
          v-model="searchQuery"
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
        <customTable
          :columns="columns"
          :data="filteredData"
          :has-checkbox="true"
          :first="first"
          :rows="rows"
          title="Proveedores"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <paginator
          :totalRecords="filteredData.length"
          :rows="rows"
          :first="first"
          @pageChange="updatePage"
        />
      </v-col>
    </v-row>
  </DrawerNavigation>
</template>

<script setup>
import { ref } from 'vue';
import DrawerNavigation from "~/kernel/components/drawer-navigation.vue";
import customeCardDashboard from "~/kernel/components/cards/custome-card-dashboard.vue";
import customeTabs from "~/kernel/components/tabs/custome-tabs.vue";
import paginator from "~/kernel/components/paginator/paginator.vue";
import customTable from "~/kernel/components/custom-table/custom-table.vue";
import * as XLSX from "xlsx";
const searchQuery = ref("");

const tabsData = [
  { title: "Activos" },
  { title: "Inactivos" },
  { title: "En baja" },
];
const columns = [
  { title: 'Score', key: 'score' },
  { title: 'Siniestro', sortable: true, key: 'siniestro' },
  { title: 'Siniestro Relacionado', sortable: true, key: 'siniestroRelacionado' },
  { title: 'Reporte', key: 'reporte' },
  { title: 'Analista', sortable: true, key: 'analista' },
  { title: 'Reglas', key: 'reglas' },
  { title: 'ID proveedor', sortable: true, key: 'IDproveedor' },
  { title: 'Fecha asignación analista', sortable: true, key: 'fechaAsignacionAnalista' },
  { title: 'Fecha asignación proveedor', sortable: true, key: 'fechaAsignacionProvedor' },
  { title: 'Oficina de emisión', sortable: true, key: 'oficinaEmision' },
  { title: 'Gerente de cuenta', sortable: true, key: 'gerenteCuenta' },
  { title: 'Etiqueta SISE', sortable: true, key: 'etiquetaSISE' },
  { title: 'Estatus plataforma', sortable: true, key: 'estatusPlataforma' },
  { title: 'Marca', sortable: true, key: 'marca' },
  { title: 'Fecha de reporte', key: 'fechaDeReporte' },
  { title: 'Fecha ocurrido', key: 'fechaOcurrido' },
  { title: 'Clave agente', sortable: true, key: 'claveAgente' },
  { title: 'Nombre agente', sortable: true, key: 'nombreAgente' },
  { title: 'Tiempo de revisión', key: 'tiempoRevisión' },
  { title: 'Tiempo de asignación', key: 'tiempoAsignacion' },
  { title: 'Causa', sortable: true, key: 'causa' },
]
const data = [
  {
    score: 23,
    siniestro: '04241245475', 
    siniestroRelacionado: '04241245474',
    reporte: '14241456661',
    analista: 'acs0jxs',
    reglas: '[Reglas]',
    IDproveedor: '[ID Proveedor]',
    fechaAsignacionAnalista: '28/05/24   8:30:24',
    fechaAsignacionProvedor: '28/05/24   8:30:24',
    oficinaEmision: 'Nombre de oficina',
    gerenteCuenta: 'Nombre de gerente de cuenta',
    etiquetaSISE: 'Etiqueta',
    estatusPlataforma: 'Estatus',
    marca: 'Toyota',
    fechaDeReporte: '30/09/2024',
    fechaOcurrido: '30/09/2024',
    claveAgente: 'AGT-123456',
    nombreAgente: 'Juan Carlos Pérez González',
    tiempoRevisión: '5 días',
    tiempoAsignacion: '5 días',
    causa: 'Robo de automóvil',
  },
  {
    score: 23,
    siniestro: '04241245475', 
    siniestroRelacionado: '04241245477',
    reporte: '04241456669',
    analista: 'qcs0jxs',
    reglas: '[Reglas]',
    IDproveedor: '[ID Proveedor]',
    fechaAsignacionAnalista: '28/05/24   8:30:24',
    fechaAsignacionProvedor: '28/05/24   8:30:24',
    oficinaEmision: 'Nombre de oficina',
    gerenteCuenta: 'Nombre de gerente de cuenta',
    etiquetaSISE: 'Etiqueta',
    estatusPlataforma: 'Estatus',
    marca: 'Toyota',
    fechaDeReporte: '30/09/2024',
    fechaOcurrido: '30/09/2024',
    claveAgente: 'AGT-123456',
    nombreAgente: 'Juan Carlos Pérez González',
    tiempoRevisión: '5 días',
    tiempoAsignacion: '5 días',
    causa: 'Robo de automóvil',
  },
  {
    score: 23,
    siniestro: '04241245476', 
    siniestroRelacionado: '04241245473',
    reporte: '04241456665',
    analista: 'dcs0jxs',
    reglas: '[Reglas]',
    IDproveedor: '[ID Proveedor]',
    fechaAsignacionAnalista: '28/05/24   8:30:24',
    fechaAsignacionProvedor: '28/05/24   8:30:24',
    oficinaEmision: 'Nombre de oficina',
    gerenteCuenta: 'Nombre de gerente de cuenta',
    etiquetaSISE: 'Etiqueta',
    estatusPlataforma: 'Estatus',
    marca: 'Toyota',
    fechaDeReporte: '30/09/2024',
    fechaOcurrido: '30/09/2024',
    claveAgente: 'AGT-123456',
    nombreAgente: 'Juan Carlos Pérez González',
    tiempoRevisión: '5 días',
    tiempoAsignacion: '5 días',
    causa: 'Robo de automóvil',
  },
  {
    score: 23,
    siniestro: '04241245473', 
    siniestroRelacionado: '04241245475',
    reporte: '04241456664',
    analista: 'vcs0jxs',
    reglas: '[Reglas]',
    IDproveedor: '[ID Proveedor]',
    fechaAsignacionAnalista: '28/05/24   8:30:24',
    fechaAsignacionProvedor: '28/05/24   8:30:24',
    oficinaEmision: 'Nombre de oficina',
    gerenteCuenta: 'Nombre de gerente de cuenta',
    etiquetaSISE: 'Etiqueta',
    estatusPlataforma: 'Estatus',
    marca: 'Toyota',
    fechaDeReporte: '30/09/2024',
    fechaOcurrido: '30/09/2024',
    claveAgente: 'AGT-123456',
    nombreAgente: 'Juan Carlos Pérez González',
    tiempoRevisión: '5 días',
    tiempoAsignacion: '5 días',
    causa: 'Robo de automóvil',
  },
  {
    score: 23,
    siniestro: '04241245472', 
    siniestroRelacionado: '04241245475',
    reporte: '04241456664',
    analista: 'qcs0jxs',
    reglas: '[Reglas]',
    IDproveedor: '[ID Proveedor]',
    fechaAsignacionAnalista: '28/05/24   8:30:24',
    fechaAsignacionProvedor: '28/05/24   8:30:24',
    oficinaEmision: 'Nombre de oficina',
    gerenteCuenta: 'Nombre de gerente de cuenta',
    etiquetaSISE: 'Etiqueta',
    estatusPlataforma: 'Estatus',
    marca: 'Toyota',
    fechaDeReporte: '30/09/2024',
    fechaOcurrido: '30/09/2024',
    claveAgente: 'AGT-123456',
    nombreAgente: 'Juan Carlos Pérez González',
    tiempoRevisión: '5 días',
    tiempoAsignacion: '5 días',
    causa: 'Robo de automóvil',
  },
  {
    score: 23,
    siniestro: '04241245475', 
    siniestroRelacionado: '04241245475',
    reporte: '04241456664',
    analista: 'qcs0jxs',
    reglas: '[Reglas]',
    IDproveedor: '[ID Proveedor]',
    fechaAsignacionAnalista: '28/05/24   8:30:24',
    fechaAsignacionProvedor: '28/05/24   8:30:24',
    oficinaEmision: 'Nombre de oficina',
    gerenteCuenta: 'Nombre de gerente de cuenta',
    etiquetaSISE: 'Etiqueta',
    estatusPlataforma: 'Estatus',
    marca: 'Toyota',
    fechaDeReporte: '30/09/2024',
    fechaOcurrido: '30/09/2024',
    claveAgente: 'AGT-123456',
    nombreAgente: 'Juan Carlos Pérez González',
    tiempoRevisión: '5 días',
    tiempoAsignacion: '5 días',
    causa: 'Robo de automóvil',
  },
  {
    score: 23,
    siniestro: '04241245475', 
    siniestroRelacionado: '04241245475',
    reporte: '04241456664',
    analista: 'qcs0jxs',
    reglas: '[Reglas]',
    IDproveedor: '[ID Proveedor]',
    fechaAsignacionAnalista: '28/05/24   8:30:24',
    fechaAsignacionProvedor: '28/05/24   8:30:24',
    oficinaEmision: 'Nombre de oficina',
    gerenteCuenta: 'Nombre de gerente de cuenta',
    etiquetaSISE: 'Etiqueta',
    estatusPlataforma: 'Estatus',
    marca: 'Toyota',
    fechaDeReporte: '30/09/2024',
    fechaOcurrido: '30/09/2024',
    claveAgente: 'AGT-123456',
    nombreAgente: 'Juan Carlos Pérez González',
    tiempoRevisión: '5 días',
    tiempoAsignacion: '5 días',
    causa: 'Robo de automóvil',
  },
  {
    score: 23,
    siniestro: '04241245475', 
    siniestroRelacionado: '04241245475',
    reporte: '04241456664',
    analista: 'qcs0jxs',
    reglas: '[Reglas]',
    IDproveedor: '[ID Proveedor]',
    fechaAsignacionAnalista: '28/05/24   8:30:24',
    fechaAsignacionProvedor: '28/05/24   8:30:24',
    oficinaEmision: 'Nombre de oficina',
    gerenteCuenta: 'Nombre de gerente de cuenta',
    etiquetaSISE: 'Etiqueta',
    estatusPlataforma: 'Estatus',
    marca: 'Toyota',
    fechaDeReporte: '30/09/2024',
    fechaOcurrido: '30/09/2024',
    claveAgente: 'AGT-123456',
    nombreAgente: 'Juan Carlos Pérez González',
    tiempoRevisión: '5 días',
    tiempoAsignacion: '5 días',
    causa: 'Robo de automóvil',
  },
  {
    score: 23,
    siniestro: '04241245475', 
    siniestroRelacionado: '04241245475',
    reporte: '04241456664',
    analista: 'qcs0jxs',
    reglas: '[Reglas]',
    IDproveedor: '[ID Proveedor]',
    fechaAsignacionAnalista: '28/05/24   8:30:24',
    fechaAsignacionProvedor: '28/05/24   8:30:24',
    oficinaEmision: 'Nombre de oficina',
    gerenteCuenta: 'Nombre de gerente de cuenta',
    etiquetaSISE: 'Etiqueta',
    estatusPlataforma: 'Estatus',
    marca: 'Toyota',
    fechaDeReporte: '30/09/2024',
    fechaOcurrido: '30/09/2024',
    claveAgente: 'AGT-123456',
    nombreAgente: 'Juan Carlos Pérez González',
    tiempoRevisión: '5 días',
    tiempoAsignacion: '5 días',
    causa: 'Robo de automóvil',
  },
  {
    score: 23,
    siniestro: '04241245475', 
    siniestroRelacionado: '04241245475',
    reporte: '04241456664',
    analista: 'qcs0jxs',
    reglas: '[Reglas]',
    IDproveedor: '[ID Proveedor]',
    fechaAsignacionAnalista: '28/05/24   8:30:24',
    fechaAsignacionProvedor: '28/05/24   8:30:24',
    oficinaEmision: 'Nombre de oficina',
    gerenteCuenta: 'Nombre de gerente de cuenta',
    etiquetaSISE: 'Etiqueta',
    estatusPlataforma: 'Estatus',
    marca: 'Toyota',
    fechaDeReporte: '30/09/2024',
    fechaOcurrido: '30/09/2024',
    claveAgente: 'AGT-123456',
    nombreAgente: 'Juan Carlos Pérez González',
    tiempoRevisión: '5 días',
    tiempoAsignacion: '5 días',
    causa: 'Robo de automóvil',
  },
  {
    score: 23,
    siniestro: '04241245475', 
    siniestroRelacionado: '04241245475',
    reporte: '04241456664',
    analista: 'qcs0jxs',
    reglas: '[Reglas]',
    IDproveedor: '[ID Proveedor]',
    fechaAsignacionAnalista: '28/05/24   8:30:24',
    fechaAsignacionProvedor: '28/05/24   8:30:24',
    oficinaEmision: 'Nombre de oficina',
    gerenteCuenta: 'Nombre de gerente de cuenta',
    etiquetaSISE: 'Etiqueta',
    estatusPlataforma: 'Estatus',
    marca: 'Toyota',
    fechaDeReporte: '30/09/2024',
    fechaOcurrido: '30/09/2024',
    claveAgente: 'AGT-123456',
    nombreAgente: 'Juan Carlos Pérez González',
    tiempoRevisión: '5 días',
    tiempoAsignacion: '5 días',
    causa: 'Robo de automóvil',
  },
]

const first = ref(0);
const rows = ref(10);

const filteredData = computed(() => {
  if (!searchQuery.value) {
    return data;
  }
  return data.filter(item =>
    Object.values(item).some(
      value => String(value).toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  );
});

const updatePage = (newFirst) => {
  first.value = newFirst;
};

const exportToExcel = () => {
  console.log("Exporting to Excel", dat);
  
  const worksheet = XLSX.utils.json_to_sheet(data.value);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
  XLSX.writeFile(workbook, "tabla_exportada.xlsx");
};
</script>
