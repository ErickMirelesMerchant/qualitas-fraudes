<template :id="siniestroId">
  <v-card class="pa-4">
    <v-row align="center">
      <v-col cols="10">
        <v-btn
          variant="outlined"
          size="small"
          rounded="small"
          @click="actionButton"
          color="#D0D5DD"
          width="100%"
        >
          <span class="text-button-custom">
            {{ textButton }}
          </span>
        </v-btn>
      </v-col>
      <v-col cols="2">
        <v-btn
          @click="closeCardDetail"
          variant="plain"
          color="#98A2B3"
          icon="mdi-close"
          width="fit-content"
          height="fit-content"
        ></v-btn>
      </v-col>
    </v-row>

    <v-divider class="my-2"></v-divider>

    <slot name="content"></slot>
  </v-card>
</template>

<script setup>
import { defineEmits, defineProps } from "vue";


const props = defineProps({
  siniestroId: {
    type: Number,
  },
  textButton: {
    type: String,
    required: true,
    default: "Ver detalle de siniestro",
  },
  actionButton: {
    type: Function,
    required: true,
  },
});

const emit = defineEmits(["closeDetails"]);

const closeCardDetail = () => {
  emit("closeDetails", props.siniestroId);
};
</script>

<style scoped>
.v-card {
  border-radius: 12px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.text-button-custom{
  font-weight: bold;
  color: black;
}
</style>
