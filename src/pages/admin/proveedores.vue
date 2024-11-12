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
        <customeTabs :tabsList="tabsData" v-model="tab" />
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <customTable
          title="Proveedores"
          :columns="columns"
          :data="filteredData"
          :has-checkbox="true"
          :first="first"
          :rows="rows"
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
        :timer="1000"
        :show="showAlert"
        @update:show="setShowAlert"
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
            v-else-if="dialogData.itemsCheckbox"
            :style="isScrollActive ? 'max-height: 360px; overflow-y: auto' : ''"
          >
            <div
              v-for="(localidad, index) in dialogData.itemsCheckbox"
              :key="index"
              class="d-flex align-items-center"
              style="padding: 4px 0; margin-bottom: -48px"
            >
              <v-checkbox
                v-model="selectedLocalidades"
                :label="localidad"
                :value="localidad"
              />
            </div>
          </div>

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
            <div v-if="dialogData.inactivities.length !== 0">
            <v-list lines="one">
              <v-list-item v-for="(inactivity, index) in dialogData.inactivities" :key="index" max-width="100%"
                style="flex-wrap: nowrap;">
                <span class="mr-10 w-75">
                  {{ inactivity[0] }} - {{ inactivity[inactivity.length - 1] }}
                  <v-chip class="ml-2" :class="index < 1 ? 'active-item' : 'inactive-item'">{{ index < 1 ? 'En curso'
                    : 'Programada' }}</v-chip>
                </span>
                <span class="w-25">
                  <v-btn class="px-1 " width="fit-content" variant="text" icon="mdi-pencil-outline"
                    @click="editInactivity(index)"></v-btn>
                  <v-btn class="px-1 " width="fit-content" variant="text" icon="mdi-trash-can-outline"
                    @click="deleteInactivity(index)"></v-btn>
                </span>
                <v-divider></v-divider>
              </v-list-item>
            </v-list>
          </div>
          <div v-else class="text-center">
            No hay inactividad programada
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
import CustomAlert from "~/kernel/components/alerts/CustomAlert.vue";
import customeCardDashboard from "~/kernel/components/cards/custome-card-dashboard.vue";
import customTable from "~/kernel/components/custom-table/CustomTable.vue";
import dialogChanger from "~/kernel/components/dialog-changer/dialog-changer.vue";
import DrawerNavigation from "~/kernel/components/drawer-navigation.vue";
import paginator from "~/kernel/components/paginator/paginator.vue";
import customeTabs from "~/kernel/components/tabs/custome-tabs.vue";
import { comboAsignacion } from "~/kernel/utils/ComboAsignacion";
import { localidadesMexico } from "~/kernel/utils/LocalidadesMexico";
const searchQuery = ref("");

const showAlert = ref(false);
const dialogVisible = ref(false);
const calendarVisible = ref(false);
const newChanger = ref("1");
const selectedLocalidades = ref([]);
const tab = ref(1);
const isScrollActive = ref(false);
const editRanges = ref(false);
let editID = ref('');

const dialogData = ref({
  img: "",
  title: "",
  label: "",
  description: "",
  items: [],
  inactivities: [],
});

const tabsData = ref([
  { title: "Activos" },
  { title: "Inactivos" },
  { title: "En baja" },
]);


const columns = [
  { title: "ID", key: "id" },
  { title: "Nombre corto", key: "nombreCorto" },
  { title: "Nombre largo", key: "nombreLargo" },
  { title: "Tipo", key: "tipo" },
  { title: "Estatus", key: "estatus" },
  { title: "Capacidad", key: "capacidad" },
  { title: "Casos asignados", key: "casosAsignados" },
  { title: "Fecha de ingreso", key: "fechaDeIngreso" },
  { title: "Última conexión", key: "ultimaConexion" },
  { title: "Tiempo activo", key: "tiempoActivo" },
  { title: "Acciones", key: "acciones" },
];

