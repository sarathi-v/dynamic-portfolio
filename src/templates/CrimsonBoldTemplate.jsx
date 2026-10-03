import { useEffect, useRef, useState } from "react";
import { Img, Links, philosophy, gallery } from "./sharedColorful";

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
   REVEAL
========================================================= */

function Reveal({
  children,
  className = "",
  direction = "up",
  delay = 0,
}) {
  const [ref, visible] = useInView(0.12);

  const transforms = {
    up: "translateY(50px)",
    down: "translateY(-45px)",
    left: "translateX(-50px)",
    right: "translateX(50px)",
    zoom: "scale(0.9)",
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
   WORD TITLE
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
          className="mr-[0.25em] inline-block overflow-hidden"
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
        className="pointer-events-none absolute inset-0 bg-[#fff1e6]"
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
   MAIN TEMPLATE
========================================================= */

function CrimsonBoldTemplate({ portfolio: p }) {
  const g = gallery(p);

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
        @keyframes crimsonFloat {
          0%, 100% {
            transform: translateY(0);
          }

          50% {
            transform: translateY(-16px);
          }
        }

        @keyframes crimsonPulse {
          0%, 100% {
            opacity: .18;
            transform: scale(1);
          }

          50% {
            opacity: .32;
            transform: scale(1.08);
          }
        }

        @keyframes crimsonMarquee {
          from {
            transform: translateX(0);
          }

          to {
            transform: translateX(-50%);
          }
        }

        .crimson-float {
          animation: crimsonFloat 6s ease-in-out infinite;
        }

        .crimson-pulse {
          animation: crimsonPulse 5s ease-in-out infinite;
        }

        .crimson-marquee {
          animation: crimsonMarquee 22s linear infinite;
        }

        .crimson-image {
          transition:
            transform 900ms cubic-bezier(.22,1,.36,1),
            filter 500ms ease;
        }

        .crimson-image:hover {
          transform: scale(1.06);
          filter: saturate(1.12);
        }

        .crimson-project {
          transition:
            box-shadow 500ms ease,
            transform 500ms cubic-bezier(.22,1,.36,1);
        }

        .crimson-project:hover {
          box-shadow:
            0 25px 60px rgba(42, 10, 18, .16);
        }

        .crimson-tool {
          transition:
            transform 300ms ease,
            box-shadow 300ms ease;
        }

        .crimson-tool:hover {
          transform: translateY(-5px);
          box-shadow:
            0 15px 35px rgba(42, 10, 18, .15);
        }

        .crimson-button {
          transition:
            transform 300ms ease,
            box-shadow 300ms ease;
        }

        .crimson-button:hover {
          transform: translateY(-4px);
          box-shadow:
            0 15px 30px rgba(42, 10, 18, .2);
        }

        .crimson-line {
          transition:
            padding-left 400ms ease,
            color 400ms ease;
        }

        .crimson-line:hover {
          padding-left: 12px;
          color: #ffb703;
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
        className="fixed left-0 top-0 z-[999] h-1 origin-left bg-[#ffb703]"
        style={{
          width: "100%",
          transform: `scaleX(${scrollProgress})`,
        }}
      />

      {/* ===================================================
          CURSOR GLOW
      =================================================== */}

      <div
        className="pointer-events-none fixed z-[1] hidden h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ffb703]/10 blur-3xl md:block"
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
            "Poppins, system-ui, sans-serif",
        }}
        className="relative min-h-screen overflow-x-hidden bg-[#fff1e6] text-[#2a0a12]"
      >
        {/* Ambient decoration */}

        <div className="pointer-events-none fixed left-[4%] top-[20%] z-0 h-40 w-40 rounded-full bg-[#c8102e]/10 blur-3xl crimson-pulse" />

        <div
          className="pointer-events-none fixed bottom-[12%] right-[5%] z-0 h-48 w-48 rounded-full bg-[#ffb703]/15 blur-3xl crimson-pulse"
          style={{
            animationDelay: "1.5s",
          }}
        />

        {/* =================================================
            1. HERO / PROFILE
        ================================================= */}

        <section className="relative overflow-hidden bg-[#c8102e] text-[#fff1e6]">
          <p
            aria-hidden="true"
            style={{
              fontFamily:
                "'Bebas Neue', Impact, sans-serif",
            }}
            className="pointer-events-none absolute inset-x-0 top-6 select-none text-center text-[32vw] leading-none text-[#a50d26]"
          >
            PORTFOLIO
          </p>

          <div className="relative mx-auto grid max-w-6xl items-end gap-4 px-5 pt-10 md:grid-cols-2">
            <Reveal
              direction="left"
              className="pb-10 md:pb-16"
            >
              <p className="text-sm font-medium">
                {p.role}
              </p>

              <h1
                style={{
                  fontFamily:
                    "'Bebas Neue', Impact, sans-serif",
                }}
                className="mt-2 break-words text-7xl leading-[0.9] sm:text-8xl lg:text-9xl"
              >
                <AnimatedTitle>
                  {p.name}
                </AnimatedTitle>
              </h1>

              <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/85">
                {p.about}
              </p>
            </Reveal>

            <Reveal
              direction="right"
              delay={150}
            >
              <div className="overflow-hidden">
                <Img
                  src={p.profileImage}
                  alt={`Portrait of ${p.name}`}
                  className="crimson-image mx-auto aspect-[4/5] w-full max-w-md object-top"
                />
              </div>
            </Reveal>
          </div>
        </section>

        {/* =================================================
            SKILLS
        ================================================= */}

        {p.skills?.length > 0 && (
          <Reveal direction="up">
            <div className="overflow-hidden bg-[#fff1e6] py-8">
              <div className="crimson-marquee flex w-max">
                {[
                  ...p.skills,
                  ...p.skills,
                  ...p.skills,
                ].map((skill, index) => (
                  <span
                    key={`${skill}-${index}`}
                    className="mx-2 rounded border border-[#c8102e] px-3 py-1 text-sm font-medium text-[#c8102e]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        )}

        <main className="relative z-10">

          {/* =================================================
              2. ABOUT ME
          ================================================= */}

          <Reveal
            direction="up"
            className="mx-auto max-w-6xl px-5 py-16"
          >
            <section className="grid items-center gap-10 md:grid-cols-2">
              <div>
                <p className="text-sm font-semibold uppercase tracking-widest text-[#c8102e]">
                  About Me
                </p>

                <h2
                  style={{
                    fontFamily:
                      "'Bebas Neue', Impact, sans-serif",
                  }}
                  className="mt-2 text-6xl leading-none"
                >
                  <AnimatedTitle>
                    WHO I AM
                  </AnimatedTitle>
                </h2>

                <p className="mt-6 max-w-xl leading-relaxed text-[#2a0a12]/75">
                  {p.about}
                </p>
              </div>

              <div className="overflow-hidden">
                <Img
                  src={p.profileImage}
                  alt={`Portrait of ${p.name}`}
                  className="crimson-image aspect-[4/3] w-full object-cover"
                />
              </div>
            </section>
          </Reveal>

          {/* =================================================
              3. DESIGN PHILOSOPHY
          ================================================= */}

          {philosophy(p).length > 0 && (
            <section className="bg-[#2a0a12] text-[#fff1e6]">
              <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-20 md:grid-cols-2">
                <Reveal direction="left">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-widest text-[#ffb703]">
                      Design Philosophy
                    </p>

                    <h2
                      style={{
                        fontFamily:
                          "'Bebas Neue', Impact, sans-serif",
                      }}
                      className="mt-2 text-6xl leading-none"
                    >
                      <AnimatedTitle>
                        HOW I THINK
                      </AnimatedTitle>
                    </h2>

                    <div className="mt-8">
                      {philosophy(p).map(
                        (text, i) => (
                          <Reveal
                            key={text}
                            direction="left"
                            delay={i * 120}
                          >
                            <p
                              className={`crimson-line mb-4 border-l-4 border-[#ffb703] pl-5 text-2xl font-semibold leading-snug ${
                                i % 2
                                  ? "text-white/80"
                                  : ""
                              }`}
                            >
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
                    className="aspect-[4/3] w-full object-cover"
                  />
                </Reveal>
              </div>
            </section>
          )}

          {/* =================================================
              4. CORE VALUES
          ================================================= */}

          <Reveal
            direction="up"
            className="mx-auto max-w-6xl px-5 py-16"
          >
            <section>
              <p className="text-sm font-semibold uppercase tracking-widest text-[#c8102e]">
                Core Values
              </p>

              <h2
                style={{
                  fontFamily:
                    "'Bebas Neue', Impact, sans-serif",
                }}
                className="mt-2 text-6xl leading-none"
              >
                <AnimatedTitle>
                  WHAT I VALUE
                </AnimatedTitle>
              </h2>

              <div className="mt-10 grid gap-6 md:grid-cols-2">
                <Tilt>
                  <article className="crimson-project overflow-hidden border-2 border-[#2a0a12] bg-white">
                    <Wipe
                      src={p.coreValues?.image1}
                      alt="Core value one"
                      className="aspect-[4/3] w-full object-cover"
                    />

                    <div className="border-t-2 border-[#2a0a12] p-6">
                      <h3
                        style={{
                          fontFamily:
                            "'Bebas Neue', Impact, sans-serif",
                        }}
                        className="text-4xl"
                      >
                        PURPOSE
                      </h3>

                      <p className="mt-2 text-sm text-[#2a0a12]/70">
                        Creating work with clarity, meaning, and purpose.
                      </p>
                    </div>
                  </article>
                </Tilt>

                <Tilt>
                  <article className="crimson-project overflow-hidden border-2 border-[#2a0a12] bg-[#ffb703]">
                    <Wipe
                      src={p.coreValues?.image2}
                      alt="Core value two"
                      className="aspect-[4/3] w-full object-cover"
                    />

                    <div className="border-t-2 border-[#2a0a12] p-6">
                      <h3
                        style={{
                          fontFamily:
                            "'Bebas Neue', Impact, sans-serif",
                        }}
                        className="text-4xl"
                      >
                        CRAFT
                      </h3>

                      <p className="mt-2 text-sm">
                        Paying attention to the details that shape great experiences.
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
            <section className="bg-[#ffb703]">
              <div className="mx-auto max-w-6xl px-5 py-20">
                <p className="text-sm font-semibold uppercase tracking-widest">
                  From Thought to Form
                </p>

                <h2
                  style={{
                    fontFamily:
                      "'Bebas Neue', Impact, sans-serif",
                  }}
                  className="mt-4 max-w-5xl text-7xl leading-[0.9] sm:text-8xl"
                >
                  <AnimatedTitle>
                    IDEAS INTO FORM.
                  </AnimatedTitle>
                </h2>

                <p className="mt-8 max-w-2xl leading-relaxed">
                  I transform ideas into meaningful digital experiences through
                  creativity, structure, technology, and visual storytelling.
                </p>
              </div>
            </section>
          </Reveal>

          {/* =================================================
              6. FEATURED PROJECTS
          ================================================= */}

          {p.projects?.length > 0 && (
            <Reveal
              direction="up"
              className="mx-auto max-w-6xl px-5 py-16"
            >
              <section>
                <p className="text-sm font-semibold uppercase tracking-widest text-[#c8102e]">
                  Featured Projects
                </p>

                <h2
                  style={{
                    fontFamily:
                      "'Bebas Neue', Impact, sans-serif",
                  }}
                  className="mb-6 mt-2 text-6xl leading-none"
                >
                  <AnimatedTitle>
                    SELECTED PROJECTS
                  </AnimatedTitle>
                </h2>

                <ol>
                  {p.projects.map((pr, i) => (
                    <Reveal
                      key={i}
                      direction="right"
                      delay={i * 100}
                    >
                      <Tilt>
                        <li className="group grid items-center gap-4 border-t-2 border-[#2a0a12] py-6 sm:grid-cols-[4rem_1fr_16rem]">
                          <span
                            style={{
                              fontFamily:
                                "'Bebas Neue', Impact, sans-serif",
                            }}
                            className="text-5xl text-[#c8102e]"
                          >
                            {String(i + 1).padStart(2, "0")}
                          </span>

                          <div>
                            <h3 className="text-2xl font-bold">
                              {pr.title}
                            </h3>

                            <p className="mt-1 text-sm text-[#2a0a12]/70">
                              {pr.description}
                            </p>
                          </div>

                          <div className="overflow-hidden">
                            <Img
                              src={pr.image}
                              alt={pr.title}
                              className="crimson-image aspect-[16/10] w-full"
                            />
                          </div>
                        </li>
                      </Tilt>
                    </Reveal>
                  ))}
                </ol>
              </section>
            </Reveal>
          )}

          {/* =================================================
              7. CASE STUDY
          ================================================= */}

          {p.caseStudy?.title && (
            <section className="grid md:grid-cols-2">
              <Reveal
                direction="left"
                className="bg-[#ffb703] p-8 sm:p-14"
              >
                <p className="text-sm font-semibold uppercase tracking-widest">
                  Case Study
                </p>

                <h2
                  style={{
                    fontFamily:
                      "'Bebas Neue', Impact, sans-serif",
                  }}
                  className="mt-2 text-6xl"
                >
                  <AnimatedTitle>
                    {p.caseStudy.title}
                  </AnimatedTitle>
                </h2>

                <p className="mt-5 max-w-md leading-relaxed">
                  {p.caseStudy.description}
                </p>
              </Reveal>

              <Reveal
                direction="right"
                className="bg-[#c8102e] p-8 sm:p-14"
              >
                <Wipe
                  src={p.caseStudy.image}
                  alt={p.caseStudy.title}
                  className="aspect-[4/3] w-full object-cover"
                />
              </Reveal>
            </section>
          )}

          {/* =================================================
              8. CREATIVE TOOLS
          ================================================= */}

          <Reveal
            direction="up"
            className="mx-auto max-w-6xl px-5 py-16"
          >
            <section>
              <p className="text-sm font-semibold uppercase tracking-widest text-[#c8102e]">
                Creative Tools
              </p>

              <h2
                style={{
                  fontFamily:
                    "'Bebas Neue', Impact, sans-serif",
                }}
                className="mt-2 text-6xl leading-none"
              >
                <AnimatedTitle>
                  TOOLS I USE
                </AnimatedTitle>
              </h2>

              <div className="mt-10 grid gap-4 sm:grid-cols-2 md:grid-cols-4">
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
                        className={`crimson-tool border-2 border-[#2a0a12] p-6 ${
                          [
                            "bg-[#ffb703]",
                            "bg-[#c8102e] text-white",
                            "bg-white",
                            "bg-[#2a0a12] text-white",
                          ][i % 4]
                        }`}
                      >
                        <p className="font-bold">
                          {tool}
                        </p>
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
            <section className="bg-[#c8102e] text-[#fff1e6]">
              <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-20 md:grid-cols-2">
                <Reveal direction="left">
                  <Wipe
                    src={p.personalAesthetic.image}
                    alt="Personal aesthetic"
                    className="aspect-[4/3] w-full object-cover"
                  />
                </Reveal>

                <Reveal
                  direction="right"
                  delay={100}
                >
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-widest text-[#ffb703]">
                      Personal Aesthetic
                    </p>

                    <h2
                      style={{
                        fontFamily:
                          "'Bebas Neue', Impact, sans-serif",
                      }}
                      className="mt-3 text-6xl leading-none"
                    >
                      <AnimatedTitle>
                        MY VISUAL LANGUAGE
                      </AnimatedTitle>
                    </h2>

                    <p className="mt-6 max-w-lg leading-relaxed text-white/80">
                      My personal aesthetic combines personality, simplicity,
                      creativity, and bold visual choices.
                    </p>
                  </div>
                </Reveal>
              </div>
            </section>
          )}

          {/* =================================================
              GALLERY
          ================================================= */}

          {g.length > 0 && (
            <Reveal
              direction="up"
              className="mx-auto grid max-w-6xl grid-cols-2 gap-4 px-5 py-16 md:grid-cols-4"
            >
              {g.map((src, i) => (
                <Reveal
                  key={i}
                  direction="zoom"
                  delay={i * 80}
                >
                  <div
                    className={`overflow-hidden ${
                      i % 2 ? "md:mt-10" : ""
                    }`}
                  >
                    <Img
                      src={src}
                      alt={`Gallery image ${i + 1}`}
                      className="crimson-image aspect-[3/4] w-full object-cover"
                    />
                  </div>
                </Reveal>
              ))}
            </Reveal>
          )}
        </main>

        {/* =================================================
            10. CONTACT
        ================================================= */}

        <Reveal direction="zoom">
          <footer
            id="contact"
            className="bg-[#c8102e] px-5 py-14 text-[#fff1e6]"
          >
            <div className="mx-auto max-w-6xl">
              <p className="text-sm font-semibold uppercase tracking-widest text-[#ffb703]">
                Contact &amp; Social Links
              </p>

              <h2
                style={{
                  fontFamily:
                    "'Bebas Neue', Impact, sans-serif",
                }}
                className="mt-2 text-6xl sm:text-8xl"
              >
                <AnimatedTitle>
                  LET'S WORK TOGETHER
                </AnimatedTitle>
              </h2>

              {p.email && (
                <p className="mt-5 text-sm text-white/80">
                  {p.email}
                </p>
              )}

              <div className="mt-6 flex flex-wrap gap-5 text-sm font-semibold underline underline-offset-4">
                <Links
                  portfolio={p}
                  className="transition hover:text-[#ffb703]"
                />
              </div>
            </div>
          </footer>
        </Reveal>

        {/* =================================================
            11. THANK YOU
        ================================================= */}

        <Reveal direction="up">
          <section className="bg-[#fff1e6] px-5 py-20 text-center">
            <h2
              style={{
                fontFamily:
                  "'Bebas Neue', Impact, sans-serif",
              }}
              className="text-7xl leading-none text-[#c8102e] sm:text-9xl"
            >
              <AnimatedTitle>
                THANK YOU.
              </AnimatedTitle>
            </h2>

            <p className="mt-5 text-sm text-[#2a0a12]/60">
              Thanks for taking the time to explore my portfolio.
            </p>
          </section>
        </Reveal>
      </div>
    </>
  );
}

export default CrimsonBoldTemplate; 