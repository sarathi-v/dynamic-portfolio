// Template 03 — Swiss Classic
// Font: Archivo (Google Fonts) or Helvetica fallback.
// <link href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;800&display=swap" rel="stylesheet">

const font = {
  fontFamily: "Archivo, 'Helvetica Neue', Helvetica, Arial, sans-serif",
};

const Section = ({ n, title, children, id }) => (
  <section id={id} className="border-t-2 border-black">
    <div className="mx-auto grid max-w-7xl grid-cols-4 gap-x-4 px-4 py-10 sm:px-8 md:grid-cols-12 md:py-16">
      <div className="col-span-4 mb-6 flex gap-4 md:col-span-3 md:mb-0 md:block">
        <span className="block text-sm font-medium text-red-600">{n}</span>
        <h2 className="text-sm font-medium md:mt-1">{title}</h2>
      </div>

      <div className="col-span-4 md:col-span-9">
        {children}
      </div>
    </div>
  </section>
);

const Img = ({ src, alt, className = "" }) =>
  src ? (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      className={`w-full object-cover grayscale transition duration-500 hover:grayscale-0 ${className}`}
    />
  ) : null;

function SwissClassicTemplate({ portfolio }) {
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

  const num = (i) => String(i + 1).padStart(2, "0");

  return (
    <div
      style={font}
      className="min-h-screen overflow-x-hidden bg-white text-black"
    >
      {/* HEADER */}
      <header className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 text-sm font-medium sm:px-8">
        <span>{name}</span>

        <nav aria-label="Primary" className="flex gap-5">
          <a className="hover:text-red-600" href="#about">
            About
          </a>

          <a className="hover:text-red-600" href="#work">
            Work
          </a>

          <a className="hover:text-red-600" href="#contact">
            Contact
          </a>
        </nav>
      </header>

      <main>
        {/* 01 — HERO / PROFILE */}
        <section className="mx-auto grid max-w-7xl grid-cols-4 gap-x-4 px-4 pb-16 pt-10 sm:px-8 md:grid-cols-12 md:pb-24 md:pt-20">
          <div className="col-span-4 md:col-span-9">
            <span className="mb-5 block text-sm font-medium text-red-600">
              01 / Portfolio
            </span>

            <h1 className="break-words text-6xl font-extrabold leading-[0.88] tracking-tighter sm:text-8xl lg:text-[9rem]">
              {name}
            </h1>
          </div>

          <div className="col-span-4 mt-10 md:col-span-3 md:mt-0">
            <p className="text-lg font-medium">{role}</p>

            <Img
              src={profileImage}
              alt={`Portrait of ${name}`}
              className="mt-6 aspect-[4/5]"
            />
          </div>
        </section>

        {/* 02 — ABOUT */}
        {about && (
          <Section id="about" n="02" title="About">
            <p className="max-w-4xl text-2xl font-medium leading-snug sm:text-3xl md:text-4xl">
              {about}
            </p>

            {skills?.length > 0 && (
              <div className="mt-12">
                <p className="mb-3 text-sm font-medium text-red-600">
                  Creative Tools
                </p>

                <ul className="grid grid-cols-2 border-t border-black sm:grid-cols-3 lg:grid-cols-4">
                  {skills.map((skill, index) => (
                    <li
                      key={`${skill}-${index}`}
                      className="border-b border-black py-3 text-sm font-medium"
                    >
                      <span className="mr-3 text-neutral-400">
                        {num(index)}
                      </span>
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </Section>
        )}

        {/* 03 — DESIGN PHILOSOPHY */}
        {(designPhilosophy?.text1 ||
          designPhilosophy?.text2 ||
          designPhilosophy?.image) && (
          <Section n="03" title="Design philosophy">
            <div className="grid gap-8 lg:grid-cols-2">
              <div className="space-y-7">
                {designPhilosophy?.text1 && (
                  <p className="text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl md:text-5xl">
                    {designPhilosophy.text1}
                  </p>
                )}

                {designPhilosophy?.text2 && (
                  <p className="text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl md:text-5xl">
                    {designPhilosophy.text2}
                  </p>
                )}
              </div>

              <Img
                src={designPhilosophy?.image}
                alt="Design philosophy"
                className="aspect-square"
              />
            </div>
          </Section>
        )}

        {/* 04 — CORE VALUES */}
        <Section n="04" title="Core values">
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <div className="mb-3 text-sm text-red-600">01</div>

              <Img
                src={coreValues?.image1}
                alt="Core value one"
                className="aspect-[4/5]"
              />

              <p className="mt-4 text-xl font-extrabold tracking-tight">
                Clarity
              </p>
            </div>

            <div>
              <div className="mb-3 text-sm text-red-600">02</div>

              <Img
                src={coreValues?.image2}
                alt="Core value two"
                className="aspect-[4/5]"
              />

              <p className="mt-4 text-xl font-extrabold tracking-tight">
                Purpose
              </p>
            </div>
          </div>
        </Section>

        {/* 05 — FROM THOUGHT TO FORM */}
        <Section n="05" title="From thought to form">
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <p className="text-4xl font-extrabold leading-[0.95] tracking-tight sm:text-6xl">
                Ideas become meaningful when they are given form.
              </p>
            </div>

            <div className="lg:col-span-4">
              <p className="text-sm leading-relaxed text-neutral-700">
                Every project begins with an idea and develops through
                structure, experimentation, refinement, and a clear visual
                direction.
              </p>
            </div>
          </div>
        </Section>

        {/* 06 — FEATURED PROJECTS */}
        <Section id="work" n="06" title="Featured projects">
          {projects?.length > 0 ? (
            <ol>
              {projects.slice(0, 3).map((project, index) => (
                <li
                  key={index}
                  className="grid gap-5 border-b border-black py-8 first:pt-0 sm:grid-cols-5"
                >
                  <div className="sm:col-span-1">
                    <span className="text-sm text-neutral-500">
                      {num(index)}
                    </span>
                  </div>

                  <div className="sm:col-span-2">
                    <h3 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
                      {project.title}
                    </h3>

                    <p className="mt-3 text-sm leading-relaxed text-neutral-700">
                      {project.description}
                    </p>
                  </div>

                  <div className="sm:col-span-2">
                    <Img
                      src={project.image}
                      alt={project.title}
                      className="aspect-[4/3]"
                    />
                  </div>
                </li>
              ))}
            </ol>
          ) : (
            <p className="text-neutral-500">No projects added yet.</p>
          )}
        </Section>

        {/* 07 — CASE STUDY */}
        <Section n="07" title="Case study">
          {caseStudy?.title || caseStudy?.description || caseStudy?.image ? (
            <div className="grid gap-8 lg:grid-cols-2">
              <div>
                <span className="text-sm text-red-600">Selected work</span>

                <h3 className="mt-4 text-4xl font-extrabold leading-none tracking-tight sm:text-6xl">
                  {caseStudy?.title}
                </h3>

                {caseStudy?.description && (
                  <p className="mt-6 max-w-lg leading-relaxed text-neutral-700">
                    {caseStudy.description}
                  </p>
                )}
              </div>

              <Img
                src={caseStudy?.image}
                alt={caseStudy?.title || "Case study"}
                className="aspect-[4/3]"
              />
            </div>
          ) : (
            <p className="text-neutral-500">No case study added yet.</p>
          )}
        </Section>

        {/* 08 — CREATIVE TOOLS */}
        <Section n="08" title="Creative tools">
          {skills?.length > 0 ? (
            <div>
              <p className="max-w-2xl text-2xl font-medium leading-snug sm:text-3xl">
                A focused toolkit for turning ideas into functional and
                expressive digital experiences.
              </p>

              <div className="mt-10 grid border-t border-black sm:grid-cols-2 lg:grid-cols-3">
                {skills.map((skill, index) => (
                  <div
                    key={`${skill}-tool-${index}`}
                    className="border-b border-black py-5"
                  >
                    <span className="text-sm text-red-600">
                      {num(index)}
                    </span>

                    <p className="mt-2 text-xl font-extrabold tracking-tight">
                      {skill}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-neutral-500">No tools added yet.</p>
          )}
        </Section>

        {/* 09 — PERSONAL AESTHETIC */}
        <Section n="09" title="Personal aesthetic">
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <Img
                src={personalAesthetic?.image}
                alt="Personal aesthetic"
                className="aspect-[16/9]"
              />
            </div>

            <div className="flex items-end lg:col-span-4">
              <p className="text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
                Less noise.
                <br />
                More intention.
              </p>
            </div>
          </div>
        </Section>

        {/* 10 — CONTACT */}
        <Section id="contact" n="10" title="Contact & social links">
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <p className="text-sm text-red-600">Start a conversation</p>

              {email && (
                <a
                  href={`mailto:${email}`}
                  className="mt-4 block break-all text-2xl font-extrabold tracking-tight hover:text-red-600 sm:text-4xl"
                >
                  {email}
                </a>
              )}
            </div>

            <div className="flex flex-col gap-4 text-sm font-medium">
              {socialLinks?.github && (
                <a
                  href={socialLinks.github}
                  target="_blank"
                  rel="noreferrer"
                  className="border-b border-black pb-2 hover:text-red-600"
                >
                  GitHub ↗
                </a>
              )}

              {socialLinks?.linkedin && (
                <a
                  href={socialLinks.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="border-b border-black pb-2 hover:text-red-600"
                >
                  LinkedIn ↗
                </a>
              )}
            </div>
          </div>
        </Section>

        {/* 11 — THANK YOU */}
        <section className="border-t-2 border-black bg-black text-white">
          <div className="mx-auto grid max-w-7xl grid-cols-4 gap-x-4 px-4 py-16 sm:px-8 md:grid-cols-12 md:py-24">
            <span className="col-span-4 text-sm font-medium text-red-500 md:col-span-3">
              11 / Thank you
            </span>

            <div className="col-span-4 md:col-span-9">
              <h2 className="text-5xl font-extrabold leading-[0.9] tracking-tighter sm:text-7xl md:text-8xl">
                THANK
                <br />
                YOU.
              </h2>

              <div className="mt-10 flex flex-wrap gap-6 text-sm font-medium">
                <a
                  href="#about"
                  className="underline underline-offset-4 hover:text-red-500"
                >
                  About
                </a>

                <a
                  href="#work"
                  className="underline underline-offset-4 hover:text-red-500"
                >
                  Work
                </a>

                <a
                  href="#contact"
                  className="underline underline-offset-4 hover:text-red-500"
                >
                  Contact
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-black px-4 pb-8 text-sm text-white sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-3 border-t border-neutral-700 pt-5 sm:flex-row">
          <span>{name}</span>
          <span>{role}</span>
        </div>
      </footer>
    </div>
  );
}

export default SwissClassicTemplate;