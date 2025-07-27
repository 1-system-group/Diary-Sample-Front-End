// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  // CSS
  css: ['vuetify/styles', '@mdi/font/css/materialdesignicons.css'],

  // Build configuration
  build: {
    transpile: ['vuetify'],
  },

  // Modules
  modules: ['@pinia/nuxt', '@nuxt/eslint'],

  // TypeScript configuration
  typescript: {
    strict: true,
    typeCheck: true,
  },

  // Server configuration
  devServer: {
    host: '127.0.0.1',
  },

  // Pinia configuration
  pinia: {
    storesDirs: ['./stores/**'],
  },

  // Compatibility date
  compatibilityDate: '2024-04-03',
})
