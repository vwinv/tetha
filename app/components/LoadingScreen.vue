<template>
  <Transition
    enter-active-class="transition-opacity duration-500"
    leave-active-class="transition-opacity duration-500"
    enter-from-class="opacity-100"
    enter-to-class="opacity-100"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-if="isLoading"
      class="fixed inset-0 z-[9999] flex items-center justify-center bg-white"
    >
      <div class="flex flex-col items-center gap-4">
        <div class="relative">
          <div class="h-16 w-16 animate-spin rounded-full border-4 border-slate-200"></div>
          <div class="absolute inset-0 h-16 w-16 animate-spin rounded-full border-4 border-t-[#5C01C2]"></div>
        </div>
        <p class="text-lg font-semibold text-slate-700">Chargement...</p>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'

const isLoading = ref(true)

const checkImagesLoaded = (): Promise<void> => {
  return new Promise((resolve) => {
    let isResolved = false
    let observer: MutationObserver | null = null

    const resolved = () => {
      if (!isResolved) {
        isResolved = true
        if (observer) {
          observer.disconnect()
        }
        resolve()
      }
    }

    const checkAllImages = () => {
      if (isResolved) return

      const images = Array.from(document.querySelectorAll('img'))
      
      if (images.length === 0) {
        resolved()
        return
      }

      let loadedCount = 0
      let pendingCount = 0

      images.forEach((img) => {
        // Ignorer les images avec data-src ou loading="lazy" (lazy loading)
        if (img.hasAttribute('data-src') || img.getAttribute('loading') === 'lazy') {
          loadedCount++
          return
        }

        // Vérifier si l'image est déjà chargée
        if (img.complete && img.naturalHeight !== 0) {
          loadedCount++
        } else {
          // Image en cours de chargement
          pendingCount++
          const handleLoad = () => {
            loadedCount++
            pendingCount--
            if (!isResolved && loadedCount === images.length && pendingCount === 0) {
              resolved()
            }
          }
          img.addEventListener('load', handleLoad, { once: true })
          img.addEventListener('error', handleLoad, { once: true })
        }
      })

      // Si toutes les images sont déjà chargées
      if (!isResolved && pendingCount === 0 && loadedCount === images.length) {
        resolved()
      }
    }

    // Attendre un peu pour que le DOM soit peuplé
    setTimeout(() => {
      checkAllImages()

      // Observer pour les nouvelles images ajoutées au DOM
      observer = new MutationObserver(() => {
        if (!isResolved) {
          checkAllImages()
        }
      })

      observer.observe(document.body, {
        childList: true,
        subtree: true
      })

      // Timeout de sécurité (4 secondes)
      setTimeout(() => {
        resolved()
      }, 4000)
    }, 200)
  })
}

const checkStylesLoaded = (): Promise<void> => {
  return new Promise((resolve) => {
    // Vérifier que les feuilles de style sont chargées
    const stylesheets = Array.from(document.styleSheets)
    let loadedStyles = 0
    const totalStyles = stylesheets.length

    if (totalStyles === 0) {
      resolve()
      return
    }

    const checkComplete = () => {
      loadedStyles++
      if (loadedStyles === totalStyles) {
        resolve()
      }
    }

    stylesheets.forEach((sheet) => {
      try {
        // Si on peut accéder aux règles, la feuille de style est chargée
        if (sheet.cssRules || sheet.rules) {
          checkComplete()
        } else {
          // Sinon, attendre un peu
          setTimeout(checkComplete, 100)
        }
      } catch (e) {
        // Si on ne peut pas accéder (CORS), considérer comme chargé
        checkComplete()
      }
    })
  })
}

onMounted(() => {
  const hideLoader = async () => {
    try {
      // Attendre que le DOM soit complètement chargé
      if (document.readyState !== 'complete') {
        await new Promise((resolve) => {
          window.addEventListener('load', resolve, { once: true })
        })
      }

      // Attendre que Vue soit hydraté et que les composants soient montés
      await nextTick()
      // Attendre un peu pour que les composants enfants soient montés
      await new Promise((resolve) => setTimeout(resolve, 150))

      // Vérifier que les styles sont chargés
      await checkStylesLoaded()

      // Attendre que toutes les images soient chargées (y compris celles chargées dynamiquement)
      await checkImagesLoaded()

      // Délai supplémentaire pour s'assurer que tout est bien rendu
      await new Promise((resolve) => setTimeout(resolve, 300))

      isLoading.value = false
    } catch (error) {
      // En cas d'erreur, masquer le loader
      isLoading.value = false
    }
  }

  hideLoader()

  // Fallback de sécurité : masquer après 5 secondes maximum
  setTimeout(() => {
    isLoading.value = false
  }, 5000)
})
</script>

