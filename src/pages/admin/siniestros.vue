<template>
  <DrawerNavigation title="Siniestros">
    <v-row>
      <v-col cols="auto" class="container-titles">
        <h1>Siniestros</h1>
        <p class="my-3">Gestiona las acciones de cada siniestro</p>
      </v-col>
      <v-spacer></v-spacer>
      <v-col cols="auto" class="container-actions-buttons">
        <v-btn append-icon="mdi-launch" @click="exportToExcel">
          Exportar tabla
        </v-btn>
        <v-text-field
          max-width="100%"
          class="search-input-siniestros"
          prepend-inner-icon="mdi-magnify"
          v-model="searchQuery"
          variant="outlined"
          hide-details="true"
          placeholder="Buscar"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="3" style="transition: all 0.3s ease">
        <Details
          v-if="showDetails"
          @closeDetails="handleCloseDetails"
          :siniestroId="selectedSiniestroId"
          :textButton="'Ver detalle de siniestro'"
          :actionButton="verDetalle"
        >
          <template #content>
            <v-row
              v-for="(section, sectionIndex) in siniestroSections"
              :key="sectionIndex"
              class="mt-4 mb-0 border-s-lg"
              style="border-color: #0096ae !important"
            >
              <v-col
                cols="12"
                v-for="(item, itemIndex) in section"
                :key="itemIndex"
                class="pb-2 pt-0"
              >
                <h5 class="text-subtitle-1">{{ item.label }}</h5>
                <p class="text-body-2">{{ item.value }}</p>
              </v-col>
            </v-row>
          </template>
        </Details>
      </v-col>
      <v-spacer></v-spacer>
      <v-col v-bind="showDetails ? { cols: 12, md: 9 } : { cols: 12 }">
        <customTable
          :columns="columns"
          :data="filteredData"
          :has-checkbox="false"
          :first="first"
          :rows="rows"
          title="Siniestros"
          @checkbox-selected="openDetails"
          :checkedId="checkedId"
        />
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
import { debounce } from "lodash";
import { ref } from "vue";
import { useRouter } from "vue-router";
import * as XLSX from "xlsx";
import customTable from "~/kernel/components/custom-table/CustomTable.vue";
import Details from "~/kernel/components/details/details.vue";
import DrawerNavigation from "~/kernel/components/drawer-navigation.vue";
import paginator from "~/kernel/components/paginator/paginator.vue";
import { encryptId } from "~/kernel/utils/crypto";

const router = useRouter();

const searchQuery = ref("");

