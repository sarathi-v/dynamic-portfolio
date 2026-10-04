import { useEffect, useRef, useState } from "react";

const font = {
  fontFamily: "'Inter Tight', system-ui, sans-serif",
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
        transform: visible ? "none" : transforms[direction],
        transition: `
          opacity 700ms ease ${delay}ms,
          transform 900ms cubic-bezier(.2,.7,.2,1) ${delay}ms
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
              : "translateY(110%)",
            transition:
              "opacity 650ms ease, transform 800ms cubic-bezier(.2,.7,.2,1)",
            transitionDelay: `${delay + index * 65}ms`,
          }}
        >
          {word}
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
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "scale(1)" : "scale(.97)",
        transition: `opacity 750ms ease ${delay}ms, transform 900ms ease ${delay}ms`,
      }}
    >
      {children}

      <div
        className="pointer-events-none absolute inset-0 bg-black"
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

/* =========================
   IMAGE
========================= */

const Img = ({
  src,
  alt,
  className = "",
}) =>
  src ? (
    <div
      className={`group overflow-hidden bg-neutral-100 ${className}`}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="h-full w-full object-cover grayscale transition-all duration-700 ease-out group-hover:scale-[1.04] group-hover:grayscale-0"
      />
    </div>
  ) : null;

/* =========================
   SECTION LABEL
========================= */

const SectionLabel = ({
  number,
  title,
}) => (
  <div className="mb-8 flex items-center justify-between border-t border-neutral-300 pt-4">
    <span className="text-xs text-neutral-400">
      {number}
    </span>

    <span className="text-xs uppercase tracking-[0.2em] text-neutral-500">
      {title}
    </span>
  </div>
);

/* =========================
   MAIN TEMPLATE
========================= */

function MinimalMonochromeTemplate({
  portfolio,
}) {
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

  const under =
    "underline decoration-neutral-300 underline-offset-4 transition-all duration-300 hover:decoration-black";

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

      setProgress(
        height > 0
          ? (scrollTop / height) * 100
          : 0
      );
    };

    window.addEventListener(
      "scroll",
      handleScroll,
      { passive: true }
    );

    handleScroll();

    return () =>
      window.removeEventListener(
        "scroll",
        handleScroll
      );
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

    window.addEventListener(
      "mousemove",
      move
    );

    return () =>
      window.removeEventListener(
        "mousemove",
        move
      );
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

        .minimal-link {
          position: relative;
        }

        .minimal-link::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: -3px;
          width: 100%;
          height: 1px;
          background: #000;
          transform: scaleX(0);
          transform-origin: right;
          transition: transform 300ms ease;
        }

        .minimal-link:hover::after {
          transform: scaleX(1);
          transform-origin: left;
        }

        .minimal-dot {
          animation: minimal-pulse 3s ease-in-out infinite;
        }

        @keyframes minimal-pulse {
          0%,
          100% {
            transform: scale(1);
            opacity: .25;
          }

          50% {
            transform: scale(1.5);
            opacity: .7;
          }
        }

        .minimal-marquee {
          animation: minimal-marquee 18s linear infinite;
        }

        @keyframes minimal-marquee {
          from {
            transform: translateX(0);
          }

          to {
            transform: translateX(-50%);
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
          PROGRESS
      ========================= */}

      <div
        className="fixed left-0 top-0 z-[100] h-[2px] bg-black"
        style={{
          width: `${progress}%`,
        }}
      />

      {/* =========================
          CURSOR
      ========================= */}

      <div
        className="pointer-events-none fixed z-[90] hidden h-10 w-10 rounded-full border border-black/20 md:block"
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

      <header className="relative z-20 flex items-center justify-between px-5 py-6 text-sm sm:px-10">
        <a
          href="#top"
          className="minimal-link font-semibold"
        >
          {name}
        </a>

        <nav className="flex gap-5">
          <a
            href="#work"
            className={`minimal-link ${under}`}
          >
            Work
          </a>

          <a
            href="#about"
            className={`minimal-link ${under}`}
          >
            About
          </a>

          <a
            href="#contact"
            className={`minimal-link ${under}`}
          >
            Contact
          </a>
        </nav>
      </header>

      <main id="top">
        {/* =========================
            HERO
        ========================= */}

        <section className="relative overflow-hidden px-5 pb-24 pt-16 sm:px-10 sm:pt-28">
          <div className="minimal-dot pointer-events-none absolute right-[12%] top-28 h-3 w-3 rounded-full bg-black" />

          <SectionLabel
            number="01"
            title="Profile"
          />

          <AnimatedTitle className="break-words text-[17vw] font-light leading-[0.82] tracking-tighter sm:text-[13vw]">
            {name}
          </AnimatedTitle>

          <div className="mt-10 flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
            <Reveal direction="left">
              <div>
                <p className="text-xl text-neutral-500 sm:text-2xl">
                  {role}
                </p>

                <p className="mt-3 text-sm text-neutral-400">
                  Portfolio / Selected work
                </p>
              </div>
            </Reveal>

            {profileImage && (
              <Reveal
                direction="right"
                delay={150}
              >
                <Wipe>
                  <Img
                    src={profileImage}
                    alt={`Portrait of ${name}`}
                    className="aspect-square w-32 sm:w-44"
                  />
                </Wipe>
              </Reveal>
            )}
          </div>
        </section>

        {/* =========================
            ABOUT
        ========================= */}

        <section
          id="about"
          className="px-5 py-24 sm:px-10"
        >
          <SectionLabel
            number="02"
            title="About me"
          />

          {about && (
            <Reveal>
              <AnimatedTitle className="max-w-5xl text-3xl font-light leading-tight sm:text-5xl md:text-6xl">
                {about}
              </AnimatedTitle>
            </Reveal>
          )}

          {skills?.length > 0 && (
            <Reveal delay={150}>
              <div className="mt-14 max-w-4xl">
                <p className="mb-5 text-xs uppercase tracking-[0.2em] text-neutral-400">
                  Skills
                </p>

                <div className="flex flex-wrap gap-x-6 gap-y-3 border-t border-neutral-300 pt-5">
                  {skills.map(
                    (skill, index) => (
                      <span
                        key={`${skill}-${index}`}
                        className="group text-lg font-light transition-transform duration-300 hover:-translate-y-1"
                      >
                        {skill}
                      </span>
                    )
                  )}
                </div>
              </div>
            </Reveal>
          )}
        </section>

        {/* =========================
            DESIGN PHILOSOPHY
        ========================= */}

        <section className="bg-neutral-100 px-5 py-24 sm:px-10">
          <SectionLabel
            number="03"
            title="Design philosophy"
          />

          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div className="space-y-7">
              {designPhilosophy?.text1 && (
                <AnimatedTitle className="text-3xl font-light leading-tight sm:text-5xl">
                  {designPhilosophy.text1}
                </AnimatedTitle>
              )}

              {designPhilosophy?.text2 && (
                <AnimatedTitle
                  className="text-3xl font-light leading-tight text-neutral-500 sm:text-5xl"
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
                  className="aspect-[4/3]"
                />
              </Wipe>
            </Reveal>
          </div>
        </section>

        {/* =========================
            CORE VALUES
        ========================= */}

        <section className="px-5 py-24 sm:px-10">
          <SectionLabel
            number="04"
            title="Core values"
          />

          <div className="grid gap-px bg-neutral-300 sm:grid-cols-2">
            <Reveal>
              <Tilt>
                <div className="group bg-white p-5">
                  <span className="text-xs text-neutral-400">
                    01
                  </span>

                  <Img
                    src={coreValues?.image1}
                    alt="Core value one"
                    className="mt-5 aspect-[4/5]"
                  />

                  <p className="mt-5 text-xl font-light transition-transform duration-300 group-hover:translate-x-2">
                    Thoughtful by design.
                  </p>
                </div>
              </Tilt>
            </Reveal>

            <Reveal delay={150}>
              <Tilt>
                <div className="group bg-white p-5">
                  <span className="text-xs text-neutral-400">
                    02
                  </span>

                  <Img
                    src={coreValues?.image2}
                    alt="Core value two"
                    className="mt-5 aspect-[4/5]"
                  />

                  <p className="mt-5 text-xl font-light transition-transform duration-300 group-hover:translate-x-2">
                    Purpose over noise.
                  </p>
                </div>
              </Tilt>
            </Reveal>
          </div>
        </section>

        {/* =========================
            THOUGHT TO FORM
        ========================= */}

        <section className="px-5 py-24 sm:px-10">
          <SectionLabel
            number="05"
            title="From thought to form"
          />

          <div className="grid gap-10 md:grid-cols-12">
            <Reveal className="md:col-span-8">
              <AnimatedTitle className="text-5xl font-light leading-[0.95] tracking-tight sm:text-7xl">
                Ideas become visible through structure, rhythm and restraint.
              </AnimatedTitle>
            </Reveal>

            <Reveal
              className="md:col-span-4 md:pt-3"
              direction="right"
              delay={150}
            >
              <p className="leading-relaxed text-neutral-500">
                I approach each project by reducing complexity, finding the
                essential idea, and translating it into a clear visual
                language.
              </p>
            </Reveal>
          </div>
        </section>

        {/* =========================
            FEATURED PROJECTS
        ========================= */}

        <section
          id="work"
          className="px-5 pb-24 sm:px-10"
        >
          <SectionLabel
            number="06"
            title="Featured projects"
          />

          {projects?.length > 0 ? (
            <ul className="border-t border-neutral-300">
              {projects.slice(0, 3).map(
                (project, index) => (
                  <Reveal
                    key={index}
                    delay={index * 120}
                  >
                    <Tilt>
                      <li className="group grid gap-6 border-b border-neutral-300 py-10 md:grid-cols-12">
                        <div className="md:col-span-1">
                          <span className="text-xs text-neutral-400 transition-colors group-hover:text-black">
                            0{index + 1}
                          </span>
                        </div>

                        <h2 className="text-4xl font-light tracking-tight transition-all duration-500 group-hover:translate-x-2 group-hover:text-neutral-500 sm:text-6xl md:col-span-5">
                          {project.title}
                        </h2>

                        <p className="text-neutral-500 md:col-span-3">
                          {project.description}
                        </p>

                        <div className="md:col-span-3">
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
            </ul>
          ) : (
            <p className="text-neutral-500">
              No projects added yet.
            </p>
          )}
        </section>

        {/* =========================
            CASE STUDY
        ========================= */}

        <section className="px-5 py-24 sm:px-10">
          <SectionLabel
            number="07"
            title="Case study"
          />

          <Reveal>
            <Wipe>
              <Img
                src={caseStudy?.image}
                alt={
                  caseStudy?.title ||
                  "Case study"
                }
                className="aspect-[16/9] w-full"
              />
            </Wipe>
          </Reveal>

          <div className="mt-10 grid gap-6 md:grid-cols-12">
            <Reveal
              className="md:col-span-7"
              direction="left"
            >
              <AnimatedTitle className="text-4xl font-light tracking-tight sm:text-6xl">
                {caseStudy?.title ||
                  "Selected case study"}
              </AnimatedTitle>
            </Reveal>

            <Reveal
              className="md:col-span-4 md:col-start-9"
              direction="right"
              delay={150}
            >
              <p className="max-w-md text-neutral-500">
                {caseStudy?.description}
              </p>
            </Reveal>
          </div>
        </section>

        {/* =========================
            CREATIVE TOOLS
        ========================= */}

        <section className="bg-neutral-100 px-5 py-24 sm:px-10">
          <SectionLabel
            number="08"
            title="Creative tools"
          />

          <div className="grid gap-10 md:grid-cols-12">
            <Reveal className="md:col-span-7">
              <AnimatedTitle className="text-3xl font-light leading-tight sm:text-5xl">
                A focused toolkit for creating useful, expressive digital
                experiences.
              </AnimatedTitle>
            </Reveal>

            {skills?.length > 0 && (
              <Reveal
                className="md:col-span-4 md:col-start-9"
                direction="right"
                delay={150}
              >
                <ul className="border-t border-neutral-300">
                  {skills.map(
                    (skill, index) => (
                      <li
                        key={`${skill}-tool-${index}`}
                        className="group flex justify-between border-b border-neutral-300 py-3 text-sm transition-all duration-300 hover:px-3 hover:bg-black hover:text-white"
                      >
                        <span>{skill}</span>

                        <span className="text-neutral-400 group-hover:text-neutral-500">
                          {String(index + 1).padStart(
                            2,
                            "0"
                          )}
                        </span>
                      </li>
                    )
                  )}
                </ul>
              </Reveal>
            )}
          </div>
        </section>

        {/* =========================
            PERSONAL AESTHETIC
        ========================= */}

        <section className="px-5 py-24 sm:px-10">
          <SectionLabel
            number="09"
            title="Personal aesthetic"
          />

          <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
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
              className="lg:col-span-4"
              direction="right"
              delay={150}
            >
              <AnimatedTitle className="text-3xl font-light leading-tight sm:text-4xl">
                Quiet details. Clear intention. Lasting impact.
              </AnimatedTitle>
            </Reveal>
          </div>
        </section>

        {/* =========================
            CONTACT
        ========================= */}

        <section
          id="contact"
          className="px-5 py-24 sm:px-10"
        >
          <SectionLabel
            number="10"
            title="Contact & social links"
          />

          <div className="grid gap-12 md:grid-cols-12">
            <Reveal className="md:col-span-8">
              <p className="mb-5 text-xs uppercase tracking-[0.2em] text-neutral-400">
                Get in touch
              </p>

              {email && (
                <a
                  href={`mailto:${email}`}
                  className="minimal-link block break-all text-4xl font-light tracking-tight transition-colors hover:text-neutral-500 sm:text-7xl"
                >
                  {email}
                </a>
              )}
            </Reveal>

            <Reveal
              className="flex flex-col gap-4 text-sm md:col-span-3 md:col-start-10"
              direction="right"
              delay={150}
            >
              {socialLinks?.github && (
                <a
                  className={`minimal-link ${under}`}
                  href={socialLinks.github}
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub ↗
                </a>
              )}

              {socialLinks?.linkedin && (
                <a
                  className={`minimal-link ${under}`}
                  href={socialLinks.linkedin}
                  target="_blank"
                  rel="noreferrer"
                >
                  LinkedIn ↗
                </a>
              )}
            </Reveal>
          </div>
        </section>

        {/* =========================
            THANK YOU
        ========================= */}

        <section className="border-t border-neutral-300 px-5 py-24 sm:px-10 sm:py-32">
          <SectionLabel
            number="11"
            title="Thank you"
          />

          <div className="flex flex-col justify-between gap-12 md:flex-row md:items-end">
            <Reveal direction="left">
              <AnimatedTitle className="text-[18vw] font-light leading-[0.8] tracking-tighter sm:text-[13vw]">
                THANK YOU.
              </AnimatedTitle>
            </Reveal>

            <Reveal
              direction="right"
              delay={150}
            >
              <div className="flex gap-6 text-sm">
                <a
                  href="#about"
                  className={`minimal-link ${under}`}
                >
                  About
                </a>

                <a
                  href="#work"
                  className={`minimal-link ${under}`}
                >
                  Work
                </a>

                <a
                  href="#contact"
                  className={`minimal-link ${under}`}
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

      <footer className="flex flex-col justify-between gap-3 border-t border-neutral-300 px-5 py-6 text-xs text-neutral-500 sm:flex-row sm:px-10">
        <Reveal>
          <span>{name}</span>
        </Reveal>

        <Reveal
          direction="right"
          delay={100}
        >
          <span>{role}</span>
        </Reveal>
      </footer>
    </div>
  );
}

export default MinimalMonochromeTemplate;