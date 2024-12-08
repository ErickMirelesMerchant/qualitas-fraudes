<template>
  <v-row>
    <v-col cols="12">
      <CustomCardShowHide title="Bitácora" :button-show="false">
        <v-row class="mt-2">
          <v-col cols="12">
            <customTable
              title=""
              :columns="columnsContent"
              :data="dataContent"
              :has-checkbox="false"
              :first="first"
              :rows="rows"
              :showButton="false"
              :showTitle="false"
            />
            <paginator
              :totalRecords="dataContent.length"
              :rows="rows"
              :first="first"
              @pageChange="updatePage"
            />
          </v-col>
        </v-row>
      </CustomCardShowHide>
    </v-col>
  </v-row>
</template>

<script setup>
import { ref } from "vue";
import CustomCardShowHide from "~/kernel/components/cards/CustomCardShowHide.vue";
import customTable from "~/kernel/components/custom-table/CustomTable.vue";
import paginator from "~/kernel/components/paginator/paginator.vue";

const first = ref(0);
const rows = ref(10);

const columnsContent = [
  { title: "Fecha comentario", key: "fechaComentario" },
  { title: "Usuario", key: "usuario" },
  { title: "Responsable siguiente", key: "responsableSiguiente" },
  { title: "Tipo", key: "tipo" },
  { title: "Detalle", key: "detalle" },
  { title: "Acciones", key: "verDocumento" },
];

