import { templates } from "./templates";
import mockPortfolio from "./data/mockPortfolio";

function App() {
  const selectedTemplate = "modern";
  const SelectedTemplate = templates[selectedTemplate];

  return <SelectedTemplate portfolio={mockPortfolio} />;
}

export default App;