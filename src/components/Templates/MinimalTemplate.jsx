import { useState } from "react";
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

  // Remembers which image URL failed, so a dead link shows the initials instead
  const [failedImage, setFailedImage] = useState(null);
  const showImage = profileImage && failedImage !== profileImage;

  const displayName = name.trim() || "Your Name";
  const displayTitle = title.trim() || "Your Professional Title";

  const words = displayName.split(/\s+/);
  const lastWord = words.length > 1 ? words.pop() : null;
  const firstWords = words.join(" ");

  const initials = displayName
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word.charAt(0).toUpperCase())
    .join("");

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
        {/* TOP BAR */}
        <div className="mn-topbar">
          <span>Portfolio — {new Date().getFullYear()}</span>
          {email && (
            <a href={`mailto:${email}`} className="mn-topbar-link">
              {email}
            </a>
          )}
        </div>

        {/* HERO */}
        <header className="mn-hero">
          <span className="mn-eyebrow">{displayTitle}</span>

          <h1 className="mn-name">
            {firstWords}
            {firstWords && lastWord ? " " : ""}
            {lastWord ? <em>{lastWord}</em> : null}
          </h1>

          <div className="mn-intro">
            {showImage ? (
              <img
                className="mn-avatar"
                src={profileImage}
                alt={displayName}
                onError={() => setFailedImage(profileImage)}
              />
            ) : (
              <div className="mn-avatar mn-avatar-fallback">
                {initials || "Y"}
              </div>
            )}

            <p className="mn-lead">
              {about
                ? about.length > 190
                  ? `${about.slice(0, 190).trim()}…`
                  : about
                : "Your introduction will appear here once you write your about section."}
            </p>
          </div>
        </header>

        {/* ABOUT */}
        <section className="mn-section">
          <h2 className="mn-label">
            <span>01</span> About
          </h2>
          <p className="mn-about">
            {about || "Your about information will appear here."}
          </p>
        </section>

        {/* SKILLS */}
        <section className="mn-section">
          <h2 className="mn-label">
            <span>02</span> Skills
          </h2>

          {skillList.length > 0 ? (
            <p className="mn-skills">
              {skillList.map((skill, index) => (
                <span key={`${skill}-${index}`}>
                  <b>{skill}</b>
                  {index < skillList.length - 1 && (
                    <i className="mn-sep"> / </i>
                  )}
                </span>
              ))}
            </p>
          ) : (
            <p className="mn-muted">Your skills will appear here.</p>
          )}
        </section>

        {/* PROJECTS */}
        <section className="mn-section">
          <h2 className="mn-label">
            <span>03</span> Selected work
          </h2>

          <div className="mn-projects">
            {projectList.map((project, index) => {
              const content = (
                <>
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
                  </div>

                  <span className="mn-project-arrow">
                    {project.link ? "↗" : ""}
                  </span>
                </>
              );

              return project.link ? (
                <a
                  className="mn-project mn-project-linked"
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  key={index}
                >
                  {content}
                </a>
              ) : (
                <article className="mn-project" key={index}>
                  {content}
                </article>
              );
            })}
          </div>
        </section>

        {/* CONTACT */}
        {(email || socialLinks.length > 0 || resumeName) && (
          <section className="mn-contact">
            <h2 className="mn-label">
              <span>04</span> Contact
            </h2>

            <p className="mn-contact-title">
              Let's <em>talk</em>.
            </p>

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
                    {link.label} <span>↗</span>
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
          <span>
            © {new Date().getFullYear()} {displayName}
          </span>
          <span>Built with Portfolio AI</span>
        </footer>
      </div>
    </div>
  );
}

export default MinimalTemplate;