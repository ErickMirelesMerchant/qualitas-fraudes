import '@mdi/font/css/materialdesignicons.css'

import { createVuetify } from 'vuetify'
import 'vuetify/styles'

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    icons: {
          iconfont: 'mdi',
    },
    theme: {
      options: {
        customProperties: true,
      },
    themes: {
      light: {
        primary: '#0096AE',
        secondary: '#ffffff',
        accent: '#82B1FF',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107',
      },
    },
  },
  })
  app.vueApp.use(vuetify)
})
