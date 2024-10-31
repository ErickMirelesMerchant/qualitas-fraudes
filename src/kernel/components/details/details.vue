<template :id="siniestroId">
  <v-card class="pa-4">
    <v-btn variant="outlined" style="width: 248px;color: #344054 !important; border-color: #D0D5DD;" rounded="lg" @click="actionButton">
      {{ textButton }}
    </v-btn>
    <v-btn @click="closeCardDetail" variant="plain" color="#98A2B3" icon="mdi-close" width="fit-content" height="fit-content" class="ml-1 pa-2"></v-btn>

    <v-divider class="my-2"></v-divider>

    <slot name="content"></slot>
  </v-card>
</template>

<script setup>
import { defineEmits, defineProps } from 'vue';

const props = defineProps({
  siniestroId: {
    type: String,
  },
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

const emit = defineEmits(['closeDetails']);

const closeCardDetail = () => {
  emit('closeDetails', props.siniestroId);
};
</script>

<style scoped>
.v-card {
  border-radius: 12px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}
</style>
