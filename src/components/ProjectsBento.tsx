import { useRoute } from "../hooks/useRoute";
import { useProjects } from "../hooks/useProjects";
import ProjectCard from "./ProjectCard";
import Skeleton from "./Skeleton";

export default function ProjectsBento() {
  const { route } = useRoute();
  const { projects, loading, error } = useProjects(route);
  const rows: [
    (typeof projects)[number],
    (typeof projects)[number] | undefined,
  ][] = [];
  for (let i = 0; i < projects.length; i += 2) {
    rows.push([projects[i], projects[i + 1]]);
  }

  return (
    <section id="work" className="max-w-[1440px] mx-auto px-5 md:px-9 py-20">
      <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white mb-10">
        Projects
      </h2>

      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {[0, 1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-80" />
          ))}
        </div>
      )}

      {!loading && error && (
        <p className="font-mono text-sm text-gray-500 dark:text-gray-400">
          Couldn't load projects right now, {error}.
        </p>
      )}

      {!loading && !error && projects.length === 0 && (
        <p className="font-mono text-sm text-gray-500 dark:text-gray-400">
          No projects added yet.
        </p>
      )}

      {!loading && !error && projects.length > 0 && (
        <div className="flex flex-col gap-5">
          {rows.map(([first, second], rowIndex) => {
            const flip = rowIndex % 2 === 1;
            return (
              <div
                key={first._id}
                className="grid grid-cols-1 md:[grid-template-columns:var(--row-split)] gap-5"
                style={
                  second
                    ? ({
                        "--row-split": flip ? "1fr 1.35fr" : "1.35fr 1fr",
                      } as React.CSSProperties)
                    : undefined
                }
              >
                {flip && second ? (
                  <>
                    <ProjectCard project={second} emphasized={false} />
                    <ProjectCard project={first} emphasized={true} />
                  </>
                ) : (
                  <>
                    <ProjectCard project={first} emphasized={true} />
                    {second && (
                      <ProjectCard project={second} emphasized={false} />
                    )}
                  </>
                )}
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
