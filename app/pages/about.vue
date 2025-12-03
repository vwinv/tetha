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
          <h1 class="text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-2">{{ $t('about.title') }}</h1>
         </div>
      </div>
    </section>

    <section class="relative py-10">
      <div class="relative mx-auto w-full max-w-[1100px] px-2 sm:px-3 lg:px-4">
       
        <div class="grid gap-5 rounded-3xl overflow-hidden bg-white shadow-2xl lg:grid-cols-6">
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
            <h2 class="text-xl font-bold text-slate-900">
              {{ $t('about.title') }}
            </h2>
            <div class="h-0.5 w-8 rounded-full bg-black"></div>
            <p class="text-base leading-relaxed text-slate-600 whitespace-pre-line">
              {{ $t('about.description') }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="relative py-10">
      <div class="relative mx-auto w-full max-w-[1100px] px-2 sm:px-3 lg:px-4">
        <div class="text-center mb-6">
          <h2 class="text-2xl font-extrabold text-slate-900 mb-3">{{ $t('values.title') }}</h2>
          <div class="flex justify-center">
            <div class="h-0.5 w-12 rounded-full bg-black"></div>
          </div>
        </div>
        <div class="max-w-3xl mx-auto mb-10">
          <p class="text-base leading-relaxed text-slate-600 text-center">
            {{ $t('values.text') }}
          </p>
        </div>

        <div class="flex flex-col md:flex-row items-center justify-center gap-1 relative">
          <template v-for="(block, index) in valuesBlocks" :key="index">
            <div
              class="flex flex-col items-center gap-3 p-6 rounded-2xl shadow-lg w-full md:w-64 relative z-10"
              :class="index === 1 ? 'bg-[#5C01C2] text-white' : 'bg-white text-slate-900 border-2'"
            >
              <div
                class="flex items-center justify-center w-12 h-12 rounded-full border-2 font-bold text-lg"
                :class="index === 1 ? 'border-white text-white' : 'border-[#5C01C2] text-slate-900'"
              >
                {{ index + 1 }}
              </div>
              <h3 class="text-lg font-bold text-center">
                {{ block.title }}
              </h3>
              <p
                class="text-sm leading-relaxed text-center"
                :class="index === 1 ? 'text-white/90' : 'text-slate-600'"
              >
                {{ block.description }}
              </p>
            </div>
            <div
              v-if="index < valuesBlocks.length - 1"
              class="hidden md:flex items-center justify-center -mx-4 relative z-20">
              <div class="w-8 h-8 rounded-full bg-slate-300 flex items-center justify-center shadow-md">
                <svg class="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </template>
        </div>
      </div>
    </section>

    <section class="relative py-10">
      <div class="relative mx-auto w-full max-w-[1100px] px-2 sm:px-3 lg:px-4">
        <div class="mb-6">
          <h2 class="text-2xl font-extrabold text-slate-900 mb-2">{{ $t('gallery.title') }}</h2>
          <div class="h-0.5 w-8 rounded-full bg-black"></div>
        </div>

        <!-- Première rangée: photos 1-2 -->
        <div class="grid gap-3 lg:gap-4 w-full mb-3 lg:mb-4" style="grid-template-columns: auto 1fr;">
          <template v-for="(photo, index) in galleryPhotos" :key="index">
            <div
              v-if="index <= 1"
              :class="[
                'relative rounded-2xl overflow-hidden group cursor-pointer',
                index === 0 ? 'h-64 sm:h-72 lg:h-80 w-80 sm:w-96 lg:w-[20rem]' : 'h-64 sm:h-72 lg:h-80'
              ]"
            >
              <img
                :src="photoImages[index]"
                :alt="photo.title"
                class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                loading="lazy"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end items-start gap-3 p-4">
                <h3 class="text-lg sm:text-xl font-bold text-white text-left">
                  {{ photo.title }}
                </h3>
                <p v-if="photo.description" class="text-sm sm:text-base text-white/90 text-left whitespace-pre-line">
                  {{ photo.description }}
                </p>
              </div>
            </div>
          </template>
        </div>
        
        <!-- Deuxième rangée: photos 3-4 -->
        <div v-if="galleryPhotos.length > 3" class="grid gap-3 lg:gap-4 w-full mb-3 lg:mb-4" style="grid-template-columns: auto 1fr;">
          <div
            v-for="(photo, index) in galleryPhotos.slice(2, 4)"
            :key="index + 2"
            :class="[
              'relative rounded-2xl overflow-hidden group cursor-pointer',
              index === 0 ? 'h-64 sm:h-72 lg:h-80 w-80 sm:w-96 lg:w-[28rem]' : 'h-64 sm:h-72 lg:h-80'
            ]"
          >
            <img
              :src="photoImages[index + 2]"
              :alt="photo.title"
              class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              loading="lazy"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end items-start gap-3 p-4">
              <h3 class="text-lg sm:text-xl font-bold text-white text-left">
                {{ photo.title }}
              </h3>
              <p v-if="photo.description" class="text-sm sm:text-base text-white/90 text-left whitespace-pre-line">
                {{ photo.description }}
              </p>
            </div>
          </div>
        </div>
        
        <!-- Rangée photos 5-6: grille 2 colonnes standard -->
        <div v-if="galleryPhotos.length > 4" class="grid grid-cols-2 gap-3 lg:gap-4 w-full mb-3 lg:mb-4">
          <div
            v-for="(photo, index) in galleryPhotos.slice(4, 6)"
            :key="index + 4"
            class="relative rounded-2xl overflow-hidden group cursor-pointer h-56 sm:h-64 lg:h-72"
          >
            <img
              :src="photoImages[index + 4]"
              :alt="photo.title"
              class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              loading="lazy"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end items-start gap-3 p-4">
              <h3 class="text-lg sm:text-xl font-bold text-white text-left">
                {{ photo.title }}
              </h3>
              <p v-if="photo.description" class="text-sm sm:text-base text-white/90 whitespace-pre-line text-justify">
                {{ photo.description }}
              </p>
            </div>
          </div>
        </div>
        
        <!-- Dernière photo: pleine largeur -->
        <div
          v-if="galleryPhotos.length > 6 && galleryPhotos[6]"
          class="relative rounded-2xl overflow-hidden group cursor-pointer h-64 sm:h-72 lg:h-80 w-full"
        >
          <img
            :src="photoImages[6]"
            :alt="galleryPhotos[6]?.title"
            class=" object-cover transition-transform duration-300 group-hover:scale-110"
            loading="lazy"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end items-start gap-3 p-4">
            <h3 class="text-lg sm:text-xl font-bold text-white text-left">
              {{ galleryPhotos[6]?.title }}
            </h3>
            <p v-if="galleryPhotos[6]?.description" class="text-sm sm:text-base text-white/90 text-left whitespace-pre-line">
              {{ galleryPhotos[6]?.description }}
            </p>
          </div>
        </div>
      </div>
    </section>

    
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import aboutImage from '@/assets/images/who.png'
import photo from '@/assets/images/photo.png'
import photo1 from '@/assets/images/photo1.jpeg'
import photo2 from '@/assets/images/photo2.jpg'
import photo3 from '@/assets/images/photo3.jpeg'
import photo4 from '@/assets/images/photo4.jpg'
import photo6 from '@/assets/images/photo6.png'
import photo7 from '@/assets/images/photo7.jpeg'
import photo8 from '@/assets/images/photo8.jpeg'
import photo9 from '@/assets/images/photo9.png'
import indexBg from '@/assets/images/fond.png?url'
import headerImage from '@/assets/images/fondHeagerPage.png?url'

