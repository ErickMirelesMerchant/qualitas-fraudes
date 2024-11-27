<template>
  <CustomCardShowHide title="Línea del tiempo: Siniestro" :buttonShow="false">
    <v-row>
      <v-col cols="12">
        <span style="color: #475447"
          >Selecciona 2 hitos para ver el tiempo transcurrido entre ellos.
        </span>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <Timeline :steps="timelineData" />
      </v-col>
    </v-row>
  </CustomCardShowHide>
  
</template>

<script setup>
import { defineProps } from "vue";
import Timeline from "~/kernel/components/timeline/Timeline.vue";
import CustomCardShowHide from "~/kernel/components/cards/CustomCardShowHide.vue";

const props = defineProps({
  timelineData: {
    type: Array,
    required: true,
  },
});
</script>
