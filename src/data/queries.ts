import type { Role } from "../types";

export const projectsByRole = (role: Role) =>
  `*[_type == "project" && role == "${role}"] | order(order asc) {..., showcaseVideo{asset->{url}}}`;

export const experienceByRole = (role: Role) =>
  `*[_type == "experience" && "${role}" in roles] | order(startDate desc)`;

export const skillsByRole = (role: Role) =>
  `*[_type == "skill" && "${role}" in role]`;

export const siteSettingsQuery = `*[_type == "siteSettings"][0]`;
