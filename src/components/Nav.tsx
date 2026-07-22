import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPalette, faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "../hooks/useTheme";
import { useRoute } from "../hooks/useRoute";
import { useClickOutside } from "../hooks/useClickOutside";

export default function Nav() {
  const { dark, setDark, hue, setHue, accentHues } = useTheme();
  const { route, setRoute } = useRoute();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const settingsRef = useClickOutside<HTMLDivElement>(() => setSettingsOpen(false));

  return (
    <nav className="flex items-center justify-between px-9 py-3.5 border-b border-border-light dark:border-border-dark relative">
      <div className="font-hero text-2xl font-extrabold tracking-tight">TA</div>

      <div className="flex bg-card dark:bg-card-dark rounded-full p-1 relative">
        <div
          className="absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-full bg-accent transition-transform duration-300"
          style={{
            transform: route === "data" ? "translateX(100%)" : "translateX(0)",
          }}
        />
        <button
          onClick={() => setRoute("software")}
          className={`relative z-10 px-6 py-2.5 text-sm font-semibold rounded-full transition-colors ${route === "software" ? "text-white" : "text-gray-500 dark:text-gray-400"}`}
        >
          Software
        </button>
        <button
          onClick={() => setRoute("data")}
          className={`relative z-10 px-6 py-2.5 text-sm font-semibold rounded-full transition-colors ${route === "data" ? "text-white" : "text-gray-500 dark:text-gray-400"}`}
        >
          Data
        </button>
      </div>

      <div className="flex items-center gap-7">
        <a
          href="#work"
          className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          Work
        </a>
        <a
          href="#resume"
          className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          Resume
        </a>
        <a
          href="#contact"
          className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          Contact
        </a>

        <div className="relative" ref={settingsRef}>
          <button
            onClick={() => setSettingsOpen(!settingsOpen)}
            className="w-9 h-9 flex items-center justify-center rounded-full border border-border-light dark:border-border-dark text-gray-500 dark:text-gray-400 hover:border-gray-300 dark:hover:border-gray-600 transition-colors"
            aria-label="Display settings"
          >
            <FontAwesomeIcon icon={faPalette} size="sm" />
          </button>

          {settingsOpen && (
            <div className="absolute right-0 mt-2 w-52 bg-surface dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-xl p-3.5 shadow-lg z-20">
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
    </nav>
  );
}
