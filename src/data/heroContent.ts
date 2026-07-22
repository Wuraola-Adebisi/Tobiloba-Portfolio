import type { Route } from "../hooks/useRoute";

interface HeroContent {
  firstName: string;
  fullName: string;
  role: string;
  description: string;
  primaryCta: string;
  secondaryCta: string;
}

const heroContent: Record<Route, HeroContent> = {
  software: {
    firstName: "Tobiloba",
    fullName: "Tobiloba Isaiah Adebisi",
    role: "Software Engineer",
    description:
      "Building fast, reliable web applications, from real time collaboration tools to production backend systems.",
    primaryCta: "View projects",
    secondaryCta: "Resume",
  },
  data: {
    firstName: "Tobiloba",
    fullName: "Tobiloba Isaiah Adebisi",
    role: "Data Engineer",
    description:
      "Designing serverless pipelines and streaming systems that turn raw data into decisions.",
    primaryCta: "View projects",
    secondaryCta: "Resume",
  },
};

export function getHeroContent(route: Route): HeroContent {
  return heroContent[route];
}