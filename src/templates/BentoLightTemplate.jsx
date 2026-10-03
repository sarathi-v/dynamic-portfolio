import { useEffect, useRef, useState } from "react";
import { Img, Socials, philosophy } from "./shared";

const font = {
  fontFamily: "Outfit, system-ui, sans-serif",
};

const tile =
  "overflow-hidden rounded-3xl bg-white p-6 sm:p-8";

/* =========================================================
   ANIMATION HOOKS
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

function Reveal({
  children,
  className = "",
  direction = "up",
  delay = 0,
}) {
  const [ref, visible] = useInView(0.12);

  const transforms = {
    up: "translateY(45px)",
    down: "translateY(-35px)",
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
        transition: `opacity 800ms ease ${delay}ms, transform 900ms cubic-bezier(.22,1,.36,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

function Title({
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
      aria-label={children}
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

function Wipe({
  src,
  alt,
  className = "",
  delay = 0,
}) {
  const [ref, visible] = useInView(0.12);

  return (
    <div ref={ref} className="relative overflow-hidden">
      <Img
        src={src}
        alt={alt}
        className={`transition duration-1000 ${
          visible ? "scale-100" : "scale-110"
        } ${className}`}
      />

      <div
        className="pointer-events-none absolute inset-0 bg-[#eef0f5]"
        style={{
          transform: visible ? "translateX(105%)" : "translateX(0)",
          transition:
            "transform 1100ms cubic-bezier(.77,0,.18,1)",
          transitionDelay: `${delay}ms`,
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

    const x =
      (event.clientX - rect.left) / rect.width - 0.5;

    const y =
      (event.clientY - rect.top) / rect.height - 0.5;

    element.style.transform = `
      perspective(900px)
      rotateX(${y * -4}deg)
      rotateY(${x * 4}deg)
      translateY(-4px)
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

function BentoLightTemplate({ portfolio }) {
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
  } = portfolio;

  const [scrollProgress, setScrollProgress] = useState(0);
  const [cursor, setCursor] = useState({
    x: -100,
    y: -100,
  });

  /* Scroll progress */
  useEffect(() => {
    const updateScroll = () => {
      const scrollTop = window.scrollY;

      const height =
        document.documentElement.scrollHeight -
        window.innerHeight;

      const progress =
        height > 0 ? scrollTop / height : 0;

      setScrollProgress(progress);
    };

    window.addEventListener("scroll", updateScroll, {
      passive: true,
    });

    updateScroll();

    return () =>
      window.removeEventListener("scroll", updateScroll);
  }, []);

  /* Cursor glow */
  useEffect(() => {
    const move = (event) => {
      setCursor({
        x: event.clientX,
        y: event.clientY,
      });
    };

    window.addEventListener("mousemove", move);

    return () =>
      window.removeEventListener("mousemove", move);
  }, []);

  return (
    <>
      {/* =====================================================
          ANIMATION STYLES
      ===================================================== */}

      <style>{`
        @keyframes bentoFloat {
          0%, 100% {
            transform: translate3d(0, 0, 0);
          }

          50% {
            transform: translate3d(0, -14px, 0);
          }
        }

        @keyframes bentoPulse {
          0%, 100% {
            opacity: .15;
            transform: scale(1);
          }

          50% {
            opacity: .28;
            transform: scale(1.08);
          }
        }

        @keyframes bentoMarquee {
          from {
            transform: translateX(0);
          }

          to {
            transform: translateX(-50%);
          }
        }

        .bento-float {
          animation: bentoFloat 6s ease-in-out infinite;
        }

        .bento-pulse {
          animation: bentoPulse 5s ease-in-out infinite;
        }

        .bento-marquee {
          animation: bentoMarquee 22s linear infinite;
        }

        .bento-project-image {
          transition:
            transform 900ms cubic-bezier(.22,1,.36,1),
            filter 500ms ease;
        }

        .bento-project:hover .bento-project-image {
          transform: scale(1.08);
          filter: saturate(1.08);
        }

        .bento-card {
          transition:
            box-shadow 500ms ease,
            transform 500ms cubic-bezier(.22,1,.36,1);
        }

        .bento-card:hover {
          box-shadow:
            0 25px 70px rgba(15, 23, 42, .10);
        }

        .bento-skill {
          transition:
            transform 300ms ease,
            background-color 300ms ease;
        }

        .bento-skill:hover {
          transform: translateY(-4px);
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

      {/* =====================================================
          SCROLL PROGRESS
      ===================================================== */}

      <div
        className="fixed left-0 top-0 z-[999] h-1 origin-left bg-indigo-600"
        style={{
          width: "100%",
          transform: `scaleX(${scrollProgress})`,
        }}
      />

      {/* =====================================================
          CURSOR GLOW
      ===================================================== */}

      <div
        className="pointer-events-none fixed z-[1] hidden h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-400/10 blur-3xl md:block"
        style={{
          left: cursor.x,
          top: cursor.y,
          transition: "left 120ms ease-out, top 120ms ease-out",
        }}
      />

      <div
        style={font}
        className="relative min-h-screen overflow-x-hidden bg-[#eef0f5] p-3 text-slate-700 sm:p-6"
      >
        {/* Ambient background elements */}

        <div className="pointer-events-none fixed left-[8%] top-[15%] z-0 h-32 w-32 rounded-full bg-indigo-300/20 blur-3xl bento-pulse" />

        <div
          className="pointer-events-none fixed bottom-[10%] right-[8%] z-0 h-40 w-40 rounded-full bg-amber-200/30 blur-3xl bento-pulse"
          style={{ animationDelay: "1.5s" }}
        />

        <main className="relative z-10 mx-auto grid max-w-6xl gap-3 sm:gap-4 md:grid-cols-6">

          {/* =================================================
              1. HERO / PROFILE
          ================================================= */}

          <Reveal
            className={`${tile} flex flex-col justify-between bg-indigo-600 text-white md:col-span-4 md:min-h-[22rem]`}
            direction="left"
          >
            <div>
              <p className="text-sm text-indigo-200">
                {role}
              </p>

              <p className="mt-3 text-xs uppercase tracking-widest text-indigo-200">
                Portfolio
              </p>
            </div>

            <h1 className="mt-10 break-words text-5xl font-bold leading-none sm:text-7xl">
              <Title>{name}</Title>
            </h1>
          </Reveal>

          <Reveal
            className="aspect-square overflow-hidden rounded-3xl bg-slate-300 md:col-span-2 md:aspect-auto"
            direction="right"
            delay={100}
          >
            <div className="h-full overflow-hidden">
              <Img
                src={profileImage}
                alt={`Portrait of ${name}`}
                className="h-full w-full transition duration-1000 hover:scale-105"
              />
            </div>
          </Reveal>

          {/* =================================================
              2. ABOUT
          ================================================= */}

          <Reveal
            className={`${tile} bento-card md:col-span-4`}
            direction="up"
          >
            <h2 className="mb-3 text-sm font-medium text-indigo-600">
              About me
            </h2>

            <h3 className="mb-4 text-3xl font-bold text-slate-900">
              <Title>A little about who I am.</Title>
            </h3>

            <p className="text-xl leading-relaxed text-slate-700 sm:text-2xl">
              {about}
            </p>
          </Reveal>

          {/* Skills preview */}

          {skills?.length > 0 && (
            <Reveal
              className={`${tile} bento-card md:col-span-2`}
              direction="right"
              delay={100}
            >
              <h2 className="mb-3 text-sm font-medium text-indigo-600">
                Skills
              </h2>

              <ul className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <li
                    key={`${skill}-${index}`}
                    className="bento-skill rounded-full bg-slate-100 px-3 py-1.5 text-sm"
                    style={{
                      transitionDelay: `${index * 40}ms`,
                    }}
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </Reveal>
          )}

          {/* =================================================
              3. DESIGN PHILOSOPHY
          ================================================= */}

          <Reveal
            className={`${tile} bg-amber-100 md:col-span-3`}
            direction="left"
          >
            <h2 className="mb-5 text-sm font-medium text-indigo-600">
              Design philosophy
            </h2>

            <div>
              {philosophy(portfolio).map((text, index) => (
                <p
                  key={text}
                  className="mb-4 text-2xl font-medium text-slate-900 sm:text-3xl"
                  style={{
                    opacity: 0,
                    animation: `fadeSlideUp 700ms ease forwards ${
                      200 + index * 150
                    }ms`,
                  }}
                >
                  {text}
                </p>
              ))}
            </div>
          </Reveal>

          <Reveal
            className={`${tile} bg-indigo-50 md:col-span-3`}
            direction="right"
            delay={100}
          >
            {designPhilosophy?.image ? (
              <Wipe
                src={designPhilosophy.image}
                alt="Design philosophy"
                className="aspect-[4/3] w-full rounded-2xl"
              />
            ) : (
              <div className="flex aspect-[4/3] items-center justify-center rounded-2xl bg-indigo-100">
                <span className="text-sm text-indigo-500">
                  Design philosophy
                </span>
              </div>
            )}
          </Reveal>

          {/* =================================================
              4. CORE VALUES
          ================================================= */}

          <Reveal
            className={`${tile} md:col-span-6`}
            direction="up"
          >
            <div className="mb-8">
              <h2 className="text-sm font-medium text-indigo-600">
                Core values
              </h2>

              <h3 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">
                <Title>What guides my work.</Title>
              </h3>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Tilt>
                <div className="bento-card overflow-hidden rounded-2xl bg-slate-100">
                  {coreValues?.image1 && (
                    <Wipe
                      src={coreValues.image1}
                      alt="Core value one"
                      className="aspect-[4/3] w-full"
                    />
                  )}

                  <div className="p-5">
                    <span className="text-xs font-medium text-indigo-600">
                      01
                    </span>

                    <h4 className="mt-1 text-xl font-bold text-slate-900">
                      Purpose
                    </h4>
                  </div>
                </div>
              </Tilt>

              <Tilt>
                <div className="bento-card overflow-hidden rounded-2xl bg-slate-100">
                  {coreValues?.image2 && (
                    <Wipe
                      src={coreValues.image2}
                      alt="Core value two"
                      className="aspect-[4/3] w-full"
                    />
                  )}

                  <div className="p-5">
                    <span className="text-xs font-medium text-indigo-600">
                      02
                    </span>

                    <h4 className="mt-1 text-xl font-bold text-slate-900">
                      Creativity
                    </h4>
                  </div>
                </div>
              </Tilt>
            </div>
          </Reveal>

          {/* =================================================
              5. FROM THOUGHT TO FORM
          ================================================= */}

          <Reveal
            className={`${tile} bg-slate-900 text-white md:col-span-6`}
            direction="zoom"
          >
            <div className="grid gap-8 md:grid-cols-2 md:items-center">
              <div>
                <h2 className="text-sm font-medium text-indigo-300">
                  From thought to form
                </h2>

                <h3 className="mt-3 text-4xl font-bold leading-tight sm:text-5xl">
                  <Title>Turning ideas into experiences.</Title>
                </h3>

                <p className="mt-4 max-w-md leading-relaxed text-slate-300">
                  A simple process that transforms an initial thought
                  into a focused and meaningful final result.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                {[
                  {
                    number: "01",
                    title: "Think",
                    text: "Understand the idea and purpose.",
                    className:
                      "bg-indigo-600 text-white",
                  },
                  {
                    number: "02",
                    title: "Shape",
                    text: "Turn the concept into direction.",
                    className:
                      "bg-white text-slate-900",
                  },
                  {
                    number: "03",
                    title: "Create",
                    text: "Build the final experience.",
                    className:
                      "bg-amber-100 text-slate-900",
                  },
                ].map((item, index) => (
                  <Tilt key={item.number}>
                    <div
                      className={`rounded-2xl p-5 ${item.className}`}
                      style={{
                        transitionDelay: `${index * 100}ms`,
                      }}
                    >
                      <span className="text-sm opacity-60">
                        {item.number}
                      </span>

                      <h4 className="mt-6 font-bold">
                        {item.title}
                      </h4>

                      <p className="mt-2 text-sm opacity-75">
                        {item.text}
                      </p>
                    </div>
                  </Tilt>
                ))}
              </div>
            </div>
          </Reveal>

          {/* =================================================
              6. FEATURED PROJECTS
          ================================================= */}

          {projects?.length > 0 && (
            <>
              <Reveal
                className={`${tile} md:col-span-6`}
                direction="up"
              >
                <h2 className="text-sm font-medium text-indigo-600">
                  Featured projects
                </h2>

                <h3 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">
                  <Title>Selected work.</Title>
                </h3>
              </Reveal>

              {projects.slice(0, 3).map((project, index) => (
                <Reveal
                  key={index}
                  className={`md:col-span-${
                    index === 0 ? "4" : "2"
                  }`}
                  direction={index === 0 ? "left" : "up"}
                  delay={index * 100}
                >
                  <Tilt>
                    <article className="bento-project group relative min-h-[18rem] overflow-hidden rounded-3xl bg-slate-900">
                      <Img
                        src={project.image}
                        alt={project.title}
                        className="bento-project-image absolute inset-0 h-full w-full"
                      />

                      {/* Dark overlay */}

                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-70 transition duration-500 group-hover:opacity-90" />

                      <div className="absolute inset-x-3 bottom-3 rounded-2xl bg-white/95 p-4 backdrop-blur-sm transition duration-500 group-hover:-translate-y-1">
                        <p className="text-xs font-medium text-indigo-600">
                          Project {index + 1}
                        </p>

                        <h3 className="mt-1 font-bold text-slate-900">
                          {project.title}
                        </h3>

                        <p className="text-sm text-slate-600">
                          {project.description}
                        </p>
                      </div>
                    </article>
                  </Tilt>
                </Reveal>
              ))}
            </>
          )}

          {/* =================================================
              7. CASE STUDY
          ================================================= */}

          {caseStudy?.title && (
            <Reveal
              className={`${tile} bento-card grid items-center gap-6 p-0 md:col-span-6 md:grid-cols-2`}
              direction="zoom"
            >
              <Wipe
                src={caseStudy.image}
                alt={caseStudy.title}
                className="aspect-video h-full w-full"
              />

              <div className="p-6 sm:p-10">
                <h2 className="mb-2 text-sm font-medium text-indigo-600">
                  Case study
                </h2>

                <h3 className="text-3xl font-bold text-slate-900">
                  <Title>{caseStudy.title}</Title>
                </h3>

                <p className="mt-4 leading-relaxed text-slate-600">
                  {caseStudy.description}
                </p>
              </div>
            </Reveal>
          )}

          {/* =================================================
              8. CREATIVE TOOLS
          ================================================= */}

          {skills?.length > 0 && (
            <Reveal
              className={`${tile} md:col-span-6`}
              direction="up"
            >
              <div className="grid gap-8 md:grid-cols-2 md:items-center">
                <div>
                  <h2 className="text-sm font-medium text-indigo-600">
                    Creative tools
                  </h2>

                  <h3 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">
                    <Title>Tools behind the work.</Title>
                  </h3>
                </div>

                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {skills.map((skill, index) => (
                    <Tilt key={`${skill}-${index}`}>
                      <div className="bento-skill rounded-2xl bg-slate-100 p-4">
                        <span className="text-xs text-slate-400">
                          {String(index + 1).padStart(2, "0")}
                        </span>

                        <p className="mt-3 text-sm font-medium text-slate-900">
                          {skill}
                        </p>
                      </div>
                    </Tilt>
                  ))}
                </div>
              </div>
            </Reveal>
          )}

          {/* =================================================
              SKILL MARQUEE
          ================================================= */}

          {skills?.length > 0 && (
            <Reveal
              className="overflow-hidden rounded-3xl bg-white py-5 md:col-span-6"
              direction="right"
            >
              <div className="flex w-max bento-marquee">
                {[...skills, ...skills, ...skills].map(
                  (skill, index) => (
                    <span
                      key={`${skill}-${index}`}
                      className="mx-4 text-sm font-medium text-slate-400"
                    >
                      ✦ {skill}
                    </span>
                  )
                )}
              </div>
            </Reveal>
          )}

          {/* =================================================
              9. PERSONAL AESTHETIC
          ================================================= */}

          {personalAesthetic?.image && (
            <Reveal
              className={`${tile} md:col-span-6`}
              direction="left"
            >
              <div className="grid gap-8 md:grid-cols-2 md:items-center">
                <div>
                  <h2 className="text-sm font-medium text-indigo-600">
                    Personal aesthetic
                  </h2>

                  <h3 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">
                    <Title>A visual language of my own.</Title>
                  </h3>

                  <p className="mt-4 max-w-md leading-relaxed text-slate-600">
                    A balance of simplicity, personality, structure,
                    and carefully chosen details.
                  </p>
                </div>

                <Wipe
                  src={personalAesthetic.image}
                  alt="Personal aesthetic"
                  className="aspect-[4/3] w-full rounded-2xl"
                />
              </div>
            </Reveal>
          )}

          {/* =================================================
              10. CONTACT
          ================================================= */}

          <Reveal
            className={`${tile} bg-indigo-600 text-white md:col-span-6`}
            direction="zoom"
          >
            <div
              id="contact"
              className="grid gap-8 md:grid-cols-2 md:items-center"
            >
              <div>
                <h2 className="text-sm font-medium text-indigo-200">
                  Contact &amp; social links
                </h2>

                <h3 className="mt-2 text-4xl font-bold sm:text-5xl">
                  <Title>Let's talk.</Title>
                </h3>

                <p className="mt-4 max-w-md text-indigo-100">
                  Have an idea, project, or opportunity? Let's start
                  a conversation.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                {email && (
                  <a
                    href={`mailto:${email}`}
                    className="rounded-full bg-white px-5 py-3 text-sm font-medium text-indigo-600 transition duration-300 hover:-translate-y-1 hover:bg-indigo-50"
                  >
                    {email}
                  </a>
                )}

                <Socials
                  portfolio={portfolio}
                  className="rounded-full border border-white/40 px-5 py-3 text-sm transition duration-300 hover:-translate-y-1 hover:bg-white hover:text-indigo-600"
                />
              </div>
            </div>
          </Reveal>

          {/* =================================================
              11. THANK YOU / FOOTER
          ================================================= */}

          <Reveal
            className={`${tile} md:col-span-6`}
            direction="up"
          >
            <footer className="text-center">
              <p className="text-sm font-medium text-indigo-600">
                Thank you
              </p>

              <h2 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">
                <Title>Thanks for stopping by.</Title>
              </h2>

              <p className="mt-3 text-sm text-slate-500">
                © {new Date().getFullYear()} {name}. All rights reserved.
              </p>
            </footer>
          </Reveal>
        </main>
      </div>
    </>
  );
}

export default BentoLightTemplate;