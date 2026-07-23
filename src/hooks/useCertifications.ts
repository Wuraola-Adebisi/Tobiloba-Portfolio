import { useEffect, useState } from "react";
import { sanityClient } from "../data/sanityClient";
import type { Route } from "./useRoute";

export interface Certification {
  _id: string;
  title: string;
  issuer: string;
  badgeImage?: string;
  credentialUrl?: string;
  description?: string;
  role: Route[];
}

export function useCertifications(route: Route) {
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    sanityClient
      .fetch<Certification[]>(
        `*[_type == "certification" && "${route}" in role] | order(issuedDate desc)`,
      )
      .then((data) => {
        setCertifications(data);
        setError(null);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [route]);

  return { certifications, loading, error };
}
