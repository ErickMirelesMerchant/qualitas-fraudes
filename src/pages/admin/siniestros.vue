<template>
  <DrawerNavigation title="Siniestros">
    <v-row>
      <v-col cols="8" class="container-titles">
        <h1>Siniestros</h1>
        <p class="my-3">Gestiona las acciones de cada siniestro</p>
      </v-col>
      <v-col cols="4" class="container-actions-buttons">
        <v-btn append-icon="mdi-launch" @click="exportToExcel">
          Exportar tabla
        </v-btn>
        <v-text-field class="search-input-siniestros" prepend-inner-icon="mdi-magnify" v-model="searchQuery" variant="outlined" hide-details="true" placeholder="Buscar"></v-text-field>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <customTable :columns="columns" :data="filteredData" :has-checkbox="false" :first="first" :rows="rows" title="Siniestros"/>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <paginator :totalRecords="filteredData.length" :rows="rows" :first="first" @pageChange="updatePage" />
      </v-col>
    </v-row>
  </DrawerNavigation>
</template>

<script setup>
import { ref } from 'vue';
import customTable from "~/kernel/components/custom-table/custom-table.vue";
import DrawerNavigation from "~/kernel/components/drawer-navigation.vue";
import paginator from "~/kernel/components/paginator/paginator.vue";
import * as XLSX from "xlsx";

const searchQuery = ref("");

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
  
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
  XLSX.writeFile(workbook, "tabla_exportada.xlsx");
};
</script>

<style scoped>
.container-titles {
  h1 {
    font-family: 'Montserrat SemiBold', sans-serif;
    font-size: 30px;
    font-weight: 600;
    line-height: 38px;
    text-align: left;
    color: #101828;
  }
  p {
    font-family: 'Inter-Regular', sans-serif;
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
    text-align: left;
    color: #475467;
  }
}


.v-text-field input:focus, .v-text-field i {
  color: #000000;
}
.v-text-field {
  background-color: #FFFFFF;
}
.v-input {
  width: 400px !important;
  height: 44px !important;
  max-height: 44px !important;
}

.container-actions-buttons {
  display: flex;
    justify-content: flex-end;
    flex-direction: column;
    align-items: flex-end;
}
.container-actions-buttons .v-btn {
  margin-bottom: 3.5rem;
  width: 282px;
  height: 40px;
  padding: 10px 14px;
  gap: 4px;
  border-radius: 8px !important;
  background:  #0096AE;
  border: 1px solid #0096AE;
  box-shadow: 0px 1px 2px 0px #1018280D;
  font-family: 'Inter-SemiBold', sans-serif;
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  text-align: left;
  align-content: center;
}

.container-actions-buttons .v-icon {
  height: 20px;
  width: 20px;
  min-width: 20px;
}

</style>