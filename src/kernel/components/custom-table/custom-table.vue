<template>
  <v-card rounded="">
    <v-card-text>
      <v-row>
        <v-col cols="auto">
          <p class="text-h5">Siniestros</p>
        </v-col>
        <v-col cols="auto">
          <v-chip color="#99CAD7" variant="flat" style="color: #006e80;">{{ tableData.length }} Siniestros</v-chip>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-card-text>
            <v-table>
              <thead>
                <tr>
                  <th v-if="hasCheckbox" id="checkbox-header">
                    <span style="width: fit-content; display: flex;">
                      <v-checkbox v-model="allChecked" @change="toggleAll" />
                    </span>
                  </th>
                  <th v-for="col in columns" :key="col.title" id="header-{{ col.key }}">{{ col.title }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in paginatedData" :key="index">
                  <td v-if="hasCheckbox" id="checkbox-{{ index }}">
                    <v-checkbox v-model="item.checked" @change="updateAllChecked" />
                  </td>
                  <td v-for="col in columns" :key="col.key">
                    <span v-if="col.title === 'Estatus plataforma'">
                      <v-chip :color="item.estadoColor" label>{{ item.estatusPlataforma }}</v-chip>
                    </span>
                    <span v-else>{{ item[col.key] }}</span>
                  </td>
                </tr>
              </tbody>
            </v-table>
          </v-card-text>
        </v-col>
      </v-row>
     
    </v-card-text>
  </v-card>
</template>

<script setup>
import { computed, toRefs, watch } from 'vue';

const props = defineProps({
  columns: {
    type: Array,
    required: true
  },
  data: {
    type: Array,
    required: true
  },
  hasCheckbox: {
    type: Boolean,
    default: false
  },
  first: Number,
  rows: Number
});

// const itemsPerPage = 10;
// const currentPage = ref(1);
const tableData = ref([]);
const allChecked = ref(false);

watch(
  () => props.data,
  (newData) => {
    tableData.value = newData.map(item => ({ ...item, checked: false }));
    allChecked.value = false;
  },
  { immediate: true }
);

// const paginatedData = computed(() => {
//   const start = (currentPage.value - 1) * itemsPerPage;
//   return tableData.value.slice(start, start + itemsPerPage);
// });

// const pageCount = computed(() => {
//   return Math.ceil(tableData.value.length / itemsPerPage);
// });

const { data, first, rows } = toRefs(props);

const paginatedData = computed(() => {
  const start = first.value;
  const end = start + rows.value;
  return tableData.value.slice(start, end);
});

function toggleAll() {
  tableData.value.forEach(item => {
    item.checked = allChecked.value;
  });
}

function updateAllChecked() {
  allChecked.value = tableData.value.every(item => item.checked);
}
</script>

<style scoped>
  .v-data-table-virtual {
    border: 1px solid #ddd;
    border-radius: 8px;
  }

  .v-data-table-col {
    background-color: #f5f5f5;
  }

  .v-data-table-row {
    transition: background-color 0.3s ease;
  }

  .v-data-table-row:hover {
    background-color: #f0f0f0;
  }

  .v-table__wrapper td {
    text-wrap: nowrap;
  }
</style>
