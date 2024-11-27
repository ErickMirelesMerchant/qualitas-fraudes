<template>
  <v-card class="full-width-card" elevation="2">
    <v-card-title>
      <div class="card-header">
        <span class="card-title">{{ title }}</span>
        <v-btn icon variant="text" @click="toggleContent" v-if="buttonShow">
          <v-icon color="black">{{
            isVisible ? "mdi-chevron-up" : "mdi-chevron-down"
          }}</v-icon>
        </v-btn>
      </div>
    </v-card-title>
    <v-card-text v-show="isVisible">
      <slot></slot>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  buttonShow: {
    type: Boolean,
    default: true,
  },
});

const isVisible = ref(true);

const toggleContent = () => {
  isVisible.value = !isVisible.value;
};
</script>

<style scoped>
.full-width-card {
  width: 100%;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.card-title {
  font-size: 16px;
  font-weight: bold;
  color: #182230;
}
</style>
