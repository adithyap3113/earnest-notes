import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  about,
  ending,
  feel,
  final,
  highlightedMessages,
  highlightedTitle,
  introduction,
  meta,
  need,
  opening,
  understand,
} from "@/content";
import { MessageCard, Reveal, RichText, Section } from "@/components/letter";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: meta.title },
      { name: "description", content: meta.description },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: meta.title },
      { property: "og:description", content: meta.description },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Letter,
});

function Letter() {
  const [read, setRead] = useState(false);

  const scrollToIntro = () => {
    document.getElementById("intro")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <main className="page">
      {/* SECTION 1 — OPENING */}
      <section className="section opening">
        <div className="mx-auto w-full max-w-[38rem] text-center">
          <Reveal>
            <h1 className="opening-title">{opening.title}</h1>
          </Reveal>
          <Reveal delay={220}>
            <p className="opening-sub">{opening.subtitle}</p>
          </Reveal>
          <Reveal delay={420}>
            <button type="button" onClick={scrollToIntro} className="btn-soft mt-10">
              {opening.button}
            </button>
          </Reveal>
        </div>
        <div className="scroll-hint" aria-hidden="true" />
      </section>

      {/* SECTION 2 — INTRODUCTION */}
      <Section id="intro">
        {introduction.map((line, i) => (
          <Reveal key={i} delay={i * 90}>
            <p className="prose-line">
              <RichText text={line} />
            </p>
          </Reveal>
        ))}
      </Section>

      <Divider />

      {/* SECTION 3 — WHAT I WANT YOU TO UNDERSTAND */}
      <Section title={understand.title}>
        <div className="mt-8 grid gap-3">
          {understand.lines.map((line, i) => (
            <Reveal key={i} delay={i * 80}>
              <div className="line-card">
                <RichText text={line} />
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Divider />

      {/* SECTION 4 — MY IMPORTANT MESSAGES */}
      <Section title={highlightedTitle} className="messages">
        <Reveal>
          <p className="messages-intro">
            {messagesIntro.map((line, i) => (
              <span key={i}>{line}</span>
            ))}
          </p>
        </Reveal>
        <div className="timeline">
          {highlightedMessages.map((item, i) =>
            item.type === "note" ? (
              <TimelineNote key={i} text={item.text} />
            ) : (
              <MessageCard key={i} text={item.text} index={i} highlight={item.highlight} />
            ),
          )}
        </div>
        <div className="messages-outro">
          {messagesOutro.lines.map((line, i) => (
            <Reveal key={i} delay={i * 90}>
              <p className="prose-line">{line}</p>
            </Reveal>
          ))}
          <Reveal delay={160}>
            <p className="focus-line">{messagesOutro.focus}</p>
          </Reveal>
        </div>
      </Section>


      <Divider />

      {/* SECTION 5 — WHAT I FEEL */}
      <Section title={feel.title}>
        {feel.lines.map((line, i) => (
          <Reveal key={i} delay={i * 70}>
            <p className="prose-line">
              <RichText text={line} />
            </p>
          </Reveal>
        ))}
        <Reveal delay={180}>
          <p className="focus-line">{feel.focus}</p>
        </Reveal>
      </Section>

      <Divider />

      {/* SECTION 6 — WHAT I NEED FROM YOU */}
      <Section title={need.title}>
        {need.lines.map((line, i) => (
          <Reveal key={i} delay={i * 70}>
            <p className="prose-line">
              <RichText text={line} />
            </p>
          </Reveal>
        ))}
      </Section>

      <Divider />

      {/* SECTION 7 — ABOUT US */}
      <Section title={about.title}>
        {about.lines.map((line, i) => (
          <Reveal key={i} delay={i * 70}>
            <p className="prose-line">
              <RichText text={line} />
            </p>
          </Reveal>
        ))}
      </Section>

      {/* SECTION 8 — FINAL MESSAGE */}
      <section className="section final">
        <div className="mx-auto w-full max-w-[40rem] text-center">
          {final.lines.map((line, i) => (
            <Reveal key={i} delay={i * 60}>
              <p className="final-line">
                <RichText text={line} />
              </p>
            </Reveal>
          ))}
          <Reveal delay={200}>
            <p className="final-focus">{final.focus}</p>
          </Reveal>
        </div>
      </section>

      {/* SECTION 9 — END */}
      <section className="section end">
        <div className="mx-auto w-full max-w-[34rem] text-center">
          {!read ? (
            <Reveal>
              <button type="button" onClick={() => setRead(true)} className="btn-soft">
                {ending.button}
              </button>
            </Reveal>
          ) : (
            <div className="thanks" role="status">
              {ending.thanks.map((line, i) => (
                <p key={i} className={i === 0 ? "thanks-title" : "thanks-sub"}>
                  {line}
                </p>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

function Divider() {
  return <div className="divider" aria-hidden="true" />;
}
