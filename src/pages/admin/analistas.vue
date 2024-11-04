<template>
  <DrawerNavigation title="Inicio">
    <v-row>
      <v-col cols="auto">
        <h1 class="mb-5">Analistas</h1>
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
      <v-col cols="12" md="3">
        <customeCardDashboard
          title="Activos"
          icon="mdi-account-check-outline"
          :quantity="9"
        />
      </v-col>
      <v-col cols="12" md="3">
        <customeCardDashboard
          title="Inactivos"
          icon="mdi-account-remove-outline"
          :quantity="2"
        />
      </v-col>
      <v-col cols="12" md="3">
        <customeCardDashboard
          title="En baja"
          icon="mdi-account-minus-outline"
          :quantity="4"
        />
      </v-col>
      <v-col cols="12" md="3">
        <customeCardDashboard
          title="Conectados"
          icon="mdi mdi-account-circle-outline"
          :quantity="9"
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
          title="Analistas"
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
    </v-row>
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

            <v-list lines="one">
  <v-list-item
    v-for="(inactivity, index) in dialogData.inactivities"
    :key="index"
    max-width="100%"
    style="flex-wrap: nowrap;"
  >
    {{ inactivity[0] }} - {{ inactivity[inactivity.length - 1] }}
    <v-chip class="ml-2 mr-16" :class="index < 1 ? 'active-item' : 'inactive-item'">{{ index < 1 ? 'En curso' : 'Programada' }}</v-chip> 
    <v-btn class="px-1" width="fit-content" variant="text" icon="mdi-pencil-outline"></v-btn>
    <v-btn class="px-1" width="fit-content" variant="text" icon="mdi-trash-can-outline"></v-btn>
  </v-list-item>
  <v-divider></v-divider>
</v-list>
          </div>
        </div>
      </template>
    </dialogChanger>
  </DrawerNavigation>
</template>

<script setup>
import * as XLSX from "xlsx";
import customeCardDashboard from "~/kernel/components/cards/custome-card-dashboard.vue";
import customTable from "~/kernel/components/custom-table/custom-table.vue";
import dialogChanger from "~/kernel/components/dialog-changer/dialog-changer.vue";
import DrawerNavigation from "~/kernel/components/drawer-navigation.vue";
import paginator from "~/kernel/components/paginator/paginator.vue";
import customeTabs from "~/kernel/components/tabs/custome-tabs.vue";

const searchQuery = ref("");
const tab = ref(1);

const tabsData = ref([
  { title: "Activos" },
  { title: "Inactivos" },
  { title: "En baja" },
]);

const columns = [
  { title: "ID", key: "id" },
  { title: "Nombre", key: "nombre" },
  { title: "Estatus", key: "estatus" },
  { title: "Capacidad", key: "capacidad" },
  { title: "Fecha de ingreso", key: "fechaDeIngreso" },
  { title: "Última conexión", key: "ultimaConexión" },
  { title: "Tiempo activo", key: "tiempoActivo" },
  { title: "Prox. inactividad", key: "proxInactividad" },
  { title: "Acciones", key: "accionesAnalistas" },
];

