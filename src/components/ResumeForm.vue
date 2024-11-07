<template>
  <div class="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
    <form @submit.prevent="handleSubmit" class="space-y-6">
      <div>
        <label
          for="jobDescription"
          class="block text-sm font-medium text-gray-700 mb-2"
        >
          Job Description
        </label>
        <textarea
          id="jobDescription"
          v-model="jobDescription"
          rows="6"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Paste the job description here..."
          required
        ></textarea>
      </div>

      <div>
        <label
          for="profileUpload"
          class="block text-sm font-medium text-gray-700 mb-2"
        >
          Upload Your Profile (PDF only)
        </label>
        <input
          type="file"
          id="profileUpload"
          accept=".pdf"
          @change="handleFileChange"
          class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
          required
        />
      </div>

      <button
        type="submit"
        class="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        :disabled="isLoading"
      >
        <div v-if="isLoading" class="flex items-center justify-center">
          <svg
            class="animate-spin h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <span class="ml-2">Loading...</span>
        </div>
        <span v-else>Generate Resume</span>
      </button>

      <ResultInformation
        :generatedContent="generatedContent"
        :showResults="showResults"
      />

      <!-- Reset Button -->
      <div class="mt-6 text-center">
        <button
          @click="resetForm"
          class="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
        >
          Start Over
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ResultInformation from '@/components/ResultInformation.vue'
import type { GeneratedContent } from '@/interfaces/generate-content.interface.ts'

const jobDescription = ref<string>('')
const selectedFile = ref<File | null>(null)
const showResults = ref(false)
const isLoading = ref(false)

const generatedContent = ref<GeneratedContent | null>(null)

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files.length > 0) {
    selectedFile.value = target.files[0]
  }
}

const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader()
    fileReader.readAsDataURL(file)
    fileReader.onload = () => {
      const base64String = fileReader.result as string
      // Eliminar el prefijo "data:application/octet-stream;base64,"
      const base64 = base64String.split(',')[1]
      resolve(base64)
    }
    fileReader.onerror = error => {
      reject(error)
    }
  })
}