const data = [
  {
    id: "0001",
    nombreCorto: "[Nombre_corto]",
    nombreLargo: "[Nombre_largo]",
    tipo: "Investigador",
    estatus: "Activo",
    capacidad: 0,
    casosAsignados: 2,
    fechaDeIngreso: "28/05/24",
    ultimaConexion: "dd/mm/aaaa",
    tiempoActivo: "8 hrs",
    acciones: ""
  },
  {
    id: "0002",
    nombreCorto: "[Nombre_corto]",
    nombreLargo: "[Nombre_largo]",
    tipo: "Perito",
    estatus: "Activo",
    capacidad: 1,
    casosAsignados: 2,
    fechaDeIngreso: "28/05/24",
    ultimaConexion: "dd/mm/aaaa",
    tiempoActivo: "8 hrs",
    acciones: ""
  },
  {
    id: "0003",
    nombreCorto: "[Nombre_corto]",
    nombreLargo: "[Nombre_largo]",
    tipo: "Investigador",
    estatus: "Activo",
    capacidad: 2,
    casosAsignados: 2,
    fechaDeIngreso: "28/05/24",
    ultimaConexion: "dd/mm/aaaa",
    tiempoActivo: "8 hrs",
    acciones: ""
  },
  {
    id: "0004",
    nombreCorto: "[Nombre_corto]",
    nombreLargo: "[Nombre_largo]",
    tipo: "Investigador",
    estatus: "Activo",
    capacidad: 3,
    casosAsignados: 2,
    fechaDeIngreso: "28/05/24",
    ultimaConexion: "dd/mm/aaaa",
    tiempoActivo: "8 hrs",
    acciones: ""
  },
  {
    id: "0005",
    nombreCorto: "[Nombre_corto]",
    nombreLargo: "[Nombre_largo]",
    tipo: "Investigador",
    estatus: "Activo",
    capacidad: 4,
    casosAsignados: 2,
    fechaDeIngreso: "28/05/24",
    ultimaConexion: "dd/mm/aaaa",
    tiempoActivo: "8 hrs",
    acciones: ""
  },
  {
    id: "0006",
    nombreCorto: "[Nombre_corto]",
    nombreLargo: "[Nombre_largo]",
    tipo: "Investigador",
    estatus: "Activo",
    capacidad: 5,
    casosAsignados: 2,
    fechaDeIngreso: "28/05/24",
    ultimaConexion: "dd/mm/aaaa",
    tiempoActivo: "8 hrs",
    acciones: ""
  },
  {
    id: "0007",
    nombreCorto: "[Nombre_corto]",
    nombreLargo: "[Nombre_largo]",
    tipo: "Investigador",
    estatus: "Activo",
    capacidad: 6,
    casosAsignados: 2,
    fechaDeIngreso: "28/05/24",
    ultimaConexion: "dd/mm/aaaa",
    tiempoActivo: "8 hrs",
    acciones: ""
  },
  {
    id: "0008",
    nombreCorto: "[Nombre_corto]",
    nombreLargo: "[Nombre_largo]",
    tipo: "Investigador",
    estatus: "Activo",
    capacidad: 7,
    casosAsignados: 2,
    fechaDeIngreso: "28/05/24",
    ultimaConexion: "dd/mm/aaaa",
    tiempoActivo: "8 hrs",
    acciones: ""
  },
  {
    id: "0009",
    nombreCorto: "[Nombre_corto]",
    nombreLargo: "[Nombre_largo]",
    tipo: "Investigador",
    estatus: "Activo",
    capacidad: 8,
    casosAsignados: 2,
    fechaDeIngreso: "28/05/24",
    ultimaConexion: "dd/mm/aaaa",
    tiempoActivo: "8 hrs",
    acciones: ""
  },
  {
    id: "0010",
    nombreCorto: "[Nombre_corto]",
    nombreLargo: "[Nombre_largo]",
    tipo: "Investigador",
    estatus: "Activo",
    capacidad: 9,
    casosAsignados: 2,
    fechaDeIngreso: "28/05/24",
    ultimaConexion: "dd/mm/aaaa",
    tiempoActivo: "8 hrs",
    acciones: ""
  },
  // Agrega más objetos según las filas en tu tabla
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
    action: () => openDialog("assignLocality"),
  },
  {
    icon: "mdi-button-cursor",
    title: "Asignar combo asignación",
    action: () => openDialog("comboAssignment"),
  },
];

