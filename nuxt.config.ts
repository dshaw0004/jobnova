// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxt/eslint", "@nuxt/ui", "nitro-cloudflare-dev"],
  ssr: false,

  colorMode: {
    preference: "light",
    fallback: "light",
    classSuffix: "",
  },

  devtools: {
    enabled: true,
  },

  devServer: {
    port: 6682,
    host: "0.0.0.0",
  },

  vite: {
    server: {
      allowedHosts: [".ngrok-free.dev", ".ngrok.app", ".ngrok-free.app"],
    },
  },

  css: ["~/assets/css/main.css"],

  routeRules: {
    "/": { prerender: true },
  },

  compatibilityDate: "2025-01-15",

  eslint: {
    config: {
      stylistic: {
        commaDangle: "never",
        braceStyle: "1tbs",
      },
    },
  },

  nitro: {
    preset: "cloudflare_module",

    cloudflare: {
      deployConfig: true,
      nodeCompat: true,
    },

    experimental: {
      tasks: true,
    },

    scheduledTasks: {
      "0 0 * * *": ["govt:scrape"],
    },
  },
});
