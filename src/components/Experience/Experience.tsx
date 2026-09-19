import { useRoute } from "../../hooks/useRoute";
import { useExperience } from "../../hooks/useExperience";
import { useInView } from "../../hooks/useInView";
import type { Experience as ExperienceEntry } from "../../types";
import Skeleton from "../Skeleton";
import ErrorState from "../ErrorState";

function formatDate(dateStr?: string) {
  if (!dateStr) return "Present";
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

function ExperienceRow({
  entry,
  delay,
  isLast,
}: {
  entry: ExperienceEntry;
  delay: number;
  isLast: boolean;
}) {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <div
      ref={ref}
      style={{ animationDelay: inView ? `${delay}ms` : undefined }}
      className={`py-6 scroll-reveal ${inView ? "in-view" : ""} ${
        isLast ? "" : "border-b border-border-light dark:border-border-dark"
      }`}
    >
      <div className="flex items-baseline justify-between gap-4 flex-wrap">
        <div>
          <h3 className="font-heading text-base font-semibold tracking-tight text-gray-900 dark:text-white">
            {entry.company}
          </h3>
          {entry.title && (
            <p className="mt-0.5 text-sm text-gray-600 dark:text-gray-400">
              {entry.title}
            </p>
          )}
        </div>
        <span className="font-mono text-[11px] text-gray-600 dark:text-gray-500 whitespace-nowrap">
          {formatDate(entry.startDate)} – {formatDate(entry.endDate)}
        </span>
      </div>
      {entry.description && (
        <p className="mt-4 max-w-[60ch] text-base leading-relaxed text-gray-600 dark:text-gray-400 whitespace-pre-line">
          {entry.description}
        </p>
      )}
    </div>
  );
}

export default function Experience() {
  const { route } = useRoute();
  const { experience, loading, error } = useExperience(route);

  if (!loading && !error && experience.length === 0) return null;

  return (
    <section id="experience" className="section-shell py-20">
      <h2 className="font-heading text-4xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white mb-10">
        Experience
      </h2>

      {loading && (
        <div className="flex flex-col gap-4">
          {[0, 1].map((i) => (
            <Skeleton key={i} className="h-16" />
          ))}
        </div>
      )}

      {!loading && error && <ErrorState resource="experience" />}

      {!loading && !error && experience.length > 0 && (
        <div>
          {experience.map((entry, i) => (
            <ExperienceRow
              key={entry._id}
              entry={entry}
              delay={Math.min(i * 80, 320)}
              isLast={i === experience.length - 1}
            />
          ))}
        </div>
      )}
    </section>
  );
}
