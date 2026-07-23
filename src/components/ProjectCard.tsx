import { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUpRightFromSquare,
  faCodeBranch,
  faPlay,
} from "@fortawesome/free-solid-svg-icons";
import type { Project } from "../types";
import { urlFor } from "../data/imageUrl";

interface ProjectCardProps {
  project: Project;
  emphasized: boolean;
}

export default function ProjectCard({ project, emphasized }: ProjectCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [videoActive, setVideoActive] = useState(false);

  const imageSrc = project.coverImage
    ? urlFor(project.coverImage)
        .width(emphasized ? 1000 : 800)
        .fit("max")
        .auto("format")
        .url()
    : null;

  const videoUrl = project.showcaseVideo?.asset?.url;

  function handleEnter() {
    if (!videoUrl) return;
    hoverTimer.current = setTimeout(() => {
      setVideoActive(true);
      videoRef.current?.play();
    }, 350);
  }

  function handleLeave() {
    if (!videoUrl) return;
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    setVideoActive(false);
    videoRef.current?.pause();
    if (videoRef.current) videoRef.current.currentTime = 0;
  }

  return (
    <article
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-dashed border-border-light dark:border-border-dark hover:border-solid hover:border-accent transition-colors duration-300"
    >
      <div className="relative aspect-video overflow-hidden bg-card dark:bg-card-dark flex items-center justify-center">
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={project.title}
            className={`w-full h-full object-cover transition-opacity duration-500 ${
              videoActive ? "opacity-0" : "opacity-100"
            }`}
            loading="lazy"
          />
        ) : (
          <div className="font-mono text-[10px] uppercase tracking-wide text-gray-400 dark:text-gray-600">
            no preview
          </div>
        )}

        {videoUrl && (
          <video
            ref={videoRef}
            src={videoUrl}
            poster={imageSrc ?? undefined}
            preload="metadata"
            muted
            loop
            playsInline
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
              videoActive ? "opacity-100" : "opacity-0"
            }`}
          />
        )}

        {videoUrl && (
          <div
            className={`absolute bottom-3 right-3 w-8 h-8 rounded-lg bg-black/60 backdrop-blur-sm flex items-center justify-center transition-opacity duration-300 ${
              videoActive ? "opacity-0" : "opacity-100"
            }`}
          >
            <FontAwesomeIcon
              icon={faPlay}
              className="text-white text-[10px] ml-0.5"
            />
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
              className="font-mono text-[10px] uppercase tracking-wide px-2 py-1 rounded-lg border border-accent-border dark:border-accent-border-dark text-accent"
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
