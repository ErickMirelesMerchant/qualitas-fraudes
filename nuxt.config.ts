// // https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  srcDir: 'src/', // Asegúrate de que Nuxt trate 'public' como directorio raíz de origen
  target: 'server',
  ssr: true,
  head: {
    title: 'Qualitas Fraudes',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'A simple login app' }
    ]
  },
  buildModules: [],
  modules: [],
  build: {},
  router: {
    extendRoutes(routes, resolve) {
      routes.push({
        path: '/',
        redirect: '/login',
      });
    },
  },
})