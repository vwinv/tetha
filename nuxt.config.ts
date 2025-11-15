// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  ssr: false,
  nitro: {
    preset: 'static'
  },
  app: {
    baseURL: '/',
    buildAssetsDir: '/_nuxt/'
  },
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/i18n',
    ['nuxt-mail', {
      message: {
        to: 'contact@tetha.com',
      },
      smtp: {
        // ⚠️ CONFIGURATION REQUISE : Remplacez par votre serveur SMTP réel
        // Exemples de configuration :
        //
        // Gmail:
        // host: "smtp.gmail.com",
        // port: 587,
        // secure: false,
        // auth: {
        //   user: "votre-email@gmail.com",
        //   pass: "votre-mot-de-passe-application" // Mot de passe d'application Gmail
        // }
        //
        // Outlook/Office365:
        // host: "smtp.office365.com",
        // port: 587,
        // secure: false,
        // auth: {
        //   user: "votre-email@outlook.com",
        //   pass: "votre-mot-de-passe"
        // }
        //
        // Serveur SMTP personnalisé:
        // host: "smtp.votre-domaine.com",
        // port: 587,
        // secure: false, // true pour le port 465
        // auth: {
        //   user: "votre-email@votre-domaine.com",
        //   pass: "votre-mot-de-passe"
        // }
        
        // Configuration temporaire (désactivée pour éviter les erreurs)
        // Décommentez et configurez ci-dessus selon votre serveur SMTP
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

