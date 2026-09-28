function ModernTemplate({ portfolio }) {
  return (
    <div className="min-h-screen p-10">

      <img
  src={portfolio.profileImage}
  alt={portfolio.name}
  className="mb-4 h-24 w-24 rounded-full object-cover"
/>


      <h1 className="text-4xl font-bold">
        {portfolio.name}
      </h1>

      <h2 className="mt-2 text-xl">
        {portfolio.role}
      </h2>

      <p className="mt-6">
        {portfolio.about}
      </p>

      <h3 className="mt-8 text-2xl font-bold">
        Skills
      </h3>

      <div className="mt-3 flex gap-3">
        {portfolio.skills.map((skill) => (
          <span
            key={skill}
            className="rounded bg-gray-200 px-3 py-1"
          >
            {skill}
          </span>
        ))}
      </div>

      <h3 className="mt-10 text-2xl font-bold">
  Projects
</h3>

<div className="mt-4 grid gap-6 md:grid-cols-2">
  {portfolio.projects.map((project) => (
    <div
      key={project.title}
      className="rounded-xl border p-6 shadow-sm"
    >
      <h4 className="text-xl font-semibold">
        {project.title}
      </h4>

      <p className="mt-2 text-gray-600">
        {project.description}
      </p>
    </div>
  ))}
</div>

<section className="mt-12">
  <h3 className="text-2xl font-bold">
    Contact
  </h3>

  <p className="mt-3">
    Interested in working together? Let's connect!
  </p>

  <a
    href="mailto:example@email.com"
    className="mt-4 inline-block rounded-lg border px-5 py-2"
  >
    Contact Me
  </a>

  <div className="mt-4 flex gap-4">
    <a
      href={portfolio.socialLinks.github}
      target="_blank"
      rel="noreferrer"
      className="underline"
    >
      GitHub
    </a>

    <a
      href={portfolio.socialLinks.linkedin}
      target="_blank"
      rel="noreferrer"
      className="underline"
    >
      LinkedIn
    </a>
  </div>
</section>

    </div>
  );
}

export default ModernTemplate;