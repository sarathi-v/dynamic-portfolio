import { Img, Links, philosophy } from "./sharedColorful";

const tints = ["bg-[#ff6b4a]", "bg-[#ffc857]", "bg-[#8e5ea2]"];

function SunsetCoralTemplate({ portfolio: p }) {
  return (
    <div
      style={{ fontFamily: "Poppins, system-ui, sans-serif" }}
      className="min-h-screen overflow-x-hidden bg-[#fff4ec] text-[#3b1d4a]"
    >
      {/* Header */}
      <header className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5">
        <span className="font-semibold">{p.name}</span>

        <nav className="flex gap-5 text-sm font-medium">
          <a href="#about" className="hover:text-[#ff6b4a]">
            About
          </a>
          <a href="#work" className="hover:text-[#ff6b4a]">
            Work
          </a>
          <a href="#contact" className="hover:text-[#ff6b4a]">
            Contact
          </a>
        </nav>
      </header>

      <main>
        {/* 1. HERO / PROFILE */}
        <section className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-10 md:grid-cols-2 md:py-20">
          <div>
            <span className="inline-block rounded-full bg-[#ffc857] px-4 py-1 text-sm font-medium">
              {p.role}
            </span>

            <h1 className="mt-5 break-words text-5xl font-extrabold leading-none sm:text-7xl">
              {p.name}
            </h1>

            <p className="mt-6 max-w-md text-lg leading-relaxed text-[#3b1d4a]/80">
              {p.about}
            </p>

            <div className="mt-8 flex flex-wrap gap-3 text-sm font-semibold">
              <a
                href="#work"
                className="rounded-full bg-[#ff6b4a] px-6 py-3 text-white transition hover:bg-[#e8553a]"
              >
                See my work
              </a>

              <a
                href="#contact"
                className="rounded-full border-2 border-[#3b1d4a] px-6 py-3 transition hover:bg-[#3b1d4a] hover:text-white"
              >
                Say hello
              </a>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-sm">
            <div
              className="absolute -right-4 -top-4 h-32 w-32 rounded-full bg-[#ffc857]"
              aria-hidden="true"
            />

            <Img
              src={p.profileImage}
              alt={`Portrait of ${p.name}`}
              className="relative aspect-[3/4] w-full rounded-t-full"
            />
          </div>
        </section>

        {/* Skills Strip */}
        {p.skills?.length > 0 && (
          <div className="bg-[#3b1d4a] py-4 text-[#fff4ec]">
            <ul className="mx-auto flex max-w-6xl flex-wrap justify-center gap-x-8 gap-y-1 px-5 text-sm font-medium">
              {p.skills.map((skill) => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          </div>
        )}

        {/* 2. ABOUT ME */}
        <section
          id="about"
          className="mx-auto max-w-6xl px-5 py-20"
        >
          <div className="grid gap-10 md:grid-cols-2 md:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-[#ff6b4a]">
                About me
              </p>

              <h2 className="mt-3 text-4xl font-extrabold sm:text-5xl">
                A little bit about who I am
              </h2>
            </div>

            <div>
              <p className="text-lg leading-relaxed text-[#3b1d4a]/80">
                {p.about}
              </p>
            </div>
          </div>
        </section>

        {/* 3. DESIGN PHILOSOPHY */}
        <section className="bg-[#ffc857]">
          <div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 md:grid-cols-2 md:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest">
                Design philosophy
              </p>

              <div className="mt-6 space-y-4 text-3xl font-extrabold leading-tight sm:text-5xl">
                {philosophy(p).map((text) => (
                  <p key={text}>{text}</p>
                ))}
              </div>
            </div>

            <Img
              src={p.designPhilosophy?.image}
              alt="Design philosophy"
              className="aspect-[4/3] w-full rounded-3xl"
            />
          </div>
        </section>

        {/* 4. CORE VALUES */}
        <section className="mx-auto max-w-6xl px-5 py-20">
          <div className="mb-10">
            <p className="text-sm font-semibold uppercase tracking-widest text-[#ff6b4a]">
              Core values
            </p>

            <h2 className="mt-3 text-4xl font-extrabold sm:text-5xl">
              What guides my work
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl bg-[#ff6b4a] p-6">
              <Img
                src={p.coreValues?.image1}
                alt="Core value one"
                className="aspect-[4/3] w-full rounded-2xl"
              />

              <h3 className="mt-5 text-2xl font-bold text-white">
                Value &amp; Purpose
              </h3>
            </div>

            <div className="rounded-3xl bg-[#8e5ea2] p-6 text-white md:mt-10">
              <Img
                src={p.coreValues?.image2}
                alt="Core value two"
                className="aspect-[4/3] w-full rounded-2xl"
              />

              <h3 className="mt-5 text-2xl font-bold">
                Creativity &amp; Clarity
              </h3>
            </div>
          </div>
        </section>

        {/* 5. FROM THOUGHT TO FORM */}
        <section className="bg-[#3b1d4a] text-[#fff4ec]">
          <div className="mx-auto max-w-6xl px-5 py-20">
            <div className="grid gap-10 md:grid-cols-[1fr_1.5fr] md:items-center">
              <div>
                <p className="text-sm font-semibold uppercase tracking-widest text-[#ffc857]">
                  From thought to form
                </p>

                <h2 className="mt-4 text-4xl font-extrabold leading-tight sm:text-5xl">
                  Turning ideas into meaningful digital experiences.
                </h2>
              </div>

              <div className="grid gap-5 sm:grid-cols-3">
                <div className="rounded-3xl bg-[#ff6b4a] p-6">
                  <span className="text-3xl font-extrabold">01</span>
                  <h3 className="mt-8 font-bold">Think</h3>
                  <p className="mt-2 text-sm opacity-90">
                    Understand the idea, purpose, and people behind it.
                  </p>
                </div>

                <div className="rounded-3xl bg-[#ffc857] p-6 text-[#3b1d4a]">
                  <span className="text-3xl font-extrabold">02</span>
                  <h3 className="mt-8 font-bold">Shape</h3>
                  <p className="mt-2 text-sm opacity-80">
                    Transform concepts into clear visual directions.
                  </p>
                </div>

                <div className="rounded-3xl bg-[#8e5ea2] p-6">
                  <span className="text-3xl font-extrabold">03</span>
                  <h3 className="mt-8 font-bold">Create</h3>
                  <p className="mt-2 text-sm opacity-90">
                    Build polished experiences with purpose and detail.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 6. FEATURED PROJECTS */}
        {p.projects?.length > 0 && (
          <section id="work" className="mx-auto max-w-6xl px-5 py-20">
            <div className="mb-10">
              <p className="text-sm font-semibold uppercase tracking-widest text-[#ff6b4a]">
                Featured projects
              </p>

              <h2 className="mt-3 text-4xl font-extrabold sm:text-5xl">
                Selected projects
              </h2>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {p.projects.slice(0, 3).map((project, index) => (
                <article
                  key={index}
                  className={`group overflow-hidden rounded-3xl ${
                    tints[index % 3]
                  } ${
                    index % 3 === 2
                      ? "text-white"
                      : "text-[#3b1d4a]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <Img
                      src={project.image}
                      alt={project.title}
                      className="aspect-[4/3] w-full transition duration-500 group-hover:scale-105"
                    />
                  </div>

                  <div className="p-5">
                    <p className="text-xs font-bold uppercase tracking-widest opacity-70">
                      Project {index + 1}
                    </p>

                    <h3 className="mt-2 text-xl font-bold">
                      {project.title}
                    </h3>

                    <p className="mt-2 text-sm opacity-90">
                      {project.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* 7. CASE STUDY */}
        {p.caseStudy?.title && (
          <section className="bg-[#ff6b4a] text-white">
            <div className="mx-auto grid max-w-6xl items-center gap-8 px-5 py-20 md:grid-cols-2">
              <Img
                src={p.caseStudy.image}
                alt={p.caseStudy.title}
                className="aspect-[4/3] w-full rounded-3xl"
              />

              <div>
                <p className="text-sm font-semibold uppercase tracking-widest">
                  Case study
                </p>

                <h2 className="mt-3 text-4xl font-extrabold sm:text-5xl">
                  {p.caseStudy.title}
                </h2>

                <p className="mt-5 max-w-md leading-relaxed">
                  {p.caseStudy.description}
                </p>
              </div>
            </div>
          </section>
        )}

        {/* 8. CREATIVE TOOLS */}
        {p.skills?.length > 0 && (
          <section className="mx-auto max-w-6xl px-5 py-20">
            <div className="grid gap-10 md:grid-cols-2 md:items-center">
              <div>
                <p className="text-sm font-semibold uppercase tracking-widest text-[#ff6b4a]">
                  Creative tools
                </p>

                <h2 className="mt-3 text-4xl font-extrabold sm:text-5xl">
                  Tools I use to bring ideas to life.
                </h2>
              </div>

              <div className="flex flex-wrap gap-3">
                {p.skills.map((skill, index) => (
                  <span
                    key={skill}
                    className={`rounded-full px-5 py-3 text-sm font-semibold ${
                      tints[index % 3]
                    } ${
                      index % 3 === 2
                        ? "text-white"
                        : "text-[#3b1d4a]"
                    }`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* 9. PERSONAL AESTHETIC */}
        {p.personalAesthetic?.image && (
          <section className="bg-[#8e5ea2] text-white">
            <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-20 md:grid-cols-2">
              <div>
                <p className="text-sm font-semibold uppercase tracking-widest text-[#ffc857]">
                  Personal aesthetic
                </p>

                <h2 className="mt-3 text-4xl font-extrabold sm:text-5xl">
                  A visual language that feels uniquely mine.
                </h2>

                <p className="mt-5 max-w-md leading-relaxed text-white/85">
                  I believe good design should feel intentional,
                  expressive, and memorable.
                </p>
              </div>

              <Img
                src={p.personalAesthetic.image}
                alt="Personal aesthetic"
                className="aspect-[4/3] w-full rounded-3xl"
              />
            </div>
          </section>
        )}

        {/* 10. CONTACT & SOCIAL LINKS */}
        <section
          id="contact"
          className="bg-[#3b1d4a] text-[#fff4ec]"
        >
          <div className="mx-auto max-w-6xl px-5 py-20">
            <p className="text-sm font-semibold uppercase tracking-widest text-[#ffc857]">
              Contact &amp; social links
            </p>

            <h2 className="mt-3 text-4xl font-extrabold sm:text-6xl">
              Let's work together
            </h2>

            <p className="mt-5 max-w-xl text-lg text-white/75">
              Have an idea, project, or opportunity? Let's start a
              conversation.
            </p>

            <div className="mt-8 flex flex-wrap gap-3 text-sm font-semibold">
              <Links
                portfolio={p}
                className="rounded-full bg-[#ffc857] px-5 py-3 text-[#3b1d4a] transition hover:bg-white"
              />
            </div>
          </div>
        </section>

        {/* 11. THANK YOU */}
        <section className="bg-[#fff4ec]">
          <div className="mx-auto max-w-6xl px-5 py-16 text-center">
            <div className="mx-auto mb-5 h-4 w-4 rounded-full bg-[#ff6b4a]" />

            <h2 className="text-3xl font-extrabold sm:text-4xl">
              Thank you for visiting.
            </h2>

            <p className="mx-auto mt-3 max-w-lg text-[#3b1d4a]/70">
              Thanks for taking the time to explore my portfolio and
              creative work.
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#3b1d4a]/10 bg-[#fff4ec]">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-6 text-sm sm:flex-row sm:items-center sm:justify-between">
          <span className="font-semibold">{p.name}</span>
          <span className="text-[#3b1d4a]/60">
            © {new Date().getFullYear()} All rights reserved.
          </span>
        </div>
      </footer>
    </div>
  );
}

export default SunsetCoralTemplate;