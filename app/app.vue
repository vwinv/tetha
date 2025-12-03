<template>
  <div>
    <LoadingScreen />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <ScrollToTop />
  </div>
</template>

<script setup lang="ts">
useHead({
  link: [
    { rel: 'icon', type: 'image/png', href: '/favicon.png' },
    { rel: 'shortcut icon', href: '/favicon.ico' }
  ]
})
</script>