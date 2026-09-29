import { Link } from "react-router-dom";

function Home() {
  return (
    <main className="home-page">

      {/* HERO */}

      <section className="home-hero">

        <div className="hero-glow hero-glow-one"></div>
        <div className="hero-glow hero-glow-two"></div>

        <div className="hero-content">

          <div className="hero-badge">
            ✦ AI-Powered Portfolio Builder
          </div>

          <h1>
            Your story.
            <br />
            <span>Your portfolio.</span>
            <br />
            Your future.
          </h1>

          <p>
            Build a stunning professional portfolio in minutes.
            Choose a template, add your details, and let AI
            help you present your skills beautifully.
          </p>

          <div className="hero-buttons">

            <Link
              to="/create"
              className="hero-primary-button"
            >
              Create My Portfolio
              <span>→</span>
            </Link>

            <a
              href="#templates"
              className="hero-secondary-button"
            >
              Explore Templates
            </a>

          </div>

          <div className="hero-trust">

            <div className="trust-item">
              <span>✦</span>
              AI Assisted
            </div>

            <div className="trust-item">
              <span>✓</span>
              No Design Skills Needed
            </div>

            <div className="trust-item">
              <span>⚡</span>
              Build in Minutes
            </div>

          </div>

        </div>

        {/* HERO MOCKUP */}

        <div className="hero-visual">

          <div className="floating-card floating-card-one">
            <span>✦</span>
            AI Content
            <strong>Improved</strong>
          </div>

          <div className="floating-card floating-card-two">
            <span>✓</span>
            Portfolio
            <strong>Ready</strong>
          </div>

          <div className="browser-window">

            <div className="browser-top">

              <div className="browser-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>

              <div className="browser-address">
                portfolio.ai
              </div>

            </div>

            <div className="mock-portfolio">

              <div className="mock-sidebar">

                <div className="mock-logo">
                  P
                </div>

                <div className="mock-nav active"></div>
                <div className="mock-nav"></div>
                <div className="mock-nav"></div>
                <div className="mock-nav"></div>

              </div>

              <div className="mock-main">

                <div className="mock-top">

                  <div>
                    <div className="mock-line mock-small"></div>
                    <div className="mock-line mock-large"></div>
                    <div className="mock-line mock-medium"></div>
                  </div>

                  <div className="mock-avatar">
                    Y
                  </div>

                </div>

                <div className="mock-heading">
                  <div className="mock-line mock-heading-line"></div>
                  <div className="mock-line mock-text-line"></div>
                </div>

                <div className="mock-projects">

                  <div className="mock-project">
                    <div className="mock-project-image"></div>
                    <div className="mock-line"></div>
                    <div className="mock-line short"></div>
                  </div>

                  <div className="mock-project">
                    <div className="mock-project-image"></div>
                    <div className="mock-line"></div>
                    <div className="mock-line short"></div>
                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* FEATURES */}

      <section className="home-features">

        <div className="section-heading">

          <span>WHY PORTFOLIO AI</span>

          <h2>
            Everything you need to
            <br />
            <em>stand out.</em>
          </h2>

          <p>
            From design to content, create a portfolio
            that represents your professional identity.
          </p>

        </div>

        <div className="feature-grid">

          <div className="feature-card feature-large">

            <div className="feature-icon">
              ✦
            </div>

            <h3>AI-Powered Content</h3>

            <p>
              Let AI improve your About Me, project
              descriptions, resume content and more.
            </p>

            <div className="feature-decoration ai-decoration">
              <span>Improve my content</span>
              <span>Generate description</span>
              <span>Suggest skills</span>
            </div>

          </div>

          <div className="feature-card">

            <div className="feature-icon">
              ◈
            </div>

            <h3>Beautiful Templates</h3>

            <p>
              Choose from professionally designed
              portfolio templates made for modern careers.
            </p>

          </div>

          <div className="feature-card">

            <div className="feature-icon">
              ◎
            </div>

            <h3>Live Customization</h3>

            <p>
              Change colors, themes and styles while
              instantly seeing how your portfolio looks.
            </p>

          </div>

          <div className="feature-card">

            <div className="feature-icon">
              ↗
            </div>

            <h3>Ready to Share</h3>

            <p>
              Publish your finished portfolio and share
              your professional identity anywhere.
            </p>

          </div>

        </div>

      </section>

      {/* TEMPLATES */}

      <section
        className="home-templates"
        id="templates"
      >

        <div className="section-heading template-heading">

          <span>DESIGN YOUR WAY</span>

          <h2>
            A template for
            <br />
            <em>your personality.</em>
          </h2>

          <p>
            Start with a design you love and make it yours.
          </p>

        </div>

        <div className="home-template-grid">

          {/* MODERN */}

          <div className="home-template-card">

            <div className="home-template-preview modern-home-preview">

              <div className="modern-preview-top">

                <div className="modern-preview-avatar">
                  Y
                </div>

                <div className="modern-preview-text">

                  <div className="preview-line long"></div>
                  <div className="preview-line medium"></div>

                </div>

              </div>

              <div className="modern-preview-content">

                <div className="preview-line heading"></div>
                <div className="preview-line"></div>
                <div className="preview-line short"></div>

                <div className="modern-preview-cards">

                  <div></div>
                  <div></div>
                  <div></div>

                </div>

              </div>

            </div>

            <div className="home-template-info">

              <div>
                <h3>Modern</h3>
                <p>
                  Clean, professional and developer-friendly.
                </p>
              </div>

              <Link
                to="/create"
                state={{ template: "modern" }}
              >
                →
              </Link>

            </div>

          </div>

          {/* CREATIVE */}

          <div className="home-template-card">

            <div className="home-template-preview creative-home-preview">

              <div className="creative-preview-circle circle-one"></div>
              <div className="creative-preview-circle circle-two"></div>

              <div className="creative-preview-title">
                CREATIVE
              </div>

              <div className="creative-preview-content">

                <div className="preview-line long"></div>
                <div className="preview-line medium"></div>

                <div className="creative-preview-blocks">
                  <div></div>
                  <div></div>
                </div>

              </div>

            </div>

            <div className="home-template-info">

              <div>
                <h3>Creative</h3>
                <p>
                  Bold, expressive and full of personality.
                </p>
              </div>

              <Link
                to="/create"
                state={{ template: "creative" }}
              >
                →
              </Link>

            </div>

          </div>

          {/* MINIMAL */}

          <div className="home-template-card">

            <div className="home-template-preview minimal-home-preview">

              <div className="minimal-preview-name">
                YOUR NAME
              </div>

              <div className="minimal-preview-content">

                <div className="preview-line heading"></div>
                <div className="preview-line"></div>
                <div className="preview-line"></div>
                <div className="preview-line short"></div>

              </div>

              <div className="minimal-preview-footer">
                ABOUT&nbsp;&nbsp; WORK&nbsp;&nbsp; CONTACT
              </div>

            </div>

            <div className="home-template-info">

              <div>
                <h3>Minimal</h3>
                <p>
                  Elegant, simple and focused on your content.
                </p>
              </div>

              <Link
                to="/create"
                state={{ template: "minimal" }}
              >
                →
              </Link>

            </div>

          </div>

        </div>

      </section>

      {/* CTA */}

      <section className="home-cta">

        <div className="cta-glow"></div>

        <span>YOUR NEXT OPPORTUNITY STARTS HERE</span>

        <h2>
          Ready to build
          <br />
          something <em>great?</em>
        </h2>

        <p>
          Turn your skills and experience into a portfolio
          you're proud to share.
        </p>

        <Link
          to="/create"
          className="cta-button"
        >
          Start Building
          <span>→</span>
        </Link>

      </section>

    </main>
  );
}

export default Home;