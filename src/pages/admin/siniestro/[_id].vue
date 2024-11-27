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
    </v-row>
    <v-row v-if="tab === 1">
      <v-col cols="12">
        <CustomCardShowHide title="Coberturas">
          <v-row>
            <v-col cols="12">
              <SimpleTable
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
              <SimpleTable
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
      <v-col cols="12" md="6">
        <CustomCardShowHide title="Reglas alertadas">
          <v-row>
            <v-col cols="12">
              <SimpleTable
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
              <SimpleTable
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
      <v-col cols="12" md="6">
        <CustomCardShowHide title="Movimientos reserva">
          <v-row>
            <v-col cols="12">
              <SimpleTable
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
              <SimpleTable
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
      <v-col cols="12">
        <CustomCardShowHide title="DUA">
          <v-row>
            <v-col cols="12">
              <SimpleTable
                title=""
                :columns="columnsDua"
                :data="dataDua"
                :has-checkbox="false"
                :first="first"
                :rows="rows"
                :showButton="false"
                :showTitle="false"
                :is-truncate="true"
              />
            </v-col>
          </v-row>
        </CustomCardShowHide>
      </v-col>
      <v-col cols="12">
        <CustomCardShowHide title="Condiciones especiales">
          <v-row>
            <v-col cols="12">
              <SimpleTable
                title=""
                :columns="columnsCondicionesEspeciales"
                :data="dataCondicionesEspeciales"
                :has-checkbox="false"
                :first="first"
                :rows="rows"
                :showButton="false"
                :showTitle="false"
                :is-truncate="true"
              />
            </v-col>
          </v-row>
        </CustomCardShowHide>
      </v-col>
      <v-col cols="12">
        <CustomCardShowHide title="Valuación">
          <v-row>
            <v-col cols="12">
              <SimpleTable
                title=""
                :columns="columnsValuacion"
                :data="dataValuacion"
                :has-checkbox="false"
                :first="first"
                :rows="rows"
                :showButton="false"
                :showTitle="false"
                :is-truncate="true"
              />
            </v-col>
          </v-row>
        </CustomCardShowHide>
      </v-col>
      <v-col cols="12" md="6">
        <CustomCardShowHide title="Portales externos">
          <v-row>
            <v-col cols="12">
              <SimpleTable
                title=""
                :columns="columnsPortalesExternos"
                :data="dataPortalesExternos"
                :has-checkbox="false"
                :first="first"
                :rows="rows"
                :showButton="false"
                :showTitle="false"
                :is-truncate="true"
              />
            </v-col>
          </v-row>
        </CustomCardShowHide>
      </v-col>
      <v-col cols="12" md="6">
        <CustomCardShowHide title="Mapa">
          <v-row>
            <v-col cols="12">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d120689.24528461612!2d-98.27458282288944!3d19.040028927527715!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85cfc0bd5ebc7a3b%3A0x48a6461de494ad95!2sHeroica%20Puebla%20de%20Zaragoza%2C%20Pue.!5e0!3m2!1ses-419!2smx!4v1731537766415!5m2!1ses-419!2smx"
                width="100%"
                height="322"
                style="border: 0"
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              ></iframe>
            </v-col>
          </v-row>
        </CustomCardShowHide>
      </v-col>
    </v-row>

    <v-row v-if="tab === 2">
      <v-col cols="12">
        <StepLineTime class="mb-6" :timeline-data="timelineData" />
        <StepLineTime :timeline-data="timelineData2" />
      </v-col>
    </v-row>
    <v-row v-if="tab === 3">
      <v-col cols="12">
        <Documents />
      </v-col>
    </v-row>
    <v-row v-if="tab === 4">
      <v-col cols="12">
        <binnacle />
      </v-col>
    </v-row>
    <v-row v-if="tab === 5">
      <v-col cols="12">
        <RelatedIncidents />
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
import SimpleTable from "~/kernel/components/custom-table/SimpleTable.vue";
import paginator from "~/kernel/components/paginator/paginator.vue";
import StepLineTime from "~/presentation/components/admin/siniestro/StepLineTime.vue";
import Documents from "~/presentation/components/admin/siniestro/Documents.vue";
import Binnacle from "~/presentation/components/admin/siniestro/Binnacle.vue";
import RelatedIncidents from "~/presentation/components/admin/siniestro/RelatedIncidents.vue";

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
  { title: "Notificaciones y acciones" },
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
      "Me quitaron la camioneta. Me paré a desayunar, y en eso llegaron dos jóvenes armados. Me pidieron bajar y entregar las llaves; uno me apuntaba mientras el otro revisaba mis pertenencias en el vehículo. Después de unos minutos, se subieron a la camioneta y se",
  },
  {
    descripcion: "Breve narración de accidente B",
    narracion: "",
  },
  {
    descripcion: "Breve narración de accidente C",
    narracion:
      "XSE atiende ajuste express. NA afectado por robo total; NA se encuentra bien, no presenta lesiones. Refiere que fue interceptado por dos jóvenes armados mientras se encontraba estacionado. Se solicita apoyo para la recuperación del vehículo y se recaban declaraciones",
  },
];

