<template>
  <v-card>
    <v-card-text>
      <v-row>
        <v-col cols="auto">
          <p class="text-h5">Analistas</p>
        </v-col>
        <v-col cols="auto">
          <v-chip color="#99CAD7" variant="flat" style="color: #006e80">
            {{ items.length }} {{ type }}
          </v-chip>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-table>
            <thead>
              <tr>
                <th v-for="head in heads" :key="head.title">
                  {{ head.title }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in items" :key="item.title">
                <td>{{ item.score }}</td>
                <td>{{ item.siniestro }}</td>
                <td>{{ item.reporte }}</td>
                <td>{{ item.analista }}</td>
                <td>{{ item.reglas }}</td>
                <td>{{ item.idProveedor }}</td>
                <td>{{ item.fechaAsignacionAnalista }}</td>
                <td>{{ item.fechaAsignacionProveedor }}</td>
                <td>{{ item.oficinaEmision }}</td>
                <td>{{ item.gerenteCuenta }}</td>
                <td>{{ item.etiquetaSSE }}</td>
                <td>{{ item.estatusPlataforma }}</td>
                <td>{{ item.marca }}</td>
                <td>{{ item.fechaReporte }}</td>
                <td>{{ item.fechaOcurrido }}</td>
                <td>{{ item.claveAgente }}</td>
                <td>{{ item.nombreAgente }}</td>
                <td>{{ item.tiempoRevision }}</td>
                <td>{{ item.tiempoAsignacion }}</td>
                <td>{{ item.causa }}</td>
              </tr>
            </tbody>
          </v-table>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
  heads: {
    type: Array,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
});
</script>
