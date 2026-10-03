const serif = {
  fontFamily: "'Cormorant Garamond', Georgia, serif",
};

const sans = {
  fontFamily: "Inter, system-ui, sans-serif",
};

const Img = ({ src, alt, className = "" }) =>
  src ? (
    <div className={`overflow-hidden bg-stone-200 ${className}`}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
      />
    </div>
  ) : null;

function EditorialLuxuryTemplate({ portfolio }) {
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

  const link =
    "border-b border-stone-900/30 pb-0.5 transition-colors hover:border-stone-900";

  return (
    <div
      style={sans}
      className="min-h-screen overflow-x-hidden bg-[#faf9f7] text-stone-900"
    >
      {/* HEADER */}
      <header className="mx-auto flex max-w-7xl items-center justify-between border-b border-stone-300 px-5 py-5 text-sm sm:px-10">
        <a href="#top" className="font-medium tracking-wide">
          {name}
        </a>

        <nav
          aria-label="Primary"
          className="flex gap-5 sm:gap-8"
        >
          <a className={link} href="#about">
            About
          </a>

          <a className={link} href="#philosophy">
            Philosophy
          </a>

          <a className={link} href="#work">
            Work
          </a>

          <a className={link} href="#contact">
            Contact
          </a>
        </nav>
      </header>

      <main id="top">

        {/* =====================================================
            1. HERO / PROFILE
        ===================================================== */}
        <section className="mx-auto grid max-w-7xl gap-10 px-5 pb-20 pt-12 sm:px-10 lg:grid-cols-12 lg:pt-20">

          <div className="lg:col-span-7 lg:pt-10">

            <p className="mb-6 text-sm text-stone-500">
              {role}
            </p>

            <p className="mb-4 text-xs uppercase tracking-[0.3em] text-stone-400">
              Portfolio
            </p>

            <h1
              style={serif}
              className="break-words text-6xl font-light leading-[0.95] sm:text-8xl xl:text-9xl"
            >
              {name}
            </h1>

            <p className="mt-8 max-w-xl text-base leading-relaxed text-stone-600 sm:text-lg">
              {about}
            </p>

            <div className="mt-8 flex flex-wrap gap-6 text-sm">
              <a className={link} href="#work">
                Explore my work
              </a>

              <a className={link} href="#contact">
                Get in touch
              </a>
            </div>
          </div>

          <Img
            src={profileImage}
            alt={`Portrait of ${name}`}
            className="aspect-[4/5] lg:col-span-5 lg:mt-24"
          />
        </section>


        {/* =====================================================
            2. ABOUT ME
        ===================================================== */}
        <section
          id="about"
          className="mx-auto grid max-w-7xl gap-8 border-t border-stone-300 px-5 py-20 sm:px-10 lg:grid-cols-12"
        >
          <div className="lg:col-span-3">
            <h2 className="text-sm text-stone-500">
              02 / About
            </h2>
          </div>

          <div className="lg:col-span-7 lg:col-start-5">

            <h3
              style={serif}
              className="mb-6 text-4xl font-light sm:text-5xl"
            >
              About Me
            </h3>

            <p
              style={serif}
              className="text-3xl font-light leading-snug sm:text-4xl"
            >
              {about}
            </p>

          </div>
        </section>


        {/* =====================================================
            3. DESIGN PHILOSOPHY
        ===================================================== */}
        <section
          id="philosophy"
          className="border-t border-stone-300 bg-stone-100"
        >
          <div className="mx-auto grid max-w-7xl gap-10 px-5 py-24 sm:px-10 lg:grid-cols-12 lg:items-center">

            <div className="lg:col-span-7">

              <h2 className="mb-8 text-sm text-stone-500">
                03 / Design Philosophy
              </h2>

              {[
                designPhilosophy?.text1,
                designPhilosophy?.text2,
              ]
                .filter(Boolean)
                .map((text) => (
                  <p
                    key={text}
                    style={serif}
                    className="mb-6 text-4xl font-light italic leading-tight sm:text-5xl"
                  >
                    {text}
                  </p>
                ))}

            </div>

            <Img
              src={designPhilosophy?.image}
              alt="Design philosophy"
              className="aspect-square lg:col-span-4 lg:col-start-9"
            />

          </div>
        </section>


        {/* =====================================================
            4. CORE VALUES
        ===================================================== */}
        <section className="mx-auto max-w-7xl border-t border-stone-300 px-5 py-24 sm:px-10">

          <div className="mb-14">

            <h2 className="text-sm text-stone-500">
              04 / Core Values
            </h2>

            <h3
              style={serif}
              className="mt-4 text-5xl font-light sm:text-6xl"
            >
              What guides the work.
            </h3>

          </div>

          <div className="grid gap-8 md:grid-cols-2">

            <div>
              <Img
                src={coreValues?.image1}
                alt="Core value one"
                className="aspect-[4/3]"
              />

              <div className="mt-6 max-w-md">

                <span className="text-xs text-stone-400">
                  01
                </span>

                <h4
                  style={serif}
                  className="mt-2 text-3xl"
                >
                  Purpose
                </h4>

                <p className="mt-3 text-sm leading-relaxed text-stone-600">
                  Every creative decision begins with meaning,
                  intention, and a clear purpose.
                </p>

              </div>
            </div>

            <div className="md:mt-20">

              <Img
                src={coreValues?.image2}
                alt="Core value two"
                className="aspect-[4/3]"
              />

              <div className="mt-6 max-w-md">

                <span className="text-xs text-stone-400">
                  02
                </span>

                <h4
                  style={serif}
                  className="mt-2 text-3xl"
                >
                  Clarity
                </h4>

                <p className="mt-3 text-sm leading-relaxed text-stone-600">
                  Simplicity creates space for ideas to communicate
                  clearly and naturally.
                </p>

              </div>

            </div>

          </div>
        </section>


        {/* =====================================================
            5. FROM THOUGHT TO FORM
        ===================================================== */}
        <section className="border-t border-stone-300">

          <div className="mx-auto max-w-7xl px-5 py-24 sm:px-10">

            <div className="grid gap-12 lg:grid-cols-12">

              <div className="lg:col-span-5">

                <h2 className="text-sm text-stone-500">
                  05 / Process
                </h2>

                <h3
                  style={serif}
                  className="mt-5 text-5xl font-light leading-tight sm:text-6xl"
                >
                  From Thought
                  <br />
                  to Form
                </h3>

              </div>

              <div className="space-y-12 lg:col-span-6 lg:col-start-7">

                <div className="border-t border-stone-300 pt-6">

                  <span className="text-xs text-stone-400">
                    01
                  </span>

                  <h4
                    style={serif}
                    className="mt-3 text-3xl"
                  >
                    Exploration &amp; Discovery
                  </h4>

                  <p className="mt-3 max-w-lg text-sm leading-relaxed text-stone-600">
                    Transforming insights and inspiration into early
                    visual directions through research and exploration.
                  </p>

                </div>

                <div className="border-t border-stone-300 pt-6">

                  <span className="text-xs text-stone-400">
                    02
                  </span>

                  <h4
                    style={serif}
                    className="mt-3 text-3xl"
                  >
                    Refinement &amp; Execution
                  </h4>

                  <p className="mt-3 max-w-lg text-sm leading-relaxed text-stone-600">
                    Developing each element with intention while
                    maintaining clarity, balance, and emotional impact.
                  </p>

                </div>

              </div>
            </div>
          </div>
        </section>


        {/* =====================================================
            6. FEATURED PROJECTS
        ===================================================== */}
        <section
          id="work"
          className="mx-auto max-w-7xl border-t border-stone-300 px-5 py-20 sm:px-10"
        >

          <div className="mb-14">

            <h2 className="text-sm text-stone-500">
              06 / Featured Projects
            </h2>

            <h3
              style={serif}
              className="mt-4 text-5xl font-light sm:text-6xl"
            >
              Selected Work
            </h3>

          </div>

          <div className="space-y-20 sm:space-y-28">

            {projects?.slice(0, 3).map((project, index) => {

              const flip = index % 2 === 1;

              return (
                <article
                  key={`${project.title}-${index}`}
                  className="grid items-end gap-6 md:grid-cols-12"
                >

                  <Img
                    src={project.image}
                    alt={project.title}
                    className={`aspect-[4/3] md:col-span-8 ${
                      flip ? "md:order-2" : ""
                    }`}
                  />

                  <div
                    className={`md:col-span-4 ${
                      flip
                        ? "md:order-1 md:pr-6"
                        : "md:pl-6"
                    }`}
                  >

                    <p className="text-xs text-stone-400">
                      Project {String(index + 1).padStart(2, "0")}
                    </p>

                    <h3
                      style={serif}
                      className="mt-3 text-3xl sm:text-4xl"
                    >
                      {project.title}
                    </h3>

                    <p className="mt-3 text-sm leading-relaxed text-stone-600">
                      {project.description}
                    </p>

                  </div>

                </article>
              );
            })}

          </div>
        </section>


        {/* =====================================================
            7. CASE STUDY
        ===================================================== */}
        {caseStudy?.title && (
          <section className="border-t border-stone-300 bg-stone-100">

            <div className="mx-auto grid max-w-7xl gap-10 px-5 py-20 sm:px-10 lg:grid-cols-2 lg:items-center">

              <Img
                src={caseStudy.image}
                alt={caseStudy.title}
                className="aspect-[5/4]"
              />

              <div>

                <h2 className="mb-4 text-sm text-stone-500">
                  07 / Case Study
                </h2>

                <h3
                  style={serif}
                  className="text-5xl font-light sm:text-6xl"
                >
                  {caseStudy.title}
                </h3>

                <p className="mt-6 max-w-md leading-relaxed text-stone-600">
                  {caseStudy.description}
                </p>

              </div>

            </div>
          </section>
        )}


        {/* =====================================================
            8. CREATIVE TOOLS
        ===================================================== */}
        <section className="mx-auto max-w-7xl border-t border-stone-300 px-5 py-24 sm:px-10">

          <div className="grid gap-12 lg:grid-cols-12">

            <div className="lg:col-span-5">

              <h2 className="text-sm text-stone-500">
                08 / Creative Tools
              </h2>

              <h3
                style={serif}
                className="mt-4 text-5xl font-light sm:text-6xl"
              >
                Tools behind
                <br />
                the craft.
              </h3>

            </div>

            <div className="lg:col-span-6 lg:col-start-7">

              <div className="border-t border-stone-300">

                {skills?.map((skill, index) => (
                  <div
                    key={skill}
                    className="flex items-center justify-between border-b border-stone-300 py-5"
                  >

                    <span className="text-xs text-stone-400">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span className="text-lg">
                      {skill}
                    </span>

                  </div>
                ))}

              </div>

            </div>
          </div>
        </section>


        {/* =====================================================
            9. PERSONAL AESTHETIC
        ===================================================== */}
        {personalAesthetic?.image && (
          <section className="border-t border-stone-300 bg-[#f0eeea]">

            <div className="mx-auto grid max-w-7xl gap-10 px-5 py-24 sm:px-10 lg:grid-cols-12 lg:items-center">

              <div className="lg:col-span-5">

                <h2 className="text-sm text-stone-500">
                  09 / Personal Aesthetic
                </h2>

                <h3
                  style={serif}
                  className="mt-4 text-5xl font-light leading-tight sm:text-6xl"
                >
                  A visual
                  <br />
                  language of my own.
                </h3>

                <p className="mt-6 max-w-md leading-relaxed text-stone-600">
                  A balance between structure, emotion, simplicity,
                  and carefully considered details.
                </p>

              </div>

              <Img
                src={personalAesthetic.image}
                alt="Personal aesthetic"
                className="aspect-[4/3] lg:col-span-6 lg:col-start-7"
              />

            </div>
          </section>
        )}


        {/* =====================================================
            10. CONTACT & SOCIAL LINKS
        ===================================================== */}
        <section
          id="contact"
          className="border-t border-stone-300"
        >

          <div className="mx-auto max-w-7xl px-5 py-24 sm:px-10">

            <h2 className="text-sm text-stone-500">
              10 / Contact &amp; Social Links
            </h2>

            <h3
              style={serif}
              className="mt-5 max-w-4xl text-5xl font-light leading-tight sm:text-7xl"
            >
              Let's create something
              <br />
              meaningful together.
            </h3>

            {email && (
              <a
                href={`mailto:${email}`}
                style={serif}
                className="mt-12 block break-all text-3xl font-light transition-opacity hover:opacity-60 sm:text-5xl"
              >
                {email}
              </a>
            )}

            <div className="mt-8 flex gap-6 text-sm">

              {socialLinks?.github && (
                <a
                  className={link}
                  href={socialLinks.github}
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub
                </a>
              )}

              {socialLinks?.linkedin && (
                <a
                  className={link}
                  href={socialLinks.linkedin}
                  target="_blank"
                  rel="noreferrer"
                >
                  LinkedIn
                </a>
              )}

            </div>

          </div>
        </section>


        {/* =====================================================
            11. THANK YOU / FOOTER
        ===================================================== */}
        <section className="border-t border-stone-300">

          <div className="mx-auto max-w-7xl px-5 py-20 text-center sm:px-10">

            <p className="text-xs uppercase tracking-[0.3em] text-stone-400">
              11 / End
            </p>

            <h2
              style={serif}
              className="mt-5 text-5xl font-light sm:text-7xl"
            >
              Thank You
            </h2>

            <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-stone-500">
              Thank you for taking the time to explore my portfolio
              and creative work.
            </p>

            <div className="mx-auto mt-10 h-px w-20 bg-stone-900" />

            <p className="mt-6 text-xs text-stone-400">
              © {new Date().getFullYear()} {name}. All rights reserved.
            </p>

          </div>
        </section>

      </main>
    </div>
  );
}

export default EditorialLuxuryTemplate;