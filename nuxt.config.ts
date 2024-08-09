// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      SUPABASE_URL: process.env.SUPABASE_URL,
    },
  },
  modules: [
    "@nuxtjs/tailwindcss",
    "shadcn-nuxt",
    "@nuxtjs/supabase",
    "@vee-validate/nuxt",
  ],

  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: "",
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: "./components/ui",
  },
  supabase: {
    redirect: false,
  },
  vite: {
    optimizeDeps: {
      exclude: ["vee-validate"],
    },
    resolve: {
      alias: {
        ".prisma/client/index-browser":
          "./node_modules/@prisma/client/index-browser.js",
      },
    },
  },
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
});
