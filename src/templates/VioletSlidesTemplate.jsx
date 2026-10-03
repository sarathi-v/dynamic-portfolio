import { Img, Links, philosophy, pick } from "./sharedColorful";

const Slide = ({ name, id, children, className = "" }) => (
  <section
    id={id}
    className={`mx-auto max-w-6xl rounded-2xl bg-[#4c1d95] text-white shadow-xl ${className}`}
  >
    <div className="flex justify-between px-6 pt-5 text-xs font-semibold text-violet-200">
      <span>{name}</span>
      <span>Portfolio</span>
    </div>

    {children}
  </section>
);

function VioletSlidesTemplate({ portfolio: p }) {
  const hero = pick(
    p.personalAesthetic?.image,
    p.caseStudy?.image,
    p.profileImage
  );

  return (
    <div
      style={{ fontFamily: "Poppins, system-ui, sans-serif" }}
      className="min-h-screen space-y-6 overflow-x-hidden bg-[#ddd6fe] px-3 py-6 sm:px-6"
    >
      {/* =====================================================
          1. HERO / PROFILE
      ===================================================== */}
      <Slide name={p.name}>
        <div className="grid items-center gap-8 p-6 sm:p-12 md:grid-cols-2">
          <div>
            <p className="text-sm font-semibold text-[#f0abfc]">
              {p.role}
            </p>

            <h1 className="break-words text-5xl font-extrabold leading-tight sm:text-6xl">
              {p.name}
            </h1>

            <div className="my-5 h-1 w-16 bg-[#e8dcc8]" />

            <p className="max-w-lg text-sm leading-relaxed text-violet-100">
              {p.about}
            </p>
          </div>

          <div className="relative">
            <div
              className="absolute -bottom-3 -right-3 h-full w-full bg-[#e8dcc8]"
              aria-hidden="true"
            />

            <Img
              src={hero}
              alt="Featured visual"
              className="relative aspect-[4/3] w-full"
            />
          </div>
        </div>
      </Slide>

      {/* =====================================================
          2. ABOUT ME
      ===================================================== */}
      <Slide name={p.name} id="about">
        <div className="grid items-center gap-8 p-6 sm:p-12 md:grid-cols-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#f0abfc]">
              About
            </p>

            <h2 className="mt-2 text-3xl font-extrabold">
              About me
            </h2>

            <p className="mt-4 text-sm leading-relaxed text-violet-100">
              {p.about}
            </p>
          </div>

          <div className="bg-[#e8dcc8] p-3">
            <Img
              src={p.profileImage}
              alt={`Portrait of ${p.name}`}
              className="aspect-[3/4] w-full"
            />
          </div>

          {p.skills?.length > 0 && (
            <ul className="space-y-2 text-sm">
              {p.skills.map((s) => (
                <li
                  key={s}
                  className="border-l-4 border-[#f0abfc] pl-3"
                >
                  {s}
                </li>
              ))}
            </ul>
          )}
        </div>
      </Slide>

      {/* =====================================================
          3. DESIGN PHILOSOPHY
      ===================================================== */}
      {philosophy(p).length > 0 && (
        <Slide name={p.name} id="philosophy">
          <div className="grid items-center gap-8 p-6 sm:p-12 md:grid-cols-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[#f0abfc]">
                Design Philosophy
              </p>

              <h2 className="mt-2 text-4xl font-extrabold">
                How I think.
              </h2>

              <div className="mt-6 space-y-4">
                {philosophy(p).map((text, i) => (
                  <p
                    key={text}
                    className={`rounded-xl p-4 text-xl font-semibold ${
                      i % 2 === 0
                        ? "bg-[#5b21b6]"
                        : "bg-[#6d28d9]"
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
              className="aspect-[4/3] w-full"
            />
          </div>
        </Slide>
      )}

      {/* =====================================================
          4. CORE VALUES
      ===================================================== */}
      <Slide name={p.name} id="values">
        <div className="p-6 sm:p-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#f0abfc]">
            Core Values
          </p>

          <h2 className="mt-2 text-4xl font-extrabold">
            What I value.
          </h2>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <article className="overflow-hidden bg-white text-[#2e1065]">
              <Img
                src={p.coreValues?.image1}
                alt="Core value one"
                className="aspect-[4/3] w-full"
              />

              <div className="p-5">
                <h3 className="text-2xl font-bold">
                  Value One
                </h3>

                <p className="mt-2 text-sm text-violet-800">
                  Thoughtful work with purpose and clarity.
                </p>
              </div>
            </article>

            <article className="overflow-hidden bg-white text-[#2e1065]">
              <Img
                src={p.coreValues?.image2}
                alt="Core value two"
                className="aspect-[4/3] w-full"
              />

              <div className="p-5">
                <h3 className="text-2xl font-bold">
                  Value Two
                </h3>

                <p className="mt-2 text-sm text-violet-800">
                  Meaningful experiences built with care.
                </p>
              </div>
            </article>
          </div>
        </div>
      </Slide>

      {/* =====================================================
          5. FROM THOUGHT TO FORM
      ===================================================== */}
      <Slide name={p.name}>
        <div className="p-6 sm:p-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#f0abfc]">
            From Thought to Form
          </p>

          <h2 className="mt-4 max-w-4xl text-4xl font-extrabold leading-tight sm:text-6xl">
            Turning ideas into meaningful digital experiences.
          </h2>

          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-violet-100">
            I transform ideas into thoughtful experiences through creativity,
            structure, technology, and attention to detail.
          </p>
        </div>
      </Slide>

      {/* =====================================================
          6. FEATURED PROJECTS
      ===================================================== */}
      {p.projects?.length > 0 && (
        <Slide name={p.name} id="work">
          <div className="flex gap-4 p-6 sm:p-12">
            <h2
              className="hidden text-3xl font-extrabold [writing-mode:vertical-rl] sm:block"
              style={{ transform: "rotate(180deg)" }}
            >
              Projects
            </h2>

            <div className="grid flex-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {p.projects.map((pr, i) => (
                <article
                  key={i}
                  className="group bg-white text-[#2e1065]"
                >
                  <div className="overflow-hidden">
                    <Img
                      src={pr.image}
                      alt={pr.title}
                      className="aspect-[4/5] w-full transition duration-500 group-hover:scale-105"
                    />
                  </div>

                  <div className="p-3">
                    <p className="text-xs font-semibold text-violet-600">
                      Project {i + 1}
                    </p>

                    <h3 className="font-bold">
                      {pr.title}
                    </h3>

                    <p className="text-xs text-violet-800">
                      {pr.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </Slide>
      )}

      {/* =====================================================
          7. CASE STUDY
      ===================================================== */}
      {p.caseStudy?.title && (
        <Slide name={p.name} id="case-study">
          <div className="grid items-center gap-8 p-6 sm:p-12 md:grid-cols-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[#f0abfc]">
                Case Study
              </p>

              <h2 className="mt-2 text-4xl font-extrabold">
                {p.caseStudy.title}
              </h2>

              <p className="mt-4 text-sm leading-relaxed text-violet-100">
                {p.caseStudy.description}
              </p>
            </div>

            <Img
              src={p.caseStudy.image}
              alt={p.caseStudy.title}
              className="aspect-[16/10] w-full"
            />
          </div>
        </Slide>
      )}

      {/* =====================================================
          8. CREATIVE TOOLS
      ===================================================== */}
      <Slide name={p.name}>
        <div className="p-6 sm:p-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#f0abfc]">
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
                className={`p-5 text-center font-bold ${
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
            ))}
          </div>
        </div>
      </Slide>

      {/* =====================================================
          9. PERSONAL AESTHETIC
      ===================================================== */}
      {p.personalAesthetic?.image && (
        <Slide name={p.name}>
          <div className="grid items-center gap-8 p-6 sm:p-12 md:grid-cols-2">
            <Img
              src={p.personalAesthetic.image}
              alt="Personal aesthetic"
              className="aspect-[4/3] w-full"
            />

            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[#f0abfc]">
                Personal Aesthetic
              </p>

              <h2 className="mt-2 text-4xl font-extrabold">
                A visual language of my own.
              </h2>

              <p className="mt-5 text-sm leading-relaxed text-violet-100">
                My personal aesthetic combines simplicity, personality,
                creativity, and thoughtful visual choices.
              </p>
            </div>
          </div>
        </Slide>
      )}

      {/* =====================================================
          10. CONTACT & SOCIAL LINKS
      ===================================================== */}
      <Slide name={p.name} id="contact" className="text-center">
        <div className="px-6 py-14">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#f0abfc]">
            Contact & Social Links
          </p>

          <h2 className="mt-3 text-4xl font-extrabold sm:text-6xl">
            Let's work together
          </h2>

          {p.email && (
            <p className="mt-4 text-sm text-violet-200">
              {p.email}
            </p>
          )}

          <div className="mt-6 flex flex-wrap justify-center gap-3 text-sm font-semibold">
            <Links
              portfolio={p}
              className="rounded-full bg-[#e8dcc8] px-5 py-2 text-[#2e1065] transition hover:bg-[#f0abfc]"
            />
          </div>
        </div>
      </Slide>

      {/* =====================================================
          11. THANK YOU
      ===================================================== */}
      <Slide name={p.name} className="text-center">
        <div className="px-6 py-16">
          <h2 className="text-5xl font-extrabold sm:text-7xl">
            Thank you.
          </h2>

          <p className="mt-4 text-sm text-violet-200">
            Thank you for taking the time to explore my portfolio.
          </p>
        </div>
      </Slide>
    </div>
  );
}

export default VioletSlidesTemplate;