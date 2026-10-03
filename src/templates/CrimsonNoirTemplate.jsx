// Template 07 — Crimson Noir
// Black + crimson, giant name behind the portrait.
// Font: Anton (display) + Inter
// <link href="https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@400;500&display=swap" rel="stylesheet">

import { Img, Socials } from "./shared";

const display = {
  fontFamily: "Anton, Impact, sans-serif",
};

const body = {
  fontFamily: "Inter, system-ui, sans-serif",
};

const num = (i) => String(i + 1).padStart(2, "0");

const SectionTitle = ({ number, children }) => (
  <div className="mb-8 flex items-center gap-5">
    <span className="text-xs text-red-500">{number}</span>

    <h2
      style={display}
      className="text-3xl uppercase tracking-wide text-white"
    >
      {children}
    </h2>

    <span className="h-px flex-1 bg-white/20" />
  </div>
);

function CrimsonNoirTemplate({ portfolio }) {
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
      style={body}
      className="min-h-screen overflow-x-hidden bg-black text-neutral-300"
    >
      {/* 01 — HERO / PROFILE */}
      <section className="relative mx-auto flex min-h-[90vh] max-w-7xl flex-col justify-between overflow-hidden px-5 pt-5">
        <div className="relative z-20 flex justify-between border-b border-white/10 pb-4 text-xs text-neutral-400">
          <span>{role}</span>

          {email && (
            <a
              href={`mailto:${email}`}
              className="text-red-500 hover:text-red-400"
            >
              Available for work
            </a>
          )}
        </div>

        <p
          aria-hidden="true"
          style={display}
          className="pointer-events-none absolute inset-x-0 top-10 z-0 break-words text-center text-[26vw] uppercase leading-[0.85] text-red-700 md:text-[19vw]"
        >
          {name}
        </p>

        {profileImage && (
          <Img
            src={profileImage}
            alt={`Portrait of ${name}`}
            className="absolute bottom-0 left-1/2 z-10 h-[78%] w-auto max-w-[90%] -translate-x-1/2 [mask-image:linear-gradient(to_bottom,black_75%,transparent)]"
          />
        )}

        <div className="relative z-20 mt-auto pb-10 pt-72">
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-red-500">
            01 / Profile
          </p>

          <h1
            style={display}
            className="max-w-[10ch] break-words text-5xl uppercase leading-none text-white sm:text-7xl"
          >
            {name}
          </h1>

          <p className="mt-3 text-red-500">{role}</p>

          {about && (
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-neutral-300">
              {about}
            </p>
          )}
        </div>
      </section>

      {/* 02 — ABOUT ME */}
      <section id="about" className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-5 py-16">
          <SectionTitle number="02">About me</SectionTitle>

          <div className="grid gap-10 md:grid-cols-12">
            <div className="md:col-span-8">
              <p className="text-3xl font-medium leading-tight text-white sm:text-5xl">
                {about ||
                  "Creating bold digital experiences through design, technology, and visual storytelling."}
              </p>
            </div>

            <div className="md:col-span-4">
              <p className="text-sm leading-relaxed text-neutral-500">
                A portfolio focused on selected work, creative thinking, and
                purposeful digital experiences.
              </p>
            </div>
          </div>

          {skills?.length > 0 && (
            <div className="mt-12 border-t border-white/10 pt-6">
              <p className="mb-5 text-xs uppercase tracking-[0.25em] text-red-500">
                Skills
              </p>

              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <span
                    key={`${skill}-${index}`}
                    className="border border-white/20 px-3 py-1.5 text-xs uppercase"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 03 — DESIGN PHILOSOPHY */}
      <section className="border-t border-white/10">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 lg:grid-cols-2">
          <div>
            <SectionTitle number="03">Design philosophy</SectionTitle>

            <div className="space-y-6">
              {designPhilosophy?.text1 && (
                <p
                  style={display}
                  className="text-4xl uppercase leading-none text-white sm:text-6xl"
                >
                  {designPhilosophy.text1}
                </p>
              )}

              {designPhilosophy?.text2 && (
                <p className="max-w-xl text-xl leading-relaxed text-red-500">
                  {designPhilosophy.text2}
                </p>
              )}
            </div>
          </div>

          <Img
            src={designPhilosophy?.image}
            alt="Design philosophy"
            className="aspect-[4/3] w-full border border-white/10"
          />
        </div>
      </section>

      {/* 04 — CORE VALUES */}
      <section className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-5 py-16">
          <SectionTitle number="04">Core values</SectionTitle>

          <div className="grid gap-px bg-white/10 sm:grid-cols-2">
            <div className="bg-black p-5">
              <span className="text-xs text-red-500">VALUE {num(0)}</span>

              <Img
                src={coreValues?.image1}
                alt="Core value one"
                className="mt-5 aspect-[4/5] w-full"
              />

              <h3
                style={display}
                className="mt-5 text-2xl uppercase text-white"
              >
                Intent
              </h3>

              <p className="mt-2 text-sm leading-relaxed text-neutral-500">
                Every creative decision begins with a clear intention.
              </p>
            </div>

            <div className="bg-black p-5">
              <span className="text-xs text-red-500">VALUE {num(1)}</span>

              <Img
                src={coreValues?.image2}
                alt="Core value two"
                className="mt-5 aspect-[4/5] w-full"
              />

              <h3
                style={display}
                className="mt-5 text-2xl uppercase text-white"
              >
                Impact
              </h3>

              <p className="mt-2 text-sm leading-relaxed text-neutral-500">
                Design should leave a meaningful impression beyond the screen.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 05 — FROM THOUGHT TO FORM */}
      <section className="border-t border-white/10 bg-gradient-to-b from-red-950 to-black">
        <div className="mx-auto max-w-7xl px-5 py-20">
          <SectionTitle number="05">From thought to form</SectionTitle>

          <div className="grid gap-10 md:grid-cols-12">
            <div className="md:col-span-8">
              <h2
                style={display}
                className="text-5xl uppercase leading-[0.9] text-white sm:text-7xl"
              >
                THINK
                <br />
                CREATE
                <br />
                REDEFINE
              </h2>
            </div>

            <div className="md:col-span-4 md:flex md:items-end">
              <p className="text-sm leading-relaxed text-neutral-300">
                Ideas evolve through experimentation, visual exploration,
                technical execution, and refinement until the final form feels
                intentional.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 06 — FEATURED PROJECTS */}
      <section id="work" className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-5 py-16">
          <SectionTitle number="06">Featured projects</SectionTitle>

          {projects?.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {projects.slice(0, 3).map((project, index) => (
                <article key={index} className="group">
                  <div className="overflow-hidden border border-white/15">
                    <Img
                      src={project.image}
                      alt={project.title}
                      className="aspect-video w-full transition duration-500 group-hover:scale-105"
                    />
                  </div>

                  <div className="mt-4 flex items-start gap-4">
                    <span
                      style={display}
                      className="text-4xl text-red-600"
                    >
                      {num(index)}
                    </span>

                    <div>
                      <h3 className="font-semibold uppercase text-white">
                        {project.title}
                      </h3>

                      <p className="mt-1 text-sm leading-relaxed text-neutral-400">
                        {project.description}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <p className="text-neutral-500">No projects added yet.</p>
          )}
        </div>
      </section>

      {/* 07 — CASE STUDY */}
      <section className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-5 py-16">
          <SectionTitle number="07">Case study</SectionTitle>

          <div className="grid gap-8 lg:grid-cols-2">
            <Img
              src={caseStudy?.image}
              alt={caseStudy?.title || "Case study"}
              className="aspect-video w-full border border-white/10"
            />

            <div className="flex flex-col justify-center">
              <span className="text-xs uppercase tracking-[0.25em] text-red-500">
                Selected work
              </span>

              <h3
                style={display}
                className="mt-4 text-4xl uppercase leading-none text-white sm:text-6xl"
              >
                {caseStudy?.title || "Case study"}
              </h3>

              {caseStudy?.description && (
                <p className="mt-6 max-w-lg text-sm leading-relaxed text-neutral-400">
                  {caseStudy.description}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 08 — CREATIVE TOOLS */}
      <section className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-5 py-16">
          <SectionTitle number="08">Creative tools</SectionTitle>

          <div className="grid gap-10 lg:grid-cols-3">
            <div className="lg:col-span-1">
              <h3
                style={display}
                className="text-3xl uppercase leading-none text-white"
              >
                Tools
                <br />
                &amp; Skills
              </h3>
            </div>

            <div className="lg:col-span-2">
              {skills?.length > 0 && (
                <ul className="grid border-t border-white/10 sm:grid-cols-2">
                  {skills.map((skill, index) => (
                    <li
                      key={`${skill}-${index}`}
                      className="border-b border-white/10 py-4 text-sm"
                    >
                      <span className="mr-4 text-red-600">
                        {num(index)}
                      </span>

                      <span className="uppercase text-white">{skill}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 09 — PERSONAL AESTHETIC */}
      <section className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-5 py-16">
          <SectionTitle number="09">Personal aesthetic</SectionTitle>

          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <Img
                src={personalAesthetic?.image}
                alt="Personal aesthetic"
                className="aspect-[16/9] w-full grayscale transition duration-500 hover:grayscale-0"
              />
            </div>

            <div className="lg:col-span-4">
              <p
                style={display}
                className="text-4xl uppercase leading-none text-white sm:text-5xl"
              >
                Dark.
                <br />
                Direct.
                <br />
                Distinct.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 10 — CONTACT & SOCIAL LINKS */}
      <section id="contact" className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-5 py-16">
          <SectionTitle number="10">Contact & social links</SectionTitle>

          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-red-500">
                Available for work
              </p>

              {email && (
                <a
                  href={`mailto:${email}`}
                  className="mt-4 block break-all text-2xl font-medium text-white hover:text-red-500 sm:text-4xl"
                >
                  {email}
                </a>
              )}
            </div>

            <div className="flex flex-wrap gap-5 text-sm">
              {socialLinks?.github && (
                <a
                  href={socialLinks.github}
                  target="_blank"
                  rel="noreferrer"
                  className="underline underline-offset-4 hover:text-red-500"
                >
                  GitHub ↗
                </a>
              )}

              {socialLinks?.linkedin && (
                <a
                  href={socialLinks.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="underline underline-offset-4 hover:text-red-500"
                >
                  LinkedIn ↗
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 11 — THANK YOU */}
      <section className="border-t border-white/10 bg-red-950">
        <div className="mx-auto max-w-7xl px-5 py-20">
          <p className="text-xs uppercase tracking-[0.25em] text-red-300">
            11 / Thank you
          </p>

          <div className="mt-10 flex flex-col justify-between gap-10 md:flex-row md:items-end">
            <h2
              style={display}
              className="text-6xl uppercase leading-[0.85] text-white sm:text-8xl"
            >
              LET'S
              <br />
              CREATE
              <br />
              MORE.
            </h2>

            <div className="flex gap-5 text-sm text-white">
              <a href="#about" className="hover:text-red-300">
                About
              </a>

              <a href="#work" className="hover:text-red-300">
                Work
              </a>

              <a href="#contact" className="hover:text-red-300">
                Contact
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-10 md:flex-row md:items-center md:justify-between">
          <span className="text-xs text-neutral-500">
            {name} — {role}
          </span>

          <div className="flex gap-5 text-sm">
            <Socials
              portfolio={portfolio}
              className="underline underline-offset-4 hover:text-white"
            />
          </div>
        </div>
      </footer>
    </div>
  );
}

export default CrimsonNoirTemplate;