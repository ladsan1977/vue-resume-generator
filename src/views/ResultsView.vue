<template>
  <div class="container mx-auto px-4 py-8">
    <div v-if="generatedContent" class="max-w-3xl mx-auto">
      <ResultInformation
        :generatedContent="generatedContent"
        :showResults="true"
      />

      <div class="mt-6 text-center">
        <button
          @click="goBack"
          class="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
        >
          Back to Form
        </button>
      </div>
    </div>
    <div v-else class="text-center">
      <p class="text-gray-600">
        No content available. Please generate a resume first.
      </p>
      <button
        @click="goBack"
        class="mt-4 px-4 py-2 text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
      >
        Go Back
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import ResultInformation from '@/components/ResultInformation.vue'
import type { GeneratedContent } from '@/interfaces/generate-content.interface'

const router = useRouter()
// const generatedContent = ref<GeneratedContent | null>(null)
const generatedContent = ref(null)

onMounted(() => {
  generatedContent.value = window.history.state?.data
})

const goBack = () => {
  router.push('/')
}
</script>
