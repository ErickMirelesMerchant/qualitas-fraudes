<template>
  <v-alert
    v-show="visible"
    :type="type"
    :variant="variant"
    :elevation="0"
    :class="positionClass"
    dismissible
    style="
      background-color: white !important;
      max-width: 500px;
      margin: 16px;
      border-radius: 8px;
    "
  >
    <template #prepend>
      <div class="icon-container">
        <div :class="['outer-circle', borderColorClass, 'pulse']">
          <div :class="['inner-circle', borderColorClass, 'pulse']">
            <v-icon size="small" :class="iconColorClass">{{ icon }}</v-icon>
          </div>
        </div>
      </div>
    </template>
    <v-row>
      <v-col cols="9" md="10">
        <slot></slot>
      </v-col>
      <v-col cols="3" md="2">
        <v-icon>
          <v-icon style="cursor: pointer;" size="x-small" @click="closeAlert">mdi-close</v-icon>
        </v-icon>
      </v-col>
    </v-row>
  </v-alert>
</template>

<script setup>
import { ref, onMounted, watch, computed } from "vue";

const props = defineProps({
  type: {
    type: String,
    default: "info",
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
  variant: {
    type: String,
    default: "outlined",
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
    default: 0,
  },
});

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

const borderColorClass = computed(() => {
  return {
    success: "border-success",
    warning: "border-warning",
    error: "border-error",
    info: "border-info",
  }[props.type];
});

const iconColorClass = computed(() => {
  return {
    success: "icon-success",
    warning: "icon-warning",
    error: "icon-error",
    info: "icon-info",
  }[props.type];
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

.icon-container {
  position: relative;
  width: 32px;
  height: 32px;
  margin-right: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.outer-circle,
.inner-circle {
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.outer-circle {
  width: 32px;
  height: 32px;
  border: 2.5px solid;
}

.inner-circle {
  width: 24px;
  height: 24px;
  border: 1.5px solid;
}

.alert-icon {
  font-size: 16px;
}

.border-success {
  border-color: green;
}
.border-warning {
  border-color: orange;
}
.border-error {
  border-color: red;
}
.border-info {
  border-color: #2896f3;
}
.v-alert .v-alert__dismissible .v-btn__content .v-icon {
  font-size: 14px !important;
  color: grey !important;
}
.icon-success {
  color: green;
}
.icon-warning {
  color: orange;
}
.icon-error {
  color: red;
}
.icon-info {
  color: #2896f3;
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}

.pulse {
  animation: pulse 1.5s infinite ease-in-out;
}
</style>
