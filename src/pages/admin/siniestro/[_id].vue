<template>
  <DrawerNavigation :breadcrumbs="breadcrumbRoutesSiniestro">
    <h1>Siniestro {{ siniestroId }}</h1>
    <v-row class="mt-3">
      <v-col cols="12" md="3">
        <customeCardDashboard title="Score" icon="mdi-pound" :quantity="23" />
      </v-col>
      <v-col cols="12" md="3">
        <customeCardDashboard
          title="Analista asignado"
          icon="mdi-account-check-outline"
          :quantity="'[Nombre de analista]'"
        />
      </v-col>
      <v-col cols="12" md="3">
        <customeCardDashboard
          title="Estatus actual"
          icon="mdi-checkbox-multiple-outline"
          :quantity="'Estatus'"
        />
      </v-col>
      <v-col cols="12" md="3">
        <customeCardDashboard
          title="Responsable actual"
          icon="mdi mdi-account-outline"
          :quantity="'[Nombre de responsable]'"
        />
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <customeTabs :tabsList="tabsData" v-model="tab" />
      </v-col>
      <v-col cols="12">
        <CustomCardShowHide title="Coberturas">
          <v-row>
            <v-col cols="12">
              <customTable
                title=""
                :columns="columnsCobertura"
                :data="dataCobertura"
                :has-checkbox="false"
                :first="first"
                :rows="rows"
                :showButton="false"
                :showTitle="false"
              />
            </v-col>
          </v-row>
        </CustomCardShowHide>
      </v-col>

      <v-col cols="12">
        <CustomCardShowHide title="Pagos de póliza">
          <v-row>
            <v-col cols="12">
              <customTable
                title=""
                :columns="columnsPagosPoliza"
                :data="dataPagosPoliza"
                :has-checkbox="false"
                :first="first"
                :rows="rows"
                :showButton="false"
                :showTitle="false"
              />
            </v-col>
          </v-row>
        </CustomCardShowHide>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="6">
        <CustomCardShowHide title="Reglas alertadas">
          <v-row>
            <v-col cols="12">
              <customTable
                title=""
                :columns="columnsReglasAlertadas"
                :data="dataReglasAlertadas"
                :has-checkbox="false"
                :first="first"
                :rows="rows"
                :showButton="false"
                :showTitle="false"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <paginator
                :totalRecords="dataReglasAlertadas.length"
                :rows="rows"
                :first="first"
                @pageChange="updatePage"
              />
            </v-col>
          </v-row>
        </CustomCardShowHide>
      </v-col>
      <v-col cols="12" md="6">
        <CustomCardShowHide title="Pagos del siniestro">
          <v-row>
            <v-col cols="12">
              <customTable
                title=""
                :columns="columnsPagosSiniestro"
                :data="dataPagosSiniestro"
                :has-checkbox="false"
                :first="first"
                :rows="rows"
                :showButton="false"
                :showTitle="false"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <paginator
                :totalRecords="dataPagosSiniestro.length"
                :rows="rows"
                :first="first"
                @pageChange="updatePage"
              />
            </v-col>
          </v-row>
        </CustomCardShowHide>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="6">
        <CustomCardShowHide title="Movimientos reserva">
          <v-row>
            <v-col cols="12">
              <customTable
                title=""
                :columns="columnsMovimientoReserva"
                :data="dataMovimientoReserva"
                :has-checkbox="false"
                :first="first"
                :rows="rows"
                :showButton="false"
                :showTitle="false"
              />
            </v-col>
          </v-row>
        </CustomCardShowHide>
      </v-col>
      <v-col cols="12" md="6">
        <CustomCardShowHide title="Etiqueta SISE">
          <v-row>
            <v-col cols="12">
              <customTable
                title=""
                :columns="columnsEtiquetaSise"
                :data="dataEtiquetaSise"
                :has-checkbox="false"
                :first="first"
                :rows="rows"
                :showButton="false"
                :showTitle="false"
              />
            </v-col>
          </v-row>
        </CustomCardShowHide>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <CustomCardShowHide title="DUA">
          <v-row>
            <v-col cols="12">
              <customTable
                title=""
                :columns="columnsDua"
                :data="dataDua"
                :has-checkbox="false"
                :first="first"
                :rows="rows"
                :showButton="false"
                :showTitle="false"
              />
            </v-col>
          </v-row>
        </CustomCardShowHide>
      </v-col>
    </v-row>
  </DrawerNavigation>
