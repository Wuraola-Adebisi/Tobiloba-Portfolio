export type Role = "software" | "data";

export interface SanityImage {
  asset: {
    _ref: string;
    _type: "reference";
  };
}

export interface Project {
  _id: string;
  title: string;
  slug: string;
  coverImage?: string;
  showcaseVideo?: { asset?: { url?: string } };
  liveUrl?: string;
  repoUrl?: string;
  role: Role;
  focusArea?: string;
  techStack: string[];
  summary: string;
  order: number;
  problem?: string;
  approach?: string;
  outcome?: string;
  results?: string;
  /** Additional case study screenshots. Same loose typing as coverImage: each
   * entry is really a Sanity image object, passed straight to urlFor(). */
  gallery?: string[];
}

export interface Experience {
  _id: string;
  company: string;
  title?: string;
  roles: Role[];
  startDate: string;
  endDate?: string;
  description?: string;
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