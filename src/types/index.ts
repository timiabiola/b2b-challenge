export interface LeadFormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  businessReason: string
}

export interface LeadSubmission extends LeadFormData {
  submissionId: string
  timestamp: string
}