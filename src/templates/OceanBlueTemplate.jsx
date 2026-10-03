import { Img, Links, philosophy, pick } from "./sharedColorful";

function OceanBlueTemplate({ portfolio: p }) {
  const hero = pick(
    p.caseStudy?.image,
    p.personalAesthetic?.image,
    p.profileImage
  );

  return (
    <div
      style={{ fontFamily: "Sora, system-ui, sans-serif" }}
      className="min-h-screen overflow-x-hidden bg-gradient-to-b from-[#0a2a6b] via-[#1340b0] to-[#0e5fd8] text-white"
    >
      {/* =====================================================
          HEADER
      ===================================================== */}
      <header className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5">
        <span className="font-bold">{p.name}</span>

        <a
          href="#contact"
          className="rounded-full bg-white/15 px-4 py-1.5 text-sm transition hover:bg-cyan-300 hover:text-[#0a2a6b]"
        >
          Contact
        </a>
      </header>

      <main className="mx-auto max-w-6xl px-5">
        {/* =====================================================
            1. HERO / PROFILE
        ===================================================== */}
        <section className="grid items-center gap-10 py-12 md:grid-cols-2 md:py-20">
          <div>
            <p className="font-semibold text-cyan-300">{p.role}</p>

            <h1 className="mt-3 break-words text-5xl font-extrabold leading-[1.05] sm:text-6xl">
              {p.name}
            </h1>

            <p className="mt-6 max-w-md leading-relaxed text-blue-100">
              {p.about}
            </p>

            <a
              href="#work"
              className="mt-8 inline-block rounded-xl bg-cyan-300 px-6 py-3 font-semibold text-[#0a2a6b] transition hover:bg-white"
            >
              View projects
            </a>
          </div>

          <div className="relative">
            <Img
              src={hero}
              alt="Featured work"
              className="aspect-[4/3] w-full rounded-3xl opacity-90 ring-1 ring-white/30"
            />

            <Img
              src={p.profileImage}
              alt={`Portrait of ${p.name}`}
              className="absolute -bottom-6 -left-3 h-28 w-28 rounded-full border-4 border-cyan-300 sm:h-36 sm:w-36"
            />
          </div>
        </section>

        {/* =====================================================
            SKILLS
        ===================================================== */}
        {p.skills?.length > 0 && (
          <ul className="flex flex-wrap gap-2 pb-16">
            {p.skills.map((s) => (
              <li
                key={s}
                className="rounded-full border border-cyan-300/60 px-4 py-1.5 text-sm text-cyan-100"
              >
                {s}
              </li>
            ))}
          </ul>
        )}

        {/* =====================================================
            2. ABOUT ME
        ===================================================== */}
        <section className="pb-20">
          <div className="grid items-center gap-8 rounded-3xl bg-white/10 p-7 backdrop-blur-sm md:grid-cols-2 md:p-10">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-cyan-300">
                About Me
              </p>

              <h2 className="mt-3 text-4xl font-extrabold">
                Who I am.
              </h2>

              <p className="mt-5 leading-relaxed text-blue-100">
                {p.about}
              </p>

              <p className="mt-4 text-sm text-blue-200">
                {p.role}
              </p>
            </div>

            <Img
              src={p.profileImage}
              alt={`Portrait of ${p.name}`}
              className="aspect-[4/3] w-full rounded-3xl"
            />
          </div>
        </section>

        {/* =====================================================
            3. DESIGN PHILOSOPHY
        ===================================================== */}
        {philosophy(p).length > 0 && (
          <section className="pb-20">
            <div className="grid items-center gap-6 md:grid-cols-2">
              <div className="rounded-3xl bg-[#ff9f6b] p-8 text-[#3a1500] md:p-10">
                <p className="text-sm font-semibold uppercase tracking-widest">
                  Design Philosophy
                </p>

                <h2 className="mt-3 text-4xl font-extrabold">
                  How I think.
                </h2>

                <div className="mt-7 space-y-4">
                  {philosophy(p).map((text) => (
                    <p
                      key={text}
                      className="rounded-2xl bg-white/40 p-5 text-xl font-bold leading-snug"
                    >
                      {text}
                    </p>
                  ))}
                </div>
              </div>

              <Img
                src={p.designPhilosophy?.image}
                alt="Design philosophy"
                className="aspect-[4/3] w-full rounded-3xl ring-1 ring-white/20"
              />
            </div>
          </section>
        )}

        {/* =====================================================
            4. CORE VALUES
        ===================================================== */}
        <section className="pb-20">
          <p className="text-sm font-semibold uppercase tracking-widest text-cyan-300">
            Core Values
          </p>

          <h2 className="mt-3 text-4xl font-extrabold">
            What I value.
          </h2>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <article className="overflow-hidden rounded-3xl bg-white text-[#0a2a6b]">
              <Img
                src={p.coreValues?.image1}
                alt="Core value one"
                className="aspect-[4/3] w-full"
              />

              <div className="p-6">
                <h3 className="text-2xl font-bold">
                  Purpose
                </h3>

                <p className="mt-2 text-sm text-slate-600">
                  Creating work with clarity, meaning, and purpose.
                </p>
              </div>
            </article>

            <article className="overflow-hidden rounded-3xl bg-cyan-300 text-[#0a2a6b]">
              <Img
                src={p.coreValues?.image2}
                alt="Core value two"
                className="aspect-[4/3] w-full"
              />

              <div className="p-6">
                <h3 className="text-2xl font-bold">
                  Craft
                </h3>

                <p className="mt-2 text-sm">
                  Attention to detail and meaningful experiences.
                </p>
              </div>
            </article>
          </div>
        </section>

        {/* =====================================================
            5. FROM THOUGHT TO FORM
        ===================================================== */}
        <section className="pb-20">
          <div className="rounded-3xl bg-[#0a2a6b] p-8 md:p-12">
            <p className="text-sm font-semibold uppercase tracking-widest text-cyan-300">
              From Thought to Form
            </p>

            <h2 className="mt-4 max-w-4xl text-4xl font-extrabold leading-tight sm:text-6xl">
              Turning ideas into meaningful digital experiences.
            </h2>

            <p className="mt-6 max-w-2xl leading-relaxed text-blue-200">
              I transform ideas into thoughtful experiences through creativity,
              structure, technology, and visual storytelling.
            </p>
          </div>
        </section>

        {/* =====================================================
            6. FEATURED PROJECTS
        ===================================================== */}
        {p.projects?.length > 0 && (
          <section id="work" className="pb-20">
            <p className="text-sm font-semibold uppercase tracking-widest text-cyan-300">
              Featured Projects
            </p>

            <h2 className="mb-8 mt-2 text-3xl font-bold">
              Featured work
            </h2>

            <div className="grid auto-rows-fr gap-5 md:grid-cols-3">
              {p.projects.map((pr, i) => (
                <article
                  key={i}
                  className={`group overflow-hidden rounded-3xl bg-white text-[#0a2a6b] ${
                    i === 0
                      ? "md:col-span-2 md:row-span-2"
                      : ""
                  }`}
                >
                  <div className="overflow-hidden">
                    <Img
                      src={pr.image}
                      alt={pr.title}
                      className={`w-full transition duration-500 group-hover:scale-105 ${
                        i === 0
                          ? "aspect-[16/10]"
                          : "aspect-[16/9]"
                      }`}
                    />
                  </div>

                  <div className="p-5">
                    <p className="text-xs font-semibold text-blue-500">
                      Project {i + 1}
                    </p>

                    <h3 className="text-lg font-bold">
                      {pr.title}
                    </h3>

                    <p className="mt-1 text-sm text-slate-600">
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
          <section className="pb-20">
            <div className="grid items-center gap-5 md:grid-cols-2">
              <div className="rounded-3xl bg-cyan-300 p-8 text-[#0a2a6b] md:p-10">
                <p className="text-sm font-semibold uppercase tracking-widest">
                  Case Study
                </p>

                <h2 className="mt-2 text-3xl font-extrabold">
                  {p.caseStudy.title}
                </h2>

                <p className="mt-4 leading-relaxed">
                  {p.caseStudy.description}
                </p>
              </div>

              <Img
                src={p.caseStudy.image}
                alt={p.caseStudy.title}
                className="aspect-[16/10] w-full rounded-3xl"
              />
            </div>
          </section>
        )}

        {/* =====================================================
            8. CREATIVE TOOLS
        ===================================================== */}
        <section className="pb-20">
          <p className="text-sm font-semibold uppercase tracking-widest text-cyan-300">
            Creative Tools
          </p>

          <h2 className="mt-2 text-4xl font-extrabold">
            Tools I work with.
          </h2>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-4">
            {(p.skills || [
              "JavaScript",
              "React",
              "Node.js",
              "MongoDB",
            ]).map((tool, i) => (
              <div
                key={tool}
                className={`rounded-2xl p-6 font-bold ${
                  [
                    "bg-cyan-300 text-[#0a2a6b]",
                    "bg-white text-[#0a2a6b]",
                    "bg-[#ff9f6b] text-[#3a1500]",
                    "bg-[#0a2a6b]",
                  ][i % 4]
                }`}
              >
                {tool}
              </div>
            ))}
          </div>
        </section>

        {/* =====================================================
            9. PERSONAL AESTHETIC
        ===================================================== */}
        {p.personalAesthetic?.image && (
          <section className="pb-20">
            <div className="grid items-center gap-6 md:grid-cols-2">
              <Img
                src={p.personalAesthetic.image}
                alt="Personal aesthetic"
                className="aspect-[4/3] w-full rounded-3xl"
              />

              <div className="rounded-3xl bg-[#ff9f6b] p-8 text-[#3a1500] md:p-10">
                <p className="text-sm font-semibold uppercase tracking-widest">
                  Personal Aesthetic
                </p>

                <h2 className="mt-3 text-4xl font-extrabold">
                  My visual language.
                </h2>

                <p className="mt-5 leading-relaxed">
                  My personal aesthetic combines simplicity, personality,
                  creativity, and thoughtful visual choices.
                </p>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* =====================================================
          10. CONTACT & SOCIAL LINKS
      ===================================================== */}
      <footer
        id="contact"
        className="border-t border-white/20 px-5 py-14 text-center"
      >
        <p className="text-sm font-semibold uppercase tracking-widest text-cyan-300">
          Contact & Social Links
        </p>

        <h2 className="mt-3 text-4xl font-extrabold sm:text-6xl">
          Let's work together.
        </h2>

        {p.email && (
          <p className="mt-4 text-blue-100">
            {p.email}
          </p>
        )}

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Links
            portfolio={p}
            className="rounded-full bg-white/15 px-5 py-2 text-sm transition hover:bg-cyan-300 hover:text-[#0a2a6b]"
          />
        </div>
      </footer>

      {/* =====================================================
          11. THANK YOU
      ===================================================== */}
      <section className="bg-[#0a2a6b] px-5 py-20 text-center">
        <h2 className="text-5xl font-extrabold sm:text-7xl">
          Thank you.
        </h2>

        <p className="mt-4 text-blue-200">
          Thanks for taking the time to explore my portfolio.
        </p>
      </section>
    </div>
  );
}

export default OceanBlueTemplate;