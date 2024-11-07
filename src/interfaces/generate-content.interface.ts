export interface GeneratedContent {
  summary: Summary
  resume: Resume
  coverLetter: CoverLetter
}

export interface Summary {
  briefSummary: string
}

export interface Resume {
  personalInfo: string
  professionalSummary: string
  workExperience: string
  education: string
  skills: string
  certifications: string
}

export interface CoverLetter {
  header: string
  content: string
  salutationAndSignature: string
}
