<template>
  <v-row>
    <v-col cols="12" md="6">
      <CustomCardShowHide title="Content">
        <v-row>
          <v-col cols="12">
            <customTable
              title=""
              :columns="columnsContent"
              :data="dataContent"
              :has-checkbox="false"
              :first="firstFirstTablePaginator"
              :rows="rowsFirstTablePaginator"
              :showButton="false"
              :showTitle="false"
            />
            <paginator
              :totalRecords="dataContent.length"
              :rows="rowsFirstTablePaginator"
              :first="firstFirstTablePaginator"
              @pageChange="updatePage"
            />
          </v-col>
        </v-row>
      </CustomCardShowHide>
    </v-col>

    <v-col cols="12" md="6">
      <CustomCardShowHide title="Valuación">
        <v-row>
          <v-col cols="12">
            <customTable
              title=""
              :columns="columnsValuacion"
              :data="dataValuacion"
              :has-checkbox="false"
              :first="firstSecondTablePaginator"
              :rows="rowsSecondTablePaginator"
              :showButton="false"
              :showTitle="false"
            />
            <paginator
              :totalRecords="dataContent.length"
              :rows="rowsSecondTablePaginator"
              :first="firstSecondTablePaginator"
              @pageChange="updatePageSecond"
            />
          </v-col>
        </v-row>
      </CustomCardShowHide>
    </v-col>

    <v-col cols="12" md="6">
      <CustomCardShowHide title="Consultas externas">
        <v-row>
          <v-col cols="12">
            <customTable
              title=""
              :columns="columnsConsultaExterna"
              :data="dataConsultaExterna"
              :has-checkbox="false"
              :first="firstThirdTablePaginator"
              :rows="rowsThirdTablePaginator"
              :showButton="false"
              :showTitle="false"
            />
            <paginator
              :totalRecords="dataConsultaExterna.length"
              :rows="rowsThirdTablePaginator"
              :first="firstThirdTablePaginator"
              @pageChange="updatePageThird"
            />
          </v-col>
        </v-row>
      </CustomCardShowHide>
    </v-col>

    <v-col cols="12" md="6">
      <CustomCardShowHide title="Generado en plataforma">
        <v-row>
          <v-col cols="12">
            <customTable
              title=""
              :columns="columnGeneradoPlataforma"
              :data="dataGeneradoPlataforma"
              :has-checkbox="false"
              :first="firstFourthTablePaginator"
              :rows="rowsFourthTablePaginator"
              :showButton="false"
              :showTitle="false"
            />
            <paginator
              :totalRecords="dataGeneradoPlataforma.length"
              :rows="rowsFourthTablePaginator"
              :first="firstThirdTablePaginator"
              @pageChange="updatePageFourth"
            />
          </v-col>
        </v-row>
      </CustomCardShowHide>
    </v-col>
  </v-row>
</template>

<script setup>
import { defineProps, ref } from "vue";
import CustomCardShowHide from "~/kernel/components/cards/CustomCardShowHide.vue";
import customTable from "~/kernel/components/custom-table/CustomTable.vue";
import paginator from "~/kernel/components/paginator/paginator.vue";

const props = defineProps({
  timelineData: {
    type: Array,
    required: true,
  },
});
const firstFirstTablePaginator = ref(0);
const rowsFirstTablePaginator = ref(5);
const firstSecondTablePaginator = ref(0);
const rowsSecondTablePaginator = ref(5);
const firstThirdTablePaginator = ref(0);
const rowsThirdTablePaginator = ref(5);
const firstFourthTablePaginator = ref(0);
const rowsFourthTablePaginator = ref(5);

const columnsContent = [
  { title: "ID Documento", key: "idDocumento" },
  { title: "Tipo de documento", key: "tipoDocumento" },
  { title: "Usuario", key: "usuario" },
  { title: "Última modificación", key: "ultimaModificacion" },
  { title: "Acciones", key: "ver" },
];

