import { Link } from "react-router-dom";

function Home() {
  return (
    <main>
      {/* Hero Section */}

      <section className="hero">
        <h1>Build Your Professional Portfolio</h1>

        <p>
          Create, customize, and publish your portfolio with the help of AI.
        </p>

        <Link to="/create" className="primary-button">
          Create My Portfolio
        </Link>
      </section>

      {/* Templates Section */}

      <section className="templates">
        <h2>Choose Your Portfolio Template</h2>

        <p className="templates-subtitle">
          Pick a design that matches your personality and career.
        </p>

        <div className="template-cards">

          {/* Modern Template */}

          <div className="template-card modern">
            <div className="template-preview">

              <div className="preview-header">

                <div className="preview-avatar"></div>

                <div>
                  <div className="preview-line large"></div>
                  <div className="preview-line small"></div>
                </div>

              </div>

              <div className="preview-content">

                <div className="preview-line medium"></div>
                <div className="preview-line medium"></div>

                <div className="preview-boxes">
                  <div></div>
                  <div></div>
                </div>

              </div>

            </div>

            <h3>Modern</h3>

            <p>
              Clean and professional design for developers and professionals.
            </p>

            <Link
              to="/create"
              state={{ template: "modern" }}
              className="template-button"
            >
              Use Template
            </Link>
          </div>

          {/* Creative Template */}

          <div className="template-card creative">

            <div className="template-preview">

              <div className="creative-shape shape-one"></div>

              <div className="creative-shape shape-two"></div>

              <h4>CREATIVE</h4>

              <div className="creative-preview-text">
                <div className="preview-line large"></div>
                <div className="preview-line medium"></div>
              </div>

            </div>

            <h3>Creative</h3>

            <p>
              Bold and colorful design for designers and creative people.
            </p>

            <Link
              to="/create"
              state={{ template: "creative" }}
              className="template-button"
            >
              Use Template
            </Link>
          </div>

          {/* Minimal Template */}

          <div className="template-card minimal">

            <div className="template-preview">

              <div className="minimal-title"></div>

              <div className="preview-line small"></div>

              <div className="minimal-section">
                <div className="preview-line medium"></div>
                <div className="preview-line medium"></div>
                <div className="preview-line small"></div>
              </div>

            </div>

            <h3>Minimal</h3>

            <p>
              Simple and elegant design that focuses on your content.
            </p>

            <Link
              to="/create"
              state={{ template: "minimal" }}
              className="template-button"
            >
              Use Template
            </Link>
          </div>

        </div>
      </section>
    </main>
  );
}

export default Home;