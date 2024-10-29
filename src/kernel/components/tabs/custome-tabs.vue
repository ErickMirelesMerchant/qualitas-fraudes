<template>
  <v-tabs v-if="isMounted" v-model="internalTab" align-tabs="start" color="#006e80">
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
import { ref, defineProps, watch, onMounted } from "vue";

const props = defineProps({
  tabsList: {
    type: Array,
    required: true,
    default: () => [],
  },
  modelValue: {
    type: Number,
    default: 1,
  },
});

const internalTab = ref(props.modelValue);
const isMounted = ref(false); 
const emit = defineEmits(["update:modelValue"]);

onMounted(() => {
  isMounted.value = true;
});

watch(internalTab, (newValue) => {
  emit("update:modelValue", newValue);
});
watch(
  () => props.modelValue,
  (newValue) => {
    internalTab.value = newValue;
  }
);
</script>
