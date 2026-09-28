import { useState } from "react";

function CreatePortfolio() {
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    name: "",
    title: "",
    email: "",
    about: "",
    skills: "",
    projects: [
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

  function handleProjectChange(index, event) {
    const { name, value } = event.target;

    const updatedProjects = [...formData.projects];

    updatedProjects[index][name] = value;

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

  function handleNext(event) {
    event.preventDefault();
    setStep(2);
  }

  function handleBack() {
    setStep(1);
  }

  function handleSubmit(event) {
    event.preventDefault();

    console.log("Portfolio Data:", formData);

    alert("Portfolio details saved successfully!");
  }

  return (
    <main className="create-page">
      <div className="create-container">

        <h1>Create Your Portfolio</h1>

        <p className="create-subtitle">
          Step {step} of 2
        </p>

        {/* STEP 1 */}

        {step === 1 && (
          <form onSubmit={handleNext} className="portfolio-form">

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

            <button type="submit" className="save-button">
              Save & Continue
            </button>

          </form>
        )}

        {/* STEP 2 */}

        {step === 2 && (
          <form onSubmit={handleSubmit} className="portfolio-form">

            <h2>Your Projects</h2>

            {formData.projects.map((project, index) => (
              <div className="project-form-card" key={index}>

                <div className="project-header">
                  <h3>Project {index + 1}</h3>

                  {formData.projects.length > 1 && (
                    <button
                      type="button"
                      className="remove-project"
                      onClick={() => removeProject(index)}
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
                Finish Portfolio
              </button>

            </div>

          </form>
        )}

      </div>
    </main>
  );
}

export default CreatePortfolio;