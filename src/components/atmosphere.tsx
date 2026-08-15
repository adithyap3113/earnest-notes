import { useEffect, useMemo, useRef, useState } from "react";

/* ------------------------------------------------------------------ */
/* helpers                                                             */
/* ------------------------------------------------------------------ */

export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return reduced;
}

const clamp = (n: number, min = 0, max = 1) => Math.min(max, Math.max(min, n));

/** Runs a callback on scroll/resize, throttled to one frame. */
function useFrameOnScroll(fn: () => void) {
  const saved = useRef(fn);
  saved.current = fn;
  useEffect(() => {
    let raf = 0;
    const run = () => {
      raf = 0;
      saved.current();
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(run);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);
}

/**
 * Reads every [data-night] marker in the page and interpolates a single
 * 0 (warm daylight) → 1 (deep quiet night) value onto the document root.
 */
export function NightDriver() {
  useFrameOnScroll(() => {
    const markers = Array.from(
      document.querySelectorAll<HTMLElement>("[data-night]"),
    ).map((el) => {
      const rect = el.getBoundingClientRect();
      return {
        y: rect.top + window.scrollY + rect.height / 2,
        v: Number(el.dataset["night"] ?? 0),
      };
    });
    if (markers.length === 0) return;
    markers.sort((a, b) => a.y - b.y);

    const focus = window.scrollY + window.innerHeight / 2;
    let night = markers[0]!.v;

    if (focus <= markers[0]!.y) night = markers[0]!.v;
    else if (focus >= markers[markers.length - 1]!.y) night = markers[markers.length - 1]!.v;
    else {
      for (let i = 0; i < markers.length - 1; i++) {
        const a = markers[i]!;
        const b = markers[i + 1]!;
        if (focus >= a.y && focus <= b.y) {
          const t = b.y === a.y ? 0 : (focus - a.y) / (b.y - a.y);
          const eased = t * t * (3 - 2 * t);
          night = a.v + (b.v - a.v) * eased;
          break;
        }
      }
    }
    document.documentElement.style.setProperty("--night", night.toFixed(3));
  });

  return null;
}

/** Progress of an element through the viewport: 0 entering → 1 leaving. */
function useSectionProgress<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [p, setP] = useState(0);
  useFrameOnScroll(() => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const vh = window.innerHeight;
    const total = rect.height + vh;
    const travelled = vh - rect.top;
    setP(clamp(travelled / total));
  });
  return [ref, p] as const;
}

/* ------------------------------------------------------------------ */
/* ambience: fixed background — glow + drifting particles              */
/* ------------------------------------------------------------------ */

export function Ambience() {
  const reduced = usePrefersReducedMotion();

  const particles = useMemo(
    () =>
      Array.from({ length: 18 }, (_, i) => {
        const seed = (i * 9301 + 49297) % 233280;
        const r = seed / 233280;
        const r2 = ((i * 4517 + 7919) % 1000) / 1000;
        return {
          left: `${(r * 100).toFixed(2)}%`,
          top: `${(r2 * 100).toFixed(2)}%`,
          size: `${(2 + r2 * 3).toFixed(1)}px`,
          duration: `${(16 + r * 20).toFixed(1)}s`,
          delay: `-${(r2 * 24).toFixed(1)}s`,
          drift: `${(r < 0.5 ? -1 : 1) * (10 + r2 * 26)}px`,
        };
      }),
    [],
  );

  return (
    <div className="ambience" aria-hidden="true">
      <div className="ambience-glow" />
      <div className="ambience-veil" />
      {!reduced && (
        <div className="ambience-particles">
          {particles.map((p, i) => (
            <span
              key={i}
              className="particle"
              style={
                {
                  left: p.left,
                  top: p.top,
                  width: p.size,
                  height: p.size,
                  animationDuration: p.duration,
                  animationDelay: p.delay,
                  "--drift": p.drift,
                } as React.CSSProperties
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* scenes                                                              */
/* ------------------------------------------------------------------ */

/** Two points of light drifting apart as you scroll. */
export function DistanceScene() {
  const [ref, p] = useSectionProgress<HTMLDivElement>();
  const reduced = usePrefersReducedMotion();
  const spread = reduced ? 0.7 : clamp((p - 0.15) / 0.7);

  return (
    <section className="scene" data-night="0.72">
      <div ref={ref} className="scene-stage">
        <span
          className="orb orb-mine"
          style={{ transform: `translate(-50%, -50%) translateX(${(-8 - spread * 30).toFixed(2)}vw)` }}
        />
        <span
          className="orb orb-hers"
          style={{
            transform: `translate(-50%, -50%) translateX(${(8 + spread * 30).toFixed(2)}vw)`,
            opacity: (1 - spread * 0.45).toFixed(3),
          }}
        />
        <span
          className="orb-thread"
          style={{
            width: `${(16 + spread * 60).toFixed(2)}vw`,
            opacity: (0.5 - spread * 0.45).toFixed(3),
          }}
        />
      </div>
    </section>
  );
}

/** One soft light, breathing, surrounded by emptiness. */
export function SilenceScene() {
  return (
    <section className="scene scene-tall" data-night="1">
      <div className="scene-stage">
        <span className="orb orb-alone" />
      </div>
    </section>
  );
}

/** A near light slowly moving toward a distant one. */
export function ReachScene() {
  const [ref, p] = useSectionProgress<HTMLDivElement>();
  const reduced = usePrefersReducedMotion();
  const near = reduced ? 0.8 : clamp((p - 0.1) / 0.75);

  return (
    <section className="scene scene-tall" data-night="0.78">
      <div ref={ref} className="scene-stage">
        <span
          className="orb orb-hers"
          style={{
            transform: `translate(-50%, -50%) translateX(${(26 - near * 21).toFixed(2)}vw)`,
            opacity: (0.55 + near * 0.45).toFixed(3),
          }}
        />
        <span
          className="orb orb-mine"
          style={{
            transform: `translate(-50%, -50%) translateX(${(-26 + near * 21).toFixed(2)}vw)`,
          }}
        />
        <span
          className="orb-warmth"
          style={{ opacity: (near * 0.9).toFixed(3) }}
        />
      </div>
      <span className="scene-night-shift" data-night={(0.78 - 0.5).toFixed(2)} />
    </section>
  );
}

/** Final quiet light; blooms and is joined by a second light when read. */
export function ClosingLight({ joined }: { joined: boolean }) {
  return (
    <div className={`closing-light ${joined ? "is-joined" : ""}`} aria-hidden="true">
      <span className="orb orb-close orb-close-a" />
      <span className="orb orb-close orb-close-b" />
    </div>
  );
}