const columns = [
  { title: "Siniestro", sortable: true, key: "siniestro" },
  { title: "Score", key: "score" },
  {
    title: "Siniestro Relacionado",
    sortable: true,
    key: "siniestroRelacionado",
  },
  { title: "Reporte", key: "reporte" },
  { title: "Analista", sortable: true, key: "analista" },
  { title: "Reglas", key: "reglas" },
  { title: "ID proveedor", sortable: true, key: "IDproveedor" },
  {
    title: "Fecha asignación analista",
    sortable: true,
    key: "fechaAsignacionAnalista",
  },
  {
    title: "Fecha asignación proveedor",
    sortable: true,
    key: "fechaAsignacionProvedor",
  },
  { title: "Oficina de emisión", sortable: true, key: "oficinaEmision" },
  { title: "Gerente de cuenta", sortable: true, key: "gerenteCuenta" },
  { title: "Etiqueta SISE", sortable: true, key: "etiquetaSISE" },
  { title: "Estatus plataforma", sortable: true, key: "estatusPlataforma" },
  { title: "Marca", sortable: true, key: "marca" },
  { title: "Fecha de reporte", key: "fechaDeReporte" },
  { title: "Fecha ocurrido", key: "fechaOcurrido" },
  { title: "Clave agente", sortable: true, key: "claveAgente" },
  { title: "Nombre agente", sortable: true, key: "nombreAgente" },
  { title: "Tiempo de revisión", key: "tiempoRevisión" },
  { title: "Tiempo de asignación", key: "tiempoAsignacion" },
  { title: "Causa", sortable: true, key: "causa" },
];
const data = [
  {
    siniestro: "04241245475",
    score: 23,
    siniestroRelacionado: "04241245474",
    reporte: "14241456661",
    analista: "acs0jxs",
    reglas: "[Reglas]",
    IDproveedor: "[ID Proveedor]",
    fechaAsignacionAnalista: "28/05/24   8:30:24",
    fechaAsignacionProvedor: "28/05/24   8:30:24",
    oficinaEmision: "Nombre de oficina",
    gerenteCuenta: "Nombre de gerente de cuenta",
    etiquetaSISE: "Etiqueta",
    estatusPlataforma: "Estatus",
    marca: "Toyota",
    fechaDeReporte: "30/09/2024",
    fechaOcurrido: "30/09/2024",
    claveAgente: "AGT-123456",
    nombreAgente: "Juan Carlos Pérez González",
    tiempoRevisión: "5 días",
    tiempoAsignacion: "5 días",
    causa: "Robo de automóvil",
  },
  {
    siniestro: "04241245475",
    score: 23,
    siniestroRelacionado: "04241245477",
    reporte: "04241456669",
    analista: "qcs0jxs",
    reglas: "[Reglas]",
    IDproveedor: "[ID Proveedor]",
    fechaAsignacionAnalista: "28/05/24   8:30:24",
    fechaAsignacionProvedor: "28/05/24   8:30:24",
    oficinaEmision: "Nombre de oficina",
    gerenteCuenta: "Nombre de gerente de cuenta",
    etiquetaSISE: "Etiqueta",
    estatusPlataforma: "Estatus",
    marca: "Toyota",
    fechaDeReporte: "30/09/2024",
    fechaOcurrido: "30/09/2024",
    claveAgente: "AGT-123456",
    nombreAgente: "Juan Carlos Pérez González",
    tiempoRevisión: "5 días",
    tiempoAsignacion: "5 días",
    causa: "Robo de automóvil",
  },
  {
    siniestro: "04241245476",
    score: 23,
    siniestroRelacionado: "04241245473",
    reporte: "04241456665",
    analista: "dcs0jxs",
    reglas: "[Reglas]",
    IDproveedor: "[ID Proveedor]",
    fechaAsignacionAnalista: "28/05/24   8:30:24",
    fechaAsignacionProvedor: "28/05/24   8:30:24",
    oficinaEmision: "Nombre de oficina",
    gerenteCuenta: "Nombre de gerente de cuenta",
    etiquetaSISE: "Etiqueta",
    estatusPlataforma: "Estatus",
    marca: "Toyota",
    fechaDeReporte: "30/09/2024",
    fechaOcurrido: "30/09/2024",
    claveAgente: "AGT-123456",
    nombreAgente: "Juan Carlos Pérez González",
    tiempoRevisión: "5 días",
    tiempoAsignacion: "5 días",
    causa: "Robo de automóvil",
  },
  {
    siniestro: "04241245473",
    score: 23,
    siniestroRelacionado: "04241245475",
    reporte: "04241456664",
    analista: "vcs0jxs",
    reglas: "[Reglas]",
    IDproveedor: "[ID Proveedor]",
    fechaAsignacionAnalista: "28/05/24   8:30:24",
    fechaAsignacionProvedor: "28/05/24   8:30:24",
    oficinaEmision: "Nombre de oficina",
    gerenteCuenta: "Nombre de gerente de cuenta",
    etiquetaSISE: "Etiqueta",
    estatusPlataforma: "Estatus",
    marca: "Toyota",
    fechaDeReporte: "30/09/2024",
    fechaOcurrido: "30/09/2024",
    claveAgente: "AGT-123456",
    nombreAgente: "Juan Carlos Pérez González",
    tiempoRevisión: "5 días",
    tiempoAsignacion: "5 días",
    causa: "Robo de automóvil",
  },
  {
    siniestro: "04241245472",
    score: 23,
    siniestroRelacionado: "04241245475",
    reporte: "04241456664",
    analista: "qcs0jxs",
    reglas: "[Reglas]",
    IDproveedor: "[ID Proveedor]",
    fechaAsignacionAnalista: "28/05/24   8:30:24",
    fechaAsignacionProvedor: "28/05/24   8:30:24",
    oficinaEmision: "Nombre de oficina",
    gerenteCuenta: "Nombre de gerente de cuenta",
    etiquetaSISE: "Etiqueta",
    estatusPlataforma: "Estatus",
    marca: "Toyota",
    fechaDeReporte: "30/09/2024",
    fechaOcurrido: "30/09/2024",
    claveAgente: "AGT-123456",
    nombreAgente: "Juan Carlos Pérez González",
    tiempoRevisión: "5 días",
    tiempoAsignacion: "5 días",
    causa: "Robo de automóvil",
  },
  {
    siniestro: "04241245475",
    score: 23,
    siniestroRelacionado: "04241245475",
    reporte: "04241456664",
    analista: "qcs0jxs",
    reglas: "[Reglas]",
    IDproveedor: "[ID Proveedor]",
    fechaAsignacionAnalista: "28/05/24   8:30:24",
    fechaAsignacionProvedor: "28/05/24   8:30:24",
    oficinaEmision: "Nombre de oficina",
    gerenteCuenta: "Nombre de gerente de cuenta",
    etiquetaSISE: "Etiqueta",
    estatusPlataforma: "Estatus",
    marca: "Toyota",
    fechaDeReporte: "30/09/2024",
    fechaOcurrido: "30/09/2024",
    claveAgente: "AGT-123456",
    nombreAgente: "Juan Carlos Pérez González",
    tiempoRevisión: "5 días",
    tiempoAsignacion: "5 días",
    causa: "Robo de automóvil",
  },
  {
    siniestro: "04241245475",
    score: 23,
    siniestroRelacionado: "04241245475",
    reporte: "04241456664",
    analista: "qcs0jxs",
    reglas: "[Reglas]",
    IDproveedor: "[ID Proveedor]",
    fechaAsignacionAnalista: "28/05/24   8:30:24",
    fechaAsignacionProvedor: "28/05/24   8:30:24",
    oficinaEmision: "Nombre de oficina",
    gerenteCuenta: "Nombre de gerente de cuenta",
    etiquetaSISE: "Etiqueta",
    estatusPlataforma: "Estatus",
    marca: "Toyota",
    fechaDeReporte: "30/09/2024",
    fechaOcurrido: "30/09/2024",
    claveAgente: "AGT-123456",
    nombreAgente: "Juan Carlos Pérez González",
    tiempoRevisión: "5 días",
    tiempoAsignacion: "5 días",
    causa: "Robo de automóvil",
  },
  {
    siniestro: "04241245475",
    score: 23,
    siniestroRelacionado: "04241245475",
    reporte: "04241456664",
    analista: "qcs0jxs",
    reglas: "[Reglas]",
    IDproveedor: "[ID Proveedor]",
    fechaAsignacionAnalista: "28/05/24   8:30:24",
    fechaAsignacionProvedor: "28/05/24   8:30:24",
    oficinaEmision: "Nombre de oficina",
    gerenteCuenta: "Nombre de gerente de cuenta",
    etiquetaSISE: "Etiqueta",
    estatusPlataforma: "Estatus",
    marca: "Toyota",
    fechaDeReporte: "30/09/2024",
    fechaOcurrido: "30/09/2024",
    claveAgente: "AGT-123456",
    nombreAgente: "Juan Carlos Pérez González",
    tiempoRevisión: "5 días",
    tiempoAsignacion: "5 días",
    causa: "Robo de automóvil",
  },
  {
    siniestro: "04241245475",
    score: 23,
    siniestroRelacionado: "04241245475",
    reporte: "04241456664",
    analista: "qcs0jxs",
    reglas: "[Reglas]",
    IDproveedor: "[ID Proveedor]",
    fechaAsignacionAnalista: "28/05/24   8:30:24",
    fechaAsignacionProvedor: "28/05/24   8:30:24",
    oficinaEmision: "Nombre de oficina",
    gerenteCuenta: "Nombre de gerente de cuenta",
    etiquetaSISE: "Etiqueta",
    estatusPlataforma: "Estatus",
    marca: "Toyota",
    fechaDeReporte: "30/09/2024",
    fechaOcurrido: "30/09/2024",
    claveAgente: "AGT-123456",
    nombreAgente: "Juan Carlos Pérez González",
    tiempoRevisión: "5 días",
    tiempoAsignacion: "5 días",
    causa: "Robo de automóvil",
  },
  {
    siniestro: "04241245475",
    score: 23,
    siniestroRelacionado: "04241245475",
    reporte: "04241456664",
    analista: "qcs0jxs",
    reglas: "[Reglas]",
    IDproveedor: "[ID Proveedor]",
    fechaAsignacionAnalista: "28/05/24   8:30:24",
    fechaAsignacionProvedor: "28/05/24   8:30:24",
    oficinaEmision: "Nombre de oficina",
    gerenteCuenta: "Nombre de gerente de cuenta",
    etiquetaSISE: "Etiqueta",
    estatusPlataforma: "Estatus",
    marca: "Toyota",
    fechaDeReporte: "30/09/2024",
    fechaOcurrido: "30/09/2024",
    claveAgente: "AGT-123456",
    nombreAgente: "Juan Carlos Pérez González",
    tiempoRevisión: "5 días",
    tiempoAsignacion: "5 días",
    causa: "Robo de automóvil",
  },
  {
    siniestro: "04241245475",
    score: 23,
    siniestroRelacionado: "04241245475",
    reporte: "04241456664",
    analista: "qcs0jxs",
    reglas: "[Reglas]",
    IDproveedor: "[ID Proveedor]",
    fechaAsignacionAnalista: "28/05/24   8:30:24",
    fechaAsignacionProvedor: "28/05/24   8:30:24",
    oficinaEmision: "Nombre de oficina",
    gerenteCuenta: "Nombre de gerente de cuenta",
    etiquetaSISE: "Etiqueta",
    estatusPlataforma: "Estatus",
    marca: "Toyota",
    fechaDeReporte: "30/09/2024",
    fechaOcurrido: "30/09/2024",
    claveAgente: "AGT-123456",
    nombreAgente: "Juan Carlos Pérez González",
    tiempoRevisión: "5 días",
    tiempoAsignacion: "5 días",
    causa: "Robo de automóvil",
  },
];

