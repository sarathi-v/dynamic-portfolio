// Template 07 — Crimson Noir (animated)
// Black + crimson, giant name behind the portrait.
// Font: Anton (display) + Inter

import { useEffect, useRef, useState } from "react";
import { Img, Socials } from "./shared";

const display = {
  fontFamily: "Anton, Impact, sans-serif",
};

const body = {
  fontFamily: "Inter, system-ui, sans-serif",
};

const EASE = "cubic-bezier(.2,.7,.2,1)";

const num = (i) => String(i + 1).padStart(2, "0");

/* =========================================================
   ANIMATION CSS
========================================================= */

const CSS = `
@keyframes cn-float {
  0%,100% {
    transform: translate3d(0,0,0) scale(1);
  }
  50% {
    transform: translate3d(25px,-35px,0) scale(1.08);
  }
}

@keyframes cn-float-reverse {
  0%,100% {
    transform: translate3d(0,0,0) scale(1);
  }
  50% {
    transform: translate3d(-30px,25px,0) scale(.95);
  }
}

@keyframes cn-spin {
  to {
    transform: rotate(360deg);
  }
}

@keyframes cn-pulse {
  0% {
    box-shadow:
      0 0 0 0 rgba(239,68,68,.55),
      0 0 25px rgba(239,68,68,.2);
  }
  100% {
    box-shadow:
      0 0 0 20px rgba(239,68,68,0),
      0 0 45px rgba(239,68,68,.05);
  }
}

@keyframes cn-glow {
  0%,100% {
    opacity:.3;
  }
  50% {
    opacity:.75;
  }
}

@keyframes cn-marquee {
  to {
    transform: translateX(-50%);
  }
}

@keyframes cn-shine {
  from {
    transform: translateX(-140%) skewX(-20deg);
  }
  to {
    transform: translateX(230%) skewX(-20deg);
  }
}

@keyframes cn-bob {
  0%,100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-8px);
  }
}

@keyframes cn-blink {
  0%,49% {
    opacity:1;
  }
  50%,100% {
    opacity:0;
  }
}

@keyframes cn-line {
  from {
    transform:scaleX(0);
    transform-origin:left;
  }
  to {
    transform:scaleX(1);
    transform-origin:left;
  }
}

@keyframes cn-redshift {
  0%,100% {
    opacity:.25;
  }
  50% {
    opacity:.6;
  }
}

/* Reveal */

.cn-r {
  opacity:0;
  transition:
    opacity .9s ${EASE},
    transform .9s ${EASE};
}

.cn-up {
  transform:translateY(42px);
}

.cn-left {
  transform:translateX(-50px);
}

.cn-right {
  transform:translateX(50px);
}

.cn-zoom {
  transform:scale(.92);
}

.cn-r.cn-in {
  opacity:1;
  transform:none;
}

/* Word animation */

.cn-word {
  display:inline-block;
  overflow:hidden;
  vertical-align:bottom;
  padding-bottom:.08em;
}

.cn-word > span {
  display:inline-block;
  transform:translateY(115%);
  transition:transform 1s ${EASE};
}

.cn-title-in .cn-word > span {
  transform:none;
}

/* Image wipe */

.cn-wipe {
  clip-path:inset(0 100% 0 0);
  transition:
    clip-path 1.2s cubic-bezier(.7,0,.2,1);
}

.cn-wipe.cn-in {
  clip-path:inset(0 0 0 0);
}

/* Giant background text */

.cn-giant {
  transition:
    transform 1.2s ${EASE},
    opacity 1s ease;
}

/* Crimson gradient */

.cn-gradient {
  background:
    linear-gradient(
      90deg,
      #ef4444,
      #991b1b,
      #ef4444,
      #f87171
    );

  background-size:200% auto;

  -webkit-background-clip:text;
  background-clip:text;

  color:transparent;

  animation:cn-gradient 6s linear infinite;
}

@keyframes cn-gradient {
  to {
    background-position:200% center;
  }
}

/* Card */

.cn-card {
  position:relative;
  overflow:hidden;
  transition:
    transform .35s ${EASE},
    border-color .3s ease,
    box-shadow .3s ease;
}

.cn-card:hover {
  border-color:rgba(239,68,68,.6);
  box-shadow:
    0 0 35px rgba(239,68,68,.12);
}

/* Cursor spotlight */

.cn-spot {
  background:
    radial-gradient(
      300px circle at var(--x,50%) var(--y,50%),
      rgba(239,68,68,.16),
      transparent 70%
    );
}

/* Button */

.cn-btn {
  position:relative;
  overflow:hidden;
}

.cn-btn::after {
  content:"";
  position:absolute;
  inset:0;
  width:35%;
  background:rgba(255,255,255,.35);
  transform:translateX(-140%) skewX(-20deg);
}

.cn-btn:hover::after {
  animation:cn-shine .8s ease;
}

/* Grain */

.cn-grain {
  background-image:
    radial-gradient(
      rgba(255,255,255,.08) 1px,
      transparent 1px
    );

  background-size:4px 4px;

  opacity:.035;
}

/* Reduced motion */

@media (prefers-reduced-motion:reduce) {
  .cn-r,
  .cn-word > span,
  .cn-wipe {
    opacity:1!important;
    transform:none!important;
    clip-path:none!important;
    transition:none!important;
  }

  .cn-gradient,
  [class*=cn-anim],
  .cn-btn:hover::after {
    animation:none!important;
  }
}
`;

