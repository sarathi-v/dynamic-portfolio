import "./MinimalTemplate.css";

// Turns "React, Node.js, MongoDB" into ["React", "Node.js", "MongoDB"]
function toList(value) {
  if (Array.isArray(value)) return value.filter(Boolean);
  if (typeof value === "string") {
    return value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }
  return [];
}

function MinimalTemplate({ portfolio = {} }) {
  const {
    name = "",
    title = "",
    email = "",
    about = "",
    skills = "",
    github = "",
    linkedin = "",
    website = "",
    projects = [],
    resumeName = "",
    profileImage = null,
    themeColor = "#7657ff",
    darkMode = false,
  } = portfolio;

  const displayName = name || "Your Name";
  const displayTitle = title || "Your Professional Title";
  const initial = displayName.trim().charAt(0).toUpperCase() || "Y";

  const skillList = toList(skills);
  const projectList = Array.isArray(projects) ? projects : [];

  const socialLinks = [
    { label: "GitHub", url: github },
    { label: "LinkedIn", url: linkedin },
    { label: "Website", url: website },
  ].filter((link) => link.url);

  return (
    <div
      className={`mn-root ${darkMode ? "mn-dark" : "mn-light"}`}
      style={{ "--mn-accent": themeColor }}
    >
      <div className="mn-container">
        {/* HEADER */}
        <header className="mn-header">
          <div className="mn-header-text">
            <h1 className="mn-name">{displayName}</h1>
            <p className="mn-title">{displayTitle}</p>
          </div>

          {profileImage ? (
            <img className="mn-avatar" src={profileImage} alt={displayName} />
          ) : (
            <div className="mn-avatar mn-avatar-fallback">{initial}</div>
          )}
        </header>

        {/* ABOUT */}
        <section className="mn-section">
          <h2 className="mn-label">About</h2>
          <p className="mn-about">
            {about || "Your about information will appear here."}
          </p>
        </section>

        {/* SKILLS */}
        <section className="mn-section">
          <h2 className="mn-label">Skills</h2>
          {skillList.length > 0 ? (
            <p className="mn-skills">
              {skillList.map((skill, index) => (
                <span key={`${skill}-${index}`}>
                  {skill}
                  {index < skillList.length - 1 && (
                    <i className="mn-dot"> / </i>
                  )}
                </span>
              ))}
            </p>
          ) : (
            <p className="mn-about">Your skills will appear here.</p>
          )}
        </section>

        {/* PROJECTS */}
        <section className="mn-section">
          <h2 className="mn-label">Work</h2>
          <div className="mn-projects">
            {projectList.map((project, index) => (
              <article className="mn-project" key={index}>
                <span className="mn-project-number">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div className="mn-project-body">
                  <h3 className="mn-project-title">
                    {project.name || `Project ${index + 1}`}
                  </h3>
                  <p className="mn-project-text">
                    {project.description ||
                      "Project description will appear here."}
                  </p>
                  {project.link && (
                    <a
                      className="mn-project-link"
                      href={project.link}
                      target="_blank"
                      rel="noreferrer"
                    >
                      View project ↗
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* CONTACT */}
        {(email || socialLinks.length > 0 || resumeName) && (
          <section className="mn-section">
            <h2 className="mn-label">Contact</h2>

            {email && (
              <a className="mn-email" href={`mailto:${email}`}>
                {email}
              </a>
            )}

            {socialLinks.length > 0 && (
              <div className="mn-socials">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {link.label} ↗
                  </a>
                ))}
              </div>
            )}

            {resumeName && (
              <p className="mn-resume">
                Resume — <strong>{resumeName}</strong>
              </p>
            )}
          </section>
        )}

        <footer className="mn-footer">
          © {new Date().getFullYear()} {displayName}
        </footer>
      </div>
    </div>
  );
}

export default MinimalTemplate;