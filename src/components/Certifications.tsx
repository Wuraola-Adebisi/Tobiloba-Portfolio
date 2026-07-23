import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { useRoute } from "../hooks/useRoute";
import { useCertifications } from "../hooks/useCertifications";
import { urlFor } from "../data/imageUrl";
import Skeleton from "./Skeleton";

export default function Certifications() {
  const { route } = useRoute();
  const { certifications, loading, error } = useCertifications(route);

  if (!loading && !error && certifications.length === 0) return null;

  return (
    <section
      id="certifications"
      className="max-w-[1440px] mx-auto px-5 md:px-9 py-20"
    >
      <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white mb-10">
        Certifications
      </h2>

      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[0, 1, 2].map((i) => (
            <Skeleton key={i} className="h-64" />
          ))}
        </div>
      )}

      {!loading && error && (
        <p className="font-mono text-sm text-gray-500 dark:text-gray-400">
          Couldn't load certifications right now, {error}.
        </p>
      )}

      {!loading && !error && certifications.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {certifications.map((cert) => (
            <a
              key={cert._id}
              href={cert.credentialUrl}
              target="_blank"
              rel="noreferrer"
              className="group flex flex-col rounded-2xl border border-dashed border-border-light dark:border-border-dark hover:border-solid hover:border-accent transition-colors duration-300 p-5"
            >
              {cert.badgeImage && (
                <img
                  src={urlFor(cert.badgeImage).width(120).height(120).url()}
                  alt={cert.title}
                  className="w-16 h-16 object-contain mb-4"
                  loading="lazy"
                />
              )}
              <h3 className="text-base font-semibold tracking-tight text-gray-900 dark:text-white mb-1">
                {cert.title}
              </h3>
              <p className="font-mono text-[10px] uppercase tracking-wide text-gray-500 dark:text-gray-500 mb-3">
                {cert.issuer}
              </p>
              {cert.description && (
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                  {cert.description}
                </p>
              )}
              <div className="mt-auto flex items-center gap-1.5 font-mono text-[11px] text-gray-500 dark:text-gray-500 group-hover:text-accent transition-colors">
                <FontAwesomeIcon
                  icon={faArrowUpRightFromSquare}
                  className="text-[10px]"
                />
                Verify credential
              </div>
            </a>
          ))}
        </div>
      )}
    </section>
  );
}