const dataContent = [
  {
    idDocumento: "[ID]",
    tipoDocumento: "[Tipo de documento]",
    usuario: "[Nombre de usuario]",
    ultimaModificacion: "dd/mm/aaaa",
    acciones: "",
  },
  {
    idDocumento: "[ID]",
    tipoDocumento: "[Tipo de documento]",
    usuario: "[Nombre de usuario]",
    ultimaModificacion: "dd/mm/aaaa",
    acciones: "",
  },
  {
    idDocumento: "[ID]",
    tipoDocumento: "[Tipo de documento]",
    usuario: "[Nombre de usuario]",
    ultimaModificacion: "dd/mm/aaaa",
    acciones: "",
  },
  {
    idDocumento: "[ID]",
    tipoDocumento: "[Tipo de documento]",
    usuario: "[Nombre de usuario]",
    ultimaModificacion: "dd/mm/aaaa",
    acciones: "",
  },
  {
    idDocumento: "[ID]",
    tipoDocumento: "[Tipo de documento]",
    usuario: "[Nombre de usuario]",
    ultimaModificacion: "dd/mm/aaaa",
    acciones: "",
  },
  {
    idDocumento: "[ID]",
    tipoDocumento: "[Tipo de documento]",
    usuario: "[Nombre de usuario]",
    ultimaModificacion: "dd/mm/aaaa",
    acciones: "",
  },
  {
    idDocumento: "[ID]",
    tipoDocumento: "[Tipo de documento]",
    usuario: "[Nombre de usuario]",
    ultimaModificacion: "dd/mm/aaaa",
    acciones: "",
  },
  {
    idDocumento: "[ID]",
    tipoDocumento: "[Tipo de documento]",
    usuario: "[Nombre de usuario]",
    ultimaModificacion: "dd/mm/aaaa",
    acciones: "",
  },
  {
    idDocumento: "[ID]",
    tipoDocumento: "[Tipo de documento]",
    usuario: "[Nombre de usuario]",
    ultimaModificacion: "dd/mm/aaaa",
    acciones: "",
  },
  {
    idDocumento: "[ID]",
    tipoDocumento: "[Tipo de documento]",
    usuario: "[Nombre de usuario]",
    ultimaModificacion: "dd/mm/aaaa",
    acciones: "",
  },
];

const columnsValuacion = [
  { title: "ID Documento", key: "idDocumento" },
  { title: "Tipo de documento", key: "tipoDocumento" },
  { title: "Usuario", key: "usuario" },
  { title: "Última modificación", key: "ultimaModificacion" },
  { title: "Acciones", key: "ver" },
];

const dataValuacion = [
  {
    idDocumento: "[ID]",
    tipoDocumento: "[Tipo de documento]",
    usuario: "[Nombre de usuario]",
    ultimaModificacion: "dd/mm/aaaa",
    acciones: "",
  },
  {
    idDocumento: "[ID]",
    tipoDocumento: "[Tipo de documento]",
    usuario: "[Nombre de usuario]",
    ultimaModificacion: "dd/mm/aaaa",
    acciones: "",
  },
  {
    idDocumento: "[ID]",
    tipoDocumento: "[Tipo de documento]",
    usuario: "[Nombre de usuario]",
    ultimaModificacion: "dd/mm/aaaa",
    acciones: "",
  },
  {
    idDocumento: "[ID]",
    tipoDocumento: "[Tipo de documento]",
    usuario: "[Nombre de usuario]",
    ultimaModificacion: "dd/mm/aaaa",
    acciones: "",
  },
  {
    idDocumento: "[ID]",
    tipoDocumento: "[Tipo de documento]",
    usuario: "[Nombre de usuario]",
    ultimaModificacion: "dd/mm/aaaa",
    acciones: "",
  },
  {
    idDocumento: "[ID]",
    tipoDocumento: "[Tipo de documento]",
    usuario: "[Nombre de usuario]",
    ultimaModificacion: "dd/mm/aaaa",
    acciones: "",
  },
  {
    idDocumento: "[ID]",
    tipoDocumento: "[Tipo de documento]",
    usuario: "[Nombre de usuario]",
    ultimaModificacion: "dd/mm/aaaa",
    acciones: "",
  },
  {
    idDocumento: "[ID]",
    tipoDocumento: "[Tipo de documento]",
    usuario: "[Nombre de usuario]",
    ultimaModificacion: "dd/mm/aaaa",
    acciones: "",
  },
  {
    idDocumento: "[ID]",
    tipoDocumento: "[Tipo de documento]",
    usuario: "[Nombre de usuario]",
    ultimaModificacion: "dd/mm/aaaa",
    acciones: "",
  },
  {
    idDocumento: "[ID]",
    tipoDocumento: "[Tipo de documento]",
    usuario: "[Nombre de usuario]",
    ultimaModificacion: "dd/mm/aaaa",
    acciones: "",
  },
];

const columnsConsultaExterna = [
  { title: "ID Documento", key: "idDocumento" },
  { title: "Tipo de documento", key: "tipoDocumento" },
  { title: "Usuario", key: "usuario" },
  { title: "Última modificación", key: "ultimaModificacion" },
  { title: "Acciones", key: "ver" },
];

