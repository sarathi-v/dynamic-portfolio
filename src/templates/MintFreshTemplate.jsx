import { Img, Links, philosophy } from "./sharedColorful";

const borders = [
  "border-[#fb7185]",
  "border-[#0f766e]",
  "border-[#f59e0b]",
];

function MintFreshTemplate({ portfolio: p }) {
  return (
    <div
      style={{ fontFamily: "Poppins, system-ui, sans-serif" }}
      className="min-h-screen overflow-x-hidden bg-[#ecfdf5] text-[#134e4a]"
    >
      {/* HEADER */}
      <header className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5">
        <span className="rounded-full bg-[#fde68a] px-4 py-1 font-semibold">
          {p.name}
        </span>

        <a
          href="#contact"
          className="rounded-full bg-[#0f766e] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[#fb7185]"
        >
          Contact
        </a>
      </header>

      <main>
        {/* =====================================================
            1. HERO / PROFILE
        ===================================================== */}
        <section className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-10 md:grid-cols-2 md:py-16">
          <div>
            <p className="font-semibold text-[#fb7185]">{p.role}</p>

            <h1 className="mt-2 break-words text-5xl font-extrabold leading-tight sm:text-7xl">
              {p.name}
            </h1>

            <p className="mt-5 max-w-md leading-relaxed">{p.about}</p>

            {p.skills?.length > 0 && (
              <ul className="mt-6 flex flex-wrap gap-2">
                {p.skills.map((s, i) => (
                  <li
                    key={s}
                    className={`rounded-full px-4 py-1 text-sm font-medium ${
                      [
                        "bg-[#fecdd3]",
                        "bg-[#99f6e4]",
                        "bg-[#fde68a]",
                      ][i % 3]
                    }`}
                  >
                    {s}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Img
              src={p.profileImage}
              alt={`Portrait of ${p.name}`}
              className="row-span-2 aspect-[3/5] w-full rounded-[2rem]"
            />

            <Img
              src={p.coreValues?.image1}
              alt="Core value one"
              className="aspect-square w-full rounded-[2rem]"
            />

            <Img
              src={p.coreValues?.image2}
              alt="Core value two"
              className="aspect-square w-full rounded-[2rem]"
            />
          </div>
        </section>

        {/* =====================================================
            2. ABOUT ME
        ===================================================== */}
        <section className="mx-auto max-w-6xl px-5 py-16">
          <div className="rounded-[2rem] bg-white p-8 shadow-sm md:p-12">
            <p className="font-semibold uppercase tracking-widest text-[#fb7185]">
              About Me
            </p>

            <div className="mt-4 grid gap-8 md:grid-cols-2 md:items-center">
              <h2 className="text-4xl font-extrabold sm:text-5xl">
                A little about who I am.
              </h2>

              <p className="leading-relaxed text-[#134e4a]/75">
                {p.about}
              </p>
            </div>
          </div>
        </section>

        {/* =====================================================
            3. DESIGN PHILOSOPHY
        ===================================================== */}
        {philosophy(p).length > 0 && (
          <section className="mx-auto max-w-6xl px-5 py-16">
            <div className="grid gap-8 md:grid-cols-2 md:items-center">
              <div>
                <p className="font-semibold uppercase tracking-widest text-[#fb7185]">
                  Design Philosophy
                </p>

                <h2 className="mt-3 text-4xl font-extrabold sm:text-5xl">
                  How I think about design.
                </h2>

                <div className="mt-8 space-y-4">
                  {philosophy(p).map((text, i) => (
                    <p
                      key={text}
                      className={`rounded-2xl p-5 text-xl font-bold leading-snug ${
                        i % 2 === 0
                          ? "bg-[#fecdd3]"
                          : "bg-[#fde68a]"
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
                className="aspect-[4/3] w-full rounded-[2rem]"
              />
            </div>
          </section>
        )}

        {/* =====================================================
            4. CORE VALUES
        ===================================================== */}
        <section className="mx-auto max-w-6xl px-5 py-16">
          <div className="mb-8">
            <p className="font-semibold uppercase tracking-widest text-[#fb7185]">
              Core Values
            </p>

            <h2 className="mt-2 text-4xl font-extrabold sm:text-5xl">
              What I value.
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="overflow-hidden rounded-[2rem] bg-white">
              <Img
                src={p.coreValues?.image1}
                alt="Core value one"
                className="aspect-[4/3] w-full"
              />

              <div className="p-6">
                <h3 className="text-2xl font-bold">Value One</h3>
                <p className="mt-2 text-[#134e4a]/70">
                  Thoughtful work with purpose and clarity.
                </p>
              </div>
            </div>

            <div className="overflow-hidden rounded-[2rem] bg-white">
              <Img
                src={p.coreValues?.image2}
                alt="Core value two"
                className="aspect-[4/3] w-full"
              />

              <div className="p-6">
                <h3 className="text-2xl font-bold">Value Two</h3>
                <p className="mt-2 text-[#134e4a]/70">
                  Creating meaningful and lasting experiences.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            5. FROM THOUGHT TO FORM
        ===================================================== */}
        <section className="mx-auto max-w-6xl px-5 py-16">
          <div className="rounded-[2rem] bg-[#0f766e] p-8 text-white md:p-14">
            <p className="font-semibold uppercase tracking-widest text-[#fde68a]">
              From Thought to Form
            </p>

            <h2 className="mt-4 max-w-4xl text-4xl font-extrabold leading-tight sm:text-6xl">
              Ideas become meaningful when they take form.
            </h2>

            <p className="mt-6 max-w-2xl leading-relaxed text-white/80">
              I transform ideas into thoughtful digital experiences through
              structure, creativity, technology, and attention to detail.
            </p>
          </div>
        </section>

        {/* =====================================================
            6. FEATURED PROJECTS
        ===================================================== */}
        {p.projects?.length > 0 && (
          <section className="mx-auto max-w-6xl px-5 py-16">
            <p className="font-semibold uppercase tracking-widest text-[#fb7185]">
              Featured Projects
            </p>

            <h2 className="mb-8 mt-2 text-4xl font-extrabold sm:text-5xl">
              My projects
            </h2>

            <div className="grid gap-6 md:grid-cols-2">
              {p.projects.map((pr, i) => (
                <article
                  key={i}
                  className={`group overflow-hidden rounded-[2rem] border-4 bg-white transition hover:-rotate-1 ${
                    borders[i % 3]
                  }`}
                >
                  <div className="overflow-hidden">
                    <Img
                      src={pr.image}
                      alt={pr.title}
                      className="aspect-[16/10] w-full transition duration-500 group-hover:scale-105"
                    />
                  </div>

                  <div className="p-5">
                    <p className="text-sm font-semibold text-[#fb7185]">
                      Project {i + 1}
                    </p>

                    <h3 className="mt-1 text-xl font-bold">
                      {pr.title}
                    </h3>

                    <p className="mt-1 text-sm text-[#134e4a]/75">
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
          <section className="mx-auto max-w-6xl px-5 py-16">
            <div className="grid items-center gap-8 rounded-[2rem] bg-[#0f766e] p-6 text-white sm:p-10 md:grid-cols-2">
              <div>
                <p className="text-sm font-semibold text-[#fde68a]">
                  Case Study
                </p>

                <h2 className="mt-2 text-4xl font-extrabold">
                  {p.caseStudy.title}
                </h2>

                <p className="mt-3 leading-relaxed text-white/80">
                  {p.caseStudy.description}
                </p>
              </div>

              <Img
                src={p.caseStudy.image}
                alt={p.caseStudy.title}
                className="aspect-[4/3] w-full rounded-3xl"
              />
            </div>
          </section>
        )}

        {/* =====================================================
            8. CREATIVE TOOLS
        ===================================================== */}
        <section className="mx-auto max-w-6xl px-5 py-16">
          <p className="font-semibold uppercase tracking-widest text-[#fb7185]">
            Creative Tools
          </p>

          <h2 className="mt-2 text-4xl font-extrabold sm:text-5xl">
            Tools I work with.
          </h2>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-4">
            {[
              "JavaScript",
              "React",
              "Node.js",
              "MongoDB",
            ].map((tool, i) => (
              <div
                key={tool}
                className={`rounded-[1.5rem] p-6 font-bold ${
                  [
                    "bg-[#fecdd3]",
                    "bg-[#99f6e4]",
                    "bg-[#fde68a]",
                    "bg-white",
                  ][i]
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
          <section className="mx-auto max-w-6xl px-5 py-16">
            <div className="grid gap-8 md:grid-cols-2 md:items-center">
              <Img
                src={p.personalAesthetic.image}
                alt="Personal aesthetic"
                className="aspect-[4/3] w-full rounded-[2rem]"
              />

              <div>
                <p className="font-semibold uppercase tracking-widest text-[#fb7185]">
                  Personal Aesthetic
                </p>

                <h2 className="mt-3 text-4xl font-extrabold sm:text-5xl">
                  A visual language that feels like me.
                </h2>

                <p className="mt-5 leading-relaxed text-[#134e4a]/75">
                  My personal aesthetic brings together simplicity,
                  personality, creativity, and thoughtful visual choices.
                </p>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* =====================================================
          10. CONTACT
      ===================================================== */}
      <footer
        id="contact"
        className="mt-10 bg-[#fb7185] px-5 py-14 text-white"
      >
        <div className="mx-auto max-w-6xl">
          <p className="font-semibold uppercase tracking-widest text-[#fde68a]">
            Contact & Social Links
          </p>

          <h2 className="mt-2 text-4xl font-extrabold sm:text-6xl">
            Say hello
          </h2>

          <p className="mt-4 max-w-xl text-white/85">
            Interested in working together? Let's connect and create
            something meaningful.
          </p>

          <div className="mt-6 flex flex-wrap gap-3 text-sm font-semibold">
            <Links
              portfolio={p}
              className="rounded-full bg-white px-5 py-2 text-[#134e4a] transition hover:bg-[#fde68a]"
            />
          </div>
        </div>
      </footer>

      {/* =====================================================
          11. THANK YOU
      ===================================================== */}
      <section className="bg-[#ecfdf5] px-5 py-16 text-center">
        <h2 className="text-5xl font-extrabold sm:text-7xl">
          Thank you.
        </h2>

        <p className="mt-4 text-[#134e4a]/60">
          Thanks for taking the time to explore my portfolio.
        </p>
      </section>
    </div>
  );
}

export default MintFreshTemplate;