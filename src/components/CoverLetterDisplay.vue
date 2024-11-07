<script setup lang="ts">
import type { CoverLetter } from '../interfaces/generate-content.interface'

interface Props {
  coverLetterData: CoverLetter
}

defineProps<Props>()

// Helper function to split text into array by new lines
const splitLines = (text: string): string[] => {
  return text.split('\n').filter(line => line.trim() !== '')
}

// Helper function to split content into paragraphs
const splitParagraphs = (text: string): string[] => {
  return text.split('\n\n').filter(paragraph => paragraph.trim() !== '')
}
</script>

<template>
  <div class="bg-white rounded-lg shadow-md mt-6 p-6">
    <div class="flex justify-between items-center mb-4">
      <h3 class="text-xl font-semibold text-indigo-600">
        Generated Cover Letter
      </h3>
      <slot name="actions"></slot>
    </div>

    <div class="max-w-2xl mx-auto space-y-6 text-gray-700">
      <!-- Header Section -->
      <div class="text-right mb-8">
        <template
          v-for="(line, index) in splitLines(coverLetterData.header)"
          :key="index"
        >
          <p class="leading-relaxed">{{ line }}</p>
        </template>
      </div>

      <!-- Content Section -->
      <div class="space-y-4">
        <template
          v-for="(paragraph, index) in splitParagraphs(coverLetterData.content)"
          :key="index"
        >
          <p class="leading-relaxed">{{ paragraph }}</p>
        </template>
      </div>

      <!-- Signature Section -->
      <div class="mt-8">
        <template
          v-for="(line, index) in splitLines(
            coverLetterData.salutationAndSignature,
          )"
          :key="index"
        >
          <p
            :class="{
              'mb-4': index === 0,
              'font-semibold': index === 1,
            }"
          >
            {{ line }}
          </p>
        </template>
      </div>
    </div>
  </div>
</template>
