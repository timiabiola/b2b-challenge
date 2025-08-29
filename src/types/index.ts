export interface LeadFormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  position: string
  industry: string
  processesToAutomate: string[]
  decisionAuthority: 'yes' | 'no' | 'other'
}

export interface LeadSubmission extends LeadFormData {
  submissionId: string
  timestamp: string
}