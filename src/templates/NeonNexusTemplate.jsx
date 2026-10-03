// Template 06 — Neon Nexus
// Futuristic deep-blue / cyan glow.
// Fonts: Orbitron (headings) + Inter
// <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@500;700&family=Inter:wght@400;500&display=swap" rel="stylesheet">

import { Img, Socials } from "./shared";

const head = {
  fontFamily: "Orbitron, system-ui, sans-serif",
};

const body = {
  fontFamily: "Inter, system-ui, sans-serif",
};

const panel =
  "rounded-xl border border-cyan-400/20 bg-white/[.03] p-5 sm:p-7";

const SectionTitle = ({ number, children }) => (
  <div className="mb-6 flex items-center gap-3">
    <span className="text-xs font-medium text-cyan-400">{number}</span>

    <h2 className="flex items-center gap-3 text-sm font-bold uppercase tracking-wider text-white">
      <span className="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,.8)]" />
      {children}
    </h2>
  </div>
);

function NeonNexusTemplate({ portfolio }) {
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
      className="min-h-screen overflow-x-hidden bg-[#040a1a] text-slate-300"
    >
      {/* HEADER */}
      <header className="border-b border-cyan-400/10">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5">
          <a
            href="#"
            style={head}
            className="max-w-[60%] truncate font-bold text-white"
          >
            {name}
          </a>

          <nav className="hidden gap-6 text-xs text-slate-400 md:flex">
            <a href="#about" className="hover:text-cyan-300">
              About
            </a>

            <a href="#work" className="hover:text-cyan-300">
              Work
            </a>

            <a href="#contact" className="hover:text-cyan-300">
              Contact
            </a>
          </nav>

          {email && (
            <a
              href={`mailto:${email}`}
              className="rounded border border-cyan-400/60 px-4 py-2 text-xs font-medium text-cyan-300 shadow-[0_0_18px_rgba(34,211,238,.25)] transition hover:bg-cyan-400/10"
            >
              Let’s work together
            </a>
          )}
        </div>
      </header>

      <main className="mx-auto max-w-7xl space-y-5 px-5 pb-10">
        {/* 01 — HERO / PROFILE */}
        <section className="grid items-center gap-10 py-12 md:grid-cols-2 md:py-20">
          <div>
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-cyan-300">
              01 / Profile
            </p>

            <p className="text-sm text-cyan-300">{role}</p>

            <h1
              style={head}
              className="mt-5 break-words text-4xl font-bold uppercase leading-tight text-white sm:text-5xl lg:text-6xl"
            >
              {name}
            </h1>

            {about && (
              <p className="mt-6 max-w-md leading-relaxed text-slate-400">
                {about}
              </p>
            )}

            <div className="mt-8 flex flex-wrap gap-3 text-sm font-medium">
              {projects?.length > 0 && (
                <a
                  href="#work"
                  className="rounded bg-cyan-400 px-6 py-3 text-[#040a1a] shadow-[0_0_24px_rgba(34,211,238,.5)] transition hover:bg-cyan-300"
                >
                  View my work
                </a>
              )}

              <Socials
                portfolio={portfolio}
                className="rounded border border-white/20 px-6 py-3 transition hover:bg-white/10"
              />
            </div>
          </div>

          <div className="mx-auto w-full max-w-sm">
            <Img
              src={profileImage}
              alt={`Portrait of ${name}`}
              className="aspect-square w-full rounded-full ring-2 ring-cyan-400 ring-offset-8 ring-offset-[#040a1a] shadow-[0_0_80px_rgba(34,211,238,.35)]"
            />
          </div>
        </section>

        {/* 02 — ABOUT ME */}
        <section id="about" className={panel}>
          <SectionTitle number="02">About me</SectionTitle>

          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <p className="text-2xl font-medium leading-snug text-white sm:text-3xl">
                {about ||
                  "Building meaningful digital experiences through technology and design."}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-lg border border-cyan-400/20 bg-[#07122b] p-5">
                <p className="text-xs uppercase tracking-wider text-slate-500">
                  Projects
                </p>

                <p
                  style={head}
                  className="mt-2 text-3xl font-bold text-cyan-300"
                >
                  {projects?.length || 0}
                </p>
              </div>

              <div className="rounded-lg border border-cyan-400/20 bg-[#07122b] p-5">
                <p className="text-xs uppercase tracking-wider text-slate-500">
                  Tools
                </p>

                <p
                  style={head}
                  className="mt-2 text-3xl font-bold text-cyan-300"
                >
                  {skills?.length || 0}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 03 — DESIGN PHILOSOPHY */}
        <section className={`${panel} grid gap-8 lg:grid-cols-2`}>
          <div>
            <SectionTitle number="03">Design philosophy</SectionTitle>

            <div className="space-y-5">
              {designPhilosophy?.text1 && (
                <p
                  style={head}
                  className="text-xl leading-snug text-white sm:text-2xl"
                >
                  {designPhilosophy.text1}
                </p>
              )}

              {designPhilosophy?.text2 && (
                <p className="text-lg leading-relaxed text-cyan-200">
                  {designPhilosophy.text2}
                </p>
              )}
            </div>
          </div>

          <Img
            src={designPhilosophy?.image}
            alt="Design philosophy"
            className="aspect-[4/3] w-full rounded-lg"
          />
        </section>

        {/* 04 — CORE VALUES */}
        <section className={panel}>
          <SectionTitle number="04">Core values</SectionTitle>

          <div className="grid gap-5 sm:grid-cols-2">
            <article className="overflow-hidden rounded-lg border border-cyan-400/20 bg-[#07122b]">
              <Img
                src={coreValues?.image1}
                alt="Core value one"
                className="aspect-[4/3] w-full"
              />

              <div className="p-5">
                <span className="text-xs text-cyan-400">VALUE 01</span>

                <h3
                  style={head}
                  className="mt-2 text-lg text-white"
                >
                  Precision
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-slate-400">
                  Every detail has a role in creating a better experience.
                </p>
              </div>
            </article>

            <article className="overflow-hidden rounded-lg border border-cyan-400/20 bg-[#07122b]">
              <Img
                src={coreValues?.image2}
                alt="Core value two"
                className="aspect-[4/3] w-full"
              />

              <div className="p-5">
                <span className="text-xs text-cyan-400">VALUE 02</span>

                <h3
                  style={head}
                  className="mt-2 text-lg text-white"
                >
                  Innovation
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-slate-400">
                  Technology should open new possibilities rather than add
                  unnecessary complexity.
                </p>
              </div>
            </article>
          </div>
        </section>

        {/* 05 — FROM THOUGHT TO FORM */}
        <section className={panel}>
          <SectionTitle number="05">From thought to form</SectionTitle>

          <div className="grid gap-8 md:grid-cols-12">
            <div className="md:col-span-8">
              <h2
                style={head}
                className="text-3xl leading-tight text-white sm:text-4xl"
              >
                CONCEPT
                <br />
                → SYSTEM
                <br />
                → EXPERIENCE
              </h2>
            </div>

            <div className="md:col-span-4">
              <p className="leading-relaxed text-slate-400">
                Ideas become products through a combination of exploration,
                structure, implementation, testing, and continuous refinement.
              </p>
            </div>
          </div>
        </section>

        {/* 06 — FEATURED PROJECTS */}
        <section id="work" className={panel}>
          <SectionTitle number="06">Featured projects</SectionTitle>

          {projects?.length > 0 ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {projects.slice(0, 3).map((project, index) => (
                <article
                  key={index}
                  className="group rounded-lg border border-cyan-400/20 bg-[#07122b] p-3 transition hover:border-cyan-400/60 hover:shadow-[0_0_25px_rgba(34,211,238,.12)]"
                >
                  <div className="relative overflow-hidden rounded">
                    <Img
                      src={project.image}
                      alt={project.title}
                      className="aspect-video w-full transition duration-500 group-hover:scale-105"
                    />

                    <span className="absolute left-3 top-3 rounded bg-[#040a1a]/80 px-2 py-1 text-xs text-cyan-300">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <div className="p-2 pt-4">
                    <h3 className="font-semibold text-white">
                      {project.title}
                    </h3>

                    <p className="mt-2 text-sm leading-relaxed text-slate-400">
                      {project.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate-500">
              No projects added yet.
            </p>
          )}
        </section>

        {/* 07 — CASE STUDY */}
        <section className={`${panel} grid items-center gap-7 md:grid-cols-2`}>
          <div>
            <SectionTitle number="07">Case study</SectionTitle>

            <h3
              style={head}
              className="text-2xl leading-tight text-white sm:text-3xl"
            >
              {caseStudy?.title || "Selected case study"}
            </h3>

            {caseStudy?.description && (
              <p className="mt-4 leading-relaxed text-slate-400">
                {caseStudy.description}
              </p>
            )}
          </div>

          <Img
            src={caseStudy?.image}
            alt={caseStudy?.title || "Case study"}
            className="aspect-video w-full rounded-lg"
          />
        </section>

        {/* 08 — CREATIVE TOOLS */}
        <section className={panel}>
          <SectionTitle number="08">Creative tools</SectionTitle>

          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <h3
                style={head}
                className="text-xl text-white"
              >
                SYSTEM TOOLKIT
              </h3>

              <p className="mt-3 max-w-md text-sm leading-relaxed text-slate-400">
                Technologies and tools used to transform concepts into
                responsive, functional digital products.
              </p>
            </div>

            {skills?.length > 0 && (
              <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {skills.map((skill, index) => (
                  <li
                    key={`${skill}-${index}`}
                    className="rounded border border-cyan-400/20 bg-[#07122b] px-3 py-3 text-sm text-white transition hover:border-cyan-400/60 hover:text-cyan-200"
                  >
                    <span className="mr-2 text-cyan-400">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {skill}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>

        {/* 09 — PERSONAL AESTHETIC */}
        <section className={panel}>
          <SectionTitle number="09">Personal aesthetic</SectionTitle>

          <div className="grid gap-7 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-8">
              <Img
                src={personalAesthetic?.image}
                alt="Personal aesthetic"
                className="aspect-video w-full rounded-lg"
              />
            </div>

            <div className="lg:col-span-4">
              <p
                style={head}
                className="text-2xl leading-relaxed text-white"
              >
                FUTURE
                <br />
                FOCUSED.
                <br />
                HUMAN
                <br />
                CENTERED.
              </p>
            </div>
          </div>
        </section>

        {/* 10 — CONTACT & SOCIAL LINKS */}
        <section id="contact" className={panel}>
          <SectionTitle number="10">Contact & social links</SectionTitle>

          <div className="flex flex-col gap-7 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm text-slate-500">
                Ready to build something?
              </p>

              {email && (
                <a
                  href={`mailto:${email}`}
                  style={head}
                  className="mt-3 block break-all text-xl text-cyan-300 transition hover:text-white sm:text-3xl"
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
                  className="underline underline-offset-4 hover:text-cyan-300"
                >
                  GitHub ↗
                </a>
              )}

              {socialLinks?.linkedin && (
                <a
                  href={socialLinks.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="underline underline-offset-4 hover:text-cyan-300"
                >
                  LinkedIn ↗
                </a>
              )}
            </div>
          </div>
        </section>

        {/* 11 — THANK YOU */}
        <section className="rounded-xl border border-cyan-400/20 bg-gradient-to-br from-cyan-400/[.08] to-transparent px-5 py-16 sm:px-8 sm:py-20">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-cyan-400">
            11 / Thank you
          </p>

          <div className="mt-8 flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
            <h2
              style={head}
              className="text-4xl font-bold uppercase leading-tight text-white sm:text-6xl"
            >
              See you
              <br />
              in the
              <br />
              future.
            </h2>

            <div className="flex gap-5 text-sm">
              <a href="#about" className="hover:text-cyan-300">
                About
              </a>

              <a href="#work" className="hover:text-cyan-300">
                Work
              </a>

              <a href="#contact" className="hover:text-cyan-300">
                Contact
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="mt-5 border-t border-cyan-400/20 px-5 py-10 text-center">
        {email && (
          <a
            href={`mailto:${email}`}
            style={head}
            className="break-all text-xl text-cyan-300 hover:text-white sm:text-3xl"
          >
            {email}
          </a>
        )}

        <div className="mt-5 flex justify-center gap-6 text-sm">
          <Socials
            portfolio={portfolio}
            className="underline underline-offset-4 hover:text-white"
          />
        </div>

        <p className="mt-8 text-xs text-slate-600">
          © {new Date().getFullYear()} {name}
        </p>
      </footer>
    </div>
  );
}

export default NeonNexusTemplate;