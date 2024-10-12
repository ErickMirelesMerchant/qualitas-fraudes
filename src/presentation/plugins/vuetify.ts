import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import "vuetify/styles";
import * as directives from "vuetify/directives";
import "../../assets/css/main.css";
import { md3 } from "vuetify/blueprints";

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    blueprint: md3,
    theme: {
      defaultTheme: "myCustomTheme",
      themes: {
        myCustomTheme: {
          dark: false,
          colors: {
            primary: "#0096AE",
          },
        },
      },
    },
    defaults: {
      VBtn: {
        style: {
          textTransform: "none", 
        },
      },
    },
    components,
    directives,
  });

  nuxtApp.vueApp.use(vuetify);
});
