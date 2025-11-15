<template>
  <div class="min-h-screen flex flex-col bg-transparent text-slate-800">
    <TopBar />
    <SiteHeader />
    <main class="flex-1">
     
      <slot />
    </main>
    <SiteFooter />
  </div>
  
</template>

<script setup lang="ts">
import TopBar from '@/components/TopBar.vue'
import SiteHeader from '@/components/SiteHeader.vue'
import SiteFooter from '@/components/SiteFooter.vue'
</script>

