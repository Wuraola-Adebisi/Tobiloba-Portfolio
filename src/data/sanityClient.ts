import { createClient } from "@sanity/client";

export const sanityClient = createClient({
  projectId: "3kjs4y14",
  dataset: "production",
  apiVersion: "2026-01-01",
  useCdn: true,
});