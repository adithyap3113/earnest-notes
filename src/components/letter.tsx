import { useEffect, useRef, useState, type ReactNode } from "react";

/** Turns *emphasised* phrases into styled spans. Everything else stays as typed. */
export function RichText({ text }: { text: string }) {
  const parts = text.split(/(\*[^*]+\*)/g);
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith("*") && part.endsWith("*") && part.length > 2 ? (
          <em key={i} className="emphasis">
            {part.slice(1, -1)}
          </em>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  );
}

/** Fades content in the first time it enters the viewport. */
export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${shown ? "is-visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export function Section({
  id,
  title,
  children,
  className = "",
}: {
  id?: string;
  title?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`section ${className}`}>
      <div className="mx-auto w-full max-w-[42rem]">
        {title ? (
          <Reveal>
            <h2 className="section-title">{title}</h2>
          </Reveal>
        ) : null}
        {children}
      </div>
    </section>
  );
}

export function MessageCard({ text, index }: { text: string; index: number }) {
  return (
    <Reveal delay={index * 90}>
      <article className="message-card">
        <span className="message-index">{String(index + 1).padStart(2, "0")}</span>
        <p className="message-text">
          <RichText text={text} />
        </p>
      </article>
    </Reveal>
  );
}
