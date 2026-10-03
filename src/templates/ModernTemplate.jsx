function ModernTemplate({ portfolio }) {
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
    <div className="min-h-screen overflow-hidden bg-gradient-to-br from-[#d98a9d] via-[#9f3148] to-[#260912] text-white">

      {/* =====================================================
          1. HERO / PROFILE
      ===================================================== */}
      <section className="relative min-h-screen px-6 py-8 sm:px-10 md:px-16">

        {/* Decorative shapes */}
        <div className="absolute left-0 top-40 h-60 w-60 rounded-tr-[120px] bg-gradient-to-br from-[#f0b7c3] to-[#9d1f38]" />

        <div className="absolute -bottom-20 left-0 h-72 w-72 rounded-tr-full bg-gradient-to-br from-[#e8a5b5] to-[#8e1d35] opacity-80" />

        <div className="absolute right-[-80px] top-60 h-16 w-80 rounded-full bg-gradient-to-r from-[#9e1735] to-[#e7a1b2]" />

        <div className="absolute bottom-[-100px] left-[30%] h-64 w-64 rounded-full bg-gradient-to-br from-[#e8a5b5] to-[#9e1d35]" />

        {/* Header */}
        <div className="relative z-10 flex flex-col justify-between gap-3 text-sm font-semibold sm:flex-row">
          <p>Portfolio Presentation</p>

          <p>
            Visual Logic: Designing with Intention
          </p>
        </div>

        {/* Hero content */}
        <div className="relative z-10 mx-auto mt-16 w-full max-w-6xl md:mt-24">

          <p className="mb-4 text-lg font-semibold">
            {role}
          </p>

          <h1 className="break-words text-5xl font-bold leading-[0.9] sm:text-7xl md:text-8xl lg:text-9xl">
            {name}
          </h1>

          <div className="mt-8 max-w-xl">
            <p className="text-base leading-7 sm:text-lg sm:leading-8">
              {about}
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#work"
              className="rounded-full bg-black px-6 py-3 text-sm font-semibold transition hover:bg-white hover:text-black"
            >
              View my work
            </a>

            <a
              href="#contact"
              className="rounded-full border border-white px-6 py-3 text-sm font-semibold transition hover:bg-white hover:text-black"
            >
              Contact me
            </a>
          </div>
        </div>

        {/* Bottom information */}
        <div className="absolute bottom-10 right-6 z-10 sm:right-12">
          <p className="text-sm sm:text-lg">
            Presented By:
            <span className="ml-2 font-bold">
              {name}
            </span>
          </p>
        </div>
      </section>


      {/* =====================================================
          2. ABOUT ME
      ===================================================== */}
      <section
        id="about"
        className="relative px-6 py-20 sm:px-10 md:px-16 lg:px-20"
      >
        <div className="mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-2">

          {/* Profile Image */}
          <div className="relative">

            <div className="absolute -left-4 -top-4 h-16 w-40 rounded-full bg-gradient-to-r from-[#9e1735] to-[#e7a1b2] sm:h-20 sm:w-48" />

            {profileImage && (
              <img
                src={profileImage}
                alt={`Portrait of ${name}`}
                className="relative z-10 h-[350px] w-full rounded-[40px] object-cover sm:h-[450px] md:h-[500px]"
              />
            )}
          </div>

          {/* Content */}
          <div className="relative z-10">

            <p className="text-base font-semibold sm:text-lg">
              {role}
            </p>

            <h2 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
              About Me
            </h2>

            <p className="mt-8 max-w-xl text-base leading-7 sm:text-lg sm:leading-8">
              {about}
            </p>

          </div>
        </div>
      </section>


      {/* =====================================================
          3. DESIGN PHILOSOPHY
      ===================================================== */}
      <section className="relative overflow-hidden px-6 py-20 sm:px-10 md:px-16 lg:px-20">

        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">

          {/* Left */}
          <div className="relative">

            <div className="absolute -left-10 top-20 h-64 w-64 rounded-r-full bg-[#e5a5b5] opacity-40 sm:h-80 sm:w-80" />

            <div className="relative z-10">

              <p className="text-base font-semibold sm:text-lg">
                {role}
              </p>

              <h2 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
                Design
                <br />
                Philosophy
              </h2>

            </div>
          </div>

          {/* Right */}
          <div className="relative z-10">

            <div className="rounded-3xl bg-[#8f3048]/50 p-6 backdrop-blur-sm sm:p-8">

              {designPhilosophy?.text1 && (
                <div className="flex items-start gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-black text-xl">
                    →
                  </span>

                  <p className="text-base font-semibold sm:text-lg">
                    {designPhilosophy.text1}
                  </p>
                </div>
              )}

              {designPhilosophy?.text2 && (
                <div className="mt-8 flex items-start gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-black text-xl">
                    →
                  </span>

                  <p className="text-base font-semibold sm:text-lg">
                    {designPhilosophy.text2}
                  </p>
                </div>
              )}

            </div>

            {/* Dynamic Design Philosophy Image */}
            {designPhilosophy?.image && (
              <div className="mt-8">
                <img
                  src={designPhilosophy.image}
                  alt="Design philosophy"
                  className="h-56 w-full rounded-[30px] object-cover sm:h-72"
                />
              </div>
            )}

          </div>
        </div>
      </section>


      {/* =====================================================
          4. CORE VALUES
      ===================================================== */}
      <section className="relative overflow-hidden px-6 py-20 sm:px-10 md:px-16 lg:px-20">

        <div className="mx-auto max-w-7xl">

          <div className="mb-12 text-center md:text-left">

            <p className="text-base font-semibold sm:text-lg">
              {role}
            </p>

            <h2 className="mt-3 text-4xl font-bold sm:text-5xl md:text-6xl">
              Core Values
            </h2>

          </div>

          <div className="grid gap-8 md:grid-cols-2">

            {/* Value 1 */}
            <div>

              {coreValues?.image1 && (
                <img
                  src={coreValues.image1}
                  alt="Core value one"
                  className="h-64 w-full rounded-[30px] object-cover sm:h-80"
                />
              )}

              <div className="mt-6 rounded-3xl bg-[#e8b7c2]/80 p-6 text-black sm:p-8">

                <div className="flex items-center gap-4">

                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-black text-2xl">
                    +
                  </span>

                  <p className="text-base font-semibold sm:text-lg">
                    Emotion as the bridge between viewer and message
                  </p>

                </div>

              </div>
            </div>

            {/* Value 2 */}
            <div>

              {coreValues?.image2 && (
                <img
                  src={coreValues.image2}
                  alt="Core value two"
                  className="h-64 w-full rounded-[30px] object-cover sm:h-80"
                />
              )}

              <div className="mt-6 rounded-3xl bg-[#e8b7c2]/80 p-6 text-black sm:p-8">

                <div className="flex items-center gap-4">

                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-black text-2xl">
                    +
                  </span>

                  <p className="text-base font-semibold sm:text-lg">
                    Clarity as a foundation for understanding
                  </p>

                </div>

              </div>
            </div>

          </div>
        </div>
      </section>


      {/* =====================================================
          5. FROM THOUGHT TO FORM
      ===================================================== */}
      <section className="relative overflow-hidden px-6 py-20 sm:px-10 md:px-16 lg:px-20">

        <div className="mx-auto max-w-7xl">

          <div className="mb-14">

            <p className="text-base font-semibold sm:text-lg">
              {role}
            </p>

            <h2 className="mt-3 max-w-3xl text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
              From Thought
              <br />
              to Form
            </h2>

          </div>

          <div className="grid gap-8 lg:grid-cols-2">

            {/* Exploration */}
            <div className="rounded-[32px] bg-[#8f3048]/60 p-6 sm:p-10">

              <div className="mb-8 flex items-center justify-between">

                <span className="text-5xl font-bold">
                  01
                </span>

                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-black text-xl">
                  →
                </span>

              </div>

              <h3 className="text-2xl font-bold sm:text-3xl">
                Exploration &amp; Discovery
              </h3>

              <p className="mt-5 max-w-xl text-base leading-7 sm:text-lg sm:leading-8">
                Transforming insights and inspiration into early visual
                directions through research and experimentation.
              </p>

            </div>

            {/* Refinement */}
            <div className="rounded-[32px] bg-[#e8b7c2]/80 p-6 text-black sm:p-10">

              <div className="mb-8 flex items-center justify-between">

                <span className="text-5xl font-bold">
                  02
                </span>

                <span className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-black text-xl">
                  →
                </span>

              </div>

              <h3 className="text-2xl font-bold sm:text-3xl">
                Refinement &amp; Execution
              </h3>

              <p className="mt-5 max-w-xl text-base leading-7 sm:text-lg sm:leading-8">
                Developing each element with intention, ensuring clarity,
                balance, and emotional connection in the final design.
              </p>

            </div>

          </div>
        </div>
      </section>


      {/* =====================================================
          6. FEATURED PROJECTS
      ===================================================== */}
      <section
        id="work"
        className="relative overflow-hidden px-6 py-20 sm:px-10 md:px-16 lg:px-20"
      >

        <div className="mx-auto max-w-7xl">

          <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">

            <div>

              <p className="text-base font-semibold sm:text-lg">
                {role}
              </p>

              <h2 className="mt-3 text-4xl font-bold sm:text-5xl md:text-6xl">
                Featured
                <br />
                Projects
              </h2>

            </div>

            <p className="max-w-md text-base leading-7 sm:text-lg">
              Each project is an opportunity to tell a story through
              thoughtful design, clarity, and visual expression.
            </p>

          </div>

          <div className="grid gap-8 md:grid-cols-2">

            {projects?.slice(0, 3).map((project, index) => (
              <article
                key={`${project.title}-${index}`}
                className="group overflow-hidden rounded-[32px] bg-[#e8b7c2] text-black"
              >

                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-64 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-80"
                  />
                ) : (
                  <div className="flex h-64 items-center justify-center bg-[#b84d68] text-5xl font-bold text-white sm:h-80">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                )}

                <div className="p-6 sm:p-8">

                  <div className="flex items-start justify-between gap-4">

                    <div>

                      <p className="text-sm font-semibold uppercase tracking-widest">
                        Project {String(index + 1).padStart(2, "0")}
                      </p>

                      <h3 className="mt-3 text-2xl font-bold sm:text-3xl">
                        {project.title}
                      </h3>

                    </div>

                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-black">
                      ↗
                    </span>

                  </div>

                  <p className="mt-5 text-base leading-7 sm:text-lg">
                    {project.description}
                  </p>

                </div>

              </article>
            ))}

          </div>
        </div>
      </section>


      {/* =====================================================
          7. CASE STUDY
      ===================================================== */}
      <section className="relative overflow-hidden px-6 py-20 sm:px-10 md:px-16 lg:px-20">

        <div className="mx-auto max-w-7xl">

          <div className="mb-12">

            <p className="text-base font-semibold sm:text-lg">
              {role}
            </p>

            <h2 className="mt-3 text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
              Case Study
            </h2>

          </div>

          <div className="grid gap-8 lg:grid-cols-2">

            <div className="relative min-h-[360px] overflow-hidden rounded-[32px] bg-[#8f3048] sm:min-h-[500px]">

              {caseStudy?.image ? (
                <img
                  src={caseStudy.image}
                  alt={caseStudy.title || "Case Study"}
                  className="h-full min-h-[360px] w-full object-cover sm:min-h-[500px]"
                />
              ) : (
                <div className="flex h-full min-h-[360px] items-center justify-center sm:min-h-[500px]">
                  <span className="text-6xl font-bold text-[#d98da2] sm:text-8xl">
                    CASE
                  </span>
                </div>
              )}

            </div>

            <div className="flex flex-col justify-center rounded-[32px] bg-[#e8b7c2] p-6 text-black sm:p-10 lg:p-14">

              <p className="text-sm font-semibold uppercase tracking-[0.2em]">
                Featured Case Study
              </p>

              <h3 className="mt-5 text-3xl font-bold sm:text-4xl">
                {caseStudy?.title || "Rebranding"}
              </h3>

              <p className="mt-6 text-base leading-7 sm:text-lg sm:leading-8">
                {caseStudy?.description ||
                  "A rebranding project focused on clarity, heritage, and timeless appeal. The design introduces a refined visual direction through thoughtful typography and modern composition."}
              </p>

              <div className="mt-8">
                <span className="inline-flex rounded-full border-2 border-black px-5 py-2 text-sm font-semibold">
                  View Case Study
                </span>
              </div>

            </div>

          </div>
        </div>
      </section>


      {/* =====================================================
          8. CREATIVE TOOLS
      ===================================================== */}
      <section className="relative overflow-hidden px-6 py-20 sm:px-10 md:px-16 lg:px-20">

        <div className="mx-auto max-w-7xl">

          <div className="mb-12">

            <p className="text-base font-semibold sm:text-lg">
              {role}
            </p>

            <h2 className="mt-3 text-4xl font-bold sm:text-5xl md:text-6xl">
              Creative Tools
            </h2>

          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

            {skills?.length > 0 ? (
              skills.map((skill, index) => (
                <div
                  key={skill}
                  className={`rounded-[28px] p-6 sm:p-8 ${
                    index % 3 === 1
                      ? "bg-[#8f3048]"
                      : "bg-[#e8b7c2] text-black"
                  }`}
                >
                  <span className="text-4xl font-bold">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <h3 className="mt-8 text-2xl font-bold">
                    {skill}
                  </h3>

                  <p className="mt-4 leading-7">
                    A creative tool used to develop thoughtful and
                    polished digital experiences.
                  </p>
                </div>
              ))
            ) : (
              <>
                <div className="rounded-[28px] bg-[#e8b7c2] p-6 text-black sm:p-8">
                  <span className="text-4xl font-bold">01</span>
                  <h3 className="mt-8 text-2xl font-bold">Creative Thinking</h3>
                </div>

                <div className="rounded-[28px] bg-[#8f3048] p-6 sm:p-8">
                  <span className="text-4xl font-bold">02</span>
                  <h3 className="mt-8 text-2xl font-bold">Digital Design</h3>
                </div>

                <div className="rounded-[28px] bg-[#e8b7c2] p-6 text-black sm:p-8">
                  <span className="text-4xl font-bold">03</span>
                  <h3 className="mt-8 text-2xl font-bold">Experimentation</h3>
                </div>
              </>
            )}

          </div>
        </div>
      </section>


      {/* =====================================================
          9. PERSONAL AESTHETIC
      ===================================================== */}
      <section className="relative overflow-hidden px-6 py-20 sm:px-10 md:px-16 lg:px-20">

        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2">

          {/* Dynamic Personal Aesthetic Image */}
          <div className="relative overflow-hidden rounded-[32px] bg-[#8f3048]">

            {personalAesthetic?.image ? (
              <img
                src={personalAesthetic.image}
                alt="Personal aesthetic"
                className="h-[400px] w-full object-cover sm:h-[500px]"
              />
            ) : (
              <div className="flex h-[400px] items-center justify-center sm:h-[500px]">
                <span className="text-8xl font-bold text-white/20">
                  09
                </span>
              </div>
            )}

          </div>

          {/* Content */}
          <div>

            <p className="text-base font-semibold sm:text-lg">
              {role}
            </p>

            <h2 className="mt-3 text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
              Personal
              <br />
              Aesthetic
            </h2>

            <p className="mt-8 max-w-xl text-base leading-7 sm:text-lg sm:leading-8">
              My style blends structure with expressiveness. I enjoy
              creating harmony between order and spontaneity — where
              logic meets feeling.
            </p>

            <div className="mt-8 h-1 w-24 rounded-full bg-[#8f3048]" />

          </div>
        </div>
      </section>


      {/* =====================================================
          10. CONTACT & SOCIAL LINKS
      ===================================================== */}
      <section
        id="contact"
        className="relative overflow-hidden px-6 py-20 sm:px-10 md:px-16 lg:px-20"
      >

        <div className="mx-auto max-w-7xl">

          <div className="relative overflow-hidden rounded-[40px] bg-[#8f3048] px-6 py-16 sm:px-10 sm:py-20 md:px-16 lg:px-20">

            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#e8b7c2] opacity-30" />

            <div className="absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-[#e8b7c2] opacity-20" />

            <div className="relative z-10">

              <p className="text-base font-semibold sm:text-lg">
                {role}
              </p>

              <h2 className="mt-5 max-w-4xl text-5xl font-bold leading-[0.95] sm:text-6xl md:text-7xl lg:text-8xl">
                Let's work
                <br />
                together
              </h2>

              <p className="mt-6 max-w-xl text-base leading-7 sm:text-lg">
                Have an idea, project, or opportunity? Let's create
                something meaningful together.
              </p>

              <div className="mt-12 grid gap-6 text-base sm:grid-cols-2 sm:text-lg lg:grid-cols-3">

                {email && (
                  <div>
                    <p className="font-semibold">
                      Email
                    </p>

                    <a
                      href={`mailto:${email}`}
                      className="mt-2 inline-block break-all underline"
                    >
                      {email}
                    </a>
                  </div>
                )}

                <div>
                  <p className="font-semibold">
                    Social
                  </p>

                  <div className="mt-2 flex flex-wrap gap-4">
                    {socialLinks?.github && (
                      <a
                        href={socialLinks.github}
                        target="_blank"
                        rel="noreferrer"
                        className="underline"
                      >
                        GitHub
                      </a>
                    )}

                    {socialLinks?.linkedin && (
                      <a
                        href={socialLinks.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        className="underline"
                      >
                        LinkedIn
                      </a>
                    )}
                  </div>
                </div>

                <div>
                  <p className="font-semibold">
                    Role
                  </p>

                  <p className="mt-2">
                    {role}
                  </p>
                </div>

              </div>

            </div>
          </div>
        </div>
      </section>


      {/* =====================================================
          11. THANK YOU / FOOTER
      ===================================================== */}
      <section className="relative overflow-hidden px-6 py-20 sm:px-10 md:px-16 lg:px-20">

        <div className="mx-auto max-w-7xl text-center">

          <div className="mx-auto h-3 w-3 rounded-full bg-[#e8b7c2]" />

          <p className="mt-8 text-base font-semibold sm:text-lg">
            {name}
          </p>

          <h2 className="mt-4 text-5xl font-bold leading-none sm:text-6xl md:text-8xl">
            Thank You
          </h2>

          <p className="mx-auto mt-6 max-w-xl text-base leading-7 sm:text-lg">
            Thank you for taking the time to explore my portfolio.
          </p>

          <div className="mt-10 border-t border-white/20 pt-6 text-sm text-white/70">
            © {new Date().getFullYear()} {name}. All rights reserved.
          </div>

        </div>
      </section>

    </div>
  );
}

export default ModernTemplate;