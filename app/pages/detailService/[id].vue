<template>
  <div>
    <div
      class="fixed inset-0 -z-20 h-screen"
      :style="pageBackgroundStyle"
    ></div>
    <div class="fixed inset-0 -z-10 h-screen bg-white/20 pointer-events-none"></div>

    <section class="relative py-8 sm:py-10 lg:py-12 overflow-hidden" v-if="service">
      <div class="absolute inset-0 bg-[#5C01C2]/50"></div>
      <div class="relative z-10 flex flex-col items-center justify-center min-h-[50px]">
        <!-- Bouton retour au niveau du titre -->
        <div class="absolute top-4 left-4 sm:top-6 sm:left-6">
          <NuxtLink 
            to="/allservices"
            class="inline-flex items-center text-white hover:text-white/80 transition"
          >
            <svg class="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
            {{ $t('services.title') }}
          </NuxtLink>
        </div>
        <div class="text-center px-4 sm:px-6">
          <h1 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">{{ service.title }}</h1>
        </div>
      </div>
    </section>
    
    <section class="relative h-[50px] sm:h-[250px] lg:h-[50px] overflow-hidden" v-else>
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

    <section class="relative py-10" v-if="service">
      <div class="relative mx-auto w-full max-w-[900px] px-2 sm:px-3 lg:px-4">
        <div class=" overflow-hidden bg-white shadow-2xl">
          <!-- Photo en haut -->
          <div class="relative w-full h-[180px] sm:h-[220px] lg:h-[260px]">
            <img :src="service.image" :alt="service.title" class="object-cover w-full h-full" loading="eager" fetchpriority="high" />
          </div>
          
          <!-- Contenu -->
          <div class="flex flex-col gap-4 p-6 lg:p-8 px-16 lg:px-32">
            <!-- Description avec soulignement -->
            <div>
              <p class="text-lg lg:text-xl leading-relaxed text-slate-600 font-bold text-justify">
                {{ service.description }}
              </p>
              <div class="h-0.5 w-12 rounded-full bg-[#5C01C2] mt-3"></div>
            </div>
            
            <!-- service.text -->
            <p v-if="service.text" class="text-base lg:text-lg leading-relaxed text-slate-700 whitespace-pre-line text-justify">
              {{ service.text }}
            </p>
            
            <!-- service.list avec des points -->
            <ul v-if="service.list && service.list.length > 0" class="space-y-2 text-base lg:text-lg leading-relaxed text-slate-700 list-disc list-inside pl-10">
              <li v-for="(item, index) in service.list" :key="index">{{ item }}</li>
            </ul>
            
            <!-- text2 -->
            <p v-if="service.text2" class="text-base lg:text-lg leading-relaxed text-slate-700 whitespace-pre-line text-justify">
              {{ service.text2 }}
            </p>
            
           
          </div>
        </div>
      </div>
    </section>

    <section class="relative py-10" v-else>
      <div class="relative mx-auto w-full max-w-[1100px] px-2 sm:px-3 lg:px-4 text-center">
        <p class="text-lg text-slate-600">{{ $t('services.notFound') }}</p>
        <NuxtLink 
          to="/allservices"
          class="inline-flex items-center justify-center rounded-full bg-[#5C01C2] px-6 py-3 text-white font-semibold hover:opacity-90 transition mt-4"
        >
          {{ $t('services.title') }}
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { toRaw } from 'vue'
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

const route = useRoute()
const { tm } = useI18n()

const serviceId = computed(() => {
  const id = route.params.id
  return typeof id === 'string' ? parseInt(id, 10) : Number(id)
})

const serviceImages = [serviceImage1, serviceImage2, serviceImage3, serviceImage4, serviceImage5, serviceImage6, serviceImage7, serviceImage8]

interface ServiceItem {
  id?: number
  title: string
  description: string
  text?: string
  list?: string[]
  text2?: string
}

function extractSource(node: any) {
  return node?.loc?.source || node?.b?.s || "";
}

const service = computed(() => {
  try {
    const servicesItems = toRaw(tm('services.items') as unknown as ServiceItem[])
 
    if (Array.isArray(servicesItems)) {
      const foundService = servicesItems.find((s: ServiceItem, idx: number) => {
        const serviceIdValue = s.id ?? idx + 1
        return serviceIdValue === serviceId.value
      })
      
      if (foundService) {
       
        const idx = servicesItems.indexOf(foundService)
        const serviceData: any = foundService
        
        // Extraire la liste si elle existe
        let list: string[] = []
        if (serviceData.list && Array.isArray(serviceData.list)) {
          
          list = serviceData.list.map((item: any) => extractSource(item) )
        }
        
        return {
          id: foundService.id ?? idx + 1,
          title: extractSource(foundService.title),
          description: extractSource(foundService.description),
          text: serviceData.text ? extractSource(serviceData.text) : '',
          list: list,
          text2: serviceData.text2 ? extractSource(serviceData.text2) : '',
          image: serviceImages[idx] ?? serviceImages[serviceImages.length - 1]
        }
      }
    }
  } catch (e) {
    console.warn('Could not load service from translations', e)
  }
  return null
})

const pageBackgroundStyle = computed(() => ({
  backgroundImage: `url(${indexBg})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundAttachment: 'fixed'
}))
</script>

