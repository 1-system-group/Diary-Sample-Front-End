import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// Create a custom light theme
const lightTheme = {
  dark: false,
  colors: {
    'auth-theme': '#393944', // Header and Footer background color
  },
}

export default defineNuxtPlugin({
  name: 'vuetify',
  parallel: true,
  setup(nuxtApp) {
    const vuetify = createVuetify({
      components,
      directives,
      theme: {
        defaultTheme: 'lightTheme',
        themes: {
          lightTheme,
        },
      },
      icons: {
        defaultSet: 'mdi',
      },
      ssr: true,
    })

    nuxtApp.vueApp.use(vuetify)
  },
})
