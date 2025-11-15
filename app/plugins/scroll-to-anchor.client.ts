export default defineNuxtPlugin(() => {
  const router = useRouter()
  
  // Fonction pour scroller vers une ancre
  const scrollToAnchor = (hash: string, retries = 0) => {
    if (!hash) return
    
    // Enlever le # du hash
    const id = hash.replace('#', '')
    if (!id) return

    // Fonction récursive pour réessayer si l'élément n'est pas trouvé
    const attemptScroll = () => {
      const element = document.getElementById(id) || document.querySelector(hash)
      
      if (element) {
        // Calculer la position en tenant compte du header fixe
        const headerHeight = 100 // Hauteur approximative du header + topbar
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
        const offsetPosition = elementPosition - headerHeight

        // Scroll smooth vers l'élément
        window.scrollTo({
          top: Math.max(0, offsetPosition),
          behavior: 'smooth'
        })
      } else if (retries < 5) {
        // Réessayer après un court délai si l'élément n'est pas encore chargé
        setTimeout(() => {
          scrollToAnchor(hash, retries + 1)
        }, 150)
      }
    }

    // Attendre que le DOM soit complètement chargé
    if (retries === 0) {
      setTimeout(attemptScroll, 200)
    } else {
      attemptScroll()
    }
  }

  // Gérer le scroll après la navigation
  router.afterEach((to, from) => {
    // Si on change de page et qu'il y a un hash, scroller vers l'ancre
    if (to.hash && (to.path !== from.path || !from.hash)) {
      scrollToAnchor(to.hash)
    } else if (to.hash && to.path === from.path) {
      // Si on est sur la même page, scroller immédiatement
      scrollToAnchor(to.hash)
    }
  })

  // Gérer le scroll au chargement initial de la page avec hash
  if (process.client) {
    // Utiliser nextTick pour s'assurer que le DOM est prêt
    nextTick(() => {
      if (window.location.hash) {
        scrollToAnchor(window.location.hash)
      }
    })
  }
})

