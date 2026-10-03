import { useEffect, useRef, useState } from "react";
import { Img, Links, philosophy, pick } from "./sharedColorful";

/* =========================================================
   ANIMATION HOOK
========================================================= */

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(element);
        }
      },
      { threshold }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [threshold]);

  return [ref, visible];
}

/* =========================================================
   SCROLL REVEAL
========================================================= */

function Reveal({
  children,
  className = "",
  direction = "up",
  delay = 0,
}) {
  const [ref, visible] = useInView(0.12);

  const transforms = {
    up: "translateY(45px)",
    down: "translateY(-40px)",
    left: "translateX(-45px)",
    right: "translateX(45px)",
    zoom: "scale(0.92)",
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible
          ? "translate3d(0,0,0) scale(1)"
          : transforms[direction],
        transition: `
          opacity 800ms ease ${delay}ms,
          transform 900ms cubic-bezier(.22,1,.36,1) ${delay}ms
        `,
      }}
    >
      {children}
    </div>
  );
}

/* =========================================================
   WORD REVEAL TITLE
========================================================= */

function AnimatedTitle({
  children,
  className = "",
  delay = 0,
}) {
  const words = String(children).split(" ");
  const [ref, visible] = useInView(0.2);

  return (
    <span
      ref={ref}
      className={`inline-flex flex-wrap ${className}`}
    >
      {words.map((word, index) => (
        <span
          key={`${word}-${index}`}
          className="mr-[0.28em] inline-block overflow-hidden"
        >
          <span
            className="inline-block"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible
                ? "translateY(0)"
                : "translateY(110%)",
              transition:
                "opacity 650ms ease, transform 750ms cubic-bezier(.22,1,.36,1)",
              transitionDelay: `${delay + index * 65}ms`,
            }}
          >
            {word}
          </span>
        </span>
      ))}
    </span>
  );
}

/* =========================================================
   IMAGE WIPE
========================================================= */

function Wipe({
  src,
  alt,
  className = "",
  delay = 0,
}) {
  const [ref, visible] = useInView(0.12);

  return (
    <div
      ref={ref}
      className="relative overflow-hidden"
    >
      <Img
        src={src}
        alt={alt}
        className={`transition duration-1000 ${
          visible ? "scale-100" : "scale-110"
        } ${className}`}
      />

      <div
        className="pointer-events-none absolute inset-0 bg-[#0a2a6b]"
        style={{
          transform: visible
            ? "translateX(105%)"
            : "translateX(0)",
          transition:
            "transform 1100ms cubic-bezier(.77,0,.18,1)",
          transitionDelay: `${delay}ms`,
        }}
      />
    </div>
  );
}

/* =========================================================
   3D TILT
========================================================= */

function Tilt({ children, className = "" }) {
  const ref = useRef(null);

  const handleMove = (event) => {
    const element = ref.current;
    if (!element) return;

    const rect = element.getBoundingClientRect();

    const x =
      (event.clientX - rect.left) / rect.width - 0.5;

    const y =
      (event.clientY - rect.top) / rect.height - 0.5;

    element.style.transform = `
      perspective(900px)
      rotateX(${y * -4}deg)
      rotateY(${x * 4}deg)
      translateY(-5px)
    `;
  };

  const handleLeave = () => {
    if (!ref.current) return;

    ref.current.style.transform =
      "perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0)";
  };

  return (
    <div
      ref={ref}
      className={`transition-transform duration-500 ease-out ${className}`}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      {children}
    </div>
  );
}

/* =========================================================
   OCEAN BLUE TEMPLATE
========================================================= */

