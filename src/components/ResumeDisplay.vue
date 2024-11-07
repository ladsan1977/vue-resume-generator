<script setup lang="ts">
import type { Resume } from '../interfaces/generate-content.interface'

interface Props {
  resumeData: Resume
}

defineProps<Props>()

// Helper function to split text into array by new lines
const splitLines = (text: string): string[] => {
  return text.split('\n').filter(line => line.trim() !== '')
}
</script>

<template>
  <div class="bg-white rounded-lg shadow-md p-6">
    <div class="flex justify-between items-center mb-4">
      <h3 class="text-xl font-semibold text-indigo-600">Generated Resume</h3>
      <slot name="actions"></slot>
    </div>

    <div class="space-y-6">
      <!-- Personal Info -->
      <div class="text-center border-b pb-4">
        <div class="space-y-1">
          <template
            v-for="(line, index) in splitLines(resumeData.personalInfo)"
            :key="index"
          >
            <p :class="index === 0 ? 'text-xl font-bold' : 'text-gray-600'">
              {{ line }}
            </p>
          </template>
        </div>
      </div>

      <!-- Professional Summary -->
      <div>
        <h4 class="text-lg font-semibold text-gray-800 mb-2">
          Professional Summary
        </h4>
        <p class="text-gray-700 leading-relaxed">
          {{ resumeData.professionalSummary }}
        </p>
      </div>

      <!-- Work Experience -->
      <div>
        <h4 class="text-lg font-semibold text-gray-800 mb-2">
          Work Experience
        </h4>
        <div class="space-y-4">
          <template
            v-for="(line, index) in splitLines(resumeData.workExperience)"
            :key="index"
          >
            <p
              :class="{
                'font-semibold': !line.startsWith('•'),
                'text-gray-700': true,
                'pl-4': line.startsWith('•'),
              }"
            >
              {{ line }}
            </p>
          </template>
        </div>
      </div>

      <!-- Education -->
      <div>
        <h4 class="text-lg font-semibold text-gray-800 mb-2">Education</h4>
        <div class="space-y-2">
          <template
            v-for="(line, index) in splitLines(resumeData.education)"
            :key="index"
          >
            <p class="text-gray-700">{{ line }}</p>
          </template>
        </div>
      </div>

      <!-- Skills -->
      <div>
        <h4 class="text-lg font-semibold text-gray-800 mb-2">Skills</h4>
        <div class="space-y-1">
          <template
            v-for="(line, index) in splitLines(resumeData.skills)"
            :key="index"
          >
            <p class="text-gray-700">{{ line }}</p>
          </template>
        </div>
      </div>

      <!-- Certifications -->
      <div>
        <h4 class="text-lg font-semibold text-gray-800 mb-2">Certifications</h4>
        <div class="space-y-1">
          <template
            v-for="(line, index) in splitLines(resumeData.certifications)"
            :key="index"
          >
            <p class="text-gray-700">{{ line }}</p>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
