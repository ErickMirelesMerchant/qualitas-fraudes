<template>
  <DrawerNavigation title="Siniestros">
    <div class="container-titles">
        <h1>Siniestros</h1>
        <p class="my-3">Gestiona las acciones de cada siniestro</p>
      </div>
      <v-btn append-icon="mdi-launch">
        Exportar tabla
      </v-btn>
    <v-text-field
      v-model="searchQuery"
      hide-details="true"
      label="Buscar"
    ></v-text-field>

    <v-row>
      <v-col cols="12">
        <customTable :columns="columns" :data="filteredData" :has-checkbox="true" :first="first" 
        :rows="rows" />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <paginator  :totalRecords="filteredData.length" 
        :rows="rows" 
        :first="first" 
        @pageChange="updatePage"  />
      </v-col>
    </v-row>
  </DrawerNavigation>
</template>

<script setup>
import { ref } from 'vue';
import customTable from "~/kernel/components/custom-table/custom-table.vue";
import DrawerNavigation from "~/kernel/components/drawer-navigation.vue";
import paginator from "~/kernel/components/paginator/paginator.vue";

const searchQuery = ref("");

const columns = [
  { title: 'Score', align: 'start', key: 'score' },
  { title: 'Siniestro', align: 'start', key: 'siniestro' },
  { title: 'Reporte', align: 'start', key: 'reporte' },
  { title: 'Analista', align: 'start', key: 'analista' },
  { title: 'Reglas', align: 'start', key: 'reglas' },
  { title: 'IF proveedor', align: 'start', key: 'IDproveedor' },
  { title: 'Fecha asignación analista', align: 'start', key: 'fechaAsignacionAnalista' },
  { title: 'Fecha asignación proveedor', align: 'start', key: 'fechaAsignacionProvedor' },
  { title: 'Oficina de emisión', align: 'start', key: 'oficinaEmision' },
  { title: 'Gerente de cuenta', align: 'start', key: 'gerenteCuenta' },
  { title: 'Etiqueta SISE', align: 'start', key: 'etiquetaSISE' },
  { title: 'Estatus plataforma', align: 'start', key: 'estatusPlataforma' },
  { title: 'Marca', align: 'start', key: 'marca' },
  { title: 'Fecha de reporte', align: 'start', key: 'fechaDeReporte' },
  { title: 'Fecha ocurrido', align: 'start', key: 'fechaOcurrido' },
  { title: 'Clave agente', align: 'start', key: 'claveAgente' },
  { title: 'Nombre agente', align: 'start', key: 'nombreAgente' },
  { title: 'Tiempo de revisión', align: 'start', key: 'tiempoRevisión' },
  { title: 'Tiempo de asignación', align: 'start', key: 'tiempoAsignacion' },
  { title: 'Causa', align: 'start', key: 'causa' },
]
const data = [
  {
    score: 23,
    siniestro: '04241245475',
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

// Computada que filtra los datos en base a la búsqueda
const filteredData = computed(() => {
  if (!searchQuery.value) {
    return data; // Si no hay búsqueda, retornamos todos los datos
  }
  return data.filter(item => 
    Object.values(item).some(
      value => String(value).toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  );
});

// Actualiza la página cuando el componente de paginación emite el cambio
const updatePage = (newFirst) => {
  first.value = newFirst;
};
</script>
