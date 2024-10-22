<template>
  <v-alert
    v-show="visible"
    :type="variant"
    :border="isOutline ? 'right' : false"
    :colored-border="isOutline"
    :elevation="0"
    :icon="icon"
    :class="positionClass"
    dismissible
    @click:close="closeAlert"
  >
    <slot></slot>
    <v-icon v-if="iconClose" @click="closeAlert">{{ iconClose }}</v-icon>
  </v-alert>
</template>

<script setup>
import { ref, onMounted, watch, computed } from "vue";

// Props recibidas desde el componente
const props = defineProps({
  variant: {
    type: String,
    default: "info", // Por defecto tipo info
    validator: (value) =>
      ["info", "warning", "error", "success"].includes(value),
  },
  icon: {
    type: String,
    default: "mdi-alert-circle",
  },
  iconClose: {
    type: String,
    default: "mdi-close",
  },
  isOutline: {
    type: Boolean,
    default: true,
  },
  position: {
    type: String,
    default: "top",
    validator: (value) =>
      [
        "top",
        "top-right",
        "top-left",
        "center",
        "center-left",
        "center-right",
        "bottom",
        "bottom-left",
        "bottom-right",
      ].includes(value),
  },
  show: {
    type: Boolean,
    default: true,
  },
  timer: {
    type: Number,
    default: 0, // Tiempo en ms. Si es 0 no se oculta automáticamente
  },
});

// Manejo del estado visible de la alerta
const visible = ref(props.show);

const positionClass = computed(() => {
  return {
    top: "fixed top-0 left-1/2 transform -translate-x-1/2",
    "top-right": "fixed top-0 right-0",
    "top-left": "fixed top-0 left-0",
    center:
      "fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2",
    "center-right": "fixed top-1/2 right-0 transform -translate-y-1/2",
    "center-left": "fixed top-1/2 left-0 transform -translate-y-1/2",
    bottom: "fixed bottom-0 left-1/2 transform -translate-x-1/2",
    "bottom-right": "fixed bottom-0 right-0",
    "bottom-left": "fixed bottom-0 left-0",
  }[props.position];
});

const closeAlert = () => {
  visible.value = false;
};

onMounted(() => {
  if (props.timer > 0) {
    setTimeout(() => {
      closeAlert();
    }, props.timer);
  }
});

watch(
  () => props.show,
  (newVal) => {
    visible.value = newVal;
  }
);
</script>

<style scoped>
.fixed {
  z-index: 2000;
  position: fixed;
  padding: 1rem;
}
</style>
