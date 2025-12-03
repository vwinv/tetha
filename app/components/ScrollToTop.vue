<template>
  <button
    v-show="isVisible"
    @click="scrollToTop"
    class="fixed left-4 bottom-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-[#5C01C2] text-white shadow-lg transition-all duration-300 hover:bg-[#4A01A0] hover:scale-110 hover:shadow-xl"
    :class="{ 'opacity-0 pointer-events-none': !isVisible, 'opacity-100': isVisible }"
    aria-label="Remonter en haut de la page"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      stroke-width="2"
    >
      <path stroke-linecap="round" stroke-linejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
    </svg>
  </button>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const isVisible = ref(false)

const handleScroll = () => {
  // Afficher le bouton quand on a scrollé de plus de 300px
  isVisible.value = window.scrollY > 300
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  // Vérifier la position initiale
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

