// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@pinia/nuxt', '@nuxtjs/tailwindcss', 'nuxt3-leaflet'],
  pinia: {
    storesDirs: ['./stores/**']
  },
  tailwindcss: {
    exposeConfig: true,
    viewer: true,
    // and more...
  },
  runtimeConfig: {
    public: {
      SUPABASE_HOST: process.env.SUPABASE_HOST,
      SUPABASE_KEY: process.env.SUPABASE_KEY,
      AUTOCOMPLETE_KEY: process.env.AUTOCOMPLETE_KEY,
    }
  }
})
