<template>
  <div class="timeline-wrapper">
    <v-timeline
      direction="horizontal"
      truncate-line="both"
      class="custom-timeline"
    >
      <v-timeline-item
        v-for="(step, index) in steps"
        :key="index"
        :dot-color="step.status ? 'primary' : 'grey lighten-1'"
      >
        <template v-slot:icon>
          <v-icon :size="index === 0 ? 'x-small' : 'large'">{{
            step.status && index !== 0 ? "mdi-check-bold" : "mdi-circle"
          }}</v-icon>
        </template>
        <template v-if="index % 2 === 0" v-slot:opposite>
          <v-row>
            <v-col cols="12" class="text-center">
              <span :class="index === 0 ? 'text-title-first' : 'text-title'">{{
                step.title
              }}</span>
              <br />
              <span :class="index === 0 ? 'text-date-first' : 'text-date'">{{
                step.date
              }}</span>
            </v-col>
          </v-row>
        </template>
        <template v-if="index % 2 === 1">
          <v-row>
            <v-col cols="12" class="text-center">
              <span class="text-title">{{ step.title }}</span>
              <br />
              <span class="text-date">{{ step.date }}</span>
            </v-col>
          </v-row>
        </template>
      </v-timeline-item>
    </v-timeline>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  steps: {
    type: Array,
    required: true,
    default: () => [
      { title: "Estatus plataforma", status: true, date: "25/10/2024" },
      { title: "Etiqueta SISE", status: true, date: "26/10/2024" },
      { title: "Alertamiento", status: false, date: "" },
    ],
  },
});
</script>

<style>
.timeline-wrapper {
  overflow-x: auto; 
  white-space: nowrap;
  padding: 1rem;
}
.custom-timeline .v-timeline-divider__before,
.custom-timeline .v-timeline-divider__after {
  background-color: #2d96ae !important;
  height: 2px !important;
}
.text-title {
  font-weight: bold;
}
.text-title-first {
  font-weight: bold;
  color: #2d96ae !important;
}
.text-date {
  font-size: 14px;
  color: #475467;
}
.text-date-first {
  font-size: 14px;
  color: #2d96ae !important;
}
</style>
