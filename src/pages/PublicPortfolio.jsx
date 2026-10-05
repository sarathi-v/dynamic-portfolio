import { Link, useParams, useSearchParams } from "react-router-dom";
import TemplateRenderer from "../components/templates/TemplateRenderer";

function PublicPortfolio() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();

  const isPreview = searchParams.get("preview") === "true";

  // Temporary: read from localStorage. Later this becomes an API call.
  const portfolios = JSON.parse(localStorage.getItem("portfolios")) || [];
  const portfolio = portfolios.find((item) => String(item.id) === String(id));

  const isPublished = portfolio?.status === "published";

  // Missing, or a draft opened without preview mode
  if (!portfolio || (!isPublished && !isPreview)) {
    return (
      <main
        style={{
          minHeight: "70vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "12px",
          textAlign: "center",
          padding: "24px",
        }}
      >
        <h1 style={{ margin: 0 }}>Portfolio not available</h1>
        <p style={{ margin: 0, opacity: 0.7 }}>
          This portfolio doesn't exist, was deleted, or isn't published yet.
        </p>
        <Link to="/">← Back to home</Link>
      </main>
    );
  }

  return (
    <>
      {!isPublished && (
        <div
          style={{
            position: "sticky",
            top: 0,
            zIndex: 1000,
            padding: "10px 16px",
            textAlign: "center",
            fontSize: "0.85rem",
            fontWeight: 600,
            background: "#111",
            color: "#fff",
          }}
        >
          Draft preview — only you can see this. Publish it from your Dashboard
          to share it.
        </div>
      )}

      <TemplateRenderer portfolio={portfolio} />
    </>
  );
}

export default PublicPortfolio;