function OceanBlueTemplate({ portfolio: p }) {
  const hero = pick(
    p.caseStudy?.image,
    p.personalAesthetic?.image,
    p.profileImage
  );

  const [scrollProgress, setScrollProgress] = useState(0);

  const [cursor, setCursor] = useState({
    x: -100,
    y: -100,
  });

  /* =======================================================
     SCROLL PROGRESS
  ======================================================= */

  useEffect(() => {
    const updateScroll = () => {
      const scrollTop = window.scrollY;

      const scrollHeight =
        document.documentElement.scrollHeight -
        window.innerHeight;

      const progress =
        scrollHeight > 0
          ? scrollTop / scrollHeight
          : 0;

      setScrollProgress(progress);
    };

    window.addEventListener("scroll", updateScroll, {
      passive: true,
    });

    updateScroll();

    return () =>
      window.removeEventListener("scroll", updateScroll);
  }, []);

  /* =======================================================
     CURSOR GLOW
  ======================================================= */

  useEffect(() => {
    const moveCursor = (event) => {
      setCursor({
        x: event.clientX,
        y: event.clientY,
      });
    };

    window.addEventListener("mousemove", moveCursor);

    return () =>
      window.removeEventListener(
        "mousemove",
        moveCursor
      );
  }, []);

  return (
    <>
      {/* ===================================================
          ANIMATION CSS
      =================================================== */}

      <style>{`
        @keyframes oceanFloat {
          0%, 100% {
            transform: translate3d(0, 0, 0);
          }

          50% {
            transform: translate3d(0, -15px, 0);
          }
        }

        @keyframes oceanPulse {
          0%, 100% {
            opacity: .12;
            transform: scale(1);
          }

          50% {
            opacity: .28;
            transform: scale(1.1);
          }
        }

        @keyframes oceanWave {
          0% {
            transform: translateX(0);
          }

          50% {
            transform: translateX(-15px);
          }

          100% {
            transform: translateX(0);
          }
        }

        @keyframes oceanMarquee {
          from {
            transform: translateX(0);
          }

          to {
            transform: translateX(-50%);
          }
        }

        .ocean-float {
          animation: oceanFloat 6s ease-in-out infinite;
        }

        .ocean-pulse {
          animation: oceanPulse 5s ease-in-out infinite;
        }

        .ocean-wave {
          animation: oceanWave 5s ease-in-out infinite;
        }

        .ocean-marquee {
          animation: oceanMarquee 22s linear infinite;
        }

        .ocean-image {
          transition:
            transform 900ms cubic-bezier(.22,1,.36,1),
            filter 500ms ease;
        }

        .ocean-image:hover {
          transform: scale(1.06);
          filter: saturate(1.08);
        }

        .ocean-card {
          transition:
            box-shadow 500ms ease,
            transform 500ms cubic-bezier(.22,1,.36,1);
        }

        .ocean-card:hover {
          box-shadow:
            0 25px 70px rgba(0, 0, 0, .15);
        }

        .ocean-button {
          transition:
            transform 300ms ease,
            box-shadow 300ms ease;
        }

        .ocean-button:hover {
          transform: translateY(-4px);
          box-shadow:
            0 15px 35px rgba(0, 0, 0, .18);
        }

        .ocean-tool {
          transition:
            transform 300ms ease,
            box-shadow 300ms ease;
        }

        .ocean-tool:hover {
          transform: translateY(-5px);
          box-shadow:
            0 15px 30px rgba(0, 0, 0, .12);
        }

        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
            scroll-behavior: auto !important;
          }
        }
      `}</style>

      {/* ===================================================
          SCROLL PROGRESS
      =================================================== */}

      <div
        className="fixed left-0 top-0 z-[999] h-1 origin-left bg-cyan-300"
        style={{
          width: "100%",
          transform: `scaleX(${scrollProgress})`,
        }}
      />

      {/* ===================================================
          CURSOR GLOW
      =================================================== */}

      <div
        className="pointer-events-none fixed z-[1] hidden h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-300/10 blur-3xl md:block"
        style={{
          left: cursor.x,
          top: cursor.y,
          transition:
            "left 120ms ease-out, top 120ms ease-out",
        }}
      />

      {/* ===================================================
          PAGE
      =================================================== */}

      <div
        style={{
          fontFamily:
            "Sora, system-ui, sans-serif",
        }}
        className="relative min-h-screen overflow-x-hidden bg-gradient-to-b from-[#0a2a6b] via-[#1340b0] to-[#0e5fd8] text-white"
      >
        {/* Ambient glow */}

        <div className="pointer-events-none fixed left-[5%] top-[15%] z-0 h-48 w-48 rounded-full bg-cyan-300/10 blur-3xl ocean-pulse" />

        <div
          className="pointer-events-none fixed bottom-[10%] right-[5%] z-0 h-56 w-56 rounded-full bg-blue-300/10 blur-3xl ocean-pulse"
          style={{
            animationDelay: "1.5s",
          }}
        />

        {/* =================================================
            HEADER
        ================================================= */}

        <Reveal
          direction="down"
          className="relative z-20"
        >
          <header className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5">
            <span className="font-bold">
              {p.name}
            </span>

            <a
              href="#contact"
              className="ocean-button rounded-full bg-white/15 px-4 py-1.5 text-sm"
            >
              Contact
            </a>
          </header>
        </Reveal>

        <main className="relative z-10 mx-auto max-w-6xl px-5">

          {/* =================================================
              1. HERO / PROFILE
          ================================================= */}

          <section className="grid items-center gap-10 py-12 md:grid-cols-2 md:py-20">
            <Reveal direction="left">
              <div>
                <p className="font-semibold text-cyan-300">
                  {p.role}
                </p>

                <h1 className="mt-3 break-words text-5xl font-extrabold leading-[1.05] sm:text-6xl">
                  <AnimatedTitle>
                    {p.name}
                  </AnimatedTitle>
                </h1>

                <p className="mt-6 max-w-md leading-relaxed text-blue-100">
                  {p.about}
                </p>

                <a
                  href="#work"
                  className="ocean-button mt-8 inline-block rounded-xl bg-cyan-300 px-6 py-3 font-semibold text-[#0a2a6b]"
                >
                  View projects
                </a>
              </div>
            </Reveal>

            <Reveal
              direction="right"
              delay={120}
            >
              <div className="relative">
                <div className="absolute -right-5 -top-5 h-28 w-28 rounded-full bg-cyan-300/20 blur-xl ocean-float" />

                <div className="overflow-hidden rounded-3xl">
                  <Img
                    src={hero}
                    alt="Featured work"
                    className="ocean-image aspect-[4/3] w-full rounded-3xl opacity-90 ring-1 ring-white/30"
                  />
                </div>

                <div className="absolute -bottom-6 -left-3 overflow-hidden rounded-full">
                  <Img
                    src={p.profileImage}
                    alt={`Portrait of ${p.name}`}
                    className="ocean-image h-28 w-28 rounded-full border-4 border-cyan-300 sm:h-36 sm:w-36"
                  />
                </div>
              </div>
            </Reveal>
          </section>

          {/* =================================================
              SKILLS MARQUEE
          ================================================= */}

          {p.skills?.length > 0 && (
            <Reveal direction="up">
              <div className="overflow-hidden pb-16">
                <div className="ocean-marquee flex w-max">
                  {[
                    ...p.skills,
                    ...p.skills,
                    ...p.skills,
                  ].map((skill, index) => (
                    <span
                      key={`${skill}-${index}`}
                      className="mx-3 rounded-full border border-cyan-300/60 px-4 py-1.5 text-sm text-cyan-100"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          )}

          {/* =================================================
              2. ABOUT ME
          ================================================= */}

          <Reveal direction="up">
            <section className="pb-20">
              <div className="ocean-card grid items-center gap-8 rounded-3xl bg-white/10 p-7 backdrop-blur-sm md:grid-cols-2 md:p-10">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-widest text-cyan-300">
                    About Me
                  </p>

                  <h2 className="mt-3 text-4xl font-extrabold">
                    <AnimatedTitle>
                      Who I am.
                    </AnimatedTitle>
                  </h2>

                  <p className="mt-5 leading-relaxed text-blue-100">
                    {p.about}
                  </p>

                  <p className="mt-4 text-sm text-blue-200">
                    {p.role}
                  </p>
                </div>

                <div className="overflow-hidden rounded-3xl">
                  <Img
                    src={p.profileImage}
                    alt={`Portrait of ${p.name}`}
                    className="ocean-image aspect-[4/3] w-full rounded-3xl"
                  />
                </div>
              </div>
            </section>
          </Reveal>

          {/* =================================================
              3. DESIGN PHILOSOPHY
          ================================================= */}

          {philosophy(p).length > 0 && (
            <section className="pb-20">
              <div className="grid items-center gap-6 md:grid-cols-2">
                <Reveal direction="left">
                  <div className="rounded-3xl bg-[#ff9f6b] p-8 text-[#3a1500] md:p-10">
                    <p className="text-sm font-semibold uppercase tracking-widest">
                      Design Philosophy
                    </p>

                    <h2 className="mt-3 text-4xl font-extrabold">
                      <AnimatedTitle>
                        How I think.
                      </AnimatedTitle>
                    </h2>

                    <div className="mt-7 space-y-4">
                      {philosophy(p).map(
                        (text, index) => (
                          <Reveal
                            key={text}
                            direction="up"
                            delay={index * 120}
                          >
                            <p className="rounded-2xl bg-white/40 p-5 text-xl font-bold leading-snug">
                              {text}
                            </p>
                          </Reveal>
                        )
                      )}
                    </div>
                  </div>
                </Reveal>

                <Reveal
                  direction="right"
                  delay={100}
                >
                  <Wipe
                    src={p.designPhilosophy?.image}
                    alt="Design philosophy"
                    className="aspect-[4/3] w-full rounded-3xl ring-1 ring-white/20"
                  />
                </Reveal>
              </div>
            </section>
          )}

          {/* =================================================
              4. CORE VALUES
          ================================================= */}

          <Reveal direction="up">
            <section className="pb-20">
              <p className="text-sm font-semibold uppercase tracking-widest text-cyan-300">
                Core Values
              </p>

              <h2 className="mt-3 text-4xl font-extrabold">
                <AnimatedTitle>
                  What I value.
                </AnimatedTitle>
              </h2>

              <div className="mt-8 grid gap-5 md:grid-cols-2">
                <Tilt>
                  <article className="ocean-card overflow-hidden rounded-3xl bg-white text-[#0a2a6b]">
                    <Wipe
                      src={p.coreValues?.image1}
                      alt="Core value one"
                      className="aspect-[4/3] w-full"
                    />

                    <div className="p-6">
                      <h3 className="text-2xl font-bold">
                        Purpose
                      </h3>

                      <p className="mt-2 text-sm text-slate-600">
                        Creating work with clarity, meaning, and purpose.
                      </p>
                    </div>
                  </article>
                </Tilt>

                <Tilt>
                  <article className="ocean-card overflow-hidden rounded-3xl bg-cyan-300 text-[#0a2a6b]">
                    <Wipe
                      src={p.coreValues?.image2}
                      alt="Core value two"
                      className="aspect-[4/3] w-full"
                    />

                    <div className="p-6">
                      <h3 className="text-2xl font-bold">
                        Craft
                      </h3>

                      <p className="mt-2 text-sm">
                        Attention to detail and meaningful experiences.
                      </p>
                    </div>
                  </article>
                </Tilt>
              </div>
            </section>
          </Reveal>

          {/* =================================================
              5. FROM THOUGHT TO FORM
          ================================================= */}

          <Reveal direction="zoom">
            <section className="pb-20">
              <div className="rounded-3xl bg-[#0a2a6b] p-8 md:p-12">
                <p className="text-sm font-semibold uppercase tracking-widest text-cyan-300">
                  From Thought to Form
                </p>

                <h2 className="mt-4 max-w-4xl text-4xl font-extrabold leading-tight sm:text-6xl">
                  <AnimatedTitle>
                    Turning ideas into meaningful digital experiences.
                  </AnimatedTitle>
                </h2>

                <p className="mt-6 max-w-2xl leading-relaxed text-blue-200">
                  I transform ideas into thoughtful experiences through
                  creativity, structure, technology, and visual storytelling.
                </p>
              </div>
            </section>
          </Reveal>

          {/* =================================================
              6. FEATURED PROJECTS
          ================================================= */}

          {p.projects?.length > 0 && (
            <section id="work" className="pb-20">
              <Reveal direction="up">
                <p className="text-sm font-semibold uppercase tracking-widest text-cyan-300">
                  Featured Projects
                </p>

                <h2 className="mb-8 mt-2 text-3xl font-bold">
                  <AnimatedTitle>
                    Featured work
                  </AnimatedTitle>
                </h2>
              </Reveal>

              <div className="grid auto-rows-fr gap-5 md:grid-cols-3">
                {p.projects.map((pr, i) => (
                  <Reveal
                    key={i}
                    direction={i === 0 ? "left" : "up"}
                    delay={i * 100}
                    className={
                      i === 0
                        ? "md:col-span-2 md:row-span-2"
                        : ""
                    }
                  >
                    <Tilt className="h-full">
                      <article className="ocean-card group h-full overflow-hidden rounded-3xl bg-white text-[#0a2a6b]">
                        <div className="overflow-hidden">
                          <Img
                            src={pr.image}
                            alt={pr.title}
                            className={`ocean-image w-full ${
                              i === 0
                                ? "aspect-[16/10]"
                                : "aspect-[16/9]"
                            }`}
                          />
                        </div>

                        <div className="p-5">
                          <p className="text-xs font-semibold text-blue-500">
                            Project {i + 1}
                          </p>

                          <h3 className="text-lg font-bold">
                            {pr.title}
                          </h3>

                          <p className="mt-1 text-sm text-slate-600">
                            {pr.description}
                          </p>
                        </div>
                      </article>
                    </Tilt>
                  </Reveal>
                ))}
              </div>
            </section>
          )}

          {/* =================================================
              7. CASE STUDY
          ================================================= */}

          {p.caseStudy?.title && (
            <section className="pb-20">
              <div className="grid items-center gap-5 md:grid-cols-2">
                <Reveal direction="left">
                  <div className="ocean-card rounded-3xl bg-cyan-300 p-8 text-[#0a2a6b] md:p-10">
                    <p className="text-sm font-semibold uppercase tracking-widest">
                      Case Study
                    </p>

                    <h2 className="mt-2 text-3xl font-extrabold">
                      <AnimatedTitle>
                        {p.caseStudy.title}
                      </AnimatedTitle>
                    </h2>

                    <p className="mt-4 leading-relaxed">
                      {p.caseStudy.description}
                    </p>
                  </div>
                </Reveal>

                <Reveal
                  direction="right"
                  delay={100}
                >
                  <Wipe
                    src={p.caseStudy.image}
                    alt={p.caseStudy.title}
                    className="aspect-[16/10] w-full rounded-3xl"
                  />
                </Reveal>
              </div>
            </section>
          )}

          {/* =================================================
              8. CREATIVE TOOLS
          ================================================= */}

          <Reveal direction="up">
            <section className="pb-20">
              <p className="text-sm font-semibold uppercase tracking-widest text-cyan-300">
                Creative Tools
              </p>

              <h2 className="mt-2 text-4xl font-extrabold">
                <AnimatedTitle>
                  Tools I work with.
                </AnimatedTitle>
              </h2>

              <div className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-4">
                {(p.skills || [
                  "JavaScript",
                  "React",
                  "Node.js",
                  "MongoDB",
                ]).map((tool, i) => (
                  <Reveal
                    key={tool}
                    direction="zoom"
                    delay={i * 80}
                  >
                    <Tilt>
                      <div
                        className={`ocean-tool rounded-2xl p-6 font-bold ${
                          [
                            "bg-cyan-300 text-[#0a2a6b]",
                            "bg-white text-[#0a2a6b]",
                            "bg-[#ff9f6b] text-[#3a1500]",
                            "bg-[#0a2a6b]",
                          ][i % 4]
                        }`}
                      >
                        {tool}
                      </div>
                    </Tilt>
                  </Reveal>
                ))}
              </div>
            </section>
          </Reveal>

          {/* =================================================
              9. PERSONAL AESTHETIC
          ================================================= */}

          {p.personalAesthetic?.image && (
            <section className="pb-20">
              <div className="grid items-center gap-6 md:grid-cols-2">
                <Reveal direction="left">
                  <Wipe
                    src={p.personalAesthetic.image}
                    alt="Personal aesthetic"
                    className="aspect-[4/3] w-full rounded-3xl"
                  />
                </Reveal>

                <Reveal
                  direction="right"
                  delay={100}
                >
                  <div className="rounded-3xl bg-[#ff9f6b] p-8 text-[#3a1500] md:p-10">
                    <p className="text-sm font-semibold uppercase tracking-widest">
                      Personal Aesthetic
                    </p>

                    <h2 className="mt-3 text-4xl font-extrabold">
                      <AnimatedTitle>
                        My visual language.
                      </AnimatedTitle>
                    </h2>

                    <p className="mt-5 leading-relaxed">
                      My personal aesthetic combines simplicity,
                      personality, creativity, and thoughtful visual choices.
                    </p>
                  </div>
                </Reveal>
              </div>
            </section>
          )}
        </main>

        {/* =================================================
            10. CONTACT
        ================================================= */}

        <Reveal direction="zoom">
          <footer
            id="contact"
            className="border-t border-white/20 px-5 py-14 text-center"
          >
            <p className="text-sm font-semibold uppercase tracking-widest text-cyan-300">
              Contact &amp; Social Links
            </p>

            <h2 className="mt-3 text-4xl font-extrabold sm:text-6xl">
              <AnimatedTitle>
                Let's work together.
              </AnimatedTitle>
            </h2>

            {p.email && (
              <p className="mt-4 text-blue-100">
                {p.email}
              </p>
            )}

            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Links
                portfolio={p}
                className="ocean-button rounded-full bg-white/15 px-5 py-2 text-sm"
              />
            </div>
          </footer>
        </Reveal>

        {/* =================================================
            11. THANK YOU
        ================================================= */}

        <Reveal direction="up">
          <section className="bg-[#0a2a6b] px-5 py-20 text-center">
            <h2 className="text-5xl font-extrabold sm:text-7xl">
              <AnimatedTitle>
                Thank you.
              </AnimatedTitle>
            </h2>

            <p className="mt-4 text-blue-200">
              Thanks for taking the time to explore my portfolio.
            </p>
          </section>
        </Reveal>
      </div>
    </>
  );
}

export default OceanBlueTemplate;