const siniestroSections = [
  [
    { label: "Nombre corto proveedor", value: "[Nombre corto proveedor]" },
    { label: "Tipo de proveedor", value: "[Tipo de proveedor]" },
  ],
  [
    { label: "Nombre de asegurado", value: "María Andrea López Jiménez" },
    { label: "Póliza", value: "POL-1234567890" },
    { label: "Paquete Cobertura", value: "Cobertura Amplia" },
  ],
  [
    { label: "Serie", value: "ABC1234XYZ987654" },
    { label: "Inicio", value: "INC-001" },
    { label: "Endoso", value: "END-001" },
  ],
  [
    { label: "Entidad", value: "Yucatán" },
    { label: "Uso", value: "[Uso]" },
    { label: "Servicio", value: "[Servicio]" },
  ],
  [{ label: "Clave condiciones generales", value: "[Clave condiciones]" }],
];
const first = ref(0);
const rows = ref(10);

const debouncedSearch = debounce(() => {
  filteredData.value = computeFilteredData();
}, 300);

const filteredData = computed(() => {
  if (!searchQuery.value) return data;
  return data.filter((item) =>
    Object.values(item).some((value) =>
      String(value).toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  );
});

watch(searchQuery, debouncedSearch);

const showDetails = ref(false);
const selectedSiniestroId = ref(null);
const checkedId = ref(null);
// Almacena el ID del checkbox que debe estar chequeado
function openDetails(siniestroId) {
  if (selectedSiniestroId.value === siniestroId) {
    showDetails.value = !showDetails.value;
  } else {
    selectedSiniestroId.value = siniestroId;
    showDetails.value = true;
  }
}

const handleCloseDetails = () => {
  showDetails.value = false;
  checkedId.value = null;
};

function verDetalle() {
  try {
    const encryptedId = encryptId(data[selectedSiniestroId.value].siniestro);
    router.push(`/admin/siniestro/${encryptedId}`);
  } catch (error) {
    console.error("Error al navegar:", error.message);
  }
}

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
    font-family: "Montserrat SemiBold", sans-serif;
    font-size: 30px;
    font-weight: 600;
    line-height: 38px;
    text-align: left;
    color: #101828;
  }

  p {
    font-family: "Inter-Regular", sans-serif;
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
    text-align: left;
    color: #475467;
  }
}

.v-text-field input:focus,
.v-text-field i {
  color: #000000;
}

.v-text-field {
  background-color: #ffffff;
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
  background: #0096ae;
  border: 1px solid #0096ae;
  box-shadow: 0px 1px 2px 0px #1018280d;
  font-family: "Inter-SemiBold", sans-serif;
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

.text-subtitle-1 {
  font-family: "Inter Medium", sans-serif;
  font-size: 14px !important;
  font-weight: 500;
  line-height: 20px;
  text-align: left;
  color: #667085;
}
.text-body-2 {
  font-family: "Inter Medium", sans-serif;
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  text-align: left;
  color: #344054;
}
</style>
