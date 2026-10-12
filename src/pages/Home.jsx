import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import TemplateRenderer from "../components/templates/TemplateRenderer";
import "./Home.css";

/* ---------- Sample data for the live demos ---------- */

const demoPortfolios = {
  modern: {
    template: "modern",
    name: "Aarav Mehta",
    title: "Full Stack Developer",
    email: "aarav@example.com",
    about:
      "I build fast, accessible web products from database to pixel. Currently shipping SaaS tools used by thousands of people every day.",
    skills: "React, Node.js, MongoDB, TypeScript, AWS",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    website: "",
    projects: [
      {
        name: "Launchpad CRM",
        description:
          "A lightweight CRM with real-time pipelines and shared team inboxes.",
        link: "",
      },
      {
        name: "Pulse Analytics",
        description:
          "A privacy-first analytics dashboard with live visitor tracking.",
        link: "",
      },
    ],
    resumeName: "",
    profileImage: null,
    themeColor: "#2563eb",
    darkMode: true,
  },
  creative: {
    template: "creative",
    name: "Maya Rivera",
    title: "Creative Designer",
    email: "maya@example.com",
    about:
      "I design brands, interfaces and motion that people remember. Obsessed with details, color and the stories behind great products.",
    skills: "Branding, UI Design, Motion, Figma, Illustration",
    github: "",
    linkedin: "https://linkedin.com",
    website: "https://example.com",
    projects: [
      {
        name: "Bloom Identity",
        description: "A complete brand system for a floral studio.",
        link: "",
      },
      {
        name: "Orbit App",
        description: "A habit tracker with playful, fluid interactions.",
        link: "",
      },
    ],
    resumeName: "",
    profileImage: null,
    themeColor: "#ff3d7f",
    darkMode: false,
  },
  minimal: {
    template: "minimal",
    name: "Daniel Lee",
    title: "Software Engineer",
    email: "daniel@example.com",
    about:
      "I write clear, maintainable software and care about the craft behind it. I enjoy simple tools, small teams and long walks.",
    skills: "Python, Go, PostgreSQL, Docker, Linux",
    github: "https://github.com",
    linkedin: "",
    website: "",
    projects: [
      {
        name: "Quiet Notes",
        description: "A distraction-free markdown notebook.",
        link: "",
      },
      {
        name: "Graphite",
        description: "A tiny build tool written in Go.",
        link: "",
      },
    ],
    resumeName: "",
    profileImage: null,
    themeColor: "#0f766e",
    darkMode: false,
  },
};

const templateCards = [
  {
    key: "modern",
    name: "Modern",
    text: "Clean, professional and developer-friendly.",
  },
  {
    key: "creative",
    name: "Creative",
    text: "Bold, expressive and full of personality.",
  },
  {
    key: "minimal",
    name: "Minimal",
    text: "Elegant, simple and focused on your content.",
  },
];

const marqueeItems = [
  "Modern",
  "Creative",
  "Minimal",
  "AI content",
  "Live preview",
  "One-click publish",
  "Your own link",
];

const steps = [
  {
    number: "01",
    title: "Pick a template",
    text: "Start from a professionally designed look. Switch to another one any time.",
  },
  {
    number: "02",
    title: "Add your story",
    text: "Fill in your details and let AI sharpen your bio and project descriptions.",
  },
  {
    number: "03",
    title: "Publish and share",
    text: "Go live with a link you can send to recruiters, clients and friends.",
  },
];

/* ---------- Shows a real template, scaled down to fit ---------- */

const DESIGN_WIDTH = 1100;

function DemoFrame({ portfolio, designHeight = 700 }) {
  const wrapRef = useRef(null);
  const [scale, setScale] = useState(0.4);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const updateScale = () => {
      setScale(wrap.clientWidth / DESIGN_WIDTH);
    };

    updateScale();

    const observer = new ResizeObserver(updateScale);
    observer.observe(wrap);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={wrapRef}
      className="hm-frame"
      style={{ height: designHeight * scale }}
      aria-hidden="true"
    >
      <div
        className="hm-frame-inner"
        style={{
          width: DESIGN_WIDTH,
          height: designHeight,
          transform: `scale(${scale})`,
        }}
      >
        <TemplateRenderer portfolio={portfolio} />
      </div>
    </div>
  );
}

/* ---------- Page ---------- */

