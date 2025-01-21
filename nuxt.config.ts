// nuxt.config.ts
export default defineNuxtConfig({
  modules: ["@pinia/nuxt", "@nuxtjs/leaflet"],
  ssr: false,
  css: ["leaflet/dist/leaflet.css"],

  build: {
    transpile: ["leaflet"],
  },

  compatibilityDate: "2025-01-20",
});
