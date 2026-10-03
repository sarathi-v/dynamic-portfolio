// Template 05 — CodeCraft
// Dark navy + violet developer portfolio.
// Font: Plus Jakarta Sans
// <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;700;800&display=swap" rel="stylesheet">

import { Img, Socials } from "./shared";

const font = {
  fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
};

function CodeCraftTemplate({ portfolio }) {
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

  const label =
    "text-xs font-semibold uppercase tracking-widest text-violet-400";

  const cta =
    "rounded-lg bg-gradient-to-r from-indigo-500 to-violet-500 px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90";

  const card =
    "rounded-xl border border-white/10 bg-white/[.03]";

  return (
    <div
      style={font}
      className="min-h-screen overflow-x-hidden bg-[#0a0b1e] text-slate-300"
    >
      {/* HEADER */}
      <header className="sticky top-0 z-20 border-b border-white/10 bg-[#0a0b1e]/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <a href="#" className="font-bold text-white">
            {name}
          </a>

          <nav
            aria-label="Primary"
            className="hidden gap-8 text-sm text-slate-400 md:flex"
          >
            <a className="hover:text-white" href="#about">
              About
            </a>

            <a className="hover:text-white" href="#projects">
              Projects
            </a>

            <a className="hover:text-white" href="#contact">
              Contact
            </a>
          </nav>

          {email && (
            <a href={`mailto:${email}`} className={cta}>
              Hire me
            </a>
          )}
        </div>
      </header>

      <main>
        {/* 01 — HERO / PROFILE */}
        <section className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-16 md:grid-cols-2 md:py-24">
          <div>
            <p className={label}>01 / Developer</p>

            <span className="mt-5 inline-block rounded border border-violet-400/30 bg-violet-500/10 px-3 py-1 text-xs font-semibold text-violet-300">
              {role}
            </span>

            <h1 className="mt-6 break-words text-5xl font-extrabold leading-tight text-white sm:text-6xl">
              Hi, I’m{" "}
              <span className="text-violet-400">{name}</span>
            </h1>

            {about && (
              <p className="mt-5 max-w-md leading-relaxed text-slate-400">
                {about}
              </p>
            )}

            <div className="mt-8 flex flex-wrap gap-3">
              {projects?.length > 0 && (
                <a href="#projects" className={cta}>
                  View my work
                </a>
              )}

              <Socials
                portfolio={portfolio}
                className="rounded-lg border border-white/20 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              />
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-sm">
            <div className="absolute inset-6 rounded-full bg-violet-600/70 blur-sm" />

            <Img
              src={profileImage}
              alt={`Portrait of ${name}`}
              className="relative aspect-square w-full rounded-full border-4 border-violet-400/40"
            />
          </div>
        </section>

        {/* 02 — ABOUT ME */}
        <section
          id="about"
          className="border-y border-white/10 bg-white/[.02]"
        >
          <div className="mx-auto max-w-6xl px-5 py-16">
            <p className={label}>02 / About me</p>

            <div className="mt-8 grid gap-10 md:grid-cols-2">
              <div>
                <h2 className="text-3xl font-bold text-white">
                  Building ideas into digital products.
                </h2>

                {about && (
                  <p className="mt-5 leading-relaxed text-slate-400">
                    {about}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-px bg-white/10">
                <div className="bg-[#0a0b1e] p-6">
                  <p className="text-sm text-slate-400">Projects</p>
                  <p className="mt-2 text-4xl font-bold text-white">
                    {projects?.length || 0}
                  </p>
                </div>

                <div className="bg-[#0a0b1e] p-6">
                  <p className="text-sm text-slate-400">Technologies</p>
                  <p className="mt-2 text-4xl font-bold text-white">
                    {skills?.length || 0}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 03 — DESIGN PHILOSOPHY */}
        <section className="mx-auto max-w-6xl px-5 py-20">
          <p className={label}>03 / Design philosophy</p>

          <div className="mt-8 grid gap-8 md:grid-cols-2">
            <div className="flex flex-col justify-center gap-5">
              {designPhilosophy?.text1 && (
                <p className="text-3xl font-bold leading-tight text-white sm:text-4xl">
                  “{designPhilosophy.text1}”
                </p>
              )}

              {designPhilosophy?.text2 && (
                <p className="text-2xl font-medium leading-tight text-violet-300 sm:text-3xl">
                  “{designPhilosophy.text2}”
                </p>
              )}
            </div>

            <Img
              src={designPhilosophy?.image}
              alt="Design philosophy"
              className="aspect-[4/3] rounded-xl"
            />
          </div>
        </section>

        {/* 04 — CORE VALUES */}
        <section className="border-y border-white/10 bg-white/[.02]">
          <div className="mx-auto max-w-6xl px-5 py-20">
            <p className={label}>04 / Core values</p>

            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              <article className={`${card} overflow-hidden`}>
                <Img
                  src={coreValues?.image1}
                  alt="Core value one"
                  className="aspect-[4/3]"
                />

                <div className="p-6">
                  <span className="text-xs text-violet-400">01</span>

                  <h3 className="mt-2 text-xl font-bold text-white">
                    Purpose
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-slate-400">
                    Every technical decision should serve a clear purpose.
                  </p>
                </div>
              </article>

              <article className={`${card} overflow-hidden`}>
                <Img
                  src={coreValues?.image2}
                  alt="Core value two"
                  className="aspect-[4/3]"
                />

                <div className="p-6">
                  <span className="text-xs text-violet-400">02</span>

                  <h3 className="mt-2 text-xl font-bold text-white">
                    Simplicity
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-slate-400">
                    Clean interfaces and maintainable code create better
                    experiences.
                  </p>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* 05 — FROM THOUGHT TO FORM */}
        <section className="mx-auto max-w-6xl px-5 py-20">
          <p className={label}>05 / From thought to form</p>

          <div className="mt-8 grid gap-8 md:grid-cols-12">
            <div className="md:col-span-8">
              <h2 className="text-4xl font-extrabold leading-tight text-white sm:text-5xl">
                From concept to clean, functional code.
              </h2>
            </div>

            <div className="md:col-span-4">
              <p className="leading-relaxed text-slate-400">
                I transform ideas into responsive interfaces, reusable
                components, and practical digital experiences through a
                structured development process.
              </p>
            </div>
          </div>
        </section>

        {/* 06 — FEATURED PROJECTS */}
        <section id="projects" className="mx-auto max-w-6xl px-5 py-20">
          <p className={label}>06 / Featured projects</p>

          <h2 className="mb-10 mt-2 text-3xl font-bold text-white">
            Some of my recent work
          </h2>

          {projects?.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {projects.slice(0, 3).map((project, index) => (
                <article
                  key={index}
                  className={`group overflow-hidden ${card} transition hover:border-violet-400/50`}
                >
                  <div className="relative overflow-hidden">
                    <Img
                      src={project.image}
                      alt={project.title}
                      className="aspect-[16/10] w-full transition duration-500 group-hover:scale-105"
                    />

                    <span className="absolute left-3 top-3 rounded bg-black/60 px-2 py-0.5 text-xs text-white">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <div className="p-5">
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
            <p className="text-slate-500">No projects added yet.</p>
          )}
        </section>

        {/* 07 — CASE STUDY */}
        <section className="mx-auto max-w-6xl px-5 py-20">
          <p className={label}>07 / Case study</p>

          <div className={`mt-8 overflow-hidden ${card}`}>
            <Img
              src={caseStudy?.image}
              alt={caseStudy?.title || "Case study"}
              className="aspect-video w-full"
            />

            <div className="grid gap-8 p-7 md:grid-cols-2">
              <div>
                <h2 className="text-3xl font-bold text-white">
                  {caseStudy?.title || "Selected case study"}
                </h2>
              </div>

              <p className="leading-relaxed text-slate-400">
                {caseStudy?.description}
              </p>
            </div>
          </div>
        </section>

        {/* 08 — CREATIVE TOOLS */}
        <section
          id="skills"
          className="border-y border-white/10 bg-white/[.02]"
        >
          <div className="mx-auto max-w-6xl px-5 py-20">
            <p className={label}>08 / Creative tools</p>

            <div className="mt-8 grid gap-10 md:grid-cols-2">
              <div>
                <h2 className="text-3xl font-bold text-white">
                  Technologies I work with
                </h2>

                <p className="mt-4 leading-relaxed text-slate-400">
                  A practical toolkit for building modern, scalable web
                  experiences.
                </p>
              </div>

              {skills?.length > 0 && (
                <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {skills.map((skill, index) => (
                    <li
                      key={`${skill}-${index}`}
                      className="rounded-lg border border-white/10 bg-white/[.03] px-4 py-4 text-sm font-medium text-slate-200 transition hover:border-violet-400/50 hover:text-white"
                    >
                      <span className="mr-2 text-violet-400">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      {skill}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </section>

        {/* 09 — PERSONAL AESTHETIC */}
        <section className="mx-auto max-w-6xl px-5 py-20">
          <p className={label}>09 / Personal aesthetic</p>

          <div className="mt-8 grid gap-8 md:grid-cols-12 md:items-center">
            <div className="md:col-span-8">
              <Img
                src={personalAesthetic?.image}
                alt="Personal aesthetic"
                className="aspect-video rounded-xl"
              />
            </div>

            <div className="md:col-span-4">
              <p className="text-3xl font-bold leading-tight text-white">
                Build clean.
                <br />
                Think clearly.
                <br />
                Ship confidently.
              </p>
            </div>
          </div>
        </section>

        {/* 10 — CONTACT & SOCIAL LINKS */}
        <section
          id="contact"
          className="border-t border-white/10 bg-white/[.02]"
        >
          <div className="mx-auto max-w-6xl px-5 py-20">
            <p className={label}>10 / Contact & social links</p>

            <div className="mt-8 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
              <div>
                <h2 className="text-3xl font-bold text-white sm:text-4xl">
                  Have a project in mind?
                </h2>

                {email && (
                  <a
                    href={`mailto:${email}`}
                    className="mt-5 block break-all text-xl font-semibold text-violet-300 hover:text-violet-200 sm:text-2xl"
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
                    className="text-slate-300 underline underline-offset-4 hover:text-white"
                  >
                    GitHub ↗
                  </a>
                )}

                {socialLinks?.linkedin && (
                  <a
                    href={socialLinks.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="text-slate-300 underline underline-offset-4 hover:text-white"
                  >
                    LinkedIn ↗
                  </a>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* 11 — THANK YOU */}
        <section className="mx-auto max-w-6xl px-5 py-24">
          <p className={label}>11 / Thank you</p>

          <div className="mt-8 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <h2 className="text-6xl font-extrabold tracking-tight text-white sm:text-8xl">
              LET'S
              <br />
              BUILD.
            </h2>

            <div className="flex gap-5 text-sm">
              <a
                href="#about"
                className="text-slate-400 hover:text-white"
              >
                About
              </a>

              <a
                href="#projects"
                className="text-slate-400 hover:text-white"
              >
                Projects
              </a>

              <a
                href="#contact"
                className="text-slate-400 hover:text-white"
              >
                Contact
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-3 px-5 py-6 text-xs text-slate-500 sm:flex-row">
          <span>{name}</span>
          <span>{role}</span>
        </div>
      </footer>
    </div>
  );
}

export default CodeCraftTemplate;