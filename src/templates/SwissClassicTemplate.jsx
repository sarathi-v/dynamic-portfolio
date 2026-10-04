import { useEffect, useRef, useState } from "react";

const font = {
  fontFamily: "Archivo, 'Helvetica Neue', Helvetica, Arial, sans-serif",
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
    zoom: "scale(0.88)",
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : transforms[direction],
        transition: `opacity 700ms ease ${delay}ms, transform 900ms cubic-bezier(.2,.7,.2,1) ${delay}ms`,
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
  style = {},
}) {
  const [ref, visible] = useInView();

  const words = String(children ?? "").split(" ");

  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...style,
        overflow: "hidden",
      }}
    >
      {words.map((word, index) => (
        <span
          key={`${word}-${index}`}
          className="mr-[0.22em] inline-block"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible
              ? "translateY(0)"
              : "translateY(105%)",
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

function Wipe({ children, className = "", delay = 0 }) {
  const [ref, visible] = useInView();

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "scale(1)" : "scale(0.96)",
        transition: `opacity 800ms ease ${delay}ms, transform 900ms ease ${delay}ms`,
      }}
    >
      {children}

      <div
        className="pointer-events-none absolute inset-0 bg-black"
        style={{
          transform: visible ? "translateX(105%)" : "translateX(0)",
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

    const rotateY = ((x / rect.width) - 0.5) * 5;
    const rotateX = ((y / rect.height) - 0.5) * -5;

    node.style.transform = `
      perspective(900px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      translateY(-4px)
    `;
  };

  const reset = () => {
    if (!ref.current) return;
    ref.current.style.transform =
      "perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0)";
  };

  return (
    <div
      ref={ref}
      className={className}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{
        transition: "transform 450ms cubic-bezier(.2,.7,.2,1)",
        transformStyle: "preserve-3d",
      }}
    >
      {children}
    </div>
  );
}

const Section = ({ n, title, children, id }) => (
  <section id={id} className="border-t-2 border-black">
    <div className="mx-auto grid max-w-7xl grid-cols-4 gap-x-4 px-4 py-10 sm:px-8 md:grid-cols-12 md:py-16">
      <div className="col-span-4 mb-6 flex gap-4 md:col-span-3 md:mb-0 md:block">
        <span className="block text-sm font-medium text-red-600">
          {n}
        </span>

        <h2 className="text-sm font-medium md:mt-1">
          {title}
        </h2>
      </div>

      <div className="col-span-4 md:col-span-9">
        {children}
      </div>
    </div>
  </section>
);

/* =========================
   IMAGE
========================= */

const Img = ({
  src,
  alt,
  className = "",
  wrapperClassName = "",
}) =>
  src ? (
    <div className={`group overflow-hidden ${wrapperClassName}`}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className={`w-full object-cover grayscale transition duration-700 ease-out group-hover:scale-[1.04] group-hover:grayscale-0 ${className}`}
      />
    </div>
  ) : null;

/* =========================
   MAIN TEMPLATE
========================= */

function SwissClassicTemplate({ portfolio }) {
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

  const num = (i) => String(i + 1).padStart(2, "0");

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

      const value = height > 0 ? (scrollTop / height) * 100 : 0;

      setProgress(value);
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    handleScroll();

    return () =>
      window.removeEventListener("scroll", handleScroll);
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

    window.addEventListener("mousemove", move);

    return () =>
      window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div
      style={font}
      className="min-h-screen overflow-x-hidden bg-white text-black"
    >
      {/* =========================
          GLOBAL STYLE
      ========================= */}

      <style>{`
        html {
          scroll-behavior: smooth;
        }

        ::selection {
          background: #000;
          color: #fff;
        }

        .swiss-link {
          position: relative;
        }

        .swiss-link::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: -3px;
          width: 100%;
          height: 1px;
          background: #dc2626;
          transform: scaleX(0);
          transform-origin: right;
          transition: transform 300ms ease;
        }

        .swiss-link:hover::after {
          transform: scaleX(1);
          transform-origin: left;
        }

        .swiss-grid-line {
          position: absolute;
          top: 0;
          bottom: 0;
          width: 1px;
          background: rgba(0,0,0,.06);
          pointer-events: none;
        }

        .swiss-marquee {
          animation: swiss-marquee 18s linear infinite;
        }

        @keyframes swiss-marquee {
          from {
            transform: translateX(0);
          }

          to {
            transform: translateX(-50%);
          }
        }

        .swiss-float {
          animation: swiss-float 5s ease-in-out infinite;
        }

        @keyframes swiss-float {
          0%, 100% {
            transform: translateY(0);
          }

          50% {
            transform: translateY(-10px);
          }
        }

        .swiss-pulse {
          animation: swiss-pulse 3s ease-in-out infinite;
        }

        @keyframes swiss-pulse {
          0%, 100% {
            opacity: .15;
          }

          50% {
            opacity: .3;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          html {
            scroll-behavior: auto;
          }

          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>

      {/* =========================
          SCROLL BAR
      ========================= */}

      <div
        className="fixed left-0 top-0 z-[100] h-1 bg-red-600"
        style={{
          width: `${progress}%`,
        }}
      />

      {/* =========================
          CURSOR ACCENT
      ========================= */}

      <div
        className="pointer-events-none fixed z-[90] hidden h-16 w-16 rounded-full border border-red-600/30 md:block"
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

      <header className="relative z-20 mx-auto flex max-w-7xl items-center justify-between px-4 py-4 text-sm font-medium sm:px-8">
        <a
          href="#top"
          className="swiss-link"
        >
          {name}
        </a>

        <nav
          aria-label="Primary"
          className="flex gap-5"
        >
          <a
            className="swiss-link hover:text-red-600"
            href="#about"
          >
            About
          </a>

          <a
            className="swiss-link hover:text-red-600"
            href="#work"
          >
            Work
          </a>

          <a
            className="swiss-link hover:text-red-600"
            href="#contact"
          >
            Contact
          </a>
        </nav>
      </header>

      <main id="top">
        {/* =========================
            HERO
        ========================= */}

        <section className="relative mx-auto grid max-w-7xl grid-cols-4 gap-x-4 overflow-hidden px-4 pb-16 pt-10 sm:px-8 md:grid-cols-12 md:pb-24 md:pt-20">
          {/* Grid lines */}

          <span
            className="swiss-grid-line left-[25%]"
            aria-hidden="true"
          />

          <span
            className="swiss-grid-line left-[50%]"
            aria-hidden="true"
          />

          <span
            className="swiss-grid-line left-[75%]"
            aria-hidden="true"
          />

          {/* Decorative red dot */}

          <div className="swiss-float absolute right-[20%] top-16 h-4 w-4 rounded-full bg-red-600" />

          <Reveal
            className="relative z-10 col-span-4 md:col-span-9"
            direction="left"
          >
            <span className="mb-5 block text-sm font-medium text-red-600">
              01 / Portfolio
            </span>

            <AnimatedTitle
              className="break-words text-6xl font-extrabold leading-[0.88] tracking-tighter sm:text-8xl lg:text-[9rem]"
              delay={150}
            >
              {name}
            </AnimatedTitle>
          </Reveal>

          <Reveal
            className="relative z-10 col-span-4 mt-10 md:col-span-3 md:mt-0"
            direction="right"
            delay={200}
          >
            <p className="text-lg font-medium">
              {role}
            </p>

            <Wipe
              className="mt-6"
              delay={350}
            >
              <Img
                src={profileImage}
                alt={`Portrait of ${name}`}
                className="aspect-[4/5]"
              />
            </Wipe>
          </Reveal>
        </section>

        {/* =========================
            ABOUT
        ========================= */}

        {about && (
          <Section
            id="about"
            n="02"
            title="About"
          >
            <Reveal>
              <p className="max-w-4xl text-2xl font-medium leading-snug sm:text-3xl md:text-4xl">
                {about}
              </p>
            </Reveal>

            {skills?.length > 0 && (
              <Reveal delay={120}>
                <div className="mt-12">
                  <p className="mb-3 text-sm font-medium text-red-600">
                    Creative Tools
                  </p>

                  <ul className="grid grid-cols-2 border-t border-black sm:grid-cols-3 lg:grid-cols-4">
                    {skills.map((skill, index) => (
                      <li
                        key={`${skill}-${index}`}
                        className="group border-b border-black py-3 text-sm font-medium transition-colors duration-300 hover:bg-black hover:text-white"
                        style={{
                          transitionDelay: `${index * 35}ms`,
                        }}
                      >
                        <span className="mr-3 text-neutral-400 group-hover:text-red-500">
                          {num(index)}
                        </span>

                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            )}
          </Section>
        )}

        {/* =========================
            DESIGN PHILOSOPHY
        ========================= */}

        {(designPhilosophy?.text1 ||
          designPhilosophy?.text2 ||
          designPhilosophy?.image) && (
          <Section
            n="03"
            title="Design philosophy"
          >
            <div className="grid gap-8 lg:grid-cols-2">
              <div className="space-y-7">
                {designPhilosophy?.text1 && (
                  <AnimatedTitle
                    className="text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl md:text-5xl"
                  >
                    {designPhilosophy.text1}
                  </AnimatedTitle>
                )}

                {designPhilosophy?.text2 && (
                  <AnimatedTitle
                    className="text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl md:text-5xl"
                    delay={150}
                  >
                    {designPhilosophy.text2}
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
                    className="aspect-square"
                  />
                </Wipe>
              </Reveal>
            </div>
          </Section>
        )}

        {/* =========================
            CORE VALUES
        ========================= */}

        <Section
          n="04"
          title="Core values"
        >
          <div className="grid gap-6 sm:grid-cols-2">
            <Reveal>
              <Tilt>
                <div>
                  <div className="mb-3 text-sm text-red-600">
                    01
                  </div>

                  <Img
                    src={coreValues?.image1}
                    alt="Core value one"
                    className="aspect-[4/5]"
                  />

                  <p className="mt-4 text-xl font-extrabold tracking-tight">
                    Clarity
                  </p>
                </div>
              </Tilt>
            </Reveal>

            <Reveal delay={150}>
              <Tilt>
                <div>
                  <div className="mb-3 text-sm text-red-600">
                    02
                  </div>

                  <Img
                    src={coreValues?.image2}
                    alt="Core value two"
                    className="aspect-[4/5]"
                  />

                  <p className="mt-4 text-xl font-extrabold tracking-tight">
                    Purpose
                  </p>
                </div>
              </Tilt>
            </Reveal>
          </div>
        </Section>

        {/* =========================
            THOUGHT TO FORM
        ========================= */}

        <Section
          n="05"
          title="From thought to form"
        >
          <div className="grid gap-8 lg:grid-cols-12">
            <Reveal className="lg:col-span-8">
              <AnimatedTitle className="text-4xl font-extrabold leading-[0.95] tracking-tight sm:text-6xl">
                Ideas become meaningful when they are given form.
              </AnimatedTitle>
            </Reveal>

            <Reveal
              className="lg:col-span-4"
              direction="right"
              delay={150}
            >
              <p className="text-sm leading-relaxed text-neutral-700">
                Every project begins with an idea and develops through
                structure, experimentation, refinement, and a clear visual
                direction.
              </p>
            </Reveal>
          </div>
        </Section>

        {/* =========================
            PROJECTS
        ========================= */}

        <Section
          id="work"
          n="06"
          title="Featured projects"
        >
          {projects?.length > 0 ? (
            <ol>
              {projects.slice(0, 3).map(
                (project, index) => (
                  <Reveal
                    key={index}
                    delay={index * 120}
                  >
                    <Tilt>
                      <li
                        className="group grid gap-5 border-b border-black py-8 first:pt-0 sm:grid-cols-5"
                      >
                        <div className="sm:col-span-1">
                          <span className="text-sm text-neutral-500 transition-colors duration-300 group-hover:text-red-600">
                            {num(index)}
                          </span>
                        </div>

                        <div className="sm:col-span-2">
                          <h3 className="text-2xl font-extrabold tracking-tight transition-transform duration-500 group-hover:translate-x-2 sm:text-3xl">
                            {project.title}
                          </h3>

                          <p className="mt-3 text-sm leading-relaxed text-neutral-700">
                            {project.description}
                          </p>
                        </div>

                        <div className="sm:col-span-2">
                          <Img
                            src={project.image}
                            alt={project.title}
                            className="aspect-[4/3]"
                          />
                        </div>
                      </li>
                    </Tilt>
                  </Reveal>
                )
              )}
            </ol>
          ) : (
            <p className="text-neutral-500">
              No projects added yet.
            </p>
          )}
        </Section>

        {/* =========================
            CASE STUDY
        ========================= */}

        <Section
          n="07"
          title="Case study"
        >
          {caseStudy?.title ||
          caseStudy?.description ||
          caseStudy?.image ? (
            <div className="grid gap-8 lg:grid-cols-2">
              <Reveal direction="left">
                <span className="text-sm text-red-600">
                  Selected work
                </span>

                <AnimatedTitle
                  className="mt-4 text-4xl font-extrabold leading-none tracking-tight sm:text-6xl"
                  delay={100}
                >
                  {caseStudy?.title}
                </AnimatedTitle>

                {caseStudy?.description && (
                  <p className="mt-6 max-w-lg leading-relaxed text-neutral-700">
                    {caseStudy.description}
                  </p>
                )}
              </Reveal>

              <Reveal
                direction="right"
                delay={150}
              >
                <Wipe>
                  <Img
                    src={caseStudy?.image}
                    alt={
                      caseStudy?.title ||
                      "Case study"
                    }
                    className="aspect-[4/3]"
                  />
                </Wipe>
              </Reveal>
            </div>
          ) : (
            <p className="text-neutral-500">
              No case study added yet.
            </p>
          )}
        </Section>

        {/* =========================
            CREATIVE TOOLS
        ========================= */}

        <Section
          n="08"
          title="Creative tools"
        >
          {skills?.length > 0 ? (
            <div>
              <Reveal>
                <p className="max-w-2xl text-2xl font-medium leading-snug sm:text-3xl">
                  A focused toolkit for turning ideas into functional and
                  expressive digital experiences.
                </p>
              </Reveal>

              <Reveal delay={150}>
                <div className="mt-10 grid border-t border-black sm:grid-cols-2 lg:grid-cols-3">
                  {skills.map(
                    (skill, index) => (
                      <div
                        key={`${skill}-tool-${index}`}
                        className="group border-b border-black py-5 transition-all duration-300 hover:bg-black hover:px-4 hover:text-white"
                      >
                        <span className="text-sm text-red-600 group-hover:text-red-500">
                          {num(index)}
                        </span>

                        <p className="mt-2 text-xl font-extrabold tracking-tight">
                          {skill}
                        </p>
                      </div>
                    )
                  )}
                </div>
              </Reveal>
            </div>
          ) : (
            <p className="text-neutral-500">
              No tools added yet.
            </p>
          )}
        </Section>

        {/* =========================
            PERSONAL AESTHETIC
        ========================= */}

        <Section
          n="09"
          title="Personal aesthetic"
        >
          <div className="grid gap-8 lg:grid-cols-12">
            <Reveal
              className="lg:col-span-8"
              direction="left"
            >
              <Wipe>
                <Img
                  src={personalAesthetic?.image}
                  alt="Personal aesthetic"
                  className="aspect-[16/9]"
                />
              </Wipe>
            </Reveal>

            <Reveal
              className="flex items-end lg:col-span-4"
              direction="right"
              delay={150}
            >
              <AnimatedTitle className="text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
                Less noise. More intention.
              </AnimatedTitle>
            </Reveal>
          </div>
        </Section>

        {/* =========================
            CONTACT
        ========================= */}

        <Section
          id="contact"
          n="10"
          title="Contact & social links"
        >
          <div className="grid gap-8 md:grid-cols-2">
            <Reveal direction="left">
              <p className="text-sm text-red-600">
                Start a conversation
              </p>

              {email && (
                <a
                  href={`mailto:${email}`}
                  className="swiss-link mt-4 block break-all text-2xl font-extrabold tracking-tight hover:text-red-600 sm:text-4xl"
                >
                  {email}
                </a>
              )}
            </Reveal>

            <Reveal
              direction="right"
              delay={150}
            >
              <div className="flex flex-col gap-4 text-sm font-medium">
                {socialLinks?.github && (
                  <a
                    href={socialLinks.github}
                    target="_blank"
                    rel="noreferrer"
                    className="group border-b border-black pb-2 hover:text-red-600"
                  >
                    GitHub
                    <span className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                      ↗
                    </span>
                  </a>
                )}

                {socialLinks?.linkedin && (
                  <a
                    href={socialLinks.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="group border-b border-black pb-2 hover:text-red-600"
                  >
                    LinkedIn
                    <span className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                      ↗
                    </span>
                  </a>
                )}
              </div>
            </Reveal>
          </div>
        </Section>

        {/* =========================
            THANK YOU
        ========================= */}

        <section className="relative overflow-hidden border-t-2 border-black bg-black text-white">
          <div className="pointer-events-none absolute right-[15%] top-20 h-32 w-32 rounded-full bg-red-600/20 blur-3xl swiss-pulse" />

          <div className="mx-auto grid max-w-7xl grid-cols-4 gap-x-4 px-4 py-16 sm:px-8 md:grid-cols-12 md:py-24">
            <Reveal
              className="col-span-4 md:col-span-3"
              direction="left"
            >
              <span className="text-sm font-medium text-red-500">
                11 / Thank you
              </span>
            </Reveal>

            <Reveal
              className="col-span-4 md:col-span-9"
              direction="right"
              delay={150}
            >
              <AnimatedTitle className="text-5xl font-extrabold leading-[0.9] tracking-tighter sm:text-7xl md:text-8xl">
                THANK YOU.
              </AnimatedTitle>

              <div className="mt-10 flex flex-wrap gap-6 text-sm font-medium">
                <a
                  href="#about"
                  className="swiss-link underline underline-offset-4 hover:text-red-500"
                >
                  About
                </a>

                <a
                  href="#work"
                  className="swiss-link underline underline-offset-4 hover:text-red-500"
                >
                  Work
                </a>

                <a
                  href="#contact"
                  className="swiss-link underline underline-offset-4 hover:text-red-500"
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

      <footer className="bg-black px-4 pb-8 text-sm text-white sm:px-8">
        <Reveal>
          <div className="mx-auto flex max-w-7xl flex-col justify-between gap-3 border-t border-neutral-700 pt-5 sm:flex-row">
            <span>{name}</span>
            <span>{role}</span>
          </div>
        </Reveal>
      </footer>
    </div>
  );
}

export default SwissClassicTemplate;