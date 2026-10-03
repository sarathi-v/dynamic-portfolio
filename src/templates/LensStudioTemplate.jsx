import { Img, Socials } from "./shared";

const serif = {
  fontFamily: "'Playfair Display', Georgia, serif",
};

const body = {
  fontFamily: "Inter, system-ui, sans-serif",
};

const tan = "bg-[#d9b48f] text-black hover:bg-[#e6c6a5]";

function LensStudioTemplate({ portfolio }) {
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

  const philosophyTexts = [
    designPhilosophy?.text1,
    designPhilosophy?.text2,
  ].filter(Boolean);

  return (
    <div
      style={body}
      className="min-h-screen overflow-x-hidden bg-[#f7f4ef] text-neutral-800"
    >
      {/* 1. HERO / PROFILE */}
      <section className="relative bg-black text-white">
        {profileImage && (
          <Img
            src={profileImage}
            alt={`Portrait of ${name}`}
            className="absolute inset-0 h-full w-full opacity-60 md:opacity-100"
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />

        <header className="relative mx-auto flex max-w-7xl items-center justify-between px-5 py-5 text-sm">
          <span style={serif} className="text-xl">
            {name}
          </span>

          {email && (
            <a
              href={`mailto:${email}`}
              className={`rounded px-5 py-2.5 font-medium transition ${tan}`}
            >
              Book a session
            </a>
          )}
        </header>

        <div className="relative mx-auto max-w-7xl px-5 pb-40 pt-20 md:pt-32">
          <p className="mb-4 text-sm text-[#d9b48f]">{role}</p>

          <h1
            style={serif}
            className="max-w-xl break-words text-5xl leading-[1.05] sm:text-7xl"
          >
            {name}
          </h1>

          {about && (
            <p className="mt-6 max-w-md leading-relaxed text-neutral-300">
              {about}
            </p>
          )}

          <div className="mt-8 flex flex-wrap gap-3 text-sm font-medium">
            {projects?.length > 0 && (
              <a
                href="#portfolio"
                className={`rounded px-6 py-3 transition ${tan}`}
              >
                View portfolio
              </a>
            )}

            <Socials
              portfolio={portfolio}
              className="rounded border border-white/40 px-6 py-3 transition hover:bg-white/10"
            />
          </div>
        </div>
      </section>

      {/* SKILLS STRIP */}
      {skills?.length > 0 && (
        <div className="relative z-10 mx-auto -mt-20 max-w-7xl px-5">
          <ul className="grid grid-cols-2 divide-white/10 rounded-lg bg-neutral-950 p-2 text-center text-sm text-white sm:grid-cols-3 lg:grid-cols-6 lg:divide-x">
            {skills.slice(0, 6).map((skill) => (
              <li key={skill} className="px-3 py-6">
                {skill}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* 2. ABOUT ME */}
      <section className="mx-auto max-w-7xl px-5 py-20">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <div>
            <p className="text-sm font-medium uppercase tracking-widest text-[#b58d69]">
              About me
            </p>

            <h2 style={serif} className="mt-3 text-4xl sm:text-5xl">
              The person behind the work.
            </h2>

            <p className="mt-6 max-w-xl leading-relaxed text-neutral-600">
              {about}
            </p>
          </div>

          {profileImage && (
            <div className="mx-auto w-full max-w-md">
              <Img
                src={profileImage}
                alt={`Portrait of ${name}`}
                className="aspect-[4/5] w-full rounded-xl"
              />
            </div>
          )}
        </div>
      </section>

      {/* 3. DESIGN PHILOSOPHY */}
      <section className="bg-neutral-950 text-white">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 md:grid-cols-2 md:items-center">
          <div>
            <p className="text-sm text-[#d9b48f]">
              Design philosophy
            </p>

            <div className="mt-6">
              {philosophyTexts.map((text, index) => (
                <p
                  key={`${text}-${index}`}
                  style={serif}
                  className="mb-5 text-3xl italic leading-tight sm:text-5xl"
                >
                  {text}
                </p>
              ))}
            </div>
          </div>

          {designPhilosophy?.image && (
            <Img
              src={designPhilosophy.image}
              alt="Design philosophy"
              className="aspect-[4/3] w-full rounded-xl"
            />
          )}
        </div>
      </section>

      {/* 4. CORE VALUES */}
      <section className="mx-auto max-w-7xl px-5 py-20">
        <div className="mb-10">
          <p className="text-sm font-medium uppercase tracking-widest text-[#b58d69]">
            Core values
          </p>

          <h2 style={serif} className="mt-3 text-4xl sm:text-5xl">
            What guides the work.
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {coreValues?.image1 && (
            <div>
              <Img
                src={coreValues.image1}
                alt="Core value one"
                className="aspect-[4/3] w-full rounded-xl"
              />

              <h3 style={serif} className="mt-5 text-2xl">
                Purpose
              </h3>

              <p className="mt-2 text-sm text-neutral-600">
                Meaningful work starts with a clear purpose.
              </p>
            </div>
          )}

          {coreValues?.image2 && (
            <div className="md:mt-12">
              <Img
                src={coreValues.image2}
                alt="Core value two"
                className="aspect-[4/3] w-full rounded-xl"
              />

              <h3 style={serif} className="mt-5 text-2xl">
                Authenticity
              </h3>

              <p className="mt-2 text-sm text-neutral-600">
                Every detail should feel intentional and genuine.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* 5. FROM THOUGHT TO FORM */}
      <section className="bg-[#d9b48f] text-black">
        <div className="mx-auto max-w-7xl px-5 py-20">
          <div className="grid gap-12 md:grid-cols-2">
            <div>
              <p className="text-sm uppercase tracking-widest">
                From thought to form
              </p>

              <h2 style={serif} className="mt-4 text-4xl sm:text-6xl">
                From idea
                <br />
                to experience.
              </h2>
            </div>

            <div className="grid gap-4">
              <div className="rounded-lg bg-black p-6 text-white">
                <span className="text-xs text-[#d9b48f]">01</span>

                <h3 style={serif} className="mt-3 text-2xl">
                  Discover
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-neutral-300">
                  Understand the story, purpose, and people behind
                  the idea.
                </p>
              </div>

              <div className="rounded-lg bg-white p-6">
                <span className="text-xs text-neutral-500">02</span>

                <h3 style={serif} className="mt-3 text-2xl">
                  Develop
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                  Shape the concept into a focused visual direction.
                </p>
              </div>

              <div className="rounded-lg bg-neutral-950 p-6 text-white">
                <span className="text-xs text-[#d9b48f]">03</span>

                <h3 style={serif} className="mt-3 text-2xl">
                  Deliver
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-neutral-300">
                  Turn the final concept into a polished experience.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FEATURED PROJECTS */}
      {projects?.length > 0 && (
        <section id="portfolio" className="mx-auto max-w-7xl px-5 py-20">
          <div className="mb-10">
            <p className="text-sm font-medium uppercase tracking-widest text-[#b58d69]">
              Featured projects
            </p>

            <h2 style={serif} className="mt-3 text-4xl sm:text-5xl">
              Moments we've captured
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {projects.slice(0, 3).map((project, index) => (
              <article
                key={index}
                className="group relative aspect-[3/4] overflow-hidden rounded-xl bg-neutral-900"
              >
                {project.image && (
                  <Img
                    src={project.image}
                    alt={project.title}
                    className="h-full w-full transition duration-700 group-hover:scale-105"
                  />
                )}

                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 to-transparent p-5 text-white">
                  <p className="text-xs uppercase tracking-widest text-[#d9b48f]">
                    Project {index + 1}
                  </p>

                  <h3 style={serif} className="mt-1 text-xl">
                    {project.title}
                  </h3>

                  <p className="mt-1 text-sm text-neutral-300">
                    {project.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* 7. CASE STUDY */}
      {caseStudy?.title && (
        <section className="bg-neutral-950 text-white">
          <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-20 md:grid-cols-2">
            <div>
              <p className="text-sm text-[#d9b48f]">
                Case study
              </p>

              <h2 style={serif} className="mt-2 text-4xl sm:text-5xl">
                {caseStudy.title}
              </h2>

              <div className="my-6 h-px w-16 bg-[#d9b48f]" />

              <p className="max-w-md leading-relaxed text-neutral-300">
                {caseStudy.description}
              </p>
            </div>

            {caseStudy.image && (
              <Img
                src={caseStudy.image}
                alt={caseStudy.title}
                className="aspect-video w-full rounded-lg"
              />
            )}
          </div>
        </section>
      )}

      {/* 8. CREATIVE TOOLS */}
      {skills?.length > 0 && (
        <section className="mx-auto max-w-7xl px-5 py-20">
          <div className="grid gap-10 md:grid-cols-2 md:items-center">
            <div>
              <p className="text-sm font-medium uppercase tracking-widest text-[#b58d69]">
                Creative tools
              </p>

              <h2 style={serif} className="mt-3 text-4xl sm:text-5xl">
                Tools behind the craft.
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-px overflow-hidden rounded-lg bg-neutral-300">
              {skills.map((skill, index) => (
                <div key={skill} className="bg-white p-6">
                  <span className="text-xs text-neutral-400">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <p className="mt-4 font-medium">
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
        <section className="bg-[#eee8df]">
          <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-20 md:grid-cols-2">
            <div>
              <p className="text-sm font-medium uppercase tracking-widest text-[#b58d69]">
                Personal aesthetic
              </p>

              <h2 style={serif} className="mt-3 text-4xl sm:text-5xl">
                A visual language
                <br />
                of my own.
              </h2>

              <p className="mt-6 max-w-md leading-relaxed text-neutral-600">
                A balance of atmosphere, simplicity, emotion, and
                carefully considered details.
              </p>
            </div>

            <Img
              src={personalAesthetic.image}
              alt="Personal aesthetic"
              className="aspect-[4/3] w-full rounded-xl"
            />
          </div>
        </section>
      )}

      {/* 10. CONTACT & SOCIAL LINKS */}
      <section className="bg-black text-white">
        <div className="mx-auto max-w-7xl px-5 py-20">
          <p className="text-sm text-[#d9b48f]">
            Contact &amp; social links
          </p>

          <h2 style={serif} className="mt-3 text-4xl sm:text-6xl">
            Tell me your story.
          </h2>

          <p className="mt-5 max-w-xl text-neutral-400">
            Have a project, idea, or story you'd like to bring to
            life? Let's talk.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-5">
            {email && (
              <a
                href={`mailto:${email}`}
                className={`rounded px-6 py-3 font-medium transition ${tan}`}
              >
                {email}
              </a>
            )}

            <Socials
              portfolio={portfolio}
              className="rounded border border-white/30 px-6 py-3 text-sm underline-offset-4 transition hover:bg-white/10"
            />
          </div>
        </div>
      </section>

      {/* 11. THANK YOU / FOOTER */}
      <footer className="bg-[#f7f4ef]">
        <div className="mx-auto max-w-7xl px-5 py-14 text-center">
          <p className="text-sm uppercase tracking-widest text-neutral-500">
            Thank you
          </p>

          <h2 style={serif} className="mt-3 text-4xl sm:text-5xl">
            Until the next story.
          </h2>

          <p className="mt-4 text-sm text-neutral-500">
            © {new Date().getFullYear()} {name}. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default LensStudioTemplate;