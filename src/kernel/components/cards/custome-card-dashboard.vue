<template>
  <v-card style="border-radius: 16px;" elevation="1">
    <v-card-title>
      <v-row>
        <v-col cols="3" sm="1" md="3" lg="2">
          <div class="icon-wrapper">
            <v-icon size="md">{{ props.icon }}</v-icon>
          </div>
        </v-col>
        <v-col cols="9" sm="11" md="9" lg="10">
          <span class="text-subtitle-1 title">{{ props.title }}</span>
        </v-col>
      </v-row>
    </v-card-title>
    <v-card-text>
      <p class="text-h3">{{ quantity }}</p>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { ref, defineProps } from "vue";

//const drawer = ref(true);
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: false,
    default: 50,
  },
});
</script>

<style scoped>
.title {
  font-size: 14 !important;
  color: var(--colors-text-text-tertiary-600, #475467);
  white-space: normal;
  word-wrap: break-word;
}
.icon-wrapper {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
</style>