const dataContent = [
  {
    fechaComentario: "dd/mm/aaa 00:00 hrs",
    usuario: "Proveedor 01",
    responsableSiguiente: "Proveedor 01",
    tipo: "Carga documento",
    detalle: "Se obtiene desistimiento del asegurado",
    acciones: "",
    url: ""
  },
  {
    fechaComentario: "dd/mm/aaa 00:00 hrs",
    usuario: "Analista 02",
    responsableSiguiente: "Analista 02",
    tipo: "Comentario",
    detalle: "No se visualiza correctamente el documento, adjuntarlo nuevamente",
    acciones: "",
    url: ""
  },
  {
    fechaComentario: "dd/mm/aaa 00:00 hrs",
    usuario: "Analista 02",
    responsableSiguiente: "Analista 02",
    tipo: "Solicitud documento",
    detalle: "Se requiere carta 69, favor de generarla.",
    acciones: "",
    url: ""
  },
  {
    fechaComentario: "dd/mm/aaa 00:00 hrs",
    usuario: "Proveedor 01",
    responsableSiguiente: "Proveedor 01",
    tipo: "Comentario",
    detalle: "Se genera carta 69, subir acuse en cuanto se tenga.",
    acciones: "",
    url: ""
  },
  {
    fechaComentario: "dd/mm/aaa 00:00 hrs",
    usuario: "Proveedor 01",
    responsableSiguiente: "Proveedor 01",
    tipo: "Comentario",
    detalle: "No se ha recibido respuesta del proveedor, apoyo.",
    acciones: "",
    url: ""
  },
  {
    fechaComentario: "dd/mm/aaa 00:00 hrs",
    usuario: "Analista 02",
    responsableSiguiente: "Analista 02",
    tipo: "Solicitud documento",
    detalle: "No se ha recibido respuesta del proveedor, apoyo.",
    acciones: "",
    url: ""
  },
  {
    fechaComentario: "dd/mm/aaa 00:00 hrs",
    usuario: "Proveedor 01",
    responsableSiguiente: "Proveedor 01",
    tipo: "Carga documento",
    detalle: "No se ha recibido respuesta del proveedor, apoyo.",
    acciones: "",
    url: ""
  },
  {
    fechaComentario: "dd/mm/aaa 00:00 hrs",
    usuario: "Analista 02",
    responsableSiguiente: "Analista 02",
    tipo: "Solicitud documento",
    detalle: "No se ha recibido respuesta del proveedor, apoyo.",
    acciones: "",
    url: ""
  },
  {
    fechaComentario: "dd/mm/aaa 00:00 hrs",
    usuario: "Analista 02",
    responsableSiguiente: "Analista 02",
    tipo: "Solicitud documento",
    detalle: "No se ha recibido respuesta del proveedor, apoyo.",
    acciones: "",
    url: ""
  },
  {
    fechaComentario: "dd/mm/aaa 00:00 hrs",
    usuario: "Proveedor 01",
    responsableSiguiente: "Proveedor 01",
    tipo: "Carga documento",
    detalle: "No se ha recibido respuesta del proveedor, apoyo.",
    acciones: "",
    url: ""
  },
  {
    fechaComentario: "dd/mm/aaa 00:00 hrs",
    usuario: "Proveedor 01",
    responsableSiguiente: "Proveedor 01",
    tipo: "Carga documento",
    detalle: "Se obtiene desistimiento del asegurado",
    acciones: "",
    url: ""
  },
  {
    fechaComentario: "dd/mm/aaa 00:00 hrs",
    usuario: "Analista 02",
    responsableSiguiente: "Analista 02",
    tipo: "Comentario",
    detalle: "No se visualiza correctamente el documento, adjuntarlo nuevamente",
    acciones: "",
    url: ""
  },
  {
    fechaComentario: "dd/mm/aaa 00:00 hrs",
    usuario: "Analista 02",
    responsableSiguiente: "Analista 02",
    tipo: "Solicitud documento",
    detalle: "Se requiere carta 69, favor de generarla.",
    acciones: "",
    url: ""
  },
  {
    fechaComentario: "dd/mm/aaa 00:00 hrs",
    usuario: "Proveedor 01",
    responsableSiguiente: "Proveedor 01",
    tipo: "Comentario",
    detalle: "Se genera carta 69, subir acuse en cuanto se tenga.",
    acciones: "",
    url: ""
  },
  {
    fechaComentario: "dd/mm/aaa 00:00 hrs",
    usuario: "Proveedor 01",
    responsableSiguiente: "Proveedor 01",
    tipo: "Comentario",
    detalle: "No se ha recibido respuesta del proveedor, apoyo.",
    acciones: "",
    url: ""
  },
  {
    fechaComentario: "dd/mm/aaa 00:00 hrs",
    usuario: "Analista 02",
    responsableSiguiente: "Analista 02",
    tipo: "Solicitud documento",
    detalle: "No se ha recibido respuesta del proveedor, apoyo.",
    acciones: "",
    url: ""
  },
  {
    fechaComentario: "dd/mm/aaa 00:00 hrs",
    usuario: "Proveedor 01",
    responsableSiguiente: "Proveedor 01",
    tipo: "Carga documento",
    detalle: "No se ha recibido respuesta del proveedor, apoyo.",
    acciones: "",
    url: ""
  },
  {
    fechaComentario: "dd/mm/aaa 00:00 hrs",
    usuario: "Analista 02",
    responsableSiguiente: "Analista 02",
    tipo: "Solicitud documento",
    detalle: "No se ha recibido respuesta del proveedor, apoyo.",
    acciones: "",
    url: ""
  },
  {
    fechaComentario: "dd/mm/aaa 00:00 hrs",
    usuario: "Analista 02",
    responsableSiguiente: "Analista 02",
    tipo: "Solicitud documento",
    detalle: "No se ha recibido respuesta del proveedor, apoyo.",
    acciones: "",
    url: ""
  },
  {
    fechaComentario: "dd/mm/aaa 00:00 hrs",
    usuario: "Proveedor 01",
    responsableSiguiente: "Proveedor 01",
    tipo: "Carga documento",
    detalle: "No se ha recibido respuesta del proveedor, apoyo.",
    acciones: "",
    url: ""
  },

];
const updatePage = (newFirst) => {
  first.value = newFirst;
};
</script>
