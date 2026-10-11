import { useState } from "react";
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

  // Remembers which image URL failed, so a dead link shows the avatar instead
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
  const filledProjects = projectList.filter(
    (project) => project.name || project.description
  );

  // Repeat the skills so the marquee always fills the width
  const marqueeItems =
    skillList.length > 0
      ? Array.from({ length: skillList.length < 6 ? 4 : 2 }).flatMap(
          () => skillList
        )
      : [];

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
      <div className="mt-backdrop" aria-hidden="true"></div>

      <div className="mt-wrap">
        {/* NAV */}
        <nav className="mt-nav">
          <div className="mt-logo">
            <span className="mt-logo-mark">{initials || "Y"}</span>
            <span className="mt-logo-name">{displayName}</span>
          </div>

          <span className="mt-status">
            <i></i> Available for opportunities
          </span>
        </nav>

        {/* HERO */}
        <header className="mt-hero">
          <div className="mt-hero-text">
            <span className="mt-eyebrow">{displayTitle}</span>

            <h1 className="mt-name">
              {firstWords}
              {firstWords && lastWord ? " " : ""}
              {lastWord ? <em>{lastWord}</em> : null}
            </h1>

            <p className="mt-lead">
              {about
                ? about.length > 170
                  ? `${about.slice(0, 170).trim()}…`
                  : about
                : "Your introduction will appear here once you write your about section."}
            </p>

            <div className="mt-actions">
              {email && (
                <a className="mt-btn mt-btn-primary" href={`mailto:${email}`}>
                  Get in touch <span>→</span>
                </a>
              )}
              {website && (
                <a
                  className="mt-btn mt-btn-ghost"
                  href={website}
                  target="_blank"
                  rel="noreferrer"
                >
                  Visit website <span>↗</span>
                </a>
              )}
            </div>

            {(filledProjects.length > 0 || skillList.length > 0) && (
              <div className="mt-stats">
                {filledProjects.length > 0 && (
                  <div className="mt-stat">
                    <strong>{String(filledProjects.length).padStart(2, "0")}</strong>
                    <span>Projects</span>
                  </div>
                )}
                {skillList.length > 0 && (
                  <div className="mt-stat">
                    <strong>{String(skillList.length).padStart(2, "0")}</strong>
                    <span>Skills</span>
                  </div>
                )}
                {resumeName && (
                  <div className="mt-stat">
                    <strong>CV</strong>
                    <span>Available</span>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="mt-avatar-wrap">
            <div className="mt-avatar-ring">
              {showImage ? (
                <img
                  className="mt-avatar"
                  src={profileImage}
                  alt={displayName}
                  onError={() => setFailedImage(profileImage)}
                />
              ) : (
                <div className="mt-avatar mt-avatar-fallback">
                  {initials || "Y"}
                </div>
              )}
            </div>
          </div>
        </header>
      </div>

      {/* SKILLS MARQUEE */}
      {marqueeItems.length > 0 && (
        <div className="mt-marquee" aria-hidden="true">
          <div className="mt-marquee-track">
            {marqueeItems.map((skill, index) => (
              <span key={`${skill}-${index}`}>
                {skill}
                <b>✦</b>
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="mt-wrap">
        {/* ABOUT */}
        <section className="mt-section">
          <h2 className="mt-label">
            <span>01</span> About
          </h2>
          <p className="mt-about">
            {about || "Your about information will appear here."}
          </p>
        </section>

        {/* SKILLS */}
        <section className="mt-section">
          <h2 className="mt-label">
            <span>02</span> Skills
          </h2>
          {skillList.length > 0 ? (
            <div className="mt-skills">
              {skillList.map((skill, index) => (
                <span className="mt-skill" key={`${skill}-${index}`}>
                  {skill}
                </span>
              ))}
            </div>
          ) : (
            <p className="mt-muted">Your skills will appear here.</p>
          )}
        </section>

        {/* PROJECTS */}
        <section className="mt-section mt-section-stack">
          <h2 className="mt-label">
            <span>03</span> Selected work
          </h2>

          <div className="mt-projects">
            {projectList.map((project, index) => (
              <article className="mt-card" key={index}>
                <span className="mt-card-number">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <h3 className="mt-card-title">
                  {project.name || `Project ${index + 1}`}
                </h3>

                <p className="mt-card-text">
                  {project.description ||
                    "Project description will appear here."}
                </p>

                {project.link && (
                  <a
                    className="mt-card-link"
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                  >
                    View project <span>↗</span>
                  </a>
                )}
              </article>
            ))}
          </div>
        </section>

        {/* CONTACT */}
        {(email || socialLinks.length > 0 || resumeName) && (
          <section className="mt-cta">
            <span className="mt-eyebrow">04 — Contact</span>

            <h2 className="mt-cta-title">
              Let's build something <em>great</em> together.
            </h2>

            {email && (
              <a className="mt-btn mt-btn-primary mt-cta-email" href={`mailto:${email}`}>
                {email} <span>→</span>
              </a>
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
                    {link.label} <span>↗</span>
                  </a>
                ))}
              </div>
            )}

            {resumeName && (
              <p className="mt-resume">
                Resume · <strong>{resumeName}</strong>
              </p>
            )}
          </section>
        )}

        <footer className="mt-footer">
          <span>
            © {new Date().getFullYear()} {displayName}
          </span>
          <span>Built with Portfolio AI</span>
        </footer>
      </div>
    </div>
  );
}

export default ModernTemplate;