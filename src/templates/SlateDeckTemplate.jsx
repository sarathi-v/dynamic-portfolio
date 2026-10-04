import { useEffect, useRef, useState } from "react";
import { Img, Socials } from "./shared";

const font = {
  fontFamily: "Montserrat, system-ui, sans-serif",
};

/* -------------------------------------------------------
   ANIMATION HELPERS
------------------------------------------------------- */

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
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [threshold]);

  return [ref, visible];
}

function Reveal({
  children,
  className = "",
  direction = "up",
  delay = 0,
}) {
  const [ref, visible] = useInView();

  const transforms = {
    up: "translateY(45px)",
    down: "translateY(-45px)",
    left: "translateX(-55px)",
    right: "translateX(55px)",
    zoom: "scale(0.9)",
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translate3d(0,0,0) scale(1)" : transforms[direction],
        transition: `opacity 800ms ease ${delay}ms, transform 900ms cubic-bezier(.16,1,.3,1) ${delay}ms`,
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

  const words = String(children).split(" ");

  return (
    <div
      ref={ref}
      className={className}
      aria-label={children}
    >
      {words.map((word, index) => (
        <span
          key={`${word}-${index}`}
          className="mr-[0.25em] inline-block overflow-hidden align-bottom"
        >
          <span
            className="inline-block"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible
                ? "translateY(0)"
                : "translateY(110%)",
              transition: `
                opacity 650ms ease ${delay + index * 75}ms,
                transform 750ms cubic-bezier(.16,1,.3,1) ${
                  delay + index * 75
                }ms
              `,
            }}
          >
            {word}
          </span>
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
    >
      <div
        className="relative z-10"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "scale(1)" : "scale(1.08)",
          transition: `opacity 900ms ease ${delay}ms, transform 1200ms cubic-bezier(.16,1,.3,1) ${delay}ms`,
        }}
      >
        {children}
      </div>

      <div
        className="absolute inset-0 z-20 bg-[#dccfc0]"
        style={{
          transform: visible ? "translateX(101%)" : "translateX(0)",
          transition: `transform 1100ms cubic-bezier(.77,0,.18,1) ${delay}ms`,
        }}
      />
    </div>
  );
}

