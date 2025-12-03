<template>
  <header class="w-full bg-white text-slate-900 border-b border-slate-200 py-0.5">
    <div class="w-full px-3 sm:px-4 lg:px-6 h-12 flex items-center justify-between">
      <NuxtLink :to="getLocalizedPath('/')" class="flex items-center ml-2">
        <img :src="logoUrl" alt="Logo" class="h-10 w-auto sm:h-12" loading="eager" fetchpriority="high" />
      </NuxtLink>

      <nav class="hidden md:flex items-center text-base font-semibold gap-6">
        <NuxtLink :to="getLocalizedPath('/allservices')" class="hover:text-slate-600">{{ $t('nav.services') }}</NuxtLink>
        <NuxtLink :to="getLocalizedPath('/about')" class="hover:text-slate-600">{{ $t('nav.about') }}</NuxtLink>
        <NuxtLink :to="getLocalizedPath('/get-involved')" class="hover:text-slate-600">{{ $t('nav.involved') }}</NuxtLink>
        <div class="inline-flex items-center rounded-full ring-1 ring-slate-200 overflow-hidden">
          <button 
            type="button" 
            :class="currentLocale === 'fr' ? 'px-1.5 py-0.5 hover:bg-slate-50 font-semibold text-sm bg-slate-100' : 'px-1.5 py-0.5 hover:bg-slate-50 text-sm'"
            @click="switchLocale('fr')"
          >
            FR
          </button>
          <span class="px-0.5 select-none">|</span>
          <button 
            type="button" 
            :class="currentLocale === 'en' ? 'px-1.5 py-0.5 hover:bg-slate-50 font-semibold text-sm bg-slate-100' : 'px-1.5 py-0.5 hover:bg-slate-50 text-sm'"
            @click="switchLocale('en')"
          >
            EN
          </button>
        </div>
        <NuxtLink :to="`${getLocalizedPath('/contact')}?accordion=2`" class="inline-flex items-center rounded-full bg-[#5C01C2] text-white px-4 py-2 text-sm hover:opacity-95">
          {{ $t('nav.contact') }}
        </NuxtLink>
      </nav>

      <!-- Mobile menu button -->
      <button
        type="button"
        class="md:hidden inline-flex items-center justify-center h-8 w-8 rounded-md hover:bg-slate-100"
        aria-label="Open menu"
        @click="isOpen = !isOpen"
      >
        <span v-if="!isOpen" class="i-heroicons-bars-3 w-5 h-5">≡</span>
        <span v-else class="i-heroicons-x-mark w-5 h-5">×</span>
      </button>
    </div>

    <!-- Mobile panel -->
    <div v-if="isOpen" class="md:hidden border-t border-slate-200">
      <nav class="mx-auto max-w-6xl px-2 py-2 grid gap-2 text-sm font-medium">
        <NuxtLink :to="getLocalizedPath('/#services')" class="py-1 hover:text-slate-600" @click="close()">{{ $t('nav.services') }}</NuxtLink>
        <NuxtLink :to="getLocalizedPath('/#about')" class="py-1 hover:text-slate-600" @click="close()">{{ $t('nav.about') }}</NuxtLink>
        <NuxtLink :to="getLocalizedPath('/get-involved')" class="py-1 hover:text-slate-600" @click="close()">{{ $t('nav.involved') }}</NuxtLink>
         <div class="flex items-center gap-1.5 py-1">
          <div class="inline-flex items-center rounded-full ring-1 ring-slate-200 overflow-hidden">
            <button 
              type="button" 
              :class="currentLocale === 'fr' ? 'px-1.5 py-0.5 hover:bg-slate-50 font-semibold text-sm bg-slate-100' : 'px-1.5 py-0.5 hover:bg-slate-50 text-sm'"
              @click="switchLocale('fr'); close()"
            >
              FR
            </button>
            <span class="px-0.5 select-none">|</span>
            <button 
              type="button" 
              :class="currentLocale === 'en' ? 'px-1.5 py-0.5 hover:bg-slate-50 font-semibold text-sm bg-slate-100' : 'px-1.5 py-0.5 hover:bg-slate-50 text-sm'"
              @click="switchLocale('en'); close()"
            >
              EN
            </button>
          </div>
          <NuxtLink :to="`${getLocalizedPath('/contact')}?accordion=2`" class="inline-flex items-center rounded-full bg-[#5C01C2] text-white px-2 py-1 text-sm hover:opacity-95" @click="close()">
            {{ $t('nav.contact') }}
          </NuxtLink>
        </div>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
import logoUrl from '@/assets/images/logo.png?url'

const { locale, setLocale } = useI18n()
const router = useRouter()
const route = useRoute()
const isOpen = ref(false)

const currentLocale = computed(() => locale.value)

function close() { 
  isOpen.value = false 
}

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

const switchLocale = async (newLocale: 'fr' | 'en') => {
  // Obtenir le chemin actuel
  let currentPath = route.path
  const currentHash = route.hash || ''
  
  // Normaliser le chemin : enlever le préfixe /en si présent
  if (currentPath.startsWith('/en')) {
    currentPath = currentPath.replace(/^\/en/, '') || '/'
  }
  
  // Construire le nouveau chemin selon la nouvelle locale
  let newPath: string
  if (newLocale === 'en') {
    // Pour EN, ajouter le préfixe /en (sauf pour la page d'accueil qui devient /en)
    newPath = currentPath === '/' ? '/en' : `/en${currentPath}`
  } else {
    // Pour FR (locale par défaut), pas de préfixe
    newPath = currentPath === '/en' ? '/' : currentPath
  }
  
  // Changer la locale et naviguer
  await setLocale(newLocale)
  await router.push(newPath + currentHash)
}

// Ferme le menu sur resize >= md
function handleResize() {
  if (window.innerWidth >= 768) isOpen.value = false
}
onMounted(() => {
  window.addEventListener('resize', handleResize)
})
onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

