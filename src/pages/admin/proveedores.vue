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
          :menuItems="actionItems"
          :showButton="false"
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

      <CustomAlert
        v-if="showAlert"
        :type="'success'"
        :icon="'mdi-check-circle-outline'"
        :icon-close="'mdi-close'"
        :variant="'outlined'"
        :position="'top-right'"
        :show="showAlert"
        :timer="4000"
      >
        <p
          class="text-h4 mb-2"
          style="font-size: 14px !important; color: black !important"
        >
          Vista de tabla configurada correctamente
        </p>
        <p
          class="text-body-1"
          style="font-size: 12px !important; color: #37474f !important"
        >
          Periodo de inactividad registrado. El periodo de inactividad para el
          proveedor ha sido asignado correctamente.
        </p>
      </CustomAlert>

      <dialogChanger
        v-if="dialogVisible"
        :icon="dialogData.icon"
        :title="dialogData.title"
        :description="dialogData.description"
        :isOpen="dialogVisible"
        :calendarVisible="calendarVisible"
        @handleDataChange="handleDataChange"
        @close="dialogVisible = false"
        @update:dateRange="handleDateSelected"
      >
        <template v-slot:content>
          <v-select
            v-if="dialogData.items"
            variant="outlined"
            v-model="newChanger"
            :items="dialogData.items"
            placeholder="Selecciona una opción"
          />
          <div
            v-else
            class="text-center d-flex flex-column align-items-center justify-center ga-3 my-4"
          >
            <v-btn
              variant="text"
              height="48px"
              color="transparent"
              @click="openCalendar"
            >
              <v-img
                center
                src="/assets/icons/add-button.svg"
                alt="add-btn"
                height="48px"
                width="48px"
              ></v-img>
            </v-btn>
            <div v-if="dialogData.inactivities.length === 0">
              No hay inactividad programada
            </div>
            <div v-if="dialogData.inactivities.length !== 0">
              <ul
                v-for="inactivity in dialogData.inactivities"
                :key="inactivity.id"
              >
                <li>
                  {{ inactivity[0] }} - {{ inactivity[inactivity.length - 1] }}
                </li>
              </ul>
            </div>
          </div>
        </template>
      </dialogChanger>
    </v-row>
  </DrawerNavigation>
</template>

<script setup>
import { ref } from "vue";
import * as XLSX from "xlsx";
import customeCardDashboard from "~/kernel/components/cards/custome-card-dashboard.vue";
import customTable from "~/kernel/components/custom-table/custom-table.vue";
import DrawerNavigation from "~/kernel/components/drawer-navigation.vue";
import paginator from "~/kernel/components/paginator/paginator.vue";
import customeTabs from "~/kernel/components/tabs/custome-tabs.vue";
import dialogChanger from "~/kernel/components/dialog-changer/dialog-changer.vue";
import CustomAlert from "~/kernel/components/alerts/CustomAlert.vue";
const searchQuery = ref("");

const showAlert = ref(false);
const dialogVisible = ref(false);
const calendarVisible = ref(false);
const newChanger = ref(null);
let dialogData = {
  img: "",
  title: "",
  label: "",
  description: "",
  items: [],
  inactivities: [],
};

const tabsData = ref([
  { title: "Activos" },
  { title: "Inactivos" },
  { title: "En baja" },
]);
const columns = [
  { title: "Score", key: "score" },
  { title: "Siniestro", sortable: true, key: "siniestro" },
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
  { title: "Acciones", key: "accionesAnalistas" },
];
const data = [
  {
    score: 23,
    siniestro: "04241245475",
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
    score: 23,
    siniestro: "04241245475",
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
    score: 23,
    siniestro: "04241245476",
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
    score: 23,
    siniestro: "04241245473",
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
    score: 23,
    siniestro: "04241245472",
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
    score: 23,
    siniestro: "04241245475",
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
    score: 23,
    siniestro: "04241245475",
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
    score: 23,
    siniestro: "04241245475",
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
    score: 23,
    siniestro: "04241245475",
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
    score: 23,
    siniestro: "04241245475",
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
    score: 23,
    siniestro: "04241245475",
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

const actionItems = [
  {
    icon: "mdi-swap-horizontal",
    title: "Cambiar estatus",
    action: () => openDialog("status"),
  },
  {
    icon: "mdi-pencil-outline",
    title: "Cambiar capacidad",
    action: () => openDialog("capacity"),
  },
  {
    icon: "mdi-weather-sunset",
    title: "Programar inactividad",
    action: () => openDialog("inactivity"),
  },
  {
    icon: "mdi-map-outline",
    title: "Asignar localidad",
    action: () => openDialog("inactivity"),
  },
  {
    icon: "mdi-button-cursor",
    title: "Asignar combo asignación",
    action: () => openDialog("inactivity"),
  },
];

const first = ref(0);
const rows = ref(10);

const filteredData = computed(() => {
  if (!searchQuery.value) {
    return data;
  }
  return data.filter((item) =>
    Object.values(item).some((value) =>
      String(value).toLowerCase().includes(searchQuery.value.toLowerCase())
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

function openDialog(type) {
  if (type === "status") {
    dialogData = {
      icon: "mdi-swap-horizontal",
      title: "Cambio de estatus",
      label: "Estatus",
      description:
        "¿Deseas cambiar el estatus del analista [ID Analista] [Nombre Analista]? Su estatus actual es [Estatus]. ",
      items: ["Activo", "Inactivo", "En baja"],
    };
  } else if (type === "capacity") {
    dialogData = {
      icon: "mdi-pencil-outline",
      title: "Cambio de capacidad",
      label: "Capacidad",
      description:
        "¿Deseas cambiar la capacidad de [ID Analista] [Nombre Analista]? Su capacidad actual es [Capacidad].",
      items: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
    };
  } else if (type === "inactivity") {
    dialogData = {
      icon: "mdi-weather-sunset",
      title: "Programar Inactividad",
      description: "Gestiona y programa los períodos de inactividad. ",
      inactivities: [],
    };
  }

  dialogVisible.value = true;
  calendarVisible.value = false;
  return dialogData;
}

function handleDataChange() {
  console.log("Data changed");
  showAlert.value = true;
  dialogVisible.value = false;
}

function openCalendar() {
  calendarVisible.value = true;
}

function handleDateSelected(range) {
  dialogData.inactivities.push(range);
  calendarVisible.value = false;
}
</script>
