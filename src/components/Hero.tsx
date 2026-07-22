import { useRoute } from "../hooks/useRoute";
import { useHeroAnimation } from "../hooks/useHeroAnimation";
import { getHeroContent } from "../data/heroContent";

export default function Hero() {
  const { route } = useRoute();
  const shouldAnimate = useHeroAnimation();
  const content = getHeroContent(route);

  let charIndex = 0;

  return (
    <section className="min-h-[calc(100vh-73px)] max-w-[1440px] mx-auto px-9 grid md:grid-cols-[1.2fr_1fr] gap-12 items-center py-16">
      <div>
        <h1 className="font-hero font-black text-[clamp(2.75rem,6.5vw,5.5rem)] leading-[0.92] tracking-tight">
          {content.fullName.split(" ").map((word, wordIdx) => (
            <span key={wordIdx} className="block overflow-hidden">
              {word.split("").map((char) => {
                const delay = charIndex * 0.028;
                charIndex++;
                return (
                  <span
                    key={charIndex}
                    className={shouldAnimate ? "hero-letter animate" : "hero-letter"}
                    style={shouldAnimate ? { animationDelay: `${delay}s` } : undefined}
                  >
                    {char}
                  </span>
                );
              })}
            </span>
          ))}
        </h1>

        <div className="mt-5 inline-flex items-center gap-2 font-mono text-xs text-accent border border-accent-border dark:border-accent-border-dark rounded-full px-3 py-1.5">
          {content.role}
        </div>

        <p className="mt-6 max-w-[440px] text-base leading-relaxed text-gray-600 dark:text-gray-400">
          {content.description}
        </p>

        <div className="mt-8 flex gap-3">
          <button className="px-6 py-3 rounded-lg text-sm font-semibold text-white bg-accent hover:opacity-90 transition-opacity">
            {content.primaryCta}
          </button>
          <button className="px-6 py-3 rounded-lg text-sm font-semibold border border-border-light dark:border-border-dark text-gray-900 dark:text-gray-100 hover:border-gray-300 dark:hover:border-gray-600 transition-colors">
            {content.secondaryCta}
          </button>
        </div>
      </div>

      <div className="aspect-[4/5] rounded-2xl bg-accent-tint dark:bg-accent-tint-dark border border-accent-border dark:border-accent-border-dark flex items-center justify-center">
        <span className="font-mono text-xs text-accent">portrait placeholder</span>
      </div>
    </section>
  );
}