import { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPalette,
  faSun,
  faMoon,
  faBars,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "../hooks/useTheme";
import { useRoute } from "../hooks/useRoute";
import { useClickOutside } from "../hooks/useClickOutside";
import { useEscapeKey } from "../hooks/useEscapeKey";
import { useSiteSettings } from "../hooks/useSiteSettings";

export default function Nav() {
  const { dark, setDark, hue, setHue, accentHues } = useTheme();
  const { route, setRoute } = useRoute();
  const { settings } = useSiteSettings();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const settingsRef = useClickOutside<HTMLDivElement>(() =>
    setSettingsOpen(false),
  );
  useEscapeKey(() => {
    setSettingsOpen(false);
    setMobileMenuOpen(false);
  });

  const resumeUrl =
    route === "data"
      ? settings?.dataResume?.asset?.url
      : settings?.softwareResume?.asset?.url;

  return (
    <nav className="sticky top-0 z-30 border-b border-border-light dark:border-border-dark bg-surface/90 dark:bg-surface-dark/90 backdrop-blur-md">
      <div className="flex items-center justify-between px-5 md:px-9 py-3">
        <Link
          to="/"
          className="font-hero text-2xl font-extrabold tracking-tight"
        >
          TA
        </Link>

        <div className="flex bg-card dark:bg-card-dark rounded-xl p-1 relative">
          <div
            className="absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-lg bg-accent transition-transform duration-300"
            style={{
              transform:
                route === "data" ? "translateX(100%)" : "translateX(0)",
            }}
          />
          <button
            onClick={() => setRoute("software")}
            className={`relative z-10 px-4 md:px-6 py-2 md:py-2.5 text-xs md:text-sm font-semibold rounded-lg transition-colors ${
              route === "software"
                ? "text-white"
                : "text-gray-500 dark:text-gray-400"
            }`}
          >
            Software
          </button>
          <button
            onClick={() => setRoute("data")}
            className={`relative z-10 px-4 md:px-6 py-2 md:py-2.5 text-xs md:text-sm font-semibold rounded-lg transition-colors ${
              route === "data"
                ? "text-white"
                : "text-gray-500 dark:text-gray-400"
            }`}
          >
            Data
          </button>
        </div>

        <div className="hidden md:flex items-center gap-6">
          <a
            href="#work"
            className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            Work
          </a>
          <a
            href="#contact"
            className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            Contact
          </a>

          <a
            href={resumeUrl}
            target="_blank"
            rel="noreferrer"
            className="text-sm font-semibold text-white bg-accent px-5 py-2 rounded-lg hover:opacity-90 transition-opacity"
          >
            Resume
          </a>

          <div className="relative" ref={settingsRef}>
            <button
              onClick={() => setSettingsOpen(!settingsOpen)}
              aria-expanded={settingsOpen}
              aria-haspopup="true"
              aria-label="Display settings"
              className="w-9 h-9 flex items-center justify-center rounded-full border border-border-light dark:border-border-dark text-gray-500 dark:text-gray-400 hover:border-gray-300 dark:hover:border-gray-600 transition-colors"
            >
              <FontAwesomeIcon icon={faPalette} size="sm" />
            </button>

            {settingsOpen && (
              <div
                role="menu"
                className="absolute right-0 mt-2 w-52 bg-surface dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-xl p-3.5 shadow-lg z-20"
              >
                <div className="text-[10px] font-mono text-gray-400 dark:text-gray-500 mb-2 tracking-wide">
                  ACCENT
                </div>
                <div className="flex gap-2 mb-4">
                  {accentHues.map((h) => (
                    <button
                      key={h}
                      onClick={() => setHue(h)}
                      className={`w-6 h-6 rounded-full border-2 transition-colors ${hue === h ? "border-gray-900 dark:border-white" : "border-transparent"}`}
                      style={{ background: `hsl(${h}deg 88% 52%)` }}
                      aria-label={`Set accent hue ${h}`}
                    />
                  ))}
                </div>
                <div className="text-[10px] font-mono text-gray-400 dark:text-gray-500 mb-2 tracking-wide">
                  APPEARANCE
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setDark(false)}
                    className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold transition-colors ${!dark ? "bg-card dark:bg-card-dark text-gray-900 dark:text-white" : "text-gray-500 dark:text-gray-400"}`}
                  >
                    <FontAwesomeIcon icon={faSun} size="xs" /> Light
                  </button>
                  <button
                    onClick={() => setDark(true)}
                    className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold transition-colors ${dark ? "bg-card dark:bg-card-dark text-gray-900 dark:text-white" : "text-gray-500 dark:text-gray-400"}`}
                  >
                    <FontAwesomeIcon icon={faMoon} size="xs" /> Dark
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-expanded={mobileMenuOpen}
          aria-label="Open menu"
          className="md:hidden w-9 h-9 flex items-center justify-center rounded-full border border-border-light dark:border-border-dark text-gray-600 dark:text-gray-400"
        >
          <FontAwesomeIcon icon={mobileMenuOpen ? faXmark : faBars} size="sm" />
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border-light dark:border-border-dark px-5 py-5 flex flex-col gap-5">
          <a
            href="#work"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Work
          </a>
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Contact
          </a>

          <a
            href={resumeUrl}
            target="_blank"
            rel="noreferrer"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm font-semibold text-white bg-accent px-4 py-2.5 rounded-lg text-center"
          >
            Resume
          </a>

          <div className="pt-2 border-t border-border-light dark:border-border-dark">
            <div className="text-[10px] font-mono text-gray-400 dark:text-gray-500 mb-2 tracking-wide">
              ACCENT
            </div>
            <div className="flex gap-2 mb-4">
              {accentHues.map((h) => (
                <button
                  key={h}
                  onClick={() => setHue(h)}
                  className={`w-6 h-6 rounded-full border-2 transition-colors ${hue === h ? "border-gray-900 dark:border-white" : "border-transparent"}`}
                  style={{ background: `hsl(${h}deg 88% 52%)` }}
                  aria-label={`Set accent hue ${h}`}
                />
              ))}
            </div>
            <div className="text-[10px] font-mono text-gray-400 dark:text-gray-500 mb-2 tracking-wide">
              APPEARANCE
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setDark(false)}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold ${!dark ? "bg-card dark:bg-card-dark text-gray-900 dark:text-white" : "text-gray-500 dark:text-gray-400"}`}
              >
                <FontAwesomeIcon icon={faSun} size="xs" /> Light
              </button>
              <button
                onClick={() => setDark(true)}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold ${dark ? "bg-card dark:bg-card-dark text-gray-900 dark:text-white" : "text-gray-500 dark:text-gray-400"}`}
              >
                <FontAwesomeIcon icon={faMoon} size="xs" /> Dark
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
