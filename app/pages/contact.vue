<template>
  <div>
    <div
      class="fixed inset-0 -z-20 h-screen"
      :style="pageBackgroundStyle"
    ></div>
    <div class="fixed inset-0 -z-10 h-screen bg-white/20 pointer-events-none"></div>

    <section class="relative h-[200px] sm:h-[250px] lg:h-[150px] overflow-hidden">
      <div
        class="absolute inset-0 bg-cover bg-center"
        :style="{ backgroundImage: `url(${headerImage})` }"
      ></div>
      <div class="absolute inset-0 bg-[#5C01C2]/60"></div>
      <div class="relative z-10 flex items-center justify-center h-full">
        <div class="text-center text-white px-2">
          <h1 class="text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-2">{{ $t('contact.title') }}</h1>
        </div>
      </div>
    </section>

    <section class="relative py-10">
      <div class="relative mx-auto w-full max-w-[1100px] px-2 sm:px-3 lg:px-4">
        <div class="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div class="grid lg:grid-cols-2">
            <!-- Image gauche -->
            <div class="hidden lg:block relative min-h-[500px]">
              <img
                :src="batImage"
                alt="Construction"
                class="w-full h-full object-cover"
              />
            </div>

            <!-- Formulaire à droite -->
            <div class="p-6 sm:p-8 lg:p-10">
              <h2 class="text-2xl font-bold text-slate-900 mb-2">{{ $t('contact.pageTitle') }}</h2>
              <div class="h-0.5 w-8 rounded-full bg-black mb-6"></div>

              <form class="grid gap-4" @submit.prevent="handleSubmit">
                <div v-if="message" class="p-3 rounded-md" :class="messageType === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'">
                  {{ message }}
                </div>
                
                <div class="grid gap-1">
                  <label for="name" class="text-sm font-medium text-slate-700">{{ $t('contact.name') }}</label>
                  <input
                    id="name"
                    v-model="formData.name"
                    type="text"
                    class="rounded-md border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#5C01C2] focus:border-transparent"
                    :placeholder="$t('contact.namePlaceholder')"
                    required
                    :disabled="isLoading"
                  />
                </div>
                <div class="grid gap-1">
                  <label for="email" class="text-sm font-medium text-slate-700">{{ $t('contact.email') }}</label>
                  <input
                    id="email"
                    v-model="formData.email"
                    type="email"
                    class="rounded-md border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#5C01C2] focus:border-transparent"
                    :placeholder="$t('contact.emailPlaceholder')"
                    required
                    :disabled="isLoading"
                  />
                </div>
                <div class="grid gap-1">
                  <label for="message" class="text-sm font-medium text-slate-700">{{ $t('contact.message') }}</label>
                  <textarea
                    id="message"
                    v-model="formData.message"
                    rows="5"
                    class="rounded-md border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#5C01C2] focus:border-transparent"
                    :placeholder="$t('contact.messagePlaceholder')"
                    required
                    :disabled="isLoading"
                  ></textarea>
                </div>
                <div>
                  <button
                    type="submit"
                    :disabled="isLoading"
                    class="inline-flex items-center justify-center rounded-full bg-[#5C01C2] px-6 py-2 text-white font-semibold hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span v-if="isLoading">{{ $t('contact.sending') }}</span>
                    <span v-else>{{ $t('contact.send') }}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import indexBg from '@/assets/images/fond.png?url'
import headerImage from '@/assets/images/fondHeagerPage.png?url'
import batImage from '@/assets/images/batcontact.png'

const formData = ref({
  name: '',
  email: '',
  message: ''
})

const { t } = useI18n()

const isLoading = ref(false)
const message = ref('')
const messageType = ref<'success' | 'error'>('success')

const handleSubmit = async () => {
  isLoading.value = true
  message.value = ''

  try {
    const response = await $fetch<{ success: boolean; message?: string }>('/api/contact', {
      method: 'POST',
      body: {
        name: formData.value.name,
        email: formData.value.email,
        message: formData.value.message
      }
    })

    if (response.success) {
      message.value = response.message || t('contact.success')
      messageType.value = 'success'
      
      // Réinitialiser le formulaire
      formData.value = {
        name: '',
        email: '',
        message: ''
      }
    }
  } catch (error: any) {
    message.value = error.data?.message || error.message || t('contact.error')
    messageType.value = 'error'
  } finally {
    isLoading.value = false
  }
}

const pageBackgroundStyle = computed(() => ({
  backgroundImage: `url(${indexBg})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundAttachment: 'fixed'
}))
</script>

