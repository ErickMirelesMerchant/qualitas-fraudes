<template>
  <v-tabs v-model="tab" align-tabs="start" color="#006e80">
    <v-tab
      class="text-subtitle-2"
      v-for="(item, index) in tabsList"
      :key="index"
      :value="index + 1"
    >
      {{ item.title }}
    </v-tab>
  </v-tabs>
</template>

<script setup>
import { ref, defineProps } from "vue";

const tab = ref(null);
const props = defineProps({
  tabsList: {
    type: Array,
    required: true,
    default: () => [],
  },
});
</script>
