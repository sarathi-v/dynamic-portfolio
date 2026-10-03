// Template 06 — Neon Nexus (animated)
// Futuristic deep-blue / cyan glow.
// Fonts: Orbitron (headings) + Inter
// No extra dependencies.

import { useEffect, useRef, useState } from "react";
import { Img, Socials } from "./shared";

/* =========================================================
   FONTS
========================================================= */

const head = {
  fontFamily: "Orbitron, system-ui, sans-serif",
};

const body = {
  fontFamily: "Inter, system-ui, sans-serif",
};

const EASE = "cubic-bezier(.2,.7,.2,1)";

/* =========================================================
   ANIMATION CSS
========================================================= */

const CSS = `
@keyframes nx-float {
  0%,100% {
    transform: translate3d(0,0,0) scale(1);
  }
  50% {
    transform: translate3d(25px,-35px,0) scale(1.08);
  }
}

@keyframes nx-float-reverse {
  0%,100% {
    transform: translate3d(0,0,0) scale(1);
  }
  50% {
    transform: translate3d(-25px,30px,0) scale(.94);
  }
}

@keyframes nx-spin {
  to {
    transform: rotate(360deg);
  }
}

@keyframes nx-spin-reverse {
  to {
    transform: rotate(-360deg);
  }
}

@keyframes nx-pulse {
  0% {
    box-shadow:
      0 0 0 0 rgba(34,211,238,.65),
      0 0 20px rgba(34,211,238,.3);
  }

  100% {
    box-shadow:
      0 0 0 22px rgba(34,211,238,0),
      0 0 45px rgba(34,211,238,.1);
  }
}

@keyframes nx-glow {
  0%,100% {
    opacity:.35;
  }

  50% {
    opacity:.75;
  }
}

@keyframes nx-marquee {
  to {
    transform: translateX(-50%);
  }
}

@keyframes nx-scan {
  0% {
    transform: translateY(-120%);
  }

  100% {
    transform: translateY(120%);
  }
}

@keyframes nx-shine {
  from {
    transform: translateX(-140%) skewX(-20deg);
  }

  to {
    transform: translateX(220%) skewX(-20deg);
  }
}

@keyframes nx-bob {
  0%,100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-8px);
  }
}

@keyframes nx-blink {
  0%,49% {
    opacity:1;
  }

  50%,100% {
    opacity:0;
  }
}

/* reveal */

.nx-r {
  opacity:0;
  transition:
    opacity .9s ${EASE},
    transform .9s ${EASE};
}

.nx-up {
  transform:translateY(42px);
}

.nx-left {
  transform:translateX(-50px);
}

.nx-right {
  transform:translateX(50px);
}

.nx-zoom {
  transform:scale(.92);
}

.nx-r.nx-in {
  opacity:1;
  transform:none;
}

/* wipe */

.nx-wipe {
  opacity:1;
  clip-path:inset(0 100% 0 0);
  transition:
    clip-path 1.2s cubic-bezier(.7,0,.2,1);
}

.nx-wipe.nx-in {
  clip-path:inset(0 0 0 0);
}

/* words */

.nx-word {
  display:inline-block;
  overflow:hidden;
  vertical-align:bottom;
  padding-bottom:.08em;
}

.nx-word > span {
  display:inline-block;
  transform:translateY(115%);
  transition:transform 1s ${EASE};
}

.nx-title-in .nx-word > span {
  transform:none;
}

/* grid */

.nx-grid {
  background-image:
    linear-gradient(rgba(34,211,238,.055) 1px, transparent 1px),
    linear-gradient(90deg, rgba(34,211,238,.055) 1px, transparent 1px);

  background-size:48px 48px;

  mask-image:
    radial-gradient(
      ellipse at center,
      black 25%,
      transparent 78%
    );

  -webkit-mask-image:
    radial-gradient(
      ellipse at center,
      black 25%,
      transparent 78%
    );
}

/* scan line */

.nx-scan {
  position:absolute;
  inset:0;
  pointer-events:none;
  overflow:hidden;
}

.nx-scan::after {
  content:"";
  position:absolute;
  left:0;
  right:0;
  top:0;
  height:25%;
  background:linear-gradient(
    to bottom,
    transparent,
    rgba(34,211,238,.09),
    transparent
  );
  animation:nx-scan 6s linear infinite;
}

/* gradient text */

.nx-gradient {
  background:
    linear-gradient(
      90deg,
      #67e8f9,
      #22d3ee,
      #60a5fa,
      #67e8f9
    );

  background-size:200% auto;

  -webkit-background-clip:text;
  background-clip:text;

  color:transparent;

  animation:
    nx-gradient-shift 5s linear infinite;
}

@keyframes nx-gradient-shift {
  to {
    background-position:200% center;
  }
}

/* card */

.nx-card {
  position:relative;
  overflow:hidden;
  transition:
    transform .35s ${EASE},
    border-color .3s ease,
    box-shadow .3s ease;
}

.nx-card:hover {
  border-color:rgba(34,211,238,.6);
  box-shadow:
    0 0 35px rgba(34,211,238,.12);
}

/* spotlight */

.nx-spot {
  background:
    radial-gradient(
      300px circle at var(--x,50%) var(--y,50%),
      rgba(34,211,238,.18),
      transparent 70%
    );
}

/* button shine */

.nx-btn {
  position:relative;
  overflow:hidden;
}

.nx-btn::after {
  content:"";
  position:absolute;
  inset:0;
  width:35%;
  background:rgba(255,255,255,.4);
  transform:translateX(-140%) skewX(-20deg);
}

.nx-btn:hover::after {
  animation:nx-shine .8s ease;
}

/* terminal */

.nx-terminal {
  box-shadow:
    0 0 40px rgba(34,211,238,.12),
    inset 0 0 40px rgba(34,211,238,.03);
}

/* reduced motion */

@media (prefers-reduced-motion:reduce) {
  .nx-r,
  .nx-word > span,
  .nx-wipe {
    opacity:1!important;
    transform:none!important;
    clip-path:none!important;
    transition:none!important;
  }

  .nx-gradient,
  .nx-scan::after,
  [class*=nx-anim] {
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
    const el = ref.current;

    if (!el) return;

    if (!("IntersectionObserver" in window)) {
      setSeen(true);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold }
    );

    io.observe(el);

    return () => io.disconnect();
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
      className={`nx-r nx-${v} ${
        seen ? "nx-in" : ""
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
        seen ? "nx-title-in" : ""
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
              const current = count++;

              return (
                <span
                  key={j}
                  className="nx-word mr-[0.22em]"
                >
                  <span
                    style={{
                      transitionDelay:
                        `${delay + current * 80}ms`,
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
      className={`nx-wipe ${
        seen ? "nx-in" : ""
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

    const r =
      ref.current.getBoundingClientRect();

    ref.current.style.setProperty(
      "--x",
      `${e.clientX - r.left}px`
    );

    ref.current.style.setProperty(
      "--y",
      `${e.clientY - r.top}px`
    );
  };

  return (
    <Tag
      ref={ref}
      onPointerMove={move}
      className={`group nx-card relative overflow-hidden rounded-xl border border-cyan-400/20 bg-white/[.03] ${className}`}
    >
      <span
        aria-hidden="true"
        className="nx-spot pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />

      {children}
    </Tag>
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
        (time - start) / 1100
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

function Tilt({
  children,
  className = "",
}) {
  const ref = useRef(null);

  const move = (e) => {
    if (
      e.pointerType === "touch" ||
      !ref.current
    ) {
      return;
    }

    const r =
      ref.current.getBoundingClientRect();

    const x =
      (e.clientX - r.left) /
        r.width -
      0.5;

    const y =
      (e.clientY - r.top) /
        r.height -
      0.5;

    ref.current.style.transform =
      `perspective(1000px)
       rotateX(${y * -6}deg)
       rotateY(${x * 6}deg)
       translateY(-3px)`;
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

function Label({ children }) {
  return (
    <Reveal v="left">
      <p className="text-xs font-medium uppercase tracking-[0.25em] text-cyan-400">
        {children}
      </p>
    </Reveal>
  );
}

/* =========================================================
   NEON NEXUS TEMPLATE
========================================================= */

function NeonNexusTemplate({ portfolio }) {
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

  const bar = useRef(null);
  const hero = useRef(null);
  const glow = useRef(null);

  const ticker =
    skills?.length
      ? skills
      : [role].filter(Boolean);

  /* -----------------------------------------
     Scroll progress + mouse glow
  ----------------------------------------- */

  useEffect(() => {
    const reduce =
      window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

    const onScroll = () => {
      const h =
        document.documentElement;

      if (bar.current) {
        const progress =
          h.scrollTop /
          Math.max(
            1,
            h.scrollHeight -
              h.clientHeight
          );

        bar.current.style.transform =
          `scaleX(${progress})`;
      }
    };

    const onMove = (e) => {
      if (reduce) return;

      if (glow.current) {
        glow.current.style.transform =
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
      onMove
    );

    return () => {
      window.removeEventListener(
        "scroll",
        onScroll
      );

      window.removeEventListener(
        "pointermove",
        onMove
      );
    };
  }, []);

  return (
    <div
      style={body}
      className="min-h-screen overflow-x-hidden bg-[#040a1a] text-slate-300"
    >
      <style>{CSS}</style>

      {/* SCROLL PROGRESS */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 top-0 z-[70] h-1"
      >
        <div
          ref={bar}
          className="h-full origin-left bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-300"
          style={{
            transform: "scaleX(0)",
          }}
        />
      </div>

      {/* MOUSE GLOW */}
      <div
        ref={glow}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-0 hidden h-[360px] w-[360px] rounded-full bg-cyan-400/10 blur-3xl md:block"
        style={{
          transform:
            "translate(-500px,-500px)",
          transition:
            "transform .35s ease-out",
        }}
      />

      {/* =================================================
          HEADER
      ================================================= */}

      <header className="sticky top-0 z-50 border-b border-cyan-400/10 bg-[#040a1a]/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5">
          <a
            href="#top"
            style={head}
            className="max-w-[55%] truncate text-sm font-bold text-white sm:text-base"
          >
            <span className="text-cyan-400">
              {"//"}
            </span>{" "}
            {name}
          </a>

          <nav
            aria-label="Primary"
            className="hidden gap-7 text-xs text-slate-400 md:flex"
          >
            {[
              ["about", "About"],
              ["work", "Work"],
              ["contact", "Contact"],
            ].map(([id, label]) => (
              <a
                key={id}
                href={`#${id}`}
                className="transition hover:text-cyan-300"
              >
                {label}
              </a>
            ))}
          </nav>

          {email && (
            <a
              href={`mailto:${email}`}
              className="nx-btn rounded border border-cyan-400/60 bg-cyan-400/5 px-4 py-2 text-xs font-medium text-cyan-300 shadow-[0_0_18px_rgba(34,211,238,.2)] transition hover:bg-cyan-400/10"
            >
              Let’s work together
            </a>
          )}
        </div>
      </header>

      <main
        id="top"
        className="relative"
      >
        {/* =================================================
            HERO
        ================================================= */}

        <section
          ref={hero}
          className="relative overflow-hidden"
        >
          <div
            aria-hidden="true"
            className="nx-grid pointer-events-none absolute inset-0"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(34,211,238,.08),transparent_55%)]"
          />

          <div
            aria-hidden="true"
            className="nx-anim absolute -left-32 top-20 h-96 w-96 rounded-full bg-cyan-500/15 blur-3xl"
            style={{
              animation:
                "nx-float 14s ease-in-out infinite",
              transform:
                "translate3d(calc(var(--mx,0)*30px),calc(var(--my,0)*30px),0)",
            }}
          />

          <div
            aria-hidden="true"
            className="nx-anim absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-blue-600/15 blur-3xl"
            style={{
              animation:
                "nx-float-reverse 17s ease-in-out infinite",
            }}
          />

          <div className="nx-scan" />

          <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 md:grid-cols-2 md:py-24">
            <div>
              <Label>
                01 / Profile
              </Label>

              <Reveal
                delay={150}
              >
                <p className="mt-5 inline-block rounded border border-cyan-400/30 bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-300">
                  {role}
                </p>
              </Reveal>

              <Title
                as="h1"
                lines={[name || ""]}
                delay={250}
                className="mt-6 break-words text-4xl font-bold uppercase leading-tight text-white sm:text-5xl lg:text-7xl"
              />

              <Reveal delay={700}>
                <p className="mt-6 max-w-md leading-relaxed text-slate-400">
                  {about}
                </p>
              </Reveal>

              <Reveal
                delay={850}
                className="mt-8 flex flex-wrap gap-3"
              >
                {projects?.length > 0 && (
                  <a
                    href="#work"
                    className="nx-btn rounded bg-cyan-400 px-6 py-3 text-sm font-semibold text-[#040a1a] shadow-[0_0_25px_rgba(34,211,238,.4)] transition hover:bg-cyan-300"
                  >
                    View my work
                  </a>
                )}

                <Socials
                  portfolio={portfolio}
                  className="rounded border border-white/20 px-6 py-3 text-sm transition hover:bg-white/10"
                />
              </Reveal>
            </div>

            {/* PROFILE IMAGE */}

            <div className="relative mx-auto w-full max-w-sm">
              <div
                aria-hidden="true"
                className="absolute -inset-5 rounded-full border border-cyan-400/20"
                style={{
                  animation:
                    "nx-spin 18s linear infinite",
                }}
              />

              <div
                aria-hidden="true"
                className="absolute -inset-2 rounded-full border border-dashed border-cyan-400/30"
                style={{
                  animation:
                    "nx-spin-reverse 12s linear infinite",
                }}
              />

              <div
                aria-hidden="true"
                className="absolute inset-0 rounded-full bg-cyan-400/20 blur-2xl"
                style={{
                  animation:
                    "nx-glow 3s ease-in-out infinite",
                }}
              />

              <Reveal
                v="zoom"
                delay={300}
              >
                <div
                  className="relative"
                  style={{
                    animation:
                      "nx-bob 6s ease-in-out infinite",
                  }}
                >
                  <Img
                    src={profileImage}
                    alt={`Portrait of ${name}`}
                    className="relative aspect-square w-full rounded-full border-2 border-cyan-400/70 object-cover shadow-[0_0_70px_rgba(34,211,238,.35)]"
                  />

                  <span
                    aria-hidden="true"
                    className="absolute bottom-5 right-5 h-4 w-4 rounded-full bg-cyan-300"
                    style={{
                      animation:
                        "nx-pulse 2s ease-out infinite",
                    }}
                  />
                </div>
              </Reveal>

              {/* FLOATING STATUS */}

              <Reveal
                v="right"
                delay={700}
                className="absolute -right-3 bottom-3 z-10 sm:-right-10"
              >
                <div className="rounded-lg border border-cyan-400/20 bg-[#07122b]/90 px-4 py-3 text-xs shadow-2xl backdrop-blur-xl">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-cyan-300" />

                    <span className="text-cyan-300">
                      SYSTEM ONLINE
                    </span>
                  </div>

                  <p className="mt-1 font-mono text-[10px] text-slate-500">
                    AVAILABLE_FOR_PROJECTS=true
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* =================================================
            TICKER
        ================================================= */}

        {ticker.length > 0 && (
          <div
            className="relative overflow-hidden border-y border-cyan-400/10 bg-white/[.02] py-4"
            aria-hidden="true"
          >
            <div
              className="flex w-max gap-10 whitespace-nowrap text-sm font-semibold uppercase tracking-widest text-slate-500"
              style={{
                animation:
                  "nx-marquee 28s linear infinite",
              }}
            >
              {Array.from({
                length: 4,
              })
                .flatMap(() => ticker)
                .map((item, index) => (
                  <span
                    key={index}
                    className="flex items-center gap-10"
                  >
                    {item}
                    <span className="text-cyan-400">
                      ✦
                    </span>
                  </span>
                ))}
            </div>
          </div>
        )}

        {/* =================================================
            ABOUT
        ================================================= */}

        <section
          id="about"
          className="relative border-b border-cyan-400/10 bg-white/[.02]"
        >
          <div className="mx-auto max-w-7xl px-5 py-20">
            <Label>
              02 / About me
            </Label>

            <div className="mt-8 grid gap-10 md:grid-cols-2">
              <div>
                <Title
                  lines={[
                    "Building meaningful",
                    "digital experiences.",
                  ]}
                  className="text-3xl font-bold leading-tight text-white sm:text-4xl"
                />

                <Reveal delay={300}>
                  <p className="mt-6 max-w-xl leading-relaxed text-slate-400">
                    {about ||
                      "Building meaningful digital experiences through technology and design."}
                  </p>
                </Reveal>
              </div>

              <div className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-cyan-400/10 bg-cyan-400/10">
                {[
                  [
                    "Projects",
                    projects?.length || 0,
                  ],
                  [
                    "Technologies",
                    skills?.length || 0,
                  ],
                ].map(
                  ([label, number], index) => (
                    <Reveal
                      key={label}
                      v="zoom"
                      delay={index * 150}
                    >
                      <div className="bg-[#040a1a] p-6">
                        <p className="text-xs uppercase tracking-wider text-slate-500">
                          {label}
                        </p>

                        <p
                          style={head}
                          className="nx-gradient mt-2 text-4xl font-bold"
                        >
                          <Count to={number} />
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
            PHILOSOPHY
        ================================================= */}

        <section className="mx-auto max-w-7xl px-5 py-20">
          <Label>
            03 / Design philosophy
          </Label>

          <div className="mt-8 grid gap-10 lg:grid-cols-2">
            <div className="flex flex-col justify-center">
              {designPhilosophy?.text1 && (
                <Title
                  as="p"
                  lines={[
                    designPhilosophy.text1,
                  ]}
                  className="text-3xl font-bold leading-tight text-white sm:text-4xl"
                />
              )}

              {designPhilosophy?.text2 && (
                <Reveal
                  v="right"
                  delay={250}
                >
                  <p className="mt-7 border-l-2 border-cyan-400 pl-5 text-lg leading-relaxed text-cyan-200">
                    {designPhilosophy.text2}
                  </p>
                </Reveal>
              )}
            </div>

            <Wipe>
              <Img
                src={
                  designPhilosophy?.image
                }
                alt="Design philosophy"
                className="aspect-[4/3] w-full rounded-xl object-cover shadow-[0_0_45px_rgba(34,211,238,.1)]"
              />
            </Wipe>
          </div>
        </section>

        {/* =================================================
            CORE VALUES
        ================================================= */}

        <section className="border-y border-cyan-400/10 bg-white/[.02]">
          <div className="mx-auto max-w-7xl px-5 py-20">
            <Label>
              04 / Core values
            </Label>

            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {[
                [
                  coreValues?.image1,
                  "Core value one",
                  "Precision",
                  "Every detail has a role in creating a better experience.",
                ],
                [
                  coreValues?.image2,
                  "Core value two",
                  "Innovation",
                  "Technology should open new possibilities rather than add unnecessary complexity.",
                ],
              ].map(
                ([src, alt, title, description], index) => (
                  <Reveal
                    key={title}
                    delay={index * 150}
                  >
                    <Card
                      as="article"
                      className="h-full"
                    >
                      <div className="overflow-hidden">
                        <Img
                          src={src}
                          alt={alt}
                          className="aspect-[4/3] w-full object-cover transition duration-700 group-hover:scale-105"
                        />
                      </div>

                      <div className="p-6">
                        <span className="text-xs text-cyan-400">
                          VALUE 0
                          {index + 1}
                        </span>

                        <h3
                          style={head}
                          className="mt-3 text-xl text-white"
                        >
                          {title}
                        </h3>

                        <p className="mt-3 text-sm leading-relaxed text-slate-400">
                          {description}
                        </p>
                      </div>
                    </Card>
                  </Reveal>
                )
              )}
            </div>
          </div>
        </section>

        {/* =================================================
            PROCESS
        ================================================= */}

        <section className="mx-auto max-w-7xl px-5 py-20">
          <Label>
            05 / From thought to form
          </Label>

          <div className="mt-8 grid gap-10 md:grid-cols-12">
            <Title
              lines={[
                "CONCEPT",
                "→ SYSTEM",
                "→ EXPERIENCE",
              ]}
              className="text-4xl font-bold leading-tight text-white sm:text-5xl md:col-span-8"
            />

            <Reveal
              delay={350}
              className="md:col-span-4"
            >
              <p className="leading-relaxed text-slate-400">
                Ideas become products through
                exploration, structure,
                implementation, testing, and
                continuous refinement.
              </p>
            </Reveal>
          </div>

          <Reveal
            delay={500}
            className="mt-12"
          >
            <div className="h-px w-full bg-gradient-to-r from-cyan-400/60 via-blue-400/30 to-transparent" />
          </Reveal>
        </section>

        {/* =================================================
            PROJECTS
        ================================================= */}

        <section
          id="work"
          className="mx-auto max-w-7xl px-5 py-20"
        >
          <Label>
            06 / Featured projects
          </Label>

          <Title
            lines={[
              "Selected work.",
            ]}
            className="mt-3 text-3xl font-bold text-white sm:text-4xl"
          />

          {projects?.length > 0 ? (
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
                        <div className="relative overflow-hidden">
                          {project.image ? (
                            <Img
                              src={project.image}
                              alt={project.title}
                              className="aspect-video w-full object-cover transition duration-700 group-hover:scale-110"
                            />
                          ) : (
                            <div className="flex aspect-video items-center justify-center bg-[#07122b] text-5xl font-bold text-cyan-400">
                              {String(
                                index + 1
                              ).padStart(
                                2,
                                "0"
                              )}
                            </div>
                          )}

                          <span className="absolute left-3 top-3 rounded bg-[#040a1a]/85 px-2 py-1 text-xs text-cyan-300 backdrop-blur">
                            {String(
                              index + 1
                            ).padStart(
                              2,
                              "0"
                            )}
                          </span>

                          <span className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-cyan-400 text-[#040a1a] opacity-0 transition duration-300 group-hover:rotate-45 group-hover:opacity-100">
                            ↗
                          </span>
                        </div>

                        <div className="p-5">
                          <h3 className="font-semibold text-white">
                            {project.title}
                          </h3>

                          <p className="mt-2 text-sm leading-relaxed text-slate-400">
                            {project.description}
                          </p>
                        </div>
                      </Card>
                    </Tilt>
                  </Reveal>
                ))}
            </div>
          ) : (
            <p className="mt-8 text-sm text-slate-500">
              No projects added yet.
            </p>
          )}
        </section>

        {/* =================================================
            CASE STUDY
        ================================================= */}

        <section className="mx-auto max-w-7xl px-5 py-20">
          <Label>
            07 / Case study
          </Label>

          <Reveal
            v="zoom"
            className="mt-8"
          >
            <Card>
              <div className="overflow-hidden">
                <Img
                  src={caseStudy?.image}
                  alt={
                    caseStudy?.title ||
                    "Case study"
                  }
                  className="aspect-video w-full object-cover transition duration-700 group-hover:scale-105"
                />
              </div>

              <div className="grid gap-8 p-7 md:grid-cols-2">
                <Title
                  lines={[
                    caseStudy?.title ||
                      "Selected case study",
                  ]}
                  className="text-3xl font-bold text-white"
                />

                <p className="leading-relaxed text-slate-400">
                  {caseStudy?.description}
                </p>
              </div>
            </Card>
          </Reveal>
        </section>

        {/* =================================================
            TOOLS
        ================================================= */}

        <section className="border-y border-cyan-400/10 bg-white/[.02]">
          <div className="mx-auto max-w-7xl px-5 py-20">
            <Label>
              08 / Creative tools
            </Label>

            <div className="mt-8 grid gap-10 lg:grid-cols-2">
              <div>
                <Title
                  lines={[
                    "SYSTEM TOOLKIT",
                  ]}
                  className="text-3xl font-bold text-white"
                />

                <Reveal delay={250}>
                  <p className="mt-5 max-w-md leading-relaxed text-slate-400">
                    Technologies and tools used
                    to transform concepts into
                    responsive, functional digital
                    products.
                  </p>
                </Reveal>
              </div>

              {skills?.length > 0 && (
                <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {skills.map(
                    (skill, index) => (
                      <li
                        key={`${skill}-${index}`}
                      >
                        <Reveal
                          v="zoom"
                          delay={
                            Math.min(
                              index,
                              9
                            ) * 70
                          }
                        >
                          <div className="group rounded-lg border border-cyan-400/20 bg-[#07122b] px-4 py-4 text-sm font-medium text-slate-200 transition duration-300 hover:-translate-y-1 hover:border-cyan-400/60 hover:bg-cyan-500/10 hover:text-white">
                            <span className="mr-2 text-cyan-400">
                              {String(
                                index + 1
                              ).padStart(
                                2,
                                "0"
                              )}
                            </span>

                            {skill}
                          </div>
                        </Reveal>
                      </li>
                    )
                  )}
                </ul>
              )}
            </div>
          </div>
        </section>

        {/* =================================================
            AESTHETIC
        ================================================= */}

        <section className="mx-auto max-w-7xl px-5 py-20">
          <Label>
            09 / Personal aesthetic
          </Label>

          <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-8">
              <Wipe>
                <div className="relative overflow-hidden rounded-xl">
                  <Img
                    src={
                      personalAesthetic?.image
                    }
                    alt="Personal aesthetic"
                    className="aspect-video w-full object-cover transition duration-700 hover:scale-105"
                  />

                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#040a1a]/40 to-transparent"
                  />
                </div>
              </Wipe>
            </div>

            <Title
              as="p"
              lines={[
                "FUTURE",
                "FOCUSED.",
                "HUMAN",
                "CENTERED.",
              ]}
              delay={250}
              className="text-3xl font-bold leading-tight text-white lg:col-span-4"
            />
          </div>
        </section>

        {/* =================================================
            CONTACT
        ================================================= */}

        <section
          id="contact"
          className="border-t border-cyan-400/10 bg-white/[.02]"
        >
          <div className="mx-auto max-w-7xl px-5 py-20">
            <Label>
              10 / Contact & social links
            </Label>

            <div className="mt-8 flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
              <div>
                <Title
                  lines={[
                    "Ready to build",
                    "something?",
                  ]}
                  className="text-3xl font-bold text-white sm:text-4xl"
                />

                {email && (
                  <Reveal delay={300}>
                    <a
                      href={`mailto:${email}`}
                      style={head}
                      className="mt-6 block break-all text-xl text-cyan-300 transition hover:text-white sm:text-3xl"
                    >
                      {email}
                    </a>
                  </Reveal>
                )}
              </div>

              <Reveal
                delay={450}
                className="flex flex-wrap gap-5 text-sm"
              >
                {socialLinks?.github && (
                  <a
                    href={
                      socialLinks.github
                    }
                    target="_blank"
                    rel="noreferrer"
                    className="underline underline-offset-4 transition hover:text-cyan-300"
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
                    className="underline underline-offset-4 transition hover:text-cyan-300"
                  >
                    LinkedIn ↗
                  </a>
                )}
              </Reveal>
            </div>
          </div>
        </section>

        {/* =================================================
            THANK YOU
        ================================================= */}

        <section className="relative mx-auto max-w-7xl overflow-hidden px-5 py-24">
          <div
            aria-hidden="true"
            className="nx-anim absolute left-1/3 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-cyan-500/10 blur-3xl"
            style={{
              animation:
                "nx-float 12s ease-in-out infinite",
            }}
          />

          <div className="relative">
            <Label>
              11 / Thank you
            </Label>

            <div className="mt-8 flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
              <Title
                as="h2"
                lines={[
                  "SEE YOU",
                  "IN THE",
                  "FUTURE.",
                ]}
                className="nx-gradient text-5xl font-bold uppercase leading-tight sm:text-7xl md:text-8xl"
              />

              <Reveal
                delay={500}
                className="flex items-center gap-5 text-sm"
              >
                {[
                  ["about", "About"],
                  ["work", "Work"],
                  ["contact", "Contact"],
                ].map(([id, label]) => (
                  <a
                    key={id}
                    href={`#${id}`}
                    className="text-slate-400 transition hover:text-cyan-300"
                  >
                    {label}
                  </a>
                ))}

                <a
                  href="#top"
                  onClick={(e) => {
                    e.preventDefault();

                    window.scrollTo({
                      top: 0,
                      behavior: "smooth",
                    });
                  }}
                  className="text-cyan-300"
                  style={{
                    animation:
                      "nx-bob 2.4s ease-in-out infinite",
                  }}
                >
                  ↑ Top
                </a>
              </Reveal>
            </div>
          </div>
        </section>
      </main>

      {/* =================================================
          FOOTER
      ================================================= */}

      <footer className="border-t border-cyan-400/10">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 px-5 py-8 text-xs text-slate-500 sm:flex-row">
          <span>{name}</span>
          <span>{role}</span>
          <span>
            © {new Date().getFullYear()}
          </span>
        </div>
      </footer>
    </div>
  );
}

export default NeonNexusTemplate;