import "./ModernTemplate.css";

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

function ModernTemplate({ portfolio = {} }) {
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
      className={`mt-root ${darkMode ? "mt-dark" : "mt-light"}`}
      style={{ "--mt-accent": themeColor }}
    >
      {/* HERO */}
      <header className="mt-hero">
        <div className="mt-hero-text">
          <span className="mt-eyebrow">Hello, I'm</span>
          <h1 className="mt-name">{displayName}</h1>
          <h2 className="mt-title">{displayTitle}</h2>

          <div className="mt-hero-actions">
            {email && (
              <a className="mt-btn mt-btn-primary" href={`mailto:${email}`}>
                Contact Me
              </a>
            )}
            {website && (
              <a
                className="mt-btn mt-btn-outline"
                href={website}
                target="_blank"
                rel="noreferrer"
              >
                Visit Website
              </a>
            )}
          </div>
        </div>

        <div className="mt-avatar-wrap">
          {profileImage ? (
            <img className="mt-avatar" src={profileImage} alt={displayName} />
          ) : (
            <div className="mt-avatar mt-avatar-fallback">{initial}</div>
          )}
        </div>
      </header>

      {/* ABOUT */}
      <section className="mt-section">
        <h3 className="mt-section-title">About</h3>
        <p className="mt-about">
          {about || "Your about information will appear here."}
        </p>
      </section>

      {/* SKILLS */}
      <section className="mt-section">
        <h3 className="mt-section-title">Skills</h3>
        {skillList.length > 0 ? (
          <div className="mt-skills">
            {skillList.map((skill, index) => (
              <span className="mt-skill" key={`${skill}-${index}`}>
                {skill}
              </span>
            ))}
          </div>
        ) : (
          <p className="mt-about">Your skills will appear here.</p>
        )}
      </section>

      {/* PROJECTS */}
      <section className="mt-section">
        <h3 className="mt-section-title">Projects</h3>
        <div className="mt-projects">
          {projectList.map((project, index) => (
            <article className="mt-card" key={index}>
              <h4 className="mt-card-title">
                {project.name || `Project ${index + 1}`}
              </h4>
              <p className="mt-card-text">
                {project.description || "Project description will appear here."}
              </p>
              {project.link && (
                <a
                  className="mt-card-link"
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                >
                  View Project →
                </a>
              )}
            </article>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      {(email || socialLinks.length > 0 || resumeName) && (
        <section className="mt-section mt-contact">
          <h3 className="mt-section-title">Get In Touch</h3>

          {email && (
            <div className="mt-contact-list">
              <a href={`mailto:${email}`}>✉️ {email}</a>
            </div>
          )}

          {socialLinks.length > 0 && (
            <div className="mt-socials">
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
            <p className="mt-about">
              📄 Resume: <strong>{resumeName}</strong>
            </p>
          )}
        </section>
      )}

      <footer className="mt-footer">
        © {new Date().getFullYear()} {displayName}. Built with Portfolio AI.
      </footer>
    </div>
  );
}

export default ModernTemplate;