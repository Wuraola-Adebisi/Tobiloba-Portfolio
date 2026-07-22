import { useEffect, useState } from "react";
import { sanityClient } from "../data/sanityClient";
import { projectsByRole } from "../data/queries";
import type { Project, Role } from "../types";

interface UseProjectsResult {
  projects: Project[];
  loading: boolean;
  error: string | null;
}

interface ProjectsState {
  role: Role | null;
  projects: Project[];
  error: string | null;
}

export function useProjects(role: Role): UseProjectsResult {
  const [state, setState] = useState<ProjectsState>({
    role: null,
    projects: [],
    error: null,
  });

  useEffect(() => {
    let cancelled = false;

    sanityClient
      .fetch<Project[]>(projectsByRole(role))
      .then((data) => {
        if (cancelled) return;
        setState({ role, projects: data, error: null });
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        setState({
          role,
          projects: [],
          error: err instanceof Error ? err.message : "Failed to load projects",
        });
      });

    return () => {
      cancelled = true;
    };
  }, [role]);

  return {
    projects: state.projects,
    loading: state.role !== role,
    error: state.error,
  };
}