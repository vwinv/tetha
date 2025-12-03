// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  ssr: false,
  nitro: {
    preset: 'static' // Site statique - l'envoi d'emails se fait via API PHP externe
  },
  app: {
    baseURL: '/',
    buildAssetsDir: '/_nuxt/'
  },
  vite: {
    build: {
      rollupOptions: {
        output: {
          manualChunks: undefined // Laisser Vite gérer automatiquement les chunks
        }
      },
      chunkSizeWarningLimit: 1000,
      // Améliorer le traitement des assets
      assetsInlineLimit: 4096, // Inline les petits assets (< 4KB)
    },
    server: {
      // Timeout pour les assets
      hmr: {
        timeout: 30000
      }
    },
    // Optimiser le chargement des images
    optimizeDeps: {
      include: []
    }
  },
  experimental: {
    payloadExtraction: false // Améliore les performances pour les sites statiques
  },
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  runtimeConfig: {
    // Variables privées (côté serveur uniquement)
    smtpPassword: process.env.SMTP_PASSWORD || 'nbur xqyp tfzq oinr', // Local par défaut
    public: {
      // Variables publiques accessibles côté client
      mailingPassword: process.env.NUXT_PUBLIC_MAILING_PASSWORD || 'bphe kijp ztyt etqh' // Mot de passe pour l'API mailing (local par défaut)
    }
  },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/i18n',
    ['nuxt-mail', {
      message: {
        to: 'thetaingenierie@gmail.com',
      },
      smtp: {
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          user: "thetaingenierie@gmail.com",
          pass: process.env.SMTP_PASSWORD || "nbur xqyp tfzq oinr" // Utilise la variable d'environnement ou la valeur par défaut (local)
        }
      },
    }],
  ],
  i18n: {
    locales: [
      { code: 'fr', language: 'fr-FR', iso: 'fr-FR', file: 'fr.json' },
      { code: 'en', language: 'en-US', iso: 'en-US', file: 'en.json' }
    ],
    defaultLocale: 'fr',
    strategy: 'prefix_except_default',
    langDir: 'locales',
    compilation: {
      strictMessage: false,
      escapeHtml: false
    },
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root'
    }
  },
  css: ['~/assets/css/tailwind.css'],
})

