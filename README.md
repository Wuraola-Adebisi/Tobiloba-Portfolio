# Tobiloba Portfolio

A two-in-one portfolio site for Tobiloba Adebisi — software engineer and AWS-certified data engineer — with routed sections for each role, backed by a headless CMS.

Live at [tobiloba.me](https://tobiloba.me)

## Overview

The site is split into two routed experiences from a single codebase:

- `/software/` — software engineering projects, experience, and skills
- `/data/` — data engineering projects, experience, and skills

Both sides pull from one shared Sanity dataset, with content tagged by role so shared skills (AWS, MongoDB, Docker, etc.) and dual-framed work experience (the same job described differently depending on audience) don't need to be duplicated in code.

## Tech stack

- **Vite + React + TypeScript** — build tooling and app framework
- **Tailwind CSS v4** — styling, theme tokens defined in `src/index.css` via `@theme`
- **Sanity** — headless CMS for projects, experience, skills, and site settings
- **React Router** — client-side routing between the software and data sections
- **GitHub Pages** — hosting, served from the custom domain `tobiloba.me`
- **GitHub Actions** — CI/CD, auto-deploys on every push to `main`

The Sanity Studio lives in a separate sibling project, `tobiloba-portfolio-studio`, with its own repo and its own `schemaTypes/` folder (`project`, `experience`, `skill`, `siteSettings`).

## Content model

All content is managed in Sanity and filtered by a `role` field (`"software"` | `"data"`), or a `role` array for entries that apply to both sides.

| Type | Fields |
|---|---|
| `project` | title, slug, coverImage, liveUrl, repoUrl, role, techStack, summary, order |
| `experience` | company, roles (array), startDate, endDate, description, techStack |
| `skill` | name, category, role (array) |
| `siteSettings` | name, tagline, resumeUrl, contactEmail, certifications |

## Deployment

Deployment is fully automated. Any push to `main` triggers a GitHub Actions workflow (`.github/workflows/deploy.yml`) that builds the app and publishes it to GitHub Pages. No manual build or upload steps are needed.

GitHub Pages is configured to deploy from **GitHub Actions** (not a branch), under the repo's Settings → Pages.

## Roadmap

- [x] Project scaffold, routing skeleton, Tailwind v4 config
- [x] Sanity schema and studio setup
- [x] Content entry (projects, experience, skills, site settings)
- [x] Design system (color, type, layout direction)
- [x] CI/CD pipeline
- [ ] Software section — full component build
- [ ] Data section — structural build
- [ ] Resume download/view button
- [ ] Polish, responsive pass, and final deploy
