import { useEffect, useRef, useState } from "react";
import { Img, Socials } from "./shared";

const font = {
  fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
};

/* =========================
   ANIMATION HELPERS
========================= */

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(node);
        }
      },
      { threshold }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [threshold]);

  return [ref, visible];
}

function Reveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
}) {
  const [ref, visible] = useInView();

  const transforms = {
    up: "translateY(50px)",
    down: "translateY(-50px)",
    left: "translateX(-60px)",
    right: "translateX(60px)",
    zoom: "scale(.88)",
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : transforms[direction],
        transition: `
          opacity 700ms ease ${delay}ms,
          transform 900ms cubic-bezier(.2,.7,.2,1) ${delay}ms
        `,
      }}
    >
      {children}
    </div>
  );
}

function AnimatedTitle({
  children,
  className = "",
  delay = 0,
}) {
  const [ref, visible] = useInView();

  const words = String(children ?? "").split(" ");

  return (
    <div
      ref={ref}
      className={className}
      style={{ overflow: "hidden" }}
    >
      {words.map((word, index) => (
        <span
          key={`${word}-${index}`}
          className="mr-[0.22em] inline-block"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible
              ? "translateY(0)"
              : "translateY(110%)",
            transition:
              "opacity 650ms ease, transform 800ms cubic-bezier(.2,.7,.2,1)",
            transitionDelay: `${delay + index * 70}ms`,
          }}
        >
          {word}
        </span>
      ))}
    </div>
  );
}

function Wipe({
  children,
  className = "",
  delay = 0,
}) {
  const [ref, visible] = useInView();

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "scale(1)" : "scale(.96)",
        transition: `opacity 800ms ease ${delay}ms, transform 900ms ease ${delay}ms`,
      }}
    >
      {children}

      <div
        className="pointer-events-none absolute inset-0 bg-violet-600"
        style={{
          transform: visible
            ? "translateX(105%)"
            : "translateX(0)",
          transition:
            "transform 1000ms cubic-bezier(.77,0,.18,1)",
          transitionDelay: `${delay}ms`,
        }}
      />
    </div>
  );
}

function Tilt({ children, className = "" }) {
  const ref = useRef(null);

  const handleMove = (event) => {
    const node = ref.current;
    if (!node) return;

    const rect = node.getBoundingClientRect();

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const rotateY = ((x / rect.width) - 0.5) * 6;
    const rotateX = ((y / rect.height) - 0.5) * -6;

    node.style.transform = `
      perspective(1000px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      translateY(-6px)
    `;
  };

  const reset = () => {
    if (!ref.current) return;

    ref.current.style.transform =
      "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)";
  };

  return (
    <div
      ref={ref}
      className={className}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{
        transition:
          "transform 450ms cubic-bezier(.2,.7,.2,1)",
        transformStyle: "preserve-3d",
      }}
    >
      {children}
    </div>
  );
}

/* =========================
   MAIN TEMPLATE
========================= */

