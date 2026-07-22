import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare, faCodeBranch } from "@fortawesome/free-solid-svg-icons";
import type { Project } from "../types";
import { urlFor } from "../data/imageUrl";

export type BentoSize = "lg" | "md" | "sm";

interface ProjectCardProps {
  project: Project;
  span: string;
  size: BentoSize;
}

export default function ProjectCard({ project, span, size }: ProjectCardProps) {
  const isLarge = size === "lg";
  const isMedium = size === "md";

  const imageSrc = project.coverImage
    ? urlFor(project.coverImage)
        .width(isLarge ? 900 : 560)
        .height(isLarge ? 620 : 360)
        .fit("crop")
        .auto("format")
        .url()
    : null;

  const imageHeightClass = isLarge ? "h-3/5" : isMedium ? "h-2/5" : "h-1/3";

  return (
    <article
      className={`group relative flex flex-col overflow-hidden rounded-2xl border border-dashed border-border-light dark:border-border-dark bg-surface dark:bg-surface-dark hover:border-solid hover:border-accent transition-colors duration-300 ${span}`}
    >
      <div className={`relative overflow-hidden bg-card dark:bg-card-dark ${imageHeightClass}`}>
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center font-mono text-[10px] uppercase tracking-wide text-gray-400 dark:text-gray-600">
            no preview
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3
          className={`font-heading font-semibold tracking-tight text-gray-900 dark:text-white ${isLarge ? "text-xl" : "text-base"}`}
        >
          {project.title}
        </h3>

        <p
          className={`mt-2 text-gray-600 dark:text-gray-400 leading-relaxed ${isLarge ? "text-sm line-clamp-3" : "text-xs line-clamp-2"}`}
        >
          {project.summary}
        </p>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {project.techStack.slice(0, isLarge ? 6 : 3).map((tech) => (
            <span
              key={tech}
              className="font-mono text-[10px] uppercase tracking-wide px-2 py-1 rounded-full border border-border-light dark:border-border-dark text-gray-500 dark:text-gray-400"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-auto pt-4 flex items-center gap-4">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wide text-gray-600 dark:text-gray-400 hover:text-accent transition-colors"
            >
              <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="text-[10px]" />
              Live
            </a>
          )}
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wide text-gray-600 dark:text-gray-400 hover:text-accent transition-colors"
            >
              <FontAwesomeIcon icon={faCodeBranch} className="text-[10px]" />
              Code
            </a>
          )}
        </div>
      </div>
    </article>
  );
}