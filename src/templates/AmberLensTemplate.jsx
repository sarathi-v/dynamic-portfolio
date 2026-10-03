import { useEffect, useRef, useState } from "react";
import {
  Img,
  Links,
  philosophy,
  gallery,
  pick,
} from "./sharedColorful";

/* =========================================================
   ANIMATION HELPERS
========================================================= */

const useInView = (threshold = 0.15) => {
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
};

const Reveal = ({
  children,
  direction = "up",
  delay = 0,
  className = "",
}) => {
  const [ref, visible] = useInView();

  const transforms = {
    up: "translateY(55px)",
    down: "translateY(-55px)",
    left: "translateX(-55px)",
    right: "translateX(55px)",
    zoom: "scale(.88)",
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible
          ? "translate(0) scale(1)"
          : transforms[direction],
        transition: `opacity 800ms ease ${delay}ms,
          transform 900ms cubic-bezier(.2,.8,.2,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
};

const AnimatedTitle = ({
  children,
  className = "",
  delay = 0,
}) => {
  const [ref, visible] = useInView();

  const words = String(children).split(" ");

  return (
    <h2 ref={ref} className={className}>
      {words.map((word, index) => (
        <span
          key={`${word}-${index}`}
          className="mr-[0.22em] inline-block overflow-hidden align-bottom"
        >
          <span
            className="inline-block"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible
                ? "translateY(0)"
                : "translateY(110%)",
              transition:
                "opacity 650ms ease, transform 750ms cubic-bezier(.2,.8,.2,1)",
              transitionDelay: `${delay + index * 70}ms`,
            }}
          >
            {word}
          </span>
        </span>
      ))}
    </h2>
  );
};

const Wipe = ({
  children,
  delay = 0,
  className = "",
}) => {
  const [ref, visible] = useInView();

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden ${className}`}
    >
      <div
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "scale(1)" : "scale(1.08)",
          transition: `opacity 900ms ease ${delay}ms,
            transform 1100ms cubic-bezier(.2,.8,.2,1) ${delay}ms`,
        }}
      >
        {children}
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[#f4b183]"
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
};

const Tilt = ({
  children,
  className = "",
}) => {
  const ref = useRef(null);

  const handleMove = (event) => {
    const node = ref.current;
    if (!node) return;

    const rect = node.getBoundingClientRect();

    const x =
      (event.clientX - rect.left) / rect.width - 0.5;

    const y =
      (event.clientY - rect.top) / rect.height - 0.5;

    node.style.transform = `
      perspective(900px)
      rotateX(${y * -6}deg)
      rotateY(${x * 6}deg)
      translateY(-5px)
    `;
  };

  const handleLeave = () => {
    const node = ref.current;
    if (!node) return;

    node.style.transform =
      "perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0)";
  };

  return (
    <div
      ref={ref}
      className={className}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{
        transition:
          "transform 450ms cubic-bezier(.2,.8,.2,1)",
      }}
    >
      {children}
    </div>
  );
};

/* =========================================================
   MAIN TEMPLATE
========================================================= */

