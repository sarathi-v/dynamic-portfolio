import { useEffect, useRef, useState } from "react";
import { Img, Socials } from "./shared";

const serif = {
  fontFamily: "'Playfair Display', Georgia, serif",
};

const body = {
  fontFamily: "Inter, system-ui, sans-serif",
};

const tan = "bg-[#d9b48f] text-black hover:bg-[#e6c6a5]";
const EASE = "cubic-bezier(.2,.7,.2,1)";

/* =========================================================
   ANIMATION CSS
========================================================= */

const CSS = `
@keyframes ls-float {
  0%,100% {
    transform:translate3d(0,0,0) scale(1);
  }
  50% {
    transform:translate3d(25px,-30px,0) scale(1.05);
  }
}

@keyframes ls-float-reverse {
  0%,100% {
    transform:translate3d(0,0,0);
  }
  50% {
    transform:translate3d(-25px,25px,0);
  }
}

@keyframes ls-spin {
  to {
    transform:rotate(360deg);
  }
}

@keyframes ls-pulse {
  0% {
    box-shadow:
      0 0 0 0 rgba(217,180,143,.55),
      0 0 25px rgba(217,180,143,.18);
  }

  100% {
    box-shadow:
      0 0 0 20px rgba(217,180,143,0),
      0 0 45px rgba(217,180,143,.04);
  }
}

@keyframes ls-glow {
  0%,100% {
    opacity:.25;
  }

  50% {
    opacity:.65;
  }
}

@keyframes ls-marquee {
  to {
    transform:translateX(-50%);
  }
}

@keyframes ls-shine {
  from {
    transform:translateX(-140%) skewX(-20deg);
  }

  to {
    transform:translateX(230%) skewX(-20deg);
  }
}

@keyframes ls-bob {
  0%,100% {
    transform:translateY(0);
  }

  50% {
    transform:translateY(-7px);
  }
}

@keyframes ls-fade-line {
  from {
    transform:scaleX(0);
    transform-origin:left;
  }

  to {
    transform:scaleX(1);
    transform-origin:left;
  }
}

/* Reveal */

.ls-r {
  opacity:0;
  transition:
    opacity .9s ${EASE},
    transform .9s ${EASE};
}

.ls-up {
  transform:translateY(42px);
}

.ls-left {
  transform:translateX(-50px);
}

.ls-right {
  transform:translateX(50px);
}

.ls-zoom {
  transform:scale(.92);
}

.ls-r.ls-in {
  opacity:1;
  transform:none;
}

/* Word animation */

.ls-word {
  display:inline-block;
  overflow:hidden;
  vertical-align:bottom;
  padding-bottom:.08em;
}

.ls-word > span {
  display:inline-block;
  transform:translateY(115%);
  transition:transform 1s ${EASE};
}

.ls-title-in .ls-word > span {
  transform:none;
}

/* Image wipe */

.ls-wipe {
  clip-path:inset(0 100% 0 0);
  transition:
    clip-path 1.2s cubic-bezier(.7,0,.2,1);
}

.ls-wipe.ls-in {
  clip-path:inset(0 0 0 0);
}

/* Image hover */

.ls-image {
  transition:
    transform .8s ${EASE},
    filter .8s ease;
}

.ls-image:hover {
  transform:scale(1.04);
}

/* Spotlight */

.ls-spot {
  background:
    radial-gradient(
      320px circle at var(--x,50%) var(--y,50%),
      rgba(217,180,143,.14),
      transparent 70%
    );
}

/* Card */

.ls-card {
  position:relative;
  overflow:hidden;
  transition:
    transform .35s ${EASE},
    border-color .3s ease,
    box-shadow .3s ease;
}

.ls-card:hover {
  border-color:rgba(217,180,143,.45);
  box-shadow:
    0 20px 60px rgba(0,0,0,.18);
}

/* Button */

.ls-btn {
  position:relative;
  overflow:hidden;
}

.ls-btn::after {
  content:"";
  position:absolute;
  inset:0;
  width:35%;
  background:rgba(255,255,255,.35);
  transform:translateX(-140%) skewX(-20deg);
}

.ls-btn:hover::after {
  animation:ls-shine .8s ease;
}

/* Grain */

.ls-grain {
  background-image:
    radial-gradient(
      rgba(255,255,255,.09) 1px,
      transparent 1px
    );

  background-size:4px 4px;

  opacity:.025;
}

/* Reduced motion */

@media (prefers-reduced-motion:reduce) {
  .ls-r,
  .ls-word > span,
  .ls-wipe {
    opacity:1!important;
    transform:none!important;
    clip-path:none!important;
    transition:none!important;
  }

  .ls-btn:hover::after,
  [class*=ls-anim] {
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
      className={`ls-r ls-${v} ${
        seen ? "ls-in" : ""
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
        seen ? "ls-title-in" : ""
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
                  className="ls-word mr-[0.2em]"
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
      className={`ls-wipe ${
        seen ? "ls-in" : ""
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
      className={`group ls-card relative overflow-hidden ${className}`}
    >
      <span
        aria-hidden="true"
        className="ls-spot pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
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
       rotateX(${y * -4}deg)
       rotateY(${x * 4}deg)
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

/* =========================================================
   LENS STUDIO
========================================================= */

function LensStudioTemplate({ portfolio }) {
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
  } = portfolio;

  const progress = useRef(null);
  const hero = useRef(null);
  const mouseGlow = useRef(null);

  const philosophyTexts = [
    designPhilosophy?.text1,
    designPhilosophy?.text2,
  ].filter(Boolean);

  /* -----------------------------------------
     Scroll progress + cursor interaction
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
      className="min-h-screen overflow-x-hidden bg-[#f7f4ef] text-neutral-800"
    >
      <style>{CSS}</style>

      {/* SCROLL PROGRESS */}

      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 top-0 z-[70] h-1"
      >
        <div
          ref={progress}
          className="h-full origin-left bg-[#d9b48f]"
          style={{
            transform: "scaleX(0)",
          }}
        />
      </div>

      {/* CURSOR GLOW */}

      <div
        ref={mouseGlow}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-0 hidden h-[360px] w-[360px] rounded-full bg-[#d9b48f]/10 blur-3xl md:block"
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
        className="ls-grain pointer-events-none fixed inset-0 z-[60]"
      />

      {/* =================================================
          01 — HERO
      ================================================= */}

      <section
        ref={hero}
        className="relative overflow-hidden bg-black text-white"
      >
        {/* Ambient glow */}

        <div
          aria-hidden="true"
          className="ls-anim absolute -left-40 top-20 h-96 w-96 rounded-full bg-[#d9b48f]/10 blur-3xl"
          style={{
            animation:
              "ls-float 14s ease-in-out infinite",
            transform:
              "translate3d(calc(var(--mx,0)*25px),calc(var(--my,0)*25px),0)",
          }}
        />

        <div
          aria-hidden="true"
          className="ls-anim absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-amber-900/20 blur-3xl"
          style={{
            animation:
              "ls-float-reverse 17s ease-in-out infinite",
          }}
        />

        {/* Hero image */}

        {profileImage && (
          <Reveal
            v="zoom"
            delay={100}
            className="absolute inset-0"
          >
            <Img
              src={profileImage}
              alt={`Portrait of ${name}`}
              className="h-full w-full object-cover opacity-60 md:opacity-100"
            />
          </Reveal>
        )}

        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/65 to-transparent" />

        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/20" />

        {/* Header */}

        <Reveal>
          <header className="relative z-20 mx-auto flex max-w-7xl items-center justify-between px-5 py-5 text-sm">
            <span
              style={serif}
              className="text-xl"
            >
              {name}
            </span>

            {email && (
              <a
                href={`mailto:${email}`}
                className={`ls-btn rounded px-5 py-2.5 font-medium transition ${tan}`}
              >
                Book a session
              </a>
            )}
          </header>
        </Reveal>

        {/* Hero content */}

        <div className="relative z-20 mx-auto max-w-7xl px-5 pb-40 pt-20 md:pt-32">
          <Reveal
            v="left"
            delay={150}
          >
            <p className="mb-4 text-sm text-[#d9b48f]">
              {role}
            </p>
          </Reveal>

          <Title
            as="h1"
            lines={[name || ""]}
            delay={250}
            className="max-w-xl break-words text-5xl leading-[1.05] sm:text-7xl"
          />

          {about && (
            <Reveal delay={650}>
              <p className="mt-6 max-w-md leading-relaxed text-neutral-300">
                {about}
              </p>
            </Reveal>
          )}

          <Reveal
            delay={800}
            className="mt-8 flex flex-wrap gap-3 text-sm font-medium"
          >
            {projects?.length > 0 && (
              <a
                href="#portfolio"
                className={`ls-btn rounded px-6 py-3 transition ${tan}`}
              >
                View portfolio
              </a>
            )}

            <Socials
              portfolio={portfolio}
              className="rounded border border-white/40 px-6 py-3 transition hover:bg-white/10"
            />
          </Reveal>
        </div>

        {/* Floating indicator */}

        <Reveal
          v="right"
          delay={900}
          className="absolute bottom-8 right-5 z-20 hidden md:block"
        >
          <div className="flex items-center gap-3 text-xs text-neutral-400">
            <span
              className="h-2 w-2 rounded-full bg-[#d9b48f]"
              style={{
                animation:
                  "ls-pulse 2s ease-out infinite",
              }}
            />

            Scroll to explore
          </div>
        </Reveal>
      </section>

      {/* =================================================
          SKILLS STRIP
      ================================================= */}

      {skills?.length > 0 && (
        <div className="relative z-10 mx-auto -mt-20 max-w-7xl px-5">
          <Reveal v="up">
            <ul className="grid grid-cols-2 divide-white/10 rounded-lg bg-neutral-950 p-2 text-center text-sm text-white sm:grid-cols-3 lg:grid-cols-6 lg:divide-x">
              {skills
                .slice(0, 6)
                .map((skill, index) => (
                  <li
                    key={`${skill}-${index}`}
                    className="group px-3 py-6 transition hover:bg-white/5"
                  >
                    <span className="block text-[10px] text-[#d9b48f] opacity-0 transition group-hover:opacity-100">
                      {String(
                        index + 1
                      ).padStart(2, "0")}
                    </span>

                    <span className="mt-1 block">
                      {skill}
                    </span>
                  </li>
                ))}
            </ul>
          </Reveal>
        </div>
      )}

      {/* =================================================
          02 — ABOUT
      ================================================= */}

      <section className="mx-auto max-w-7xl px-5 py-20">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <div>
            <Reveal v="left">
              <p className="text-sm font-medium uppercase tracking-widest text-[#b58d69]">
                About me
              </p>
            </Reveal>

            <Title
              lines={[
                "The person behind",
                "the work.",
              ]}
              className="mt-3 text-4xl sm:text-5xl"
            />

            <Reveal delay={300}>
              <p className="mt-6 max-w-xl leading-relaxed text-neutral-600">
                {about}
              </p>
            </Reveal>

            <Reveal
              delay={450}
              className="mt-8 flex items-center gap-5"
            >
              <div className="h-px w-16 bg-[#d9b48f]" />

              <span className="text-xs uppercase tracking-[0.25em] text-neutral-400">
                Visual storyteller
              </span>
            </Reveal>
          </div>

          {profileImage && (
            <Wipe>
              <div className="group mx-auto w-full max-w-md overflow-hidden rounded-xl">
                <Img
                  src={profileImage}
                  alt={`Portrait of ${name}`}
                  className="ls-image aspect-[4/5] w-full rounded-xl object-cover"
                />
              </div>
            </Wipe>
          )}
        </div>
      </section>

      {/* =================================================
          03 — PHILOSOPHY
      ================================================= */}

      <section className="bg-neutral-950 text-white">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 md:grid-cols-2 md:items-center">
          <div>
            <Reveal v="left">
              <p className="text-sm text-[#d9b48f]">
                Design philosophy
              </p>
            </Reveal>

            <div className="mt-6">
              {philosophyTexts.map(
                (text, index) => (
                  <Title
                    key={`${text}-${index}`}
                    as="p"
                    lines={[text]}
                    delay={index * 180}
                    className="mb-5 text-3xl italic leading-tight sm:text-5xl"
                  />
                )
              )}
            </div>
          </div>

          {designPhilosophy?.image && (
            <Wipe delay={200}>
              <Img
                src={
                  designPhilosophy.image
                }
                alt="Design philosophy"
                className="ls-image aspect-[4/3] w-full rounded-xl object-cover"
              />
            </Wipe>
          )}
        </div>
      </section>

      {/* =================================================
          04 — CORE VALUES
      ================================================= */}

      <section className="mx-auto max-w-7xl px-5 py-20">
        <div className="mb-10">
          <Reveal v="left">
            <p className="text-sm font-medium uppercase tracking-widest text-[#b58d69]">
              Core values
            </p>
          </Reveal>

          <Title
            lines={[
              "What guides",
              "the work.",
            ]}
            className="mt-3 text-4xl sm:text-5xl"
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {[
            [
              coreValues?.image1,
              "Purpose",
              "Meaningful work starts with a clear purpose.",
            ],
            [
              coreValues?.image2,
              "Authenticity",
              "Every detail should feel intentional and genuine.",
            ],
          ].map(
            ([image, title, description], index) => (
              <Reveal
                key={title}
                delay={index * 180}
                className={
                  index === 1
                    ? "md:mt-12"
                    : ""
                }
              >
                <Card
                  as="article"
                  className="h-full"
                >
                  {image && (
                    <div className="overflow-hidden rounded-xl">
                      <Img
                        src={image}
                        alt={`Core value ${
                          index + 1
                        }`}
                        className="ls-image aspect-[4/3] w-full rounded-xl object-cover"
                      />
                    </div>
                  )}

                  <div className="mt-5">
                    <span className="text-xs text-[#b58d69]">
                      VALUE{" "}
                      {String(
                        index + 1
                      ).padStart(2, "0")}
                    </span>

                    <h3
                      style={serif}
                      className="mt-3 text-2xl"
                    >
                      {title}
                    </h3>

                    <p className="mt-2 text-sm text-neutral-600">
                      {description}
                    </p>
                  </div>
                </Card>
              </Reveal>
            )
          )}
        </div>
      </section>

      {/* =================================================
          05 — PROCESS
      ================================================= */}

      <section className="overflow-hidden bg-[#d9b48f] text-black">
        <div className="mx-auto max-w-7xl px-5 py-20">
          <div className="grid gap-12 md:grid-cols-2">
            <div>
              <Reveal v="left">
                <p className="text-sm uppercase tracking-widest">
                  From thought to form
                </p>
              </Reveal>

              <Title
                lines={[
                  "From idea",
                  "to experience.",
                ]}
                className="mt-4 text-4xl sm:text-6xl"
              />

              <Reveal delay={350}>
                <p className="mt-6 max-w-md leading-relaxed text-black/70">
                  Ideas become visual experiences
                  through exploration, refinement,
                  and intentional execution.
                </p>
              </Reveal>
            </div>

            <div className="grid gap-4">
              {[
                [
                  "01",
                  "Discover",
                  "Understand the story, purpose, and people behind the idea.",
                  "black",
                ],
                [
                  "02",
                  "Develop",
                  "Shape the concept into a focused visual direction.",
                  "white",
                ],
                [
                  "03",
                  "Deliver",
                  "Turn the final concept into a polished experience.",
                  "dark",
                ],
              ].map(
                (
                  [number, title, description, color],
                  index
                ) => (
                  <Reveal
                    key={number}
                    v={
                      index % 2
                        ? "right"
                        : "left"
                    }
                    delay={index * 140}
                  >
                    <div
                      className={
                        color === "white"
                          ? "ls-card rounded-lg bg-white p-6"
                          : "ls-card rounded-lg bg-black p-6 text-white"
                      }
                    >
                      <span className="text-xs text-[#d9b48f]">
                        {number}
                      </span>

                      <h3
                        style={serif}
                        className="mt-3 text-2xl"
                      >
                        {title}
                      </h3>

                      <p
                        className={
                          color === "white"
                            ? "mt-2 text-sm leading-relaxed text-neutral-600"
                            : "mt-2 text-sm leading-relaxed text-neutral-300"
                        }
                      >
                        {description}
                      </p>
                    </div>
                  </Reveal>
                )
              )}
            </div>
          </div>
        </div>
      </section>

      {/* =================================================
          06 — PROJECTS
      ================================================= */}

      {projects?.length > 0 && (
        <section
          id="portfolio"
          className="mx-auto max-w-7xl px-5 py-20"
        >
          <div className="mb-10">
            <Reveal v="left">
              <p className="text-sm font-medium uppercase tracking-widest text-[#b58d69]">
                Featured projects
              </p>
            </Reveal>

            <Title
              lines={[
                "Moments we've",
                "captured.",
              ]}
              className="mt-3 text-4xl sm:text-5xl"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {projects
              .slice(0, 3)
              .map((project, index) => (
                <Reveal
                  key={`${project.title}-${index}`}
                  delay={index * 160}
                >
                  <Tilt>
                    <Card
                      as="article"
                      className="group relative aspect-[3/4] overflow-hidden rounded-xl bg-neutral-900"
                    >
                      {project.image && (
                        <Img
                          src={project.image}
                          alt={project.title}
                          className="ls-image h-full w-full object-cover"
                        />
                      )}

                      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent" />

                      <div className="absolute left-5 top-5 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-xs text-[#d9b48f] backdrop-blur">
                        {String(
                          index + 1
                        ).padStart(2, "0")}
                      </div>

                      <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                        <p className="text-xs uppercase tracking-widest text-[#d9b48f]">
                          Project{" "}
                          {index + 1}
                        </p>

                        <h3
                          style={serif}
                          className="mt-1 text-xl"
                        >
                          {project.title}
                        </h3>

                        <p className="mt-1 max-h-0 overflow-hidden text-sm text-neutral-300 opacity-0 transition-all duration-500 group-hover:max-h-20 group-hover:opacity-100">
                          {
                            project.description
                          }
                        </p>
                      </div>
                    </Card>
                  </Tilt>
                </Reveal>
              ))}
          </div>
        </section>
      )}

      {/* =================================================
          07 — CASE STUDY
      ================================================= */}

      {caseStudy?.title && (
        <section className="bg-neutral-950 text-white">
          <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-20 md:grid-cols-2">
            <div>
              <Reveal v="left">
                <p className="text-sm text-[#d9b48f]">
                  Case study
                </p>
              </Reveal>

              <Title
                lines={[
                  caseStudy.title,
                ]}
                className="mt-2 text-4xl sm:text-5xl"
              />

              <Reveal delay={350}>
                <div className="my-6 h-px w-16 bg-[#d9b48f]" />
              </Reveal>

              <Reveal delay={450}>
                <p className="max-w-md leading-relaxed text-neutral-300">
                  {
                    caseStudy.description
                  }
                </p>
              </Reveal>
            </div>

            {caseStudy.image && (
              <Wipe delay={200}>
                <Img
                  src={caseStudy.image}
                  alt={caseStudy.title}
                  className="ls-image aspect-video w-full rounded-lg object-cover"
                />
              </Wipe>
            )}
          </div>
        </section>
      )}

      {/* =================================================
          08 — CREATIVE TOOLS
      ================================================= */}

      {skills?.length > 0 && (
        <section className="mx-auto max-w-7xl px-5 py-20">
          <div className="grid gap-10 md:grid-cols-2 md:items-center">
            <div>
              <Reveal v="left">
                <p className="text-sm font-medium uppercase tracking-widest text-[#b58d69]">
                  Creative tools
                </p>
              </Reveal>

              <Title
                lines={[
                  "Tools behind",
                  "the craft.",
                ]}
                className="mt-3 text-4xl sm:text-5xl"
              />

              <Reveal delay={350}>
                <p className="mt-6 max-w-md leading-relaxed text-neutral-600">
                  A collection of tools and
                  technologies used to transform
                  ideas into polished digital
                  experiences.
                </p>
              </Reveal>
            </div>

            <div className="grid grid-cols-2 gap-px overflow-hidden rounded-lg bg-neutral-300">
              {skills.map(
                (skill, index) => (
                  <Reveal
                    key={`${skill}-${index}`}
                    v="zoom"
                    delay={
                      Math.min(
                        index,
                        8
                      ) * 70
                    }
                  >
                    <div className="group bg-white p-6 transition duration-300 hover:bg-[#eee8df]">
                      <span className="text-xs text-neutral-400">
                        {String(
                          index + 1
                        ).padStart(2, "0")}
                      </span>

                      <p className="mt-4 font-medium transition group-hover:text-[#8f6b4d]">
                        {skill}
                      </p>
                    </div>
                  </Reveal>
                )
              )}
            </div>
          </div>
        </section>
      )}

      {/* =================================================
          09 — PERSONAL AESTHETIC
      ================================================= */}

      {personalAesthetic?.image && (
        <section className="bg-[#eee8df]">
          <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-20 md:grid-cols-2">
            <div>
              <Reveal v="left">
                <p className="text-sm font-medium uppercase tracking-widest text-[#b58d69]">
                  Personal aesthetic
                </p>
              </Reveal>

              <Title
                lines={[
                  "A visual language",
                  "of my own.",
                ]}
                className="mt-3 text-4xl sm:text-5xl"
              />

              <Reveal delay={350}>
                <p className="mt-6 max-w-md leading-relaxed text-neutral-600">
                  A balance of atmosphere,
                  simplicity, emotion, and carefully
                  considered details.
                </p>
              </Reveal>
            </div>

            <Wipe delay={200}>
              <div className="group overflow-hidden rounded-xl">
                <Img
                  src={
                    personalAesthetic.image
                  }
                  alt="Personal aesthetic"
                  className="ls-image aspect-[4/3] w-full rounded-xl object-cover"
                />
              </div>
            </Wipe>
          </div>
        </section>
      )}

      {/* =================================================
          10 — CONTACT
      ================================================= */}

      <section className="bg-black text-white">
        <div className="mx-auto max-w-7xl px-5 py-20">
          <Reveal v="left">
            <p className="text-sm text-[#d9b48f]">
              Contact &amp; social links
            </p>
          </Reveal>

          <Title
            lines={[
              "Tell me",
              "your story.",
            ]}
            className="mt-3 text-4xl sm:text-6xl"
          />

          <Reveal delay={350}>
            <p className="mt-5 max-w-xl text-neutral-400">
              Have a project, idea, or story you'd
              like to bring to life? Let's talk.
            </p>
          </Reveal>

          <Reveal
            delay={500}
            className="mt-8 flex flex-wrap items-center gap-5"
          >
            {email && (
              <a
                href={`mailto:${email}`}
                className={`ls-btn rounded px-6 py-3 font-medium transition ${tan}`}
              >
                {email}
              </a>
            )}

            <Socials
              portfolio={portfolio}
              className="rounded border border-white/30 px-6 py-3 text-sm underline-offset-4 transition hover:bg-white/10"
            />
          </Reveal>
        </div>
      </section>

      {/* =================================================
          11 — THANK YOU / FOOTER
      ================================================= */}

      <footer className="bg-[#f7f4ef]">
        <div className="mx-auto max-w-7xl px-5 py-14 text-center">
          <Reveal v="up">
            <p className="text-sm uppercase tracking-widest text-neutral-500">
              Thank you
            </p>
          </Reveal>

          <Title
            lines={[
              "Until the",
              "next story.",
            ]}
            className="mt-3 text-4xl sm:text-5xl"
          />

          <Reveal delay={400}>
            <p className="mt-4 text-sm text-neutral-500">
              © {new Date().getFullYear()}{" "}
              {name}. All rights reserved.
            </p>
          </Reveal>
        </div>
      </footer>
    </div>
  );
}

export default LensStudioTemplate;