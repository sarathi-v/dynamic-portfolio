import { Link, useParams } from "react-router-dom";
import TemplateRenderer from "../components/templates/TemplateRenderer";

function PublicPortfolio() {
  const { id } = useParams();

  // Temporary: read from localStorage. Later this becomes an API call.
  const portfolios = JSON.parse(localStorage.getItem("portfolios")) || [];
  const portfolio = portfolios.find((item) => String(item.id) === String(id));

  if (!portfolio) {
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
        <h1 style={{ margin: 0 }}>Portfolio not found</h1>
        <p style={{ margin: 0, opacity: 0.7 }}>
          This portfolio doesn't exist or was deleted.
        </p>
        <Link to="/dashboard">← Back to Dashboard</Link>
      </main>
    );
  }

  return <TemplateRenderer portfolio={portfolio} />;
}

export default PublicPortfolio;