function AmberLensTemplate({ portfolio: p }) {
  const hero = pick(
    p.designPhilosophy?.image,
    p.caseStudy?.image,
    p.profileImage
  );

  const g = gallery(p);

  const [scrollProgress, setScrollProgress] = useState(0);
  const [cursor, setCursor] = useState({
    x: -100,
    y: -100,
  });

  /* =====================================================
     SCROLL PROGRESS
  ===================================================== */

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;

      const height =
        document.documentElement.scrollHeight -
        window.innerHeight;

      setScrollProgress(
        height > 0 ? scrollTop / height : 0
      );
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    handleScroll();

    return () =>
      window.removeEventListener(
        "scroll",
        handleScroll
      );
  }, []);

  /* =====================================================
     CURSOR
  ===================================================== */

  useEffect(() => {
    const handleMove = (event) => {
      setCursor({
        x: event.clientX,
        y: event.clientY,
      });
    };

    window.addEventListener(
      "pointermove",
      handleMove
    );

    return () =>
      window.removeEventListener(
        "pointermove",
        handleMove
      );
  }, []);

  return (
    <div
      style={{
        fontFamily: "Poppins, system-ui, sans-serif",
      }}
      className="amber-lens min-h-screen overflow-x-hidden bg-[#fbf3e4] text-[#3a2410]"
    >
      {/* =====================================================
          ANIMATION CSS
      ===================================================== */}

      <style>{`
        @keyframes amberFloat {
          0%, 100% {
            transform: translate3d(0, 0, 0);
          }

          50% {
            transform: translate3d(0, -20px, 0);
          }
        }

        @keyframes amberPulse {
          0%, 100% {
            opacity: .12;
            transform: scale(1);
          }

          50% {
            opacity: .28;
            transform: scale(1.1);
          }
        }

        @keyframes amberMarquee {
          from {
            transform: translateX(0);
          }

          to {
            transform: translateX(-50%);
          }
        }

        .amber-image {
          transition:
            transform 700ms cubic-bezier(.2,.8,.2,1),
            filter 500ms ease;
        }

        .amber-image:hover {
          transform: scale(1.045);
          filter: saturate(1.08);
        }

        .amber-card {
          transition:
            box-shadow 450ms ease,
            transform 450ms cubic-bezier(.2,.8,.2,1);
        }

        .amber-card:hover {
          box-shadow:
            0 25px 60px rgba(58,36,16,.18);
        }

        .amber-button {
          transition:
            transform 300ms ease,
            background-color 300ms ease,
            box-shadow 300ms ease;
        }

        .amber-button:hover {
          transform: translateY(-3px);
          box-shadow:
            0 12px 25px rgba(244,177,131,.3);
        }

        .amber-tool {
          transition:
            transform 350ms ease,
            box-shadow 350ms ease;
        }

        .amber-tool:hover {
          transform: translateY(-7px);
          box-shadow:
            0 18px 35px rgba(58,36,16,.16);
        }

        .amber-project {
          transition:
            transform 450ms cubic-bezier(.2,.8,.2,1),
            box-shadow 450ms ease;
        }

        .amber-project:hover {
          box-shadow:
            0 25px 55px rgba(58,36,16,.25);
        }

        .amber-link {
          position: relative;
        }

        .amber-link::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: -3px;
          height: 1px;
          width: 100%;
          background: #f4b183;
          transform: scaleX(0);
          transform-origin: right;
          transition: transform 350ms ease;
        }

        .amber-link:hover::after {
          transform: scaleX(1);
          transform-origin: left;
        }

        .amber-shine {
          position: relative;
          overflow: hidden;
        }

        .amber-shine::after {
          content: "";
          position: absolute;
          inset: 0;
          width: 40%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255,255,255,.2),
            transparent
          );
          transform: translateX(-160%);
          transition: transform 900ms ease;
        }

        .amber-shine:hover::after {
          transform: translateX(300%);
        }

        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: .01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: .01ms !important;
            scroll-behavior: auto !important;
          }
        }
      `}</style>

      {/* =====================================================
          SCROLL PROGRESS
      ===================================================== */}

      <div
        className="fixed left-0 top-0 z-[9999] h-1 bg-[#f4b183]"
        style={{
          width: `${scrollProgress * 100}%`,
          boxShadow:
            "0 0 14px rgba(244,177,131,.8)",
        }}
      />

      {/* =====================================================
          CURSOR GLOW
      ===================================================== */}

      <div
        aria-hidden="true"
        className="pointer-events-none fixed z-[9998] hidden h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#f4b183]/10 blur-3xl md:block"
        style={{
          left: cursor.x,
          top: cursor.y,
        }}
      />

      {/* =====================================================
          AMBIENT LIGHTS
      ===================================================== */}

      <div
        aria-hidden="true"
        className="pointer-events-none fixed left-[5%] top-[18%] z-0 h-32 w-32 rounded-full bg-[#d97706]/10 blur-3xl"
        style={{
          animation:
            "amberFloat 7s ease-in-out infinite",
        }}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none fixed right-[5%] top-[58%] z-0 h-48 w-48 rounded-full bg-[#f4b183]/20 blur-3xl"
        style={{
          animation:
            "amberPulse 8s ease-in-out infinite",
        }}
      />

      {/* =====================================================
          1. HERO / PROFILE
      ===================================================== */}

      <section className="relative isolate flex min-h-[85vh] items-end overflow-hidden bg-[#3a2410] text-white">
        <Img
          src={hero}
          alt="Hero visual"
          className="amber-image absolute inset-0 -z-10 h-full w-full opacity-60"
        />

        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#3a2410] via-[#3a2410]/30 to-transparent" />

        <Reveal
          direction="down"
          delay={100}
          className="absolute inset-x-0 top-0"
        >
          <header className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5">
            <span className="font-semibold">
              {p.name}
            </span>

            <a
              href="#contact"
              className="amber-button rounded bg-[#f4b183] px-4 py-2 text-sm font-semibold text-[#3a2410] hover:bg-white"
            >
              Contact
            </a>
          </header>
        </Reveal>

        <div className="mx-auto w-full max-w-6xl px-5 pb-14">
          <Reveal direction="left" delay={250}>
            <p className="text-sm text-[#f4b183]">
              {p.role}
            </p>
          </Reveal>

          <AnimatedTitle
            className="mt-2 break-words text-5xl leading-tight sm:text-7xl"
            delay={350}
          >
            {p.name}
          </AnimatedTitle>

          <Reveal direction="up" delay={550}>
            <p className="mt-4 max-w-lg text-white/85">
              {p.about}
            </p>
          </Reveal>
        </div>
      </section>

      {/* =====================================================
          SKILLS
      ===================================================== */}

      {p.skills?.length > 0 && (
        <Reveal direction="up" delay={100}>
          <ul className="mx-auto -mt-6 grid max-w-5xl grid-cols-2 gap-px overflow-hidden rounded-xl bg-[#d97706] shadow-lg sm:grid-cols-4">
            {p.skills.map((s, i) => (
              <li
                key={s}
                className="amber-shine bg-[#3a2410] px-4 py-5 text-center text-sm font-medium text-[#f4b183] transition-colors duration-300 hover:bg-[#4b2c13]"
                style={{
                  transitionDelay: `${i * 50}ms`,
                }}
              >
                {s}
              </li>
            ))}
          </ul>
        </Reveal>
      )}

      <main>
        {/* =====================================================
            2. ABOUT ME
        ===================================================== */}

        <section className="mx-auto max-w-6xl px-5 py-20">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <Reveal direction="left">
              <div>
                <p className="text-sm font-semibold uppercase tracking-widest text-[#d97706]">
                  About Me
                </p>

                <AnimatedTitle
                  className="mt-3 text-5xl leading-tight"
                  delay={100}
                >
                  A little about me.
                </AnimatedTitle>

                <p className="mt-6 leading-relaxed text-[#3a2410]/75">
                  {p.about}
                </p>
              </div>
            </Reveal>

            <Wipe delay={200}>
              <Img
                src={p.profileImage}
                alt={`Portrait of ${p.name}`}
                className="amber-image aspect-[4/3] w-full rounded-xl"
              />
            </Wipe>
          </div>
        </section>

        {/* =====================================================
            3. DESIGN PHILOSOPHY
        ===================================================== */}

        {philosophy(p).length > 0 && (
          <section className="bg-[#f4b183]">
            <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-20 md:grid-cols-2">
              <div>
                <Reveal direction="left">
                  <p className="text-sm font-semibold uppercase tracking-widest">
                    Design Philosophy
                  </p>
                </Reveal>

                <AnimatedTitle
                  className="mt-3 text-5xl leading-tight"
                  delay={100}
                >
                  How I think and create.
                </AnimatedTitle>

                <div className="mt-8 space-y-5">
                  {philosophy(p).map((text, i) => (
                    <Reveal
                      key={text}
                      direction={
                        i % 2 === 0
                          ? "left"
                          : "right"
                      }
                      delay={150 + i * 120}
                    >
                      <p
                        style={{
                          fontFamily:
                            "Fraunces, Georgia, serif",
                        }}
                        className="amber-shine rounded-lg p-2 text-2xl leading-snug transition-transform duration-300 hover:translate-x-2 sm:text-3xl"
                      >
                        {text}
                      </p>
                    </Reveal>
                  ))}
                </div>
              </div>

              <Wipe delay={300}>
                <Img
                  src={p.designPhilosophy?.image}
                  alt="Design philosophy"
                  className="amber-image aspect-[4/3] w-full rounded-xl"
                />
              </Wipe>
            </div>
          </section>
        )}

        {/* =====================================================
            4. CORE VALUES
        ===================================================== */}

        <section className="mx-auto max-w-6xl px-5 py-20">
          <Reveal direction="left">
            <p className="text-sm font-semibold uppercase tracking-widest text-[#d97706]">
              Core Values
            </p>
          </Reveal>

          <AnimatedTitle
            className="mt-3 text-5xl"
            delay={100}
          >
            What matters to me.
          </AnimatedTitle>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <Reveal direction="left">
              <Tilt className="amber-card overflow-hidden rounded-xl bg-white">
                <Wipe>
                  <Img
                    src={p.coreValues?.image1}
                    alt="Core value one"
                    className="amber-image aspect-[4/3] w-full"
                  />
                </Wipe>

                <div className="p-6">
                  <h3
                    style={{
                      fontFamily:
                        "Fraunces, Georgia, serif",
                    }}
                    className="text-3xl"
                  >
                    Purpose
                  </h3>

                  <p className="mt-3 leading-relaxed text-[#3a2410]/70">
                    Creating work that has meaning,
                    clarity, and purpose.
                  </p>
                </div>
              </Tilt>
            </Reveal>

            <Reveal direction="right" delay={150}>
              <Tilt className="amber-card overflow-hidden rounded-xl bg-white">
                <Wipe delay={150}>
                  <Img
                    src={p.coreValues?.image2}
                    alt="Core value two"
                    className="amber-image aspect-[4/3] w-full"
                  />
                </Wipe>

                <div className="p-6">
                  <h3
                    style={{
                      fontFamily:
                        "Fraunces, Georgia, serif",
                    }}
                    className="text-3xl"
                  >
                    Craft
                  </h3>

                  <p className="mt-3 leading-relaxed text-[#3a2410]/70">
                    Paying attention to details that
                    make an experience feel considered.
                  </p>
                </div>
              </Tilt>
            </Reveal>
          </div>
        </section>

        {/* =====================================================
            5. FROM THOUGHT TO FORM
        ===================================================== */}

        <section className="relative overflow-hidden bg-[#3a2410] text-white">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-10 top-10 h-40 w-40 rounded-full bg-[#f4b183]/10 blur-3xl"
            style={{
              animation:
                "amberPulse 6s ease-in-out infinite",
            }}
          />

          <div className="mx-auto max-w-6xl px-5 py-20">
            <Reveal direction="left">
              <p className="text-sm font-semibold uppercase tracking-widest text-[#f4b183]">
                From Thought to Form
              </p>
            </Reveal>

            <AnimatedTitle
              className="mt-4 max-w-4xl text-5xl leading-tight sm:text-6xl"
              delay={100}
            >
              Turning ideas into meaningful experiences.
            </AnimatedTitle>

            <Reveal direction="up" delay={400}>
              <p className="mt-6 max-w-2xl leading-relaxed text-white/70">
                I combine creative thinking, structure,
                technology, and visual storytelling to
                transform ideas into finished work.
              </p>
            </Reveal>
          </div>
        </section>

        {/* =====================================================
            6. FEATURED PROJECTS
        ===================================================== */}

        {p.projects?.length > 0 && (
          <section className="mx-auto max-w-6xl px-5 py-20">
            <Reveal direction="left">
              <p className="text-sm font-semibold uppercase tracking-widest text-[#d97706]">
                Featured Projects
              </p>
            </Reveal>

            <AnimatedTitle
              className="mb-8 mt-3 text-5xl"
              delay={100}
            >
              Moments we've captured.
            </AnimatedTitle>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {p.projects.map((pr, i) => (
                <Reveal
                  key={i}
                  direction="up"
                  delay={i * 120}
                >
                  <Tilt className="amber-project group relative overflow-hidden rounded-xl">
                    <div className="overflow-hidden">
                      <Img
                        src={pr.image}
                        alt={pr.title}
                        className="amber-image aspect-[3/4] w-full"
                      />
                    </div>

                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-5 text-white">
                      <p className="text-xs font-semibold uppercase tracking-widest text-[#f4b183]">
                        Project {i + 1}
                      </p>

                      <h3 className="mt-1 text-lg font-semibold transition-transform duration-300 group-hover:translate-x-1">
                        {pr.title}
                      </h3>

                      <p className="text-sm text-white/80">
                        {pr.description}
                      </p>
                    </div>
                  </Tilt>
                </Reveal>
              ))}
            </div>
          </section>
        )}

        {/* =====================================================
            7. CASE STUDY
        ===================================================== */}

        {p.caseStudy?.title && (
          <section className="bg-[#d97706] text-white">
            <div className="mx-auto grid max-w-6xl items-center gap-8 px-5 py-14 md:grid-cols-2">
              <Reveal direction="left">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-widest">
                    Case Study
                  </p>

                  <AnimatedTitle
                    className="mt-2 text-5xl"
                    delay={100}
                  >
                    {p.caseStudy.title}
                  </AnimatedTitle>

                  <p className="mt-4 leading-relaxed text-white/85">
                    {p.caseStudy.description}
                  </p>
                </div>
              </Reveal>

              <Wipe delay={250}>
                <Img
                  src={p.caseStudy.image}
                  alt={p.caseStudy.title}
                  className="amber-image aspect-[16/10] w-full rounded-xl"
                />
              </Wipe>
            </div>
          </section>
        )}

        {/* =====================================================
            8. CREATIVE TOOLS
        ===================================================== */}

        <section className="mx-auto max-w-6xl px-5 py-20">
          <Reveal direction="left">
            <p className="text-sm font-semibold uppercase tracking-widest text-[#d97706]">
              Creative Tools
            </p>
          </Reveal>

          <AnimatedTitle
            className="mt-3 text-5xl"
            delay={100}
          >
            Tools I work with.
          </AnimatedTitle>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {(p.skills || [
              "JavaScript",
              "React",
              "Node.js",
              "MongoDB",
            ]).map((skill, i) => (
              <Reveal
                key={skill}
                direction="up"
                delay={i * 90}
              >
                <div
                  className={`amber-tool amber-shine rounded-xl p-6 ${
                    [
                      "bg-[#f4b183]",
                      "bg-[#e9d5b5]",
                      "bg-[#fcd34d]",
                      "bg-white",
                    ][i % 4]
                  }`}
                >
                  <p className="font-semibold">
                    {skill}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* =====================================================
            9. PERSONAL AESTHETIC
        ===================================================== */}

        {p.personalAesthetic?.image && (
          <section className="bg-[#f4b183]">
            <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-20 md:grid-cols-2">
              <Wipe>
                <Img
                  src={p.personalAesthetic.image}
                  alt="Personal aesthetic"
                  className="amber-image aspect-[4/3] w-full rounded-xl"
                />
              </Wipe>

              <Reveal direction="right">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-widest">
                    Personal Aesthetic
                  </p>

                  <AnimatedTitle
                    className="mt-3 text-5xl leading-tight"
                    delay={100}
                  >
                    A visual language of my own.
                  </AnimatedTitle>

                  <p className="mt-5 leading-relaxed text-[#3a2410]/75">
                    My visual style brings together
                    simplicity, personality, creativity,
                    and thoughtful composition.
                  </p>
                </div>
              </Reveal>
            </div>
          </section>
        )}

        {/* =====================================================
            GALLERY
        ===================================================== */}

        {g.length > 0 && (
          <section className="overflow-hidden bg-[#3a2410] p-2">
            <div className="flex gap-2 overflow-x-auto">
              {g.map((src, i) => (
                <Reveal
                  key={i}
                  direction="up"
                  delay={i * 80}
                >
                  <div className="group shrink-0 overflow-hidden rounded">
                    <Img
                      src={src}
                      alt={`Gallery image ${i + 1}`}
                      className="amber-image h-40 w-40"
                    />
                  </div>
                </Reveal>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* =====================================================
          10. CONTACT
      ===================================================== */}

      <footer
        id="contact"
        className="bg-[#3a2410] px-5 py-14 text-white"
      >
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-5">
          <Reveal direction="left">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-[#f4b183]">
                Contact & Social Links
              </p>

              <AnimatedTitle
                className="mt-2 text-4xl"
                delay={100}
              >
                Let's tell your story.
              </AnimatedTitle>

              {p.email && (
                <p className="mt-3 text-white/70">
                  {p.email}
                </p>
              )}
            </div>
          </Reveal>

          <Reveal direction="right" delay={200}>
            <div className="flex gap-3 text-sm font-semibold">
              <Links
                portfolio={p}
                className="amber-button amber-link rounded bg-[#f4b183] px-4 py-2 text-[#3a2410] hover:bg-white"
              />
            </div>
          </Reveal>
        </div>
      </footer>

      {/* =====================================================
          11. THANK YOU
      ===================================================== */}

      <section className="overflow-hidden bg-[#fbf3e4] px-5 py-16 text-center">
        <AnimatedTitle
          className="text-5xl sm:text-7xl"
          delay={100}
        >
          Thank you.
        </AnimatedTitle>

        <Reveal direction="up" delay={350}>
          <p className="mt-4 text-[#3a2410]/60">
            Thank you for taking the time to explore
            this portfolio.
          </p>
        </Reveal>
      </section>

      {/* =====================================================
          SKILL MARQUEE
      ===================================================== */}

      {p.skills?.length > 0 && (
        <div className="overflow-hidden bg-[#d97706] py-3 text-[#3a2410]">
          <div
            className="flex w-max gap-8 whitespace-nowrap text-xs font-bold uppercase tracking-[0.25em]"
            style={{
              animation:
                "amberMarquee 18s linear infinite",
            }}
          >
            {[...p.skills, ...p.skills, ...p.skills].map(
              (skill, i) => (
                <span key={`${skill}-${i}`}>
                  {skill} ✦
                </span>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default AmberLensTemplate;