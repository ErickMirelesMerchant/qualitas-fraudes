<template>
  <v-card rounded="12">
    <v-card-text style="padding: auto 0">
      <v-row class="pa-1">
        <v-col cols="auto">
          <p class="text-h5">{{ title }}</p>
        </v-col>
        <v-col cols="auto">
          <v-chip
            color="#C2DFE7"
            variant="flat"
            style="color: #006e80; border-radius: 16px"
            :ripple="false"
            >{{ tableData.length }} {{ title }}</v-chip
          >
        </v-col>
        <v-spacer />
        <v-col cols="auto">
          <v-btn prepend-icon="$vuetify" variant="outline"> Configurar </v-btn>
        </v-col>
      </v-row>
      <v-row style="margin-top: 0">
        <v-col cols="12">
          <v-card-text class="card-table">
            <v-table>
              <thead>
                <tr>
                  <th v-if="hasCheckbox" id="checkbox-header">
                    <span style="width: fit-content; display: flex">
                      <v-checkbox
                        v-model="allChecked"
                        @change="toggleAll"
                        hide-details="true"
                      />
                    </span>
                  </th>
                  <th
                    v-for="col in columns"
                    :key="col.key"
                    id="header-{{ col.key }}"
                    @click="col.sortable && sortTable(col.key)"
                    :style="{ cursor: col.sortable ? 'pointer' : 'default' }"
                  >
                    {{ col.title }}
                    <span v-if="col.sortable">
                      <v-icon small>mdi-filter-variant</v-icon>
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in sortedData" :key="index">
                  <td v-if="hasCheckbox" id="checkbox-{{ index }}">
                    <v-checkbox
                      v-model="item.checked"
                      @change="updateAllChecked"
                      hide-details="true"
                    />
                  </td>
                  <td v-for="col in columns" :key="col.key">
                    <span v-if="col.title === 'Score'">
                      <v-chip
                        class="score-chip"
                        prepend-icon="mdi-arrow-down"
                        >{{ item.score }}</v-chip
                      >
                    </span>
                    <span v-else-if="col.title === 'Estatus plataforma'">
                      <v-chip class="status-chip">{{
                        item.estatusPlataforma
                      }}</v-chip>
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
import { computed, toRefs, watch } from "vue";

const props = defineProps({
  columns: {
    type: Array,
    required: true,
  },
  data: {
    type: Array,
    required: true,
  },
  hasCheckbox: {
    type: Boolean,
    default: false,
  },
  first: Number,
  rows: Number,
  title: {
    required: true,
    type: String,
  },
});

const tableData = ref([]);
const allChecked = ref(false);

const sortedBy = ref(null);
const sortDirection = ref("asc");

watch(
  () => props.data,
  (newData) => {
    tableData.value = newData.map((item) => ({ ...item, checked: false }));
    allChecked.value = false;
  },
  { immediate: true }
);

const { first, rows } = toRefs(props);

const paginatedData = computed(() => {
  const start = first.value;
  const end = start + rows.value;
  return tableData.value.slice(start, end);
});

const sortedData = computed(() => {
  if (!sortedBy.value) return paginatedData.value;

  const sortedArray = [...paginatedData.value].sort((a, b) => {
    const sortFactor = sortDirection.value === "asc" ? 1 : -1;
    if (a[sortedBy.value] > b[sortedBy.value]) return sortFactor;
    if (a[sortedBy.value] < b[sortedBy.value]) return -sortFactor;
    return 0;
  });

  return sortedArray;
});

function sortTable(key) {
  if (sortedBy.value === key) {
    sortDirection.value = sortDirection.value === "asc" ? "desc" : "asc";
  } else {
    sortedBy.value = key;
    sortDirection.value = "asc";
  }
}

function toggleAll() {
  tableData.value.forEach((item) => {
    item.checked = allChecked.value;
  });
}

function updateAllChecked() {
  allChecked.value = tableData.value.every((item) => item.checked);
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

.v-table td,
.v-table th {
  text-wrap: nowrap;
}

.text-h5 {
  font-family: "Inter-SemiBold", sans-serif;
  font-size: 18px;
  font-weight: 600;
  line-height: 28px;
  text-align: left;
  color: #101828;
}

.v-row.table-header {
  padding: 20px;
  display: flex;
  justify-content: space-between;
}

.v-input {
  display: flex;
}
.v-table th:first-child,
.v-table td:first-child {
  padding: 0;
}

.v-table th {
  font-family: "Inter-Medium", sans-serif;
  font-size: 12px;
  font-weight: 500;
  line-height: 18px;
  text-align: left;
  color: #475467;
}

.v-table td {
  font-family: "Inter-Regular", sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  text-align: left;
  color: #475467;
}
.v-btn.config-btn {
  width: 129px;
  height: 40px;
  padding: 10px 14px;
  border-radius: 8px !important;
  border: 1px solid #d0d5dd;
  font-family: "Inter-SemiBold", sans-serif;
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  text-align: left;
  margin-left: calc(100% - 129px);
}
.v-col.table-header-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}
.v-card-text.card-table {
  padding: 0 !important;
}
</style>