/* =========================================================
   HELPERS
========================================================= */

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const element = ref.current;

    if (!element) return;

    if (!("IntersectionObserver" in window)) {
      setSeen(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [threshold]);

  return [ref, seen];
}

function Reveal({
  children,
  v = "up",
  delay = 0,
  className = "",
}) {
  const [ref, seen] = useInView();

  return (
    <div
      ref={ref}
      style={{
        transitionDelay: `${delay}ms`,
      }}
      className={`cn-r cn-${v} ${
        seen ? "cn-in" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}

function Title({
  as: Tag = "h2",
  lines,
  className = "",
  delay = 0,
}) {
  const [ref, seen] = useInView(0.25);

  let count = 0;

  return (
    <Tag
      ref={ref}
      aria-label={lines.join(" ")}
      className={`${className} ${
        seen ? "cn-title-in" : ""
      }`}
    >
      {lines.map((line, i) => (
        <span
          key={i}
          aria-hidden="true"
          className="block"
        >
          {String(line)
            .split(" ")
            .map((word, j) => {
              const index = count++;

              return (
                <span
                  key={j}
                  className="cn-word mr-[0.22em]"
                >
                  <span
                    style={{
                      transitionDelay:
                        `${delay + index * 80}ms`,
                    }}
                  >
                    {word}
                  </span>
                </span>
              );
            })}
        </span>
      ))}
    </Tag>
  );
}

function Wipe({
  children,
  delay = 0,
  className = "",
}) {
  const [ref, seen] = useInView(0.1);

  return (
    <div
      ref={ref}
      style={{
        transitionDelay: `${delay}ms`,
      }}
      className={`cn-wipe ${
        seen ? "cn-in" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}

function Card({
  children,
  className = "",
  as: Tag = "div",
}) {
  const ref = useRef(null);

  const move = (e) => {
    if (!ref.current) return;

    const rect =
      ref.current.getBoundingClientRect();

    ref.current.style.setProperty(
      "--x",
      `${e.clientX - rect.left}px`
    );

    ref.current.style.setProperty(
      "--y",
      `${e.clientY - rect.top}px`
    );
  };

  return (
    <Tag
      ref={ref}
      onPointerMove={move}
      className={`group cn-card relative overflow-hidden ${className}`}
    >
      <span
        aria-hidden="true"
        className="cn-spot pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />

      {children}
    </Tag>
  );
}

function Tilt({
  children,
  className = "",
}) {
  const ref = useRef(null);

  const move = (e) => {
    if (
      !ref.current ||
      e.pointerType === "touch"
    ) {
      return;
    }

    const rect =
      ref.current.getBoundingClientRect();

    const x =
      (e.clientX - rect.left) /
        rect.width -
      0.5;

    const y =
      (e.clientY - rect.top) /
        rect.height -
      0.5;

    ref.current.style.transform =
      `perspective(1000px)
       rotateX(${y * -5}deg)
       rotateY(${x * 5}deg)
       translateY(-4px)`;
  };

  const leave = () => {
    if (ref.current) {
      ref.current.style.transform = "";
    }
  };

  return (
    <div
      ref={ref}
      onPointerMove={move}
      onPointerLeave={leave}
      className={className}
      style={{
        transition:
          "transform .25s ease-out",
      }}
    >
      {children}
    </div>
  );
}

function Count({ to }) {
  const [ref, seen] = useInView(0.5);
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!seen) return;

    if (
      window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches
    ) {
      setValue(to);
      return;
    }

    let raf;
    let start;

    const step = (time) => {
      start ??= time;

      const progress = Math.min(
        1,
        (time - start) / 1000
      );

      const eased =
        1 - Math.pow(1 - progress, 3);

      setValue(Math.round(to * eased));

      if (progress < 1) {
        raf = requestAnimationFrame(step);
      }
    };

    raf = requestAnimationFrame(step);

    return () => cancelAnimationFrame(raf);
  }, [seen, to]);

  return <span ref={ref}>{value}</span>;
}

