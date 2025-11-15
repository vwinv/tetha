<template>
  <div class="w-full bg-[#02BE4B] text-white text-xs py-1">
    <div class="mx-auto max-w-6xl px-2 h-6 flex items-center justify-between">
      <div class="truncate font-medium">{{ locationText }}</div>
      <div class="flex items-center gap-x-3">
        <span class="hover:underline">{{ phonePrimary }}</span>
        <a :href="`tel:${phoneSecondary}`" class="hover:underline">{{ phoneSecondary }}</a>
        <a :href="facebookUrl" target="_blank" rel="noopener" class="hover:underline">Facebook</a>
        <a :href="linkedinUrl" target="_blank" rel="noopener" class="hover:underline">LinkedIn</a>
      </div>
    </div>
  </div>
  
</template>

<script setup lang="ts">
import { phonePrimary, phoneSecondary, facebookUrl, linkedinUrl, locationText } from '../config/site'
</script>

