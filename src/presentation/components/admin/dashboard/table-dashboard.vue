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
                  <td>{{ item.title }}</td>
                  <td>{{ item.icon }}</td>
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
  