<template>
  <div class="custom-paginator">
    <!-- Botón de página anterior -->
    <v-btn
      class="paginator-button prev"
      variant="outlined"
      :disabled="first === 0"
      @click="prevPage"
      icon
    >
      <v-icon>mdi-chevron-left</v-icon>
    </v-btn>
    <span> Página {{ getCurrentPage() }} de {{ getTotalPages() }} </span>
    <v-btn
      class="paginator-button next"
      variant="outlined"
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
  justify-content: space-between;
  align-items: center;
  width: 100%;
  color: #344054;
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 400;
  padding: 0.75rem 1rem;
  margin: 0 5px;
}

.v-btn.paginator-button {
  display: flex;
  background: white !important;
  cursor: pointer;
  padding: 0.5rem;
  width: fit-content;
  height: fit-content;
  border: 0.0625rem solid #d0d5dd;
  align-items: center;
  justify-content: center;
  border-radius: 8px !important;
  color: #344054 !important;
}

.v-btn.paginator-button[disabled] {
  border-color: #d0d5dd;
  cursor: not-allowed;
}

</style>
