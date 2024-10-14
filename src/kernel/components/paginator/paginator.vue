<template>
  <div class="custom-paginator">
    <!-- Botón de página anterior -->
    <v-btn
      class="paginator-button prev"
      :disabled="first === 0"
      @click="prevPage"
      icon
    >
      <v-icon>mdi-chevron-left</v-icon>
    </v-btn>

    <!-- Texto de paginación -->
    <span> Página {{ getCurrentPage() }} de {{ getTotalPages() }} </span>

    <!-- Botón de página siguiente -->
    <v-btn
      class="paginator-button next"
      :disabled="first + rows >= totalRecords"
      @click="nextPage"
      icon
    >
      <v-icon>mdi-chevron-right</v-icon>
    </v-btn>
  </div>
</template>

<script setup>

const props = defineProps({
  totalRecords: Number,
  rows: Number,
  first: Number
});

const emit = defineEmits(['pageChange']);

// Función para obtener la página actual
const getCurrentPage = () => Math.floor(props.first / props.rows) + 1;

// Función para obtener el total de páginas
const getTotalPages = () => Math.ceil(props.totalRecords / props.rows);

// Función para cambiar a la página anterior
const prevPage = () => {
  if (props.first > 0) {
    emit('pageChange', props.first - props.rows);
  }
};

// Función para cambiar a la página siguiente
const nextPage = () => {
  if (props.first + props.rows < props.totalRecords) {
    emit('pageChange', props.first + props.rows);
  }
};
</script>

<style scoped>
.custom-paginator {
  display: flex;
  align-items: center;
  justify-content: center;
}

.paginator-button {
  margin: 0 5px;
}
</style>
