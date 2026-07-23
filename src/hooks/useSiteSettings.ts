import { useEffect, useState } from "react";
import { sanityClient } from "../data/sanityClient";
import { siteSettingsQuery } from "../data/queries";

interface SiteSettings {
  name?: string;
  tagline?: string;
  portrait?: { asset?: { url?: string } };
  softwareRoleLabel?: string;
  softwareHeroDescription?: string;
  dataRoleLabel?: string;
  dataHeroDescription?: string;
  softwareResume?: { asset?: { url?: string } };
  dataResume?: { asset?: { url?: string } };
  contactEmail?: string;
  certifications?: string[];
}

export function useSiteSettings() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    sanityClient
      .fetch<SiteSettings>(
        `${siteSettingsQuery}{
          ...,
          portrait{asset->{url}},
          softwareResume{asset->{url}},
          dataResume{asset->{url}}
        }`,
      )
      .then(setSettings)
      .finally(() => setLoading(false));
  }, []);

  return { settings, loading };
}
