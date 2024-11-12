<template>
  <v-dialog v-model="isDialogOpen" max-width="500px" width="100%" style="overflow: hidden; min-height: 340px;" persistent>
    <v-card class="dialog-box" width="100%" height="100%">
      <div class="dialog-image">
        <v-icon class="icon-wrapper">
          {{ icon }}
        </v-icon>
        <v-img
          src="/assets/icons/dialog-background.svg"
          alt="Dialog-bg"
          class="dialog-bg-icon"
          max-height="auto"
        ></v-img>
      </div>
      <v-card-text class="text-left px-0 py-2">
        <v-card-title class="px-0 pb-1" style="position: relative; z-index: 100;">
          <span>{{ title }}</span>
        </v-card-title>
        <p>{{ description }}</p>
        <slot name="content" class="w-100 ma-4"></slot>

        <!-- Diálogo del calendario -->
        <v-dialog
          v-if="calendarVisible"
          v-model="calendarVisible"
          max-width="330"
        >
          <v-card>
            
            <v-date-picker
              v-model="dateRange"
              multiple="range"
              hide-header
              :show-adjacent-months="true"
              color="#0096AE"
            ></v-date-picker>
            <v-card-actions>
              <!-- <v-text-field
                v-model="manualDate"
                label="Fecha (dd/mm/aaaa)"
                placeholder="dd/mm/aaaa"
                class="mr-4"
                dense
                outlined
                @input="updateDateRange"
              ></v-text-field> -->
              <v-btn tonal base-color="#667085" @click="closeCalendar">Cancelar</v-btn>
              <v-btn tonal base-color="#0096AE" @click="confirmDate">Programar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-card-text>

      <v-card-actions class="justify-space-around py-0">
        <v-row>
          <v-col cols="12" md="6" class="py-0">
            <v-btn width="100%" class="secondary-btn" text @click="closeDialog"
              >Cancelar</v-btn
            >
          </v-col>
          <v-col cols="12" md="6" class="py-0">
            <v-btn
              class="primary-btn"
              @click="$emit('handleDataChange')"
              width="100%"
              >{{
                title.includes("Inactividad") ? "Guardar" : "Confirmar"
              }}</v-btn
            >
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { defineEmits, defineProps, ref, watch } from "vue";

const props = defineProps({
  icon: String,
  title: String,
  description: String,
  isOpen: Boolean,
  calendarVisible: Boolean,
});

const emit = defineEmits([
  "close",
  "update:dateRange",
  "handleDataChange",
]);
const isDialogOpen = ref(props.isOpen);
const calendarVisible = ref(props.calendarVisible);
const dateRange = ref(null);
// const manualDate = ref(''); // Campo de texto manual

watch(
  () => props.isOpen,
  (newVal) => {
    isDialogOpen.value = newVal;
  }
);

watch(
  () => props.calendarVisible,
  (newVal) => {
    calendarVisible.value = newVal;
  }
);

watch(
  () => props.calendarVisible,
  (newVal) => {
    calendarVisible.value = newVal;
  }
);
function closeDialog() {
  isDialogOpen.value = false;
  emit("close");
}

function closeCalendar() {
  dateRange.value = null;
  emit("update:dateRange", [null, null]);
  // emit("update:dateRange", ['', '']);
}

function confirmDate() {
  const formattedRange = dateRange.value.map(formatDate);
  emit("update:dateRange", formattedRange);
  closeCalendar();
  dateRange.value = null;
}

function formatDate(date) {
  return date
    ? new Date(date).toLocaleDateString("es-ES", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
    : "";
}

// function updateDateRange() {
//   // Convertir manualDate al formato de Date y actualizar dateRange si es válido
//   const [day, month, year] = manualDate.value.split('/');
//   const parsedDate = new Date(`${year}-${month}-${day}`);
//   if (!isNaN(parsedDate)) {
//     dateRange.value = [parsedDate];
//   }
// }
</script>

<style scoped>
.v-card-title {
  font-weight: bold;
  font-size: 20px;
}

.dialog-box {
  background-color: white;
  padding: 1.5rem;
  border-radius: 10px !important;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  text-align: center;
  width: 100%;
}

.dialog-image {
  display: flex;
  position: relative;
}

.v-card-text.dialog-body {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 1rem;
  gap: 1rem;
  text-align: start;
}

.dialog-image img:first-child,
.dialog-image .v-img:first-child {
  position: relative;
  left: -4px;
  top: -4px;
  height: 48px;
}

.dialog-bg-icon {
  width: 12rem;
  max-height: fit-content;
  position: absolute;
  top: -22px;
  left: -22px;
}

.dialog-body {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 1rem;
  gap: 1rem;
}

.icon-wrapper {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  border-radius: 8px;
  width: 40px;
  height: 40px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
</style>