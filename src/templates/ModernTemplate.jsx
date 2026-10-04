import { useEffect, useRef, useState } from "react";

/* =========================================================
   ANIMATION HELPERS
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
    zoom: "scale(0.88)",
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
          transform 900ms cubic-bezier(.16,1,.3,1) ${delay}ms
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
          transition: `
            opacity 900ms ease ${delay}ms,
            transform 1200ms cubic-bezier(.16,1,.3,1) ${delay}ms
          `,
        }}
      >
        {children}
      </div>

      <div
        className="absolute inset-0 z-20 bg-[#e8b7c2]"
        style={{
          transform: visible
            ? "translateX(101%)"
            : "translateX(0)",
          transition: `
            transform 1100ms cubic-bezier(.77,0,.18,1) ${delay}ms
          `,
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
      translateY(-6px)
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
        transition:
          "transform 500ms cubic-bezier(.16,1,.3,1)",
        transformStyle: "preserve-3d",
      }}
    >
      {children}
    </div>
  );
}

/* =========================================================
   IMAGE
========================================================= */

function AnimatedImage({
  src,
  alt,
  className = "",
}) {
  if (!src) return null;

  return (
    <div className="group overflow-hidden">
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className={`
          w-full object-cover
          transition duration-1000
          ease-[cubic-bezier(.16,1,.3,1)]
          group-hover:scale-[1.06]
          ${className}
        `}
      />
    </div>
  );
}

/* =========================================================
   MAIN TEMPLATE
========================================================= */

