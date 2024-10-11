<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app :rail="rail" permanent>
      <v-img
        src="/assets/logos/logo_qualitas.png"
        alt="Qualitas Logo"
        class="mx-auto my-8"
        max-width="150"
      ></v-img>
      <v-list density="compact" nav v-for="item in items" :key="item.title">
        <v-list-item
          :prepend-icon="item.icon"
          :title="item.title"
          :value="item.title"
          @click="this.$router.push({ path: item.route })"
        ></v-list-item>
      </v-list>
      <template v-slot:append>
        <v-divider></v-divider>
        <div class="pa-5">
          <v-row>
            <v-col cols="8" v-if="!rail">
              <h5>Bianca Méndez</h5>
              <span class="custom-email">bianca@qualitas.com</span>
            </v-col>
            <v-col :cols="!rail ? '4 text-end' : '12 text-end'">
              <v-btn icon :elevation="0">
                <v-icon size="x-small" color="#465467">mdi-logout</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </div>
      </template>
    </v-navigation-drawer>

    <v-app-bar app color="#f9fafb" :elevation="0">
      <v-app-bar-nav-icon
        @click.stop="rail = !rail"
        :icon="rail ? 'mdi-chevron-double-right' : 'mdi-chevron-double-left'"
        color="#667085"
      ></v-app-bar-nav-icon>
      <v-toolbar-title class="custom-title">{{ title }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon size="small" color="grey-darken-1" class="icon-wrapper">mdi-bell-outline</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main style="background-color: #f9fafb">
      <v-container>
        <slot></slot>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { defineProps, onMounted, ref, watch } from "vue";
import { useDisplay } from "vuetify";

const drawer = ref(true);
const { mdAndUp } = useDisplay();
const rail = ref(false);

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
});
onMounted(() => {
  drawer.value = mdAndUp.value;
});

watch(mdAndUp, (isDesktop) => {
  drawer = isDesktop;
});

const items = [
  { title: "Dashboard", icon: "mdi-view-dashboard-outline", route: '/admin/dashboard' },
  { title: "Siniestros", icon: "mdi-car-outline", route: '/siniestros/siniestros' },
  { title: "Analistas", icon: "mdi-account-multiple-outline", route: '/analistas/analistas' },
  { title: "Proveedores", icon: "mdi-handshake-outline", route: '/proveedores/proveedores' },
  { title: "Notificaciones", icon: "mdi-checkbox-blank-badge-outline", route: '/notificaciones/notificaciones' },
];
</script>

<style scoped>
.custom-title {
  color: var(--Colors-Text-text-secondary_hover, #182230);
  font-size: 14px;
  padding: 8px;
  border-radius: 4px;
}
.custom-email {
  color: var(--colors-text-text-tertiary-600, #475467);
  font-size: 14px;
}

.icon-wrapper {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
</style>
