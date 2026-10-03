// Template 04 — Minimal Monochrome
// Font: Inter Tight (Google Fonts) or system sans.
// <link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@300;400;600&display=swap" rel="stylesheet">

const font = {
  fontFamily: "'Inter Tight', system-ui, sans-serif",
};

const Img = ({ src, alt, className = "" }) =>
  src ? (
    <div className={`overflow-hidden bg-neutral-100 ${className}`}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="h-full w-full object-cover grayscale transition-transform duration-700 hover:scale-[1.03]"
      />
    </div>
  ) : null;

const SectionLabel = ({ number, title }) => (
  <div className="mb-8 flex items-center justify-between border-t border-neutral-300 pt-4">
    <span className="text-xs text-neutral-400">{number}</span>
    <span className="text-xs uppercase tracking-[0.2em] text-neutral-500">
      {title}
    </span>
  </div>
);

function MinimalMonochromeTemplate({ portfolio }) {
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

  const under =
    "underline decoration-neutral-300 underline-offset-4 transition-colors hover:decoration-black";

  return (
    <div
      style={font}
      className="min-h-screen overflow-x-hidden bg-white text-black"
    >
      {/* HEADER */}
      <header className="flex items-center justify-between px-5 py-6 text-sm sm:px-10">
        <span className="font-semibold">{name}</span>

        <nav className="flex gap-5">
          <a href="#work" className={under}>
            Work
          </a>

          <a href="#about" className={under}>
            About
          </a>

          <a href="#contact" className={under}>
            Contact
          </a>
        </nav>
      </header>

      <main>
        {/* 01 — HERO / PROFILE */}
        <section className="px-5 pb-24 pt-16 sm:px-10 sm:pt-28">
          <SectionLabel number="01" title="Profile" />

          <h1 className="break-words text-[17vw] font-light leading-[0.82] tracking-tighter sm:text-[13vw]">
            {name}
          </h1>

          <div className="mt-10 flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xl text-neutral-500 sm:text-2xl">
                {role}
              </p>

              <p className="mt-3 text-sm text-neutral-400">
                Portfolio / Selected work
              </p>
            </div>

            {profileImage && (
              <Img
                src={profileImage}
                alt={`Portrait of ${name}`}
                className="aspect-square w-32 sm:w-44"
              />
            )}
          </div>
        </section>

        {/* 02 — ABOUT ME */}
        <section id="about" className="px-5 py-24 sm:px-10">
          <SectionLabel number="02" title="About me" />

          {about && (
            <p className="max-w-5xl text-3xl font-light leading-tight sm:text-5xl md:text-6xl">
              {about}
            </p>
          )}

          {skills?.length > 0 && (
            <div className="mt-14 max-w-4xl">
              <p className="mb-5 text-xs uppercase tracking-[0.2em] text-neutral-400">
                Skills
              </p>

              <div className="flex flex-wrap gap-x-6 gap-y-3 border-t border-neutral-300 pt-5">
                {skills.map((skill, index) => (
                  <span
                    key={`${skill}-${index}`}
                    className="text-lg font-light"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* 03 — DESIGN PHILOSOPHY */}
        <section className="bg-neutral-100 px-5 py-24 sm:px-10">
          <SectionLabel number="03" title="Design philosophy" />

          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div className="space-y-7">
              {designPhilosophy?.text1 && (
                <p className="text-3xl font-light leading-tight sm:text-5xl">
                  {designPhilosophy.text1}
                </p>
              )}

              {designPhilosophy?.text2 && (
                <p className="text-3xl font-light leading-tight text-neutral-500 sm:text-5xl">
                  {designPhilosophy.text2}
                </p>
              )}
            </div>

            <Img
              src={designPhilosophy?.image}
              alt="Design philosophy"
              className="aspect-[4/3]"
            />
          </div>
        </section>

        {/* 04 — CORE VALUES */}
        <section className="px-5 py-24 sm:px-10">
          <SectionLabel number="04" title="Core values" />

          <div className="grid gap-px bg-neutral-300 sm:grid-cols-2">
            <div className="bg-white p-5">
              <span className="text-xs text-neutral-400">01</span>

              <Img
                src={coreValues?.image1}
                alt="Core value one"
                className="mt-5 aspect-[4/5]"
              />

              <p className="mt-5 text-xl font-light">
                Thoughtful by design.
              </p>
            </div>

            <div className="bg-white p-5">
              <span className="text-xs text-neutral-400">02</span>

              <Img
                src={coreValues?.image2}
                alt="Core value two"
                className="mt-5 aspect-[4/5]"
              />

              <p className="mt-5 text-xl font-light">
                Purpose over noise.
              </p>
            </div>
          </div>
        </section>

        {/* 05 — FROM THOUGHT TO FORM */}
        <section className="px-5 py-24 sm:px-10">
          <SectionLabel number="05" title="From thought to form" />

          <div className="grid gap-10 md:grid-cols-12">
            <h2 className="text-5xl font-light leading-[0.95] tracking-tight sm:text-7xl md:col-span-8">
              Ideas become visible through structure, rhythm and restraint.
            </h2>

            <div className="md:col-span-4 md:pt-3">
              <p className="text-neutral-500 leading-relaxed">
                I approach each project by reducing complexity, finding the
                essential idea, and translating it into a clear visual
                language.
              </p>
            </div>
          </div>
        </section>

        {/* 06 — FEATURED PROJECTS */}
        <section id="work" className="px-5 pb-24 sm:px-10">
          <SectionLabel number="06" title="Featured projects" />

          {projects?.length > 0 ? (
            <ul className="border-t border-neutral-300">
              {projects.slice(0, 3).map((project, index) => (
                <li
                  key={index}
                  className="group grid gap-6 border-b border-neutral-300 py-10 md:grid-cols-12"
                >
                  <div className="md:col-span-1">
                    <span className="text-xs text-neutral-400">
                      0{index + 1}
                    </span>
                  </div>

                  <h2 className="text-4xl font-light tracking-tight transition-colors group-hover:text-neutral-500 sm:text-6xl md:col-span-5">
                    {project.title}
                  </h2>

                  <p className="text-neutral-500 md:col-span-3">
                    {project.description}
                  </p>

                  <Img
                    src={project.image}
                    alt={project.title}
                    className="aspect-[4/3] md:col-span-3"
                  />
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-neutral-500">No projects added yet.</p>
          )}
        </section>

        {/* 07 — CASE STUDY */}
        <section className="px-5 py-24 sm:px-10">
          <SectionLabel number="07" title="Case study" />

          <Img
            src={caseStudy?.image}
            alt={caseStudy?.title || "Case study"}
            className="aspect-[16/9] w-full"
          />

          <div className="mt-10 grid gap-6 md:grid-cols-12">
            <h2 className="text-4xl font-light tracking-tight sm:text-6xl md:col-span-7">
              {caseStudy?.title || "Selected case study"}
            </h2>

            <p className="max-w-md text-neutral-500 md:col-span-4 md:col-start-9">
              {caseStudy?.description}
            </p>
          </div>
        </section>

        {/* 08 — CREATIVE TOOLS */}
        <section className="bg-neutral-100 px-5 py-24 sm:px-10">
          <SectionLabel number="08" title="Creative tools" />

          <div className="grid gap-10 md:grid-cols-12">
            <p className="text-3xl font-light leading-tight sm:text-5xl md:col-span-7">
              A focused toolkit for creating useful, expressive digital
              experiences.
            </p>

            {skills?.length > 0 && (
              <div className="md:col-span-4 md:col-start-9">
                <ul className="border-t border-neutral-300">
                  {skills.map((skill, index) => (
                    <li
                      key={`${skill}-tool-${index}`}
                      className="flex justify-between border-b border-neutral-300 py-3 text-sm"
                    >
                      <span>{skill}</span>
                      <span className="text-neutral-400">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>

        {/* 09 — PERSONAL AESTHETIC */}
        <section className="px-5 py-24 sm:px-10">
          <SectionLabel number="09" title="Personal aesthetic" />

          <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <Img
                src={personalAesthetic?.image}
                alt="Personal aesthetic"
                className="aspect-[16/9]"
              />
            </div>

            <div className="lg:col-span-4">
              <p className="text-3xl font-light leading-tight sm:text-4xl">
                Quiet details.
                <br />
                Clear intention.
                <br />
                Lasting impact.
              </p>
            </div>
          </div>
        </section>

        {/* 10 — CONTACT & SOCIAL LINKS */}
        <section id="contact" className="px-5 py-24 sm:px-10">
          <SectionLabel number="10" title="Contact & social links" />

          <div className="grid gap-12 md:grid-cols-12">
            <div className="md:col-span-8">
              <p className="mb-5 text-xs uppercase tracking-[0.2em] text-neutral-400">
                Get in touch
              </p>

              {email && (
                <a
                  href={`mailto:${email}`}
                  className="block break-all text-4xl font-light tracking-tight transition-colors hover:text-neutral-500 sm:text-7xl"
                >
                  {email}
                </a>
              )}
            </div>

            <div className="flex flex-col gap-4 text-sm md:col-span-3 md:col-start-10">
              {socialLinks?.github && (
                <a
                  className={under}
                  href={socialLinks.github}
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub ↗
                </a>
              )}

              {socialLinks?.linkedin && (
                <a
                  className={under}
                  href={socialLinks.linkedin}
                  target="_blank"
                  rel="noreferrer"
                >
                  LinkedIn ↗
                </a>
              )}
            </div>
          </div>
        </section>

        {/* 11 — THANK YOU */}
        <section className="border-t border-neutral-300 px-5 py-24 sm:px-10 sm:py-32">
          <SectionLabel number="11" title="Thank you" />

          <div className="flex flex-col justify-between gap-12 md:flex-row md:items-end">
            <h2 className="text-[18vw] font-light leading-[0.8] tracking-tighter sm:text-[13vw]">
              THANK
              <br />
              YOU.
            </h2>

            <div className="flex gap-6 text-sm">
              <a href="#about" className={under}>
                About
              </a>

              <a href="#work" className={under}>
                Work
              </a>

              <a href="#contact" className={under}>
                Contact
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="flex flex-col justify-between gap-3 border-t border-neutral-300 px-5 py-6 text-xs text-neutral-500 sm:flex-row sm:px-10">
        <span>{name}</span>
        <span>{role}</span>
      </footer>
    </div>
  );
}

export default MinimalMonochromeTemplate;