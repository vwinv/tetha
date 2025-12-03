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
          <h1 class="text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-2">{{ $t('services.title') }}</h1>
         </div>
      </div>
    </section>

    <section class="relative py-10">
      <div class="mx-auto w-full max-w-[1000px] px-2 sm:px-3 lg:px-4">
        <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <div
            v-for="service in services"
            :key="service.title"
            class="flex min-h-[210px] flex-col overflow-hidden bg-white shadow-xl transition hover:-translate-y-2 hover:shadow-2xl"
          >
            <img :src="service.image" :alt="service.title" class="h-32 w-full object-cover" loading="lazy" />
            <div class="flex flex-1 flex-col gap-2 p-4">
              <h3 class="text-xl font-semibold text-slate-900">
                {{ service.title }}
              </h3>
              <p class="text-base text-slate-600">
                {{ service.description }}
              </p>
              <div class="mt-auto pt-2">
                <NuxtLink 
                  :to="`/detailService/${service.id}`"
                  class="inline-flex items-center justify-center rounded-full border-2 border-[#5C01C2] bg-white px-4 py-2 text-sm font-semibold text-[#5C01C2] transition hover:bg-[#5C01C2] hover:text-white"
                >
                  {{ $t('services.seeMore') }}
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>


  </div>
</template>

<script setup lang="ts">
import { computed, toRaw } from 'vue'
import serviceImage1 from '@/assets/images/service1.png'
import serviceImage2 from '@/assets/images/service2.png'
import serviceImage3 from '@/assets/images/service3.png'
import serviceImage4 from '@/assets/images/service4.png'
import serviceImage5 from '@/assets/images/service5.png'
import serviceImage6 from '@/assets/images/service6.png'
import serviceImage7 from '@/assets/images/service7.png'
import serviceImage8 from '@/assets/images/service8.png'
import indexBg from '@/assets/images/fond.png?url'
import headerImage from '@/assets/images/fondHeagerPage.png?url'

const pageBackgroundStyle = computed(() => ({
  backgroundImage: `url(${indexBg})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundAttachment: 'fixed'
}))

const { tm, locale } = useI18n()

const serviceImages = [serviceImage1, serviceImage2, serviceImage3, serviceImage4, serviceImage5, serviceImage6, serviceImage7, serviceImage8]

interface ServiceItem {
  id?: number
  title: string
  description: string
}

function extractSource(node: any) {
  return node?.loc?.source || node?.b?.s || "";
}

const services = computed(() => {
  try {
    const servicesItems = toRaw(tm('services.items') as unknown as ServiceItem[])
   
    if (Array.isArray(servicesItems)) {
      
      return servicesItems.map((service: ServiceItem, idx: number) => ({
        id: service.id ?? idx + 1,
        title: extractSource(service.title),
        description: extractSource(service.description),
        image: serviceImages[idx] ?? serviceImages[serviceImages.length - 1]
      }));
    }
  } catch (e) {
    console.warn('Could not load services from translations', e)
  }
  // Fallback: retourner un tableau vide si les traductions ne sont pas disponibles
  return []
})
</script>

