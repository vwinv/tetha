<template>
<section class="relative h-[70vh] min-h-[20rem] overflow-hidden bg-slate-900">
  <div class="absolute inset-0">
    <div
      v-for="(slide, index) in slides"
      :key="index"
      class="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
      :class="index === currentSlide ? 'opacity-100' : 'opacity-0'"
      :style="{ backgroundImage: `url(${slide})` }"
    ></div>
    <div class="absolute inset-0 bg-black/70"></div>
  </div>

  <div class="relative z-10 mx-auto w-full max-w-[43.75rem] px-4 pb-8 sm:px-6 sm:pb-12 text-white flex items-end min-h-full">
    <div class="flex max-w-2xl flex-col gap-3 text-left w-full">
      <div class="flex flex-col gap-2">
        <h1 class="text-xl sm:text-2xl md:text-3xl font-bold uppercase tracking-tight leading-tight">
          {{ $t('hero.subtitle') }}
        </h1>
        <span class="block text-sm sm:text-base md:text-lg leading-relaxed text-white/85">
          {{ $t('hero.description') }}
        </span>
      </div>

      <div class="flex items-center gap-2">
        <button
          v-for="(slide, index) in slides"
          :key="`dot-${index}`"
          type="button"
          class="h-1 rounded-full transition-all duration-500"
          :class="index === currentSlide ? 'w-8 bg-[#5C01C2]' : 'w-2 bg-white/50 hover:bg-white/80'"
          @click="goToSlide(index)"
          aria-label="Changer de slide"
        ></button>
      </div>
    </div>
  </div>
</section>
</template>

<script setup lang="ts">
import heroBg from '@/assets/images/bg.png'
import heroSlideTwo from '@/assets/images/bg1.jpg'
import heroSlideThree from '@/assets/images/bg2.jpg'

import { onBeforeUnmount, onMounted, ref } from 'vue'

const slides = [heroBg, heroSlideTwo, heroSlideThree]
const currentSlide = ref(0)

let intervalId: ReturnType<typeof setInterval> | undefined

const goToSlide = (index: number) => {
  currentSlide.value = index
  restartInterval()
}

const restartInterval = () => {
  if (intervalId) clearInterval(intervalId)
  intervalId = setInterval(() => {
    currentSlide.value = (currentSlide.value + 1) % slides.length
  }, 5000)
}

onMounted(() => {
  restartInterval()
})

onBeforeUnmount(() => {
  if (intervalId) clearInterval(intervalId)
})
</script>