const first = ref(0);
const rows = ref(10);

const filteredData = computed(() => {
  let filtered = data;

  if (tab.value === 1) {
    filtered = data.filter((item) => item.estatus === "Activo");
  } else if (tab.value === 2) {
    filtered = data.filter((item) => item.estatus === "Inactivo");
  } else if (tab.value === 3) {
    filtered = data.filter((item) => item.estatus === "En baja");
  }

  if (searchQuery.value) {
    filtered = filtered.filter((item) =>
      Object.values(item).some((value) =>
        String(value).toLowerCase().includes(searchQuery.value.toLowerCase())
      )
    );
  }

  return filtered;
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
  switch (type) {
    case "status":
      newChanger.value = "Activo";
      dialogData.value = {
        icon: "mdi-swap-horizontal",
        title: "Cambio de estatus",
        label: "Estatus",
        description:
          "¿Deseas cambiar el estatus del analista [ID Analista] [Nombre Analista]? Su estatus actual es [Estatus].",
        items: ["Activo", "Inactivo", "En baja"],
      };
      break;

    case "capacity":
      newChanger.value = "1";
      dialogData.value = {
        icon: "mdi-pencil-outline",
        title: "Cambio de capacidad",
        label: "Capacidad",
        description:
          "¿Deseas cambiar la capacidad de [ID Analista] [Nombre Analista]? Su capacidad actual es [Capacidad].",
        items: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
      };
      break;

    case "inactivity":
      dialogData.value = {
        icon: "mdi-weather-sunset",
        title: "Programar Inactividad",
        description: "Gestiona y programa los períodos de inactividad.",
        inactivities: [],
      };
      break;

    case "assignLocality":
      isScrollActive.value = true;
      dialogData.value = {
        icon: "mdi-map-outline",
        title: "Asignar localidad",
        description: "Asigna una o varias localidades al Proveedor",
        itemsCheckbox: localidadesMexico,
      };
      break;

    case "comboAssignment":
      isScrollActive.value = false;
      dialogData.value = {
        icon: "mdi-button-cursor",
        title: "Asignar combo asignación",
        description: "",
        itemsCheckbox: comboAsignacion,
      };
      break;

    default:
      console.error("Tipo no reconocido:", type);
  }

  dialogVisible.value = true;
  calendarVisible.value = false;
  return dialogData;
}

function setShowAlert(value) {
  showAlert.value = value;
}

function handleDataChange() {
  console.log("Data changed");

  dialogVisible.value = false;
  setShowAlert(true);
}

function openCalendar() {
  calendarVisible.value = true;
}
function handleDateSelected(range) {
  if (range[0] !== null || range[1] !== null) {
    if (editRanges.value) {
      dialogData.value.inactivities.splice(editID.value, 1, range);
      editRanges.value = false;
    } else {
      dialogData.value.inactivities.push(range);
    }
  }
  calendarVisible.value = false;
}

function editInactivity(id) {
  openCalendar();
  editID.value = id;
  editRanges.value = true;
}

function deleteInactivity(id) {
  dialogData.value.inactivities.splice(id, 1);
}
</script>
<style scoped>
.active-item {
  color: #067647;
  background-color: #ECFDF3;
  height: 22px;
  padding: 2px 8px;
  border-radius: 999999px !important;
  border: 1px solid #ABEFC6 !important;
}

.inactive-item {
  color: #344054;
  background-color: #F9FAFB;
  height: 22px;
  padding: 2px 8px;
  border-radius: 999999px !important;
  border: 1px solid #EAECF0 !important;
}
</style>