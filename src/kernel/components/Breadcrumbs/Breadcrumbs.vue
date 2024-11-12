<template>
    <v-row align="center" dense class="breadcrumbs">
      <v-col
        v-for="(breadcrumb, index) in breadcrumbs"
        :key="index"
        cols="auto"
        class="breadcrumb-item"
      >
        <v-btn
          v-if="breadcrumb.path && index < breadcrumbs.length - 1"
          variant="text"
          :to="breadcrumb.path"
          class="breadcrumb-link"
          style="padding: 0 4px;"
        >
          {{ breadcrumb.name }}
        </v-btn>
        <span v-if="index < breadcrumbs.length - 1" class="breadcrumb-separator">
          >
        </span>
        <span v-else class="breadcrumb-current">
          {{ breadcrumb.name }}
        </span>
      </v-col>
    </v-row>
  </template>
  
  <script setup>
  const props = defineProps({
    breadcrumbs: {
      type: Array,
      required: true,
      default: () => [],
    },
  });
  </script>
  
  <style scoped>
  .breadcrumbs {
    gap: 4px; /* Reduce el espacio entre columnas */
    padding: 4px 8px; /* Reduce el relleno global */
  }
  
  .breadcrumb-item {
    display: flex;
    align-items: center;
    gap: 2px; /* Reduce el espacio entre los elementos dentro de cada columna */
  }
  
  .breadcrumb-link {
    color: var(--Colors-Text-text-secondary_hover, #182230);
    font-size: 14px;
    padding: 0 4px; /* Ajusta el espacio interno del botón */
    border-radius: 4px;
    min-width: unset; /* Asegura que los botones no tengan un ancho mínimo */
  }
  
  .breadcrumb-link:hover {
    text-decoration: underline;
    text-decoration-color: #0096AE;
    color: #0096AE;
  }
  
  .breadcrumb-separator {
    color: #D0D5DD;
    font-size: 12px;
  }
  
  .breadcrumb-current {
    color: var(--Colors-Text-text-secondary_hover, #182230);
    font-size: 14px;
    font-weight: bold;
  }
  </style>
  