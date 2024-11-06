<template>
  <DrawerNavigation title="Notificaciones">
    <v-row>
      <v-col cols="auto">
        <h1 class="mb-5">Notificaciones</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <Timeline :steps="timelineSteps" />
      </v-col>
    </v-row>
  </DrawerNavigation>
</template>

<script setup>
import { ref } from "vue";
import DrawerNavigation from "~/kernel/components/drawer-navigation.vue";
import Timeline from "~/kernel/components/timeline/Timeline.vue";

const timelineSteps = ref([
  { title: "Estatus plataforma", status: true, date: "25/10/2024" },
  { title: "Etiqueta SISE", status: true, date: "26/10/2024" },
  { title: "Alertamiento", status: false, date: "27/10/2024" },
  { title: "Registro Siniestro", status: false, date: "28/10/2024" },
  { title: "Endoso", status: false, date: "29/10/2024" },
]);
</script>
