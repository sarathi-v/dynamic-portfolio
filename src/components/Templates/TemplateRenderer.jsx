import ModernTemplate from "./ModernTemplate";
import CreativeTemplate from "./CreativeTemplate";
import MinimalTemplate from "./MinimalTemplate";

// Add a new template here and it works everywhere automatically
const templates = {
  modern: ModernTemplate,
  creative: CreativeTemplate,
  minimal: MinimalTemplate,
};

function TemplateRenderer({ portfolio = {}, template }) {
  // Use the "template" prop if given, otherwise the one saved in the portfolio
  const templateKey = template || portfolio.template || "modern";

  // Fall back to Modern if the name is unknown
  const SelectedTemplate = templates[templateKey] || ModernTemplate;

  return (
    // The wrapper stops page-level styles from leaking into the templates
    <div style={{ textAlign: "left", width: "100%" }}>
      <SelectedTemplate portfolio={portfolio} />
    </div>
  );
}

export default TemplateRenderer;