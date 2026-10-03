import { useEffect, useRef, useState } from "react";
import { Img, Links, philosophy } from "./sharedColorful";

const borders = [
  "border-[#fb7185]",
  "border-[#0f766e]",
  "border-[#f59e0b]",
];

/* =========================================================
   ANIMATION HELPERS
========================================================= */

const useInView = (threshold = 0.12) => {
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

  const hiddenTransforms = {
    up: "translate3d(0,60px,0)",
    down: "translate3d(0,-60px,0)",
    left: "translate3d(-60px,0,0)",
    right: "translate3d(60px,0,0)",
    zoom: "scale(.82)",
    rotate: "translateY(45px) rotate(5deg)",
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible
          ? "translate3d(0,0,0) scale(1) rotate(0)"
          : hiddenTransforms[direction],
        transition: `
          opacity 850ms ease ${delay}ms,
          transform 950ms cubic-bezier(.16,1,.3,1) ${delay}ms
        `,
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
      aria-label={String(children)}
    >
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
                ? "translateY(0) rotate(0)"
                : "translateY(110%) rotate(5deg)",
              transition:
                "opacity 650ms ease, transform 800ms cubic-bezier(.16,1,.3,1)",
              transitionDelay: `${delay + index * 75}ms`,
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
          transform: visible
            ? "scale(1)"
            : "scale(1.12)",
          transition: `
            opacity 900ms ease ${delay}ms,
            transform 1200ms cubic-bezier(.16,1,.3,1) ${delay}ms
          `,
        }}
      >
        {children}
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[#fde68a]"
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
};

