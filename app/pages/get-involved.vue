<template>
  <div>
    <div
      class="fixed inset-0 -z-20 h-screen"
      :style="pageBackgroundStyle"
    ></div>
    <div class="fixed inset-0 -z-10 h-screen bg-white/20 pointer-events-none"></div>

    <section class="relative h-[200px] sm:h-[250px] lg:h-[150px] overflow-hidden">
      <div
        class="absolute inset-0 bg-cover bg-center"
        :style="{ backgroundImage: `url(${headerImage})` }"
      ></div>
      <div class="absolute inset-0 bg-[#5C01C2]/60"></div>
      <div class="relative z-10 flex items-center justify-center h-full">
        <div class="text-center text-white px-2">
          <h1 class="text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-2">{{ $t('getInvolved.title') }}</h1>
        </div>
      </div>
    </section>

    <section class="relative py-10">
      <div class="relative mx-auto w-full max-w-[1100px] px-2 sm:px-3 lg:px-4">
        <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
          <div
            v-for="(block, index) in getInvolvedBlocks"
            :key="index"
            class="flex flex-col overflow-hidden rounded-md bg-white shadow-lg transition hover:-translate-y-2 hover:shadow-2xl"
          >
            <div class="relative h-48 w-full overflow-hidden">
              <img
                :src="blockImages[index]"
                :alt="block.title"
                class="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
            <div class="flex flex-1 flex-col gap-4 p-5">
              <h3 class="text-xl sm:text-2xl font-bold text-slate-900">
                {{ block.title }}
              </h3>
              <NuxtLink
                :to="getContactLink(block.title)"
                class="inline-flex items-center justify-center rounded-full bg-[#5C01C2] px-4 py-3 text-sm font-semibold text-white transition hover:opacity-90"
              >
                {{ $t('getInvolved.start') }}
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import indexBg from '@/assets/images/fond.png?url'
import headerImage from '@/assets/images/fondHeagerPage.png?url'
import serviceImage4 from '@/assets/images/service4.png'
import serviceImage7 from '@/assets/images/service7.png'
import bgImage from '@/assets/images/bg.png'
import batImage from '@/assets/images/bat.png.png'

const pageBackgroundStyle = computed(() => ({
  backgroundImage: `url(${indexBg})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundAttachment: 'fixed'
}))

const { t, locale } = useI18n()

const blockImages = [serviceImage4, serviceImage7, bgImage, batImage]

const getInvolvedBlocks = computed(() => {
  return [
    { title: t('getInvolved.careers'), image: 'service7.png' },
    { title: t('getInvolved.partnership'), image: 'bg.png' },
  ]
})

// Fonction pour obtenir le chemin localisé (comme dans SiteHeader.vue)
const getLocalizedPath = (path: string) => {
  if (locale.value === 'fr') {
    return path
  } else {
    return `/en${path}`
  }
}

// Fonction pour obtenir le lien vers la page contact avec l'accordéon approprié
const getContactLink = (title: string) => {
  const careersText = t('getInvolved.careers')
  const partnershipText = t('getInvolved.partnership')
  
  // Obtenir le chemin localisé
  const basePath = getLocalizedPath('/contact')
  
   if (title === careersText) {
    // "Carrières" → accordéon 1
    return `${basePath}?accordion=0`
  } else if (title === partnershipText) {
    // "Partenariat" → accordéon 2
    return `${basePath}?accordion=1`
  }
  
  return basePath
}
</script>

