import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const [portfolios, setPortfolios] = useState([]);
  const [copiedId, setCopiedId] = useState(null);

  useEffect(() => {
    const savedPortfolios =
      JSON.parse(localStorage.getItem("portfolios")) || [];

    setPortfolios(savedPortfolios);
  }, []);

  function savePortfolios(updatedPortfolios) {
    localStorage.setItem(
      "portfolios",
      JSON.stringify(updatedPortfolios)
    );

    setPortfolios(updatedPortfolios);
  }

  function deletePortfolio(id) {
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this portfolio?"
    );

    if (!shouldDelete) {
      return;
    }

    const updatedPortfolios = portfolios.filter(
      (portfolio) => portfolio.id !== id
    );

    savePortfolios(updatedPortfolios);
  }

  function editPortfolio(portfolio) {
    navigate("/create", {
      state: {
        portfolio,
        template: portfolio.template,
      },
    });
  }

  function viewPortfolio(portfolio) {
    // Published portfolios open normally.
    // Drafts open in "preview" mode, which only the owner uses.
    const url =
      portfolio.status === "published"
        ? `/portfolio/${portfolio.id}`
        : `/portfolio/${portfolio.id}?preview=true`;

    window.open(url, "_blank", "noopener");
  }

  function togglePublish(id) {
    const updatedPortfolios = portfolios.map((portfolio) => {
      if (portfolio.id !== id) {
        return portfolio;
      }

      const isPublished = portfolio.status === "published";

      return {
        ...portfolio,
        status: isPublished ? "draft" : "published",
        publishedAt: isPublished
          ? null
          : new Date().toISOString(),
      };
    });

    savePortfolios(updatedPortfolios);
  }

  async function copyLink(id) {
    const link = `${window.location.origin}/portfolio/${id}`;

    try {
      await navigator.clipboard.writeText(link);
      setCopiedId(id);

      setTimeout(() => {
        setCopiedId(null);
      }, 2000);
    } catch {
      window.prompt("Copy your portfolio link:", link);
    }
  }

  const publishedCount = portfolios.filter(
    (portfolio) => portfolio.status === "published"
  ).length;

  return (
    <main className="dashboard-page">

      <div className="dashboard-container">

        {/* HEADER */}

        <section className="dashboard-hero">

          <div>

            <div className="dashboard-eyebrow">
              ✦ YOUR WORKSPACE
            </div>

            <h1>
              Welcome to your
              <span> portfolio space.</span>
            </h1>

            <p>
              Create, manage and customize your professional
              portfolios from one place.
            </p>

          </div>

          <Link
            to="/create"
            className="dashboard-create-button"
          >
            <span>+</span>
            Create Portfolio
          </Link>

        </section>

        {/* STATS */}

        <section className="dashboard-stats">

          <div className="dashboard-stat-card">

            <div className="dashboard-stat-icon">
              ◈
            </div>

            <div>
              <span>Total Portfolios</span>
              <strong>{portfolios.length}</strong>
            </div>

          </div>

          <div className="dashboard-stat-card">

            <div className="dashboard-stat-icon">
              ✦
            </div>

            <div>
              <span>Published</span>
              <strong>
                {portfolios.length > 0 ? publishedCount : "—"}
              </strong>
            </div>

          </div>

          <div className="dashboard-stat-card">

            <div className="dashboard-stat-icon">
              ⚡
            </div>

            <div>
              <span>Templates</span>
              <strong>3</strong>
            </div>

          </div>

        </section>

        {/* PORTFOLIOS */}

        <section className="dashboard-portfolios-section">

          <div className="dashboard-section-header">

            <div>

              <span>YOUR COLLECTION</span>

              <h2>
                My Portfolios
              </h2>

            </div>

            {portfolios.length > 0 && (
              <p>
                {portfolios.length}{" "}
                {portfolios.length === 1
                  ? "portfolio"
                  : "portfolios"}
              </p>
            )}

          </div>

          {portfolios.length === 0 ? (

            <div className="dashboard-empty">

              <div className="dashboard-empty-visual">

                <div className="empty-orbit orbit-one"></div>
                <div className="empty-orbit orbit-two"></div>

                <div className="dashboard-empty-icon">
                  +
                </div>

              </div>

              <h2>
                Your portfolio story starts here.
              </h2>

              <p>
                Create your first portfolio and turn your
                skills and experience into something memorable.
              </p>

              <Link
                to="/create"
                className="dashboard-empty-button"
              >
                Start Building
                <span>→</span>
              </Link>

            </div>

          ) : (

            <div className="dashboard-grid">

              {portfolios.map((portfolio) => {
                const isPublished =
                  portfolio.status === "published";

                return (
                  <article
                    className="dashboard-portfolio-card"
                    key={portfolio.id}
                  >

                    {/* CARD PREVIEW */}

                    <div
                      className={`dashboard-card-preview ${
                        portfolio.darkMode
                          ? "dashboard-preview-dark"
                          : ""
                      }`}
                    >

                      <div className="dashboard-preview-top">

                        <span className="dashboard-template-label">
                          {portfolio.template || "modern"}
                        </span>

                        <span
                          className={
                            isPublished
                              ? "dashboard-status dashboard-status-published"
                              : "dashboard-status dashboard-status-draft"
                          }
                        >
                          {isPublished ? "Published" : "Draft"}
                        </span>

                      </div>

                      <div className="dashboard-preview-profile">

                        {portfolio.profileImage ? (
                          <img
                            src={portfolio.profileImage}
                            alt="Profile"
                            className="dashboard-profile-image"
                          />
                        ) : (
                          <div
                            className="dashboard-avatar"
                            style={{
                              backgroundColor:
                                portfolio.themeColor ||
                                "#7657ff",
                            }}
                          >
                            {portfolio.name
                              ? portfolio.name
                                  .charAt(0)
                                  .toUpperCase()
                              : "Y"}
                          </div>
                        )}

                        <h3>
                          {portfolio.name ||
                            "My Portfolio"}
                        </h3>

                        <p>
                          {portfolio.title ||
                            "Professional Portfolio"}
                        </p>

                      </div>

                      <div className="dashboard-preview-lines">

                        <div></div>
                        <div></div>
                        <div></div>

                      </div>

                      <div className="dashboard-preview-projects">

                        <span></span>
                        <span></span>
                        <span></span>

                      </div>

                    </div>

                    {/* CARD CONTENT */}

                    <div className="dashboard-card-content">

                      <div className="dashboard-card-title">

                        <div>

                          <h3>
                            {portfolio.name ||
                              "My Portfolio"}
                          </h3>

                          <p>
                            {portfolio.title ||
                              "Professional Portfolio"}
                          </p>

                        </div>

                        <div
                          className="dashboard-color-dot"
                          style={{
                            backgroundColor:
                              portfolio.themeColor ||
                              "#222",
                          }}
                        ></div>

                      </div>

                      <div className="dashboard-card-meta">

                        <span>
                          ◈{" "}
                          {portfolio.template ||
                            "Modern"}
                        </span>

                        <span>
                          ●{" "}
                          {portfolio.projects?.length ||
                            0}{" "}
                          projects
                        </span>

                      </div>

                      <div className="dashboard-card-date">

                        Updated{" "}
                        {portfolio.updatedAt
                          ? new Date(
                              portfolio.updatedAt
                            ).toLocaleDateString()
                          : "Recently"}

                      </div>

                      <div className="dashboard-card-actions">

                        <button
                          type="button"
                          className="dashboard-edit-button"
                          onClick={() =>
                            editPortfolio(portfolio)
                          }
                        >
                          Edit
                        </button>

                        <button
                          type="button"
                          className="dashboard-view-button"
                          onClick={() =>
                            viewPortfolio(portfolio)
                          }
                        >
                          {isPublished ? "View" : "Preview"}
                          <span>↗</span>
                        </button>

                        <button
                          type="button"
                          className="dashboard-delete-button"
                          onClick={() =>
                            deletePortfolio(portfolio.id)
                          }
                          aria-label="Delete portfolio"
                        >
                          ×
                        </button>

                      </div>

                      <div className="dashboard-publish-row">

                        <button
                          type="button"
                          className={
                            isPublished
                              ? "dashboard-publish-button unpublish"
                              : "dashboard-publish-button"
                          }
                          onClick={() =>
                            togglePublish(portfolio.id)
                          }
                        >
                          {isPublished
                            ? "Unpublish"
                            : "Publish"}
                        </button>

                        {isPublished && (
                          <button
                            type="button"
                            className="dashboard-copy-button"
                            onClick={() =>
                              copyLink(portfolio.id)
                            }
                          >
                            {copiedId === portfolio.id
                              ? "✓ Copied"
                              : "Copy link"}
                          </button>
                        )}

                      </div>

                    </div>

                  </article>
                );
              })}

              {/* CREATE NEW CARD */}

              <Link
                to="/create"
                className="dashboard-new-card"
              >

                <div className="dashboard-new-icon">
                  +
                </div>

                <h3>
                  Create New Portfolio
                </h3>

                <p>
                  Start another portfolio with a
                  different style or template.
                </p>

                <span>
                  Start building →
                </span>

              </Link>

            </div>

          )}

        </section>

        {/* BOTTOM CTA */}

        {portfolios.length > 0 && (

          <section className="dashboard-bottom-cta">

            <div>

              <span>
                ✦ READY FOR THE NEXT ONE?
              </span>

              <h2>
                Create another
                <em> version.</em>
              </h2>

            </div>

            <Link
              to="/create"
              className="dashboard-bottom-button"
            >
              + New Portfolio
            </Link>

          </section>

        )}

      </div>

    </main>
  );
}

export default Dashboard;