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
    host: 'localhost',
    port: 3000,
  },

  // Pinia configuration
  pinia: {
    storesDirs: ['./stores/**'],
  },

  // Compatibility date
  compatibilityDate: '2024-04-03',

  // Runtime configuration
  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.DIARY_SAMPLE_BACKEND_BASE_URL || 'http://localhost:5000',
    },
  },
})
