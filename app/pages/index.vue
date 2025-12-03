<template>
  <div>
    <HeroSection />

    <div
      class="fixed inset-0 -z-20 h-screen"
      :style="pageBackgroundStyle"
    ></div>
    <div class="fixed inset-0 -z-10 h-screen bg-white/20 pointer-events-none"></div>

    <section class="relative py-10" id="who">
      <div class="relative mx-auto w-full max-w-[1100px] px-2 sm:px-3 lg:px-4" id="who">
        <div class="mb-6 text-center text-slate-900">
          <h2 class="text-2xl font-extrabold">{{ $t('founder.title') }}</h2>
        </div>
        <div class="grid gap-5 overflow-hidden bg-white shadow-2xl lg:grid-cols-6">
          <div class="relative order-last h-[60vh] sm:h-[110vh] md:h-[120vh] lg:h-[210px] lg:order-first lg:h-full lg:col-span-2">
            <img :src="founderImage" :alt="$t('founder.title')" class="object-cover w-full h-full" loading="lazy" />
          </div>
          <div class="flex flex-col justify-center gap-3.5 p-5 lg:col-span-4">
            <h3 class="text-xl font-bold text-slate-900">
              {{ $t('founder.name') }}
            </h3>
            <div class="h-0.5 w-8 rounded-full bg-black"></div>
            <p class="text-base leading-relaxed text-slate-600 whitespace-pre-line text-justify">
              {{ $t('founder.description') }}
            </p>
            <div class="mt-3 flex justify-end">
              <NuxtLink
                :to="getLocalizedPath('/founder')"
                class="inline-flex items-center rounded-full bg-[#5C01C2] px-4 py-1.5 text-sm font-semibold text-white shadow-md transition hover:opacity-90"
              >
                {{ $t('founder.seeMore') }}
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="relative py-10" id="services">
      <div class="mx-auto w-full max-w-[1000px] px-2 sm:px-3 lg:px-4">
        <div class="mb-7 text-center">
          <h2 class="text-xl font-extrabold text-slate-900">{{ $t('services.title') }}</h2>
          
        </div>
        <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <div
            v-for="service in services"
            :key="service.title"
            class="flex min-h-[210px] flex-col overflow-hidden bg-white shadow-xl transition hover:-translate-y-2 hover:shadow-2xl"
          >
            <img 
              :src="service.image" 
              :alt="service.title" 
              class="h-32 w-full object-cover" 
              loading="lazy" 
              decoding="async"
              referrerpolicy="no-referrer-when-downgrade"
            />
            <div class="flex flex-1 flex-col gap-2 p-4">
              <h3 class="text-lg font-semibold text-slate-900">
                {{ service.title }}
              </h3>
              <p class="text-sm text-slate-600 text-justify">
                {{ service.description }}
              </p>
            </div>
          </div>
        </div>
        <div class="mt-6 flex justify-center">
          <NuxtLink
            :to="getLocalizedPath('/allservices')"
            class="inline-flex items-center rounded-full bg-[#5C01C2] px-7 py-2 text-base font-semibold text-white shadow-lg transition hover:opacity-90"
          >
            {{ $t('services.seeMore') }}
          </NuxtLink>
        </div>
      </div>
    </section>

    <section class="relative py-10" id="about">
      <div class="relative mx-auto w-full max-w-[1100px] px-2 sm:px-3 lg:px-4" id="about">
        <div class="mb-6 text-center text-slate-900">
          <h2 class="text-2xl font-extrabold">{{ $t('about.title') }}</h2>
        </div>
        <div class="grid gap-5  overflow-hidden bg-white shadow-2xl lg:grid-cols-6">
          <div class="relative order-last h-[210px] lg:order-first lg:h-full lg:col-span-2">
            <img 
              :src="aboutImage" 
              :alt="$t('about.title')" 
              class="object-cover w-full h-full" 
              loading="lazy" 
              decoding="async"
              referrerpolicy="no-referrer-when-downgrade"
            />
          </div>
          <div class="flex flex-col justify-center gap-3.5 p-5 lg:col-span-4">
            <h3 class="text-xl font-bold text-slate-900">
              {{ $t('about.title') }}
            </h3>
            <div class="h-0.5 w-8 rounded-full bg-black"></div>
            <p class="text-base leading-relaxed text-slate-600 whitespace-pre-line text-justify">
              {{ $t('about.description') }}
            </p>
            <div class="mt-3 flex justify-end">
              <NuxtLink
                :to="getLocalizedPath('/about')"
                class="inline-flex items-center rounded-full bg-[#5C01C2] px-4 py-1.5 text-sm font-semibold text-white shadow-md transition hover:opacity-90"
              >
                {{ $t('about.seeMore') }}
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="py-10">
      <div class="mx-auto w-full max-w-[1100px] px-2 sm:px-3 lg:px-4 text-center">
        <h2 class="text-xl font-bold text-slate-900">{{ $t('partners.title') }}</h2>
        <p class="mt-2 text-lg text-slate-600">{{ $t('partners.subtitle') }}</p>
        <div class="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center">
          <div
            v-for="logo in partnerImages"
            :key="logo"
            class="flex h-24 w-40 items-center justify-center rounded-md bg-white/80 shadow-lg backdrop-blur transition hover:-translate-y-1 hover:shadow-2xl"
          >
              <img :src="logo" :alt="$t('partners.title')" class="max-h-16 w-auto object-contain" loading="lazy" />
          </div>
        </div>
      </div>
    </section>

    

    
  </div>