function ModernTemplate({ portfolio }) {
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

  /* -------------------------------------------------------
     SCROLL PROGRESS
  ------------------------------------------------------- */

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;

      const documentHeight =
        document.documentElement.scrollHeight -
        window.innerHeight;

      const progress =
        documentHeight > 0
          ? scrollTop / documentHeight
          : 0;

      setScrollProgress(progress);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () =>
      window.removeEventListener("scroll", handleScroll);
  }, []);

  /* -------------------------------------------------------
     CURSOR GLOW
  ------------------------------------------------------- */

  useEffect(() => {
    const handleMouseMove = (event) => {
      setMouse({
        x: event.clientX,
        y: event.clientY,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () =>
      window.removeEventListener(
        "mousemove",
        handleMouseMove
      );
  }, []);

  return (
    <div className="min-h-screen overflow-hidden bg-gradient-to-br from-[#d98a9d] via-[#9f3148] to-[#260912] text-white">

      {/* ===================================================
          GLOBAL ANIMATION STYLE
      =================================================== */}

      <style>{`
        html {
          scroll-behavior: smooth;
        }

        ::selection {
          background: #e8b7c2;
          color: #260912;
        }

        @keyframes modernFloat {
          0%, 100% {
            transform: translate3d(0, 0, 0);
          }

          50% {
            transform: translate3d(0, -22px, 0);
          }
        }

        @keyframes modernFloatSlow {
          0%, 100% {
            transform: translate3d(0, 0, 0) rotate(0deg);
          }

          50% {
            transform: translate3d(18px, -15px, 0) rotate(8deg);
          }
        }

        @keyframes modernPulse {
          0%, 100% {
            opacity: .2;
            transform: scale(1);
          }

          50% {
            opacity: .4;
            transform: scale(1.12);
          }
        }

        @keyframes modernMarquee {
          from {
            transform: translateX(0);
          }

          to {
            transform: translateX(-50%);
          }
        }

        .modern-float {
          animation:
            modernFloat 7s ease-in-out infinite;
        }

        .modern-float-slow {
          animation:
            modernFloatSlow 10s ease-in-out infinite;
        }

        .modern-pulse {
          animation:
            modernPulse 5s ease-in-out infinite;
        }

        .modern-marquee {
          animation:
            modernMarquee 24s linear infinite;
        }

        .modern-card {
          transition:
            transform 500ms cubic-bezier(.16,1,.3,1),
            box-shadow 500ms ease;
        }

        .modern-card:hover {
          box-shadow:
            0 30px 70px rgba(38,9,18,.25);
        }

        .modern-link {
          position: relative;
        }

        .modern-link::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: -5px;
          width: 100%;
          height: 2px;
          background: currentColor;
          transform: scaleX(0);
          transform-origin: right;
          transition:
            transform 400ms cubic-bezier(.16,1,.3,1);
        }

        .modern-link:hover::after {
          transform: scaleX(1);
          transform-origin: left;
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

      {/* ===================================================
          SCROLL PROGRESS
      =================================================== */}

      <div
        className="fixed left-0 top-0 z-[100] h-[4px] bg-white"
        style={{
          width: `${scrollProgress * 100}%`,
        }}
      />

      {/* ===================================================
          CURSOR GLOW
      =================================================== */}

      <div
        className="pointer-events-none fixed z-0 hidden h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#f7d5dd]/20 blur-3xl md:block"
        style={{
          left: mouse.x,
          top: mouse.y,
          transition:
            "left 100ms ease-out, top 100ms ease-out",
        }}
      />

      {/* ===================================================
          AMBIENT BACKGROUND ELEMENTS
      =================================================== */}

      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">

        <div className="modern-float absolute left-[5%] top-[20%] h-40 w-40 rounded-full bg-[#f0b7c3]/20 blur-3xl" />

        <div className="modern-pulse absolute right-[5%] top-[45%] h-64 w-64 rounded-full bg-[#e7a1b2]/20 blur-3xl" />

        <div
          className="modern-float-slow absolute bottom-[12%] left-[40%] h-52 w-52 rounded-full bg-[#9e1735]/30 blur-3xl"
        />

      </div>

      {/* ===================================================
          1. HERO / PROFILE
      =================================================== */}

      <section className="relative min-h-screen overflow-hidden px-6 py-8 sm:px-10 md:px-16">

        {/* Decorative shapes */}

        <div className="modern-float absolute left-0 top-40 h-60 w-60 rounded-tr-[120px] bg-gradient-to-br from-[#f0b7c3] to-[#9d1f38]" />

        <div
          className="modern-float-slow absolute -bottom-20 left-0 h-72 w-72 rounded-tr-full bg-gradient-to-br from-[#e8a5b5] to-[#8e1d35] opacity-80"
        />

        <div
          className="modern-pulse absolute right-[-80px] top-60 h-16 w-80 rounded-full bg-gradient-to-r from-[#9e1735] to-[#e7a1b2]"
        />

        <div className="modern-float absolute bottom-[-100px] left-[30%] h-64 w-64 rounded-full bg-gradient-to-br from-[#e8a5b5] to-[#9e1d35]" />

        {/* Header */}

        <Reveal direction="down">
          <div className="relative z-10 flex flex-col justify-between gap-3 text-sm font-semibold sm:flex-row">
            <p>Portfolio Presentation</p>

            <p>
              Visual Logic: Designing with Intention
            </p>
          </div>
        </Reveal>

        {/* Hero */}

        <div className="relative z-10 mx-auto mt-16 w-full max-w-6xl md:mt-24">

          <Reveal direction="left">

            <p className="mb-4 text-lg font-semibold">
              {role}
            </p>

          </Reveal>

          <AnimatedTitle
            className="break-words text-5xl font-bold leading-[0.9] sm:text-7xl md:text-8xl lg:text-9xl"
            delay={150}
          >
            {name || "Your Name"}
          </AnimatedTitle>

          <Reveal delay={300}>

            <div className="mt-8 max-w-xl">
              <p className="text-base leading-7 sm:text-lg sm:leading-8">
                {about}
              </p>
            </div>

          </Reveal>

          <Reveal delay={450}>

            <div className="mt-8 flex flex-wrap gap-3">

              <a
                href="#work"
                className="rounded-full bg-black px-6 py-3 text-sm font-semibold transition-all duration-500 hover:-translate-y-1 hover:bg-white hover:text-black hover:shadow-xl"
              >
                View my work
              </a>

              <a
                href="#contact"
                className="rounded-full border border-white px-6 py-3 text-sm font-semibold transition-all duration-500 hover:-translate-y-1 hover:bg-white hover:text-black"
              >
                Contact me
              </a>

            </div>

          </Reveal>

        </div>

        {/* Bottom information */}

        <Reveal
          direction="right"
          delay={500}
          className="absolute bottom-10 right-6 z-10 sm:right-12"
        >
          <p className="text-sm sm:text-lg">
            Presented By:
            <span className="ml-2 font-bold">
              {name}
            </span>
          </p>
        </Reveal>

      </section>

      {/* ===================================================
          2. ABOUT ME
      =================================================== */}

      <section
        id="about"
        className="relative px-6 py-20 sm:px-10 md:px-16 lg:px-20"
      >

        <div className="mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-2">

          {/* Profile Image */}

          <Wipe delay={100}>

            <div className="relative">

              <div className="absolute -left-4 -top-4 h-16 w-40 rounded-full bg-gradient-to-r from-[#9e1735] to-[#e7a1b2] transition-transform duration-700 group-hover:-translate-x-3" />

              {profileImage && (
                <AnimatedImage
                  src={profileImage}
                  alt={`Portrait of ${name}`}
                  className="relative z-10 h-[350px] rounded-[40px] sm:h-[450px] md:h-[500px]"
                />
              )}

            </div>

          </Wipe>

          {/* Content */}

          <Reveal direction="right">

            <div className="relative z-10">

              <p className="text-base font-semibold sm:text-lg">
                {role}
              </p>

              <AnimatedTitle className="mt-4 text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
                About Me
              </AnimatedTitle>

              <p className="mt-8 max-w-xl text-base leading-7 sm:text-lg sm:leading-8">
                {about}
              </p>

            </div>

          </Reveal>

        </div>

      </section>

      {/* ===================================================
          3. DESIGN PHILOSOPHY
      =================================================== */}

      <section className="relative overflow-hidden px-6 py-20 sm:px-10 md:px-16 lg:px-20">

        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">

          {/* Left */}

          <Reveal direction="left">

            <div className="relative">

              <div className="modern-float absolute -left-10 top-20 h-64 w-64 rounded-r-full bg-[#e5a5b5] opacity-40 sm:h-80 sm:w-80" />

              <div className="relative z-10">

                <p className="text-base font-semibold sm:text-lg">
                  {role}
                </p>

                <AnimatedTitle className="mt-4 text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
                  Design Philosophy
                </AnimatedTitle>

              </div>

            </div>

          </Reveal>

          {/* Right */}

          <Reveal direction="right" delay={150}>

            <div className="relative z-10">

              <div className="rounded-3xl bg-[#8f3048]/50 p-6 backdrop-blur-sm sm:p-8">

                {designPhilosophy?.text1 && (
                  <div className="group flex items-start gap-4">

                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-black text-xl transition-transform duration-500 group-hover:rotate-90">
                      →
                    </span>

                    <p className="text-base font-semibold transition-transform duration-500 group-hover:translate-x-2 sm:text-lg">
                      {designPhilosophy.text1}
                    </p>

                  </div>
                )}

                {designPhilosophy?.text2 && (
                  <div className="group mt-8 flex items-start gap-4">

                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-black text-xl transition-transform duration-500 group-hover:rotate-90">
                      →
                    </span>

                    <p className="text-base font-semibold transition-transform duration-500 group-hover:translate-x-2 sm:text-lg">
                      {designPhilosophy.text2}
                    </p>

                  </div>
                )}

              </div>

              {designPhilosophy?.image && (
                <Wipe delay={250} className="mt-8 rounded-[30px]">

                  <AnimatedImage
                    src={designPhilosophy.image}
                    alt="Design philosophy"
                    className="h-56 sm:h-72"
                  />

                </Wipe>
              )}

            </div>

          </Reveal>

        </div>

      </section>

      {/* ===================================================
          4. CORE VALUES
      =================================================== */}

      <section className="relative overflow-hidden px-6 py-20 sm:px-10 md:px-16 lg:px-20">

        <div className="mx-auto max-w-7xl">

          <Reveal>

            <div className="mb-12 text-center md:text-left">

              <p className="text-base font-semibold sm:text-lg">
                {role}
              </p>

              <AnimatedTitle className="mt-3 text-4xl font-bold sm:text-5xl md:text-6xl">
                Core Values
              </AnimatedTitle>

            </div>

          </Reveal>

          <div className="grid gap-8 md:grid-cols-2">

            {/* Value 1 */}

            <Tilt>

              <Reveal delay={100}>

                <div className="modern-card">

                  {coreValues?.image1 && (
                    <Wipe>
                      <AnimatedImage
                        src={coreValues.image1}
                        alt="Core value one"
                        className="h-64 rounded-[30px] sm:h-80"
                      />
                    </Wipe>
                  )}

                  <div className="mt-6 rounded-3xl bg-[#e8b7c2]/80 p-6 text-black sm:p-8">

                    <div className="flex items-center gap-4">

                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-black text-2xl transition-transform duration-500 hover:rotate-90">
                        +
                      </span>

                      <p className="text-base font-semibold sm:text-lg">
                        Emotion as the bridge between viewer and message
                      </p>

                    </div>

                  </div>

                </div>

              </Reveal>

            </Tilt>

            {/* Value 2 */}

            <Tilt>

              <Reveal delay={220}>

                <div className="modern-card">

                  {coreValues?.image2 && (
                    <Wipe delay={100}>
                      <AnimatedImage
                        src={coreValues.image2}
                        alt="Core value two"
                        className="h-64 rounded-[30px] sm:h-80"
                      />
                    </Wipe>
                  )}

                  <div className="mt-6 rounded-3xl bg-[#e8b7c2]/80 p-6 text-black sm:p-8">

                    <div className="flex items-center gap-4">

                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-black text-2xl transition-transform duration-500 hover:rotate-90">
                        +
                      </span>

                      <p className="text-base font-semibold sm:text-lg">
                        Clarity as a foundation for understanding
                      </p>

                    </div>

                  </div>

                </div>

              </Reveal>

            </Tilt>

          </div>

        </div>

      </section>

      {/* ===================================================
          5. FROM THOUGHT TO FORM
      =================================================== */}

      <section className="relative overflow-hidden px-6 py-20 sm:px-10 md:px-16 lg:px-20">

        <div className="mx-auto max-w-7xl">

          <Reveal direction="left">

            <div className="mb-14">

              <p className="text-base font-semibold sm:text-lg">
                {role}
              </p>

              <AnimatedTitle className="mt-3 max-w-3xl text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
                From Thought to Form
              </AnimatedTitle>

            </div>

          </Reveal>

          <div className="grid gap-8 lg:grid-cols-2">

            {/* Exploration */}

            <Tilt>

              <Reveal direction="left">

                <div className="modern-card rounded-[32px] bg-[#8f3048]/60 p-6 sm:p-10">

                  <div className="mb-8 flex items-center justify-between">

                    <span className="text-5xl font-bold">
                      01
                    </span>

                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-black text-xl transition-transform duration-500 hover:rotate-90">
                      →
                    </span>

                  </div>

                  <h3 className="text-2xl font-bold sm:text-3xl">
                    Exploration &amp; Discovery
                  </h3>

                  <p className="mt-5 max-w-xl text-base leading-7 sm:text-lg sm:leading-8">
                    Transforming insights and inspiration into early visual
                    directions through research and experimentation.
                  </p>

                </div>

              </Reveal>

            </Tilt>

            {/* Refinement */}

            <Tilt>

              <Reveal direction="right" delay={150}>

                <div className="modern-card rounded-[32px] bg-[#e8b7c2]/80 p-6 text-black sm:p-10">

                  <div className="mb-8 flex items-center justify-between">

                    <span className="text-5xl font-bold">
                      02
                    </span>

                    <span className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-black text-xl transition-transform duration-500 hover:rotate-90">
                      →
                    </span>

                  </div>

                  <h3 className="text-2xl font-bold sm:text-3xl">
                    Refinement &amp; Execution
                  </h3>

                  <p className="mt-5 max-w-xl text-base leading-7 sm:text-lg sm:leading-8">
                    Developing each element with intention, ensuring clarity,
                    balance, and emotional connection in the final design.
                  </p>

                </div>

              </Reveal>

            </Tilt>

          </div>

        </div>

      </section>

      {/* ===================================================
          6. FEATURED PROJECTS
      =================================================== */}

      <section
        id="work"
        className="relative overflow-hidden px-6 py-20 sm:px-10 md:px-16 lg:px-20"
      >

        <div className="mx-auto max-w-7xl">

          <Reveal>

            <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">

              <div>

                <p className="text-base font-semibold sm:text-lg">
                  {role}
                </p>

                <AnimatedTitle className="mt-3 text-4xl font-bold sm:text-5xl md:text-6xl">
                  Featured Projects
                </AnimatedTitle>

              </div>

              <p className="max-w-md text-base leading-7 sm:text-lg">
                Each project is an opportunity to tell a story through
                thoughtful design, clarity, and visual expression.
              </p>

            </div>

          </Reveal>

          <div className="grid gap-8 md:grid-cols-2">

            {projects?.slice(0, 3).map(
              (project, index) => (
                <Tilt key={`${project.title}-${index}`}>

                  <Reveal delay={index * 140}>

                    <article className="modern-card group overflow-hidden rounded-[32px] bg-[#e8b7c2] text-black">

                      {project.image ? (
                        <div className="overflow-hidden">

                          <AnimatedImage
                            src={project.image}
                            alt={project.title}
                            className="h-64 sm:h-80"
                          />

                        </div>
                      ) : (
                        <div className="flex h-64 items-center justify-center bg-[#b84d68] text-5xl font-bold text-white sm:h-80">
                          {String(index + 1).padStart(2, "0")}
                        </div>
                      )}

                      <div className="p-6 sm:p-8">

                        <div className="flex items-start justify-between gap-4">

                          <div>

                            <p className="text-sm font-semibold uppercase tracking-widest">
                              Project{" "}
                              {String(index + 1).padStart(2, "0")}
                            </p>

                            <h3 className="mt-3 text-2xl font-bold transition-transform duration-500 group-hover:translate-x-2 sm:text-3xl">
                              {project.title}
                            </h3>

                          </div>

                          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-black transition-all duration-500 group-hover:rotate-45 group-hover:bg-black group-hover:text-white">
                            ↗
                          </span>

                        </div>

                        <p className="mt-5 text-base leading-7 sm:text-lg">
                          {project.description}
                        </p>

                      </div>

                    </article>

                  </Reveal>

                </Tilt>
              )
            )}

          </div>

        </div>

      </section>

      {/* ===================================================
          PROJECT MARQUEE
      =================================================== */}

      {projects?.length > 0 && (
        <div className="overflow-hidden border-y border-white/20 py-5">

          <div className="modern-marquee flex w-max">

            {[
              ...projects,
              ...projects,
              ...projects,
            ].map((project, index) => (
              <span
                key={`${project.title}-${index}`}
                className="mx-8 whitespace-nowrap text-sm font-semibold uppercase tracking-[0.25em]"
              >
                {project.title}
                <span className="ml-8 text-[#e8b7c2]">
                  ✦
                </span>
              </span>
            ))}

          </div>

        </div>
      )}

      {/* ===================================================
          7. CASE STUDY
      =================================================== */}

      <section className="relative overflow-hidden px-6 py-20 sm:px-10 md:px-16 lg:px-20">

        <div className="mx-auto max-w-7xl">

          <Reveal>

            <div className="mb-12">

              <p className="text-base font-semibold sm:text-lg">
                {role}
              </p>

              <AnimatedTitle className="mt-3 text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
                Case Study
              </AnimatedTitle>

            </div>

          </Reveal>

          <div className="grid gap-8 lg:grid-cols-2">

            <Wipe delay={100}>

              <div className="relative min-h-[360px] overflow-hidden rounded-[32px] bg-[#8f3048] sm:min-h-[500px]">

                {caseStudy?.image ? (
                  <AnimatedImage
                    src={caseStudy.image}
                    alt={
                      caseStudy.title ||
                      "Case Study"
                    }
                    className="h-full min-h-[360px] sm:min-h-[500px]"
                  />
                ) : (
                  <div className="flex h-full min-h-[360px] items-center justify-center sm:min-h-[500px]">
                    <span className="text-6xl font-bold text-[#d98da2] sm:text-8xl">
                      CASE
                    </span>
                  </div>
                )}

              </div>

            </Wipe>

            <Reveal direction="right" delay={150}>

              <div className="modern-card flex flex-col justify-center rounded-[32px] bg-[#e8b7c2] p-6 text-black sm:p-10 lg:p-14">

                <p className="text-sm font-semibold uppercase tracking-[0.2em]">
                  Featured Case Study
                </p>

                <AnimatedTitle className="mt-5 text-3xl font-bold sm:text-4xl">
                  {caseStudy?.title || "Rebranding"}
                </AnimatedTitle>

                <p className="mt-6 text-base leading-7 sm:text-lg sm:leading-8">
                  {caseStudy?.description ||
                    "A rebranding project focused on clarity, heritage, and timeless appeal. The design introduces a refined visual direction through thoughtful typography and modern composition."}
                </p>

                <div className="mt-8">

                  <span className="inline-flex rounded-full border-2 border-black px-5 py-2 text-sm font-semibold transition-all duration-500 hover:bg-black hover:text-white">
                    View Case Study
                  </span>

                </div>

              </div>

            </Reveal>

          </div>

        </div>

      </section>

      {/* ===================================================
          8. CREATIVE TOOLS
      =================================================== */}

      <section className="relative overflow-hidden px-6 py-20 sm:px-10 md:px-16 lg:px-20">

        <div className="mx-auto max-w-7xl">

          <Reveal>

            <div className="mb-12">

              <p className="text-base font-semibold sm:text-lg">
                {role}
              </p>

              <AnimatedTitle className="mt-3 text-4xl font-bold sm:text-5xl md:text-6xl">
                Creative Tools
              </AnimatedTitle>

            </div>

          </Reveal>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

            {skills?.length > 0 ? (
              skills.map((skill, index) => (
                <Tilt key={`${skill}-${index}`}>

                  <Reveal
                    direction="zoom"
                    delay={index * 80}
                  >

                    <div
                      className={`
                        modern-card rounded-[28px] p-6 sm:p-8
                        ${
                          index % 3 === 1
                            ? "bg-[#8f3048]"
                            : "bg-[#e8b7c2] text-black"
                        }
                      `}
                    >

                      <span className="text-4xl font-bold">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <h3 className="mt-8 text-2xl font-bold">
                        {skill}
                      </h3>

                      <p className="mt-4 leading-7">
                        A creative tool used to develop thoughtful and
                        polished digital experiences.
                      </p>

                      <div className="mt-6 h-1 w-0 rounded-full bg-current transition-all duration-700 group-hover:w-16" />

                    </div>

                  </Reveal>

                </Tilt>
              ))
            ) : (
              <>
                {[
                  "Creative Thinking",
                  "Digital Design",
                  "Experimentation",
                ].map((skill, index) => (
                  <Reveal
                    key={skill}
                    direction="zoom"
                    delay={index * 100}
                  >
                    <div
                      className={`
                        rounded-[28px] p-6 sm:p-8
                        ${
                          index % 3 === 1
                            ? "bg-[#8f3048]"
                            : "bg-[#e8b7c2] text-black"
                        }
                      `}
                    >
                      <span className="text-4xl font-bold">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <h3 className="mt-8 text-2xl font-bold">
                        {skill}
                      </h3>
                    </div>
                  </Reveal>
                ))}
              </>
            )}

          </div>

        </div>

      </section>

      {/* ===================================================
          SKILL MARQUEE
      =================================================== */}

      {skills?.length > 0 && (
        <div className="overflow-hidden border-y border-white/20 py-5">

          <div className="modern-marquee flex w-max">

            {[
              ...skills,
              ...skills,
              ...skills,
            ].map((skill, index) => (
              <span
                key={`${skill}-${index}`}
                className="mx-7 whitespace-nowrap text-sm font-semibold uppercase tracking-[0.3em]"
              >
                {skill}
                <span className="ml-7 text-[#e8b7c2]">
                  ✦
                </span>
              </span>
            ))}

          </div>

        </div>
      )}

      {/* ===================================================
          9. PERSONAL AESTHETIC
      =================================================== */}

      <section className="relative overflow-hidden px-6 py-20 sm:px-10 md:px-16 lg:px-20">

        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2">

          {/* Image */}

          <Wipe delay={100}>

            <div className="relative overflow-hidden rounded-[32px] bg-[#8f3048]">

              {personalAesthetic?.image ? (
                <AnimatedImage
                  src={personalAesthetic.image}
                  alt="Personal aesthetic"
                  className="h-[400px] sm:h-[500px]"
                />
              ) : (
                <div className="flex h-[400px] items-center justify-center sm:h-[500px]">
                  <span className="text-8xl font-bold text-white/20">
                    09
                  </span>
                </div>
              )}

            </div>

          </Wipe>

          {/* Content */}

          <Reveal direction="right">

            <div>

              <p className="text-base font-semibold sm:text-lg">
                {role}
              </p>

              <AnimatedTitle className="mt-3 text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
                Personal Aesthetic
              </AnimatedTitle>

              <p className="mt-8 max-w-xl text-base leading-7 sm:text-lg sm:leading-8">
                My style blends structure with expressiveness. I enjoy
                creating harmony between order and spontaneity — where
                logic meets feeling.
              </p>

              <div className="mt-8 h-1 w-24 rounded-full bg-[#8f3048] transition-all duration-700 hover:w-40" />

            </div>

          </Reveal>

        </div>

      </section>

      {/* ===================================================
          10. CONTACT
      =================================================== */}

      <section
        id="contact"
        className="relative overflow-hidden px-6 py-20 sm:px-10 md:px-16 lg:px-20"
      >

        <div className="mx-auto max-w-7xl">

          <Reveal>

            <div className="relative overflow-hidden rounded-[40px] bg-[#8f3048] px-6 py-16 sm:px-10 sm:py-20 md:px-16 lg:px-20">

              <div className="modern-pulse absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#e8b7c2] opacity-30" />

              <div className="modern-float absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-[#e8b7c2] opacity-20" />

              <div className="relative z-10">

                <p className="text-base font-semibold sm:text-lg">
                  {role}
                </p>

                <AnimatedTitle className="mt-5 max-w-4xl text-5xl font-bold leading-[0.95] sm:text-6xl md:text-7xl lg:text-8xl">
                  Let's work together
                </AnimatedTitle>

                <p className="mt-6 max-w-xl text-base leading-7 sm:text-lg">
                  Have an idea, project, or opportunity? Let's create
                  something meaningful together.
                </p>

                <div className="mt-12 grid gap-6 text-base sm:grid-cols-2 sm:text-lg lg:grid-cols-3">

                  {email && (
                    <Reveal delay={150}>
                      <div>

                        <p className="font-semibold">
                          Email
                        </p>

                        <a
                          href={`mailto:${email}`}
                          className="modern-link mt-2 inline-block break-all"
                        >
                          {email}
                        </a>

                      </div>
                    </Reveal>
                  )}

                  <Reveal delay={250}>
                    <div>

                      <p className="font-semibold">
                        Social
                      </p>

                      <div className="mt-2 flex flex-wrap gap-4">

                        {socialLinks?.github && (
                          <a
                            href={socialLinks.github}
                            target="_blank"
                            rel="noreferrer"
                            className="modern-link"
                          >
                            GitHub
                          </a>
                        )}

                        {socialLinks?.linkedin && (
                          <a
                            href={socialLinks.linkedin}
                            target="_blank"
                            rel="noreferrer"
                            className="modern-link"
                          >
                            LinkedIn
                          </a>
                        )}

                      </div>

                    </div>
                  </Reveal>

                  <Reveal delay={350}>
                    <div>

                      <p className="font-semibold">
                        Role
                      </p>

                      <p className="mt-2">
                        {role}
                      </p>

                    </div>
                  </Reveal>

                </div>

              </div>

            </div>

          </Reveal>

        </div>

      </section>

      {/* ===================================================
          11. THANK YOU
      =================================================== */}

      <section className="relative overflow-hidden px-6 py-20 sm:px-10 md:px-16 lg:px-20">

        <div className="mx-auto max-w-7xl text-center">

          <Reveal>

            <div className="mx-auto h-3 w-3 rounded-full bg-[#e8b7c2] modern-pulse" />

            <p className="mt-8 text-base font-semibold sm:text-lg">
              {name}
            </p>

            <AnimatedTitle className="mt-4 text-5xl font-bold leading-none sm:text-6xl md:text-8xl">
              Thank You
            </AnimatedTitle>

            <p className="mx-auto mt-6 max-w-xl text-base leading-7 sm:text-lg">
              Thank you for taking the time to explore my portfolio.
            </p>

          </Reveal>

          <Reveal delay={250}>

            <div className="mt-10 border-t border-white/20 pt-6 text-sm text-white/70">
              © {new Date().getFullYear()} {name}. All rights reserved.
            </div>

          </Reveal>

        </div>

      </section>

    </div>
  );
}

export default ModernTemplate;