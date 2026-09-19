export interface PersonalDetails {
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  address: string;
  website?: string;
  linkedin?: string;
  github?: string;
  photoUrl?: string;
  summary: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  description: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
}

export interface Skill {
  id: string;
  name: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
}

export interface CoverLetterData {
  recipientName: string;
  recipientTitle: string;
  companyName: string;
  companyAddress: string;
  date: string;
  subject?: string;
  letterBody: string;
}

export type TemplateCategory = 'ATS' | 'CREATIVE' | 'COVER_LETTER';

export interface ResumeData {
  category: TemplateCategory;
  templateId: string;
  personal: PersonalDetails;
  experiences: Experience[];
  educations: Education[];
  skills: Skill[];
  coverLetter?: CoverLetterData;
}