</template>
<script setup lang="ts">
import HeroSection from '@/components/HeroSection.vue'
import founderImage from '@/assets/images/fondatrice.jpeg'
import aboutImage from '@/assets/images/who.png'
import serviceImage1 from '@/assets/images/service1.png'
import serviceImage2 from '@/assets/images/service2.png'
import serviceImage3 from '@/assets/images/service3.png'
import serviceImage4 from '@/assets/images/service4.png'
import partner1 from '@/assets/images/partenaire1.png'
import partner2 from '@/assets/images/partenaire2.png'
import partner3 from '@/assets/images/partenaire3.png'
import partner4 from '@/assets/images/partenaire4.png'
import partner5 from '@/assets/images/partenaire5.png'
import partner6 from '@/assets/images/partenaire6.png'
import partner7 from '@/assets/images/partenaire7.png'
import partner8 from '@/assets/images/partenaire8.png'
import partner9 from '@/assets/images/partenaire9.png'
import { partnersLogos } from '@/config/site'
import indexBg from '@/assets/images/fond.png?url'
import { computed } from 'vue'

const pageBackgroundStyle = computed(() => ({
  backgroundImage: `url(${indexBg})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundAttachment: 'fixed'
}))

const { tm, locale } = useI18n()

const getLocalizedPath = (path: string) => {
  if (locale.value === 'fr') {
    return path
  } else {
    return `/en${path}`
  }
}

const serviceImages = [serviceImage1, serviceImage2, serviceImage3, serviceImage4]

const partnerImageMap: Record<string, string> = {
  'partenaire1.png': partner1,
  'partenaire2.png': partner2,
  'partenaire3.png': partner3,
  'partenaire4.png': partner4,
  'partenaire5.png': partner5,
  'partenaire6.png': partner6,
  'partenaire7.png': partner7,
  'partenaire8.png': partner8,
  'partenaire9.png': partner9
}

interface ServiceItem {
  title: string
  description: string
}

function extractSource(node: any) {
  return node?.loc?.source || node?.b?.s || "";
}

// Sur la page d'accueil, on affiche seulement les 4 premiers services
const services = computed(() => {
  try {
    const servicesItems = toRaw(tm('services.items') as unknown as ServiceItem[])

    if (Array.isArray(servicesItems)) {
      return servicesItems.slice(0, 4).map((service: ServiceItem, idx: number) =>  ({
        title: extractSource(service.title),
        description: extractSource(service.description),
        image: serviceImages[idx] ?? serviceImages[serviceImages.length - 1]
      }));
    }
  } catch (e) {
    console.warn('Could not load services from translations', e)
  }
  return []
})

//console.log(services);


const partnerImages = partnersLogos
  .map((name) => partnerImageMap[name])
  .filter((logo): logo is string => Boolean(logo))

  
</script>
