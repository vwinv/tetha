<template>
  <div class="w-full bg-[#02BE4B] text-white text-xs py-1">
    <div class="flex items-center justify-end gap-x-3 px-3 sm:px-4 lg:px-6">
      <span>Dakar / Senegal</span>
      <span class="hover:underline">{{ phonePrimary }}</span>
      <a :href="facebookUrl" target="_blank" rel="noopener" class="hover:underline">Facebook</a>
      <a :href="linkedinUrl" target="_blank" rel="noopener" class="hover:underline">LinkedIn</a>
    </div>
  </div>
  
</template>

<script setup lang="ts">
import { phonePrimary, facebookUrl, linkedinUrl,contactAddress } from '../config/site'
</script>

