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

export function MessageCard({
  text,
  index,
  highlight = false,
}: {
  text: string;
  index: number;
  highlight?: boolean;
}) {
  return (
    <Reveal delay={Math.min(index, 3) * 70} className="timeline-item">
      <span className="timeline-dot" aria-hidden="true" />
      <article className={highlight ? "message-card message-card-strong" : "message-card"}>
        <p className={highlight ? "message-text-strong" : "message-text"}>
          <RichText text={text} />
        </p>
      </article>
    </Reveal>
  );
}

export function TimelineNote({ text }: { text: string }) {
  return (
    <Reveal className="timeline-note">
      <span>{text}</span>
    </Reveal>
  );
}

