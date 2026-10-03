import { useState } from "react";

function PortfolioForm({ portfolio, onChange }) {
  const [formData, setFormData] = useState(portfolio);

  // Handle normal text inputs
  const handleChange = (e) => {
    const { name, value } = e.target;

    const updatedData = {
      ...formData,
      [name]: value,
    };

    setFormData(updatedData);
    onChange(updatedData);
  };

  // Handle profile image
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const imageUrl = URL.createObjectURL(file);

    const updatedData = {
      ...formData,
      profileImage: imageUrl,
    };

    setFormData(updatedData);
    onChange(updatedData);
  };

  // Handle project text fields
  const handleProjectChange = (index, field, value) => {
    const updatedProjects = [...formData.projects];

    updatedProjects[index] = {
      ...updatedProjects[index],
      [field]: value,
    };

    const updatedData = {
      ...formData,
      projects: updatedProjects,
    };

    setFormData(updatedData);
    onChange(updatedData);
  };

  // Handle project image
  const handleProjectImageChange = (index, e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const imageUrl = URL.createObjectURL(file);

    handleProjectChange(index, "image", imageUrl);
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-3xl rounded-3xl bg-white p-6 shadow-lg sm:p-10">

        {/* Heading */}
        <h1 className="text-4xl font-bold text-gray-900">
          Create Your Portfolio
        </h1>

        <p className="mb-8 mt-2 text-gray-500">
          Enter your details and see your portfolio update live.
        </p>

        {/* ==================== BASIC DETAILS ==================== */}

        {/* Name */}
        <div className="mb-6">
          <label className="mb-2 block font-semibold text-gray-900">
            Your Name
          </label>

          <input
            type="text"
            name="name"
            value={formData.name || ""}
            onChange={handleChange}
            placeholder="Enter your name"
            className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-gray-500"
          />
        </div>

        {/* Role */}
        <div className="mb-6">
          <label className="mb-2 block font-semibold text-gray-900">
            Your Role
          </label>

          <input
            type="text"
            name="role"
            value={formData.role || ""}
            onChange={handleChange}
            placeholder="e.g. Full Stack Developer"
            className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-gray-500"
          />
        </div>

        {/* Email */}
        <div className="mb-6">
          <label className="mb-2 block font-semibold text-gray-900">
            Email
          </label>

          <input
            type="email"
            name="email"
            value={formData.email || ""}
            onChange={handleChange}
            placeholder="you@example.com"
            className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-gray-500"
          />
        </div>

        {/* About */}
        <div className="mb-6">
          <label className="mb-2 block font-semibold text-gray-900">
            About You
          </label>

          <textarea
            name="about"
            value={formData.about || ""}
            onChange={handleChange}
            placeholder="Tell us about yourself"
            rows="5"
            className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-gray-500"
          />
        </div>

        {/* ==================== PROFILE IMAGE ==================== */}

        <div className="mb-6">
          <label className="mb-2 block font-semibold text-gray-900">
            Profile Image
          </label>

          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full rounded-lg border border-gray-300 p-3"
          />

          {/* Profile Preview */}
          {formData.profileImage && (
            <div className="mt-4">
              <img
                src={formData.profileImage}
                alt="Profile Preview"
                className="h-32 w-32 rounded-2xl object-cover"
              />
            </div>
          )}
        </div>

        {/* ==================== PROJECTS ==================== */}

<div className="mt-10 border-t pt-8">
  <h2 className="mb-6 text-2xl font-bold text-gray-900">
    Projects
  </h2>

  {formData.projects?.map((project, index) => (
    <div
      key={index}
      className="mb-8 rounded-2xl border border-gray-200 p-5"
    >
      <h3 className="mb-5 text-lg font-bold text-gray-900">
        Project {index + 1}
      </h3>

      <label className="mb-2 block font-semibold">
        Project Title
      </label>

      <input
        type="text"
        value={project.title || ""}
        onChange={(e) =>
          handleProjectChange(
            index,
            "title",
            e.target.value
          )
        }
        placeholder="Project title"
        className="mb-4 w-full rounded-lg border border-gray-300 p-3"
      />

      <label className="mb-2 block font-semibold">
        Project Description
      </label>

      <textarea
        value={project.description || ""}
        onChange={(e) =>
          handleProjectChange(
            index,
            "description",
            e.target.value
          )
        }
        placeholder="Project description"
        rows="4"
        className="mb-4 w-full rounded-lg border border-gray-300 p-3"
      />

      <label className="mb-2 block font-semibold">
        Project Image
      </label>

      <input
        type="file"
        accept="image/*"
        onChange={(e) =>
          handleProjectImageChange(index, e)
        }
        className="w-full rounded-lg border border-gray-300 p-3"
      />

      {project.image && (
        <img
          src={project.image}
          alt={project.title || `Project ${index + 1}`}
          className="mt-4 h-40 w-full rounded-xl object-cover"
        />
      )}
    </div>
  ))}
  <button
  type="button"
  onClick={() => {
    const updatedProjects = [
      ...(formData.projects || []),
      {
        title: "",
        description: "",
        image: "",
      },
    ];

    const updatedData = {
      ...formData,
      projects: updatedProjects,
    };

    setFormData(updatedData);
    onChange(updatedData);
  }}
  className="mt-2 rounded-lg bg-black px-5 py-3 font-semibold text-white hover:bg-gray-800"
>
  + Add Project
</button>
<button
  type="button"
  onClick={() => {
    const updatedProjects = formData.projects.filter(
      (_, projectIndex) => projectIndex !== index
    );

    const updatedData = {
      ...formData,
      projects: updatedProjects,
    };

    setFormData(updatedData);
    onChange(updatedData);
  }}
  className="mt-4 rounded-lg border border-red-300 px-5 py-3 font-semibold text-red-600 hover:bg-red-50"
>
  Delete Project
</button>

{/* ==================== CASE STUDY ==================== */}

<div className="mt-10 border-t pt-8">
  <h2 className="mb-6 text-2xl font-bold text-gray-900">
    Case Study
  </h2>

  {/* Title */}
  <label className="mb-2 block font-semibold text-gray-900">
    Case Study Title
  </label>

  <input
    type="text"
    value={formData.caseStudy?.title || ""}
    onChange={(e) => {
      const updatedData = {
        ...formData,
        caseStudy: {
          ...formData.caseStudy,
          title: e.target.value,
        },
      };

      setFormData(updatedData);
      onChange(updatedData);
    }}
    placeholder="e.g. Rebranding Project"
    className="mb-4 w-full rounded-lg border border-gray-300 p-3"
  />

  {/* Description */}
  <label className="mb-2 block font-semibold text-gray-900">
    Case Study Description
  </label>

  <textarea
    value={formData.caseStudy?.description || ""}
    onChange={(e) => {
      const updatedData = {
        ...formData,
        caseStudy: {
          ...formData.caseStudy,
          description: e.target.value,
        },
      };

      setFormData(updatedData);
      onChange(updatedData);
    }}
    placeholder="Describe your case study..."
    rows="5"
    className="mb-4 w-full rounded-lg border border-gray-300 p-3"
  />

  {/* Image */}
  <label className="mb-2 block font-semibold text-gray-900">
    Case Study Image
  </label>

  <input
    type="file"
    accept="image/*"
    onChange={(e) => {
      const file = e.target.files?.[0];

      if (!file) return;

      const imageUrl = URL.createObjectURL(file);

      const updatedData = {
        ...formData,
        caseStudy: {
          ...formData.caseStudy,
          image: imageUrl,
        },
      };

      setFormData(updatedData);
      onChange(updatedData);
    }}
    className="w-full rounded-lg border border-gray-300 p-3"
  />

  {/* Preview */}
  {formData.caseStudy?.image && (
    <img
      src={formData.caseStudy.image}
      alt="Case Study Preview"
      className="mt-4 h-40 w-full rounded-xl object-cover"
    />
  )}
</div>

{/* ==================== DESIGN PHILOSOPHY ==================== */}

<div className="mt-10 border-t pt-8">
  <h2 className="mb-6 text-2xl font-bold text-gray-900">
    Design Philosophy
  </h2>

  {/* Philosophy 1 */}
  <label className="mb-2 block font-semibold text-gray-900">
    Philosophy 1
  </label>

  <textarea
    value={formData.designPhilosophy?.text1 || ""}
    onChange={(e) => {
      const updatedData = {
        ...formData,
        designPhilosophy: {
          ...formData.designPhilosophy,
          text1: e.target.value,
        },
      };

      setFormData(updatedData);
      onChange(updatedData);
    }}
    placeholder="Enter your first design philosophy..."
    rows="4"
    className="mb-4 w-full rounded-lg border border-gray-300 p-3"
  />

  {/* Philosophy 2 */}
  <label className="mb-2 block font-semibold text-gray-900">
    Philosophy 2
  </label>

  <textarea
    value={formData.designPhilosophy?.text2 || ""}
    onChange={(e) => {
      const updatedData = {
        ...formData,
        designPhilosophy: {
          ...formData.designPhilosophy,
          text2: e.target.value,
        },
      };

      setFormData(updatedData);
      onChange(updatedData);
    }}
    placeholder="Enter your second design philosophy..."
    rows="4"
    className="mb-4 w-full rounded-lg border border-gray-300 p-3"
  />
{/* ==================== CORE VALUES ==================== */}

<div className="mt-10 border-t pt-8">
  <h2 className="mb-6 text-2xl font-bold text-gray-900">
    Core Values
  </h2>

  {/* Core Value Image 1 */}
  <label className="mb-2 block font-semibold text-gray-900">
    Core Value Image 1
  </label>

  <input
    type="file"
    accept="image/*"
    onChange={(e) => {
      const file = e.target.files?.[0];

      if (!file) return;

      const imageUrl = URL.createObjectURL(file);

      const updatedData = {
        ...formData,
        coreValues: {
          ...formData.coreValues,
          image1: imageUrl,
        },
      };

      setFormData(updatedData);
      onChange(updatedData);
    }}
    className="w-full rounded-lg border border-gray-300 p-3"
  />

  {formData.coreValues?.image1 && (
    <img
      src={formData.coreValues.image1}
      alt="Core Value 1"
      className="mt-4 h-40 w-full rounded-xl object-cover"
    />
  )}

  {/* Core Value Image 2 */}
  <label className="mb-2 mt-6 block font-semibold text-gray-900">
    Core Value Image 2
  </label>

  <input
    type="file"
    accept="image/*"
    onChange={(e) => {
      const file = e.target.files?.[0];

      if (!file) return;

      const imageUrl = URL.createObjectURL(file);

      const updatedData = {
        ...formData,
        coreValues: {
          ...formData.coreValues,
          image2: imageUrl,
        },
      };

      setFormData(updatedData);
      onChange(updatedData);
    }}
    className="w-full rounded-lg border border-gray-300 p-3"
  />

  {formData.coreValues?.image2 && (
    <img
      src={formData.coreValues.image2}
      alt="Core Value 2"
      className="mt-4 h-40 w-full rounded-xl object-cover"
    />
  )}
</div>

{/* ==================== PERSONAL AESTHETIC ==================== */}

<div className="mt-10 border-t pt-8">
  <h2 className="mb-6 text-2xl font-bold text-gray-900">
    Personal Aesthetic
  </h2>

  <label className="mb-2 block font-semibold text-gray-900">
    Personal Aesthetic Image
  </label>

  <input
    type="file"
    accept="image/*"
    onChange={(e) => {
      const file = e.target.files?.[0];

      if (!file) return;

      const imageUrl = URL.createObjectURL(file);

      const updatedData = {
        ...formData,
        personalAesthetic: {
          ...formData.personalAesthetic,
          image: imageUrl,
        },
      };

      setFormData(updatedData);
      onChange(updatedData);
    }}
    className="w-full rounded-lg border border-gray-300 p-3"
  />

  {formData.personalAesthetic?.image && (
    <img
      src={formData.personalAesthetic.image}
      alt="Personal Aesthetic"
      className="mt-4 h-40 w-full rounded-xl object-cover"
    />
  )}
</div>


  {/* Design Philosophy Image */}
  <label className="mb-2 block font-semibold text-gray-900">
    Philosophy Image
  </label>

  <input
    type="file"
    accept="image/*"
    onChange={(e) => {
      const file = e.target.files?.[0];

      if (!file) return;

      const imageUrl = URL.createObjectURL(file);

      const updatedData = {
        ...formData,
        designPhilosophy: {
          ...formData.designPhilosophy,
          image: imageUrl,
        },
      };

      setFormData(updatedData);
      onChange(updatedData);
    }}
    className="w-full rounded-lg border border-gray-300 p-3"
  />

  {/* Image Preview */}
  {formData.designPhilosophy?.image && (
    <img
      src={formData.designPhilosophy.image}
      alt="Design Philosophy"
      className="mt-4 h-40 w-full rounded-xl object-cover"
    />
  )}
</div>


</div>

      </div>
    </div>
  );
}

export default PortfolioForm;