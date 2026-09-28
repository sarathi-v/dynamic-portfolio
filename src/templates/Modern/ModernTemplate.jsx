function ModernTemplate({ portfolio }) {
  return (
    <div className="min-h-screen p-10">
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

      <h3 className="mt-8 text-2xl font-bold">
        Projects
      </h3>

      {portfolio.projects.map((project) => (
        <div key={project.title} className="mt-4">
          <h4 className="text-xl font-semibold">
            {project.title}
          </h4>

          <p>{project.description}</p>
        </div>
      ))}
    </div>
  );
}

export default ModernTemplate;