<template>
    <DrawerNavigation title="Notificaciones">
      <v-row>
        <v-col cols="auto">
          <h1 class="mb-5">Notificaciones</h1>
        </v-col>
        <v-spacer></v-spacer>
        <!--v-col cols="auto">
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
        </v-col-->
      </v-row>
    </DrawerNavigation>
  </template>
  
  <script setup>
  import DrawerNavigation from "~/kernel/components/drawer-navigation.vue";
  
  const searchQuery = ref("");
  const tab = ref(1); // El tab seleccionado, inicializado en "Activos"
  
  // Manejo de tabs y el filtrado de datos
  const tabsData = ref([
    { title: "Activos" },
    { title: "Inactivos" },
    { title: "En baja" },
  ]);
  
  const columns = [
    { title: "ID", key: "id", sortable: true },
    { title: "Nombre", sortable: true, key: "nombre" },
    { title: "Estatus", sortable: true, key: "estatus" },
    { title: "Capacidad", key: "capacidad" },
    { title: "Fecha de ingreso", sortable: true, key: "fechaDeIngreso" },
    { title: "Última conexión", key: "ultimaConexión", sortable: true },
    { title: "Tiempo activo", sortable: true, key: "tiempoActivo" },
    { title: "Prox. inactividad", sortable: true, key: "proxInactividad" },
    { title: "Acciones", key: "acciones" },
  ];
  
  const data = [
    {
      id: "0001",
      nombre: "Miguel Angel Contreras Madrigal",
      estatus: "Activo",
      capacidad: "0",
      fechaDeIngreso: "dd/mm/aaaa 17:00 hrs",
      ultimaConexión: "8 hrs",
      tiempoActivo: "[ID Proveedor]",
      proxInactividad: "dd/mm/aaaa -      dd/mm/aaaa",
      acciones: "28/05/24   8:30:24",
    },
    {
      id: "0002",
      nombre: "Miguel Angel Contreras Madrigal",
      estatus: "Activo",
      capacidad: "1",
      fechaDeIngreso: "dd/mm/aaaa 17:00 hrs",
      ultimaConexión: "8 hrs",
      tiempoActivo: "[ID Proveedor]",
      proxInactividad: "dd/mm/aaaa -      dd/mm/aaaa",
      acciones: "28/05/24   8:30:24",
    },
    {
      id: "0003",
      nombre: "Miguel Angel Contreras Madrigal",
      estatus: "Inactivo",
      capacidad: "10",
      fechaDeIngreso: "dd/mm/aaaa 17:00 hrs",
      ultimaConexión: "8 hrs",
      tiempoActivo: "[ID Proveedor]",
      proxInactividad: "dd/mm/aaaa -      dd/mm/aaaa",
      acciones: "28/05/24   8:30:24",
    },
    {
      id: "0004",
      nombre: "Miguel Angel Contreras Madrigal",
      estatus: "En baja",
      capacidad: "1",
      fechaDeIngreso: "dd/mm/aaaa 17:00 hrs",
      ultimaConexión: "8 hrs",
      tiempoActivo: "[ID Proveedor]",
      proxInactividad: "dd/mm/aaaa -      dd/mm/aaaa",
      acciones: "28/05/24   8:30:24",
    },
  ];
  
  const first = ref(0);
  const rows = ref(10);
  
  // Filtrar los datos basados en el tab seleccionado
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
  </script>
  