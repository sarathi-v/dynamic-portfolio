// Template 08 — Slate Deck
// Charcoal presentation deck.
// Font: Montserrat

import { Img, Socials } from "./shared";

const font = {
  fontFamily: "Montserrat, system-ui, sans-serif",
};

const slide =
  "relative overflow-hidden bg-gradient-to-b from-neutral-700 via-neutral-900 to-black p-6 sm:p-12";

const Bar = ({ name, role }) => (
  <div className="mb-8 flex justify-between border-b border-white/10 pb-4 text-[11px] font-semibold uppercase tracking-wider text-neutral-300 sm:mb-12">
    <span>{name}</span>
    <span className="font-normal">{role}</span>
  </div>
);

const SectionLabel = ({ number, children }) => (
  <div className="mb-5">
    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-neutral-500">
      {number} / {children}
    </p>
  </div>
);

function SlateDeckTemplate({ portfolio }) {
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

  return (
    <div
      style={font}
      className="min-h-screen overflow-x-hidden bg-neutral-800 p-3 text-neutral-200 sm:p-8"
    >
      <main className="mx-auto max-w-5xl space-y-4 sm:space-y-8">

        {/* 01 — HERO / PROFILE */}
        <section className={`${slide} min-h-[600px]`}>
          <Bar name={name} role={role} />

          <div className="relative grid items-center gap-8 md:grid-cols-2">
            <div>
              <SectionLabel number="01">Profile</SectionLabel>

              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-neutral-400">
                Portfolio
              </p>

              <h1 className="break-words text-4xl font-extrabold uppercase leading-tight text-white sm:text-6xl">
                {name}
              </h1>

              <div className="my-6 h-0.5 w-20 bg-white" />

              <p className="text-sm font-semibold uppercase">
                {role}
              </p>

              {about && (
                <p className="mt-5 max-w-md text-sm leading-relaxed text-neutral-300">
                  {about}
                </p>
              )}
            </div>

            {profileImage && (
              <div className="relative pb-4 pr-4">
                <div className="absolute -top-4 left-8 h-full w-3/4 bg-[#dccfc0]" />

                <Img
                  src={profileImage}
                  alt={`Portrait of ${name}`}
                  className="relative aspect-[4/3] w-full"
                />
              </div>
            )}
          </div>
        </section>

        {/* 02 — ABOUT ME */}
        <section id="about" className={slide}>
          <Bar name={name} role={role} />

          <SectionLabel number="02">About me</SectionLabel>

          <div className="grid items-center gap-8 md:grid-cols-12">
            <div className="md:col-span-7">
              <h2 className="text-3xl font-extrabold uppercase text-white sm:text-5xl">
                About
              </h2>

              <p className="mt-6 border-l-2 border-white pl-4 text-sm font-semibold uppercase">
                {name}
              </p>

              {about && (
                <p className="mt-5 max-w-xl text-sm leading-relaxed text-neutral-300">
                  {about}
                </p>
              )}
            </div>

            <div className="bg-[#dccfc0] p-2 md:col-span-5">
              {profileImage && (
                <Img
                  src={profileImage}
                  alt={`Portrait of ${name}`}
                  className="aspect-[3/4] w-full"
                />
              )}
            </div>
          </div>
        </section>

        {/* 03 — DESIGN PHILOSOPHY */}
        <section className={slide}>
          <Bar name={name} role={role} />

          <SectionLabel number="03">Design philosophy</SectionLabel>

          <div className="grid items-center gap-8 md:grid-cols-2">
            <div>
              <h2 className="text-2xl font-extrabold uppercase text-white sm:text-4xl">
                Design Philosophy
              </h2>

              <div className="mt-8 space-y-5">
                {designPhilosophy?.text1 && (
                  <p className="border-l-2 border-[#dccfc0] pl-5 text-xl font-semibold leading-relaxed text-white sm:text-2xl">
                    {designPhilosophy.text1}
                  </p>
                )}

                {designPhilosophy?.text2 && (
                  <p className="border-l-2 border-[#dccfc0] pl-5 text-xl font-semibold leading-relaxed text-white sm:text-2xl">
                    {designPhilosophy.text2}
                  </p>
                )}
              </div>
            </div>

            {designPhilosophy?.image && (
              <div className="relative">
                <div className="absolute -bottom-4 -left-4 h-24 w-24 bg-[#dccfc0]" />

                <Img
                  src={designPhilosophy.image}
                  alt="Design philosophy"
                  className="relative aspect-[4/3] w-full"
                />
              </div>
            )}
          </div>
        </section>

        {/* 04 — CORE VALUES */}
        <section className={slide}>
          <Bar name={name} role={role} />

          <SectionLabel number="04">Core values</SectionLabel>

          <h2 className="text-2xl font-extrabold uppercase text-white sm:text-4xl">
            Core Values
          </h2>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="border border-neutral-700 bg-black/30 p-4">
              {coreValues?.image1 && (
                <Img
                  src={coreValues.image1}
                  alt="Core value one"
                  className="aspect-[4/3] w-full"
                />
              )}

              <div className="mt-5">
                <span className="text-xs text-neutral-500">01</span>

                <h3 className="mt-1 text-lg font-extrabold uppercase text-white">
                  Purpose
                </h3>
              </div>
            </div>

            <div className="border border-neutral-700 bg-black/30 p-4 md:mt-8">
              {coreValues?.image2 && (
                <Img
                  src={coreValues.image2}
                  alt="Core value two"
                  className="aspect-[4/3] w-full"
                />
              )}

              <div className="mt-5">
                <span className="text-xs text-neutral-500">02</span>

                <h3 className="mt-1 text-lg font-extrabold uppercase text-white">
                  Creativity
                </h3>
              </div>
            </div>
          </div>
        </section>

        {/* 05 — FROM THOUGHT TO FORM */}
        <section className={slide}>
          <Bar name={name} role={role} />

          <SectionLabel number="05">From thought to form</SectionLabel>

          <div className="grid gap-10 md:grid-cols-2 md:items-center">
            <div>
              <h2 className="text-3xl font-extrabold uppercase text-white sm:text-5xl">
                From Thought
                <br />
                To Form
              </h2>

              <p className="mt-5 max-w-md text-sm leading-relaxed text-neutral-300">
                Ideas become meaningful when they are shaped with intention,
                structure, and attention to detail.
              </p>
            </div>

            <div className="grid gap-3">
              <div className="border-l-4 border-[#dccfc0] bg-neutral-800 p-5">
                <span className="text-xs text-neutral-500">01</span>

                <h3 className="mt-2 font-extrabold uppercase text-white">
                  Think
                </h3>

                <p className="mt-2 text-sm text-neutral-400">
                  Understand the idea, audience, and purpose.
                </p>
              </div>

              <div className="border-l-4 border-[#dccfc0] bg-neutral-800 p-5">
                <span className="text-xs text-neutral-500">02</span>

                <h3 className="mt-2 font-extrabold uppercase text-white">
                  Shape
                </h3>

                <p className="mt-2 text-sm text-neutral-400">
                  Develop the concept into a clear visual direction.
                </p>
              </div>

              <div className="border-l-4 border-[#dccfc0] bg-neutral-800 p-5">
                <span className="text-xs text-neutral-500">03</span>

                <h3 className="mt-2 font-extrabold uppercase text-white">
                  Create
                </h3>

                <p className="mt-2 text-sm text-neutral-400">
                  Build the final experience with precision.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 06 — FEATURED PROJECTS */}
        <section id="work" className={slide}>
          <Bar name={name} role={role} />

          <SectionLabel number="06">Featured projects</SectionLabel>

          <div className="flex flex-col gap-6 md:flex-row">
            <div>
              <h2 className="text-2xl font-extrabold uppercase text-white md:[writing-mode:vertical-rl] md:rotate-180 md:text-3xl">
                Projects
              </h2>
            </div>

            {projects?.length > 0 ? (
              <div className="grid flex-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {projects.slice(0, 3).map((project, index) => (
                  <article key={index} className="group">
                    <div className="overflow-hidden bg-[#dccfc0] p-1">
                      <Img
                        src={project.image}
                        alt={project.title}
                        className="aspect-[3/4] w-full transition duration-500 group-hover:scale-105"
                      />
                    </div>

                    <div className="mt-4">
                      <span className="text-[10px] font-semibold uppercase tracking-widest text-neutral-500">
                        Project {String(index + 1).padStart(2, "0")}
                      </span>

                      <h3 className="mt-2 text-sm font-extrabold uppercase text-white">
                        {project.title}
                      </h3>

                      <p className="mt-1 text-xs leading-relaxed text-neutral-400">
                        {project.description}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <p className="text-sm text-neutral-500">
                No projects added yet.
              </p>
            )}
          </div>
        </section>

        {/* 07 — CASE STUDY */}
        <section className={slide}>
          <Bar name={name} role={role} />

          <SectionLabel number="07">Case study</SectionLabel>

          <div className="mt-5 grid items-center gap-8 md:grid-cols-2">
            {caseStudy?.image && (
              <div className="bg-[#dccfc0] p-2">
                <Img
                  src={caseStudy.image}
                  alt={caseStudy.title || "Case study"}
                  className="aspect-[4/3] w-full"
                />
              </div>
            )}

            <div>
              <h2 className="text-3xl font-extrabold uppercase text-white sm:text-5xl">
                {caseStudy?.title || "Case Study"}
              </h2>

              <div className="my-6 h-0.5 w-16 bg-[#dccfc0]" />

              {caseStudy?.description && (
                <p className="max-w-xl text-sm leading-relaxed text-neutral-300">
                  {caseStudy.description}
                </p>
              )}
            </div>
          </div>
        </section>

        {/* 08 — CREATIVE TOOLS */}
        <section className={slide}>
          <Bar name={name} role={role} />

          <SectionLabel number="08">Creative tools</SectionLabel>

          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <div>
              <h2 className="text-3xl font-extrabold uppercase text-white sm:text-5xl">
                Creative
                <br />
                Tools
              </h2>

              <p className="mt-5 max-w-md text-sm leading-relaxed text-neutral-400">
                A focused collection of technologies and tools used to turn
                ideas into practical digital experiences.
              </p>
            </div>

            {skills?.length > 0 && (
              <div className="grid grid-cols-2 gap-3">
                {skills.map((skill, index) => (
                  <div
                    key={`${skill}-${index}`}
                    className="border border-neutral-700 bg-neutral-800 p-5"
                  >
                    <span className="text-xs text-neutral-600">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <p className="mt-4 text-sm font-bold uppercase text-white">
                      {skill}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* 09 — PERSONAL AESTHETIC */}
        <section className={slide}>
          <Bar name={name} role={role} />

          <SectionLabel number="09">Personal aesthetic</SectionLabel>

          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <div>
              <h2 className="text-3xl font-extrabold uppercase text-white sm:text-5xl">
                Personal
                <br />
                Aesthetic
              </h2>

              <p className="mt-5 max-w-md text-sm leading-relaxed text-neutral-300">
                A visual language built around contrast, simplicity,
                structure, and intentional details.
              </p>
            </div>

            {personalAesthetic?.image && (
              <div className="relative pb-4 pr-4">
                <div className="absolute bottom-0 right-0 h-3/4 w-3/4 bg-[#dccfc0]" />

                <Img
                  src={personalAesthetic.image}
                  alt="Personal aesthetic"
                  className="relative aspect-[4/3] w-full"
                />
              </div>
            )}
          </div>
        </section>

        {/* 10 — CONTACT & SOCIAL LINKS */}
        <section id="contact" className={`${slide} text-center`}>
          <Bar name={name} role={role} />

          <SectionLabel number="10">Contact & social links</SectionLabel>

          <h2 className="mt-4 text-3xl font-extrabold uppercase text-white sm:text-6xl">
            Let's work
            <br />
            together
          </h2>

          {email && (
            <a
              href={`mailto:${email}`}
              className="mt-8 inline-block break-all rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-[#dccfc0]"
            >
              {email}
            </a>
          )}

          <div className="mt-6 flex justify-center gap-6 text-sm">
            <Socials
              portfolio={portfolio}
              className="underline underline-offset-4 hover:text-white"
            />
          </div>
        </section>

        {/* 11 — THANK YOU */}
        <section className={`${slide} text-center`}>
          <Bar name={name} role={role} />

          <SectionLabel number="11">Thank you</SectionLabel>

          <h2 className="mt-5 text-3xl font-extrabold uppercase text-white sm:text-5xl">
            Thank You
          </h2>

          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-neutral-400">
            Thank you for taking the time to explore my work.
          </p>

          <div className="mx-auto mt-8 h-1 w-20 bg-[#dccfc0]" />

          <div className="mt-8 flex justify-center gap-6 text-xs uppercase tracking-wider text-neutral-500">
            <a href="#about" className="hover:text-white">
              About
            </a>

            <a href="#work" className="hover:text-white">
              Work
            </a>

            <a href="#contact" className="hover:text-white">
              Contact
            </a>
          </div>
        </section>

      </main>

      <footer className="mx-auto mt-4 max-w-5xl px-2 pb-4 text-center text-[10px] uppercase tracking-wider text-neutral-600 sm:mt-8">
        {name} · {role}
      </footer>
    </div>
  );
}

export default SlateDeckTemplate;