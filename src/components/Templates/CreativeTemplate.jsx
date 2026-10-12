import { useRef, useState } from "react";
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

/* ---------- Mouse interaction helpers ----------
   They use ratios (0 to 1) instead of pixels, so they also work
   when the template is scaled down inside the live preview. */

function handleTilt(event) {
  const el = event.currentTarget;
  const rect = el.getBoundingClientRect();
  const x = (event.clientX - rect.left) / rect.width;
  const y = (event.clientY - rect.top) / rect.height;

  el.style.setProperty("--mx", `${x * 100}%`);
  el.style.setProperty("--my", `${y * 100}%`);
  el.style.setProperty("--rx", `${(0.5 - y) * 9}deg`);
  el.style.setProperty("--ry", `${(x - 0.5) * 11}deg`);
}

function resetTilt(event) {
  const el = event.currentTarget;
  el.style.removeProperty("--rx");
  el.style.removeProperty("--ry");
  el.style.removeProperty("--mx");
  el.style.removeProperty("--my");
}

function handleMagnet(event) {
  const el = event.currentTarget;
  const rect = el.getBoundingClientRect();
  const x = (event.clientX - rect.left) / rect.width - 0.5;
  const y = (event.clientY - rect.top) / rect.height - 0.5;

  el.style.setProperty("--tx", `${x * 16}px`);
  el.style.setProperty("--ty", `${y * 12}px`);
}

