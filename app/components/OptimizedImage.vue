<template>
  <img
    ref="imgRef"
    :src="currentSrc"
    :alt="alt"
    :class="imgClass"
    :loading="loading"
    :fetchpriority="fetchpriority"
    :decoding="decoding"
    @error="handleError"
    @load="handleLoad"
    v-bind="$attrs"
  />
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue'

interface Props {
  src: string
  alt?: string
  imgClass?: string
  loading?: 'lazy' | 'eager'
  fetchpriority?: 'high' | 'low' | 'auto'
  decoding?: 'async' | 'auto' | 'sync'
  maxRetries?: number
  retryDelay?: number
}

const props = withDefaults(defineProps<Props>(), {
  alt: '',
  imgClass: '',
  loading: 'lazy',
  fetchpriority: 'auto',
  decoding: 'async',
  maxRetries: 3,
  retryDelay: 1000
})

const currentSrc = ref(props.src)
const retryCount = ref(0)
const retryTimeout = ref<ReturnType<typeof setTimeout> | null>(null)
const hasErrored = ref(false)

const handleError = (event: Event) => {
  const img = event.target as HTMLImageElement
  
  // Si on a déjà essayé plusieurs fois, on arrête
  if (retryCount.value >= props.maxRetries) {
    console.warn(`Image failed to load after ${props.maxRetries} retries:`, props.src)
    hasErrored.value = true
    return
  }

  // Retry avec cache-busting
  retryCount.value++
  const retryDelay = props.retryDelay * retryCount.value // Augmenter le délai à chaque retry
  
  console.warn(`Image loading error (attempt ${retryCount.value}/${props.maxRetries}), retrying in ${retryDelay}ms:`, props.src)
  
  // Annuler le timeout précédent s'il existe
  if (retryTimeout.value) {
    clearTimeout(retryTimeout.value)
  }
  
  retryTimeout.value = setTimeout(() => {
    // Ajouter un paramètre de cache-busting pour forcer le rechargement
    const separator = props.src.includes('?') ? '&' : '?'
    currentSrc.value = `${props.src}${separator}_retry=${retryCount.value}&_t=${Date.now()}`
  }, retryDelay)
}

const handleLoad = () => {
  // Réinitialiser le compteur en cas de succès
  if (retryCount.value > 0) {
    console.log(`Image loaded successfully after ${retryCount.value} retry(ies):`, props.src)
  }
  retryCount.value = 0
  hasErrored.value = false
  
  // Nettoyer le timeout si présent
  if (retryTimeout.value) {
    clearTimeout(retryTimeout.value)
    retryTimeout.value = null
  }
}

// Observer pour détecter quand l'image devient visible (pour les images lazy)
const imgRef = ref<HTMLImageElement | null>(null)

onMounted(() => {
  if (props.loading === 'lazy' && typeof IntersectionObserver !== 'undefined' && imgRef.value) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && hasErrored.value && retryCount.value < props.maxRetries) {
          // Réessayer si l'image devient visible après une erreur
          currentSrc.value = props.src
          retryCount.value = 0
          hasErrored.value = false
        }
      })
    }, {
      rootMargin: '50px'
    })
    
    observer.observe(imgRef.value)
    
    onUnmounted(() => {
      observer.disconnect()
    })
  }
})

onUnmounted(() => {
  if (retryTimeout.value) {
    clearTimeout(retryTimeout.value)
  }
})

// Réinitialiser si la source change
watch(() => props.src, (newSrc) => {
  if (newSrc !== currentSrc.value) {
    currentSrc.value = newSrc
    retryCount.value = 0
    hasErrored.value = false
    if (retryTimeout.value) {
      clearTimeout(retryTimeout.value)
      retryTimeout.value = null
    }
  }
})
</script>