const dataConsultaExterna = [
  {
    idDocumento: "[ID]",
    tipoDocumento: "REPUVE",
    usuario: "[Nombre de usuario]",
    ultimaModificacion: "dd/mm/aaaa",
    acciones: "",
  },
  {
    idDocumento: "[ID]",
    tipoDocumento: "SAPT",
    usuario: "[Nombre de usuario]",
    ultimaModificacion: "dd/mm/aaaa",
    acciones: "",
  },
  {
    idDocumento: "[ID]",
    tipoDocumento: "TRANSUNION",
    usuario: "[Nombre de usuario]",
    ultimaModificacion: "dd/mm/aaaa",
    acciones: "",
  },
  {
    idDocumento: "[ID]",
    tipoDocumento: "REPUVE",
    usuario: "[Nombre de usuario]",
    ultimaModificacion: "dd/mm/aaaa",
    acciones: "",
  },
  {
    idDocumento: "[ID]",
    tipoDocumento: "SAPT",
    usuario: "[Nombre de usuario]",
    ultimaModificacion: "dd/mm/aaaa",
    acciones: "",
  },
  {
    idDocumento: "[ID]",
    tipoDocumento: "REPUVE",
    usuario: "[Nombre de usuario]",
    ultimaModificacion: "dd/mm/aaaa",
    acciones: "",
  },
  {
    idDocumento: "[ID]",
    tipoDocumento: "SAPT",
    usuario: "[Nombre de usuario]",
    ultimaModificacion: "dd/mm/aaaa",
    acciones: "",
  },
  {
    idDocumento: "[ID]",
    tipoDocumento: "TRANSUNION",
    usuario: "[Nombre de usuario]",
    ultimaModificacion: "dd/mm/aaaa",
    acciones: "",
  },
  {
    idDocumento: "[ID]",
    tipoDocumento: "REPUVE",
    usuario: "[Nombre de usuario]",
    ultimaModificacion: "dd/mm/aaaa",
    acciones: "",
  },
  {
    idDocumento: "[ID]",
    tipoDocumento: "SAPT",
    usuario: "[Nombre de usuario]",
    ultimaModificacion: "dd/mm/aaaa",
    acciones: "",
  },
];

const columnGeneradoPlataforma = [
  { title: "ID Documento", key: "idDocumento" },
  { title: "Tipo de documento", key: "tipoDocumento" },
  { title: "Usuario", key: "usuario" },
  { title: "Última modificación", key: "ultimaModificacion" },
  { title: "Acciones", key: "ver" },
];

const dataGeneradoPlataforma = [
  {
    idDocumento: "[ID]",
    tipoDocumento: "Carta 69",
    usuario: "[Nombre de usuario]",
    ultimaModificacion: "dd/mm/aaaa",
    acciones: "",
  },
  {
    idDocumento: "[ID]",
    tipoDocumento: "Póliza impresa",
    usuario: "[Nombre de usuario]",
    ultimaModificacion: "dd/mm/aaaa",
    acciones: "",
  },
  {
    idDocumento: "[ID]",
    tipoDocumento: "Acuse carta",
    usuario: "[Nombre de usuario]",
    ultimaModificacion: "dd/mm/aaaa",
    acciones: "",
  },
  {
    idDocumento: "[ID]",
    tipoDocumento: "Expediente",
    usuario: "[Nombre de usuario]",
    ultimaModificacion: "dd/mm/aaaa",
    acciones: "",
  },
  {
    idDocumento: "[ID]",
    tipoDocumento: "Tipo 5",
    usuario: "[Nombre de usuario]",
    ultimaModificacion: "dd/mm/aaaa",
    acciones: "",
  },
  {
    idDocumento: "[ID]",
    tipoDocumento: "Carta 69",
    usuario: "[Nombre de usuario]",
    ultimaModificacion: "dd/mm/aaaa",
    acciones: "",
  },
  {
    idDocumento: "[ID]",
    tipoDocumento: "Póliza impresa",
    usuario: "[Nombre de usuario]",
    ultimaModificacion: "dd/mm/aaaa",
    acciones: "",
  },
  {
    idDocumento: "[ID]",
    tipoDocumento: "Acuse carta",
    usuario: "[Nombre de usuario]",
    ultimaModificacion: "dd/mm/aaaa",
    acciones: "",
  },
  {
    idDocumento: "[ID]",
    tipoDocumento: "Expediente",
    usuario: "[Nombre de usuario]",
    ultimaModificacion: "dd/mm/aaaa",
    acciones: "",
  },
  {
    idDocumento: "[ID]",
    tipoDocumento: "Tipo 5",
    usuario: "[Nombre de usuario]",
    ultimaModificacion: "dd/mm/aaaa",
    acciones: "",
  },
];
const updatePage = (newFirst) => {
  firstFirstTablePaginator.value = newFirst;
};
const updatePageSecond = (newFirst) => {
  firstSecondTablePaginator.value = newFirst;
};
const updatePageThird = (newFirst) => {
  firstThirdTablePaginator.value = newFirst;
};
const updatePageFourth = (newFirst) => {
  firstFourthTablePaginator;
  firstThirdTablePaginator.value = newFirst;
};
</script>
