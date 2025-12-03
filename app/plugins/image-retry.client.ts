/**
 * Plugin pour gérer les erreurs de chargement d'images HTTP/2
 * Ajoute un retry automatique en cas d'erreur ERR_HTTP2_PROTOCOL_ERROR
 */

export default defineNuxtPlugin(() => {
  if (process.server) return

  // Fonction pour obtenir l'URL originale sans paramètres de retry
  const getOriginalSrc = (src: string): string => {
    return src.split('?')[0].split('&_retry=')[0]
  }

  // Fonction pour retry une image en cas d'erreur
  const retryImageLoad = (img: HTMLImageElement, maxRetries = 3) => {
    const retryCount = (img as any).__retryCount || 0
    
    if (retryCount >= maxRetries) {
      console.warn(`Image failed to load after ${maxRetries} retries:`, getOriginalSrc(img.src))
      return
    }

    const originalSrc = getOriginalSrc(img.src)
    const retryDelay = 500 * (retryCount + 1) // Délai progressif : 500ms, 1s, 1.5s

    console.warn(`Image loading error (attempt ${retryCount + 1}/${maxRetries}), retrying in ${retryDelay}ms:`, originalSrc)

    setTimeout(() => {
      // Cache-busting pour forcer le rechargement + forcer HTTP/1.1 si nécessaire
      const separator = originalSrc.includes('?') ? '&' : '?'
      img.src = `${originalSrc}${separator}_retry=${retryCount + 1}&_t=${Date.now()}`
      
      // Réessayer immédiatement
      img.load()
    }, retryDelay)
  }

  // Gérer les erreurs d'images existantes et futures
  const handleImageError = (event: Event) => {
    const img = event.target as HTMLImageElement
    if (!img || img.tagName !== 'IMG') return

    const retryCount = (img as any).__retryCount || 0

    // Vérifier si c'est une erreur HTTP/2 ou autre erreur réseau
    if (retryCount < 3) {
      (img as any).__retryCount = retryCount + 1
      
      // Si c'est la première erreur, réessayer immédiatement (peut être juste un problème de timing)
      if (retryCount === 0) {
        // Réessayer immédiatement une fois
        setTimeout(() => {
          const originalSrc = getOriginalSrc(img.src)
          img.src = `${originalSrc}?retry=1&t=${Date.now()}`
        }, 100)
      } else {
        retryImageLoad(img, 3)
      }
    }
  }

  // Attacher le gestionnaire d'erreur à toutes les images existantes
  const attachErrorHandlers = () => {
    document.querySelectorAll('img').forEach((img) => {
      if (!img.hasAttribute('data-retry-handler')) {
        img.setAttribute('data-retry-handler', 'true')
        img.addEventListener('error', handleImageError, { once: false })
      }
    })
  }

  // Observer pour les nouvelles images ajoutées dynamiquement
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          const element = node as Element
          // Vérifier si c'est une image
          if (element.tagName === 'IMG' && !element.hasAttribute('data-retry-handler')) {
            element.setAttribute('data-retry-handler', 'true')
            element.addEventListener('error', handleImageError, { once: false })
          }
          // Vérifier les images dans l'élément
          element.querySelectorAll?.('img').forEach((img) => {
            if (!img.hasAttribute('data-retry-handler')) {
              img.setAttribute('data-retry-handler', 'true')
              img.addEventListener('error', handleImageError, { once: false })
            }
          })
        }
      })
    })
  })

  // Initialisation
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      attachErrorHandlers()
      observer.observe(document.body, {
        childList: true,
        subtree: true
      })
    })
  } else {
    attachErrorHandlers()
    observer.observe(document.body, {
      childList: true,
      subtree: true
    })
  }

  // Le nettoyage se fera automatiquement lors du démontage de la page
})

