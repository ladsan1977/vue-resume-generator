<template>
  <!-- Results Section -->
  <div v-if="showResults" class="max-w-2xl mx-auto mt-8 gap-y-6">
    <!-- Resume Section -->
    <ResumeDisplay :resumeData="generatedContent.resume">
      <template #actions>
        <button
          @click="copyToClipboard(JSON.stringify(generatedContent.resume))"
          class="px-3 py-1 text-sm text-indigo-600 hover:text-indigo-800 border border-indigo-600 rounded-md hover:bg-indigo-50 transition-colors"
        >
          Copy
        </button>
      </template>
    </ResumeDisplay>

    <!-- Cover Letter Section -->
    <CoverLetterDisplay :coverLetterData="generatedContent.coverLetter">
      <template #actions>
        <button
          @click="copyToClipboard(JSON.stringify(generatedContent.coverLetter))"
          class="px-3 py-1 text-sm text-indigo-600 hover:text-indigo-800 border border-indigo-600 rounded-md hover:bg-indigo-50 transition-colors"
        >
          Copy
        </button>
      </template>
    </CoverLetterDisplay>
  </div>
</template>

<script setup lang="ts">
import ResumeDisplay from '@/components/ResumeDisplay.vue'
import CoverLetterDisplay from './CoverLetterDisplay.vue'
import type { GeneratedContent } from '@/interfaces/generate-content.interface.ts'

interface Props {
  generatedContent: GeneratedContent
  showResults: boolean
}

defineProps<Props>()

const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text)
    // You might want to show a success message
  } catch (err) {
    console.error('Failed to copy text:', err)
    // You might want to show an error message
  }
}
</script>
