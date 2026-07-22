import type { Role } from "../types";

export const projectsByRole = (role: Role) => `
  *[_type == "project" && role == "${role}"] | order(order asc) {
    _id,
    title,
    "slug": slug.current,
    coverImage,
    liveUrl,
    repoUrl,
    role,
    techStack,
    summary,
    order
  }
`;

export const experienceByRole = (role: Role) =>
  `*[_type == "experience" && role in "${role}"] | order(startDate desc)`;

export const skillsByRole = (role: Role) =>
  `*[_type == "skill" && role in "${role}"]`;

export const siteSettingsQuery = `*[_type == "siteSettings"][0]`;