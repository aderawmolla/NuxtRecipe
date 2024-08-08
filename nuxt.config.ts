// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
export default defineNuxtConfig({
  build: {
    transpile: ['vuetify'],
  },
  modules: [
    '@nuxtjs/tailwindcss','@nuxtjs/apollo','@primevue/nuxt-module', '@pinia/nuxt',
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },


  ],
  apollo: {
    clients: {
      default: {
        httpEndpoint: 'https://food-recipe-1.hasura.app/v1/graphql'
      }
    },
  },
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },

  compatibilityDate: '2024-04-03',
  devtools: { enabled: true }
})
