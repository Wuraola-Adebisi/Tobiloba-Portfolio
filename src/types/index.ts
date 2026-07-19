export type Role = "software" | "data";

export interface Project {
  _id: string;
  title: string;
  slug: string;
  coverImage?: string;
  liveUrl?: string;
  repoUrl?: string;
  role: Role;
  techStack: string[];
  summary: string;
  order: number;
}

export interface Experience {
  _id: string;
  company: string;
  roles: Role[];
  startDate: string;
  endDate?: string;
  description: string;
  techStack: string[];
}

export interface Skill {
  _id: string;
  name: string;
  category: string;
  role: Role[];
}

export interface SiteSettings {
  name: string;
  tagline: string;
  resumeUrl?: string;
  contactEmail?: string;
  certifications?: string[];
}