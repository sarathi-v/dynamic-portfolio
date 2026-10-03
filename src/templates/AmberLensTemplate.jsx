import { Img, Links, philosophy, gallery, pick } from "./sharedColorful";

function AmberLensTemplate({ portfolio: p }) {
  const hero = pick(
    p.designPhilosophy?.image,
    p.caseStudy?.image,
    p.profileImage
  );

  const g = gallery(p);

  return (
    <div
      style={{ fontFamily: "Poppins, system-ui, sans-serif" }}
      className="min-h-screen overflow-x-hidden bg-[#fbf3e4] text-[#3a2410]"
    >
      {/* =====================================================
          1. HERO / PROFILE
      ===================================================== */}
      <section className="relative isolate flex min-h-[85vh] items-end overflow-hidden bg-[#3a2410] text-white">
        <Img
          src={hero}
          alt="Hero visual"
          className="absolute inset-0 -z-10 h-full w-full opacity-60"
        />

        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#3a2410] via-[#3a2410]/30 to-transparent" />

        <header className="absolute inset-x-0 top-0 mx-auto flex max-w-6xl items-center justify-between px-5 py-5">
          <span className="font-semibold">{p.name}</span>

          <a
            href="#contact"
            className="rounded bg-[#f4b183] px-4 py-2 text-sm font-semibold text-[#3a2410] transition hover:bg-white"
          >
            Contact
          </a>
        </header>

        <div className="mx-auto w-full max-w-6xl px-5 pb-14">
          <p className="text-sm text-[#f4b183]">{p.role}</p>

          <h1
            style={{ fontFamily: "Fraunces, Georgia, serif" }}
            className="mt-2 break-words text-5xl leading-tight sm:text-7xl"
          >
            {p.name}
          </h1>

          <p className="mt-4 max-w-lg text-white/85">{p.about}</p>
        </div>
      </section>

      {/* =====================================================
          SKILLS
      ===================================================== */}
      {p.skills?.length > 0 && (
        <ul className="mx-auto -mt-6 grid max-w-5xl grid-cols-2 gap-px overflow-hidden rounded-xl bg-[#d97706] shadow-lg sm:grid-cols-4">
          {p.skills.map((s) => (
            <li
              key={s}
              className="bg-[#3a2410] px-4 py-5 text-center text-sm font-medium text-[#f4b183]"
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
        <section className="mx-auto max-w-6xl px-5 py-20">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-[#d97706]">
                About Me
              </p>

              <h2
                style={{ fontFamily: "Fraunces, Georgia, serif" }}
                className="mt-3 text-5xl leading-tight"
              >
                A little about me.
              </h2>

              <p className="mt-6 leading-relaxed text-[#3a2410]/75">
                {p.about}
              </p>
            </div>

            <Img
              src={p.profileImage}
              alt={`Portrait of ${p.name}`}
              className="aspect-[4/3] w-full rounded-xl"
            />
          </div>
        </section>

        {/* =====================================================
            3. DESIGN PHILOSOPHY
        ===================================================== */}
        {philosophy(p).length > 0 && (
          <section className="bg-[#f4b183]">
            <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-20 md:grid-cols-2">
              <div>
                <p className="text-sm font-semibold uppercase tracking-widest">
                  Design Philosophy
                </p>

                <h2
                  style={{ fontFamily: "Fraunces, Georgia, serif" }}
                  className="mt-3 text-5xl leading-tight"
                >
                  How I think and create.
                </h2>

                <div className="mt-8 space-y-5">
                  {philosophy(p).map((text) => (
                    <p
                      key={text}
                      style={{ fontFamily: "Fraunces, Georgia, serif" }}
                      className="text-2xl leading-snug sm:text-3xl"
                    >
                      {text}
                    </p>
                  ))}
                </div>
              </div>

              <Img
                src={p.designPhilosophy?.image}
                alt="Design philosophy"
                className="aspect-[4/3] w-full rounded-xl"
              />
            </div>
          </section>
        )}

        {/* =====================================================
            4. CORE VALUES
        ===================================================== */}
        <section className="mx-auto max-w-6xl px-5 py-20">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#d97706]">
            Core Values
          </p>

          <h2
            style={{ fontFamily: "Fraunces, Georgia, serif" }}
            className="mt-3 text-5xl"
          >
            What matters to me.
          </h2>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <article className="overflow-hidden rounded-xl bg-white">
              <Img
                src={p.coreValues?.image1}
                alt="Core value one"
                className="aspect-[4/3] w-full"
              />

              <div className="p-6">
                <h3
                  style={{ fontFamily: "Fraunces, Georgia, serif" }}
                  className="text-3xl"
                >
                  Purpose
                </h3>

                <p className="mt-3 leading-relaxed text-[#3a2410]/70">
                  Creating work that has meaning, clarity, and purpose.
                </p>
              </div>
            </article>

            <article className="overflow-hidden rounded-xl bg-white">
              <Img
                src={p.coreValues?.image2}
                alt="Core value two"
                className="aspect-[4/3] w-full"
              />

              <div className="p-6">
                <h3
                  style={{ fontFamily: "Fraunces, Georgia, serif" }}
                  className="text-3xl"
                >
                  Craft
                </h3>

                <p className="mt-3 leading-relaxed text-[#3a2410]/70">
                  Paying attention to details that make an experience feel
                  considered.
                </p>
              </div>
            </article>
          </div>
        </section>

        {/* =====================================================
            5. FROM THOUGHT TO FORM
        ===================================================== */}
        <section className="bg-[#3a2410] text-white">
          <div className="mx-auto max-w-6xl px-5 py-20">
            <p className="text-sm font-semibold uppercase tracking-widest text-[#f4b183]">
              From Thought to Form
            </p>

            <h2
              style={{ fontFamily: "Fraunces, Georgia, serif" }}
              className="mt-4 max-w-4xl text-5xl leading-tight sm:text-6xl"
            >
              Turning ideas into meaningful experiences.
            </h2>

            <p className="mt-6 max-w-2xl leading-relaxed text-white/70">
              I combine creative thinking, structure, technology, and visual
              storytelling to transform ideas into finished work.
            </p>
          </div>
        </section>

        {/* =====================================================
            6. FEATURED PROJECTS
        ===================================================== */}
        {p.projects?.length > 0 && (
          <section className="mx-auto max-w-6xl px-5 py-20">
            <p className="text-sm font-semibold uppercase tracking-widest text-[#d97706]">
              Featured Projects
            </p>

            <h2
              style={{ fontFamily: "Fraunces, Georgia, serif" }}
              className="mb-8 mt-3 text-5xl"
            >
              Moments we've captured.
            </h2>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {p.projects.map((pr, i) => (
                <article
                  key={i}
                  className="group relative overflow-hidden rounded-xl"
                >
                  <Img
                    src={pr.image}
                    alt={pr.title}
                    className="aspect-[3/4] w-full transition duration-700 group-hover:scale-105"
                  />

                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-5 text-white">
                    <p className="text-xs font-semibold uppercase tracking-widest text-[#f4b183]">
                      Project {i + 1}
                    </p>

                    <h3 className="mt-1 text-lg font-semibold">
                      {pr.title}
                    </h3>

                    <p className="text-sm text-white/80">
                      {pr.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* =====================================================
            7. CASE STUDY
        ===================================================== */}
        {p.caseStudy?.title && (
          <section className="bg-[#d97706] text-white">
            <div className="mx-auto grid max-w-6xl items-center gap-8 px-5 py-14 md:grid-cols-2">
              <div>
                <p className="text-sm font-semibold uppercase tracking-widest">
                  Case Study
                </p>

                <h2
                  style={{ fontFamily: "Fraunces, Georgia, serif" }}
                  className="mt-2 text-5xl"
                >
                  {p.caseStudy.title}
                </h2>

                <p className="mt-4 leading-relaxed text-white/85">
                  {p.caseStudy.description}
                </p>
              </div>

              <Img
                src={p.caseStudy.image}
                alt={p.caseStudy.title}
                className="aspect-[16/10] w-full rounded-xl"
              />
            </div>
          </section>
        )}

        {/* =====================================================
            8. CREATIVE TOOLS
        ===================================================== */}
        <section className="mx-auto max-w-6xl px-5 py-20">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#d97706]">
            Creative Tools
          </p>

          <h2
            style={{ fontFamily: "Fraunces, Georgia, serif" }}
            className="mt-3 text-5xl"
          >
            Tools I work with.
          </h2>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {(p.skills || [
              "JavaScript",
              "React",
              "Node.js",
              "MongoDB",
            ]).map((skill, i) => (
              <div
                key={skill}
                className={`rounded-xl p-6 ${
                  [
                    "bg-[#f4b183]",
                    "bg-[#e9d5b5]",
                    "bg-[#fcd34d]",
                    "bg-white",
                  ][i % 4]
                }`}
              >
                <p className="font-semibold">{skill}</p>
              </div>
            ))}
          </div>
        </section>

        {/* =====================================================
            9. PERSONAL AESTHETIC
        ===================================================== */}
        {p.personalAesthetic?.image && (
          <section className="bg-[#f4b183]">
            <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-20 md:grid-cols-2">
              <Img
                src={p.personalAesthetic.image}
                alt="Personal aesthetic"
                className="aspect-[4/3] w-full rounded-xl"
              />

              <div>
                <p className="text-sm font-semibold uppercase tracking-widest">
                  Personal Aesthetic
                </p>

                <h2
                  style={{ fontFamily: "Fraunces, Georgia, serif" }}
                  className="mt-3 text-5xl leading-tight"
                >
                  A visual language of my own.
                </h2>

                <p className="mt-5 leading-relaxed text-[#3a2410]/75">
                  My visual style brings together simplicity, personality,
                  creativity, and thoughtful composition.
                </p>
              </div>
            </div>
          </section>
        )}

        {/* Additional gallery using the available portfolio images */}
        {g.length > 0 && (
          <div className="flex gap-2 overflow-x-auto bg-[#3a2410] p-2">
            {g.map((src, i) => (
              <Img
                key={i}
                src={src}
                alt={`Gallery image ${i + 1}`}
                className="h-40 w-40 shrink-0 rounded"
              />
            ))}
          </div>
        )}
      </main>

      {/* =====================================================
          10. CONTACT & SOCIAL LINKS
      ===================================================== */}
      <footer
        id="contact"
        className="bg-[#3a2410] px-5 py-14 text-white"
      >
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-5">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-[#f4b183]">
              Contact & Social Links
            </p>

            <h2
              style={{ fontFamily: "Fraunces, Georgia, serif" }}
              className="mt-2 text-4xl"
            >
              Let's tell your story.
            </h2>

            {p.email && (
              <p className="mt-3 text-white/70">
                {p.email}
              </p>
            )}
          </div>

          <div className="flex gap-3 text-sm font-semibold">
            <Links
              portfolio={p}
              className="rounded bg-[#f4b183] px-4 py-2 text-[#3a2410] transition hover:bg-white"
            />
          </div>
        </div>
      </footer>

      {/* =====================================================
          11. THANK YOU
      ===================================================== */}
      <section className="bg-[#fbf3e4] px-5 py-16 text-center">
        <h2
          style={{ fontFamily: "Fraunces, Georgia, serif" }}
          className="text-5xl sm:text-7xl"
        >
          Thank you.
        </h2>

        <p className="mt-4 text-[#3a2410]/60">
          Thank you for taking the time to explore this portfolio.
        </p>
      </section>
    </div>
  );
}

export default AmberLensTemplate;