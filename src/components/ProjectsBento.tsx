import { useRoute } from "../hooks/useRoute";
import { useProjects } from "../hooks/useProjects";
import ProjectCard, { type BentoSize } from "./ProjectCard";

// Five-item repeating pattern: one feature cell followed by two pairs.
// grid-auto-flow: dense backfills any gaps once the count doesn't
// divide evenly into the pattern.
const SPAN_PATTERN = [
  "md:col-span-4 md:row-span-2",
  "md:col-span-2 md:row-span-1",
  "md:col-span-2 md:row-span-1",
  "md:col-span-3 md:row-span-1",
  "md:col-span-3 md:row-span-1",
];

const SIZE_PATTERN: BentoSize[] = ["lg", "sm", "sm", "md", "md"];

export default function ProjectsBento() {
  const { route } = useRoute();
  const { projects, loading, error } = useProjects(route);

  return (
    <section id="work" className="max-w-[1440px] mx-auto px-9 py-20">
      <h2 className="font-heading text-3xl font-bold tracking-tight text-gray-900 dark:text-white mb-10">
        Projects
      </h2>

      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-6 gap-5 auto-rows-[14rem] [grid-auto-flow:dense]">
          {SPAN_PATTERN.map((span, i) => (
            <div
              key={i}
              className={`${span} rounded-2xl border border-dashed border-border-light dark:border-border-dark bg-card dark:bg-card-dark animate-pulse`}
            />
          ))}
        </div>
      )}

      {!loading && error && (
        <p className="font-mono text-sm text-gray-500 dark:text-gray-400">
          Couldn't load projects right now ({error}).
        </p>
      )}

      {!loading && !error && projects.length === 0 && (
        <p className="font-mono text-sm text-gray-500 dark:text-gray-400">
          No projects added yet.
        </p>
      )}

      {!loading && !error && projects.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-6 gap-5 auto-rows-[14rem] [grid-auto-flow:dense]">
          {projects.map((project, i) => (
            <ProjectCard
              key={project._id}
              project={project}
              span={SPAN_PATTERN[i % SPAN_PATTERN.length]}
              size={SIZE_PATTERN[i % SIZE_PATTERN.length]}
            />
          ))}
        </div>
      )}
    </section>
  );
}