import { useEffect, useState } from "react";

const ACCENT_HUES = [217, 195, 230];

export function useTheme() {
  const [dark, setDark] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });
  const [hue, setHue] = useState(217);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  useEffect(() => {
    document.documentElement.style.setProperty("--accent-hue", `${hue}deg`);
  }, [hue]);

  return { dark, setDark, hue, setHue, accentHues: ACCENT_HUES };
}