function SectionTitle({
  number,
  children,
}) {
  return (
    <Reveal v="left">
      <div className="mb-8 flex items-center gap-5">
        <span className="text-xs text-red-500">
          {number}
        </span>

        <h2
          style={display}
          className="text-3xl uppercase tracking-wide text-white"
        >
          {children}
        </h2>

        <span className="h-px flex-1 bg-white/20" />
      </div>
    </Reveal>
  );
}

/* =========================================================
   TEMPLATE
========================================================= */

function CrimsonNoirTemplate({
  portfolio,
}) {
  const {
    name,
    role,
    email,
    profileImage,
    about,
    skills,
    projects,
    caseStudy,
    designPhilosophy,
    coreValues,
    personalAesthetic,
    socialLinks,
  } = portfolio;

  const progress = useRef(null);
  const hero = useRef(null);
  const mouseGlow = useRef(null);

  /* -----------------------------------------
     Scroll progress + cursor glow
  ----------------------------------------- */

  useEffect(() => {
    const reduced =
      window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

    const onScroll = () => {
      const doc =
        document.documentElement;

      const value =
        doc.scrollTop /
        Math.max(
          1,
          doc.scrollHeight -
            doc.clientHeight
        );

      if (progress.current) {
        progress.current.style.transform =
          `scaleX(${value})`;
      }
    };

    const onPointerMove = (e) => {
      if (reduced) return;

      if (mouseGlow.current) {
        mouseGlow.current.style.transform =
          `translate(
            ${e.clientX - 180}px,
            ${e.clientY - 180}px
          )`;
      }

      if (hero.current) {
        const x =
          e.clientX /
            window.innerWidth -
          0.5;

        const y =
          e.clientY /
            window.innerHeight -
          0.5;

        hero.current.style.setProperty(
          "--mx",
          x.toFixed(3)
        );

        hero.current.style.setProperty(
          "--my",
          y.toFixed(3)
        );
      }
    };

    onScroll();

    window.addEventListener(
      "scroll",
      onScroll,
      { passive: true }
    );

    window.addEventListener(
      "pointermove",
      onPointerMove
    );

    return () => {
      window.removeEventListener(
        "scroll",
        onScroll
      );

      window.removeEventListener(
        "pointermove",
        onPointerMove
      );
    };
  }, []);

  return (
    <div
      style={body}
      className="min-h-screen overflow-x-hidden bg-black text-neutral-300"
    >
      <style>{CSS}</style>

      {/* SCROLL PROGRESS */}

      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 top-0 z-[70] h-1"
      >
        <div
          ref={progress}
          className="h-full origin-left bg-gradient-to-r from-red-700 via-red-500 to-red-300"
          style={{
            transform: "scaleX(0)",
          }}
        />
      </div>

      {/* MOUSE GLOW */}

      <div
        ref={mouseGlow}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-0 hidden h-[360px] w-[360px] rounded-full bg-red-600/10 blur-3xl md:block"
        style={{
          transform:
            "translate(-500px,-500px)",
          transition:
            "transform .35s ease-out",
        }}
      />

      {/* GRAIN */}

      <div
        aria-hidden="true"
        className="cn-grain pointer-events-none fixed inset-0 z-[60]"
      />

      {/* =================================================
          01 — HERO
      ================================================= */}

      <section
        ref={hero}
        className="relative mx-auto flex min-h-[90vh] max-w-7xl flex-col justify-between overflow-hidden px-5 pt-5"
      >
        {/* Animated background glow */}

        <div
          aria-hidden="true"
          className="cn-anim absolute -left-40 top-20 h-96 w-96 rounded-full bg-red-800/20 blur-3xl"
          style={{
            animation:
              "cn-float 13s ease-in-out infinite",
            transform:
              "translate3d(calc(var(--mx,0)*30px),calc(var(--my,0)*30px),0)",
          }}
        />

        <div
          aria-hidden="true"
          className="cn-anim absolute -right-40 bottom-10 h-96 w-96 rounded-full bg-red-950/50 blur-3xl"
          style={{
            animation:
              "cn-float-reverse 16s ease-in-out infinite",
          }}
        />

        {/* Header */}

        <Reveal>
          <div className="relative z-30 flex justify-between border-b border-white/10 pb-4 text-xs text-neutral-400">
            <span>{role}</span>

            {email && (
              <a
                href={`mailto:${email}`}
                className="transition hover:text-red-400"
              >
                Available for work
              </a>
            )}
          </div>
        </Reveal>

        {/* Giant background name */}

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-16 z-0 overflow-hidden text-center"
        >
          <div
            style={display}
            className="cn-giant cn-gradient break-words text-[26vw] uppercase leading-[0.78] opacity-40 md:text-[19vw]"
          >
            {name}
          </div>
        </div>

        {/* Decorative ring */}

        <div
          aria-hidden="true"
          className="absolute left-1/2 top-[42%] z-0 hidden h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-red-600/10 md:block"
          style={{
            animation:
              "cn-spin 28s linear infinite",
          }}
        />

        {/* Portrait */}

        {profileImage && (
          <Reveal
            v="zoom"
            delay={250}
            className="absolute bottom-0 left-1/2 z-10 h-[78%] w-auto max-w-[90%] -translate-x-1/2"
          >
            <div
              style={{
                animation:
                  "cn-bob 7s ease-in-out infinite",
              }}
              className="relative h-full"
            >
              <Img
                src={profileImage}
                alt={`Portrait of ${name}`}
                className="h-full w-auto max-w-full object-cover [mask-image:linear-gradient(to_bottom,black_75%,transparent)]"
              />

              <span
                aria-hidden="true"
                className="absolute bottom-20 right-5 h-4 w-4 rounded-full bg-red-500"
                style={{
                  animation:
                    "cn-pulse 2s ease-out infinite",
                }}
              />
            </div>
          </Reveal>
        )}

        {/* Hero content */}

        <div className="relative z-20 mt-auto pb-10 pt-72">
          <SectionTitle number="01">
            Profile
          </SectionTitle>

          <Title
            as="h1"
            lines={[name || ""]}
            delay={150}
            className="max-w-[10ch] break-words text-5xl uppercase leading-none text-white sm:text-7xl lg:text-8xl"
          />

          <Reveal
            delay={600}
          >
            <p className="mt-3 text-red-500">
              {role}
            </p>
          </Reveal>

          {about && (
            <Reveal delay={750}>
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-neutral-300">
                {about}
              </p>
            </Reveal>
          )}

          <Reveal
            delay={900}
            className="mt-7 flex flex-wrap gap-3"
          >
            {projects?.length > 0 && (
              <a
                href="#work"
                className="cn-btn rounded bg-red-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-500 hover:-translate-y-0.5 hover:shadow-[0_0_30px_rgba(239,68,68,.35)]"
              >
                View my work
              </a>
            )}

            <Socials
              portfolio={portfolio}
              className="rounded border border-white/20 px-5 py-3 text-sm transition hover:bg-white/10"
            />
          </Reveal>
        </div>
      </section>

      {/* =================================================
          SKILL MARQUEE
      ================================================= */}

      {skills?.length > 0 && (
        <div
          aria-hidden="true"
          className="overflow-hidden border-y border-white/10 bg-red-950/20 py-4"
        >
          <div
            className="flex w-max gap-10 whitespace-nowrap text-sm font-bold uppercase tracking-[0.2em] text-neutral-500"
            style={{
              animation:
                "cn-marquee 28s linear infinite",
            }}
          >
            {Array.from({
              length: 4,
            })
              .flatMap(() => skills)
              .map((skill, index) => (
                <span
                  key={index}
                  className="flex items-center gap-10"
                >
                  {skill}
                  <span className="text-red-600">
                    ◆
                  </span>
                </span>
              ))}
          </div>
        </div>
      )}

      {/* =================================================
          02 — ABOUT
      ================================================= */}

      <section
        id="about"
        className="border-t border-white/10"
      >
        <div className="mx-auto max-w-7xl px-5 py-16">
          <SectionTitle number="02">
            About me
          </SectionTitle>

          <div className="grid gap-10 md:grid-cols-12">
            <div className="md:col-span-8">
              <Title
                as="p"
                lines={[
                  about ||
                    "Creating bold digital experiences through design, technology, and visual storytelling.",
                ]}
                className="text-3xl font-medium leading-tight text-white sm:text-5xl"
              />
            </div>

            <Reveal
              v="right"
              delay={250}
              className="md:col-span-4"
            >
              <p className="text-sm leading-relaxed text-neutral-500">
                A portfolio focused on selected
                work, creative thinking, and
                purposeful digital experiences.
              </p>
            </Reveal>
          </div>

          {skills?.length > 0 && (
            <Reveal delay={400}>
              <div className="mt-12 border-t border-white/10 pt-6">
                <p className="mb-5 text-xs uppercase tracking-[0.25em] text-red-500">
                  Skills
                </p>

                <div className="flex flex-wrap gap-2">
                  {skills.map(
                    (skill, index) => (
                      <span
                        key={`${skill}-${index}`}
                        className="border border-white/20 px-3 py-1.5 text-xs uppercase transition duration-300 hover:border-red-500 hover:bg-red-950/30 hover:text-red-400"
                      >
                        {skill}
                      </span>
                    )
                  )}
                </div>
              </div>
            </Reveal>
          )}
        </div>
      </section>

      {/* =================================================
          03 — PHILOSOPHY
      ================================================= */}

      <section className="border-t border-white/10">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 lg:grid-cols-2">
          <div>
            <SectionTitle number="03">
              Design philosophy
            </SectionTitle>

            <div className="space-y-6">
              {designPhilosophy?.text1 && (
                <Title
                  as="p"
                  lines={[
                    designPhilosophy.text1,
                  ]}
                  className="text-4xl uppercase leading-none text-white sm:text-6xl"
                />
              )}

              {designPhilosophy?.text2 && (
                <Reveal
                  v="right"
                  delay={250}
                >
                  <p className="max-w-xl border-l-2 border-red-600 pl-5 text-xl leading-relaxed text-red-500">
                    {designPhilosophy.text2}
                  </p>
                </Reveal>
              )}
            </div>
          </div>

          <Wipe>
            <Img
              src={
                designPhilosophy?.image
              }
              alt="Design philosophy"
              className="aspect-[4/3] w-full border border-white/10 object-cover"
            />
          </Wipe>
        </div>
      </section>

      {/* =================================================
          04 — VALUES
      ================================================= */}

      <section className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-5 py-16">
          <SectionTitle number="04">
            Core values
          </SectionTitle>

          <div className="grid gap-px bg-white/10 sm:grid-cols-2">
            {[
              [
                coreValues?.image1,
                "Intent",
                "Every creative decision begins with a clear intention.",
              ],
              [
                coreValues?.image2,
                "Impact",
                "Design should leave a meaningful impression beyond the screen.",
              ],
            ].map(
              ([image, title, description], index) => (
                <Reveal
                  key={title}
                  delay={index * 160}
                >
                  <Card
                    as="article"
                    className="h-full bg-black p-5"
                  >
                    <span className="text-xs text-red-500">
                      VALUE{" "}
                      {num(index)}
                    </span>

                    <Wipe delay={150}>
                      <Img
                        src={image}
                        alt={`Core value ${
                          index + 1
                        }`}
                        className="mt-5 aspect-[4/5] w-full object-cover transition duration-700 group-hover:scale-105"
                      />
                    </Wipe>

                    <h3
                      style={display}
                      className="mt-5 text-2xl uppercase text-white"
                    >
                      {title}
                    </h3>

                    <p className="mt-2 text-sm leading-relaxed text-neutral-500">
                      {description}
                    </p>
                  </Card>
                </Reveal>
              )
            )}
          </div>
        </div>
      </section>

      {/* =================================================
          05 — PROCESS
      ================================================= */}

      <section className="relative overflow-hidden border-t border-white/10 bg-gradient-to-b from-red-950 to-black">
        <div
          aria-hidden="true"
          className="cn-anim absolute -right-32 top-10 h-96 w-96 rounded-full bg-red-700/20 blur-3xl"
          style={{
            animation:
              "cn-float 12s ease-in-out infinite",
          }}
        />

        <div className="relative mx-auto max-w-7xl px-5 py-20">
          <SectionTitle number="05">
            From thought to form
          </SectionTitle>

          <div className="grid gap-10 md:grid-cols-12">
            <Title
              lines={[
                "THINK",
                "CREATE",
                "REDEFINE",
              ]}
              className="text-5xl uppercase leading-[0.9] text-white sm:text-7xl md:col-span-8"
            />

            <Reveal
              v="right"
              delay={350}
              className="md:col-span-4 md:flex md:items-end"
            >
              <p className="text-sm leading-relaxed text-neutral-300">
                Ideas evolve through
                experimentation, visual
                exploration, technical execution,
                and refinement until the final form
                feels intentional.
              </p>
            </Reveal>
          </div>

          <Reveal
            delay={500}
            className="mt-12"
          >
            <div className="h-px w-full bg-gradient-to-r from-red-600 via-red-600/40 to-transparent" />
          </Reveal>
        </div>
      </section>

      {/* =================================================
          06 — PROJECTS
      ================================================= */}

      <section
        id="work"
        className="border-t border-white/10"
      >
        <div className="mx-auto max-w-7xl px-5 py-16">
          <SectionTitle number="06">
            Featured projects
          </SectionTitle>

          {projects?.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {projects
                .slice(0, 3)
                .map((project, index) => (
                  <Reveal
                    key={`${project.title}-${index}`}
                    delay={index * 150}
                  >
                    <Tilt>
                      <Card
                        as="article"
                        className="h-full"
                      >
                        <div className="overflow-hidden border border-white/15">
                          <div className="relative">
                            <Img
                              src={
                                project.image
                              }
                              alt={
                                project.title
                              }
                              className="aspect-video w-full object-cover transition duration-700 group-hover:scale-110"
                            />

                            <span className="absolute left-3 top-3 rounded bg-black/80 px-2 py-1 text-xs text-red-500">
                              {num(index)}
                            </span>

                            <span className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-red-600 text-white opacity-0 transition duration-300 group-hover:rotate-45 group-hover:opacity-100">
                              ↗
                            </span>
                          </div>
                        </div>

                        <div className="mt-4 flex items-start gap-4">
                          <span
                            style={display}
                            className="cn-gradient text-4xl"
                          >
                            {num(index)}
                          </span>

                          <div>
                            <h3 className="font-semibold uppercase text-white">
                              {
                                project.title
                              }
                            </h3>

                            <p className="mt-1 text-sm leading-relaxed text-neutral-400">
                              {
                                project.description
                              }
                            </p>
                          </div>
                        </div>
                      </Card>
                    </Tilt>
                  </Reveal>
                ))}
            </div>
          ) : (
            <p className="text-neutral-500">
              No projects added yet.
            </p>
          )}
        </div>
      </section>

      {/* =================================================
          07 — CASE STUDY
      ================================================= */}

      <section className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-5 py-16">
          <SectionTitle number="07">
            Case study
          </SectionTitle>

          <div className="grid gap-8 lg:grid-cols-2">
            <Wipe>
              <div className="overflow-hidden border border-white/10">
                <Img
                  src={caseStudy?.image}
                  alt={
                    caseStudy?.title ||
                    "Case study"
                  }
                  className="aspect-video w-full object-cover transition duration-700 hover:scale-105"
                />
              </div>
            </Wipe>

            <div className="flex flex-col justify-center">
              <Reveal
                v="right"
                delay={200}
              >
                <span className="text-xs uppercase tracking-[0.25em] text-red-500">
                  Selected work
                </span>
              </Reveal>

              <Title
                lines={[
                  caseStudy?.title ||
                    "Case study",
                ]}
                className="mt-4 text-4xl uppercase leading-none text-white sm:text-6xl"
              />

              {caseStudy?.description && (
                <Reveal delay={450}>
                  <p className="mt-6 max-w-lg text-sm leading-relaxed text-neutral-400">
                    {
                      caseStudy.description
                    }
                  </p>
                </Reveal>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* =================================================
          08 — TOOLS
      ================================================= */}

      <section className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-5 py-16">
          <SectionTitle number="08">
            Creative tools
          </SectionTitle>

          <div className="grid gap-10 lg:grid-cols-3">
            <div className="lg:col-span-1">
              <Title
                lines={[
                  "Tools",
                  "& Skills",
                ]}
                className="text-3xl uppercase leading-none text-white"
              />
            </div>

            <div className="lg:col-span-2">
              {skills?.length > 0 && (
                <ul className="grid border-t border-white/10 sm:grid-cols-2">
                  {skills.map(
                    (skill, index) => (
                      <Reveal
                        key={`${skill}-${index}`}
                        delay={
                          Math.min(
                            index,
                            9
                          ) * 70
                        }
                      >
                        <li className="group border-b border-white/10 py-4 text-sm transition hover:bg-red-950/20">
                          <span className="mr-4 text-red-600 transition group-hover:text-red-400">
                            {num(index)}
                          </span>

                          <span className="uppercase text-white">
                            {skill}
                          </span>
                        </li>
                      </Reveal>
                    )
                  )}
                </ul>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* =================================================
          09 — AESTHETIC
      ================================================= */}

      <section className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-5 py-16">
          <SectionTitle number="09">
            Personal aesthetic
          </SectionTitle>

          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <Wipe>
                <div className="group overflow-hidden">
                  <Img
                    src={
                      personalAesthetic?.image
                    }
                    alt="Personal aesthetic"
                    className="aspect-[16/9] w-full object-cover grayscale transition duration-700 group-hover:scale-105 group-hover:grayscale-0"
                  />
                </div>
              </Wipe>
            </div>

            <Title
              as="p"
              lines={[
                "Dark.",
                "Direct.",
                "Distinct.",
              ]}
              delay={250}
              className="text-4xl uppercase leading-none text-white sm:text-5xl lg:col-span-4"
            />
          </div>
        </div>
      </section>

      {/* =================================================
          10 — CONTACT
      ================================================= */}

      <section
        id="contact"
        className="border-t border-white/10"
      >
        <div className="mx-auto max-w-7xl px-5 py-16">
          <SectionTitle number="10">
            Contact & social links
          </SectionTitle>

          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div>
              <Reveal>
                <p className="text-xs uppercase tracking-[0.25em] text-red-500">
                  Available for work
                </p>
              </Reveal>

              {email && (
                <Reveal delay={250}>
                  <a
                    href={`mailto:${email}`}
                    className="mt-4 block break-all text-2xl font-medium text-white transition hover:text-red-500 sm:text-4xl"
                  >
                    {email}
                  </a>
                </Reveal>
              )}
            </div>

            <Reveal
              v="right"
              delay={350}
              className="flex flex-wrap gap-5 text-sm"
            >
              {socialLinks?.github && (
                <a
                  href={
                    socialLinks.github
                  }
                  target="_blank"
                  rel="noreferrer"
                  className="underline underline-offset-4 transition hover:text-red-500"
                >
                  GitHub ↗
                </a>
              )}

              {socialLinks?.linkedin && (
                <a
                  href={
                    socialLinks.linkedin
                  }
                  target="_blank"
                  rel="noreferrer"
                  className="underline underline-offset-4 transition hover:text-red-500"
                >
                  LinkedIn ↗
                </a>
              )}
            </Reveal>
          </div>
        </div>
      </section>

      {/* =================================================
          11 — THANK YOU
      ================================================= */}

      <section className="relative overflow-hidden border-t border-white/10 bg-red-950">
        <div
          aria-hidden="true"
          className="cn-anim absolute -left-20 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-red-600/20 blur-3xl"
          style={{
            animation:
              "cn-float 12s ease-in-out infinite",
          }}
        />

        <div className="relative mx-auto max-w-7xl px-5 py-20">
          <Reveal v="left">
            <p className="text-xs uppercase tracking-[0.25em] text-red-300">
              11 / Thank you
            </p>
          </Reveal>

          <div className="mt-10 flex flex-col justify-between gap-10 md:flex-row md:items-end">
            <Title
              as="h2"
              lines={[
                "LET'S",
                "CREATE",
                "MORE.",
              ]}
              className="text-6xl uppercase leading-[0.85] text-white sm:text-8xl"
            />

            <Reveal
              v="right"
              delay={450}
              className="flex gap-5 text-sm text-white"
            >
              <a
                href="#about"
                className="transition hover:text-red-300"
              >
                About
              </a>

              <a
                href="#work"
                className="transition hover:text-red-300"
              >
                Work
              </a>

              <a
                href="#contact"
                className="transition hover:text-red-300"
              >
                Contact
              </a>

              <a
                href="#top"
                onClick={(e) => {
                  e.preventDefault();

                  window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                  });
                }}
                className="transition hover:text-red-300"
              >
                ↑ Top
              </a>
            </Reveal>
          </div>
        </div>
      </section>

      {/* =================================================
          FOOTER
      ================================================= */}

      <footer className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-10 md:flex-row md:items-center md:justify-between">
          <span className="text-xs text-neutral-500">
            {name} — {role}
          </span>

          <div className="flex gap-5 text-sm">
            <Socials
              portfolio={portfolio}
              className="underline underline-offset-4 transition hover:text-white"
            />
          </div>

          <span className="text-xs text-neutral-600">
            © {new Date().getFullYear()}
          </span>
        </div>
      </footer>
    </div>
  );
}

export default CrimsonNoirTemplate;