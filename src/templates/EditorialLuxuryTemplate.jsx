import { useEffect, useRef, useState } from "react";

const serif = {
  fontFamily: "'Cormorant Garamond', Georgia, serif",
};

const sans = {
  fontFamily: "Inter, system-ui, sans-serif",
};

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
    up: "translateY(50px)",
    down: "translateY(-40px)",
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
        transform: visible
          ? "translate3d(0,0,0) scale(1)"
          : transforms[direction],
        transition: `
          opacity 900ms ease ${delay}ms,
          transform 1000ms cubic-bezier(.16,1,.3,1) ${delay}ms
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
                : "translateY(115%)",
              transition: `
                opacity 700ms ease ${delay + index * 90}ms,
                transform 850ms cubic-bezier(.16,1,.3,1) ${
                  delay + index * 90
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
          transform: visible ? "scale(1)" : "scale(1.07)",
          transition: `
            opacity 1000ms ease ${delay}ms,
            transform 1300ms cubic-bezier(.16,1,.3,1) ${delay}ms
          `,
        }}
      >
        {children}
      </div>

      <div
        className="absolute inset-0 z-20 bg-stone-300"
        style={{
          transform: visible
            ? "translateX(101%)"
            : "translateX(0)",
          transition: `
            transform 1200ms cubic-bezier(.77,0,.18,1) ${delay}ms
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

    const rotateX = ((y / rect.height) - 0.5) * -5;
    const rotateY = ((x / rect.width) - 0.5) * 5;

    element.style.transform = `
      perspective(1000px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      translateY(-5px)
    `;
  };

  const handleLeave = () => {
    if (!ref.current) return;

    ref.current.style.transform =
      "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)";
  };

  return (
    <div
      ref={ref}
      className={className}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{
        transition:
          "transform 650ms cubic-bezier(.16,1,.3,1)",
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

const Img = ({
  src,
  alt,
  className = "",
}) =>
  src ? (
    <div className={`group overflow-hidden bg-stone-200 ${className}`}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="
          h-full
          w-full
          object-cover
          transition-transform
          duration-[1200ms]
          ease-[cubic-bezier(.16,1,.3,1)]
          group-hover:scale-[1.055]
        "
      />
    </div>
  ) : null;

/* =========================================================
   MAIN TEMPLATE
========================================================= */

function EditorialLuxuryTemplate({ portfolio }) {
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
  const [mouse, setMouse] = useState({
    x: 0,
    y: 0,
  });

  const link =
    "border-b border-stone-900/30 pb-0.5 transition-all duration-500 hover:border-stone-900 hover:opacity-60";

  /* =======================================================
     SCROLL PROGRESS
  ======================================================= */

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
      window.removeEventListener(
        "scroll",
        handleScroll
      );
  }, []);

  /* =======================================================
     CURSOR
  ======================================================= */

  useEffect(() => {
    const handleMouseMove = (event) => {
      setMouse({
        x: event.clientX,
        y: event.clientY,
      });
    };

    window.addEventListener(
      "mousemove",
      handleMouseMove
    );

    return () =>
      window.removeEventListener(
        "mousemove",
        handleMouseMove
      );
  }, []);

  return (
    <div
      style={sans}
      className="min-h-screen overflow-x-hidden bg-[#faf9f7] text-stone-900"
    >
      {/* ===================================================
          GLOBAL ANIMATION STYLES
      =================================================== */}

      <style>{`
        html {
          scroll-behavior: smooth;
        }

        ::selection {
          background: #1c1917;
          color: #faf9f7;
        }

        @keyframes editorialFloat {
          0%, 100% {
            transform: translate3d(0, 0, 0);
          }

          50% {
            transform: translate3d(0, -18px, 0);
          }
        }

        @keyframes editorialFloatSide {
          0%, 100% {
            transform: translate3d(0, 0, 0);
          }

          50% {
            transform: translate3d(18px, -10px, 0);
          }
        }

        @keyframes editorialPulse {
          0%, 100% {
            opacity: .08;
            transform: scale(1);
          }

          50% {
            opacity: .18;
            transform: scale(1.12);
          }
        }

        @keyframes editorialMarquee {
          from {
            transform: translateX(0);
          }

          to {
            transform: translateX(-50%);
          }
        }

        .editorial-float {
          animation:
            editorialFloat 8s ease-in-out infinite;
        }

        .editorial-float-side {
          animation:
            editorialFloatSide 11s ease-in-out infinite;
        }

        .editorial-pulse {
          animation:
            editorialPulse 6s ease-in-out infinite;
        }

        .editorial-marquee {
          animation:
            editorialMarquee 28s linear infinite;
        }

        .editorial-image {
          transition:
            transform 1200ms cubic-bezier(.16,1,.3,1),
            filter 700ms ease;
        }

        .editorial-image:hover {
          transform: scale(1.055);
          filter: contrast(1.03);
        }

        .editorial-row {
          transition:
            padding-left 500ms cubic-bezier(.16,1,.3,1),
            background 500ms ease;
        }

        .editorial-row:hover {
          padding-left: 12px;
          background: rgba(231,229,228,.3);
        }

        .editorial-link {
          position: relative;
        }

        .editorial-link::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: -5px;
          height: 1px;
          width: 100%;
          background: currentColor;
          transform: scaleX(0);
          transform-origin: right;
          transition:
            transform 450ms cubic-bezier(.16,1,.3,1);
        }

        .editorial-link:hover::after {
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
        className="fixed left-0 top-0 z-[100] h-[2px] bg-stone-900"
        style={{
          width: `${scrollProgress * 100}%`,
        }}
      />

      {/* ===================================================
          CURSOR GLOW
      =================================================== */}

      <div
        className="
          pointer-events-none
          fixed
          z-0
          hidden
          h-72
          w-72
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-stone-300/20
          blur-3xl
          md:block
        "
        style={{
          left: mouse.x,
          top: mouse.y,
          transition:
            "left 120ms ease-out, top 120ms ease-out",
        }}
      />

      {/* ===================================================
          AMBIENT DECORATION
      =================================================== */}

      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">

        <div className="editorial-float absolute left-[5%] top-[22%] h-32 w-32 rounded-full bg-stone-300/20 blur-3xl" />

        <div className="editorial-pulse absolute right-[8%] top-[48%] h-56 w-56 rounded-full bg-stone-400/20 blur-3xl" />

        <div
          className="editorial-float-side absolute bottom-[10%] left-[42%] h-40 w-40 rounded-full bg-stone-300/20 blur-3xl"
        />

      </div>

      {/* ===================================================
          HEADER
      =================================================== */}

      <header className="relative z-20 mx-auto flex max-w-7xl items-center justify-between border-b border-stone-300 px-5 py-5 text-sm sm:px-10">

        <Reveal direction="left">

          <a
            href="#top"
            className="editorial-link font-medium tracking-wide"
          >
            {name}
          </a>

        </Reveal>

        <Reveal direction="right">

          <nav
            aria-label="Primary"
            className="flex gap-5 sm:gap-8"
          >
            <a
              className={link}
              href="#about"
            >
              About
            </a>

            <a
              className={link}
              href="#philosophy"
            >
              Philosophy
            </a>

            <a
              className={link}
              href="#work"
            >
              Work
            </a>

            <a
              className={link}
              href="#contact"
            >
              Contact
            </a>
          </nav>

        </Reveal>

      </header>

      <main id="top" className="relative z-10">

        {/* =================================================
            1. HERO / PROFILE
        ================================================= */}

        <section className="mx-auto grid max-w-7xl gap-10 px-5 pb-20 pt-12 sm:px-10 lg:grid-cols-12 lg:pt-20">

          <Reveal
            direction="left"
            className="lg:col-span-7 lg:pt-10"
          >

            <p className="mb-6 text-sm text-stone-500">
              {role}
            </p>

            <p className="mb-4 text-xs uppercase tracking-[0.3em] text-stone-400">
              Portfolio
            </p>

            <AnimatedTitle
              style={serif}
              className="break-words text-6xl font-light leading-[0.95] sm:text-8xl xl:text-9xl"
              delay={100}
            >
              {name || "Your Name"}
            </AnimatedTitle>

            <p className="mt-8 max-w-xl text-base leading-relaxed text-stone-600 sm:text-lg">
              {about}
            </p>

            <div className="mt-8 flex flex-wrap gap-6 text-sm">

              <a
                className={link}
                href="#work"
              >
                Explore my work
              </a>

              <a
                className={link}
                href="#contact"
              >
                Get in touch
              </a>

            </div>

          </Reveal>

          {/* IMPORTANT:
              profileImage is used directly here.
          */}

          <Wipe
            delay={250}
            className="aspect-[4/5] lg:col-span-5 lg:mt-24"
          >

            <Img
              src={profileImage}
              alt={`Portrait of ${name}`}
              className="h-full w-full"
            />

          </Wipe>

        </section>

        {/* =================================================
            HERO MARQUEE
        ================================================= */}

        <div className="overflow-hidden border-y border-stone-300 py-4">

          <div className="editorial-marquee flex w-max">

            {[
              role,
              "Visual Direction",
              "Creative Practice",
              "Selected Work",
              role,
              "Visual Direction",
              "Creative Practice",
              "Selected Work",
            ].map((item, index) => (
              <span
                key={`${item}-${index}`}
                className="mx-8 whitespace-nowrap text-[10px] uppercase tracking-[0.3em] text-stone-400"
              >
                {item}
                <span className="ml-8 text-stone-900">
                  ✦
                </span>
              </span>
            ))}

          </div>

        </div>

        {/* =================================================
            2. ABOUT ME
        ================================================= */}

        <section
          id="about"
          className="mx-auto grid max-w-7xl gap-8 border-t border-stone-300 px-5 py-20 sm:px-10 lg:grid-cols-12"
        >

          <Reveal
            direction="left"
            className="lg:col-span-3"
          >

            <h2 className="text-sm text-stone-500">
              02 / About
            </h2>

          </Reveal>

          <Reveal
            direction="right"
            delay={100}
            className="lg:col-span-7 lg:col-start-5"
          >

            <h3
              style={serif}
              className="mb-6 text-4xl font-light sm:text-5xl"
            >
              About Me
            </h3>

            <p
              style={serif}
              className="text-3xl font-light leading-snug sm:text-4xl"
            >
              {about}
            </p>

          </Reveal>

        </section>

        {/* =================================================
            3. DESIGN PHILOSOPHY
        ================================================= */}

        <section
          id="philosophy"
          className="border-t border-stone-300 bg-stone-100"
        >

          <div className="mx-auto grid max-w-7xl gap-10 px-5 py-24 sm:px-10 lg:grid-cols-12 lg:items-center">

            <Reveal
              direction="left"
              className="lg:col-span-7"
            >

              <h2 className="mb-8 text-sm text-stone-500">
                03 / Design Philosophy
              </h2>

              {[
                designPhilosophy?.text1,
                designPhilosophy?.text2,
              ]
                .filter(Boolean)
                .map((text, index) => (
                  <Reveal
                    key={text}
                    delay={index * 140}
                  >

                    <p
                      style={serif}
                      className="
                        mb-6
                        text-4xl
                        font-light
                        italic
                        leading-tight
                        transition-transform
                        duration-700
                        hover:translate-x-3
                        sm:text-5xl
                      "
                    >
                      {text}
                    </p>

                  </Reveal>
                ))}

            </Reveal>

            <Wipe
              delay={200}
              className="aspect-square lg:col-span-4 lg:col-start-9"
            >

              <Img
                src={designPhilosophy?.image}
                alt="Design philosophy"
                className="h-full w-full"
              />

            </Wipe>

          </div>

        </section>

        {/* =================================================
            4. CORE VALUES
        ================================================= */}

        <section className="mx-auto max-w-7xl border-t border-stone-300 px-5 py-24 sm:px-10">

          <Reveal>

            <div className="mb-14">

              <h2 className="text-sm text-stone-500">
                04 / Core Values
              </h2>

              <AnimatedTitle
                style={serif}
                className="mt-4 text-5xl font-light sm:text-6xl"
              >
                What guides the work.
              </AnimatedTitle>

            </div>

          </Reveal>

          <div className="grid gap-8 md:grid-cols-2">

            <Tilt>

              <Reveal direction="left">

                <div>

                  <Wipe>

                    <Img
                      src={coreValues?.image1}
                      alt="Core value one"
                      className="aspect-[4/3]"
                    />

                  </Wipe>

                  <div className="mt-6 max-w-md">

                    <span className="text-xs text-stone-400">
                      01
                    </span>

                    <h4
                      style={serif}
                      className="mt-2 text-3xl transition-transform duration-500 hover:translate-x-2"
                    >
                      Purpose
                    </h4>

                    <p className="mt-3 text-sm leading-relaxed text-stone-600">
                      Every creative decision begins with meaning,
                      intention, and a clear purpose.
                    </p>

                  </div>

                </div>

              </Reveal>

            </Tilt>

            <Tilt>

              <Reveal
                direction="right"
                delay={150}
              >

                <div className="md:mt-20">

                  <Wipe delay={120}>

                    <Img
                      src={coreValues?.image2}
                      alt="Core value two"
                      className="aspect-[4/3]"
                    />

                  </Wipe>

                  <div className="mt-6 max-w-md">

                    <span className="text-xs text-stone-400">
                      02
                    </span>

                    <h4
                      style={serif}
                      className="mt-2 text-3xl transition-transform duration-500 hover:translate-x-2"
                    >
                      Clarity
                    </h4>

                    <p className="mt-3 text-sm leading-relaxed text-stone-600">
                      Simplicity creates space for ideas to communicate
                      clearly and naturally.
                    </p>

                  </div>

                </div>

              </Reveal>

            </Tilt>

          </div>

        </section>

        {/* =================================================
            5. FROM THOUGHT TO FORM
        ================================================= */}

        <section className="border-t border-stone-300">

          <div className="mx-auto max-w-7xl px-5 py-24 sm:px-10">

            <div className="grid gap-12 lg:grid-cols-12">

              <Reveal
                direction="left"
                className="lg:col-span-5"
              >

                <h2 className="text-sm text-stone-500">
                  05 / Process
                </h2>

                <AnimatedTitle
                  style={serif}
                  className="mt-5 text-5xl font-light leading-tight sm:text-6xl"
                >
                  From Thought to Form
                </AnimatedTitle>

              </Reveal>

              <div className="space-y-12 lg:col-span-6 lg:col-start-7">

                <Reveal direction="right">

                  <div className="editorial-row border-t border-stone-300 pt-6">

                    <span className="text-xs text-stone-400">
                      01
                    </span>

                    <h4
                      style={serif}
                      className="mt-3 text-3xl"
                    >
                      Exploration &amp; Discovery
                    </h4>

                    <p className="mt-3 max-w-lg text-sm leading-relaxed text-stone-600">
                      Transforming insights and inspiration into early
                      visual directions through research and exploration.
                    </p>

                  </div>

                </Reveal>

                <Reveal
                  direction="right"
                  delay={160}
                >

                  <div className="editorial-row border-t border-stone-300 pt-6">

                    <span className="text-xs text-stone-400">
                      02
                    </span>

                    <h4
                      style={serif}
                      className="mt-3 text-3xl"
                    >
                      Refinement &amp; Execution
                    </h4>

                    <p className="mt-3 max-w-lg text-sm leading-relaxed text-stone-600">
                      Developing each element with intention while
                      maintaining clarity, balance, and emotional impact.
                    </p>

                  </div>

                </Reveal>

              </div>

            </div>

          </div>

        </section>

        {/* =================================================
            6. FEATURED PROJECTS
        ================================================= */}

        <section
          id="work"
          className="mx-auto max-w-7xl border-t border-stone-300 px-5 py-20 sm:px-10"
        >

          <Reveal>

            <div className="mb-14">

              <h2 className="text-sm text-stone-500">
                06 / Featured Projects
              </h2>

              <AnimatedTitle
                style={serif}
                className="mt-4 text-5xl font-light sm:text-6xl"
              >
                Selected Work
              </AnimatedTitle>

            </div>

          </Reveal>

          <div className="space-y-20 sm:space-y-28">

            {projects?.slice(0, 3).map(
              (project, index) => {

                const flip = index % 2 === 1;

                return (
                  <Tilt
                    key={`${project.title}-${index}`}
                  >

                    <Reveal
                      direction={
                        flip ? "right" : "left"
                      }
                      delay={index * 120}
                    >

                      <article className="grid items-end gap-6 md:grid-cols-12">

                        <Wipe
                          className={`aspect-[4/3] md:col-span-8 ${
                            flip
                              ? "md:order-2"
                              : ""
                          }`}
                        >

                          <Img
                            src={project.image}
                            alt={project.title}
                            className="h-full w-full"
                          />

                        </Wipe>

                        <div
                          className={`md:col-span-4 ${
                            flip
                              ? "md:order-1 md:pr-6"
                              : "md:pl-6"
                          }`}
                        >

                          <p className="text-xs text-stone-400">
                            Project{" "}
                            {String(index + 1).padStart(
                              2,
                              "0"
                            )}
                          </p>

                          <h3
                            style={serif}
                            className="
                              mt-3
                              text-3xl
                              transition-transform
                              duration-500
                              hover:translate-x-2
                              sm:text-4xl
                            "
                          >
                            {project.title}
                          </h3>

                          <p className="mt-3 text-sm leading-relaxed text-stone-600">
                            {project.description}
                          </p>

                        </div>

                      </article>

                    </Reveal>

                  </Tilt>
                );
              }
            )}

          </div>

        </section>

        {/* =================================================
            PROJECT MARQUEE
        ================================================= */}

        {projects?.length > 0 && (
          <div className="overflow-hidden border-y border-stone-300 py-4">

            <div className="editorial-marquee flex w-max">

              {[
                ...projects,
                ...projects,
                ...projects,
              ].map((project, index) => (
                <span
                  key={`${project.title}-${index}`}
                  className="mx-8 whitespace-nowrap text-[10px] uppercase tracking-[0.3em] text-stone-400"
                >
                  {project.title}

                  <span className="ml-8 text-stone-900">
                    ✦
                  </span>
                </span>
              ))}

            </div>

          </div>
        )}

        {/* =================================================
            7. CASE STUDY
        ================================================= */}

        {caseStudy?.title && (

          <section className="border-t border-stone-300 bg-stone-100">

            <div className="mx-auto grid max-w-7xl gap-10 px-5 py-20 sm:px-10 lg:grid-cols-2 lg:items-center">

              <Wipe>

                <Img
                  src={caseStudy.image}
                  alt={caseStudy.title}
                  className="aspect-[5/4]"
                />

              </Wipe>

              <Reveal direction="right">

                <h2 className="mb-4 text-sm text-stone-500">
                  07 / Case Study
                </h2>

                <AnimatedTitle
                  style={serif}
                  className="text-5xl font-light sm:text-6xl"
                >
                  {caseStudy.title}
                </AnimatedTitle>

                <p className="mt-6 max-w-md leading-relaxed text-stone-600">
                  {caseStudy.description}
                </p>

                <div className="mt-8 h-px w-16 bg-stone-900 transition-all duration-700 hover:w-32" />

              </Reveal>

            </div>

          </section>

        )}

        {/* =================================================
            8. CREATIVE TOOLS
        ================================================= */}

        <section className="mx-auto max-w-7xl border-t border-stone-300 px-5 py-24 sm:px-10">

          <div className="grid gap-12 lg:grid-cols-12">

            <Reveal
              direction="left"
              className="lg:col-span-5"
            >

              <h2 className="text-sm text-stone-500">
                08 / Creative Tools
              </h2>

              <AnimatedTitle
                style={serif}
                className="mt-4 text-5xl font-light sm:text-6xl"
              >
                Tools behind the craft.
              </AnimatedTitle>

            </Reveal>

            <div className="lg:col-span-6 lg:col-start-7">

              <div className="border-t border-stone-300">

                {skills?.map(
                  (skill, index) => (
                    <Reveal
                      key={skill}
                      direction="right"
                      delay={index * 70}
                    >

                      <div className="editorial-row flex items-center justify-between border-b border-stone-300 py-5">

                        <span className="text-xs text-stone-400">
                          {String(index + 1).padStart(
                            2,
                            "0"
                          )}
                        </span>

                        <span className="text-lg">
                          {skill}
                        </span>

                      </div>

                    </Reveal>
                  )
                )}

              </div>

            </div>

          </div>

        </section>

        {/* =================================================
            SKILL MARQUEE
        ================================================= */}

        {skills?.length > 0 && (

          <div className="overflow-hidden border-y border-stone-300 py-4">

            <div className="editorial-marquee flex w-max">

              {[
                ...skills,
                ...skills,
                ...skills,
              ].map((skill, index) => (
                <span
                  key={`${skill}-${index}`}
                  className="mx-8 whitespace-nowrap text-[10px] uppercase tracking-[0.3em] text-stone-400"
                >
                  {skill}

                  <span className="ml-8 text-stone-900">
                    ✦
                  </span>
                </span>
              ))}

            </div>

          </div>

        )}

        {/* =================================================
            9. PERSONAL AESTHETIC
        ================================================= */}

        {personalAesthetic?.image && (

          <section className="border-t border-stone-300 bg-[#f0eeea]">

            <div className="mx-auto grid max-w-7xl gap-10 px-5 py-24 sm:px-10 lg:grid-cols-12 lg:items-center">

              <Reveal
                direction="left"
                className="lg:col-span-5"
              >

                <h2 className="text-sm text-stone-500">
                  09 / Personal Aesthetic
                </h2>

                <AnimatedTitle
                  style={serif}
                  className="mt-4 text-5xl font-light leading-tight sm:text-6xl"
                >
                  A visual language of my own.
                </AnimatedTitle>

                <p className="mt-6 max-w-md leading-relaxed text-stone-600">
                  A balance between structure, emotion, simplicity,
                  and carefully considered details.
                </p>

              </Reveal>

              <Wipe
                delay={180}
                className="aspect-[4/3] lg:col-span-6 lg:col-start-7"
              >

                <Img
                  src={personalAesthetic.image}
                  alt="Personal aesthetic"
                  className="h-full w-full"
                />

              </Wipe>

            </div>

          </section>

        )}

        {/* =================================================
            10. CONTACT
        ================================================= */}

        <section
          id="contact"
          className="border-t border-stone-300"
        >

          <div className="mx-auto max-w-7xl px-5 py-24 sm:px-10">

            <Reveal>

              <h2 className="text-sm text-stone-500">
                10 / Contact &amp; Social Links
              </h2>

              <AnimatedTitle
                style={serif}
                className="mt-5 max-w-4xl text-5xl font-light leading-tight sm:text-7xl"
              >
                Let's create something meaningful together.
              </AnimatedTitle>

            </Reveal>

            {email && (

              <Reveal
                direction="left"
                delay={180}
              >

                <a
                  href={`mailto:${email}`}
                  style={serif}
                  className="
                    mt-12
                    block
                    break-all
                    text-3xl
                    font-light
                    transition-all
                    duration-700
                    hover:translate-x-3
                    hover:opacity-60
                    sm:text-5xl
                  "
                >
                  {email}
                </a>

              </Reveal>

            )}

            <Reveal delay={300}>

              <div className="mt-8 flex gap-6 text-sm">

                {socialLinks?.github && (
                  <a
                    className={link}
                    href={socialLinks.github}
                    target="_blank"
                    rel="noreferrer"
                  >
                    GitHub
                  </a>
                )}

                {socialLinks?.linkedin && (
                  <a
                    className={link}
                    href={socialLinks.linkedin}
                    target="_blank"
                    rel="noreferrer"
                  >
                    LinkedIn
                  </a>
                )}

              </div>

            </Reveal>

          </div>

        </section>

        {/* =================================================
            11. THANK YOU
        ================================================= */}

        <section className="border-t border-stone-300">

          <div className="mx-auto max-w-7xl px-5 py-20 text-center sm:px-10">

            <Reveal>

              <p className="text-xs uppercase tracking-[0.3em] text-stone-400">
                11 / End
              </p>

              <AnimatedTitle
                style={serif}
                className="mt-5 text-5xl font-light sm:text-7xl"
              >
                Thank You
              </AnimatedTitle>

              <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-stone-500">
                Thank you for taking the time to explore my portfolio
                and creative work.
              </p>

              <div className="mx-auto mt-10 h-px w-20 bg-stone-900 transition-all duration-700 hover:w-40" />

            </Reveal>

            <Reveal delay={250}>

              <p className="mt-6 text-xs text-stone-400">
                © {new Date().getFullYear()} {name}. All rights reserved.
              </p>

            </Reveal>

          </div>

        </section>

      </main>
    </div>
  );
}

export default EditorialLuxuryTemplate;