import { useState } from "react";
import "./CreativeTemplate.css";

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

// First word solid, last word italic serif, words in between outlined
function getWordClass(index, total) {
  if (total === 1 || index === total - 1) return "ct-w-accent";
  if (index === 0) return "ct-w-solid";
  return "ct-w-outline";
}

function CreativeTemplate({ portfolio = {} }) {
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

  const initials = words
    .slice(0, 2)
    .map((word) => word.charAt(0).toUpperCase())
    .join("");

  const skillList = toList(skills);
  const projectList = Array.isArray(projects) ? projects : [];

  // An even number of copies keeps the marquee loop seamless
  const tickerItems = Array.from({ length: 6 }, () => displayTitle);

  const socialLinks = [
    { label: "GitHub", url: github },
    { label: "LinkedIn", url: linkedin },
    { label: "Website", url: website },
  ].filter((link) => link.url);

  return (
    <div
      className={`ct-root ${darkMode ? "ct-dark" : "ct-light"}`}
      style={{ "--ct-accent": themeColor }}
    >
      {/* BACKGROUND */}
      <div className="ct-backdrop" aria-hidden="true">
        <span className="ct-blob ct-blob-one"></span>
        <span className="ct-blob ct-blob-two"></span>
        <span className="ct-blob ct-blob-three"></span>
      </div>

      <div className="ct-wrap">
        {/* NAV */}
        <nav className="ct-nav">
          <span className="ct-logo">{initials || "Y"}</span>
          <span className="ct-nav-tag">Portfolio ✦ {new Date().getFullYear()}</span>
        </nav>

        {/* HERO */}
        <header className="ct-hero">
          <div className="ct-hero-text">
            <span className="ct-sticker">✦ {displayTitle}</span>

            <h1 className="ct-name">
              {words.map((word, index) => (
                <span
                  key={`${word}-${index}`}
                  className={`ct-word ${getWordClass(index, words.length)}`}
                >
                  {word}
                </span>
              ))}
            </h1>

            <p className="ct-lead">
              {about
                ? about.length > 170
                  ? `${about.slice(0, 170).trim()}…`
                  : about
                : "Your introduction will appear here once you write your about section."}
            </p>

            <div className="ct-actions">
              {email && (
                <a className="ct-btn ct-btn-solid" href={`mailto:${email}`}>
                  Say hello <span>→</span>
                </a>
              )}
              {website && (
                <a
                  className="ct-btn ct-btn-ghost"
                  href={website}
                  target="_blank"
                  rel="noreferrer"
                >
                  My website <span>↗</span>
                </a>
              )}
            </div>
          </div>

          <div className="ct-avatar-wrap">
            <div className="ct-avatar-shape">
              {showImage ? (
                <img
                  src={profileImage}
                  alt={displayName}
                  onError={() => setFailedImage(profileImage)}
                />
              ) : (
                <div className="ct-avatar-fallback">{initials || "Y"}</div>
              )}
            </div>

            <div className="ct-badge" aria-hidden="true">
              <svg viewBox="0 0 140 140">
                <defs>
                  <path
                    id="ct-badge-path"
                    d="M70,70 m-56,0 a56,56 0 1,1 112,0 a56,56 0 1,1 -112,0"
                  />
                </defs>
                <text>
                  <textPath href="#ct-badge-path">
                    HELLO THERE • WELCOME TO MY PORTFOLIO •{" "}
                  </textPath>
                </text>
              </svg>
              <span className="ct-badge-core">✦</span>
            </div>
          </div>
        </header>
      </div>

      {/* TILTED MARQUEE */}
      <div className="ct-band" aria-hidden="true">
        <div className="ct-band-track">
          {tickerItems.map((item, index) => (
            <span key={index}>
              {item}
              <b>✦</b>
            </span>
          ))}
        </div>
      </div>

      <div className="ct-wrap">
        {/* ABOUT */}
        <section className="ct-section">
          <h2 className="ct-heading">
            <span className="ct-heading-num">01</span> About me
          </h2>
          <p className="ct-about">
            {about || "Your about information will appear here."}
          </p>
        </section>

        {/* SKILLS */}
        <section className="ct-section">
          <h2 className="ct-heading">
            <span className="ct-heading-num">02</span> Skills
          </h2>

          {skillList.length > 0 ? (
            <div className="ct-skills">
              {skillList.map((skill, index) => (
                <span className="ct-skill" key={`${skill}-${index}`}>
                  {skill}
                </span>
              ))}
            </div>
          ) : (
            <p className="ct-muted">Your skills will appear here.</p>
          )}
        </section>

        {/* PROJECTS */}
        <section className="ct-section">
          <h2 className="ct-heading">
            <span className="ct-heading-num">03</span> Selected <em>work</em>
          </h2>

          <div className="ct-projects">
            {projectList.map((project, index) => (
              <article className="ct-card" key={index}>
                <span className="ct-card-number">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <h3 className="ct-card-title">
                  {project.name || `Project ${index + 1}`}
                </h3>

                <p className="ct-card-text">
                  {project.description ||
                    "Project description will appear here."}
                </p>

                {project.link && (
                  <a
                    className="ct-card-link"
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
          <section className="ct-contact">
            <span className="ct-contact-eyebrow">04 — Contact</span>

            <h2 className="ct-contact-title">
              Let's make <em>something</em> wild.
            </h2>

            {email && (
              <a className="ct-contact-email" href={`mailto:${email}`}>
                {email}
              </a>
            )}

            {socialLinks.length > 0 && (
              <div className="ct-socials">
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
              <p className="ct-resume">
                Resume · <strong>{resumeName}</strong>
              </p>
            )}
          </section>
        )}

        <footer className="ct-footer">
          <span>
            © {new Date().getFullYear()} {displayName}
          </span>
          <span>Built with Portfolio AI</span>
        </footer>
      </div>
    </div>
  );
}

export default CreativeTemplate;