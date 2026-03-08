/**
 * Core TypeScript interfaces for Charles Shaju's Portfolio
 */

export type ProjectCategory = 'robotics' | 'iot' | 'embedded' | 'ai' | 'marine';

export type AspectRatio = 'portrait' | 'landscape' | 'square';

export interface ProjectImage {
  id: string;
  src: string;
  alt: string;
  aspectRatio: AspectRatio;
  caption?: string;
}

export interface Project {
  id: string;
  title: string;
  category: ProjectCategory;
  year: string;
  coverImage: string;
  images: ProjectImage[];
  description: string;
  techStack?: string[];
  location?: string;
  slug: string;
}

export interface PersonInfo {
  name: string;
  tagline: string;
  heroIntroduction: string;
  biography: string;
  approach: string;
  skills: {
    languages: string[];
    frameworks: string[];
    tools: string[];
    hardware: string[];
  };
  certifications: { title: string; issuer: string; year: string }[];
  patent?: { title: string; description: string; applicationNo: string; date: string };
  education: string;
  location: string;
  email: string;
  availability: string;
  socialLinks: {
    instagram?: string;
    linkedin?: string;
    github?: string;
    twitter?: string;
    medium?: string;
  };
  portraitImage: string;
}

export interface ContactSubmission {
  name: string;
  email: string;
  projectType: 'robotics' | 'iot' | 'collaboration';
  message: string;
  timestamp: Date;
}

// Legacy alias for backward compatibility
export type PhotographerInfo = PersonInfo;