const data = [
  {
    id: "0001",
    nombre: "Miguel Angel Contreras Madrigal",
    estatus: "Activo",
    capacidad: "0",
    fechaDeIngreso: "28/05/24",
    ultimaConexión: "dd/mm/aaaa 17:00 hrs",
    tiempoActivo: "8 hrs",
    proxInactividad: "dd/mm/aaaa - dd/mm/aaaa",
    accionesAnalistas: "",
  },
  {
    id: "0002",
    nombre: "Miguel Angel Contreras Madrigal",
    estatus: "Activo",
    capacidad: "1",
    fechaDeIngreso: "28/05/24",
    ultimaConexión: "dd/mm/aaaa 17:00 hrs",
    tiempoActivo: "8 hrs",
    proxInactividad: "No programado",
    accionesAnalistas: "",
  },
  {
    id: "0003",
    nombre: "Miguel Angel Contreras Madrigal",
    estatus: "Activo",
    capacidad: "2",
    fechaDeIngreso: "28/05/24",
    ultimaConexión: "dd/mm/aaaa 17:00 hrs",
    tiempoActivo: "8 hrs",
    proxInactividad: "dd/mm/aaaa - dd/mm/aaaa",
    accionesAnalistas: "",
  },
  {
    id: "0004",
    nombre: "Miguel Angel Contreras Madrigal",
    estatus: "Activo",
    capacidad: "3",
    fechaDeIngreso: "28/05/24",
    ultimaConexión: "dd/mm/aaaa 17:00 hrs",
    tiempoActivo: "8 hrs",
    proxInactividad: "dd/mm/aaaa - dd/mm/aaaa",
    accionesAnalistas: "",
  },
  {
    id: "0005",
    nombre: "Miguel Angel Contreras Madrigal",
    estatus: "Activo",
    capacidad: "4",
    fechaDeIngreso: "28/05/24",
    ultimaConexión: "dd/mm/aaaa 17:00 hrs",
    tiempoActivo: "8 hrs",
    proxInactividad: "dd/mm/aaaa - dd/mm/aaaa",
    accionesAnalistas: "",
  },
  {
    id: "0006",
    nombre: "Miguel Angel Contreras Madrigal",
    estatus: "Activo",
    capacidad: "5",
    fechaDeIngreso: "28/05/24",
    ultimaConexión: "dd/mm/aaaa 17:00 hrs",
    tiempoActivo: "8 hrs",
    proxInactividad: "dd/mm/aaaa - dd/mm/aaaa",
    accionesAnalistas: "",
  },
  {
    id: "0007",
    nombre: "Miguel Angel Contreras Madrigal",
    estatus: "Activo",
    capacidad: "6",
    fechaDeIngreso: "28/05/24",
    ultimaConexión: "dd/mm/aaaa 17:00 hrs",
    tiempoActivo: "8 hrs",
    proxInactividad: "dd/mm/aaaa - dd/mm/aaaa",
    accionesAnalistas: "",
  },
  {
    id: "0008",
    nombre: "Miguel Angel Contreras Madrigal",
    estatus: "Activo",
    capacidad: "7",
    fechaDeIngreso: "28/05/24",
    ultimaConexión: "dd/mm/aaaa 17:00 hrs",
    tiempoActivo: "8 hrs",
    proxInactividad: "dd/mm/aaaa - dd/mm/aaaa",
    accionesAnalistas: "",
  },
  {
    id: "0009",
    nombre: "Miguel Angel Contreras Madrigal",
    estatus: "En baja",
    capacidad: "8",
    fechaDeIngreso: "28/05/24",
    ultimaConexión: "dd/mm/aaaa 17:00 hrs",
    tiempoActivo: "8 hrs",
    proxInactividad: "No programado",
    accionesAnalistas: "",
  },
  {
    id: "0010",
    nombre: "Miguel Angel Contreras Madrigal",
    estatus: "En baja",
    capacidad: "9",
    fechaDeIngreso: "28/05/24",
    ultimaConexión: "dd/mm/aaaa 17:00 hrs",
    tiempoActivo: "8 hrs",
    proxInactividad: "dd/mm/aaaa - dd/mm/aaaa",
    accionesAnalistas: "",
  },
  {
    id: "0011",
    nombre: "Miguel Angel Contreras Madrigal",
    estatus: "Inactivo",
    capacidad: "10",
    fechaDeIngreso: "28/05/24",
    ultimaConexión: "dd/mm/aaaa 17:00 hrs",
    tiempoActivo: "8 hrs",
    proxInactividad: "dd/mm/aaaa - dd/mm/aaaa",
    accionesAnalistas: "",
  },
  {
    id: "0012",
    nombre: "Miguel Angel Contreras Madrigal",
    estatus: "Inactivo",
    capacidad: "11",
    fechaDeIngreso: "28/05/24",
    ultimaConexión: "dd/mm/aaaa 17:00 hrs",
    tiempoActivo: "8 hrs",
    proxInactividad: "dd/mm/aaaa - dd/mm/aaaa",
    accionesAnalistas: "",
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

const dialogVisible = ref(false);
const calendarVisible = ref(false);
const newChanger = ref('1');

let dialogData = {
  img: "",
  title: "",
  label: "",
  description: "",
  items: [],
  inactivities: [],
};

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
];

function openDialog(type) {
  if (type === "status") {
    newChanger.value = "Activo";
    dialogData = {
      icon: "mdi-swap-horizontal",
      title: "Cambio de estatus",
      label: "Estatus",
      description:
        "¿Deseas cambiar el estatus del analista [ID Analista] [Nombre Analista]? Su estatus actual es [Estatus]. ",
      items: ["Activo", "Inactivo", "En baja"],
    };
  } else if (type === "capacity") {
    newChanger.value = "1";
    dialogData = {
      icon: "mdi-pencil-outline",
      title: "Cambio de capacidad",
      label: "Capacidad",
      description:
        "¿Deseas cambiar la capacidad de [ID Analista] [Nombre Analista]? Su capacidad actual es [Capacidad].",
      items: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
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
  dialogVisible.value = false;
}

function openCalendar() {
  calendarVisible.value = true;
}

function handleDateSelected(range) {
  if(range[0] !== '' || range[1] !== ''){
    return dialogData.inactivities.push(range);
  }
  calendarVisible.value = false;
}
</script>
<style scoped>
.active-item {
  color: #067647;
  background-color: #ECFDF3;
height: 22px;
padding: 2px 8px ;
border-radius: 999999px !important;
border: 1px solid #ABEFC6 !important;
}
.inactive-item {
  color: #344054;
  background-color: #F9FAFB;
height: 22px;
padding: 2px 8px ;
border-radius: 999999px !important;
border: 1px solid #EAECF0 !important;
}
</style>