function resetMagnet(event) {
  const el = event.currentTarget;
  el.style.removeProperty("--tx");
  el.style.removeProperty("--ty");
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

  // The glow that follows the cursor
  const glowRef = useRef(null);

  function handleRootMove(event) {
    const glow = glowRef.current;
    if (!glow) return;

    const rect = event.currentTarget.getBoundingClientRect();
    glow.style.left = `${((event.clientX - rect.left) / rect.width) * 100}%`;
    glow.style.top = `${((event.clientY - rect.top) / rect.height) * 100}%`;
    glow.style.opacity = "1";
  }

  function handleRootLeave() {
    if (glowRef.current) {
      glowRef.current.style.opacity = "0";
    }
  }

  // Remembers which image URL failed, so a dead link shows the initials instead
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
  const filledProjects = projectList.filter(
    (project) => project.name || project.description
  );

  // An even number of copies keeps each marquee loop seamless
  const titleTicker = Array.from({ length: 6 }, () => displayTitle);
  const skillTicker =
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
      className={`ct-root ${darkMode ? "ct-dark" : "ct-light"}`}
      style={{ "--ct-accent": themeColor }}
      onMouseMove={handleRootMove}
      onMouseLeave={handleRootLeave}
    >
      {/* ANIMATED MESH BACKGROUND */}
      <div className="ct-backdrop" aria-hidden="true">
        <span className="ct-blob ct-blob-1"></span>
        <span className="ct-blob ct-blob-2"></span>
        <span className="ct-blob ct-blob-3"></span>
        <span className="ct-blob ct-blob-4"></span>
        <span className="ct-cursor-glow" ref={glowRef}></span>
        <span className="ct-grain"></span>
      </div>

      <div className="ct-wrap">
        {/* NAV */}
        <nav className="ct-nav ct-glass">
          <span className="ct-logo">
            <b>{initials || "Y"}</b>
            <span>{displayName}</span>
          </span>

          <span className="ct-nav-meta">
            <i></i> Available for new projects
          </span>
        </nav>

        {/* HERO */}
        <header className="ct-hero">
          <div className="ct-hero-text">
            <h1 className="ct-name">
              {words.map((word, index) => (
                <span
                  key={`${word}-${index}`}
                  className={`ct-word ct-grad ${
                    words.length > 1 && index === words.length - 1
                      ? "ct-word-serif"
                      : ""
                  }`}
                >
                  {word}
                </span>
              ))}
            </h1>

            <p className="ct-lead">
              {about
                ? about.length > 180
                  ? `${about.slice(0, 180).trim()}…`
                  : about
                : "Your introduction will appear here once you write your about section."}
            </p>

            <div className="ct-actions">
              {email && (
                <a
                  className="ct-btn ct-btn-solid"
                  href={`mailto:${email}`}
                  onMouseMove={handleMagnet}
                  onMouseLeave={resetMagnet}
                >
                  Get in touch <span>→</span>
                </a>
              )}
              {website && (
                <a
                  className="ct-btn ct-btn-glass ct-glass"
                  href={website}
                  target="_blank"
                  rel="noreferrer"
                >
                  Visit website <span>↗</span>
                </a>
              )}
            </div>

            {(filledProjects.length > 0 || skillList.length > 0 || resumeName) && (
              <div className="ct-stats">
                {filledProjects.length > 0 && (
                  <div className="ct-stat ct-glass">
                    <strong>{String(filledProjects.length).padStart(2, "0")}</strong>
                    <span>Projects</span>
                  </div>
                )}
                {skillList.length > 0 && (
                  <div className="ct-stat ct-glass">
                    <strong>{String(skillList.length).padStart(2, "0")}</strong>
                    <span>Skills</span>
                  </div>
                )}
                {resumeName && (
                  <div className="ct-stat ct-glass">
                    <strong>CV</strong>
                    <span>Available</span>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="ct-portrait-wrap">
            <div
              className="ct-portrait-ring"
              onMouseMove={handleTilt}
              onMouseLeave={resetTilt}
            >
              {showImage ? (
                <img
                  className="ct-portrait"
                  src={profileImage}
                  alt={displayName}
                  onError={() => setFailedImage(profileImage)}
                />
              ) : (
                <div className="ct-portrait ct-portrait-fallback">
                  {initials || "Y"}
                </div>
              )}
            </div>

            <div className="ct-chip ct-chip-top ct-glass">
              <i></i>
              {displayTitle}
            </div>

            {filledProjects.length > 0 && (
              <div className="ct-chip ct-chip-bottom ct-glass">
                <strong>{String(filledProjects.length).padStart(2, "0")}</strong>
                {filledProjects.length === 1 ? "project" : "projects"}
              </div>
            )}
          </div>
        </header>
      </div>

      {/* DOUBLE MARQUEE */}
      <div className="ct-marquee" aria-hidden="true">
        <div className="ct-marquee-row">
          <div className="ct-marquee-track">
            {titleTicker.map((item, index) => (
              <span className="ct-ticker-big" key={index}>
                {item}
                <b>✦</b>
              </span>
            ))}
          </div>
        </div>

        {skillTicker.length > 0 && (
          <div className="ct-marquee-row">
            <div className="ct-marquee-track ct-reverse">
              {skillTicker.map((item, index) => (
                <span className="ct-ticker-small" key={`${item}-${index}`}>
                  {item}
                  <b>●</b>
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="ct-wrap">
        {/* ABOUT */}
        <section className="ct-section">
          <h2 className="ct-label">
            <span>01</span> About
          </h2>
          <p className="ct-about ct-glass">
            {about || "Your about information will appear here."}
          </p>
        </section>

        {/* SKILLS */}
        <section className="ct-section">
          <h2 className="ct-label">
            <span>02</span> Skills
          </h2>

          {skillList.length > 0 ? (
            <div className="ct-skills">
              {skillList.map((skill, index) => (
                <span className="ct-skill ct-glass" key={`${skill}-${index}`}>
                  {skill}
                </span>
              ))}
            </div>
          ) : (
            <p className="ct-muted">Your skills will appear here.</p>
          )}
        </section>

        {/* PROJECTS */}
        <section className="ct-section ct-section-stack">
          <h2 className="ct-label">
            <span>03</span> Selected work
          </h2>

          <div className="ct-projects">
            {projectList.map((project, index) => (
              <article
                className="ct-card ct-glass"
                key={index}
                onMouseMove={handleTilt}
                onMouseLeave={resetTilt}
              >
                <span className="ct-card-number ct-grad">
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

            <p className="ct-contact-title">
              Let's build something <em>remarkable.</em>
            </p>

            {email && (
              <a className="ct-contact-email" href={`mailto:${email}`}>
                {email} <span>→</span>
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
                Resume — <strong>{resumeName}</strong>
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