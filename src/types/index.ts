export interface LeadFormData {
  phone: string
  industry: string
  processToAutomate: string
  decisionAuthority: 'yes' | 'no' | 'other'
}

export interface LeadSubmission extends LeadFormData {
  submissionId: string
  timestamp: string
}