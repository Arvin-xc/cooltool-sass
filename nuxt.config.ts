// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  app: {
    head: {
      script: [
        {
          src: "/assets/libs/google-analytics.js",
        },
        {
          src: "/assets/libs/gtag.js",
          async: true,
          fetchpriority: "low",
        },
      ],
    },
  },
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
    "@pinia/nuxt",
    "@sentry/nuxt/module",
  ],
  vite: {
    worker: {
      format: "es",
    },
  },
  nitro: {
    esbuild: {
      options: {
        target: "esnext",
      },
    },
  },
  sentry: {
    sourceMapsUploadOptions: {
      org: "dacd53986dd7",
      project: "cooltool-nuxt",
      authToken:
        "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",
    },
  },
  pinia: {
    storesDirs: ["./stores/**"],
  },
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
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
});
