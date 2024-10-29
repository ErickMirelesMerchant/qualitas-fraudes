<template>
  <v-card class="pa-4">
    <v-btn variant="outlined" class="mb-4" @click="actionButton">
      {{ textButton }}
    </v-btn>

    <v-divider class="my-2"></v-divider>

    <slot name="content"></slot>
  </v-card>
</template>

<script setup>
defineProps({
  textButton: {
    type: String,
    required: true,
    default: 'Ver detalle de siniestro'
  },
  actionButton: {
    type: Function,
    required: true,
  }
});
</script>

<style scoped>
.v-card {
  border-radius: 12px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}
</style>