</template>

<script setup>
import { useRoute } from "vue-router";
import { ref } from "vue";
import DrawerNavigation from "~/kernel/components/drawer-navigation.vue";
import { breadcrumbRoutesSiniestro } from "~/kernel/utils/breadcrumbs";
import { decryptId } from "~/kernel/utils/crypto";
import customeCardDashboard from "~/kernel/components/cards/custome-card-dashboard.vue";
import customeTabs from "~/kernel/components/tabs/custome-tabs.vue";
import CustomCardShowHide from "~/kernel/components/cards/CustomCardShowHide.vue";
import customTable from "~/kernel/components/custom-table/CustomTable.vue";
import paginator from "~/kernel/components/paginator/paginator.vue";

const route = useRoute();
const decryptedId = decryptId(route.params._id);
const siniestroId = ref(decryptedId);
const tab = ref(1);
const first = ref(0);
const rows = ref(10);

const tabsData = ref([
  { title: "Información de siniestro" },
  { title: "Línea del tiempo" },
  { title: "Documentos" },
  { title: "Bitácora" },
  { title: "Siniestros relacionados" },
]);

const columnsCobertura = [
  { title: "Clave", key: "clave" },
  { title: "Nombre", key: "nombre" },
  { title: "Suma asegurada", key: "sumaAsegurada" },
  { title: "Deducible", key: "deducible" },
  { title: "Importe deducible", key: "importeDeducible" },
];

const dataCobertura = [
  {
    clave: "1",
    nombre: "Daños materiales",
    sumaAsegurada: "$1,953,123",
    deducible: "7.00%",
    importeDeducible: "$136,500",
  },
];

const columnsPagosPoliza = [
  { title: "Num.", key: "num" },
  { title: "Endoso", key: "endoso" },
  { title: "F. Vencimiento", key: "fechaVencimiento" },
  { title: "Importe", key: "importe" },
  { title: "Recibo", key: "recibo" },
  { title: "Remesa", key: "remesa" },
  { title: "F. Pago", key: "fechaPago" },
  { title: "Estatus", key: "estatus" },
  { title: "Tipo mov", key: "tipoMov" },
];

const dataPagosPoliza = [
  {
    num: "1",
    endoso: "00000",
    fechaVencimiento: "$22/07/2024",
    importe: "$2,334,485.20",
    recibo: "1-0255404416",
    remesa: "0057112928",
    fechaPago: "23/08/2024 F.R.P.23/08/2024",
    estatus: "pagado",
    tipoMov: "Póliza",
  },
  {
    num: "1",
    endoso: "00000",
    fechaVencimiento: "$22/07/2024",
    importe: "$2,334,485.20",
    recibo: "1-0255404416",
    remesa: "0057112928",
    fechaPago: "23/08/2024 F.R.P.23/08/2024",
    estatus: "Cancelado",
    tipoMov: "Póliza",
  },
];

const columnsReglasAlertadas = [
  { title: "ID Regla", key: "idRegla" },
  { title: "Regla", key: "regla" },
  { title: "Score", key: "score" },
];

const dataReglasAlertadas = [
  {
    idRegla: "1",
    regla: "Póliza retroactiva",
    score: "30",
  },
  {
    idRegla: "2",
    regla: "Inicio vigencia",
    score: "27",
  },
  {
    idRegla: "3",
    regla: "Inicio vigencia",
    score: "Inicio vigencia",
  },
  {
    idRegla: "4",
    regla: "Inicio vigencia",
    score: "Inicio vigencia",
  },
  {
    idRegla: "5",
    regla: "Inicio vigencia",
    score: "Inicio vigencia",
  },
];

