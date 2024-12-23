import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";

export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  srcDir: "src/", 
  ssr: true,
  app: {
    baseURL: '/qualitas-fraudes/',
    head: {
      title: "Qualitas Fraudes",
      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" }
      ],
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          hid: "description",
          name: "description",
          content: "A simple login app",
        },
      ],
    },
  },
  build: {
    transpile: ["vuetify"], 
  },
  css: [
    '/styles/index.css',
    'vuetify/lib/styles/main.sass',
    '@mdi/font/css/materialdesignicons.min.css',
  ],
  modules: [
    (_options, nuxt) => {
      nuxt.hooks.hook("vite:extendConfig", (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true })); 
      });
    },
  ],
  vite: {
    vue: {
      template: {
        transformAssetUrls, 
      },
    },
    ssr: {
      noExternal: ['vuetify'], 
    },
  },
  plugins: [
    '~/presentation/plugins/vuetify.ts',  
  ],
});
