<template>
  <v-app>
    <v-navigation-drawer
      v-if="isMounted"
      v-model="drawer"
      app
      :rail="rail"
      :class="{ 'v-navigation-drawer--mobile': isMobile }"
      permanent
    >
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
          :class="{ 'active-menu-item': isActiveRoute(item) }"
          @click="navigateTo(item)"
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
              <v-btn @click="logout" icon :elevation="0" variant="plain">
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
      <template v-if="breadcrumbs && breadcrumbs.length">
        <Breadcrumbs :breadcrumbs="breadcrumbs" />
      </template>
      <template v-else>
        <v-toolbar-title class="custom-title">{{ title }}</v-toolbar-title>
      </template>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon size="small" color="grey-darken-1" class="icon-wrapper"
          >mdi-bell-outline</v-icon
        >
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
import { computed, onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useDisplay } from "vuetify";
import Breadcrumbs from "@/kernel/components/Breadcrumbs/Breadcrumbs.vue";

const drawer = ref(false);
const isMounted = ref(false);
const rail = ref(false);
const { mdAndUp } = useDisplay();
const router = useRouter();
const route = useRoute();

const props = defineProps({
  title: {
    type: String,
    required: false,
  },
  breadcrumbs: {
    type: Array,
    required: false,
    default: () => [],
  },
});

const isMobile = computed(() => !mdAndUp.value && isMounted.value);

onMounted(() => {
  isMounted.value = true;
  drawer.value = mdAndUp.value;
});

watch(
  mdAndUp,
  (isDesktop) => {
    drawer.value = isDesktop;
    if (!isDesktop) rail.value = false;
  },
  { immediate: true }
);

const items = [
  {
    title: "Dashboard",
    icon: "mdi-view-dashboard-outline",
    route: "/admin/dashboard",
  },
  { title: "Siniestros", icon: "mdi-car-outline", route: "/admin/siniestros" },
  {
    title: "Analistas",
    icon: "mdi-account-multiple-outline",
    route: "/admin/analistas",
  },
  {
    title: "Proveedores",
    icon: "mdi-handshake-outline",
    route: "/admin/proveedores",
  },
  {
    title: "Notificaciones",
    icon: "mdi-checkbox-blank-badge-outline",
    route: "/admin/notificaciones",
  },
];

const navigateTo = (item) => {
  router.push(item.route);
};

const logout = () => {
  router.push("/");
};

const isActiveRoute = (item) => {
  return route.path === item.route;
};
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

.active-menu-item {
  background-color: #e0e0e0;
  color: #1976d2;
}
</style>