const columnsPagosSiniestro = [
  { title: "No.", key: "no" },
  { title: "A. Técnica", key: "aTecnica" },
  { title: "Fecha pago", key: "fechaPago" },
  { title: "Tipo pago", key: "tipoPago" },
  { title: "Concepto", key: "concepto" },
  { title: "Importe", key: "importe" },
];

const dataPagosSiniestro = [
  {
    no: "01",
    aTecnica: "0037462546",
    fechaPago: "dd/mm/aaaa",
    tipoPago: "I",
    concepto: "Honorario proveedor",
    importe: "$165.00",
  },
  {
    no: "02",
    aTecnica: "0037462546",
    fechaPago: "dd/mm/aaaa",
    tipoPago: "I",
    concepto: "Honorario proveedor",
    importe: "$165.00",
  },
  {
    no: "03",
    aTecnica: "0037462546",
    fechaPago: "dd/mm/aaaa",
    tipoPago: "I",
    concepto: "Honorario proveedor",
    importe: "$165.00",
  },
  {
    no: "04",
    aTecnica: "0037462546",
    fechaPago: "dd/mm/aaaa",
    tipoPago: "I",
    concepto: "GM",
    importe: "$165.00",
  },
  {
    no: "05",
    aTecnica: "0037462546",
    fechaPago: "dd/mm/aaaa",
    tipoPago: "I",
    concepto: "GM",
    importe: "$165.00",
  },
];

const columnsMovimientoReserva = [
  { title: "Tipo movimiento.", key: "tipoMovimiento" },
  { title: "Fecha movimiento", key: "fechaMovimiento" },
  { title: "Cobertura", key: "cobertura" },
  { title: "Importe", key: "importe" },
];

const dataMovimientoReserva = [
  {
    tipoMovimiento: "Inicial",
    fechaMovimiento: "dd/mm/aaaa",
    cobertura: "Daños materiales",
    importe: "$13,000.00",
  },
  {
    tipoMovimiento: "Ajuste +",
    fechaMovimiento: "dd/mm/aaaa",
    cobertura: "Responsabilidad Civil",
    importe: "$19,614.50",
  },
  {
    tipoMovimiento: "Ajuste +",
    fechaMovimiento: "dd/mm/aaaa",
    cobertura: "Asistencia Vial",
    importe: "$26,254.31",
  },
];

const columnsEtiquetaSise = [
  { title: "Estatus", key: "estatus" },
  { title: "Asigna", key: "asigna" },
  { title: "Usuario", key: "usuario" },
  { title: "Fecha Mov. ", key: "fechaMov" },
];

const dataEtiquetaSise = [
  {
    estatus: "Pago condicionado",
    asigna: "AMRAMIREZ",
    usuario: "AMRAMIREZ",
    fechaMov: "dd/mm/aaaa",
  },
  {
    estatus: "Pago condicionado",
    asigna: "AMRAMIREZ",
    usuario: "AMRAMIREZ",
    fechaMov: "dd/mm/aaaa",
  },
  {
    estatus: "Pago condicionado",
    asigna: "AMRAMIREZ",
    usuario: "AMRAMIREZ",
    fechaMov: "dd/mm/aaaa",
  },
];

  const columnsDua = [
    { title: "Descripción", key: "descripcion" },
    { title: "Narración", key: "narracion" },
  ];

  const dataDua = [
    {
      descripcion: "Breve narración de accidente A",
      narracion:
        "Me quitaron la camioneta. Me paré a desayunar, y en eso llegaron dos jóvenes armados. Me pidieron bajar y entregar las llaves; uno me apuntaba mientras el otro revisaba mis pertenencias en el vehículo. Después de unos minutos, se subieron a la camioneta y se f... Ver más",
    },
    {
      descripcion: "Breve narración de accidente B",
      narracion: "",
    },
    {
      descripcion: "Breve narración de accidente C",
      narracion:
        "XSE atiende ajuste express. NA afectado por robo total; NA se encuentra bien, no presenta lesiones. Refiere que fue interceptado por dos jóvenes armados mientras se encontraba estacionado. Se solicita apoyo para la recuperación del vehículo y se recaban declarac... Ver más",
    },
  ];

const updatePage = (newFirst) => {
  first.value = newFirst;
};
</script>
