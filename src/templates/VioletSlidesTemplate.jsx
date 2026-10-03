import { useEffect, useRef, useState } from "react";
import { Img, Links, philosophy, pick } from "./sharedColorful";

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
    zoom: "scale(0.88)",
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translate(0) scale(1)" : transforms[direction],
        transition: `opacity 800ms ease ${delay}ms, transform 900ms cubic-bezier(.2,.8,.2,1) ${delay}ms`,
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
    <h2
      ref={ref}
      className={className}
      aria-label={children}
    >
      {words.map((word, index) => (
        <span
          key={`${word}-${index}`}
          className="inline-block overflow-hidden align-bottom mr-[0.22em]"
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
          transition: `opacity 900ms ease ${delay}ms, transform 1100ms cubic-bezier(.2,.8,.2,1) ${delay}ms`,
        }}
      >
        {children}
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[#f0abfc]"
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
      rotateX(${y * -7}deg)
      rotateY(${x * 7}deg)
      translateY(-4px)
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
   SLIDE COMPONENT
========================================================= */

const Slide = ({
  name,
  id,
  children,
  className = "",
  delay = 0,
}) => (
  <Reveal
    direction="up"
    delay={delay}
    className="mx-auto max-w-6xl"
  >
    <section
      id={id}
      className={`group mx-auto max-w-6xl rounded-2xl bg-[#4c1d95] text-white shadow-xl transition-shadow duration-700 hover:shadow-2xl ${className}`}
    >
      <div className="flex justify-between px-6 pt-5 text-xs font-semibold text-violet-200">
        <span className="transition-colors duration-300 group-hover:text-[#f0abfc]">
          {name}
        </span>

        <span>Portfolio</span>
      </div>

      {children}
    </section>
  </Reveal>
);

/* =========================================================
   MAIN TEMPLATE
========================================================= */

function VioletSlidesTemplate({ portfolio: p }) {
  const hero = pick(
    p.personalAesthetic?.image,
    p.caseStudy?.image,
    p.profileImage
  );

  const [scrollProgress, setScrollProgress] = useState(0);
  const [cursor, setCursor] = useState({
    x: -100,
    y: -100,
  });

  /* -------------------------------------------------------
     SCROLL PROGRESS
  ------------------------------------------------------- */

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;

      const height =
        document.documentElement.scrollHeight -
        window.innerHeight;

      const progress =
        height > 0 ? scrollTop / height : 0;

      setScrollProgress(progress);
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

  /* -------------------------------------------------------
     CURSOR GLOW
  ------------------------------------------------------- */

  useEffect(() => {
    const move = (event) => {
      setCursor({
        x: event.clientX,
        y: event.clientY,
      });
    };

    window.addEventListener("pointermove", move);

    return () =>
      window.removeEventListener(
        "pointermove",
        move
      );
  }, []);

  return (
    <div
      style={{
        fontFamily: "Poppins, system-ui, sans-serif",
      }}
      className="violet-slides-page min-h-screen space-y-6 overflow-x-hidden bg-[#ddd6fe] px-3 py-6 sm:px-6"
    >
      {/* =====================================================
          GLOBAL STYLE
      ===================================================== */}

      <style>{`
        @keyframes violetFloat {
          0%, 100% {
            transform: translate3d(0, 0, 0);
          }
          50% {
            transform: translate3d(0, -18px, 0);
          }
        }

        @keyframes violetPulse {
          0%, 100% {
            opacity: .18;
            transform: scale(1);
          }
          50% {
            opacity: .32;
            transform: scale(1.08);
          }
        }

        @keyframes violetMarquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @keyframes violetShine {
          0% {
            transform: translateX(-120%);
          }
          100% {
            transform: translateX(120%);
          }
        }

        .violet-image {
          transition:
            transform 700ms cubic-bezier(.2,.8,.2,1),
            filter 500ms ease;
        }

        .violet-image:hover {
          transform: scale(1.045);
          filter: saturate(1.08);
        }

        .violet-project {
          transition:
            transform 450ms cubic-bezier(.2,.8,.2,1),
            box-shadow 450ms ease;
        }

        .violet-project:hover {
          box-shadow: 0 25px 55px rgba(46,16,101,.25);
        }

        .violet-tool {
          transition:
            transform 350ms ease,
            box-shadow 350ms ease;
        }

        .violet-tool:hover {
          transform: translateY(-7px) rotate(-1deg);
          box-shadow: 0 18px 35px rgba(46,16,101,.22);
        }

        .violet-button {
          transition:
            transform 300ms ease,
            box-shadow 300ms ease,
            background-color 300ms ease;
        }

        .violet-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 28px rgba(240,171,252,.25);
        }

        .violet-line {
          position: relative;
          overflow: hidden;
        }

        .violet-line::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: 0;
          height: 2px;
          width: 100%;
          background: #f0abfc;
          transform: translateX(-105%);
          transition: transform 700ms cubic-bezier(.77,0,.18,1);
        }

        .violet-line:hover::after {
          transform: translateX(0);
        }

        .violet-shine {
          position: relative;
          overflow: hidden;
        }

        .violet-shine::after {
          content: "";
          position: absolute;
          inset: 0;
          width: 40%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255,255,255,.22),
            transparent
          );
          transform: translateX(-140%);
          transition: transform 900ms ease;
        }

        .violet-shine:hover::after {
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
        className="fixed left-0 top-0 z-[9999] h-1 bg-[#f0abfc]"
        style={{
          width: `${scrollProgress * 100}%`,
          boxShadow:
            "0 0 15px rgba(240,171,252,.8)",
        }}
      />

      {/* =====================================================
          CURSOR GLOW
      ===================================================== */}

      <div
        aria-hidden="true"
        className="pointer-events-none fixed z-[9998] hidden h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#f0abfc]/10 blur-3xl md:block"
        style={{
          left: cursor.x,
          top: cursor.y,
        }}
      />

      {/* =====================================================
          AMBIENT FLOATING LIGHTS
      ===================================================== */}

      <div
        aria-hidden="true"
        className="pointer-events-none fixed left-[5%] top-[15%] z-0 h-28 w-28 rounded-full bg-[#a78bfa]/30 blur-3xl"
        style={{
          animation:
            "violetFloat 7s ease-in-out infinite",
        }}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none fixed right-[4%] top-[55%] z-0 h-40 w-40 rounded-full bg-[#f0abfc]/20 blur-3xl"
        style={{
          animation:
            "violetPulse 8s ease-in-out infinite",
        }}
      />

      {/* =====================================================
          1. HERO / PROFILE
      ===================================================== */}

      <Slide name={p.name} delay={0}>
        <div className="grid items-center gap-8 p-6 sm:p-12 md:grid-cols-2">
          <div>
            <Reveal direction="left" delay={150}>
              <p className="text-sm font-semibold text-[#f0abfc]">
                {p.role}
              </p>
            </Reveal>

            <AnimatedTitle
              className="mt-1 break-words text-5xl font-extrabold leading-tight sm:text-6xl"
              delay={250}
            >
              {p.name}
            </AnimatedTitle>

            <Reveal direction="left" delay={450}>
              <div className="my-5 h-1 w-16 bg-[#e8dcc8] transition-all duration-700 hover:w-32" />
            </Reveal>

            <Reveal direction="up" delay={550}>
              <p className="max-w-lg text-sm leading-relaxed text-violet-100">
                {p.about}
              </p>
            </Reveal>
          </div>

          <Wipe delay={250}>
            <div className="relative">
              <div
                className="absolute -bottom-3 -right-3 h-full w-full bg-[#e8dcc8] transition-transform duration-500 group-hover:translate-x-2 group-hover:translate-y-2"
                aria-hidden="true"
              />

              <Img
                src={hero}
                alt="Featured visual"
                className="violet-image relative aspect-[4/3] w-full"
              />
            </div>
          </Wipe>
        </div>
      </Slide>

      {/* =====================================================
          2. ABOUT ME
      ===================================================== */}

      <Slide
        name={p.name}
        id="about"
        delay={100}
      >
        <div className="grid items-center gap-8 p-6 sm:p-12 md:grid-cols-3">
          <Reveal direction="left">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[#f0abfc]">
                About
              </p>

              <AnimatedTitle className="mt-2 text-3xl font-extrabold">
                About me
              </AnimatedTitle>

              <p className="mt-4 text-sm leading-relaxed text-violet-100">
                {p.about}
              </p>
            </div>
          </Reveal>

          <Wipe delay={200}>
            <div className="bg-[#e8dcc8] p-3">
              <Img
                src={p.profileImage}
                alt={`Portrait of ${p.name}`}
                className="violet-image aspect-[3/4] w-full"
              />
            </div>
          </Wipe>

          {p.skills?.length > 0 && (
            <Reveal direction="right" delay={300}>
              <ul className="space-y-2 text-sm">
                {p.skills.map((s, i) => (
                  <li
                    key={s}
                    className="violet-line border-l-4 border-[#f0abfc] pl-3 transition-transform duration-300 hover:translate-x-2"
                    style={{
                      transitionDelay: `${i * 40}ms`,
                    }}
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </Reveal>
          )}
        </div>
      </Slide>

      {/* =====================================================
          3. DESIGN PHILOSOPHY
      ===================================================== */}

      {philosophy(p).length > 0 && (
        <Slide
          name={p.name}
          id="philosophy"
          delay={150}
        >
          <div className="grid items-center gap-8 p-6 sm:p-12 md:grid-cols-2">
            <div>
              <Reveal direction="left">
                <p className="text-xs font-semibold uppercase tracking-widest text-[#f0abfc]">
                  Design Philosophy
                </p>
              </Reveal>

              <AnimatedTitle className="mt-2 text-4xl font-extrabold">
                How I think.
              </AnimatedTitle>

              <div className="mt-6 space-y-4">
                {philosophy(p).map((text, i) => (
                  <Reveal
                    key={text}
                    direction={i % 2 === 0 ? "left" : "right"}
                    delay={150 + i * 120}
                  >
                    <p
                      className={`violet-shine rounded-xl p-4 text-xl font-semibold ${
                        i % 2 === 0
                          ? "bg-[#5b21b6]"
                          : "bg-[#6d28d9]"
                      }`}
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
                className="violet-image aspect-[4/3] w-full"
              />
            </Wipe>
          </div>
        </Slide>
      )}

      {/* =====================================================
          4. CORE VALUES
      ===================================================== */}

      <Slide
        name={p.name}
        id="values"
        delay={200}
      >
        <div className="p-6 sm:p-12">
          <Reveal direction="left">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#f0abfc]">
              Core Values
            </p>
          </Reveal>

          <AnimatedTitle className="mt-2 text-4xl font-extrabold">
            What I value.
          </AnimatedTitle>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <Reveal direction="left">
              <Tilt className="violet-project overflow-hidden bg-white text-[#2e1065]">
                <Wipe>
                  <Img
                    src={p.coreValues?.image1}
                    alt="Core value one"
                    className="violet-image aspect-[4/3] w-full"
                  />
                </Wipe>

                <div className="p-5">
                  <h3 className="text-2xl font-bold">
                    Value One
                  </h3>

                  <p className="mt-2 text-sm text-violet-800">
                    Thoughtful work with purpose and clarity.
                  </p>
                </div>
              </Tilt>
            </Reveal>

            <Reveal direction="right" delay={150}>
              <Tilt className="violet-project overflow-hidden bg-white text-[#2e1065]">
                <Wipe delay={150}>
                  <Img
                    src={p.coreValues?.image2}
                    alt="Core value two"
                    className="violet-image aspect-[4/3] w-full"
                  />
                </Wipe>

                <div className="p-5">
                  <h3 className="text-2xl font-bold">
                    Value Two
                  </h3>

                  <p className="mt-2 text-sm text-violet-800">
                    Meaningful experiences built with care.
                  </p>
                </div>
              </Tilt>
            </Reveal>
          </div>
        </div>
      </Slide>

      {/* =====================================================
          5. FROM THOUGHT TO FORM
      ===================================================== */}

      <Slide name={p.name} delay={250}>
        <Reveal direction="zoom">
          <div className="relative overflow-hidden p-6 sm:p-12">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute right-10 top-10 h-32 w-32 rounded-full bg-[#f0abfc]/20 blur-3xl"
              style={{
                animation:
                  "violetPulse 6s ease-in-out infinite",
              }}
            />

            <p className="relative text-xs font-semibold uppercase tracking-widest text-[#f0abfc]">
              From Thought to Form
            </p>

            <AnimatedTitle className="relative mt-4 max-w-4xl text-4xl font-extrabold leading-tight sm:text-6xl">
              Turning ideas into meaningful digital experiences.
            </AnimatedTitle>

            <p className="relative mt-6 max-w-2xl text-sm leading-relaxed text-violet-100">
              I transform ideas into thoughtful experiences through creativity,
              structure, technology, and attention to detail.
            </p>
          </div>
        </Reveal>
      </Slide>

      {/* =====================================================
          6. FEATURED PROJECTS
      ===================================================== */}

      {p.projects?.length > 0 && (
        <Slide
          name={p.name}
          id="work"
          delay={300}
        >
          <div className="flex gap-4 p-6 sm:p-12">
            <Reveal direction="left">
              <h2
                className="hidden text-3xl font-extrabold [writing-mode:vertical-rl] sm:block"
                style={{
                  transform: "rotate(180deg)",
                }}
              >
                Projects
              </h2>
            </Reveal>

            <div className="grid flex-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {p.projects.map((pr, i) => (
                <Reveal
                  key={i}
                  direction="up"
                  delay={i * 120}
                >
                  <Tilt className="violet-project group bg-white text-[#2e1065]">
                    <div className="overflow-hidden">
                      <Img
                        src={pr.image}
                        alt={pr.title}
                        className="violet-image aspect-[4/5] w-full"
                      />
                    </div>

                    <div className="p-3">
                      <p className="text-xs font-semibold text-violet-600">
                        Project {i + 1}
                      </p>

                      <h3 className="font-bold transition-colors duration-300 group-hover:text-violet-600">
                        {pr.title}
                      </h3>

                      <p className="text-xs text-violet-800">
                        {pr.description}
                      </p>
                    </div>
                  </Tilt>
                </Reveal>
              ))}
            </div>
          </div>
        </Slide>
      )}

      {/* =====================================================
          7. CASE STUDY
      ===================================================== */}

      {p.caseStudy?.title && (
        <Slide
          name={p.name}
          id="case-study"
          delay={350}
        >
          <div className="grid items-center gap-8 p-6 sm:p-12 md:grid-cols-2">
            <Reveal direction="left">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-[#f0abfc]">
                  Case Study
                </p>

                <AnimatedTitle className="mt-2 text-4xl font-extrabold">
                  {p.caseStudy.title}
                </AnimatedTitle>

                <p className="mt-4 text-sm leading-relaxed text-violet-100">
                  {p.caseStudy.description}
                </p>
              </div>
            </Reveal>

            <Wipe delay={250}>
              <Img
                src={p.caseStudy.image}
                alt={p.caseStudy.title}
                className="violet-image aspect-[16/10] w-full"
              />
            </Wipe>
          </div>
        </Slide>
      )}

      {/* =====================================================
          8. CREATIVE TOOLS
      ===================================================== */}

      <Slide
        name={p.name}
        delay={400}
      >
        <div className="p-6 sm:p-12">
          <Reveal direction="left">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#f0abfc]">
              Creative Tools
            </p>
          </Reveal>

          <AnimatedTitle className="mt-2 text-4xl font-extrabold">
            Tools I work with.
          </AnimatedTitle>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-4">
            {(p.skills || [
              "JavaScript",
              "React",
              "Node.js",
              "MongoDB",
            ]).map((tool, i) => (
              <Reveal
                key={tool}
                direction="up"
                delay={i * 90}
              >
                <div
                  className={`violet-tool violet-shine p-5 text-center font-bold ${
                    [
                      "bg-[#f0abfc] text-[#2e1065]",
                      "bg-[#e8dcc8] text-[#2e1065]",
                      "bg-[#7c3aed]",
                      "bg-[#6d28d9]",
                    ][i % 4]
                  }`}
                >
                  {tool}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Slide>

      {/* =====================================================
          9. PERSONAL AESTHETIC
      ===================================================== */}

      {p.personalAesthetic?.image && (
        <Slide
          name={p.name}
          delay={450}
        >
          <div className="grid items-center gap-8 p-6 sm:p-12 md:grid-cols-2">
            <Wipe>
              <Img
                src={p.personalAesthetic.image}
                alt="Personal aesthetic"
                className="violet-image aspect-[4/3] w-full"
              />
            </Wipe>

            <Reveal direction="right">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-[#f0abfc]">
                  Personal Aesthetic
                </p>

                <AnimatedTitle className="mt-2 text-4xl font-extrabold">
                  A visual language of my own.
                </AnimatedTitle>

                <p className="mt-5 text-sm leading-relaxed text-violet-100">
                  My personal aesthetic combines simplicity, personality,
                  creativity, and thoughtful visual choices.
                </p>
              </div>
            </Reveal>
          </div>
        </Slide>
      )}

      {/* =====================================================
          10. CONTACT
      ===================================================== */}

      <Slide
        name={p.name}
        id="contact"
        className="text-center"
        delay={500}
      >
        <div className="px-6 py-14">
          <Reveal direction="up">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#f0abfc]">
              Contact & Social Links
            </p>
          </Reveal>

          <AnimatedTitle className="mt-3 text-4xl font-extrabold sm:text-6xl">
            Let's work together
          </AnimatedTitle>

          {p.email && (
            <Reveal delay={200}>
              <p className="mt-4 text-sm text-violet-200">
                {p.email}
              </p>
            </Reveal>
          )}

          <Reveal delay={350}>
            <div className="mt-6 flex flex-wrap justify-center gap-3 text-sm font-semibold">
              <Links
                portfolio={p}
                className="violet-button rounded-full bg-[#e8dcc8] px-5 py-2 text-[#2e1065] hover:bg-[#f0abfc]"
              />
            </div>
          </Reveal>
        </div>
      </Slide>

      {/* =====================================================
          11. THANK YOU
      ===================================================== */}

      <Slide
        name={p.name}
        className="text-center"
        delay={550}
      >
        <Reveal direction="zoom">
          <div className="relative overflow-hidden px-6 py-16">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#f0abfc]/20 blur-3xl"
              style={{
                animation:
                  "violetPulse 5s ease-in-out infinite",
              }}
            />

            <AnimatedTitle className="relative text-5xl font-extrabold sm:text-7xl">
              Thank you.
            </AnimatedTitle>

            <Reveal delay={350}>
              <p className="relative mt-4 text-sm text-violet-200">
                Thank you for taking the time to explore my portfolio.
              </p>
            </Reveal>
          </div>
        </Reveal>
      </Slide>

      {/* =====================================================
          MOBILE SKILL MARQUEE
      ===================================================== */}

      {p.skills?.length > 0 && (
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-xl bg-[#2e1065] py-3 text-[#f0abfc]">
          <div
            className="flex w-max gap-8 whitespace-nowrap text-xs font-bold uppercase tracking-[0.25em]"
            style={{
              animation:
                "violetMarquee 18s linear infinite",
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

export default VioletSlidesTemplate;