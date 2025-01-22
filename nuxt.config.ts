export default defineNuxtConfig({
  modules: ["@pinia/nuxt", "@nuxtjs/leaflet", "nuxt-vue3-google-signin"],
  ssr: false,
  css: ["leaflet/dist/leaflet.css"],

  build: {
    transpile: ["leaflet"],
  },
  googleSignIn: {
    clientId: process.env.VITE_GOOGLE_CLIENT_ID,
  },
  compatibilityDate: "2025-01-20",
});
