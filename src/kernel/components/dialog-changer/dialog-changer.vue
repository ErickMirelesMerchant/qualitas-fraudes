<template>
  <v-dialog v-model="isDialogOpen" persistent max-width="500px" width="100%">
    <v-card class="dialog-box">
      <div class="dialog-image">
        <v-img left :src="`/assets/icons/${image}.svg`" alt="switch-status" height="48" max-width="48"></v-img>
        <v-img src="/assets/icons/dialog-background.svg" alt="Dialog-bg" class="dialog-bg-icon"
          max-height="auto"></v-img>
      </div>

      <v-card-text class="text-left px-0 py-4">
        <v-card-title>{{ title }}</v-card-title>
        <p class="pb-4">{{ description }}</p>
        <slot name="content" class="w-100 ma-4"></slot>

        <!-- Diálogo del calendario -->
        <v-dialog v-if="calendarVisible" v-model="calendarVisible" max-width="330">
          <v-card>
            <v-date-picker v-model="dateRange" mode="range" multiple="range" hide-header></v-date-picker>
            <v-card-actions>
              <v-btn text @click="closeCalendar">Cancelar</v-btn>
              <v-btn text @click="confirmDate">Confirmar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-card-text>

      <v-card-actions class="justify-space-around">
        <v-btn class="secondary-btn" text @click="closeDialog">Cancelar</v-btn>
        <v-btn class="primary-btn" @click="confirm">{{ title.includes('Inactividad') ? 'Guardar' : 'Confirmar' }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { defineEmits, defineProps, ref, watch } from 'vue';

const props = defineProps({
  image: String,
  title: String,
  description: String,
  isOpen: Boolean,
  calendarVisible: Boolean,
});

const emit = defineEmits(['confirm', 'close', 'update:dateRange']);
const isDialogOpen = ref(props.isOpen);
const calendarVisible = ref(props.calendarVisible);
const dateRange = ref([null, null]);

// Sincronización de `isOpen`
watch(() => props.isOpen, (newVal) => {
  isDialogOpen.value = newVal;
});

// Sincronización de `calendarVisible`
watch(() => props.calendarVisible, (newVal) => {
  calendarVisible.value = newVal;
});

// Cerrar diálogos
function closeDialog() {
  isDialogOpen.value = false;
  emit('close');
}

function closeCalendar() {
  calendarVisible.value = false;
  emit("update:calendarVisible", false);
}

// Confirmar selección de fecha
function confirmDate() {
  emit('update:dateRange', dateRange.value); // Emitimos el rango seleccionado al componente padre
  closeCalendar();
}

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

/* .dialog-body h3 {
  margin: 0;
} */

/* .dialog-box img {
  float: left;
} */

/* .dialog-text {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  margin-bottom: 1rem;
}

.dialog-box h3 {
  font-family: 'Inter SemiBold', sans-serif;
  font-size: 18px;
  font-weight: 600;
  line-height: 28px;
  text-align: left;
  color: #101828;
  position: relative;
} */

/* .dialog-box p {
  font-family: 'Inter Regular', sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  text-align: left;
  color: #475467;
  margin: 0;
}

.dialog-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  gap: 6px;
} */

/* .dialog-buttons button {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  width: 270px;
  height: 44px;
  padding: 10px 16px;
  border-radius: 8px;
  font-family: 'Inter SemiBold', sans-serif;
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
  text-align: center;
}

.dialog-buttons .primary-btn {
  background-color: #0096AE;
  color: white;
  border: none;
  box-shadow: 0px 1px 2px 0px #1018280D;
}

.dialog-buttons .primary-btn:hover {
  background-color: #017182;
} */
</style>
