import { Img, Links, philosophy, gallery } from "./sharedColorful";

function CrimsonBoldTemplate({ portfolio: p }) {
  const g = gallery(p);

  return (
    <div
      style={{ fontFamily: "Poppins, system-ui, sans-serif" }}
      className="min-h-screen overflow-x-hidden bg-[#fff1e6] text-[#2a0a12]"
    >
      {/* =====================================================
          1. HERO / PROFILE
      ===================================================== */}
      <section className="relative overflow-hidden bg-[#c8102e] text-[#fff1e6]">
        <p
          aria-hidden="true"
          style={{
            fontFamily: "'Bebas Neue', Impact, sans-serif",
          }}
          className="pointer-events-none absolute inset-x-0 top-6 select-none text-center text-[32vw] leading-none text-[#a50d26]"
        >
          PORTFOLIO
        </p>

        <div className="relative mx-auto grid max-w-6xl items-end gap-4 px-5 pt-10 md:grid-cols-2">
          <div className="pb-10 md:pb-16">
            <p className="text-sm font-medium">{p.role}</p>

            <h1
              style={{
                fontFamily: "'Bebas Neue', Impact, sans-serif",
              }}
              className="mt-2 break-words text-7xl leading-[0.9] sm:text-8xl lg:text-9xl"
            >
              {p.name}
            </h1>

            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/85">
              {p.about}
            </p>
          </div>

          <Img
            src={p.profileImage}
            alt={`Portrait of ${p.name}`}
            className="mx-auto aspect-[4/5] w-full max-w-md object-top"
          />
        </div>
      </section>

      {/* =====================================================
          SKILLS
      ===================================================== */}
      {p.skills?.length > 0 && (
        <ul className="mx-auto flex max-w-6xl flex-wrap gap-2 px-5 py-8">
          {p.skills.map((s) => (
            <li
              key={s}
              className="rounded border border-[#c8102e] px-3 py-1 text-sm font-medium text-[#c8102e]"
            >
              {s}
            </li>
          ))}
        </ul>
      )}

      <main>
        {/* =====================================================
            2. ABOUT ME
        ===================================================== */}
        <section className="mx-auto max-w-6xl px-5 py-16">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-[#c8102e]">
                About Me
              </p>

              <h2
                style={{
                  fontFamily: "'Bebas Neue', Impact, sans-serif",
                }}
                className="mt-2 text-6xl leading-none"
              >
                WHO I AM
              </h2>

              <p className="mt-6 max-w-xl leading-relaxed text-[#2a0a12]/75">
                {p.about}
              </p>
            </div>

            <Img
              src={p.profileImage}
              alt={`Portrait of ${p.name}`}
              className="aspect-[4/3] w-full object-cover"
            />
          </div>
        </section>

        {/* =====================================================
            3. DESIGN PHILOSOPHY
        ===================================================== */}
        {philosophy(p).length > 0 && (
          <section className="bg-[#2a0a12] text-[#fff1e6]">
            <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-20 md:grid-cols-2">
              <div>
                <p className="text-sm font-semibold uppercase tracking-widest text-[#ffb703]">
                  Design Philosophy
                </p>

                <h2
                  style={{
                    fontFamily: "'Bebas Neue', Impact, sans-serif",
                  }}
                  className="mt-2 text-6xl leading-none"
                >
                  HOW I THINK
                </h2>

                <div className="mt-8">
                  {philosophy(p).map((text, i) => (
                    <p
                      key={text}
                      className={`mb-4 border-l-4 border-[#ffb703] pl-5 text-2xl font-semibold leading-snug ${
                        i % 2 ? "text-white/80" : ""
                      }`}
                    >
                      {text}
                    </p>
                  ))}
                </div>
              </div>

              <Img
                src={p.designPhilosophy?.image}
                alt="Design philosophy"
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
          </section>
        )}

        {/* =====================================================
            4. CORE VALUES
        ===================================================== */}
        <section className="mx-auto max-w-6xl px-5 py-16">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#c8102e]">
            Core Values
          </p>

          <h2
            style={{
              fontFamily: "'Bebas Neue', Impact, sans-serif",
            }}
            className="mt-2 text-6xl leading-none"
          >
            WHAT I VALUE
          </h2>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <article className="overflow-hidden border-2 border-[#2a0a12] bg-white">
              <Img
                src={p.coreValues?.image1}
                alt="Core value one"
                className="aspect-[4/3] w-full object-cover"
              />

              <div className="border-t-2 border-[#2a0a12] p-6">
                <h3
                  style={{
                    fontFamily: "'Bebas Neue', Impact, sans-serif",
                  }}
                  className="text-4xl"
                >
                  PURPOSE
                </h3>

                <p className="mt-2 text-sm text-[#2a0a12]/70">
                  Creating work with clarity, meaning, and purpose.
                </p>
              </div>
            </article>

            <article className="overflow-hidden border-2 border-[#2a0a12] bg-[#ffb703]">
              <Img
                src={p.coreValues?.image2}
                alt="Core value two"
                className="aspect-[4/3] w-full object-cover"
              />

              <div className="border-t-2 border-[#2a0a12] p-6">
                <h3
                  style={{
                    fontFamily: "'Bebas Neue', Impact, sans-serif",
                  }}
                  className="text-4xl"
                >
                  CRAFT
                </h3>

                <p className="mt-2 text-sm">
                  Paying attention to the details that shape great experiences.
                </p>
              </div>
            </article>
          </div>
        </section>

        {/* =====================================================
            5. FROM THOUGHT TO FORM
        ===================================================== */}
        <section className="bg-[#ffb703]">
          <div className="mx-auto max-w-6xl px-5 py-20">
            <p className="text-sm font-semibold uppercase tracking-widest">
              From Thought to Form
            </p>

            <h2
              style={{
                fontFamily: "'Bebas Neue', Impact, sans-serif",
              }}
              className="mt-4 max-w-5xl text-7xl leading-[0.9] sm:text-8xl"
            >
              IDEAS
              <br />
              INTO FORM.
            </h2>

            <p className="mt-8 max-w-2xl leading-relaxed">
              I transform ideas into meaningful digital experiences through
              creativity, structure, technology, and visual storytelling.
            </p>
          </div>
        </section>

        {/* =====================================================
            6. FEATURED PROJECTS
        ===================================================== */}
        {p.projects?.length > 0 && (
          <section className="mx-auto max-w-6xl px-5 py-16">
            <p className="text-sm font-semibold uppercase tracking-widest text-[#c8102e]">
              Featured Projects
            </p>

            <h2
              style={{
                fontFamily: "'Bebas Neue', Impact, sans-serif",
              }}
              className="mb-6 mt-2 text-6xl leading-none"
            >
              SELECTED PROJECTS
            </h2>

            <ol>
              {p.projects.map((pr, i) => (
                <li
                  key={i}
                  className="group grid items-center gap-4 border-t-2 border-[#2a0a12] py-6 sm:grid-cols-[4rem_1fr_16rem]"
                >
                  <span
                    style={{
                      fontFamily: "'Bebas Neue', Impact, sans-serif",
                    }}
                    className="text-5xl text-[#c8102e]"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <div>
                    <h3 className="text-2xl font-bold">{pr.title}</h3>

                    <p className="mt-1 text-sm text-[#2a0a12]/70">
                      {pr.description}
                    </p>
                  </div>

                  <div className="overflow-hidden">
                    <Img
                      src={pr.image}
                      alt={pr.title}
                      className="aspect-[16/10] w-full transition duration-500 group-hover:scale-105"
                    />
                  </div>
                </li>
              ))}
            </ol>
          </section>
        )}

        {/* =====================================================
            7. CASE STUDY
        ===================================================== */}
        {p.caseStudy?.title && (
          <section className="grid md:grid-cols-2">
            <div className="bg-[#ffb703] p-8 sm:p-14">
              <p className="text-sm font-semibold uppercase tracking-widest">
                Case Study
              </p>

              <h2
                style={{
                  fontFamily: "'Bebas Neue', Impact, sans-serif",
                }}
                className="mt-2 text-6xl"
              >
                {p.caseStudy.title}
              </h2>

              <p className="mt-5 max-w-md leading-relaxed">
                {p.caseStudy.description}
              </p>
            </div>

            <div className="bg-[#c8102e] p-8 sm:p-14">
              <Img
                src={p.caseStudy.image}
                alt={p.caseStudy.title}
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
          </section>
        )}

        {/* =====================================================
            8. CREATIVE TOOLS
        ===================================================== */}
        <section className="mx-auto max-w-6xl px-5 py-16">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#c8102e]">
            Creative Tools
          </p>

          <h2
            style={{
              fontFamily: "'Bebas Neue', Impact, sans-serif",
            }}
            className="mt-2 text-6xl leading-none"
          >
            TOOLS I USE
          </h2>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 md:grid-cols-4">
            {(p.skills || [
              "JavaScript",
              "React",
              "Node.js",
              "MongoDB",
            ]).map((tool, i) => (
              <div
                key={tool}
                className={`border-2 border-[#2a0a12] p-6 ${
                  [
                    "bg-[#ffb703]",
                    "bg-[#c8102e] text-white",
                    "bg-white",
                    "bg-[#2a0a12] text-white",
                  ][i % 4]
                }`}
              >
                <p className="font-bold">{tool}</p>
              </div>
            ))}
          </div>
        </section>

        {/* =====================================================
            9. PERSONAL AESTHETIC
        ===================================================== */}
        {p.personalAesthetic?.image && (
          <section className="bg-[#c8102e] text-[#fff1e6]">
            <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-20 md:grid-cols-2">
              <Img
                src={p.personalAesthetic.image}
                alt="Personal aesthetic"
                className="aspect-[4/3] w-full object-cover"
              />

              <div>
                <p className="text-sm font-semibold uppercase tracking-widest text-[#ffb703]">
                  Personal Aesthetic
                </p>

                <h2
                  style={{
                    fontFamily: "'Bebas Neue', Impact, sans-serif",
                  }}
                  className="mt-3 text-6xl leading-none"
                >
                  MY VISUAL LANGUAGE
                </h2>

                <p className="mt-6 max-w-lg leading-relaxed text-white/80">
                  My personal aesthetic combines personality, simplicity,
                  creativity, and bold visual choices.
                </p>
              </div>
            </div>
          </section>
        )}

        {/* Gallery */}
        {g.length > 0 && (
          <section className="mx-auto grid max-w-6xl grid-cols-2 gap-4 px-5 py-16 md:grid-cols-4">
            {g.map((src, i) => (
              <Img
                key={i}
                src={src}
                alt={`Gallery image ${i + 1}`}
                className={`aspect-[3/4] w-full object-cover ${
                  i % 2 ? "md:mt-10" : ""
                }`}
              />
            ))}
          </section>
        )}
      </main>

      {/* =====================================================
          10. CONTACT & SOCIAL LINKS
      ===================================================== */}
      <footer
        id="contact"
        className="bg-[#c8102e] px-5 py-14 text-[#fff1e6]"
      >
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#ffb703]">
            Contact & Social Links
          </p>

          <h2
            style={{
              fontFamily: "'Bebas Neue', Impact, sans-serif",
            }}
            className="mt-2 text-6xl sm:text-8xl"
          >
            LET'S WORK
            <br />
            TOGETHER
          </h2>

          {p.email && (
            <p className="mt-5 text-sm text-white/80">
              {p.email}
            </p>
          )}

          <div className="mt-6 flex flex-wrap gap-5 text-sm font-semibold underline underline-offset-4">
            <Links
              portfolio={p}
              className="hover:text-[#ffb703]"
            />
          </div>
        </div>
      </footer>

      {/* =====================================================
          11. THANK YOU
      ===================================================== */}
      <section className="bg-[#fff1e6] px-5 py-20 text-center">
        <h2
          style={{
            fontFamily: "'Bebas Neue', Impact, sans-serif",
          }}
          className="text-7xl leading-none text-[#c8102e] sm:text-9xl"
        >
          THANK YOU.
        </h2>

        <p className="mt-5 text-sm text-[#2a0a12]/60">
          Thanks for taking the time to explore my portfolio.
        </p>
      </section>
    </div>
  );
}

export default CrimsonBoldTemplate;