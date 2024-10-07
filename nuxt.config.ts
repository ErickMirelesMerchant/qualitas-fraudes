// // https://nuxt.com/docs/api/configuration/nuxt-config
export default {
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  srcDir: 'src/', // Asegúrate de que Nuxt trate 'public' como directorio raíz de origen
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
    extendRoutes(routes: any, resolve: any) {
      routes.push({
        path: '/',
        redirect: '/login',
      },);
    },
  },
}