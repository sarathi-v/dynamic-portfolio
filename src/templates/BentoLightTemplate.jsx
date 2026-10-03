import { Img, Socials, philosophy } from "./shared";

const font = {
  fontFamily: "Outfit, system-ui, sans-serif",
};

const tile =
  "overflow-hidden rounded-3xl bg-white p-6 sm:p-8";

function BentoLightTemplate({ portfolio }) {
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
  } = portfolio;

  return (
    <div
      style={font}
      className="min-h-screen overflow-x-hidden bg-[#eef0f5] p-3 text-slate-700 sm:p-6"
    >
      <main className="mx-auto grid max-w-6xl gap-3 sm:gap-4 md:grid-cols-6">

        {/* 1. HERO / PROFILE */}
        <section
          className={`${tile} flex flex-col justify-between bg-indigo-600 text-white md:col-span-4 md:min-h-[22rem]`}
        >
          <div>
            <p className="text-sm text-indigo-200">{role}</p>

            <p className="mt-3 text-xs uppercase tracking-widest text-indigo-200">
              Portfolio
            </p>
          </div>

          <h1 className="mt-10 break-words text-5xl font-bold leading-none sm:text-7xl">
            {name}
          </h1>
        </section>

        <div className="aspect-square overflow-hidden rounded-3xl bg-slate-300 md:col-span-2 md:aspect-auto">
          <Img
            src={profileImage}
            alt={`Portrait of ${name}`}
            className="h-full w-full"
          />
        </div>

        {/* 2. ABOUT ME */}
        <section className={`${tile} md:col-span-4`}>
          <h2 className="mb-3 text-sm font-medium text-indigo-600">
            About me
          </h2>

          <h3 className="mb-4 text-3xl font-bold text-slate-900">
            A little about who I am.
          </h3>

          <p className="text-xl leading-relaxed text-slate-700 sm:text-2xl">
            {about}
          </p>
        </section>

        {/* Skills preview */}
        {skills?.length > 0 && (
          <section className={`${tile} md:col-span-2`}>
            <h2 className="mb-3 text-sm font-medium text-indigo-600">
              Skills
            </h2>

            <ul className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <li
                  key={skill}
                  className="rounded-full bg-slate-100 px-3 py-1.5 text-sm"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* 3. DESIGN PHILOSOPHY */}
        <section className={`${tile} bg-amber-100 md:col-span-3`}>
          <h2 className="mb-5 text-sm font-medium text-indigo-600">
            Design philosophy
          </h2>

          <div>
            {philosophy(portfolio).map((text) => (
              <p
                key={text}
                className="mb-4 text-2xl font-medium text-slate-900 sm:text-3xl"
              >
                {text}
              </p>
            ))}
          </div>
        </section>

        <section className={`${tile} bg-indigo-50 md:col-span-3`}>
          {designPhilosophy?.image ? (
            <Img
              src={designPhilosophy.image}
              alt="Design philosophy"
              className="aspect-[4/3] w-full rounded-2xl"
            />
          ) : (
            <div className="flex aspect-[4/3] items-center justify-center rounded-2xl bg-indigo-100">
              <span className="text-sm text-indigo-500">
                Design philosophy
              </span>
            </div>
          )}
        </section>

        {/* 4. CORE VALUES */}
        <section className={`${tile} md:col-span-6`}>
          <div className="mb-8">
            <h2 className="text-sm font-medium text-indigo-600">
              Core values
            </h2>

            <h3 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">
              What guides my work.
            </h3>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="overflow-hidden rounded-2xl bg-slate-100">
              {coreValues?.image1 && (
                <Img
                  src={coreValues.image1}
                  alt="Core value one"
                  className="aspect-[4/3] w-full"
                />
              )}

              <div className="p-5">
                <span className="text-xs font-medium text-indigo-600">
                  01
                </span>

                <h4 className="mt-1 text-xl font-bold text-slate-900">
                  Purpose
                </h4>
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl bg-slate-100">
              {coreValues?.image2 && (
                <Img
                  src={coreValues.image2}
                  alt="Core value two"
                  className="aspect-[4/3] w-full"
                />
              )}

              <div className="p-5">
                <span className="text-xs font-medium text-indigo-600">
                  02
                </span>

                <h4 className="mt-1 text-xl font-bold text-slate-900">
                  Creativity
                </h4>
              </div>
            </div>
          </div>
        </section>

        {/* 5. FROM THOUGHT TO FORM */}
        <section className={`${tile} bg-slate-900 text-white md:col-span-6`}>
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <div>
              <h2 className="text-sm font-medium text-indigo-300">
                From thought to form
              </h2>

              <h3 className="mt-3 text-4xl font-bold leading-tight sm:text-5xl">
                Turning ideas into experiences.
              </h3>

              <p className="mt-4 max-w-md leading-relaxed text-slate-300">
                A simple process that transforms an initial thought
                into a focused and meaningful final result.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl bg-indigo-600 p-5">
                <span className="text-sm text-indigo-200">01</span>
                <h4 className="mt-6 font-bold">Think</h4>
                <p className="mt-2 text-sm text-indigo-100">
                  Understand the idea and purpose.
                </p>
              </div>

              <div className="rounded-2xl bg-white p-5 text-slate-900">
                <span className="text-sm text-slate-400">02</span>
                <h4 className="mt-6 font-bold">Shape</h4>
                <p className="mt-2 text-sm text-slate-600">
                  Turn the concept into direction.
                </p>
              </div>

              <div className="rounded-2xl bg-amber-100 p-5 text-slate-900">
                <span className="text-sm text-slate-500">03</span>
                <h4 className="mt-6 font-bold">Create</h4>
                <p className="mt-2 text-sm text-slate-600">
                  Build the final experience.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 6. FEATURED PROJECTS */}
        {projects?.length > 0 && (
          <>
            <section className={`${tile} md:col-span-6`}>
              <h2 className="text-sm font-medium text-indigo-600">
                Featured projects
              </h2>

              <h3 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">
                Selected work.
              </h3>
            </section>

            {projects.slice(0, 3).map((project, index) => (
              <article
                key={index}
                className={`group relative min-h-[18rem] overflow-hidden rounded-3xl bg-slate-900 ${
                  index === 0
                    ? "md:col-span-4"
                    : "md:col-span-2"
                }`}
              >
                <Img
                  src={project.image}
                  alt={project.title}
                  className="absolute inset-0 h-full w-full transition duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-x-3 bottom-3 rounded-2xl bg-white/95 p-4">
                  <p className="text-xs font-medium text-indigo-600">
                    Project {index + 1}
                  </p>

                  <h3 className="mt-1 font-bold text-slate-900">
                    {project.title}
                  </h3>

                  <p className="text-sm text-slate-600">
                    {project.description}
                  </p>
                </div>
              </article>
            ))}
          </>
        )}

        {/* 7. CASE STUDY */}
        {caseStudy?.title && (
          <section
            className={`${tile} grid items-center gap-6 p-0 md:col-span-6 md:grid-cols-2`}
          >
            <Img
              src={caseStudy.image}
              alt={caseStudy.title}
              className="aspect-video h-full w-full"
            />

            <div className="p-6 sm:p-10">
              <h2 className="mb-2 text-sm font-medium text-indigo-600">
                Case study
              </h2>

              <h3 className="text-3xl font-bold text-slate-900">
                {caseStudy.title}
              </h3>

              <p className="mt-4 leading-relaxed text-slate-600">
                {caseStudy.description}
              </p>
            </div>
          </section>
        )}

        {/* 8. CREATIVE TOOLS */}
        {skills?.length > 0 && (
          <section className={`${tile} md:col-span-6`}>
            <div className="grid gap-8 md:grid-cols-2 md:items-center">
              <div>
                <h2 className="text-sm font-medium text-indigo-600">
                  Creative tools
                </h2>

                <h3 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">
                  Tools behind the work.
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {skills.map((skill, index) => (
                  <div
                    key={skill}
                    className="rounded-2xl bg-slate-100 p-4"
                  >
                    <span className="text-xs text-slate-400">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <p className="mt-3 text-sm font-medium text-slate-900">
                      {skill}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* 9. PERSONAL AESTHETIC */}
        {personalAesthetic?.image && (
          <section className={`${tile} md:col-span-6`}>
            <div className="grid gap-8 md:grid-cols-2 md:items-center">
              <div>
                <h2 className="text-sm font-medium text-indigo-600">
                  Personal aesthetic
                </h2>

                <h3 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">
                  A visual language of my own.
                </h3>

                <p className="mt-4 max-w-md leading-relaxed text-slate-600">
                  A balance of simplicity, personality, structure,
                  and carefully chosen details.
                </p>
              </div>

              <Img
                src={personalAesthetic.image}
                alt="Personal aesthetic"
                className="aspect-[4/3] w-full rounded-2xl"
              />
            </div>
          </section>
        )}

        {/* 10. CONTACT & SOCIAL LINKS */}
        <section
          id="contact"
          className={`${tile} bg-indigo-600 text-white md:col-span-6`}
        >
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <div>
              <h2 className="text-sm font-medium text-indigo-200">
                Contact &amp; social links
              </h2>

              <h3 className="mt-2 text-4xl font-bold sm:text-5xl">
                Let's talk.
              </h3>

              <p className="mt-4 max-w-md text-indigo-100">
                Have an idea, project, or opportunity? Let's start
                a conversation.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              {email && (
                <a
                  href={`mailto:${email}`}
                  className="rounded-full bg-white px-5 py-3 text-sm font-medium text-indigo-600 transition hover:bg-indigo-50"
                >
                  {email}
                </a>
              )}

              <Socials
                portfolio={portfolio}
                className="rounded-full border border-white/40 px-5 py-3 text-sm transition hover:bg-white hover:text-indigo-600"
              />
            </div>
          </div>
        </section>

        {/* 11. THANK YOU / FOOTER */}
        <footer className={`${tile} md:col-span-6`}>
          <div className="text-center">
            <p className="text-sm font-medium text-indigo-600">
              Thank you
            </p>

            <h2 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">
              Thanks for stopping by.
            </h2>

            <p className="mt-3 text-sm text-slate-500">
              © {new Date().getFullYear()} {name}. All rights reserved.
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}

export default BentoLightTemplate;