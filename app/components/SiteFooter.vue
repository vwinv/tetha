<template>
  <footer
    class="relative border-t border-slate-200 text-slate-700"
    :style="footerStyle"
  >
    <div class="mx-auto max-w-6xl px-2 py-8">
      <div class="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        <div class="space-y-2">
          <NuxtLink to="/" class="inline-flex items-center gap-1">
            <img :src="logoUrl" alt="Tetha" class="h-16 w-auto" />
          </NuxtLink>
         
        </div>

        <div>
          <h3 class="text-base font-semibold text-slate-900">Navigation</h3>
          <ul class="mt-2 space-y-1 text-sm text-slate-600">
            <li>
              <NuxtLink to="/#services" class="py-1 hover:text-slate-600">{{ $t('nav.services') }}</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/#about" class="py-1 hover:text-slate-600">{{ $t('nav.about') }}</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/get-involved" class="py-1 hover:text-slate-600">{{ $t('nav.involved') }}</NuxtLink>
            </li>
          </ul>
          
        </div>

        <div class="space-y-1 text-sm text-slate-600">
          <h3 class="text-base font-semibold text-slate-900">Contact</h3>
          <p>{{ contactAddress }}</p>
          <p>
            <a :href="`mailto:${contactEmail}`" class="transition hover:text-slate-900">
              {{ contactEmail }}
            </a>
          </p>
        </div>

        <div class="space-y-2 text-sm text-slate-600">
          <div class="space-y-1">
            <h3 class="text-base font-semibold text-slate-900">Téléphone</h3>
            <p>
              <a :href="`tel:${phonePrimary}`" class="transition hover:text-slate-900">
                {{ phonePrimary }}
              </a>
            </p>
            <p>
              <a :href="`tel:${phoneSecondary}`" class="transition hover:text-slate-900">
                {{ phoneSecondary }}
              </a>
            </p>
          </div>
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
        <p>© {{ currentYear }} Tetha. Tous droits réservés.</p>
       
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
  phoneSecondary
} from '@/config/site'
import { computed } from 'vue'

const navigation = mainNavigation
const currentYear = new Date().getFullYear()

const footerStyle = computed(() => ({
  background: `linear-gradient(rgba(255,255,255,0.9), rgba(255,255,255,0.95)), url(${footerBackground})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat'
}))

const mapsUrl = computed(() => {
  const encodedAddress = encodeURIComponent(contactAddress)
  return `https://www.google.com/maps?q=${encodedAddress}&output=embed`
})

const mapsLinkUrl = computed(() => {
  const encodedAddress = encodeURIComponent(contactAddress)
  return `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`
})
</script>