const columnsCondicionesEspeciales = [
  { title: "Tipo", key: "tipo" },
  { title: "Condición", key: "condicion" },
  { title: "Desc. Condición", key: "descCondición" },
  { title: "Observaciones", key: "observaciones" },
  { title: "Valor", key: "valor" },
  { title: "Desc. Valor", key: "descValor" },
  { title: "Fecha Inicio", key: "fechaInicio" },
  { title: "Fecha Fin", key: "fechaFin" },
  { title: "MKR", key: "mkr" },
];

const dataCondicionesEspeciales = [
  {
    tipo: "POL",
    condicion: "5",
    descCondición: "Período de gracia, todos los recibos",
    observaciones: "Convenio",
    valor: "30",
    descValor: "Días",
    fechaInicio: "dd/mm/aaaa",
    fechaFin: "dd/mm/aaaa",
    mkr: "P0004819505",
  },
];

const columnsValuacion = [
  { title: "ID Expediente", key: "idExpediente" },
  { title: "Código afectado", key: "codigoAfectado" },
  { title: "Tipo riesgo", key: "tipoRiesgo" },
  { title: "Conductor", key: "conductor" },
  { title: "Vehículo", key: "vehiculo" },
  { title: "Modelo", key: "modelo" },
  { title: "Placas", key: "placas" },
  { title: "Serie", key: "serie" },
  { title: "Fecha valuación", key: "fechaValuación" },
  { title: "Estatus valuación", key: "estatusValuación" },
];

const dataValuacion = [
  {
    idExpediente: "12345",
    codigoAfectado: "A",
    tipoRiesgo: "A1",
    conductor: "[Nombre Conductor]",
    vehiculo: "Honda Civic",
    modelo: "2020",
    placas: "ABC-1234",
    serie: "1HGCM82633A123456",
    fechaValuación: "dd/mm/aaaa",
    estatusValuación: "Valuado",
  },
];

const columnsPortalesExternos = [
  { title: "Portal externo", key: "portalExterno" },
  { title: "Respuesta", key: "respuesta" },
  { title: "Última actualización", key: "ultimaActualizacion" },
  { title: "Acciones", key: "acciones" },
];

const dataPortalesExternos = [
  {
    portalExterno: "REPUVE FGJ",
    respuesta: "Con reporte de robo / Sin reporte de robo",
    ultimaActualizacion: "dd/mm/aaa 00:00hrs ",
    acciones: "",
  },
  {
    portalExterno: "SAPT",
    respuesta: "NA",
    ultimaActualizacion: "dd/mm/aaa 00:00hrs ",
    acciones: "",
  },
  {
    portalExterno: "TRANSUNION",
    respuesta: "NA",
    ultimaActualizacion: "dd/mm/aaa 00:00hrs ",
    acciones: "",
  },
  {
    portalExterno: "OCRA+",
    respuesta: "Hay o no registro",
    ultimaActualizacion: "dd/mm/aaa 00:00hrs ",
    acciones: "",
  },
  {
    portalExterno: "Quavalin",
    respuesta: "VIN correcto o incorrecto",
    ultimaActualizacion: "dd/mm/aaa 00:00hrs ",
    acciones: "",
  },
];

const timelineData = ref([
  { title: "Estatus plataforma", status: true, date: "25/10/2024" },
  { title: "Etiqueta SISE", status: true, date: "26/10/2024" },
  { title: "Alertamiento", status: true, date: "27/10/2024" },
  { title: "Registro Siniestro", status: true, date: "28/10/2024" },
  { title: "Endoso", status: true, date: "29/10/2024" },
  { title: "Reporte", status: true, date: "29/10/2024" },
  { title: "Endoso", status: true, date: "29/10/2024" },
  { title: "Ocurrido", status: true, date: "29/10/2024" },
]);

const timelineData2 = ref([
  { title: "Estatus plataforma", status: true, date: "25/10/2024" },
  { title: "Etiqueta SISE", status: true, date: "26/10/2024" },
  { title: "Alertamiento", status: true, date: "27/10/2024" },
  { title: "Registro Siniestro", status: true, date: "28/10/2024" },
  { title: "Endoso", status: true, date: "29/10/2024" },
  { title: "Reporte", status: true, date: "29/10/2024" },
  { title: "Endoso", status: true, date: "29/10/2024" },
  { title: "Ocurrido", status: true, date: "29/10/2024" },
]);

const updatePage = (newFirst) => {
  first.value = newFirst;
};
</script>