function Tilt({ children, className = "" }) {
  const ref = useRef(null);

  const handleMove = (event) => {
    const element = ref.current;
    if (!element) return;

    const rect = element.getBoundingClientRect();

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const rotateX = ((y / rect.height) - 0.5) * -7;
    const rotateY = ((x / rect.width) - 0.5) * 7;

    element.style.transform = `
      perspective(900px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
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
      className={className}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{
        transition: "transform 500ms cubic-bezier(.16,1,.3,1)",
        transformStyle: "preserve-3d",
      }}
    >
      {children}
    </div>
  );
}

/* -------------------------------------------------------
   MAIN TEMPLATE
------------------------------------------------------- */

function SlateDeckTemplate({ portfolio }) {
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

  const [scrollProgress, setScrollProgress] = useState(0);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  /* Scroll progress */
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const documentHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      const progress =
        documentHeight > 0 ? scrollTop / documentHeight : 0;

      setScrollProgress(progress);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  /* Cursor glow */
  useEffect(() => {
    const handleMouseMove = (event) => {
      setMouse({
        x: event.clientX,
        y: event.clientY,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      style={font}
      className="min-h-screen overflow-x-hidden bg-neutral-800 p-3 text-neutral-200 sm:p-8"
    >
      {/* -------------------------------------------------
          GLOBAL STYLE
      ------------------------------------------------- */}

      <style>{`
        html {
          scroll-behavior: smooth;
        }

        ::selection {
          background: #dccfc0;
          color: #000;
        }

        @keyframes slateFloat {
          0%, 100% {
            transform: translate3d(0, 0, 0);
          }
          50% {
            transform: translate3d(0, -18px, 0);
          }
        }

        @keyframes slatePulse {
          0%, 100% {
            opacity: .18;
            transform: scale(1);
          }
          50% {
            opacity: .3;
            transform: scale(1.12);
          }
        }

        @keyframes slateLine {
          from {
            transform: scaleX(0);
            transform-origin: left;
          }
          to {
            transform: scaleX(1);
            transform-origin: left;
          }
        }

        @keyframes slateMarquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        .slate-line {
          animation: slateLine 1s cubic-bezier(.16,1,.3,1) forwards;
        }

        .slate-float {
          animation: slateFloat 7s ease-in-out infinite;
        }

        .slate-pulse {
          animation: slatePulse 5s ease-in-out infinite;
        }

        .slate-marquee {
          animation: slateMarquee 22s linear infinite;
        }

        .slate-image {
          transition:
            transform 900ms cubic-bezier(.16,1,.3,1),
            filter 500ms ease;
        }

        .slate-image:hover {
          transform: scale(1.055);
          filter: contrast(1.05);
        }

        .slate-link {
          position: relative;
        }

        .slate-link::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: -4px;
          width: 100%;
          height: 1px;
          background: currentColor;
          transform: scaleX(0);
          transform-origin: right;
          transition: transform 400ms cubic-bezier(.16,1,.3,1);
        }

        .slate-link:hover::after {
          transform: scaleX(1);
          transform-origin: left;
        }

        .slate-card {
          transition:
            border-color 400ms ease,
            background 400ms ease,
            transform 500ms cubic-bezier(.16,1,.3,1),
            box-shadow 500ms ease;
        }

        .slate-card:hover {
          border-color: rgba(255,255,255,.3);
          background: rgba(255,255,255,.045);
          box-shadow: 0 25px 60px rgba(0,0,0,.28);
        }

        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            scroll-behavior: auto !important;
            animation-duration: .01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: .01ms !important;
          }
        }
      `}</style>

      {/* -------------------------------------------------
          SCROLL PROGRESS
      ------------------------------------------------- */}

      <div
        className="fixed left-0 top-0 z-[100] h-[3px] bg-[#dccfc0]"
        style={{
          width: `${scrollProgress * 100}%`,
        }}
      />

      {/* -------------------------------------------------
          CURSOR GLOW
      ------------------------------------------------- */}

      <div
        className="pointer-events-none fixed z-0 hidden h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#dccfc0]/10 blur-3xl md:block"
        style={{
          left: mouse.x,
          top: mouse.y,
          transition: "left 100ms ease-out, top 100ms ease-out",
        }}
      />

      {/* -------------------------------------------------
          AMBIENT LIGHTS
      ------------------------------------------------- */}

      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div
          className="slate-float absolute left-[8%] top-[15%] h-32 w-32 rounded-full bg-white/[0.025] blur-3xl"
        />

        <div
          className="slate-pulse absolute right-[5%] top-[40%] h-56 w-56 rounded-full bg-[#dccfc0]/[0.06] blur-3xl"
        />

        <div
          className="slate-float absolute bottom-[10%] left-[40%] h-40 w-40 rounded-full bg-white/[0.025] blur-3xl"
          style={{ animationDelay: "-3s" }}
        />
      </div>

      <main className="relative z-10 mx-auto max-w-5xl space-y-4 sm:space-y-8">

        {/* =================================================
            01 — HERO / PROFILE
        ================================================= */}

        <section
          className="relative min-h-[600px] overflow-hidden bg-gradient-to-b from-neutral-700 via-neutral-900 to-black p-6 sm:p-12"
        >
          <Bar name={name} role={role} />

          <div className="relative grid items-center gap-8 md:grid-cols-2">
            <Reveal direction="left">
              <SectionLabel number="01">
                Profile
              </SectionLabel>

              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-neutral-400">
                Portfolio
              </p>

              <AnimatedTitle
                className="break-words text-4xl font-extrabold uppercase leading-tight text-white sm:text-6xl"
                delay={150}
              >
                {name || "Your Name"}
              </AnimatedTitle>

              <div className="my-6 h-0.5 w-20 origin-left bg-white slate-line" />

              <p className="text-sm font-semibold uppercase">
                {role || "Your Role"}
              </p>

              {about && (
                <p className="mt-5 max-w-md text-sm leading-relaxed text-neutral-300">
                  {about}
                </p>
              )}
            </Reveal>

            {profileImage && (
              <Wipe delay={250}>
                <div className="group relative pb-4 pr-4">
                  <div className="absolute -top-4 left-8 h-full w-3/4 bg-[#dccfc0] transition-transform duration-700 group-hover:translate-x-3 group-hover:-translate-y-3" />

                  <div className="relative overflow-hidden">
                    <Img
                      src={profileImage}
                      alt={`Portrait of ${name}`}
                      className="slate-image relative aspect-[4/3] w-full"
                    />
                  </div>
                </div>
              </Wipe>
            )}
          </div>

          <div className="absolute bottom-5 right-6 text-[9px] uppercase tracking-[0.35em] text-neutral-600">
            Scroll to explore
          </div>
        </section>

        {/* =================================================
            02 — ABOUT
        ================================================= */}

        <section
          id="about"
          className="relative overflow-hidden bg-gradient-to-b from-neutral-700 via-neutral-900 to-black p-6 sm:p-12"
        >
          <Bar name={name} role={role} />

          <Reveal>
            <SectionLabel number="02">
              About me
            </SectionLabel>
          </Reveal>

          <div className="grid items-center gap-8 md:grid-cols-12">
            <Reveal
              direction="left"
              className="md:col-span-7"
            >
              <h2 className="text-3xl font-extrabold uppercase text-white sm:text-5xl">
                About
              </h2>

              <p className="mt-6 border-l-2 border-white pl-4 text-sm font-semibold uppercase">
                {name}
              </p>

              {about && (
                <p className="mt-5 max-w-xl text-sm leading-relaxed text-neutral-300">
                  {about}
                </p>
              )}
            </Reveal>

            <Wipe
              delay={150}
              className="bg-[#dccfc0] p-2 md:col-span-5"
            >
              {profileImage && (
                <Img
                  src={profileImage}
                  alt={`Portrait of ${name}`}
                  className="slate-image aspect-[3/4] w-full"
                />
              )}
            </Wipe>
          </div>
        </section>

        {/* =================================================
            03 — DESIGN PHILOSOPHY
        ================================================= */}

        <section className="relative overflow-hidden bg-gradient-to-b from-neutral-700 via-neutral-900 to-black p-6 sm:p-12">
          <Bar name={name} role={role} />

          <Reveal>
            <SectionLabel number="03">
              Design philosophy
            </SectionLabel>
          </Reveal>

          <div className="grid items-center gap-8 md:grid-cols-2">
            <Reveal direction="left">
              <AnimatedTitle
                className="text-2xl font-extrabold uppercase text-white sm:text-4xl"
              >
                Design Philosophy
              </AnimatedTitle>

              <div className="mt-8 space-y-5">
                {designPhilosophy?.text1 && (
                  <Reveal delay={100}>
                    <p className="border-l-2 border-[#dccfc0] pl-5 text-xl font-semibold leading-relaxed text-white sm:text-2xl transition-transform duration-500 hover:translate-x-2">
                      {designPhilosophy.text1}
                    </p>
                  </Reveal>
                )}

                {designPhilosophy?.text2 && (
                  <Reveal delay={200}>
                    <p className="border-l-2 border-[#dccfc0] pl-5 text-xl font-semibold leading-relaxed text-white sm:text-2xl transition-transform duration-500 hover:translate-x-2">
                      {designPhilosophy.text2}
                    </p>
                  </Reveal>
                )}
              </div>
            </Reveal>

            {designPhilosophy?.image && (
              <Wipe delay={200}>
                <div className="group relative">
                  <div className="absolute -bottom-4 -left-4 h-24 w-24 bg-[#dccfc0] transition-transform duration-700 group-hover:-translate-x-3 group-hover:translate-y-3" />

                  <Img
                    src={designPhilosophy.image}
                    alt="Design philosophy"
                    className="slate-image relative aspect-[4/3] w-full"
                  />
                </div>
              </Wipe>
            )}
          </div>
        </section>

        {/* =================================================
            04 — CORE VALUES
        ================================================= */}

        <section className="relative overflow-hidden bg-gradient-to-b from-neutral-700 via-neutral-900 to-black p-6 sm:p-12">
          <Bar name={name} role={role} />

          <Reveal>
            <SectionLabel number="04">
              Core values
            </SectionLabel>

            <AnimatedTitle className="text-2xl font-extrabold uppercase text-white sm:text-4xl">
              Core Values
            </AnimatedTitle>
          </Reveal>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <Tilt>
              <div className="slate-card border border-neutral-700 bg-black/30 p-4">
                {coreValues?.image1 && (
                  <Wipe>
                    <Img
                      src={coreValues.image1}
                      alt="Core value one"
                      className="slate-image aspect-[4/3] w-full"
                    />
                  </Wipe>
                )}

                <div className="mt-5">
                  <span className="text-xs text-neutral-500">
                    01
                  </span>

                  <h3 className="mt-1 text-lg font-extrabold uppercase text-white">
                    Purpose
                  </h3>
                </div>
              </div>
            </Tilt>

            <Tilt>
              <div className="slate-card border border-neutral-700 bg-black/30 p-4 md:mt-8">
                {coreValues?.image2 && (
                  <Wipe delay={120}>
                    <Img
                      src={coreValues.image2}
                      alt="Core value two"
                      className="slate-image aspect-[4/3] w-full"
                    />
                  </Wipe>
                )}

                <div className="mt-5">
                  <span className="text-xs text-neutral-500">
                    02
                  </span>

                  <h3 className="mt-1 text-lg font-extrabold uppercase text-white">
                    Creativity
                  </h3>
                </div>
              </div>
            </Tilt>
          </div>
        </section>

        {/* =================================================
            05 — FROM THOUGHT TO FORM
        ================================================= */}

        <section className="relative overflow-hidden bg-gradient-to-b from-neutral-700 via-neutral-900 to-black p-6 sm:p-12">
          <Bar name={name} role={role} />

          <Reveal>
            <SectionLabel number="05">
              From thought to form
            </SectionLabel>
          </Reveal>

          <div className="grid gap-10 md:grid-cols-2 md:items-center">
            <Reveal direction="left">
              <AnimatedTitle className="text-3xl font-extrabold uppercase text-white sm:text-5xl">
                From Thought To Form
              </AnimatedTitle>

              <p className="mt-5 max-w-md text-sm leading-relaxed text-neutral-300">
                Ideas become meaningful when they are shaped with intention,
                structure, and attention to detail.
              </p>
            </Reveal>

            <div className="grid gap-3">
              {[
                {
                  number: "01",
                  title: "Think",
                  text: "Understand the idea, audience, and purpose.",
                },
                {
                  number: "02",
                  title: "Shape",
                  text: "Develop the concept into a clear visual direction.",
                },
                {
                  number: "03",
                  title: "Create",
                  text: "Build the final experience with precision.",
                },
              ].map((item, index) => (
                <Reveal
                  key={item.number}
                  direction="right"
                  delay={index * 100}
                >
                  <div className="group border-l-4 border-[#dccfc0] bg-neutral-800 p-5 transition-all duration-500 hover:translate-x-2 hover:bg-neutral-700">
                    <span className="text-xs text-neutral-500">
                      {item.number}
                    </span>

                    <h3 className="mt-2 font-extrabold uppercase text-white">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-sm text-neutral-400">
                      {item.text}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* =================================================
            06 — PROJECTS
        ================================================= */}

        <section
          id="work"
          className="relative overflow-hidden bg-gradient-to-b from-neutral-700 via-neutral-900 to-black p-6 sm:p-12"
        >
          <Bar name={name} role={role} />

          <Reveal>
            <SectionLabel number="06">
              Featured projects
            </SectionLabel>
          </Reveal>

          <div className="flex flex-col gap-6 md:flex-row">
            <Reveal direction="left">
              <h2 className="text-2xl font-extrabold uppercase text-white md:[writing-mode:vertical-rl] md:rotate-180 md:text-3xl">
                Projects
              </h2>
            </Reveal>

            {projects?.length > 0 ? (
              <div className="grid flex-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {projects.slice(0, 3).map((project, index) => (
                  <Reveal
                    key={index}
                    delay={index * 120}
                  >
                    <Tilt>
                      <article className="group">
                        <div className="overflow-hidden bg-[#dccfc0] p-1">
                          <div className="overflow-hidden">
                            <Img
                              src={project.image}
                              alt={project.title}
                              className="slate-image aspect-[3/4] w-full"
                            />
                          </div>
                        </div>

                        <div className="mt-4">
                          <span className="text-[10px] font-semibold uppercase tracking-widest text-neutral-500">
                            Project{" "}
                            {String(index + 1).padStart(2, "0")}
                          </span>

                          <h3 className="mt-2 text-sm font-extrabold uppercase text-white transition-transform duration-300 group-hover:translate-x-1">
                            {project.title}
                          </h3>

                          <p className="mt-1 text-xs leading-relaxed text-neutral-400">
                            {project.description}
                          </p>
                        </div>
                      </article>
                    </Tilt>
                  </Reveal>
                ))}
              </div>
            ) : (
              <p className="text-sm text-neutral-500">
                No projects added yet.
              </p>
            )}
          </div>
        </section>

        {/* =================================================
            07 — CASE STUDY
        ================================================= */}

        <section className="relative overflow-hidden bg-gradient-to-b from-neutral-700 via-neutral-900 to-black p-6 sm:p-12">
          <Bar name={name} role={role} />

          <Reveal>
            <SectionLabel number="07">
              Case study
            </SectionLabel>
          </Reveal>

          <div className="mt-5 grid items-center gap-8 md:grid-cols-2">
            {caseStudy?.image && (
              <Wipe>
                <div className="bg-[#dccfc0] p-2">
                  <Img
                    src={caseStudy.image}
                    alt={caseStudy.title || "Case study"}
                    className="slate-image aspect-[4/3] w-full"
                  />
                </div>
              </Wipe>
            )}

            <Reveal direction="right">
              <AnimatedTitle className="text-3xl font-extrabold uppercase text-white sm:text-5xl">
                {caseStudy?.title || "Case Study"}
              </AnimatedTitle>

              <div className="my-6 h-0.5 w-16 origin-left bg-[#dccfc0] slate-line" />

              {caseStudy?.description && (
                <p className="max-w-xl text-sm leading-relaxed text-neutral-300">
                  {caseStudy.description}
                </p>
              )}
            </Reveal>
          </div>
        </section>

        {/* =================================================
            08 — CREATIVE TOOLS
        ================================================= */}

        <section className="relative overflow-hidden bg-gradient-to-b from-neutral-700 via-neutral-900 to-black p-6 sm:p-12">
          <Bar name={name} role={role} />

          <Reveal>
            <SectionLabel number="08">
              Creative tools
            </SectionLabel>
          </Reveal>

          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <Reveal direction="left">
              <AnimatedTitle className="text-3xl font-extrabold uppercase text-white sm:text-5xl">
                Creative Tools
              </AnimatedTitle>

              <p className="mt-5 max-w-md text-sm leading-relaxed text-neutral-400">
                A focused collection of technologies and tools used to turn
                ideas into practical digital experiences.
              </p>
            </Reveal>

            {skills?.length > 0 && (
              <div className="grid grid-cols-2 gap-3">
                {skills.map((skill, index) => (
                  <Reveal
                    key={`${skill}-${index}`}
                    direction="zoom"
                    delay={index * 70}
                  >
                    <div className="slate-card border border-neutral-700 bg-neutral-800 p-5">
                      <span className="text-xs text-neutral-600">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <p className="mt-4 text-sm font-bold uppercase text-white">
                        {skill}
                      </p>

                      <div className="mt-4 h-px w-0 bg-[#dccfc0] transition-all duration-500 group-hover:w-full" />
                    </div>
                  </Reveal>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* =================================================
            SKILL MARQUEE
        ================================================= */}

        {skills?.length > 0 && (
          <div className="overflow-hidden border-y border-white/10 py-4">
            <div className="slate-marquee flex w-max">
              {[...skills, ...skills, ...skills].map(
                (skill, index) => (
                  <span
                    key={`${skill}-${index}`}
                    className="mx-6 whitespace-nowrap text-[10px] font-semibold uppercase tracking-[0.3em] text-neutral-500"
                  >
                    {skill}
                    <span className="ml-6 text-[#dccfc0]">
                      ✦
                    </span>
                  </span>
                )
              )}
            </div>
          </div>
        )}

        {/* =================================================
            09 — PERSONAL AESTHETIC
        ================================================= */}

        <section className="relative overflow-hidden bg-gradient-to-b from-neutral-700 via-neutral-900 to-black p-6 sm:p-12">
          <Bar name={name} role={role} />

          <Reveal>
            <SectionLabel number="09">
              Personal aesthetic
            </SectionLabel>
          </Reveal>

          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <Reveal direction="left">
              <AnimatedTitle className="text-3xl font-extrabold uppercase text-white sm:text-5xl">
                Personal Aesthetic
              </AnimatedTitle>

              <p className="mt-5 max-w-md text-sm leading-relaxed text-neutral-300">
                A visual language built around contrast, simplicity,
                structure, and intentional details.
              </p>
            </Reveal>

            {personalAesthetic?.image && (
              <Wipe delay={150}>
                <div className="group relative pb-4 pr-4">
                  <div className="absolute bottom-0 right-0 h-3/4 w-3/4 bg-[#dccfc0] transition-transform duration-700 group-hover:translate-x-3 group-hover:translate-y-3" />

                  <Img
                    src={personalAesthetic.image}
                    alt="Personal aesthetic"
                    className="slate-image relative aspect-[4/3] w-full"
                  />
                </div>
              </Wipe>
            )}
          </div>
        </section>

        {/* =================================================
            10 — CONTACT
        ================================================= */}

        <section
          id="contact"
          className="relative overflow-hidden bg-gradient-to-b from-neutral-700 via-neutral-900 to-black p-6 text-center sm:p-12"
        >
          <Bar name={name} role={role} />

          <Reveal>
            <SectionLabel number="10">
              Contact & social links
            </SectionLabel>

            <AnimatedTitle className="mt-4 text-3xl font-extrabold uppercase text-white sm:text-6xl">
              Let's work together
            </AnimatedTitle>
          </Reveal>

          {email && (
            <Reveal delay={200}>
              <a
                href={`mailto:${email}`}
                className="mt-8 inline-block break-all rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition-all duration-500 hover:-translate-y-1 hover:bg-[#dccfc0] hover:shadow-[0_15px_40px_rgba(220,207,192,.15)]"
              >
                {email}
              </a>
            </Reveal>
          )}

          <Reveal delay={300}>
            <div className="mt-6 flex justify-center gap-6 text-sm">
              <Socials
                portfolio={portfolio}
                className="slate-link underline-offset-4 hover:text-white"
              />
            </div>
          </Reveal>
        </section>

        {/* =================================================
            11 — THANK YOU
        ================================================= */}

        <section className="relative overflow-hidden bg-gradient-to-b from-neutral-700 via-neutral-900 to-black p-6 text-center sm:p-12">
          <Bar name={name} role={role} />

          <Reveal>
            <SectionLabel number="11">
              Thank you
            </SectionLabel>

            <AnimatedTitle className="mt-5 text-3xl font-extrabold uppercase text-white sm:text-5xl">
              Thank You
            </AnimatedTitle>

            <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-neutral-400">
              Thank you for taking the time to explore my work.
            </p>

            <div className="mx-auto mt-8 h-1 w-20 origin-left bg-[#dccfc0] slate-line" />
          </Reveal>

          <Reveal delay={250}>
            <div className="mt-8 flex justify-center gap-6 text-xs uppercase tracking-wider text-neutral-500">
              <a href="#about" className="slate-link hover:text-white">
                About
              </a>

              <a href="#work" className="slate-link hover:text-white">
                Work
              </a>

              <a href="#contact" className="slate-link hover:text-white">
                Contact
              </a>
            </div>
          </Reveal>
        </section>
      </main>

      {/* -------------------------------------------------
          FOOTER
      ------------------------------------------------- */}

      <Reveal>
        <footer className="relative z-10 mx-auto mt-4 max-w-5xl px-2 pb-4 text-center text-[10px] uppercase tracking-wider text-neutral-600 sm:mt-8">
          {name} · {role}
        </footer>
      </Reveal>
    </div>
  );
}

/* -------------------------------------------------------
   SHARED UI
------------------------------------------------------- */

const Bar = ({ name, role }) => (
  <div className="mb-8 flex justify-between border-b border-white/10 pb-4 text-[11px] font-semibold uppercase tracking-wider text-neutral-300 sm:mb-12">
    <span>{name}</span>
    <span className="font-normal">{role}</span>
  </div>
);

const SectionLabel = ({ number, children }) => (
  <div className="mb-5">
    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-neutral-500">
      {number} / {children}
    </p>
  </div>
);

export default SlateDeckTemplate;