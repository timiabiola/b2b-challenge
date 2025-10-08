export interface LeadFormData {
  firstName: string
  lastName: string
  email: string
  linkedinUrl?: string
  businessReason: string
}

export interface LeadSubmission extends LeadFormData {
  submissionId: string
  timestamp: string
}