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
      <div class="relative mx-auto w-full max-w-[750px] px-2 sm:px-3 lg:px-4">
        <div class="space-y-4">
          <div
            v-for="(accordion, index) in accordions"
            :key="index"
          >
            <!-- Bloc coloré (ne s'agrandit pas) -->
            <button
              @click="toggleAccordion(index)"
              class="w-full bg-[#5C01C2] rounded-full flex items-center justify-between p-6 pl-12 text-left hover:bg-[#5C01C2]/90 transition shadow-xl"
            >
              <span class="text-lg font-semibold text-white pr-4">{{ accordions[index]?.title }}</span>
              <div class="flex-shrink-0">
                <!-- Icône œil plein quand ouvert -->
                <svg
                  v-if="openAccordion === index"
                  class="w-6 h-6 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                </svg>
                <!-- Icône œil barré quand fermé -->
                <svg
                  v-else
                  class="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
            </div>
            </button>

            <!-- Contenu dans un bloc blanc séparé -->
            <div
              v-show="openAccordion === index"
              class="mt-4 bg-white rounded-2xl p-6 shadow-xl"
            >
              <!-- Formulaire pour accordéons 1, 2 et 3 -->
              <form v-if="index === 0 || index === 1 || index === 2" class="grid gap-4 px-8 sm:px-12" @submit.prevent="handleSubmit(index)">
                <div>
                  <h3 class="text-xl font-bold text-slate-900 mb-2">{{ index === 0 ? $t('contact.formTitles.careers') : index === 1 ? $t('contact.formTitles.partnership') : $t('contact.formTitles.contact') }}</h3>
                  <div class="h-0.5 w-12 rounded-full bg-[#5C01C2]"></div>
                </div>
                
                <!-- Nom et Prénom sur la même ligne -->
                <div class="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    :placeholder="$t('contact.fields.lastName')"
                    :value="getFormValue(index, 'lastName')"
                    @input="updateFormField(index, 'lastName', ($event.target as HTMLInputElement).value)"
                    class="bg-[#30363D]/5 rounded-full px-4 py-3 border-none focus:outline-none focus:ring-2 focus:ring-[#5C01C2] focus:border-transparent"
                  />
                  <input
                    type="text"
                    :placeholder="$t('contact.fields.firstName')"
                    :value="getFormValue(index, 'firstName')"
                    @input="updateFormField(index, 'firstName', ($event.target as HTMLInputElement).value)"
                    class="bg-[#30363D]/5 rounded-full px-4 py-3 border-none focus:outline-none focus:ring-2 focus:ring-[#5C01C2] focus:border-transparent"
                  />
                </div>
                
                <!-- Email -->
                <input
                  type="email"
                  :placeholder="$t('contact.fields.email')"
                  :value="getFormValue(index, 'email')"
                  @input="updateFormField(index, 'email', ($event.target as HTMLInputElement).value)"
                  class="bg-[#30363D]/5 rounded-full px-4 py-3 border-none focus:outline-none focus:ring-2 focus:ring-[#5C01C2] focus:border-transparent"
                />
                
                <!-- Numéro de téléphone -->
                <input
                  type="tel"
                  :placeholder="$t('contact.fields.phone')"
                  :value="getFormValue(index, 'phone')"
                  @input="updateFormField(index, 'phone', ($event.target as HTMLInputElement).value)"
                  class="bg-[#30363D]/5 rounded-full px-4 py-3 border-none focus:outline-none focus:ring-2 focus:ring-[#5C01C2] focus:border-transparent"
                />
                
                <!-- Champ Objet pour le formulaire 3 uniquement -->
                <input
                  v-if="index === 2"
                  type="text"
                  :placeholder="$t('contact.fields.subject')"
                  :value="getFormValue(index, 'subject')"
                  @input="updateFormField(index, 'subject', ($event.target as HTMLInputElement).value)"
                  class="bg-[#30363D]/5 rounded-full px-4 py-3 border-none focus:outline-none focus:ring-2 focus:ring-[#5C01C2] focus:border-transparent"
                />
                
                <!-- Champs de fichier uniquement pour le premier formulaire -->
                <template v-if="index === 0">
                  <!-- Champ CV -->
                  <div class="relative">
                    <label class="block text-sm font-medium text-slate-700 mb-2">{{ $t('contact.fileLabels.cv') }}</label>
                    <div class="relative">
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        @change="handleFileChange(index, 'cv', $event)"
                        class="hidden"
                        :id="`cv-${index}`"
                      />
                      <label
                        :for="`cv-${index}`"
                        class="bg-white rounded-full px-4 py-3 border-2 border-dashed border-gray-400 cursor-pointer flex flex-col items-center justify-center hover:bg-slate-50 transition"
                      >
                        <svg class="w-5 h-5 text-gray-500 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                        <p class="text-xs text-gray-500 text-center">{{ $t('contact.fileSupport') }}</p>
                      </label>
                    </div>
                    <!-- Prévisualisation du CV -->
                    <div v-if="getFileName(index, 'cv')" class="mt-2 flex items-center gap-2 p-2 bg-slate-50 rounded-lg">
                      <svg class="w-5 h-5 text-[#5C01C2] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                      <span class="text-sm text-slate-700 flex-1 truncate">{{ getFileName(index, 'cv') }}</span>
                      <button
                        type="button"
                        @click="previewFile(index, 'cv')"
                        class="text-[#5C01C2] hover:text-[#5C01C2]/80 transition"
                        :aria-label="'Visualiser ' + getFileName(index, 'cv')"
                      >
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>
                      <button
                        type="button"
                        @click="removeFile(index, 'cv')"
                        class="text-red-500 hover:text-red-700 transition"
                        :aria-label="'Supprimer ' + getFileName(index, 'cv')"
                      >
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  
                  <!-- Champ Lettre de motivation -->
                  <div class="relative">
                    <label class="block text-sm font-medium text-slate-700 mb-2">{{ $t('contact.fileLabels.motivationLetter') }}</label>
                    <div class="relative">
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        @change="handleFileChange(index, 'motivationLetter', $event)"
                        class="hidden"
                        :id="`motivation-${index}`"
                      />
                      <label
                        :for="`motivation-${index}`"
                        class="bg-white rounded-full px-4 py-3 border-2 border-dashed border-gray-400 cursor-pointer flex flex-col items-center justify-center hover:bg-slate-50 transition"
                      >
                        <svg class="w-5 h-5 text-gray-500 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                        <p class="text-xs text-gray-500 text-center">{{ $t('contact.fileSupport') }}</p>
                      </label>
                    </div>
                    <!-- Prévisualisation de la lettre de motivation -->
                    <div v-if="getFileName(index, 'motivationLetter')" class="mt-2 flex items-center gap-2 p-2 bg-slate-50 rounded-lg">
                      <svg class="w-5 h-5 text-[#5C01C2] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                      <span class="text-sm text-slate-700 flex-1 truncate">{{ getFileName(index, 'motivationLetter') }}</span>
                      <button
                        type="button"
                        @click="previewFile(index, 'motivationLetter')"
                        class="text-[#5C01C2] hover:text-[#5C01C2]/80 transition"
                        :aria-label="'Visualiser ' + getFileName(index, 'motivationLetter')"
                      >
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>
                      <button
                        type="button"
                        @click="removeFile(index, 'motivationLetter')"
                        class="text-red-500 hover:text-red-700 transition"
                        :aria-label="'Supprimer ' + getFileName(index, 'motivationLetter')"
                      >
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </template>
                
                <!-- Textarea Message pour les formulaires 2 et 3 -->
                  <textarea
                  v-if="index === 1 || index === 2"
                  :placeholder="$t('contact.fields.message')"
                  :value="getFormValue(index, 'message')"
                  @input="updateFormField(index, 'message', ($event.target as HTMLTextAreaElement).value)"
                  rows="4"
                  class="bg-[#30363D]/5 rounded-2xl px-4 py-3 border-none focus:outline-none focus:ring-2 focus:ring-[#5C01C2] focus:border-transparent resize-none"
                  ></textarea>
                
                <div>
                  <button
                    type="submit"
                    :disabled="isLoading[index]"
                    class="w-full flex items-center justify-center rounded-full bg-[#02BE4B] px-6 py-3 text-white font-semibold hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span v-if="isLoading[index]">{{ $t('contact.sending') }}</span>
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
import { computed, ref, onMounted, watch } from 'vue'
import indexBg from '@/assets/images/fond.png?url'
import headerImage from '@/assets/images/fondHeagerPage.png?url'

const route = useRoute()
const openAccordion = ref<number | null>(null)

const { t } = useI18n()
const config = useRuntimeConfig()

const accordions = computed(() => [
  {
    title: t('contact.accordions.career')
  },
  {
    title: t('contact.accordions.partnership')
  },
  {
    title: t('contact.accordions.other')
  }
])

const toggleAccordion = (index: number) => {
  if (openAccordion.value === index) {
    openAccordion.value = null
  } else {
    openAccordion.value = index
  }
}

// Formulaires séparés pour chaque accordéon
const formData = ref<Record<number, { lastName: string; firstName: string; email: string; phone: string; subject?: string; message?: string; cv?: File; motivationLetter?: File }>>({})
const fileNames = ref<Record<number, { cv?: string; motivationLetter?: string }>>({})
const isLoading = ref<Record<number, boolean>>({})

// Initialiser les formulaires
accordions.value.forEach((_: any, index: number) => {
  if (index === 0 || index === 1 || index === 2) {
    formData.value[index] = {
      lastName: '',
      firstName: '',
      email: '',
      phone: '',
      subject: index === 2 ? '' : undefined,
      message: (index === 1 || index === 2) ? '' : undefined
    }
    fileNames.value[index] = {}
    isLoading.value[index] = false
  }
})

// Gérer l'ouverture de l'accordéon depuis les paramètres de l'URL
onMounted(() => {
  const accordionParam = route.query.accordion
  const subjectParam = route.query.subject
  
  if (accordionParam) {
    const accordionIndex = parseInt(accordionParam as string, 10)
    if (!isNaN(accordionIndex) && accordionIndex >= 0 && accordionIndex < accordions.value.length) {
      openAccordion.value = accordionIndex
      
      // Préremplir l'objet si le paramètre subject est présent (uniquement pour l'accordéon 3, index 2)
      if (subjectParam && typeof subjectParam === 'string' && accordionIndex === 2) {
        // S'assurer que le formulaire est initialisé
        if (!formData.value[accordionIndex]) {
          formData.value[accordionIndex] = {
            lastName: '',
            firstName: '',
            email: '',
            phone: '',
            subject: '',
            message: ''
          }
        }
        formData.value[accordionIndex].subject = subjectParam
      }
    }
  }
})

// Surveiller les changements de route (pour le SSR/SPA)
watch(() => route.query, (newQuery) => {
  const accordionParam = newQuery.accordion
  const subjectParam = newQuery.subject
  
  if (accordionParam) {
    const accordionIndex = parseInt(accordionParam as string, 10)
    if (!isNaN(accordionIndex) && accordionIndex >= 0 && accordionIndex < accordions.value.length) {
      openAccordion.value = accordionIndex
      
      // Préremplir l'objet si le paramètre subject est présent (uniquement pour l'accordéon 3, index 2)
      if (subjectParam && typeof subjectParam === 'string' && accordionIndex === 2) {
        // S'assurer que le formulaire est initialisé
        if (!formData.value[accordionIndex]) {
          formData.value[accordionIndex] = {
            lastName: '',
            firstName: '',
            email: '',
            phone: '',
            subject: '',
            message: ''
          }
        }
        formData.value[accordionIndex].subject = subjectParam
      }
    }
  }
})

// Fonctions helpers pour gérer les formulaires
const getFormValue = (index: number, field: 'lastName' | 'firstName' | 'email' | 'phone' | 'subject' | 'message'): string => {
  return formData.value[index]?.[field] || ''
}

const updateFormField = (index: number, field: 'lastName' | 'firstName' | 'email' | 'phone' | 'subject' | 'message', value: string) => {
  if (!formData.value[index]) {
    formData.value[index] = {
      lastName: '',
      firstName: '',
      email: '',
      phone: '',
      subject: index === 2 ? '' : undefined,
      message: (index === 1 || index === 2) ? '' : undefined
    }
  }
  formData.value[index][field] = value
}

// Fonctions pour gérer les fichiers
const handleFileChange = (index: number, field: 'cv' | 'motivationLetter', event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  
  if (file) {
    if (!formData.value[index]) {
      formData.value[index] = {
        lastName: '',
        firstName: '',
        email: '',
        phone: ''
      }
    }
    formData.value[index][field] = file
    
    if (!fileNames.value[index]) {
      fileNames.value[index] = {}
    }
    fileNames.value[index][field] = file.name
  }
}

const getFileName = (index: number, field: 'cv' | 'motivationLetter'): string => {
  return fileNames.value[index]?.[field] || ''
}

const removeFile = (index: number, field: 'cv' | 'motivationLetter') => {
  if (formData.value[index]) {
    formData.value[index][field] = undefined
  }
  if (fileNames.value[index]) {
    fileNames.value[index][field] = undefined
  }
  // Réinitialiser l'input file
  const inputId = field === 'cv' ? `cv-${index}` : `motivation-${index}`
  const input = document.getElementById(inputId) as HTMLInputElement
  if (input) {
    input.value = ''
  }
}

const previewFile = (index: number, field: 'cv' | 'motivationLetter') => {
  const file = formData.value[index]?.[field]
  if (!file || !(file instanceof File)) {
    return
  }
  
  // Créer un objet URL pour le fichier
  const fileUrl = URL.createObjectURL(file)
  
  // Ouvrir le fichier dans un nouvel onglet
  const newWindow = window.open(fileUrl, '_blank')
  
  // Nettoyer l'URL après un délai pour libérer la mémoire
  if (newWindow) {
    newWindow.addEventListener('load', () => {
      setTimeout(() => {
        URL.revokeObjectURL(fileUrl)
      }, 1000)
    })
  } else {
    // Si la popup est bloquée, créer un lien de téléchargement
    const link = document.createElement('a')
    link.href = fileUrl
    link.target = '_blank'
    link.download = file.name
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    setTimeout(() => {
      URL.revokeObjectURL(fileUrl)
    }, 1000)
  }
}



// Construire le body HTML selon le type de formulaire
const buildEmailBody = (index: number, currentFormData: any) => {
  const formType = index === 0 ? 'career' : index === 1 ? 'partnership' : 'other'
  
  let htmlBody = ''
  
  switch (formType) {
    case 'career':
      htmlBody = `
        <h2>Une nouvelle candidature vient d'être soumise via votre site web.</h2>
        <p>Vous trouverez ci-dessous les informations du candidat ainsi que ses documents joints.</p>
        <hr>
        <p><strong>Nom:</strong> ${currentFormData.lastName}</p>
        <p><strong>Prénom:</strong> ${currentFormData.firstName}</p>
        <p><strong>Email:</strong> ${currentFormData.email}</p>
        <p><strong>Téléphone:</strong> ${currentFormData.phone}</p>
        ${currentFormData.cv ? `<p><strong>CV joint:</strong> ${getFileName(index, 'cv')}</p>` : ''}
        ${currentFormData.motivationLetter ? `<p><strong>Lettre de motivation jointe:</strong> ${getFileName(index, 'motivationLetter')}</p>` : ''}
      `
      break

    case 'partnership':
      htmlBody = `
        <h2>Une demande de partenariat a été envoyée depuis votre site.</h2>
        <p>Voici les informations renseignées par le demandeur.</p>
        <hr>
        <p><strong>Nom:</strong> ${currentFormData.lastName}</p>
        <p><strong>Prénom:</strong> ${currentFormData.firstName}</p>
        <p><strong>Email:</strong> ${currentFormData.email}</p>
        <p><strong>Téléphone:</strong> ${currentFormData.phone}</p>
        ${currentFormData.message ? `<hr><p><strong>Message:</strong></p><p>${currentFormData.message.replace(/\n/g, '<br>')}</p>` : ''}
      `
      break

    case 'other':
    default:
      htmlBody = `
        <h2>Nouveau message de contact</h2>
        <hr>
        <p><strong>Nom:</strong> ${currentFormData.lastName}</p>
        <p><strong>Prénom:</strong> ${currentFormData.firstName}</p>
        <p><strong>Email:</strong> ${currentFormData.email}</p>
        <p><strong>Téléphone:</strong> ${currentFormData.phone}</p>
        ${currentFormData.subject ? `<p><strong>Objet:</strong> ${currentFormData.subject}</p>` : ''}
        ${currentFormData.message ? `<hr><p><strong>Message:</strong></p><p>${currentFormData.message.replace(/\n/g, '<br>')}</p>` : ''}
      `
      break
  }
  
  return htmlBody
}

// Construire le sujet de l'email
const buildEmailSubject = (index: number, currentFormData: any) => {
  const formType = index === 0 ? 'career' : index === 1 ? 'partnership' : 'other'
  
  switch (formType) {
    case 'career':
      return `Candidature - ${currentFormData.firstName} ${currentFormData.lastName}`
    case 'partnership':
      return currentFormData.subject || `Demande de partenariat - ${currentFormData.firstName} ${currentFormData.lastName}`
    case 'other':
    default:
      return currentFormData.subject || `Contact depuis le site - ${currentFormData.firstName} ${currentFormData.lastName}`
  }
}

// Fonction pour obtenir l'URL de l'API mailing selon l'environnement
const getMailingApiUrl = () => {
  // En production
  if (import.meta.env.PROD || (typeof window !== 'undefined' && window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1')) {
    return 'https://www.theta-ingenierie.com/mailing/'
  }
  // En local (vous pouvez changer cette URL si vous avez une API locale)
  return 'https://www.theta-ingenierie.com/mailing/'
}

const handleSubmit = async (index: number) => {
  isLoading.value[index] = true
  
  try {
    const currentFormData = formData.value[index]
    if (!currentFormData) return

    // Validation des champs obligatoires
    if (!currentFormData.lastName || !currentFormData.firstName || !currentFormData.email || !currentFormData.phone) {
      alert(t('contact.error') + ' : Veuillez remplir tous les champs obligatoires.')
      isLoading.value[index] = false
      return
    }

    // Construire les données pour l'API PHP (sans mot de passe)
    const emailBody = buildEmailBody(index, currentFormData)
    const emailSubject = buildEmailSubject(index, currentFormData)
    
    const apiData: any = {
      email_from: currentFormData.email,
      subject: emailSubject,
      body: emailBody,
      is_html: true,
    }

    // Pour le premier formulaire (Careers), ajouter les pièces jointes
    if (index === 0) {
      const attachments: any[] = []
      
      // Fonction pour convertir un fichier en base64
      const fileToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader()
          reader.onload = () => {
            const result = reader.result
            if (typeof result === 'string') {
              // Retirer le préfixe "data:type;base64," si présent
              const parts = result.split(',')
              const base64 = parts.length > 1 ? parts[1] : result
              if (base64) {
                resolve(base64)
              } else {
                reject(new Error('Failed to extract base64 content'))
              }
            } else {
              reject(new Error('Failed to read file as base64'))
            }
          }
          reader.onerror = reject
          reader.readAsDataURL(file)
        })
      }
      
      // Ajouter le CV s'il existe
      if (currentFormData.cv instanceof File) {
        const cvBase64 = await fileToBase64(currentFormData.cv)
        attachments.push({
          filename: currentFormData.cv.name,
          content: cvBase64,
          type: currentFormData.cv.type || 'application/pdf'
        })
      }
      
      // Ajouter la lettre de motivation si elle existe
      if (currentFormData.motivationLetter instanceof File) {
        const motivationBase64 = await fileToBase64(currentFormData.motivationLetter)
        attachments.push({
          filename: currentFormData.motivationLetter.name,
          content: motivationBase64,
          type: currentFormData.motivationLetter.type || 'application/pdf'
        })
      }
      
      // Ajouter la liste des attachments seulement si elle n'est pas vide
      if (attachments.length > 0) {
        apiData.attachments = attachments
      }
    }

    // Appeler l'API PHP avec l'URL dynamique
    const apiUrl = getMailingApiUrl()
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(apiData)
    })

    const data = await response.json()

    if (data.success) {
      resetForm(index)
      alert(t('contact.success'))
    } else {
      const errorMessage = data.message || t('contact.error')
      alert(errorMessage)
    }
  } catch (error: any) {
    // Extraire le message d'erreur
    let errorMessage = t('contact.error')
    
    if (error.message) {
      errorMessage = `Erreur: ${error.message}`
    }
    
    alert(errorMessage)
  } finally {
    isLoading.value[index] = false
  }
}

// Fonction pour réinitialiser le formulaire
const resetForm = (index: number) => {
  formData.value[index] = {
    lastName: '',
    firstName: '',
    email: '',
    phone: '',
    subject: index === 2 ? '' : undefined,
    message: (index === 1 || index === 2) ? '' : undefined
  }
  fileNames.value[index] = {}
  
  // Réinitialiser les inputs file
  const cvInput = document.getElementById(`cv-${index}`) as HTMLInputElement
  const motivationInput = document.getElementById(`motivation-${index}`) as HTMLInputElement
  if (cvInput) cvInput.value = ''
  if (motivationInput) motivationInput.value = ''
}

const pageBackgroundStyle = computed(() => ({
  backgroundImage: `url(${indexBg})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundAttachment: 'fixed'
}))
</script>

