import { useRoute } from "../hooks/useRoute";
import { useSkills } from "../hooks/useSkills";
import Skeleton from "./Skeleton";

export default function SkillsBento() {
  const { route } = useRoute();
  const { skills, loading, error } = useSkills(route);

  const grouped = skills.reduce<Record<string, string[]>>((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill.name);
    return acc;
  }, {});

  const categories = Object.entries(grouped).sort(
    (a, b) => b[1].length - a[1].length,
  );

  return (
    <section id="skills" className="max-w-[1440px] mx-auto px-5 md:px-9 py-20">
      <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white mb-10">
        Skills
      </h2>

      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 auto-rows-[8rem]">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} />
          ))}
        </div>
      )}

      {!loading && error && (
        <p className="font-mono text-sm text-gray-500 dark:text-gray-400">
          Couldn't load skills right now, {error}.
        </p>
      )}

      {!loading && !error && categories.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-4 auto-rows-[minmax(8rem,auto)] gap-5">
          {categories.map(([category, names], i) => {
            const isPrimary = i === 0;
            const span = isPrimary
              ? "md:col-span-2 md:row-span-2"
              : names.length > 5
                ? "md:col-span-2"
                : "md:col-span-1";

            return (
              <div
                key={category}
                className={`rounded-2xl border-2 border-dashed transition-colors duration-300 p-5 flex flex-col ${span} ${
                  isPrimary
                    ? "bg-accent border-accent text-white"
                    : "bg-card dark:bg-card-dark border-border-light dark:border-border-dark hover:border-accent"
                }`}
              >
                <h3
                  className={`font-semibold tracking-tight mb-4 ${
                    isPrimary
                      ? "text-lg text-white"
                      : "text-sm text-gray-900 dark:text-white"
                  }`}
                >
                  {category}
                </h3>
                <div className="flex flex-wrap gap-2 content-start">
                  {names.map((name) =>
                    isPrimary ? (
                      <span
                        key={name}
                        className="font-mono text-[10px] uppercase tracking-wide px-2.5 py-1.5 rounded-lg bg-white/15 border border-white/30 text-white"
                      >
                        {name}
                      </span>
                    ) : (
                      <span
                        key={name}
                        className="font-mono text-[10px] uppercase tracking-wide px-2.5 py-1.5 rounded-lg border border-accent-border dark:border-accent-border-dark text-accent"
                      >
                        {name}
                      </span>
                    ),
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