const { tm } = useI18n()

const photoImages = [photo1, photo2, photo3, photo4, photo7, photo8, photo9]

interface ValuesBlock {
  title: string
  description: string
}

interface GalleryPhoto {
  title: string
  description?: string
  image: string
}

const valuesBlocks = computed(() => {
  try {
    const blocks = toRaw( tm('values.blocks') as unknown as ValuesBlock[])
    console.log(blocks);
    if (Array.isArray(blocks)) {
      return blocks.map((block: ValuesBlock, idx: number) => ({
        title: extractSource(block.title),
        description: extractSource(block.description),
      }));
    }
  } catch (e) {
    console.warn('Could not load values blocks from translations', e)
  }
 

  return []
})

function extractSource(node: any) {
  return node?.loc?.source || node?.b?.s || "";
}

const galleryPhotos = computed(() => {
  try {
    const photos = toRaw(tm('gallery.photos') as unknown as GalleryPhoto[])
    if (Array.isArray(photos)) {
      return photos.map((photo: GalleryPhoto, idx: number) => ({
        title: extractSource(photo.title),
        description: photo.description ? extractSource(photo.description) : '',
        image: photoImages[idx] ?? photoImages[photoImages.length - 1]
      }));
    }
  } catch (e) {
    console.warn('Could not load gallery photos from translations', e)
  }
  return []
})

const pageBackgroundStyle = computed(() => ({
  backgroundImage: `url(${indexBg})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundAttachment: 'fixed'
}))
</script>

