import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUpRightFromSquare,
  faCodeBranch,
} from "@fortawesome/free-solid-svg-icons";
import type { Project } from "../types";
import { urlFor } from "../data/imageUrl";

interface ProjectCardProps {
  project: Project;
  emphasized: boolean;
}

export default function ProjectCard({ project, emphasized }: ProjectCardProps) {
  const imageSrc = project.coverImage
    ? urlFor(project.coverImage)
        .width(emphasized ? 900 : 700)
        .height(emphasized ? 560 : 440)
        .fit("crop")
        .auto("format")
        .url()
    : null;

  const imageHeight = emphasized ? "h-72" : "h-36";

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-dashed border-border-light dark:border-border-dark hover:border-solid hover:border-accent transition-colors duration-300">
      <div
        className={`relative overflow-hidden bg-card dark:bg-card-dark ${imageHeight}`}
      >
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

      <div className="grid grid-cols-2 gap-x-4 gap-y-3 p-5 flex-1 min-h-0 overflow-hidden">
        <h3
          className={`col-span-1 font-semibold tracking-tight text-gray-900 dark:text-white self-start ${
            emphasized ? "text-xl" : "text-base"
          }`}
        >
          {project.title}
        </h3>
        <div className="col-span-1 font-mono text-[10px] uppercase tracking-wide text-accent self-start justify-self-end">
          {project.focusArea}
        </div>

        <p
          className={`col-span-2 text-gray-600 dark:text-gray-400 leading-relaxed ${
            emphasized ? "text-sm line-clamp-3" : "text-sm line-clamp-2"
          }`}
        >
          {project.summary}
        </p>

        <div className="col-span-1 flex flex-wrap gap-1.5 self-end">
          {project.techStack.slice(0, emphasized ? 5 : 3).map((tech) => (
            <span
              key={tech}
              className="font-mono text-[10px] uppercase tracking-wide px-2 py-1 rounded-full border border-accent-border dark:border-accent-border-dark text-accent"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="col-span-1 flex items-center justify-end gap-4 self-end">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 font-mono text-[11px] text-gray-600 dark:text-gray-400 hover:text-accent transition-colors"
            >
              <FontAwesomeIcon
                icon={faArrowUpRightFromSquare}
                className="text-[10px]"
              />
              Live
            </a>
          )}
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 font-mono text-[11px] text-gray-600 dark:text-gray-400 hover:text-accent transition-colors"
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