const Tilt = ({
  children,
  className = "",
  strength = 8,
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
      perspective(1000px)
      rotateX(${y * -strength}deg)
      rotateY(${x * strength}deg)
      translateY(-7px)
    `;
  };

  const handleLeave = () => {
    const node = ref.current;
    if (!node) return;

    node.style.transform =
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
          "transform 500ms cubic-bezier(.16,1,.3,1)",
      }}
    >
      {children}
    </div>
  );
};

/* =========================================================
   MAIN TEMPLATE
========================================================= */

function MintFreshTemplate({ portfolio: p }) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [cursor, setCursor] = useState({
    x: -100,
    y: -100,
  });

  const [heroMouse, setHeroMouse] = useState({
    x: 0,
    y: 0,
  });

  /* =====================================================
     SCROLL PROGRESS
  ===================================================== */

  useEffect(() => {
    const handleScroll = () => {
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

  /* =====================================================
     HERO PARALLAX
  ===================================================== */

  const handleHeroMouseMove = (event) => {
    const rect =
      event.currentTarget.getBoundingClientRect();

    const x =
      (event.clientX - rect.left) /
        rect.width -
      0.5;

    const y =
      (event.clientY - rect.top) /
        rect.height -
      0.5;

    setHeroMouse({
      x,
      y,
    });
  };

  const resetHeroMouse = () => {
    setHeroMouse({
      x: 0,
      y: 0,
    });
  };

  return (
    <div
      style={{
        fontFamily:
          "Poppins, system-ui, sans-serif",
      }}
      className="mint-fresh min-h-screen overflow-x-hidden bg-[#ecfdf5] text-[#134e4a]"
      onMouseMove={handleHeroMouseMove}
      onMouseLeave={resetHeroMouse}
    >
      {/* =====================================================
          ANIMATION STYLES
      ===================================================== */}

      <style>{`
        @keyframes mintFloat {
          0%, 100% {
            transform: translate3d(0,0,0);
          }

          50% {
            transform: translate3d(0,-20px,0);
          }
        }

        @keyframes mintFloatReverse {
          0%, 100% {
            transform: translate3d(0,0,0);
          }

          50% {
            transform: translate3d(15px,20px,0);
          }
        }

        @keyframes mintPulse {
          0%, 100% {
            opacity: .12;
            transform: scale(1);
          }

          50% {
            opacity: .28;
            transform: scale(1.12);
          }
        }

        @keyframes mintMarquee {
          from {
            transform: translateX(0);
          }

          to {
            transform: translateX(-50%);
          }
        }

        @keyframes mintBlob {
          0%, 100% {
            border-radius: 45% 55% 60% 40%;
          }

          50% {
            border-radius: 60% 40% 45% 55%;
          }
        }

        @keyframes mintBounce {
          0%, 100% {
            transform: translateY(0);
          }

          50% {
            transform: translateY(-6px);
          }
        }

        .mint-image {
          transition:
            transform 800ms cubic-bezier(.16,1,.3,1),
            filter 500ms ease;
        }

        .mint-image:hover {
          transform: scale(1.07);
          filter: saturate(1.08);
        }

        .mint-project {
          transition:
            box-shadow 500ms ease,
            transform 500ms cubic-bezier(.16,1,.3,1);
        }

        .mint-project:hover {
          box-shadow:
            0 30px 70px rgba(19,78,74,.2);
        }

        .mint-pill {
          transition:
            transform 300ms ease,
            box-shadow 300ms ease;
        }

        .mint-pill:hover {
          transform: translateY(-4px) scale(1.04);
          box-shadow:
            0 10px 25px rgba(19,78,74,.12);
        }

        .mint-button {
          position: relative;
          overflow: hidden;
          transition:
            transform 300ms ease,
            box-shadow 300ms ease,
            background-color 300ms ease;
        }

        .mint-button::before {
          content: "";
          position: absolute;
          inset: 0;
          background: rgba(255,255,255,.2);
          transform: translateX(-110%);
          transition:
            transform 500ms cubic-bezier(.77,0,.18,1);
        }

        .mint-button:hover::before {
          transform: translateX(110%);
        }

        .mint-button:hover {
          transform: translateY(-3px) scale(1.03);
          box-shadow:
            0 15px 35px rgba(15,118,110,.25);
        }

        .mint-tool {
          transition:
            transform 400ms cubic-bezier(.16,1,.3,1),
            box-shadow 400ms ease;
        }

        .mint-tool:hover {
          transform:
            translateY(-8px)
            rotate(-1deg);
          box-shadow:
            0 18px 40px rgba(19,78,74,.15);
        }

        .mint-value {
          transition:
            transform 500ms cubic-bezier(.16,1,.3,1),
            box-shadow 500ms ease;
        }

        .mint-value:hover {
          transform: translateY(-8px);
          box-shadow:
            0 25px 55px rgba(19,78,74,.14);
        }

        .mint-link {
          position: relative;
        }

        .mint-link::after {
          content: "";
          position: absolute;
          bottom: -4px;
          left: 0;
          height: 2px;
          width: 100%;
          background: #fde68a;
          transform: scaleX(0);
          transform-origin: right;
          transition:
            transform 350ms ease;
        }

        .mint-link:hover::after {
          transform: scaleX(1);
          transform-origin: left;
        }

        .mint-shine {
          position: relative;
          overflow: hidden;
        }

        .mint-shine::after {
          content: "";
          position: absolute;
          inset: 0;
          width: 35%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255,255,255,.35),
            transparent
          );
          transform: translateX(-180%);
          transition:
            transform 900ms ease;
        }

        .mint-shine:hover::after {
          transform: translateX(350%);
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
        className="fixed left-0 top-0 z-[9999] h-1 bg-[#fb7185]"
        style={{
          width: `${scrollProgress * 100}%`,
          boxShadow:
            "0 0 15px rgba(251,113,133,.65)",
        }}
      />

      {/* =====================================================
          CURSOR GLOW
      ===================================================== */}

      <div
        aria-hidden="true"
        className="pointer-events-none fixed z-[9998] hidden h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#99f6e4]/30 blur-3xl md:block"
        style={{
          left: cursor.x,
          top: cursor.y,
        }}
      />

      {/* =====================================================
          FLOATING BACKGROUND SHAPES
      ===================================================== */}

      <div
        aria-hidden="true"
        className="pointer-events-none fixed left-[-50px] top-[20%] z-0 h-48 w-48 bg-[#fecdd3]/40 blur-3xl"
        style={{
          animation:
            "mintBlob 8s ease-in-out infinite, mintFloat 7s ease-in-out infinite",
        }}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none fixed right-[-50px] top-[50%] z-0 h-56 w-56 rounded-full bg-[#99f6e4]/40 blur-3xl"
        style={{
          animation:
            "mintPulse 8s ease-in-out infinite",
        }}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none fixed bottom-[10%] left-[35%] z-0 h-40 w-40 rounded-full bg-[#fde68a]/30 blur-3xl"
        style={{
          animation:
            "mintFloatReverse 9s ease-in-out infinite",
        }}
      />

      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className="relative z-10 mx-auto flex max-w-6xl items-center justify-between px-5 py-5">
        <Reveal direction="left">
          <span className="mint-pill inline-block rounded-full bg-[#fde68a] px-4 py-1 font-semibold">
            {p.name}
          </span>
        </Reveal>

        <Reveal direction="right" delay={100}>
          <a
            href="#contact"
            className="mint-button rounded-full bg-[#0f766e] px-5 py-2 text-sm font-semibold text-white hover:bg-[#fb7185]"
          >
            <span className="relative z-10">
              Contact
            </span>
          </a>
        </Reveal>
      </header>

      <main>
        {/* =====================================================
            1. HERO / PROFILE
        ===================================================== */}

        <section className="relative mx-auto max-w-6xl px-5 py-10 md:py-16">
          <div
            className="absolute right-[10%] top-10 -z-10 h-32 w-32 rounded-full bg-[#fde68a]/40 blur-2xl"
            style={{
              animation:
                "mintFloat 6s ease-in-out infinite",
            }}
          />

          <div className="grid items-center gap-10 md:grid-cols-2">
            <div>
              <Reveal direction="left" delay={150}>
                <p className="font-semibold text-[#fb7185]">
                  {p.role}
                </p>
              </Reveal>

              <AnimatedTitle
                className="mt-2 break-words text-5xl font-extrabold leading-tight sm:text-7xl"
                delay={250}
              >
                {p.name}
              </AnimatedTitle>

              <Reveal direction="up" delay={550}>
                <p className="mt-5 max-w-md leading-relaxed">
                  {p.about}
                </p>
              </Reveal>

              {p.skills?.length > 0 && (
                <div className="mt-6 flex flex-wrap gap-2">
                  {p.skills.map((s, i) => (
                    <Reveal
                      key={s}
                      direction="up"
                      delay={650 + i * 70}
                    >
                      <li
                        className={`mint-pill list-none rounded-full px-4 py-1 text-sm font-medium ${
                          [
                            "bg-[#fecdd3]",
                            "bg-[#99f6e4]",
                            "bg-[#fde68a]",
                          ][i % 3]
                        }`}
                      >
                        {s}
                      </li>
                    </Reveal>
                  ))}
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Wipe delay={200}>
                <div
                  style={{
                    transform: `
                      translate3d(
                        ${heroMouse.x * -12}px,
                        ${heroMouse.y * -12}px,
                        0
                      )
                    `,
                    transition:
                      "transform 400ms ease-out",
                  }}
                >
                  <Img
                    src={p.profileImage}
                    alt={`Portrait of ${p.name}`}
                    className="mint-image row-span-2 aspect-[3/5] w-full rounded-[2rem]"
                  />
                </div>
              </Wipe>

              <Wipe delay={350}>
                <div
                  style={{
                    transform: `
                      translate3d(
                        ${heroMouse.x * 10}px,
                        ${heroMouse.y * 10}px,
                        0
                      )
                    `,
                    transition:
                      "transform 500ms ease-out",
                  }}
                >
                  <Img
                    src={p.coreValues?.image1}
                    alt="Core value one"
                    className="mint-image aspect-square w-full rounded-[2rem]"
                  />
                </div>
              </Wipe>

              <Wipe delay={500}>
                <div
                  style={{
                    transform: `
                      translate3d(
                        ${heroMouse.x * -7}px,
                        ${heroMouse.y * -7}px,
                        0
                      )
                    `,
                    transition:
                      "transform 600ms ease-out",
                  }}
                >
                  <Img
                    src={p.coreValues?.image2}
                    alt="Core value two"
                    className="mint-image aspect-square w-full rounded-[2rem]"
                  />
                </div>
              </Wipe>
            </div>
          </div>

          <Reveal direction="up" delay={850}>
            <div className="mx-auto mt-10 flex justify-center">
              <div
                className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-[#0f766e]/40 p-1"
                style={{
                  animation:
                    "mintBounce 1.8s ease-in-out infinite",
                }}
              >
                <span className="h-2 w-1 rounded-full bg-[#fb7185]" />
              </div>
            </div>
          </Reveal>
        </section>

        {/* =====================================================
            2. ABOUT ME
        ===================================================== */}

        <section className="mx-auto max-w-6xl px-5 py-16">
          <Reveal direction="up">
            <div className="mint-value rounded-[2rem] bg-white p-8 shadow-sm md:p-12">
              <Reveal direction="left" delay={100}>
                <p className="font-semibold uppercase tracking-widest text-[#fb7185]">
                  About Me
                </p>
              </Reveal>

              <div className="mt-4 grid gap-8 md:grid-cols-2 md:items-center">
                <AnimatedTitle
                  className="text-4xl font-extrabold sm:text-5xl"
                  delay={150}
                >
                  A little about who I am.
                </AnimatedTitle>

                <Reveal direction="right" delay={300}>
                  <p className="leading-relaxed text-[#134e4a]/75">
                    {p.about}
                  </p>
                </Reveal>
              </div>
            </div>
          </Reveal>
        </section>

        {/* =====================================================
            3. DESIGN PHILOSOPHY
        ===================================================== */}

        {philosophy(p).length > 0 && (
          <section className="mx-auto max-w-6xl px-5 py-16">
            <div className="grid gap-8 md:grid-cols-2 md:items-center">
              <div>
                <Reveal direction="left">
                  <p className="font-semibold uppercase tracking-widest text-[#fb7185]">
                    Design Philosophy
                  </p>
                </Reveal>

                <AnimatedTitle
                  className="mt-3 text-4xl font-extrabold sm:text-5xl"
                  delay={100}
                >
                  How I think about design.
                </AnimatedTitle>

                <div className="mt-8 space-y-4">
                  {philosophy(p).map((text, i) => (
                    <Reveal
                      key={text}
                      direction={
                        i % 2 === 0
                          ? "left"
                          : "right"
                      }
                      delay={150 + i * 130}
                    >
                      <p
                        className={`mint-shine rounded-2xl p-5 text-xl font-bold leading-snug transition-transform duration-300 hover:translate-x-2 ${
                          i % 2 === 0
                            ? "bg-[#fecdd3]"
                            : "bg-[#fde68a]"
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
                  className="mint-image aspect-[4/3] w-full rounded-[2rem]"
                />
              </Wipe>
            </div>
          </section>
        )}

        {/* =====================================================
            4. CORE VALUES
        ===================================================== */}

        <section className="mx-auto max-w-6xl px-5 py-16">
          <Reveal direction="left">
            <p className="font-semibold uppercase tracking-widest text-[#fb7185]">
              Core Values
            </p>
          </Reveal>

          <AnimatedTitle
            className="mt-2 text-4xl font-extrabold sm:text-5xl"
            delay={100}
          >
            What I value.
          </AnimatedTitle>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <Reveal direction="left">
              <Tilt
                className="mint-value overflow-hidden rounded-[2rem] bg-white"
                strength={6}
              >
                <Wipe>
                  <Img
                    src={p.coreValues?.image1}
                    alt="Core value one"
                    className="mint-image aspect-[4/3] w-full"
                  />
                </Wipe>

                <div className="p-6">
                  <h3 className="text-2xl font-bold">
                    Value One
                  </h3>

                  <p className="mt-2 text-[#134e4a]/70">
                    Thoughtful work with purpose and
                    clarity.
                  </p>
                </div>
              </Tilt>
            </Reveal>

            <Reveal direction="right" delay={150}>
              <Tilt
                className="mint-value overflow-hidden rounded-[2rem] bg-white"
                strength={6}
              >
                <Wipe delay={150}>
                  <Img
                    src={p.coreValues?.image2}
                    alt="Core value two"
                    className="mint-image aspect-[4/3] w-full"
                  />
                </Wipe>

                <div className="p-6">
                  <h3 className="text-2xl font-bold">
                    Value Two
                  </h3>

                  <p className="mt-2 text-[#134e4a]/70">
                    Creating meaningful and lasting
                    experiences.
                  </p>
                </div>
              </Tilt>
            </Reveal>
          </div>
        </section>

        {/* =====================================================
            5. FROM THOUGHT TO FORM
        ===================================================== */}

        <section className="mx-auto max-w-6xl px-5 py-16">
          <Reveal direction="zoom">
            <div className="relative overflow-hidden rounded-[2rem] bg-[#0f766e] p-8 text-white md:p-14">
              <div
                aria-hidden="true"
                className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[#99f6e4]/20 blur-2xl"
                style={{
                  animation:
                    "mintPulse 5s ease-in-out infinite",
                }}
              />

              <div
                aria-hidden="true"
                className="absolute bottom-0 left-0 h-32 w-32 rounded-full bg-[#fde68a]/10 blur-2xl"
                style={{
                  animation:
                    "mintFloatReverse 7s ease-in-out infinite",
                }}
              />

              <Reveal direction="left">
                <p className="relative font-semibold uppercase tracking-widest text-[#fde68a]">
                  From Thought to Form
                </p>
              </Reveal>

              <AnimatedTitle
                className="relative mt-4 max-w-4xl text-4xl font-extrabold leading-tight sm:text-6xl"
                delay={100}
              >
                Ideas become meaningful when they take form.
              </AnimatedTitle>

              <Reveal direction="up" delay={450}>
                <p className="relative mt-6 max-w-2xl leading-relaxed text-white/80">
                  I transform ideas into thoughtful digital
                  experiences through structure, creativity,
                  technology, and attention to detail.
                </p>
              </Reveal>
            </div>
          </Reveal>
        </section>

        {/* =====================================================
            6. FEATURED PROJECTS
        ===================================================== */}

        {p.projects?.length > 0 && (
          <section className="mx-auto max-w-6xl px-5 py-16">
            <Reveal direction="left">
              <p className="font-semibold uppercase tracking-widest text-[#fb7185]">
                Featured Projects
              </p>
            </Reveal>

            <AnimatedTitle
              className="mb-8 mt-2 text-4xl font-extrabold sm:text-5xl"
              delay={100}
            >
              My projects
            </AnimatedTitle>

            <div className="grid gap-6 md:grid-cols-2">
              {p.projects.map((pr, i) => (
                <Reveal
                  key={i}
                  direction={
                    i % 2 === 0
                      ? "left"
                      : "right"
                  }
                  delay={i * 130}
                >
                  <Tilt
                    className={`mint-project group overflow-hidden rounded-[2rem] border-4 bg-white ${
                      borders[i % 3]
                    }`}
                    strength={8}
                  >
                    <div className="relative overflow-hidden">
                      <Img
                        src={pr.image}
                        alt={pr.title}
                        className="mint-image aspect-[16/10] w-full"
                      />

                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#134e4a]/30 to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />
                    </div>

                    <div className="p-5">
                      <p className="text-sm font-semibold text-[#fb7185]">
                        Project {i + 1}
                      </p>

                      <h3 className="mt-1 text-xl font-bold transition-transform duration-300 group-hover:translate-x-2">
                        {pr.title}
                      </h3>

                      <p className="mt-1 text-sm text-[#134e4a]/75">
                        {pr.description}
                      </p>

                      <div className="mt-4 h-1 w-0 rounded-full bg-[#fde68a] transition-all duration-500 group-hover:w-20" />
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
          <section className="mx-auto max-w-6xl px-5 py-16">
            <Reveal direction="zoom">
              <div className="grid items-center gap-8 overflow-hidden rounded-[2rem] bg-[#0f766e] p-6 text-white sm:p-10 md:grid-cols-2">
                <Reveal direction="left">
                  <div>
                    <p className="text-sm font-semibold text-[#fde68a]">
                      Case Study
                    </p>

                    <AnimatedTitle
                      className="mt-2 text-4xl font-extrabold"
                      delay={100}
                    >
                      {p.caseStudy.title}
                    </AnimatedTitle>

                    <Reveal direction="up" delay={350}>
                      <p className="mt-3 leading-relaxed text-white/80">
                        {p.caseStudy.description}
                      </p>
                    </Reveal>
                  </div>
                </Reveal>

                <Wipe delay={250}>
                  <Img
                    src={p.caseStudy.image}
                    alt={p.caseStudy.title}
                    className="mint-image aspect-[4/3] w-full rounded-3xl"
                  />
                </Wipe>
              </div>
            </Reveal>
          </section>
        )}

        {/* =====================================================
            8. CREATIVE TOOLS
        ===================================================== */}

        <section className="mx-auto max-w-6xl px-5 py-16">
          <Reveal direction="left">
            <p className="font-semibold uppercase tracking-widest text-[#fb7185]">
              Creative Tools
            </p>
          </Reveal>

          <AnimatedTitle
            className="mt-2 text-4xl font-extrabold sm:text-5xl"
            delay={100}
          >
            Tools I work with.
          </AnimatedTitle>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-4">
            {(p.skills?.length
              ? p.skills
              : [
                  "JavaScript",
                  "React",
                  "Node.js",
                  "MongoDB",
                ]
            ).map((tool, i) => (
              <Reveal
                key={tool}
                direction="up"
                delay={i * 100}
              >
                <div
                  className={`mint-tool mint-shine rounded-[1.5rem] p-6 font-bold ${
                    [
                      "bg-[#fecdd3]",
                      "bg-[#99f6e4]",
                      "bg-[#fde68a]",
                      "bg-white",
                    ][i % 4]
                  }`}
                >
                  <span className="relative z-10">
                    {tool}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* =====================================================
            9. PERSONAL AESTHETIC
        ===================================================== */}

        {p.personalAesthetic?.image && (
          <section className="mx-auto max-w-6xl px-5 py-16">
            <div className="grid gap-8 md:grid-cols-2 md:items-center">
              <Wipe>
                <Img
                  src={p.personalAesthetic.image}
                  alt="Personal aesthetic"
                  className="mint-image aspect-[4/3] w-full rounded-[2rem]"
                />
              </Wipe>

              <Reveal direction="right">
                <div>
                  <p className="font-semibold uppercase tracking-widest text-[#fb7185]">
                    Personal Aesthetic
                  </p>

                  <AnimatedTitle
                    className="mt-3 text-4xl font-extrabold sm:text-5xl"
                    delay={100}
                  >
                    A visual language that feels like me.
                  </AnimatedTitle>

                  <Reveal direction="up" delay={350}>
                    <p className="mt-5 leading-relaxed text-[#134e4a]/75">
                      My personal aesthetic brings
                      together simplicity, personality,
                      creativity, and thoughtful visual
                      choices.
                    </p>
                  </Reveal>
                </div>
              </Reveal>
            </div>
          </section>
        )}
      </main>

      {/* =====================================================
          CONTACT
      ===================================================== */}

      <footer
        id="contact"
        className="relative mt-10 overflow-hidden bg-[#fb7185] px-5 py-14 text-white"
      >
        <div
          aria-hidden="true"
          className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#fde68a]/30 blur-3xl"
          style={{
            animation:
              "mintPulse 6s ease-in-out infinite",
          }}
        />

        <div
          aria-hidden="true"
          className="absolute -bottom-20 -left-20 h-56 w-56 rounded-full bg-[#99f6e4]/20 blur-3xl"
          style={{
            animation:
              "mintFloatReverse 8s ease-in-out infinite",
          }}
        />

        <div className="relative mx-auto max-w-6xl">
          <Reveal direction="left">
            <p className="font-semibold uppercase tracking-widest text-[#fde68a]">
              Contact & Social Links
            </p>
          </Reveal>

          <AnimatedTitle
            className="mt-2 text-4xl font-extrabold sm:text-6xl"
            delay={100}
          >
            Say hello
          </AnimatedTitle>

          <Reveal direction="up" delay={400}>
            <p className="mt-4 max-w-xl text-white/85">
              Interested in working together? Let's
              connect and create something meaningful.
            </p>
          </Reveal>

          <Reveal direction="up" delay={550}>
            <div className="mt-6 flex flex-wrap gap-3 text-sm font-semibold">
              <Links
                portfolio={p}
                className="mint-button mint-link rounded-full bg-white px-5 py-2 text-[#134e4a] hover:bg-[#fde68a]"
              />
            </div>
          </Reveal>
        </div>
      </footer>

      {/* =====================================================
          THANK YOU
      ===================================================== */}

      <section className="relative overflow-hidden bg-[#ecfdf5] px-5 py-16 text-center">
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#99f6e4]/40 blur-3xl"
          style={{
            animation:
              "mintPulse 5s ease-in-out infinite",
          }}
        />

        <AnimatedTitle
          className="relative text-5xl font-extrabold sm:text-7xl"
          delay={100}
        >
          Thank you.
        </AnimatedTitle>

        <Reveal direction="up" delay={450}>
          <p className="relative mt-4 text-[#134e4a]/60">
            Thanks for taking the time to explore my
            portfolio.
          </p>
        </Reveal>
      </section>

      {/* =====================================================
          INFINITE SKILLS MARQUEE
      ===================================================== */}

      {p.skills?.length > 0 && (
        <div className="overflow-hidden bg-[#134e4a] py-3 text-[#fde68a]">
          <div
            className="flex w-max gap-8 whitespace-nowrap text-xs font-bold uppercase tracking-[0.25em]"
            style={{
              animation:
                "mintMarquee 18s linear infinite",
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

export default MintFreshTemplate;