const handleSubmit = async () => {
  if (!validateForm) return

  isLoading.value = true

  try {
    const formData = new FormData()
    formData.append('jobDescription', jobDescription.value)
    formData.append('profileFile', 'probando')

    const base64 = await fileToBase64(selectedFile.value)

    const payload = {
      job_posting: jobDescription.value,
      profile_pdf: base64,
    }

    const response = await fetch('/generate_resume', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      throw new Error('Failed to generate resume')
    }

    const data = await response.json()
    console.log('respuesta API', data)
    generatedContent.value = data

    // esto para pruebas
    // generatedContent.value = {
    //   summary: {
    //     briefSummary:
    //       'IQVIA is seeking a Senior Frontend Engineer with at least 5 years of experience to join their Digital Enablement Center of Excellence. The role involves developing scalable, high-quality software solutions using Vue3 or React, with a focus on pixel-perfect development and comprehensive unit testing. The ideal candidate will have strong experience with front-end frameworks, UI component libraries, and micro-frontends.',
    //   },
    //   resume: {
    //     personalInfo:
    //       'Luz A Sanchez\nladsan@gmail.com\n57-312432 4873\nCra. 56 152B-60 Bogotá, Colombia\nwww.linkedin.com/in/luz-sánchez-s',
    //     professionalSummary:
    //       'Experienced Systems Engineering professional with over 7 years in software development, specializing in front-end technologies. Proven expertise in Vue.js and Angular frameworks, with a strong focus on creating responsive and user-friendly interfaces. Skilled in implementing pixel-perfect designs and ensuring comprehensive unit test coverage. Committed to delivering high-quality, scalable software solutions while collaborating effectively with cross-functional teams.',
    //     workExperience:
    //       'Senior Software Engineer\naPriori Nearshore / IAM Studio (Nov 2021 - Present)\n• Developed and maintained web applications using Vue.js, implementing responsive and user-friendly interfaces\n• Collaborated with cross-functional teams to design and deliver new features\n• Ensured technical feasibility of UI/UX designs and wrote clean, maintainable, and efficient code\n• Participated in code reviews and implemented best practices for front-end development\n\nSenior Software Engineer\nComercializadora Arturo Calle (Mar 2001 - Nov 2021)\n• Contributed to the design and setup of the POS system on the .NET Windows Forms platform\n• Designed and implemented intranet web application using .NET\n• Developed a web application for unification and management of third parties within the corporate group\n• Participated in setting up an online store using WordPress',
    //     education:
    //       'Teleinformatics Specialist, Universidad Distrital de Colombia (2004)\nSystem Engineering, Universidad Catolica de Colombia (1995 - 2000)',
    //     skills:
    //       '• Front-end: Vue.js, Angular, HTML5, CSS3, JavaScript, TypeScript\n• UI Libraries: Bootstrap, Tailwind CSS\n• Testing: Jest\n• Back-end: .NET (C#), GraphQL, Apollo Studio\n• Database: SQL Server, MySQL\n• Version Control: Git, GitHub\n• Design Tools: Figma, Adobe XD',
    //     certifications:
    //       '• Scrum Master Certification, International Scrum Institute (2018)\n• Vue.js "de cero a experto" Certification, Udemy (2022)\n• Angular "de Cero a Experto" Certification, Udemy (2019)',
    //   },
    //   coverLetter: {
    //     header:
    //       'Luz A Sanchez\nladsan@gmail.com\n57-312432 4873\nCra. 56 152B-60 Bogotá, Colombia\n\n[Date]\n\nHiring Manager\nIQVIA\n[Company Address]',
    //     content:
    //       "Dear Hiring Manager,\n\nI am writing to express my strong interest in the Senior Frontend Engineer position at IQVIA's Digital Enablement Center of Excellence. With over 7 years of experience in software development and a specialization in front-end technologies, I am excited about the opportunity to contribute to IQVIA's mission of powering exceptional brand experiences and delivering innovative solutions in healthcare marketing.\n\nMy expertise in Vue.js and Angular frameworks, combined with my experience in creating responsive and user-friendly interfaces, aligns perfectly with the requirements of this role. I have a proven track record of implementing pixel-perfect designs and ensuring comprehensive unit test coverage, which I understand are crucial aspects of this position.\n\nIn my current role at aPriori Nearshore / IAM Studio, I have been developing and maintaining web applications using Vue.js, collaborating closely with cross-functional teams to design and deliver new features. This experience has honed my skills in writing clean, maintainable, and efficient code, as well as participating in code reviews to maintain high standards of quality.\n\nI am particularly drawn to IQVIA's commitment to leveraging cloud-native solutions and efficient big data pipelines to transform healthcare marketing. My background in both front-end and back-end technologies, including experience with GraphQL and Apollo Studio, positions me well to contribute to your innovative MediaOS platform.\n\nI am excited about the prospect of bringing my technical skills, problem-solving abilities, and passion for delivering scalable, high-quality software solutions to IQVIA. I am confident that my experience and dedication to staying updated with new technologies and frameworks would make me a valuable addition to your team.\n\nThank you for considering my application. I look forward to the opportunity to discuss how my skills and experiences align with IQVIA's needs and to learn more about this exciting role.",
    //     salutationAndSignature: 'Sincerely,\nLuz A Sanchez',
    //   },
    // }

    showResults.value = true
  } catch (error) {
    console.error('Error generating resume:', error)
    // Here you might want to show an error message to the user
  } finally {
    isLoading.value = false
  }
}

// You might want to add form validation
const validateForm = (): boolean => {
  if (!jobDescription.value.trim()) {
    return false
  }

  if (!selectedFile.value) {
    return false
  }

  if (selectedFile.value.type !== 'application/pdf') {
    return false
  }

  return true
}

// You could also add a method to reset the form
const resetForm = () => {
  jobDescription.value = ''
  selectedFile.value = null
  showResults.value = false
}
</script>
