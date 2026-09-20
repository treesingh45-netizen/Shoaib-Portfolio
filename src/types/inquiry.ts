export interface UploadedFile {
  name: string;
  size: number;
  type: string;
  dataUrl: string;
}

export interface ProjectInquiryData {
  fullName: string;
  companyName?: string;
  email: string;
  phone?: string;
  country?: string;
  preferredContact: 'Email' | 'WhatsApp' | 'Phone Call';
  
  serviceNeeded: string;
  otherService?: string;
  projectDescription: string;
  goals: string[];
  otherGoal?: string;

  budget: string;
  customBudget?: string;

  socialMedia: {
    instagram?: string;
    facebook?: string;
    tiktok?: string;
    linkedin?: string;
    youtube?: string;
    otherLink?: string;
    presenceDescription?: string;
  };

  website: {
    hasWebsite: boolean;
    currentUrl?: string;
    improvements: string[];
    otherImprovement?: string;
    lookingForType?: string;
    otherWebsiteType?: string;
  };

  files: UploadedFile[];
  
  timeline: string;
  targetDate?: string;
  
  additionalInfo?: string;
}

export interface StoredInquiry extends ProjectInquiryData {
  id: string;
  submissionDate: string;
  status: 'New' | 'Contacted' | 'In Discussion' | 'Approved' | 'Completed';
  notes?: string;
  updatedAt?: string;
}
