function ModernTemplate({ portfolio }) {
  return (
    <div className="min-h-screen overflow-hidden bg-gradient-to-br from-[#d98a9d] via-[#9f3148] to-[#260912] text-white">

      {/* HERO SECTION */}
      <section className="relative min-h-screen px-8 py-10 md:px-16">

        {/* Decorative shapes */}
        <div className="absolute left-0 top-40 h-60 w-60 rounded-tr-[120px] bg-gradient-to-br from-[#f0b7c3] to-[#9d1f38]" />

        <div className="absolute -bottom-20 left-0 h-72 w-72 rounded-tr-full bg-gradient-to-br from-[#e8a5b5] to-[#8e1d35] opacity-80" />

        <div className="absolute right-[-80px] top-60 h-16 w-80 rounded-full bg-gradient-to-r from-[#9e1735] to-[#e7a1b2]" />

        <div className="absolute bottom-[-100px] left-[30%] h-64 w-64 rounded-full bg-gradient-to-br from-[#e8a5b5] to-[#9e1d35]" />

        {/* Top content */}
        <div className="relative z-10 flex justify-between text-sm font-semibold">
          <p>Portfolio Presentation</p>

          <p>
            Visual Logic: Designing with Intention
          </p>
        </div>

        {/* Main title */}
        <div className="relative z-10 ml-auto mt-8 max-w-2xl md:mt-16">

          <p className="mb-4 text-lg font-semibold">
            {portfolio.role}
          </p>

          <h1 className="text-5xl font-bold leading-[0.95] md:text-7xl">
            {portfolio.name}
            <br />
            Portfolio
          </h1>
        </div>

        {/* Bottom information */}
        <div className="absolute bottom-12 right-12 z-10">

          <p className="text-lg">
            @reallygreatsite
          </p>

          <p className="mt-2 text-lg">
            Presented By:
            <span className="ml-2 font-bold">
              {portfolio.name}
            </span>
          </p>

        </div>

      </section>
            {/* ABOUT ME SECTION */}
      <section className="relative px-6 py-20 sm:px-10 md:px-16 lg:px-20">

        <div className="mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-2">

          {/* Profile Image */}
          <div className="relative">

            <div className="absolute -left-4 -top-4 h-16 w-40 rounded-full bg-gradient-to-r from-[#9e1735] to-[#e7a1b2] sm:h-20 sm:w-48" />

            <img
              src={portfolio.profileImage}
              alt={portfolio.name}
              className="relative z-10 h-[350px] w-full rounded-[40px] object-cover sm:h-[450px] md:h-[500px]"
            />

          </div>

          {/* About Content */}
          <div className="relative z-10">

            <p className="text-base font-semibold sm:text-lg">
              {portfolio.role}
            </p>

            <h2 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
              About Me
            </h2>

            <p className="mt-8 max-w-xl text-base leading-7 sm:text-lg sm:leading-8">
              {portfolio.about}
            </p>

          </div>

        </div>

      </section>
      {/* DESIGN PHILOSOPHY SECTION */}
<section className="relative overflow-hidden px-6 py-20 sm:px-10 md:px-16 lg:px-20">

  <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">

    {/* Left side */}
    <div className="relative">

      <div className="absolute -left-10 top-20 h-64 w-64 rounded-r-full bg-[#e5a5b5] opacity-40 sm:h-80 sm:w-80" />

      <div className="relative z-10">
        <p className="text-base font-semibold sm:text-lg">
          {portfolio.role}
        </p>

        <h2 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
          Design
          <br />
          Philosophy
        </h2>
      </div>

    </div>

    {/* Right side */}
    <div className="relative z-10">

      <div className="rounded-3xl bg-[#8f3048]/50 p-6 backdrop-blur-sm sm:p-8">

        <div className="flex items-start gap-4">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-black text-xl">
            →
          </span>

          <p className="text-base font-semibold sm:text-lg">
            Design communicates before words do
          </p>
        </div>

        <div className="mt-8 flex items-start gap-4">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-black text-xl">
            →
          </span>

          <p className="text-base font-semibold sm:text-lg">
            Simplicity strengthens emotional impact
          </p>
        </div>

      </div>

      {/* Supporting image */}
<div className="mt-8">
  <img
    src="/image/design-philosophy.png"
    alt="Design Philosophy"
    className="h-56 w-full rounded-[30px] object-cover sm:h-72"
  />
</div>

    </div>

  </div>

</section>
{/* CORE VALUES SECTION */}
<section className="relative overflow-hidden px-6 py-20 sm:px-10 md:px-16 lg:px-20">

  <div className="mx-auto max-w-7xl">

    {/* Heading */}
    <div className="mb-12 text-center md:text-left">
      <p className="text-base font-semibold sm:text-lg">
        {portfolio.role}
      </p>

      <h2 className="mt-3 text-4xl font-bold sm:text-5xl md:text-6xl">
        Core Values
      </h2>
    </div>

    {/* Values */}
    <div className="grid gap-8 md:grid-cols-2">

      {/* Value 1 */}
      <div>
        <div className="rounded-3xl bg-[#e8b7c2]/80 p-6 text-black sm:p-8">
          <div className="flex items-center gap-4">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-black text-2xl">
              +
            </span>

            <p className="text-base font-semibold sm:text-lg">
              Emotion as the bridge between viewer and message
            </p>
          </div>
        </div>

        <img
          src="/image/core-value-1.png"
          alt="Creative work"
          className="mt-6 h-64 w-full rounded-[30px] object-cover sm:h-80"
        />
      </div>

      {/* Value 2 */}
      <div className="flex flex-col">

        <img
          src="/image/core-value-2.png"
          alt="Design work"
          className="order-2 h-48 w-full rounded-[30px] object-cover md:order-1 sm:h-64"
        />

        <div className="order-1 mt-6 rounded-3xl bg-[#e8b7c2]/80 p-6 text-black md:order-2 sm:p-8">
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
{/* FROM THOUGHT TO FORM SECTION */}
<section className="relative overflow-hidden px-6 py-20 sm:px-10 md:px-16 lg:px-20">

  <div className="mx-auto max-w-7xl">

    {/* Heading */}
    <div className="mb-14">
      <p className="text-base font-semibold sm:text-lg">
        {portfolio.role}
      </p>

      <h2 className="mt-3 max-w-3xl text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
        From Thought
        <br />
        to Form
      </h2>
    </div>

    {/* Process */}
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
          Exploration & Discovery
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
          Refinement & Execution
        </h3>

        <p className="mt-5 max-w-xl text-base leading-7 sm:text-lg sm:leading-8">
          Developing each element with intention, ensuring clarity,
          balance, and emotional connection in the final design.
        </p>

      </div>

    </div>

  </div>

</section>
{/* FEATURED PROJECTS SECTION */}
<section className="relative overflow-hidden px-6 py-20 sm:px-10 md:px-16 lg:px-20">

  <div className="mx-auto max-w-7xl">

    {/* Heading */}
    <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">

      <div>
        <p className="text-base font-semibold sm:text-lg">
          {portfolio.role}
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

    {/* Project Cards */}
    <div className="grid gap-8 md:grid-cols-2">

      {portfolio.projects?.map((project, index) => (
        <article
          key={project.title}
          className="group overflow-hidden rounded-[32px] bg-[#e8b7c2] text-black"
        >

          {/* Project Image */}
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

          {/* Project Content */}
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
{/* CASE STUDY SECTION */}
<section className="relative overflow-hidden px-6 py-20 sm:px-10 md:px-16 lg:px-20">

  <div className="mx-auto max-w-7xl">

    {/* Section heading */}
    <div className="mb-12">
      <p className="text-base font-semibold sm:text-lg">
        {portfolio.role}
      </p>

      <h2 className="mt-3 text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
        Case Study:
        <br />
        Rebranding
      </h2>
    </div>

    {/* Case study layout */}
    <div className="grid gap-8 lg:grid-cols-2">

      {/* Visual */}
      <div className="relative min-h-[360px] overflow-hidden rounded-[32px] bg-[#8f3048] sm:min-h-[500px]">

        {portfolio.caseStudy?.image ? (
  <img
    src={portfolio.caseStudy.image}
    alt={portfolio.caseStudy.title || "Case Study"}
    className="h-full min-h-[360px] w-full object-cover sm:min-h-[500px]"
  />
) : (
  <div className="relative overflow-hidden rounded-[2rem] bg-[#96344f] min-h-[360px] sm:min-h-[500px]">
  {portfolio.projects?.[1]?.image ? (
    <img
      src={portfolio.projects[1].image}
      alt={portfolio.projects[1].title || "Case Study"}
      className="h-full w-full object-cover"
    />
  ) : (
    <div className="flex h-full min-h-[360px] items-center justify-center sm:min-h-[500px]">
      <span className="text-6xl font-bold text-[#d98da2] sm:text-8xl">
        CASE
      </span>
    </div>
  )}
</div>
)}

      </div>

      {/* Description */}
      <div className="flex flex-col justify-center rounded-[32px] bg-[#e8b7c2] p-6 text-black sm:p-10 lg:p-14">

        <p className="text-sm font-semibold uppercase tracking-[0.2em]">
          Featured Case Study
        </p>

        <h3 className="mt-5 text-3xl font-bold sm:text-4xl">
          {portfolio.caseStudy?.title || "Rebranding"}
        </h3>

        <p className="mt-6 text-base leading-7 sm:text-lg sm:leading-8">
          {portfolio.caseStudy?.description ||
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

{/* CREATIVE TOOLS SECTION */}
<section className="relative overflow-hidden px-6 py-20 sm:px-10 md:px-16 lg:px-20">

  <div className="mx-auto max-w-7xl">

    {/* Heading */}
    <div className="mb-12">
      <p className="text-base font-semibold sm:text-lg">
        {portfolio.role}
      </p>

      <h2 className="mt-3 text-4xl font-bold sm:text-5xl md:text-6xl">
        Creative Tools
      </h2>
    </div>

    {/* Tools */}
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

      <div className="rounded-[28px] bg-[#e8b7c2] p-6 text-black sm:p-8">
        <span className="text-4xl font-bold">01</span>

        <h3 className="mt-8 text-2xl font-bold">
          Sketching
        </h3>

        <p className="mt-4 leading-7">
          Sketch-based ideation and visualization for exploring
          early creative directions.
        </p>
      </div>

      <div className="rounded-[28px] bg-[#8f3048] p-6 sm:p-8">
        <span className="text-4xl font-bold">02</span>

        <h3 className="mt-8 text-2xl font-bold">
          Digital Design
        </h3>

        <p className="mt-4 leading-7">
          Precision design using digital workflows to develop
          polished visual outcomes.
        </p>
      </div>

      <div className="rounded-[28px] bg-[#e8b7c2] p-6 text-black sm:p-8">
        <span className="text-4xl font-bold">03</span>

        <h3 className="mt-8 text-2xl font-bold">
          Experimentation
        </h3>

        <p className="mt-4 leading-7">
          Experimentation through new techniques, ideas, and
          visual approaches.
        </p>
      </div>

    </div>

  </div>

</section>
{/* PERSONAL AESTHETIC SECTION */}
<section className="relative overflow-hidden px-6 py-20 sm:px-10 md:px-16 lg:px-20">

  <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2">

    {/* Image */}
    <div className="relative overflow-hidden rounded-[32px] bg-[#8f3048]">

      {portfolio.projects?.[1]?.image ? (
        <img
          src={portfolio.projects[1].image}
          alt="Personal aesthetic"
          className="h-[400px] w-full object-cover sm:h-[500px]"
        />
      ) : (
        <div className="flex h-[400px] items-center justify-center sm:h-[500px]">
          <span className="text-8xl font-bold text-white/20">
            02
          </span>
        </div>
      )}

    </div>

    {/* Content */}
    <div>

      <p className="text-base font-semibold sm:text-lg">
        {portfolio.role}
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
{/* THANK YOU / CONTACT SECTION */}
<section className="relative overflow-hidden px-6 py-20 sm:px-10 md:px-16 lg:px-20">

  <div className="mx-auto max-w-7xl">

    <div className="relative overflow-hidden rounded-[40px] bg-[#8f3048] px-6 py-16 sm:px-10 sm:py-20 md:px-16 lg:px-20">

      {/* Decorative shapes */}
      <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#e8b7c2] opacity-30" />

      <div className="absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-[#e8b7c2] opacity-20" />

      {/* Content */}
      <div className="relative z-10">

        <p className="text-base font-semibold sm:text-lg">
          {portfolio.role}
        </p>

        <h2 className="mt-5 max-w-4xl text-5xl font-bold leading-[0.95] sm:text-6xl md:text-7xl lg:text-8xl">
          Thank you
          <br />
          so much
        </h2>

        {/* Contact information */}
        <div className="mt-12 grid gap-6 text-base sm:grid-cols-2 sm:text-lg lg:grid-cols-3">

          <div>
            <p className="font-semibold">
              Email
            </p>

            <a
              href="mailto:example@email.com"
              className="mt-2 inline-block break-all underline"
            >
              example@email.com
            </a>
          </div>

          <div>
            <p className="font-semibold">
              Social
            </p>

            <div className="mt-2 flex gap-4">
              <a
                href={portfolio.socialLinks?.github}
                target="_blank"
                rel="noreferrer"
                className="underline"
              >
                GitHub
              </a>

              <a
                href={portfolio.socialLinks?.linkedin}
                target="_blank"
                rel="noreferrer"
                className="underline"
              >
                LinkedIn
              </a>
            </div>
          </div>

          <div>
            <p className="font-semibold">
              Role
            </p>

            <p className="mt-2">
              {portfolio.role}
            </p>
          </div>

        </div>

      </div>

    </div>

  </div>

</section>

    </div>
  );
}

export default ModernTemplate;