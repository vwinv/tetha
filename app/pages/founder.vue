<template>
  <div>
    <!-- Fond général -->
    <div
      class="fixed inset-0 -z-20 h-screen"
      :style="pageBackgroundStyle"
    ></div>
    <div class="fixed inset-0 -z-10 h-screen bg-white/20 pointer-events-none"></div>

    <!-- Bandeau haut -->
    <section class="relative h-[200px] sm:h-[250px] lg:h-[150px] overflow-hidden">
      <div
        class="absolute inset-0 bg-cover bg-center"
        :style="{ backgroundImage: `url(${headerImage})` }"
      ></div>
      <div class="absolute inset-0 bg-[#5C01C2]/60"></div>
      <div class="relative z-10 flex items-center justify-center h-full">
        <div class="text-center text-white px-2">
          <h1 class="text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-2">
            {{ $t('founder.title') }}
          </h1>
        </div>
      </div>
    </section>

    <!-- Contenu principal -->
    <section class="relative py-10">
      <div class="relative mx-auto w-full max-w-[1100px] px-2 sm:px-3 lg:px-4">
        <!-- Bloc principal : photo + description1 + description2 -->
        <div class="bg-white rounded-3xl shadow-2xl overflow-hidden mb-10 p-6 lg:p-10">
          <!-- Photo + description1 côte à côte -->
          <div class="grid gap-6 lg:gap-8 lg:grid-cols-6 mb-6 lg:mb-8">
            <div class="relative order-last h-[320px] sm:h-[420px] lg:order-first lg:h-full lg:col-span-2">
              <img 
                :src="founderImage" 
                :alt="$t('founder.title')" 
                class="object-cover w-full h-full rounded-2xl" 
                loading="lazy" 
                decoding="async"
                referrerpolicy="no-referrer-when-downgrade"
              />
            </div>
            <div class="flex flex-col justify-center gap-3.5 lg:col-span-4">
              <h2 class="text-xl font-bold text-slate-900 mb-3">
                {{ $t('founder.name') }}
              </h2>
              <div class="h-0.5 w-8 rounded-full bg-black mb-4"></div>
              <p class="text-base leading-relaxed text-slate-600 whitespace-pre-line text-justify">
                {{ $t('founder.description1') }}
              </p>
            </div>
          </div>
          <!-- Description2 en bas du même bloc -->
          <div class="pt-6 lg:pt-8 border-t border-slate-200">
            <p class="text-base leading-relaxed text-slate-600 whitespace-pre-line text-justify">
              {{ $t('founder.description2') }}
            </p>
          </div>
        </div>

        <!-- Section Parcours (timeline) -->
        <div class="bg-white rounded-3xl shadow-2xl p-6 lg:p-10">
          <h2 class="text-xl font-bold text-slate-900 mb-3">
            {{ $t('founder.career.title') }}
          </h2>
          <div class="h-0.5 w-8 rounded-full bg-black mb-4"></div>
          <p class="text-base leading-relaxed text-slate-600 mb-8">
            {{ $t('founder.career.description') }}
          </p>

          <!-- Timeline du parcours -->
          <div class="relative">
            <!-- Ligne verticale -->
            <div class="absolute left-6 top-8 bottom-0 w-0.5 bg-slate-300 hidden md:block"></div>

            <div class="space-y-8">
              <div
                v-for="(item, index) in careerItems"
                :key="index"
                class="relative pl-0 md:pl-0"
              >
                <div class="flex flex-col md:flex-row gap-4">
                  <!-- Point sur la timeline -->
                  <div class="absolute left-5 w-3 h-3 rounded-full bg-[#5C01C2] border-4 border-white shadow-lg hidden md:block top-2"></div>

                  <!-- Contenu de l'élément -->
                  <div class="md:ml-12 flex-1 bg-slate-50 rounded-xl p-5 hover:shadow-md transition-shadow">
                    <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                      <div>
                        <h3 class="text-lg font-bold text-slate-900">
                          {{ item.poste }}
                        </h3>
                        <p class="text-base font-semibold text-[#5C01C2]">
                          {{ item.entreprise }}
                        </p>
                        <p v-if="item.location" class="text-xs text-slate-500 mt-1">
                          {{ item.location }}
                        </p>
                      </div>
                      <span class="text-sm font-medium text-slate-500 whitespace-nowrap">
                        {{ item.date }}
                      </span>
                    </div>
                    <p class="text-sm leading-relaxed text-slate-600 whitespace-pre-line">
                      {{ item.description }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Section Formations (timeline) -->
        <div class="bg-white rounded-3xl shadow-2xl p-6 lg:p-10 mt-10">
          <h2 class="text-xl font-bold text-slate-900 mb-3">
            {{ $t('founder.education.title') }}
          </h2>
          <div class="h-0.5 w-8 rounded-full bg-black mb-4"></div>
          <p class="text-base leading-relaxed text-slate-600 mb-8">
            {{ $t('founder.education.description') }}
          </p>

          <!-- Timeline des formations -->
          <div class="relative">
            <!-- Ligne verticale -->
            <div class="absolute left-6 top-8 bottom-0 w-0.5 bg-slate-300 hidden md:block"></div>

            <div class="space-y-6">
              <div
                v-for="(item, index) in educationItems"
                :key="index"
                class="relative pl-0 md:pl-0"
              >
                <div class="flex flex-col md:flex-row gap-4">
                  <!-- Point sur la timeline -->
                  <div class="absolute left-5 w-3 h-3 rounded-full bg-[#5C01C2] border-4 border-white shadow-lg hidden md:block top-2"></div>

                  <!-- Contenu de l'élément -->
                  <div class="md:ml-12 flex-1 bg-slate-50 rounded-xl p-6 hover:shadow-lg transition-all duration-300 border border-slate-100">
                    <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-2">
                      <div class="flex-1">
                        <h3 class="text-lg font-bold text-slate-900 mb-2">
                          {{ item.ecole }}
                        </h3>
                        <p class="text-base font-semibold text-[#5C01C2] mb-1">
                          {{ item.option }}
                        </p>
                        <p v-if="item.location" class="text-xs text-slate-500 mt-2">
                          {{ item.location }}
                        </p>
                      </div>
                      <span class="text-sm font-semibold text-slate-600 bg-slate-200 px-3 py-1 rounded-full whitespace-nowrap sm:ml-4">
                        {{ item.date }}
                      </span>
                    </div>
                    <p v-if="item.description" class="text-sm leading-relaxed text-slate-600 whitespace-pre-line mt-4 pt-4 border-t border-slate-200">
                      {{ item.description }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import founderImage from '@/assets/images/fondatrice.jpeg'
import indexBg from '@/assets/images/fond.png?url'
import headerImage from '@/assets/images/fondHeagerPage.png?url'

const { tm } = useI18n()

const pageBackgroundStyle = computed(() => ({
  backgroundImage: `url(${indexBg})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundAttachment: 'fixed'
}))

interface CareerItem {
  poste: string
  entreprise: string
  date: string
  location?: string
  description: string
}

interface EducationItem {
  ecole: string
  option: string
  date: string
  location?: string
  description?: string
}

function extractSource(node: any) {
  return node?.loc?.source || node?.b?.s || ''
}

const careerItems = computed(() => {
  try {
    const items = toRaw(tm('founder.career.items') as unknown as CareerItem[])
    if (Array.isArray(items)) {
      return items
        .filter((item: CareerItem) => item.poste && item.entreprise)
        .map((item: CareerItem) => ({
          poste: extractSource(item.poste),
          entreprise: extractSource(item.entreprise),
          date: extractSource(item.date),
          location: item.location ? extractSource(item.location) : undefined,
          description: extractSource(item.description)
        }))
    }
  } catch (e) {
    console.warn('Could not load career items from translations', e)
  }
  return []
})

const educationItems = computed(() => {
  try {
    const items = toRaw(tm('founder.education.items') as unknown as EducationItem[])
    if (Array.isArray(items)) {
      return items
        .filter((item: EducationItem) => item.ecole && item.option)
        .map((item: EducationItem) => ({
          ecole: extractSource(item.ecole),
          option: extractSource(item.option),
          date: extractSource(item.date),
          location: item.location ? extractSource(item.location) : undefined,
          description: item.description ? extractSource(item.description) : undefined
        }))
    }
  } catch (e) {
    console.warn('Could not load education items from translations', e)
  }
  return []
})
</script>

