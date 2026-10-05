import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import TemplateRenderer from "../components/templates/TemplateRenderer";
import TemplatePreviewFrame from "../components/TemplatePreviewFrame";

function CreatePortfolio() {
  const location = useLocation();
  const navigate = useNavigate();

  const initialTemplate = location.state?.template || "modern";
  const savedPortfolio = location.state?.portfolio || null;

  const [selectedTemplate, setSelectedTemplate] = useState(
    savedPortfolio?.template || initialTemplate
  );

  const [step, setStep] = useState(1);
  const [showPreview, setShowPreview] = useState(false);

  const [themeColor, setThemeColor] = useState(
    savedPortfolio?.themeColor || "#7657ff"
  );

  const [darkMode, setDarkMode] = useState(
    savedPortfolio?.darkMode || false
  );

  const [profileImage, setProfileImage] = useState(
    savedPortfolio?.profileImage || null
  );

  const [savedMessage, setSavedMessage] = useState("");

  const [formData, setFormData] = useState({
    name: savedPortfolio?.name || "",
    title: savedPortfolio?.title || "",
    email: savedPortfolio?.email || "",
    about: savedPortfolio?.about || "",
    skills: savedPortfolio?.skills || "",
    github: savedPortfolio?.github || "",
    linkedin: savedPortfolio?.linkedin || "",
    website: savedPortfolio?.website || "",
    resume: null,
    projects:
      savedPortfolio?.projects?.length > 0
        ? savedPortfolio.projects
        : [
            {
              name: "",
              description: "",
              link: "",
            },
          ],
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  function handleProfileImageChange(event) {
    const file = event.target.files[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.");
      return;
    }

    const imageUrl = URL.createObjectURL(file);

    setProfileImage(imageUrl);
  }

  function handleResumeChange(event) {
    const file = event.target.files[0];

    if (!file) {
      return;
    }

    setFormData((previous) => ({
      ...previous,
      resume: file,
    }));
  }

  function handleProjectChange(index, event) {
    const { name, value } = event.target;

    setFormData((previous) => {
      const updatedProjects = [...previous.projects];

      updatedProjects[index] = {
        ...updatedProjects[index],
        [name]: value,
      };

      return {
        ...previous,
        projects: updatedProjects,
      };
    });
  }

  function addProject() {
    setFormData((previous) => ({
      ...previous,
      projects: [
        ...previous.projects,
        {
          name: "",
          description: "",
          link: "",
        },
      ],
    }));
  }

  function removeProject(index) {
    const updatedProjects = formData.projects.filter(
      (_, projectIndex) => projectIndex !== index
    );

    setFormData((previous) => ({
      ...previous,
      projects: updatedProjects,
    }));
  }

  function handleTemplateChange(template) {
    setSelectedTemplate(template);

    navigate("/create", {
      state: {
        template,
        portfolio: savedPortfolio,
      },
      replace: true,
    });
  }

  function handleNext(event) {
    event.preventDefault();
    setStep(2);
  }

  function handleBack() {
    setStep(1);
  }

  function handlePreview(event) {
    event.preventDefault();
    setShowPreview(true);
  }

  function savePortfolio() {
    const portfolioData = {
      id: savedPortfolio?.id || Date.now(),

      name: formData.name || "My Portfolio",

      title: formData.title,

      email: formData.email,

      about: formData.about,

      skills: formData.skills,

      github: formData.github,

      linkedin: formData.linkedin,

      website: formData.website,

      template: selectedTemplate,

      themeColor,

      darkMode,

      profileImage,

      projects: formData.projects,

      resumeName: formData.resume
        ? formData.resume.name
        : savedPortfolio?.resumeName || "",

      updatedAt: new Date().toISOString(),
    };

    const existingPortfolios =
      JSON.parse(localStorage.getItem("portfolios")) || [];

    const portfolioExists = existingPortfolios.some(
      (portfolio) => portfolio.id === portfolioData.id
    );

    let updatedPortfolios;

    if (portfolioExists) {
      updatedPortfolios = existingPortfolios.map(
        (portfolio) =>
          portfolio.id === portfolioData.id
            ? portfolioData
            : portfolio
      );
    } else {
      updatedPortfolios = [
        ...existingPortfolios,
        portfolioData,
      ];
    }

    localStorage.setItem(
      "portfolios",
      JSON.stringify(updatedPortfolios)
    );

    setSavedMessage("Portfolio saved successfully!");

    setTimeout(() => {
      navigate("/dashboard");
    }, 800);
  }

  function handleEdit() {
    setShowPreview(false);
    setStep(1);
  }

  // The single data object the templates read from.
  // Same shape as what gets saved, so Form -> Template -> Backend all match.
  const previewPortfolio = {
    name: formData.name,
    title: formData.title,
    email: formData.email,
    about: formData.about,
    skills: formData.skills,
    github: formData.github,
    linkedin: formData.linkedin,
    website: formData.website,
    projects: formData.projects,
    template: selectedTemplate,
    themeColor,
    darkMode,
    profileImage,
    resumeName: formData.resume
      ? formData.resume.name
      : savedPortfolio?.resumeName || "",
  };

  const previewStyle = {
    "--theme-color": themeColor,
  };

  if (showPreview) {
    return (
      <main
        className={`portfolio-preview-page ${
          darkMode ? "dark-mode" : ""
        } ${selectedTemplate}-portfolio`}
        style={previewStyle}
      >
        <div className="portfolio-preview-container">

          <div className="preview-topbar">

            <div>
              <span className="preview-eyebrow">
                ✦ FINAL PREVIEW
              </span>

              <h1>Portfolio Preview</h1>

              <p>
                Review your portfolio before saving it.
              </p>
            </div>

            <div className="preview-actions">

              <button
                type="button"
                className="edit-button"
                onClick={handleEdit}
              >
                ← Edit
              </button>

              <button
                type="button"
                className="save-button"
                onClick={savePortfolio}
              >
                Save Draft →
              </button>

            </div>

          </div>

          {savedMessage && (
            <p className="saved-message">
              ✓ {savedMessage}
            </p>
          )}

          <div
            style={{
              borderRadius: "16px",
              overflow: "hidden",
              border: "1px solid rgba(128, 128, 128, 0.25)",
            }}
          >
            <TemplateRenderer portfolio={previewPortfolio} />
          </div>

        </div>
      </main>
    );
  }

  return (
    <main className="create-page premium-create-page">

      <div className="create-container">

        {/* HEADER */}

        <section className="create-hero">

          <div>

            <span className="create-eyebrow">
              ✦ PORTFOLIO BUILDER
            </span>

            <h1>
              {savedPortfolio
                ? "Refine your portfolio."
                : "Build your portfolio."}
            </h1>

            <p>
              Bring your experience, skills and projects
              together in a portfolio you're proud to share.
            </p>

          </div>

          <div className="create-hero-badge">
            <span>●</span>
            Autosaved locally
          </div>

        </section>

        {/* PROGRESS */}

        <section className="builder-progress">

          <div
            className={
              step === 1
                ? "progress-step active"
                : "progress-step completed"
            }
          >
            <span>01</span>

            <div>
              <strong>About you</strong>
              <small>Personal information</small>
            </div>

          </div>

          <div className="progress-line"></div>

          <div
            className={
              step === 2
                ? "progress-step active"
                : "progress-step"
            }
          >
            <span>02</span>

            <div>
              <strong>Your work</strong>
              <small>Projects & portfolio</small>
            </div>

          </div>

        </section>

        {/* TEMPLATE SELECTOR */}

        <section className="builder-section">

          <div className="builder-section-heading">

            <div>
              <span>01 — DESIGN</span>

              <h2>Choose your style</h2>

              <p>
                Start with a design that matches your
                professional personality.
              </p>
            </div>

            <div className="selected-template-pill">
              <span></span>
              {selectedTemplate}
            </div>

          </div>

          <div className="template-selector-grid">

            {/* MODERN */}

            <button
              type="button"
              className={
                selectedTemplate === "modern"
                  ? "template-card active"
                  : "template-card"
              }
              onClick={() =>
                handleTemplateChange("modern")
              }
            >

              <div className="template-card-preview modern-selector-preview">

                <div className="selector-browser-bar">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>

                <div className="modern-selector-body">

                  <div className="selector-avatar"></div>

                  <div className="selector-line large"></div>
                  <div className="selector-line medium"></div>

                  <div className="selector-cards">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>

                </div>

              </div>

              <div className="template-card-info">

                <div>
                  <strong>Modern</strong>
                  <small>
                    Clean & professional
                  </small>
                </div>

                <span className="template-arrow">
                  →
                </span>

              </div>

            </button>

            {/* CREATIVE */}

            <button
              type="button"
              className={
                selectedTemplate === "creative"
                  ? "template-card active"
                  : "template-card"
              }
              onClick={() =>
                handleTemplateChange("creative")
              }
            >

              <div className="template-card-preview creative-selector-preview">

                <div className="selector-orb orb-one"></div>
                <div className="selector-orb orb-two"></div>

                <div className="creative-selector-title">
                  CREATE
                </div>

                <div className="creative-selector-lines">
                  <span></span>
                  <span></span>
                </div>

              </div>

              <div className="template-card-info">

                <div>
                  <strong>Creative</strong>
                  <small>
                    Bold & expressive
                  </small>
                </div>

                <span className="template-arrow">
                  →
                </span>

              </div>

            </button>

            {/* MINIMAL */}

            <button
              type="button"
              className={
                selectedTemplate === "minimal"
                  ? "template-card active"
                  : "template-card"
              }
              onClick={() =>
                handleTemplateChange("minimal")
              }
            >

              <div className="template-card-preview minimal-selector-preview">

                <div className="minimal-selector-name">
                  YOUR NAME
                </div>

                <div className="minimal-selector-line"></div>
                <div className="minimal-selector-line short"></div>

                <div className="minimal-selector-nav">
                  ABOUT&nbsp;&nbsp; WORK&nbsp;&nbsp; CONTACT
                </div>

              </div>

              <div className="template-card-info">

                <div>
                  <strong>Minimal</strong>
                  <small>
                    Elegant & focused
                  </small>
                </div>

                <span className="template-arrow">
                  →
                </span>

              </div>

            </button>

          </div>

        </section>

        {/* CUSTOMIZATION */}

        <section className="builder-section">

          <div className="builder-section-heading">

            <div>
              <span>02 — PERSONALIZE</span>

              <h2>Make it yours</h2>

              <p>
                Choose a color and appearance for your portfolio.
              </p>
            </div>

          </div>

          <div className="premium-customization-panel">

            <div className="customization-option">

              <div className="customization-option-icon">
                ◉
              </div>

              <div className="customization-option-content">

                <label htmlFor="theme-color">
                  Accent color
                </label>

                <span>
                  Choose the color that represents you.
                </span>

              </div>

              <div className="premium-color-picker">

                <input
                  id="theme-color"
                  type="color"
                  value={themeColor}
                  onChange={(event) =>
                    setThemeColor(event.target.value)
                  }
                />

                <strong>
                  {themeColor.toUpperCase()}
                </strong>

              </div>

            </div>

            <div className="customization-divider"></div>

            <div className="customization-option">

              <div className="customization-option-icon">
                ◐
              </div>

              <div className="customization-option-content">

                <label>
                  Appearance
                </label>

                <span>
                  Switch between light and dark mode.
                </span>

              </div>

              <button
                type="button"
                className={
                  darkMode
                    ? "premium-mode-button active"
                    : "premium-mode-button"
                }
                onClick={() =>
                  setDarkMode(!darkMode)
                }
              >
                <span>
                  {darkMode ? "☀" : "☾"}
                </span>

                {darkMode ? "Dark" : "Light"}
              </button>

            </div>

          </div>

        </section>

        {/* BUILDER */}

        <div className="live-builder premium-live-builder">

          <div className="builder-form">

            {step === 1 && (
              <form
                onSubmit={handleNext}
                className="portfolio-form premium-form"
              >

                <div className="form-section-heading">

                  <span>01</span>

                  <div>
                    <h2>Tell us about yourself</h2>

                    <p>
                      This information will become the foundation
                      of your portfolio.
                    </p>
                  </div>

                </div>

                {/* PROFILE */}

                <div className="premium-form-card">

                  <div className="form-card-title">
                    <span>Profile</span>
                    <small>01</small>
                  </div>

                  <div className="form-group profile-upload-group">

                    <label>
                      Profile image
                    </label>

                    <div className="profile-upload-area">

                      {profileImage ? (
                        <img
                          src={profileImage}
                          alt="Selected profile"
                          className="profile-upload-preview"
                        />
                      ) : (
                        <div className="profile-placeholder">
                          +
                        </div>
                      )}

                      <div>
                        <label
                          htmlFor="profile-image"
                          className="upload-button"
                        >
                          Choose image
                        </label>

                        <input
                          id="profile-image"
                          type="file"
                          accept="image/*"
                          onChange={handleProfileImageChange}
                          className="hidden-file-input"
                        />

                        <small>
                          JPG, PNG or other image format.
                        </small>
                      </div>

                    </div>

                  </div>

                  <div className="form-grid">

                    <div className="form-group">

                      <label>Full name</label>

                      <input
                        type="text"
                        name="name"
                        placeholder="Your full name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />

                    </div>

                    <div className="form-group">

                      <label>Professional title</label>

                      <input
                        type="text"
                        name="title"
                        placeholder="Full Stack Developer"
                        value={formData.title}
                        onChange={handleChange}
                        required
                      />

                    </div>

                  </div>

                  <div className="form-group">

                    <label>Email address</label>

                    <input
                      type="email"
                      name="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />

                  </div>

                </div>

                {/* ABOUT */}

                <div className="premium-form-card">

                  <div className="form-card-title">
                    <span>About you</span>
                    <small>02</small>
                  </div>

                  <div className="form-group">

                    <label>About me</label>

                    <textarea
                      name="about"
                      placeholder="Tell people who you are, what you do and what you're passionate about..."
                      rows="7"
                      value={formData.about}
                      onChange={handleChange}
                      required
                    ></textarea>

                  </div>

                  <div className="form-group">

                    <label>Skills</label>

                    <input
                      type="text"
                      name="skills"
                      placeholder="React, JavaScript, Node.js, MongoDB"
                      value={formData.skills}
                      onChange={handleChange}
                      required
                    />

                    <small>
                      Separate skills with commas.
                    </small>

                  </div>

                </div>

                {/* SOCIAL */}

                <div className="premium-form-card">

                  <div className="form-card-title">
                    <span>Online presence</span>
                    <small>03</small>
                  </div>

                  <div className="form-group">

                    <label>GitHub</label>

                    <input
                      type="url"
                      name="github"
                      placeholder="https://github.com/yourusername"
                      value={formData.github}
                      onChange={handleChange}
                    />

                  </div>

                  <div className="form-group">

                    <label>LinkedIn</label>

                    <input
                      type="url"
                      name="linkedin"
                      placeholder="https://linkedin.com/in/yourusername"
                      value={formData.linkedin}
                      onChange={handleChange}
                    />

                  </div>

                  <div className="form-group">

                    <label>Personal website</label>

                    <input
                      type="url"
                      name="website"
                      placeholder="https://yourwebsite.com"
                      value={formData.website}
                      onChange={handleChange}
                    />

                  </div>

                </div>

                {/* RESUME */}

                <div className="premium-form-card">

                  <div className="form-card-title">
                    <span>Resume</span>
                    <small>04</small>
                  </div>

                  <div className="resume-upload-area">

                    <div className="resume-icon">
                      ↑
                    </div>

                    <div>
                      <strong>
                        Upload your resume
                      </strong>

                      <span>
                        PDF, DOC or DOCX
                      </span>

                      {formData.resume && (
                        <small>
                          ✓ {formData.resume.name}
                        </small>
                      )}

                      {!formData.resume &&
                        savedPortfolio?.resumeName && (
                          <small>
                            ✓ {savedPortfolio.resumeName}
                          </small>
                        )}
                    </div>

                    <label
                      htmlFor="resume-upload"
                      className="upload-button"
                    >
                      Browse
                    </label>

                    <input
                      id="resume-upload"
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleResumeChange}
                      className="hidden-file-input"
                    />

                  </div>

                </div>

                <button
                  type="submit"
                  className="builder-next-button"
                >
                  Continue to Projects
                  <span>→</span>
                </button>

              </form>
            )}

            {step === 2 && (
              <form
                onSubmit={handlePreview}
                className="portfolio-form premium-form"
              >

                <div className="form-section-heading">

                  <span>02</span>

                  <div>
                    <h2>Showcase your work</h2>

                    <p>
                      Add the projects that best represent
                      your skills and experience.
                    </p>
                  </div>

                </div>

                {formData.projects.map((project, index) => (
                  <div
                    className="premium-project-card"
                    key={index}
                  >

                    <div className="project-header">

                      <div>
                        <span>
                          PROJECT {String(index + 1).padStart(2, "0")}
                        </span>

                        <h3>
                          {project.name ||
                            "Untitled project"}
                        </h3>
                      </div>

                      {formData.projects.length > 1 && (
                        <button
                          type="button"
                          className="remove-project"
                          onClick={() =>
                            removeProject(index)
                          }
                        >
                          Remove
                        </button>
                      )}

                    </div>

                    <div className="form-group">

                      <label>Project name</label>

                      <input
                        type="text"
                        name="name"
                        placeholder="AI Portfolio Builder"
                        value={project.name}
                        onChange={(event) =>
                          handleProjectChange(index, event)
                        }
                        required
                      />

                    </div>

                    <div className="form-group">

                      <label>Description</label>

                      <textarea
                        name="description"
                        placeholder="Explain what you built, the problem you solved and the technologies you used..."
                        rows="6"
                        value={project.description}
                        onChange={(event) =>
                          handleProjectChange(index, event)
                        }
                        required
                      ></textarea>

                    </div>

                    <div className="form-group">

                      <label>Project link</label>

                      <input
                        type="url"
                        name="link"
                        placeholder="https://github.com/your-project"
                        value={project.link}
                        onChange={(event) =>
                          handleProjectChange(index, event)
                        }
                      />

                    </div>

                  </div>
                ))}

                <button
                  type="button"
                  className="add-project-button premium-add-project"
                  onClick={addProject}
                >
                  <span>+</span>
                  Add another project
                </button>

                <div className="form-buttons premium-form-buttons">

                  <button
                    type="button"
                    className="back-button"
                    onClick={handleBack}
                  >
                    ← Back
                  </button>

                  <button
                    type="submit"
                    className="builder-next-button"
                  >
                    Preview Portfolio
                    <span>↗</span>
                  </button>

                </div>

              </form>
            )}

          </div>

          {/* LIVE PREVIEW */}

          <div
            className={`live-preview premium-live-preview ${
              darkMode ? "live-preview-dark" : ""
            }`}
            style={previewStyle}
          >

            <div className="live-preview-header">

              <div>
                <span>LIVE</span>
                <h2>Your portfolio</h2>
              </div>

              <div
                className="live-template-badge"
                style={{
                  backgroundColor: themeColor,
                }}
              >
                {selectedTemplate}
              </div>

            </div>

            <TemplatePreviewFrame portfolio={previewPortfolio} />

          </div>

        </div>

      </div>

    </main>
  );
}

export default CreatePortfolio;