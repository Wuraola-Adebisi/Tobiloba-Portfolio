import { useState } from "react";

export function useHeroAnimation() {
  const [shouldAnimate] = useState(() => {
    if (typeof window === "undefined") return false;
    const alreadyPlayed = sessionStorage.getItem("heroNamePlayed");
    if (alreadyPlayed) return false;
    sessionStorage.setItem("heroNamePlayed", "true");
    return true;
  });

  return shouldAnimate;
}