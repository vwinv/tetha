<template>
  <footer
    class="relative border-t border-slate-200 text-slate-700"
    :style="footerStyle"
  >
    <div class="mx-auto max-w-6xl px-2 py-8">
      <div class="grid gap-5 md:grid-cols-2 lg:grid-cols-5">
        <div class="space-y-2">
          <NuxtLink :to="getLocalizedPath('/')" class="inline-flex items-center gap-1">
            <img :src="logoUrl" alt="Tetha" class="h-16 w-auto" loading="lazy" />
          </NuxtLink>
         
        </div>

        <div>
          <ul class="space-y-1 text-sm text-slate-600">
            <li>
              <NuxtLink :to="getLocalizedPath('/allservices')" class="py-1 underline hover:text-slate-600">{{ $t('nav.services') }}</NuxtLink>
            </li>
            <li>
              <NuxtLink :to="getLocalizedPath('/about')" class="py-1 underline hover:text-slate-600">{{ $t('nav.about') }}</NuxtLink>
            </li>
            <li>
              <NuxtLink :to="getLocalizedPath('/get-involved')" class="py-1 underline hover:text-slate-600">{{ $t('nav.involved') }}</NuxtLink>
            </li>
          </ul>
          
        </div>

        <div class="space-y-1 text-sm text-slate-600">
          <h3 class="text-base font-semibold text-slate-900">Adresse</h3>
          <p>{{ contactAddress }}</p>
          <h3 class="text-base font-semibold text-slate-900">Contact</h3>
          <p>{{ phonePrimary }}</p>
        </div>

        <div class="space-y-1 text-sm text-slate-600">
          <ul class="space-y-1 text-sm text-slate-600">
            <li>
              <a :href="facebookUrl" target="_blank" rel="noopener" class="hover:underline">Facebook</a>
            </li>
            <li>
              <a :href="linkedinUrl" target="_blank" rel="noopener" class="hover:underline">LinkedIn</a>
            </li>
          </ul> 
        </div>

        <div class="space-y-2 text-sm text-slate-600">
         
          <div class="space-y-1">
            <h3 class="text-base font-semibold text-slate-900">Localisation</h3>
            <div class="w-full h-48 rounded-lg overflow-hidden border border-slate-200">
              <iframe
                :src="mapsUrl"
                width="100%"
                height="100%"
                style="border:0;"
                allowfullscreen
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
                class="w-full h-full"
              ></iframe>
            </div>
            <a
              :href="mapsLinkUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="text-xs text-slate-500 hover:text-slate-700 transition underline"
            >
              {{ contactAddress }}
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="border-t border-slate-200 bg-white/80">
      <div class="mx-auto flex max-w-6xl flex-col gap-2 px-2 py-3 text-xs text-slate-600 sm:flex-row sm:items-center sm:justify-between">
        <p>© {{ currentYear }} Theta-Ingénierie. Tous droits réservés.</p>
       
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import logoUrl from '@/assets/images/logo.png?url'
import footerBackground from '@/assets/images/footer.png?url'
import {
  contactAddress,
  contactEmail,
  mainNavigation,
  phonePrimary,
  facebookUrl,
  linkedinUrl,
} from '@/config/site'
import { computed } from 'vue'

const { locale } = useI18n()
const route = useRoute()

const currentLocale = computed(() => locale.value)
const navigation = mainNavigation
const currentYear = new Date().getFullYear()

const getLocalizedPath = (path: string) => {
  // Si on est sur la page d'accueil ou sur une page FR
  if (currentLocale.value === 'fr') {
    return path.startsWith('#') ? path : path
  } else {
    // Pour la locale EN, ajouter le préfixe /en sauf pour les ancres sur la même page
    if (path.startsWith('#')) {
      // Si on est déjà sur une page, garder l'ancre relative
      return route.path.startsWith('/en') ? path : `/en${path}`
    }
    return `/en${path}`
  }
}

const footerStyle = computed(() => ({
  background: `linear-gradient(rgba(255,255,255,0.9), rgba(255,255,255,0.95)), url(${footerBackground})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat'
}))

// URL pour l'iframe embed (avec zoom élevé)
const mapsUrl = computed(() => {
  // Coordonnées extraites du mapsLinkUrl: 14.7378072, -17.4732303
  return `https://www.google.com/maps?q=14.7378072,-17.4732303&zoom=23&output=embed`
})

// URL pour le lien vers Google Maps
const mapsLinkUrl = computed(() => {
  return `https://www.google.com/maps/place/Th%C3%AAta-Ing%C3%A9nierie:+Bureau+%C3%A9tudes+b%C3%A2timent+Senegal,+expertise+Genie+Civil/@14.7378072,-17.4732303,17z/data=!3m1!4b1!4m6!3m5!1s0xec10da6dc13344f:0x1d1839ca6738cb62!8m2!3d14.7378072!4d-17.4706554!16s%2Fg%2F11x1w80zv9?entry=ttu&g_ep=EgoyMDI1MTExNy4wIKXMDSoASAFQAw%3D%3D`
})
</script>

