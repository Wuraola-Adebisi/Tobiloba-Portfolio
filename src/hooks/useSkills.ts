import { useEffect, useState } from "react";
import { sanityClient } from "../data/sanityClient";
import { skillsByRole } from "../data/queries";
import type { Skill } from "../types";
import type { Route } from "./useRoute";

export function useSkills(route: Route) {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    sanityClient
      .fetch<Skill[]>(skillsByRole(route))
      .then((data) => {
        setSkills(data);
        setError(null);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [route]);

  return { skills, loading, error };
}