function CodeCraftTemplate({ portfolio }) {
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

  const label =
    "text-xs font-semibold uppercase tracking-widest text-violet-400";

  const cta =
    "rounded-lg bg-gradient-to-r from-indigo-500 to-violet-500 px-5 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-violet-500/20 hover:opacity-95";

  const card =
    "rounded-xl border border-white/10 bg-white/[.03]";

  const [progress, setProgress] = useState(0);

  const [cursor, setCursor] = useState({
    x: -100,
    y: -100,
  });

  /* =========================
     SCROLL PROGRESS
  ========================= */

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;

      const height =
        document.documentElement.scrollHeight -
        window.innerHeight;

      setProgress(
        height > 0
          ? (scrollTop / height) * 100
          : 0
      );
    };

    window.addEventListener(
      "scroll",
      handleScroll,
      { passive: true }
    );

    handleScroll();

    return () =>
      window.removeEventListener(
        "scroll",
        handleScroll
      );
  }, []);

  /* =========================
     CURSOR
  ========================= */

  useEffect(() => {
    const move = (event) => {
      setCursor({
        x: event.clientX,
        y: event.clientY,
      });
    };

    window.addEventListener(
      "mousemove",
      move
    );

    return () =>
      window.removeEventListener(
        "mousemove",
        move
      );
  }, []);

  return (
    <div
      style={font}
      className="min-h-screen overflow-x-hidden bg-[#0a0b1e] text-slate-300"
    >
      {/* =========================
          GLOBAL STYLE
      ========================= */}

      <style>{`
        html {
          scroll-behavior: smooth;
        }

        ::selection {
          background: #7c3aed;
          color: white;
        }

        .code-grid {
          background-image:
            linear-gradient(rgba(255,255,255,.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.035) 1px, transparent 1px);
          background-size: 42px 42px;
        }

        .code-glow {
          animation: code-glow 4s ease-in-out infinite;
        }

        @keyframes code-glow {
          0%, 100% {
            transform: translateY(0) scale(1);
            opacity: .35;
          }

          50% {
            transform: translateY(-15px) scale(1.08);
            opacity: .55;
          }
        }

        .code-float {
          animation: code-float 5s ease-in-out infinite;
        }

        @keyframes code-float {
          0%, 100% {
            transform: translateY(0);
          }

          50% {
            transform: translateY(-12px);
          }
        }

        .code-marquee {
          animation: code-marquee 18s linear infinite;
        }

        @keyframes code-marquee {
          from {
            transform: translateX(0);
          }

          to {
            transform: translateX(-50%);
          }
        }

        .code-blink {
          animation: code-blink 1.2s step-end infinite;
        }

        @keyframes code-blink {
          50% {
            opacity: 0;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          html {
            scroll-behavior: auto;
          }

          *,
          *::before,
          *::after {
            animation-duration: .01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: .01ms !important;
          }
        }
      `}</style>

      {/* =========================
          PROGRESS
      ========================= */}

      <div
        className="fixed left-0 top-0 z-[100] h-[2px] bg-gradient-to-r from-indigo-500 to-violet-500"
        style={{
          width: `${progress}%`,
        }}
      />

      {/* =========================
          CURSOR
      ========================= */}

      <div
        className="pointer-events-none fixed z-[90] hidden h-12 w-12 rounded-full border border-violet-400/30 md:block"
        style={{
          left: cursor.x,
          top: cursor.y,
          transform: "translate(-50%, -50%)",
          transition:
            "left 120ms ease-out, top 120ms ease-out",
        }}
      />

      {/* =========================
          HEADER
      ========================= */}

      <header className="sticky top-0 z-20 border-b border-white/10 bg-[#0a0b1e]/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <a
            href="#top"
            className="font-bold text-white transition-colors hover:text-violet-300"
          >
            {name}
          </a>

          <nav
            aria-label="Primary"
            className="hidden gap-8 text-sm text-slate-400 md:flex"
          >
            <a
              className="transition-colors hover:text-white"
              href="#about"
            >
              About
            </a>

            <a
              className="transition-colors hover:text-white"
              href="#projects"
            >
              Projects
            </a>

            <a
              className="transition-colors hover:text-white"
              href="#contact"
            >
              Contact
            </a>
          </nav>

          {email && (
            <a
              href={`mailto:${email}`}
              className={cta}
            >
              Hire me
            </a>
          )}
        </div>
      </header>

      <main id="top">
        {/* =========================
            HERO
        ========================= */}

        <section className="code-grid relative overflow-hidden">
          <div className="pointer-events-none absolute -right-24 top-20 h-72 w-72 rounded-full bg-violet-600/20 blur-3xl code-glow" />

          <div className="pointer-events-none absolute -left-20 bottom-10 h-64 w-64 rounded-full bg-indigo-600/20 blur-3xl code-glow" />

          <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-16 md:grid-cols-2 md:py-24">
            <Reveal direction="left">
              <p className={label}>
                01 / Developer
              </p>

              <span className="mt-5 inline-block rounded border border-violet-400/30 bg-violet-500/10 px-3 py-1 text-xs font-semibold text-violet-300">
                {role}
              </span>

              <AnimatedTitle className="mt-6 text-5xl font-extrabold leading-tight text-white sm:text-6xl">
                Hi, I’m {name}
              </AnimatedTitle>

              {about && (
                <Reveal delay={200}>
                  <p className="mt-5 max-w-md leading-relaxed text-slate-400">
                    {about}
                  </p>
                </Reveal>
              )}

              <div className="mt-8 flex flex-wrap gap-3">
                {projects?.length > 0 && (
                  <a
                    href="#projects"
                    className={cta}
                  >
                    View my work
                  </a>
                )}

                <Socials
                  portfolio={portfolio}
                  className="rounded-lg border border-white/20 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-1 hover:bg-white/10"
                />
              </div>

              <div className="mt-8 flex items-center gap-2 font-mono text-xs text-slate-500">
                <span className="text-violet-400">
                  $
                </span>
                <span>
                  building.digital.experiences
                </span>
                <span className="code-blink">
                  _
                </span>
              </div>
            </Reveal>

            <Reveal
              direction="right"
              delay={150}
            >
              <div className="relative mx-auto w-full max-w-sm">
                <div className="absolute inset-6 rounded-full bg-violet-600/70 blur-xl code-glow" />

                <div className="absolute -right-4 top-10 h-3 w-3 rounded-full bg-violet-400 code-float" />

                <div className="absolute -left-3 bottom-20 h-2 w-2 rounded-full bg-indigo-400 code-float" />

                <Wipe>
                  <Img
                    src={profileImage}
                    alt={`Portrait of ${name}`}
                    className="relative aspect-square w-full rounded-full border-4 border-violet-400/40"
                  />
                </Wipe>
              </div>
            </Reveal>
          </div>
        </section>

        {/* =========================
            ABOUT
        ========================= */}

        <section
          id="about"
          className="border-y border-white/10 bg-white/[.02]"
        >
          <div className="mx-auto max-w-6xl px-5 py-16">
            <Reveal>
              <p className={label}>
                02 / About me
              </p>
            </Reveal>

            <div className="mt-8 grid gap-10 md:grid-cols-2">
              <Reveal direction="left">
                <h2 className="text-3xl font-bold text-white">
                  Building ideas into digital products.
                </h2>

                {about && (
                  <p className="mt-5 leading-relaxed text-slate-400">
                    {about}
                  </p>
                )}
              </Reveal>

              <Reveal
                direction="right"
                delay={150}
              >
                <div className="grid grid-cols-2 gap-px bg-white/10">
                  <div className="bg-[#0a0b1e] p-6 transition duration-300 hover:bg-violet-950/30">
                    <p className="text-sm text-slate-400">
                      Projects
                    </p>

                    <p className="mt-2 text-4xl font-bold text-white">
                      {projects?.length || 0}
                    </p>
                  </div>

                  <div className="bg-[#0a0b1e] p-6 transition duration-300 hover:bg-violet-950/30">
                    <p className="text-sm text-slate-400">
                      Technologies
                    </p>

                    <p className="mt-2 text-4xl font-bold text-white">
                      {skills?.length || 0}
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* =========================
            DESIGN PHILOSOPHY
        ========================= */}

        <section className="mx-auto max-w-6xl px-5 py-20">
          <Reveal>
            <p className={label}>
              03 / Design philosophy
            </p>
          </Reveal>

          <div className="mt-8 grid gap-8 md:grid-cols-2">
            <div className="flex flex-col justify-center gap-5">
              {designPhilosophy?.text1 && (
                <AnimatedTitle className="text-3xl font-bold leading-tight text-white sm:text-4xl">
                  “{designPhilosophy.text1}”
                </AnimatedTitle>
              )}

              {designPhilosophy?.text2 && (
                <AnimatedTitle
                  className="text-2xl font-medium leading-tight text-violet-300 sm:text-3xl"
                  delay={150}
                >
                  “{designPhilosophy.text2}”
                </AnimatedTitle>
              )}
            </div>

            <Reveal
              direction="right"
              delay={150}
            >
              <Wipe>
                <Img
                  src={designPhilosophy?.image}
                  alt="Design philosophy"
                  className="aspect-[4/3] rounded-xl"
                />
              </Wipe>
            </Reveal>
          </div>
        </section>

        {/* =========================
            CORE VALUES
        ========================= */}

        <section className="border-y border-white/10 bg-white/[.02]">
          <div className="mx-auto max-w-6xl px-5 py-20">
            <Reveal>
              <p className={label}>
                04 / Core values
              </p>
            </Reveal>

            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              <Reveal>
                <Tilt>
                  <article
                    className={`${card} group overflow-hidden transition-colors duration-500 hover:border-violet-400/50`}
                  >
                    <Img
                      src={coreValues?.image1}
                      alt="Core value one"
                      className="aspect-[4/3]"
                    />

                    <div className="p-6">
                      <span className="text-xs text-violet-400">
                        01
                      </span>

                      <h3 className="mt-2 text-xl font-bold text-white transition-transform duration-300 group-hover:translate-x-2">
                        Purpose
                      </h3>

                      <p className="mt-2 text-sm leading-relaxed text-slate-400">
                        Every technical decision should serve a clear purpose.
                      </p>
                    </div>
                  </article>
                </Tilt>
              </Reveal>

              <Reveal delay={150}>
                <Tilt>
                  <article
                    className={`${card} group overflow-hidden transition-colors duration-500 hover:border-violet-400/50`}
                  >
                    <Img
                      src={coreValues?.image2}
                      alt="Core value two"
                      className="aspect-[4/3]"
                    />

                    <div className="p-6">
                      <span className="text-xs text-violet-400">
                        02
                      </span>

                      <h3 className="mt-2 text-xl font-bold text-white transition-transform duration-300 group-hover:translate-x-2">
                        Simplicity
                      </h3>

                      <p className="mt-2 text-sm leading-relaxed text-slate-400">
                        Clean interfaces and maintainable code create better
                        experiences.
                      </p>
                    </div>
                  </article>
                </Tilt>
              </Reveal>
            </div>
          </div>
        </section>

        {/* =========================
            THOUGHT TO FORM
        ========================= */}

        <section className="mx-auto max-w-6xl px-5 py-20">
          <Reveal>
            <p className={label}>
              05 / From thought to form
            </p>
          </Reveal>

          <div className="mt-8 grid gap-8 md:grid-cols-12">
            <Reveal className="md:col-span-8">
              <AnimatedTitle className="text-4xl font-extrabold leading-tight text-white sm:text-5xl">
                From concept to clean, functional code.
              </AnimatedTitle>
            </Reveal>

            <Reveal
              className="md:col-span-4"
              direction="right"
              delay={150}
            >
              <p className="leading-relaxed text-slate-400">
                I transform ideas into responsive interfaces, reusable
                components, and practical digital experiences through a
                structured development process.
              </p>
            </Reveal>
          </div>
        </section>

        {/* =========================
            PROJECTS
        ========================= */}

        <section
          id="projects"
          className="mx-auto max-w-6xl px-5 py-20"
        >
          <Reveal>
            <p className={label}>
              06 / Featured projects
            </p>

            <h2 className="mb-10 mt-2 text-3xl font-bold text-white">
              Some of my recent work
            </h2>
          </Reveal>

          {projects?.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {projects.slice(0, 3).map(
                (project, index) => (
                  <Reveal
                    key={index}
                    delay={index * 120}
                  >
                    <Tilt>
                      <article
                        className={`group overflow-hidden ${card} transition-all duration-500 hover:-translate-y-1 hover:border-violet-400/50 hover:shadow-xl hover:shadow-violet-950/20`}
                      >
                        <div className="relative overflow-hidden">
                          <Img
                            src={project.image}
                            alt={project.title}
                            className="aspect-[16/10] w-full transition duration-700 group-hover:scale-105"
                          />

                          <span className="absolute left-3 top-3 rounded bg-black/60 px-2 py-0.5 font-mono text-xs text-white backdrop-blur">
                            {String(index + 1).padStart(
                              2,
                              "0"
                            )}
                          </span>

                          <div className="absolute bottom-3 right-3 translate-y-3 rounded-full bg-violet-500 px-3 py-1 text-xs font-semibold text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                            View
                          </div>
                        </div>

                        <div className="p-5">
                          <h3 className="font-semibold text-white">
                            {project.title}
                          </h3>

                          <p className="mt-2 text-sm leading-relaxed text-slate-400">
                            {project.description}
                          </p>
                        </div>
                      </article>
                    </Tilt>
                  </Reveal>
                )
              )}
            </div>
          ) : (
            <p className="text-slate-500">
              No projects added yet.
            </p>
          )}
        </section>

        {/* =========================
            CASE STUDY
        ========================= */}

        <section className="mx-auto max-w-6xl px-5 py-20">
          <Reveal>
            <p className={label}>
              07 / Case study
            </p>
          </Reveal>

          <Reveal delay={100}>
            <div
              className={`mt-8 overflow-hidden ${card} transition-colors duration-500 hover:border-violet-400/40`}
            >
              <Wipe>
                <Img
                  src={caseStudy?.image}
                  alt={
                    caseStudy?.title ||
                    "Case study"
                  }
                  className="aspect-video w-full"
                />
              </Wipe>

              <div className="grid gap-8 p-7 md:grid-cols-2">
                <AnimatedTitle className="text-3xl font-bold text-white">
                  {caseStudy?.title ||
                    "Selected case study"}
                </AnimatedTitle>

                <p className="leading-relaxed text-slate-400">
                  {caseStudy?.description}
                </p>
              </div>
            </div>
          </Reveal>
        </section>

        {/* =========================
            CREATIVE TOOLS
        ========================= */}

        <section
          id="skills"
          className="border-y border-white/10 bg-white/[.02]"
        >
          <div className="mx-auto max-w-6xl px-5 py-20">
            <Reveal>
              <p className={label}>
                08 / Creative tools
              </p>
            </Reveal>

            <div className="mt-8 grid gap-10 md:grid-cols-2">
              <Reveal direction="left">
                <h2 className="text-3xl font-bold text-white">
                  Technologies I work with
                </h2>

                <p className="mt-4 leading-relaxed text-slate-400">
                  A practical toolkit for building modern, scalable web
                  experiences.
                </p>
              </Reveal>

              {skills?.length > 0 && (
                <Reveal
                  direction="right"
                  delay={150}
                >
                  <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                    {skills.map(
                      (skill, index) => (
                        <li
                          key={`${skill}-${index}`}
                          className="group rounded-lg border border-white/10 bg-white/[.03] px-4 py-4 text-sm font-medium text-slate-200 transition-all duration-300 hover:-translate-y-1 hover:border-violet-400/50 hover:bg-violet-500/10 hover:text-white"
                        >
                          <span className="mr-2 text-violet-400">
                            {String(index + 1).padStart(
                              2,
                              "0"
                            )}
                          </span>

                          {skill}
                        </li>
                      )
                    )}
                  </ul>
                </Reveal>
              )}
            </div>
          </div>
        </section>

        {/* =========================
            SKILL MARQUEE
        ========================= */}

        {skills?.length > 0 && (
          <section className="overflow-hidden border-b border-white/10 py-5">
            <div className="flex w-max code-marquee">
              {[...skills, ...skills, ...skills].map(
                (skill, index) => (
                  <span
                    key={`${skill}-marquee-${index}`}
                    className="mx-5 whitespace-nowrap font-mono text-sm text-slate-600"
                  >
                    {"<"} {skill} {"/>"} 
                  </span>
                )
              )}
            </div>
          </section>
        )}

        {/* =========================
            PERSONAL AESTHETIC
        ========================= */}

        <section className="mx-auto max-w-6xl px-5 py-20">
          <Reveal>
            <p className={label}>
              09 / Personal aesthetic
            </p>
          </Reveal>

          <div className="mt-8 grid gap-8 md:grid-cols-12 md:items-center">
            <Reveal
              className="md:col-span-8"
              direction="left"
            >
              <Wipe>
                <Img
                  src={personalAesthetic?.image}
                  alt="Personal aesthetic"
                  className="aspect-video rounded-xl"
                />
              </Wipe>
            </Reveal>

            <Reveal
              className="md:col-span-4"
              direction="right"
              delay={150}
            >
              <AnimatedTitle className="text-3xl font-bold leading-tight text-white">
                Build clean. Think clearly. Ship confidently.
              </AnimatedTitle>
            </Reveal>
          </div>
        </section>

        {/* =========================
            CONTACT
        ========================= */}

        <section
          id="contact"
          className="border-t border-white/10 bg-white/[.02]"
        >
          <div className="mx-auto max-w-6xl px-5 py-20">
            <Reveal>
              <p className={label}>
                10 / Contact & social links
              </p>
            </Reveal>

            <div className="mt-8 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
              <Reveal direction="left">
                <h2 className="text-3xl font-bold text-white sm:text-4xl">
                  Have a project in mind?
                </h2>

                {email && (
                  <a
                    href={`mailto:${email}`}
                    className="mt-5 block break-all text-xl font-semibold text-violet-300 transition-colors hover:text-violet-200 sm:text-2xl"
                  >
                    {email}
                  </a>
                )}
              </Reveal>

              <Reveal
                direction="right"
                delay={150}
              >
                <div className="flex flex-wrap gap-5 text-sm">
                  {socialLinks?.github && (
                    <a
                      href={socialLinks.github}
                      target="_blank"
                      rel="noreferrer"
                      className="text-slate-300 underline underline-offset-4 transition hover:text-white"
                    >
                      GitHub ↗
                    </a>
                  )}

                  {socialLinks?.linkedin && (
                    <a
                      href={socialLinks.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="text-slate-300 underline underline-offset-4 transition hover:text-white"
                    >
                      LinkedIn ↗
                    </a>
                  )}
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* =========================
            THANK YOU
        ========================= */}

        <section className="relative mx-auto max-w-6xl overflow-hidden px-5 py-24">
          <div className="pointer-events-none absolute right-10 top-10 h-40 w-40 rounded-full bg-violet-600/20 blur-3xl code-glow" />

          <Reveal>
            <p className={label}>
              11 / Thank you
            </p>
          </Reveal>

          <div className="mt-8 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <AnimatedTitle className="text-6xl font-extrabold tracking-tight text-white sm:text-8xl">
              LET'S BUILD.
            </AnimatedTitle>

            <Reveal
              direction="right"
              delay={150}
            >
              <div className="flex gap-5 text-sm">
                <a
                  href="#about"
                  className="text-slate-400 transition hover:text-white"
                >
                  About
                </a>

                <a
                  href="#projects"
                  className="text-slate-400 transition hover:text-white"
                >
                  Projects
                </a>

                <a
                  href="#contact"
                  className="text-slate-400 transition hover:text-white"
                >
                  Contact
                </a>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      {/* =========================
          FOOTER
      ========================= */}

      <footer className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-3 px-5 py-6 text-xs text-slate-500 sm:flex-row">
          <Reveal>
            <span>{name}</span>
          </Reveal>

          <Reveal
            direction="right"
            delay={100}
          >
            <span>{role}</span>
          </Reveal>
        </div>
      </footer>
    </div>
  );
}

export default CodeCraftTemplate;