function Home() {
  // An even number of copies keeps the marquee loop seamless on wide screens
  const marqueeLoop = Array.from({ length: 4 }).flatMap(() => marqueeItems);

  return (
    <main className="hm-page">
      {/* BACKGROUND */}
      <div className="hm-mesh" aria-hidden="true">
        <span className="hm-blob hm-blob-1"></span>
        <span className="hm-blob hm-blob-2"></span>
        <span className="hm-blob hm-blob-3"></span>
      </div>

      {/* HERO */}
      <section className="hm-hero hm-wrap">
        <div className="hm-hero-text">
          <span className="hm-badge">
            <i></i> AI-powered portfolio builder
          </span>

          <h1 className="hm-title">
            <span>Your story.</span>
            <span className="hm-grad">Your portfolio.</span>
            <span>
              Your <em>future.</em>
            </span>
          </h1>

          <p className="hm-lead">
            Build a stunning professional portfolio in minutes. Choose a
            template, add your details, and let AI help you present your skills
            beautifully.
          </p>

          <div className="hm-buttons">
            <Link to="/create" className="hm-btn hm-btn-primary">
              Create my portfolio <span>→</span>
            </Link>

            <a href="#templates" className="hm-btn hm-btn-glass">
              Explore templates
            </a>
          </div>

          <div className="hm-trust">
            <span>✦ AI assisted</span>
            <span>✓ No design skills needed</span>
            <span>⚡ Live in minutes</span>
          </div>
        </div>

        <div className="hm-visual">
          <div className="hm-float hm-float-1">
            <b>✦</b>
            <div>
              <small>AI content</small>
              <strong>Improved</strong>
            </div>
          </div>

          <div className="hm-float hm-float-2">
            <b>✓</b>
            <div>
              <small>Portfolio</small>
              <strong>Published</strong>
            </div>
          </div>

          <div className="hm-browser">
            <div className="hm-browser-bar">
              <div className="hm-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
              <div className="hm-address">portfolio.ai/aarav-mehta</div>
            </div>

            <DemoFrame portfolio={demoPortfolios.modern} designHeight={720} />
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="hm-marquee" aria-hidden="true">
        <div className="hm-marquee-track">
          {marqueeLoop.map((item, index) => (
            <span key={`${item}-${index}`}>
              {item}
              <b>✦</b>
            </span>
          ))}
        </div>
      </div>

      {/* HOW IT WORKS */}
      <section className="hm-section hm-wrap">
        <div className="hm-heading">
          <span className="hm-eyebrow">How it works</span>
          <h2>
            From blank page to live portfolio in <em>three steps.</em>
          </h2>
        </div>

        <div className="hm-steps">
          {steps.map((step) => (
            <article className="hm-step hm-glass" key={step.number}>
              <span className="hm-step-number hm-grad">{step.number}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </article>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section className="hm-section hm-wrap">
        <div className="hm-heading">
          <span className="hm-eyebrow">Why Portfolio AI</span>
          <h2>
            Everything you need to <em>stand out.</em>
          </h2>
          <p>
            From design to content, create a portfolio that represents your
            professional identity.
          </p>
        </div>

        <div className="hm-bento">
          <article className="hm-feature hm-glass hm-feature-wide">
            <span className="hm-feature-icon">✦</span>
            <h3>AI-powered content</h3>
            <p>
              Let AI improve your About Me, project descriptions, resume content
              and more.
            </p>
            <div className="hm-prompts">
              <span>Improve my content</span>
              <span>Generate description</span>
              <span>Suggest skills</span>
              <span>Make it more professional</span>
            </div>
          </article>

          <article className="hm-feature hm-glass">
            <span className="hm-feature-icon">◈</span>
            <h3>Beautiful templates</h3>
            <p>
              Choose from professionally designed portfolio templates made for
              modern careers.
            </p>
          </article>

          <article className="hm-feature hm-glass">
            <span className="hm-feature-icon">◎</span>
            <h3>Live customization</h3>
            <p>
              Change colors, themes and styles while instantly seeing how your
              portfolio looks.
            </p>
          </article>

          <article className="hm-feature hm-glass hm-feature-wide">
            <span className="hm-feature-icon">↗</span>
            <h3>Ready to share</h3>
            <p>
              Publish your finished portfolio and share your professional
              identity anywhere, with a link that is entirely yours.
            </p>
            <div className="hm-link-demo">
              <i></i>
              portfolio.ai/your-name
              <b>Copy link</b>
            </div>
          </article>
        </div>
      </section>

      {/* TEMPLATES */}
      <section className="hm-section hm-wrap" id="templates">
        <div className="hm-heading">
          <span className="hm-eyebrow">Design your way</span>
          <h2>
            A template for <em>your personality.</em>
          </h2>
          <p>Start with a design you love and make it yours.</p>
        </div>

        <div className="hm-templates">
          {templateCards.map((card) => (
            <article className="hm-template" key={card.key}>
              <div className="hm-template-preview">
                <DemoFrame
                  portfolio={demoPortfolios[card.key]}
                  designHeight={760}
                />

                <Link
                  className="hm-template-overlay"
                  to="/create"
                  state={{ template: card.key }}
                  aria-label={`Use the ${card.name} template`}
                >
                  <span>Use this template →</span>
                </Link>
              </div>

              <div className="hm-template-info">
                <div>
                  <h3>{card.name}</h3>
                  <p>{card.text}</p>
                </div>
                <span className="hm-template-arrow">→</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="hm-wrap">
        <div className="hm-cta">
          <span className="hm-cta-eyebrow">Your next opportunity starts here</span>

          <h2>
            Ready to build
            <br />
            something <em>great?</em>
          </h2>

          <p>
            Turn your skills and experience into a portfolio you're proud to
            share.
          </p>

          <Link to="/create" className="hm-btn hm-btn-primary hm-cta-button">
            Start building <span>→</span>
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="hm-footer hm-wrap">
        <span>Portfolio AI</span>
        <span>© {new Date().getFullYear()} · Built by our team</span>
      </footer>
    </main>
  );
}

export default Home;