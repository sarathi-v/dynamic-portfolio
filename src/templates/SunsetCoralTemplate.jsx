import { useEffect, useRef, useState } from "react";
import { Img, Links, philosophy } from "./sharedColorful";

const tints = ["bg-[#ff6b4a]", "bg-[#ffc857]", "bg-[#8e5ea2]"];

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
   WORD TITLE ANIMATION
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
        className="pointer-events-none absolute inset-0 bg-[#fff4ec]"
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
   TILT CARD
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

function SunsetCoralTemplate({ portfolio: p }) {
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
          ANIMATION STYLES
      =================================================== */}

      <style>{`
        @keyframes sunsetFloat {
          0%, 100% {
            transform: translate3d(0, 0, 0);
          }

          50% {
            transform: translate3d(0, -15px, 0);
          }
        }

        @keyframes sunsetPulse {
          0%, 100% {
            opacity: .15;
            transform: scale(1);
          }

          50% {
            opacity: .3;
            transform: scale(1.1);
          }
        }

        @keyframes sunsetMarquee {
          from {
            transform: translateX(0);
          }

          to {
            transform: translateX(-50%);
          }
        }

        @keyframes sunsetShimmer {
          0% {
            transform: translateX(-100%);
          }

          100% {
            transform: translateX(100%);
          }
        }

        .sunset-float {
          animation: sunsetFloat 6s ease-in-out infinite;
        }

        .sunset-pulse {
          animation: sunsetPulse 5s ease-in-out infinite;
        }

        .sunset-marquee {
          animation: sunsetMarquee 20s linear infinite;
        }

        .sunset-project-image {
          transition:
            transform 900ms cubic-bezier(.22,1,.36,1),
            filter 500ms ease;
        }

        .sunset-project:hover .sunset-project-image {
          transform: scale(1.08);
          filter: saturate(1.1);
        }

        .sunset-button {
          transition:
            transform 300ms ease,
            box-shadow 300ms ease;
        }

        .sunset-button:hover {
          transform: translateY(-4px);
          box-shadow:
            0 15px 35px rgba(59,29,74,.18);
        }

        .sunset-tool {
          transition:
            transform 300ms ease,
            box-shadow 300ms ease;
        }

        .sunset-tool:hover {
          transform: translateY(-5px);
          box-shadow:
            0 15px 30px rgba(59,29,74,.12);
        }

        .sunset-image-hover {
          transition:
            transform 800ms cubic-bezier(.22,1,.36,1);
        }

        .sunset-image-container:hover
        .sunset-image-hover {
          transform: scale(1.06);
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
        className="fixed left-0 top-0 z-[999] h-1 origin-left bg-[#ff6b4a]"
        style={{
          width: "100%",
          transform: `scaleX(${scrollProgress})`,
        }}
      />

      {/* ===================================================
          CURSOR GLOW
      =================================================== */}

      <div
        className="pointer-events-none fixed z-[1] hidden h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ff6b4a]/10 blur-3xl md:block"
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
        className="relative min-h-screen overflow-x-hidden bg-[#fff4ec] text-[#3b1d4a]"
      >
        {/* Ambient blobs */}

        <div className="pointer-events-none fixed left-[5%] top-[18%] z-0 h-40 w-40 rounded-full bg-[#ffc857]/20 blur-3xl sunset-pulse" />

        <div
          className="pointer-events-none fixed bottom-[12%] right-[5%] z-0 h-48 w-48 rounded-full bg-[#8e5ea2]/10 blur-3xl sunset-pulse"
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
            <span className="font-semibold">
              {p.name}
            </span>

            <nav className="flex gap-5 text-sm font-medium">
              <a
                href="#about"
                className="transition hover:text-[#ff6b4a]"
              >
                About
              </a>

              <a
                href="#work"
                className="transition hover:text-[#ff6b4a]"
              >
                Work
              </a>

              <a
                href="#contact"
                className="transition hover:text-[#ff6b4a]"
              >
                Contact
              </a>
            </nav>
          </header>
        </Reveal>

        <main className="relative z-10">

          {/* =================================================
              1. HERO / PROFILE
          ================================================= */}

          <section className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-10 md:grid-cols-2 md:py-20">
            <Reveal direction="left">
              <div>
                <span className="inline-block rounded-full bg-[#ffc857] px-4 py-1 text-sm font-medium">
                  {p.role}
                </span>

                <h1 className="mt-5 break-words text-5xl font-extrabold leading-none sm:text-7xl">
                  <AnimatedTitle>
                    {p.name}
                  </AnimatedTitle>
                </h1>

                <p className="mt-6 max-w-md text-lg leading-relaxed text-[#3b1d4a]/80">
                  {p.about}
                </p>

                <div className="mt-8 flex flex-wrap gap-3 text-sm font-semibold">
                  <a
                    href="#work"
                    className="sunset-button rounded-full bg-[#ff6b4a] px-6 py-3 text-white"
                  >
                    See my work
                  </a>

                  <a
                    href="#contact"
                    className="sunset-button rounded-full border-2 border-[#3b1d4a] px-6 py-3"
                  >
                    Say hello
                  </a>
                </div>
              </div>
            </Reveal>

            <Reveal
              direction="right"
              delay={150}
            >
              <div className="relative mx-auto w-full max-w-sm">
                <div
                  className="absolute -right-4 -top-4 h-32 w-32 rounded-full bg-[#ffc857] sunset-float"
                  aria-hidden="true"
                />

                <div className="sunset-image-container overflow-hidden rounded-t-full">
                  <Img
                    src={p.profileImage}
                    alt={`Portrait of ${p.name}`}
                    className="sunset-image-hover relative aspect-[3/4] w-full"
                  />
                </div>
              </div>
            </Reveal>
          </section>

          {/* =================================================
              SKILLS STRIP
          ================================================= */}

          {p.skills?.length > 0 && (
            <Reveal direction="up">
              <div className="overflow-hidden bg-[#3b1d4a] py-4 text-[#fff4ec]">
                <div className="sunset-marquee flex w-max">
                  {[
                    ...p.skills,
                    ...p.skills,
                    ...p.skills,
                  ].map((skill, index) => (
                    <span
                      key={`${skill}-${index}`}
                      className="mx-5 text-sm font-medium"
                    >
                      ✦ {skill}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          )}

          {/* =================================================
              2. ABOUT ME
          ================================================= */}

          <Reveal
            direction="up"
            className="mx-auto max-w-6xl px-5 py-20"
          >
            <section
              id="about"
              className="grid gap-10 md:grid-cols-2 md:items-center"
            >
              <div>
                <p className="text-sm font-semibold uppercase tracking-widest text-[#ff6b4a]">
                  About me
                </p>

                <h2 className="mt-3 text-4xl font-extrabold sm:text-5xl">
                  <AnimatedTitle>
                    A little bit about who I am
                  </AnimatedTitle>
                </h2>
              </div>

              <p className="text-lg leading-relaxed text-[#3b1d4a]/80">
                {p.about}
              </p>
            </section>
          </Reveal>

          {/* =================================================
              3. DESIGN PHILOSOPHY
          ================================================= */}

          <section className="bg-[#ffc857]">
            <div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 md:grid-cols-2 md:items-center">
              <Reveal direction="left">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-widest">
                    Design philosophy
                  </p>

                  <div className="mt-6 space-y-4 text-3xl font-extrabold leading-tight sm:text-5xl">
                    {philosophy(p).map(
                      (text, index) => (
                        <p
                          key={text}
                          style={{
                            opacity: 0,
                            animation:
                              "sunsetReveal 700ms ease forwards",
                            animationDelay: `${
                              index * 160
                            }ms`,
                          }}
                        >
                          {text}
                        </p>
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
                  className="aspect-[4/3] w-full rounded-3xl"
                />
              </Reveal>
            </div>
          </section>

          {/* =================================================
              4. CORE VALUES
          ================================================= */}

          <Reveal
            direction="up"
            className="mx-auto max-w-6xl px-5 py-20"
          >
            <section>
              <div className="mb-10">
                <p className="text-sm font-semibold uppercase tracking-widest text-[#ff6b4a]">
                  Core values
                </p>

                <h2 className="mt-3 text-4xl font-extrabold sm:text-5xl">
                  <AnimatedTitle>
                    What guides my work
                  </AnimatedTitle>
                </h2>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <Tilt>
                  <div className="overflow-hidden rounded-3xl bg-[#ff6b4a] p-6">
                    <div className="overflow-hidden rounded-2xl">
                      <Img
                        src={p.coreValues?.image1}
                        alt="Core value one"
                        className="aspect-[4/3] w-full transition duration-700 hover:scale-105"
                      />
                    </div>

                    <h3 className="mt-5 text-2xl font-bold text-white">
                      Value &amp; Purpose
                    </h3>
                  </div>
                </Tilt>

                <Tilt>
                  <div className="overflow-hidden rounded-3xl bg-[#8e5ea2] p-6 text-white md:mt-10">
                    <div className="overflow-hidden rounded-2xl">
                      <Img
                        src={p.coreValues?.image2}
                        alt="Core value two"
                        className="aspect-[4/3] w-full transition duration-700 hover:scale-105"
                      />
                    </div>

                    <h3 className="mt-5 text-2xl font-bold">
                      Creativity &amp; Clarity
                    </h3>
                  </div>
                </Tilt>
              </div>
            </section>
          </Reveal>

          {/* =================================================
              5. FROM THOUGHT TO FORM
          ================================================= */}

          <section className="bg-[#3b1d4a] text-[#fff4ec]">
            <div className="mx-auto max-w-6xl px-5 py-20">
              <div className="grid gap-10 md:grid-cols-[1fr_1.5fr] md:items-center">
                <Reveal direction="left">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-widest text-[#ffc857]">
                      From thought to form
                    </p>

                    <h2 className="mt-4 text-4xl font-extrabold leading-tight sm:text-5xl">
                      <AnimatedTitle>
                        Turning ideas into meaningful digital experiences.
                      </AnimatedTitle>
                    </h2>
                  </div>
                </Reveal>

                <div className="grid gap-5 sm:grid-cols-3">
                  {[
                    {
                      number: "01",
                      title: "Think",
                      text: "Understand the idea, purpose, and people behind it.",
                      color: "bg-[#ff6b4a]",
                    },
                    {
                      number: "02",
                      title: "Shape",
                      text: "Transform concepts into clear visual directions.",
                      color: "bg-[#ffc857] text-[#3b1d4a]",
                    },
                    {
                      number: "03",
                      title: "Create",
                      text: "Build polished experiences with purpose and detail.",
                      color: "bg-[#8e5ea2]",
                    },
                  ].map((item, index) => (
                    <Reveal
                      key={item.number}
                      direction="up"
                      delay={index * 120}
                    >
                      <Tilt>
                        <div
                          className={`rounded-3xl p-6 ${item.color}`}
                        >
                          <span className="text-3xl font-extrabold">
                            {item.number}
                          </span>

                          <h3 className="mt-8 font-bold">
                            {item.title}
                          </h3>

                          <p className="mt-2 text-sm opacity-90">
                            {item.text}
                          </p>
                        </div>
                      </Tilt>
                    </Reveal>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* =================================================
              6. FEATURED PROJECTS
          ================================================= */}

          {p.projects?.length > 0 && (
            <Reveal
              direction="up"
              className="mx-auto max-w-6xl px-5 py-20"
            >
              <section id="work">
                <div className="mb-10">
                  <p className="text-sm font-semibold uppercase tracking-widest text-[#ff6b4a]">
                    Featured projects
                  </p>

                  <h2 className="mt-3 text-4xl font-extrabold sm:text-5xl">
                    <AnimatedTitle>
                      Selected projects
                    </AnimatedTitle>
                  </h2>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {p.projects
                    .slice(0, 3)
                    .map((project, index) => (
                      <Reveal
                        key={index}
                        direction="up"
                        delay={index * 120}
                      >
                        <Tilt>
                          <article
                            className={`sunset-project group overflow-hidden rounded-3xl ${
                              tints[index % 3]
                            } ${
                              index % 3 === 2
                                ? "text-white"
                                : "text-[#3b1d4a]"
                            }`}
                          >
                            <div className="overflow-hidden">
                              <Img
                                src={project.image}
                                alt={project.title}
                                className="sunset-project-image aspect-[4/3] w-full"
                              />
                            </div>

                            <div className="p-5">
                              <p className="text-xs font-bold uppercase tracking-widest opacity-70">
                                Project {index + 1}
                              </p>

                              <h3 className="mt-2 text-xl font-bold">
                                {project.title}
                              </h3>

                              <p className="mt-2 text-sm opacity-90">
                                {project.description}
                              </p>
                            </div>
                          </article>
                        </Tilt>
                      </Reveal>
                    ))}
                </div>
              </section>
            </Reveal>
          )}

          {/* =================================================
              7. CASE STUDY
          ================================================= */}

          {p.caseStudy?.title && (
            <section className="bg-[#ff6b4a] text-white">
              <div className="mx-auto grid max-w-6xl items-center gap-8 px-5 py-20 md:grid-cols-2">
                <Reveal direction="left">
                  <Wipe
                    src={p.caseStudy.image}
                    alt={p.caseStudy.title}
                    className="aspect-[4/3] w-full rounded-3xl"
                  />
                </Reveal>

                <Reveal
                  direction="right"
                  delay={120}
                >
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-widest">
                      Case study
                    </p>

                    <h2 className="mt-3 text-4xl font-extrabold sm:text-5xl">
                      <AnimatedTitle>
                        {p.caseStudy.title}
                      </AnimatedTitle>
                    </h2>

                    <p className="mt-5 max-w-md leading-relaxed">
                      {p.caseStudy.description}
                    </p>
                  </div>
                </Reveal>
              </div>
            </section>
          )}

          {/* =================================================
              8. CREATIVE TOOLS
          ================================================= */}

          {p.skills?.length > 0 && (
            <Reveal
              direction="up"
              className="mx-auto max-w-6xl px-5 py-20"
            >
              <section>
                <div className="grid gap-10 md:grid-cols-2 md:items-center">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-widest text-[#ff6b4a]">
                      Creative tools
                    </p>

                    <h2 className="mt-3 text-4xl font-extrabold sm:text-5xl">
                      <AnimatedTitle>
                        Tools I use to bring ideas to life.
                      </AnimatedTitle>
                    </h2>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    {p.skills.map(
                      (skill, index) => (
                        <Reveal
                          key={skill}
                          direction="zoom"
                          delay={index * 60}
                        >
                          <span
                            className={`sunset-tool inline-block rounded-full px-5 py-3 text-sm font-semibold ${
                              tints[index % 3]
                            } ${
                              index % 3 === 2
                                ? "text-white"
                                : "text-[#3b1d4a]"
                            }`}
                          >
                            {skill}
                          </span>
                        </Reveal>
                      )
                    )}
                  </div>
                </div>
              </section>
            </Reveal>
          )}

          {/* =================================================
              9. PERSONAL AESTHETIC
          ================================================= */}

          {p.personalAesthetic?.image && (
            <section className="bg-[#8e5ea2] text-white">
              <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-20 md:grid-cols-2">
                <Reveal direction="left">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-widest text-[#ffc857]">
                      Personal aesthetic
                    </p>

                    <h2 className="mt-3 text-4xl font-extrabold sm:text-5xl">
                      <AnimatedTitle>
                        A visual language that feels uniquely mine.
                      </AnimatedTitle>
                    </h2>

                    <p className="mt-5 max-w-md leading-relaxed text-white/85">
                      I believe good design should feel intentional,
                      expressive, and memorable.
                    </p>
                  </div>
                </Reveal>

                <Reveal
                  direction="right"
                  delay={100}
                >
                  <Wipe
                    src={p.personalAesthetic.image}
                    alt="Personal aesthetic"
                    className="aspect-[4/3] w-full rounded-3xl"
                  />
                </Reveal>
              </div>
            </section>
          )}

          {/* =================================================
              10. CONTACT
          ================================================= */}

          <Reveal direction="zoom">
            <section
              id="contact"
              className="bg-[#3b1d4a] text-[#fff4ec]"
            >
              <div className="mx-auto max-w-6xl px-5 py-20">
                <p className="text-sm font-semibold uppercase tracking-widest text-[#ffc857]">
                  Contact &amp; social links
                </p>

                <h2 className="mt-3 text-4xl font-extrabold sm:text-6xl">
                  <AnimatedTitle>
                    Let's work together
                  </AnimatedTitle>
                </h2>

                <p className="mt-5 max-w-xl text-lg text-white/75">
                  Have an idea, project, or opportunity? Let's start a
                  conversation.
                </p>

                <div className="mt-8 flex flex-wrap gap-3 text-sm font-semibold">
                  <Links
                    portfolio={p}
                    className="sunset-button rounded-full bg-[#ffc857] px-5 py-3 text-[#3b1d4a]"
                  />
                </div>
              </div>
            </section>
          </Reveal>

          {/* =================================================
              11. THANK YOU
          ================================================= */}

          <Reveal direction="up">
            <section className="bg-[#fff4ec]">
              <div className="mx-auto max-w-6xl px-5 py-16 text-center">
                <div className="mx-auto mb-5 h-4 w-4 rounded-full bg-[#ff6b4a] sunset-pulse" />

                <h2 className="text-3xl font-extrabold sm:text-4xl">
                  <AnimatedTitle>
                    Thank you for visiting.
                  </AnimatedTitle>
                </h2>

                <p className="mx-auto mt-3 max-w-lg text-[#3b1d4a]/70">
                  Thanks for taking the time to explore my portfolio
                  and creative work.
                </p>
              </div>
            </section>
          </Reveal>
        </main>

        {/* ===================================================
            FOOTER
        =================================================== */}

        <Reveal direction="up">
          <footer className="border-t border-[#3b1d4a]/10 bg-[#fff4ec]">
            <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-6 text-sm sm:flex-row sm:items-center sm:justify-between">
              <span className="font-semibold">
                {p.name}
              </span>

              <span className="text-[#3b1d4a]/60">
                © {new Date().getFullYear()} All rights reserved.
              </span>
            </div>
          </footer>
        </Reveal>
      </div>
    </>
  );
}

export default SunsetCoralTemplate;