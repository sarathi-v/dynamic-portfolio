import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

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
    savedPortfolio?.themeColor || "#222222"
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

    setFormData({
      ...formData,
      [name]: value,
    });
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

    setFormData({
      ...formData,
      resume: file,
    });
  }

  function handleProjectChange(index, event) {
    const { name, value } = event.target;

    const updatedProjects = [...formData.projects];

    updatedProjects[index] = {
      ...updatedProjects[index],
      [name]: value,
    };

    setFormData({
      ...formData,
      projects: updatedProjects,
    });
  }

  function addProject() {
    setFormData({
      ...formData,
      projects: [
        ...formData.projects,
        {
          name: "",
          description: "",
          link: "",
        },
      ],
    });
  }

  function removeProject(index) {
    const updatedProjects = formData.projects.filter(
      (_, projectIndex) => projectIndex !== index
    );

    setFormData({
      ...formData,
      projects: updatedProjects,
    });
  }

  function handleTemplateChange(template) {
    setSelectedTemplate(template);

    navigate("/create", {
      state: {
        template,
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

  const skills = formData.skills
    .split(",")
    .map((skill) => skill.trim())
    .filter((skill) => skill !== "");

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

            <h1>Portfolio Preview</h1>

            <div className="preview-actions">

              <button
                type="button"
                className="edit-button"
                onClick={handleEdit}
              >
                Edit Portfolio
              </button>

              <button
                type="button"
                className="save-button"
                onClick={savePortfolio}
              >
                Save Draft
              </button>

            </div>

          </div>

          {savedMessage && (
            <p className="saved-message">
              {savedMessage}
            </p>
          )}

          <section className="portfolio-profile">

            {profileImage ? (
              <img
                src={profileImage}
                alt="Profile"
                className="final-profile-image"
              />
            ) : (
              <div
                className="final-profile-avatar"
                style={{
                  backgroundColor: themeColor,
                }}
              >
                {formData.name
                  ? formData.name.charAt(0).toUpperCase()
                  : "Y"}
              </div>
            )}

            <p className="selected-template">
              Template: {selectedTemplate}
            </p>

            <h2>
              {formData.name || "Your Name"}
            </h2>

            <h3>
              {formData.title || "Your Professional Title"}
            </h3>

            {formData.email && (
              <p>{formData.email}</p>
            )}

            <div className="social-links">

              {formData.github && (
                <a
                  href={formData.github}
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub
                </a>
              )}

              {formData.linkedin && (
                <a
                  href={formData.linkedin}
                  target="_blank"
                  rel="noreferrer"
                >
                  LinkedIn
                </a>
              )}

              {formData.website && (
                <a
                  href={formData.website}
                  target="_blank"
                  rel="noreferrer"
                >
                  Website
                </a>
              )}

            </div>

          </section>

          <section className="portfolio-section">

            <h2>About Me</h2>

            <p>
              {formData.about ||
                "Your about information will appear here."}
            </p>

          </section>

          <section className="portfolio-section">

            <h2>Skills</h2>

            <div className="skill-list">

              {skills.length > 0 ? (
                skills.map((skill, index) => (
                  <span
                    className="skill-tag"
                    key={index}
                  >
                    {skill}
                  </span>
                ))
              ) : (
                <p>Your skills will appear here.</p>
              )}

            </div>

          </section>

          <section className="portfolio-section">

            <h2>Projects</h2>

            <div className="portfolio-projects">

              {formData.projects.map((project, index) => (
                <div
                  className="portfolio-project-card"
                  key={index}
                >

                  <h3>
                    {project.name ||
                      `Project ${index + 1}`}
                  </h3>

                  <p>
                    {project.description ||
                      "Project description will appear here."}
                  </p>

                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noreferrer"
                    >
                      View Project
                    </a>
                  )}

                </div>
              ))}

            </div>

          </section>

          {formData.resume && (
            <section className="portfolio-section">

              <h2>Resume</h2>

              <p>
                Resume uploaded:{" "}
                <strong>
                  {formData.resume.name}
                </strong>
              </p>

            </section>
          )}

          {!formData.resume &&
            savedPortfolio?.resumeName && (
              <section className="portfolio-section">

                <h2>Resume</h2>

                <p>
                  Resume uploaded:{" "}
                  <strong>
                    {savedPortfolio.resumeName}
                  </strong>
                </p>

              </section>
            )}

        </div>
      </main>
    );
  }

  return (
    <main className="create-page">

      <div className="create-container">

        <h1>
          {savedPortfolio
            ? "Edit Your Portfolio"
            : "Create Your Portfolio"}
        </h1>

        <p className="create-subtitle">
          Step {step} of 2
        </p>

        <div className="template-selector">

          <h3>Select Your Template</h3>

          <div className="template-selector-buttons">

            <button
              type="button"
              className={
                selectedTemplate === "modern"
                  ? "template-select-button active"
                  : "template-select-button"
              }
              onClick={() =>
                handleTemplateChange("modern")
              }
            >
              Modern
            </button>

            <button
              type="button"
              className={
                selectedTemplate === "creative"
                  ? "template-select-button active"
                  : "template-select-button"
              }
              onClick={() =>
                handleTemplateChange("creative")
              }
            >
              Creative
            </button>

            <button
              type="button"
              className={
                selectedTemplate === "minimal"
                  ? "template-select-button active"
                  : "template-select-button"
              }
              onClick={() =>
                handleTemplateChange("minimal")
              }
            >
              Minimal
            </button>

          </div>

          <p className="current-template">
            Selected:{" "}
            <strong>{selectedTemplate}</strong>
          </p>

        </div>

        <div className="customization-panel">

          <h3>Customize Portfolio</h3>

          <div className="customization-options">

            <div className="customization-option">

              <label htmlFor="theme-color">
                Theme Color
              </label>

              <div className="color-picker-wrapper">

                <input
                  id="theme-color"
                  type="color"
                  value={themeColor}
                  onChange={(event) =>
                    setThemeColor(event.target.value)
                  }
                />

                <span>{themeColor}</span>

              </div>

            </div>

            <div className="customization-option">

              <label>Appearance</label>

              <button
                type="button"
                className={
                  darkMode
                    ? "mode-button dark-active"
                    : "mode-button"
                }
                onClick={() =>
                  setDarkMode(!darkMode)
                }
              >
                {darkMode
                  ? "☀ Light Mode"
                  : "🌙 Dark Mode"}
              </button>

            </div>

          </div>

        </div>

        <div className="live-builder">

          <div className="builder-form">

            {step === 1 && (
              <form
                onSubmit={handleNext}
                className="portfolio-form"
              >

                <h2>Personal Information</h2>

                <div className="form-group">

                  <label>Profile Image</label>

                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleProfileImageChange}
                  />

                  <small>
                    Upload a JPG, PNG, or other image.
                  </small>

                  {profileImage && (
                    <img
                      src={profileImage}
                      alt="Selected profile"
                      className="profile-upload-preview"
                    />
                  )}

                </div>

                <div className="form-group">

                  <label>Full Name</label>

                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />

                </div>

                <div className="form-group">

                  <label>Professional Title</label>

                  <input
                    type="text"
                    name="title"
                    placeholder="Example: Full Stack Developer"
                    value={formData.title}
                    onChange={handleChange}
                    required
                  />

                </div>

                <div className="form-group">

                  <label>Email</label>

                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />

                </div>

                <div className="form-group">

                  <label>About Me</label>

                  <textarea
                    name="about"
                    placeholder="Tell us about yourself..."
                    rows="6"
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
                    Separate each skill with a comma.
                  </small>

                </div>

                <div className="form-group">

                  <label>GitHub Profile</label>

                  <input
                    type="url"
                    name="github"
                    placeholder="https://github.com/yourusername"
                    value={formData.github}
                    onChange={handleChange}
                  />

                </div>

                <div className="form-group">

                  <label>LinkedIn Profile</label>

                  <input
                    type="url"
                    name="linkedin"
                    placeholder="https://linkedin.com/in/yourusername"
                    value={formData.linkedin}
                    onChange={handleChange}
                  />

                </div>

                <div className="form-group">

                  <label>Personal Website</label>

                  <input
                    type="url"
                    name="website"
                    placeholder="https://yourwebsite.com"
                    value={formData.website}
                    onChange={handleChange}
                  />

                </div>

                <div className="form-group">

                  <label>Upload Resume</label>

                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleResumeChange}
                  />

                  <small>
                    Upload your resume as PDF or Word document.
                  </small>

                  {formData.resume && (
                    <small>
                      Selected: {formData.resume.name}
                    </small>
                  )}

                </div>

                <button
                  type="submit"
                  className="save-button"
                >
                  Save & Continue
                </button>

              </form>
            )}

            {step === 2 && (
              <form
                onSubmit={handlePreview}
                className="portfolio-form"
              >

                <h2>Your Projects</h2>

                {formData.projects.map((project, index) => (
                  <div
                    className="project-form-card"
                    key={index}
                  >

                    <div className="project-header">

                      <h3>
                        Project {index + 1}
                      </h3>

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

                      <label>Project Name</label>

                      <input
                        type="text"
                        name="name"
                        placeholder="Example: AI Portfolio Builder"
                        value={project.name}
                        onChange={(event) =>
                          handleProjectChange(index, event)
                        }
                        required
                      />

                    </div>

                    <div className="form-group">

                      <label>Project Description</label>

                      <textarea
                        name="description"
                        placeholder="Describe your project..."
                        rows="5"
                        value={project.description}
                        onChange={(event) =>
                          handleProjectChange(index, event)
                        }
                        required
                      ></textarea>

                    </div>

                    <div className="form-group">

                      <label>Project Link</label>

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
                  className="add-project-button"
                  onClick={addProject}
                >
                  + Add Another Project
                </button>

                <div className="form-buttons">

                  <button
                    type="button"
                    className="back-button"
                    onClick={handleBack}
                  >
                    Back
                  </button>

                  <button
                    type="submit"
                    className="save-button"
                  >
                    Preview Portfolio
                  </button>

                </div>

              </form>
            )}

          </div>

          <div
            className={`live-preview ${
              darkMode ? "live-preview-dark" : ""
            }`}
            style={previewStyle}
          >

            <div className="live-preview-header">

              <h2>Live Preview</h2>

              <span>{selectedTemplate}</span>

            </div>

            <div className="live-preview-content">

              <section className="live-profile">

                {profileImage ? (
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="live-profile-image"
                  />
                ) : (
                  <div
                    className="live-avatar"
                    style={{
                      backgroundColor: themeColor,
                    }}
                  >
                    {formData.name
                      ? formData.name.charAt(0).toUpperCase()
                      : "Y"}
                  </div>
                )}

                <h1>
                  {formData.name || "Your Name"}
                </h1>

                <h3>
                  {formData.title ||
                    "Your Professional Title"}
                </h3>

                {formData.email && (
                  <p>{formData.email}</p>
                )}

                <div className="live-social-links">

                  {formData.github && (
                    <a
                      href={formData.github}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        color: themeColor,
                      }}
                    >
                      GitHub
                    </a>
                  )}

                  {formData.linkedin && (
                    <a
                      href={formData.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        color: themeColor,
                      }}
                    >
                      LinkedIn
                    </a>
                  )}

                  {formData.website && (
                    <a
                      href={formData.website}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        color: themeColor,
                      }}
                    >
                      Website
                    </a>
                  )}

                </div>

              </section>

              <section className="live-section">

                <h2 style={{ color: themeColor }}>
                  About Me
                </h2>

                <p>
                  {formData.about ||
                    "Your about information will appear here."}
                </p>

              </section>

              <section className="live-section">

                <h2 style={{ color: themeColor }}>
                  Skills
                </h2>

                <div className="live-skills">

                  {skills.length > 0 ? (
                    skills.map((skill, index) => (
                      <span
                        key={index}
                        style={{
                          borderColor: themeColor,
                        }}
                      >
                        {skill}
                      </span>
                    ))
                  ) : (
                    <p>
                      Your skills will appear here.
                    </p>
                  )}

                </div>

              </section>

              <section className="live-section">

                <h2 style={{ color: themeColor }}>
                  Projects
                </h2>

                <div className="live-projects">

                  {formData.projects.map((project, index) => (
                    <div
                      className="live-project-card"
                      key={index}
                      style={{
                        borderTopColor: themeColor,
                      }}
                    >

                      <h3>
                        {project.name ||
                          `Project ${index + 1}`}
                      </h3>

                      <p>
                        {project.description ||
                          "Project description will appear here."}
                      </p>

                    </div>
                  ))}

                </div>

              </section>

            </div>

          </div>

        </div>

      </div>

    </main>
  );
}

export default CreatePortfolio;